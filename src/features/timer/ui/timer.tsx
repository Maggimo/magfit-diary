import { useRef, useState, useCallback, useEffect } from "react";
import { Input } from "../../../shared/ui/shadCNComponents/ui/input";
import { CircularCountdown } from "../../../shared/ui/circularProgressBar/circularProgressBar.tsx";

export const Timer = () => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState(minutes);
  const [initialSeconds, setInitialSeconds] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const playNotificationSound = () => {
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  const formatTime = (number: number): string => {
    return number.toString().padStart(2, "0");
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    if (isRunning) {
      clearTimer();
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            setMinutes((prevMinutes) => {
              if (prevMinutes > 0) {
                return prevMinutes - 1;
              } else {
                setIsRunning(false);
                return 0;
              }
            });
            return 59;
          }
        });
      }, 1000);
    }
  }, [isRunning]);

  const resetTimer = () => {
    clearTimer();
    setIsRunning(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  const setTime = useCallback((newMinutes: number, newSeconds: number) => {
    if (newMinutes > 60) {
      newMinutes = 60;
    }
    if (newSeconds > 59) {
      newSeconds = 59;
    }
    setMinutes(newMinutes);
    setSeconds(newSeconds);
    setInitialMinutes(newMinutes);
    setInitialSeconds(newSeconds);
  }, []);

  useEffect(() => {
    if (minutes === 0 && seconds === 0 && isRunning) {
      playNotificationSound();
      clearTimer();
      setIsRunning(false);
    }
  }, [minutes, seconds]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative ">
        <CircularCountdown
          size={380}
          totalSeconds={initialMinutes * 60 + initialSeconds}
          currentSeconds={minutes * 60 + seconds}
          color={isRunning ? "black" : "#6b7280"}
        />
        <div
          className={
            "absolute inset-0 flex flex-col items-center justify-center"
          }
        >
          <Input
            className={`text-8xl disabled:opacity-100 min-[330px]:text-9xl h-auto w-auto border-none shadow-none font-light text-center transition-[font-weight,color] duration-500 ${
              isRunning ? "font-bold text-black" : "text-gray-500"
            }`}
            onChange={(e) =>
              setTime(parseInt(e.target.value) || 0, initialSeconds)
            }
            disabled={isRunning}
            value={formatTime(minutes)}
          />
          <Input
            className={`text-8xl disabled:opacity-100 min-[330px]:text-9xl h-auto w-auto border-none shadow-none font-light text-center transition-[font-weight,color] duration-500 ${
              isRunning ? "font-bold text-black" : "text-gray-500"
            }`}
            onChange={(e) =>
              setTime(initialMinutes, parseInt(e.target.value) || 0)
            }
            disabled={isRunning}
            value={formatTime(seconds)}
          />
        </div>
      </div>
      <div className="flex flex-col w-[50%] space-y-4 fixed bottom-5">
        <button
          onClick={startTimer}
          className={`px-6 py-2 bg-black text-white text-2xl rounded transition-opacity duration-500 disabled:opacity-50 
            ${isRunning && "opacity-70"}`}
          disabled={minutes === 0 && seconds === 0 && !isRunning}
        >
          {isRunning ? "Пауза" : "Старт"}
        </button>

        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-gray-400 text-white text-2xl rounded hover:bg-gray-600"
        >
          Сброс
        </button>
      </div>
    </div>
  );
};

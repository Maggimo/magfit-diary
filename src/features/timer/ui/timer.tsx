import { useRef, useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";

export const Timer = () => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(13);
  const [initialMinutes, setInitialMinutes] = useState(minutes);
  const [initialSeconds, setInitialSeconds] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
                // Timer finished
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
    if (minutes === 0 && seconds === 0) {
      clearTimer();
      setIsRunning(false);
    }
  }, [minutes, seconds]);

  return (
    <div className="flex flex-col items-center space-y-3 mt-4">
      <div className="flex flex-col items-center  text-9xl text-center">
        <div>
          <Input
            className={`text-9xl md:text-9xl h-35 w-50  border-none shadow-none font-light text-center transition-[font-weight] duration-500 ${isRunning && "font-bold"}`}
            onChange={(e) =>
              setTime(parseInt(e.target.value) || 0, initialSeconds)
            }
            disabled={isRunning}
            value={formatTime(minutes)}
          />
          <Input
            className={`text-9xl md:text-9xl h-35 w-50 border-none shadow-none font-light text-center transition-[font-weight] duration-500 ${isRunning && "font-bold"}`}
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

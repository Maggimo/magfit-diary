// import { useRef, useState, useCallback, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Play, Pause, RotateCcw, Clock, Volume2, VolumeX } from "lucide-react";
//
// const TIMER_PRESETS = [
//   { name: "Быстрый отдых", minutes: 1, seconds: 0 },
//   { name: "Стандартный отдых", minutes: 2, seconds: 0 },
//   { name: "Длинный отдых", minutes: 5, seconds: 0 },
//   { name: "Кардио интервал", minutes: 0, seconds: 30 },
// ];
//
// export const Timer = () => {
//   const [minutes, setMinutes] = useState(2);
//   const [seconds, setSeconds] = useState(0);
//   const [initialMinutes, setInitialMinutes] = useState(minutes);
//   const [initialSeconds, setInitialSeconds] = useState(seconds);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [showPresets, setShowPresets] = useState(false);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//
//   const formatTime = (number: number): string => {
//     return number.toString().padStart(2, "0");
//   };
//
//   const playNotificationSound = useCallback(() => {
//     if (soundEnabled && audioRef.current) {
//       audioRef.current.play().catch(() => {
//         // Fallback: create a beep sound using Web Audio API
//         try {
//           const audioContext = new window.AudioContext();
//           const oscillator = audioContext.createOscillator();
//           const gainNode = audioContext.createGain();
//
//           oscillator.connect(gainNode);
//           gainNode.connect(audioContext.destination);
//
//           oscillator.frequency.value = 800;
//           gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//           gainNode.gain.exponentialRampToValueAtTime(
//             0.01,
//             audioContext.currentTime + 1,
//           );
//
//           oscillator.start(audioContext.currentTime);
//           oscillator.stop(audioContext.currentTime + 1);
//         } catch (error) {
//           console.log("Sound notification not available");
//         }
//       });
//     }
//   }, [soundEnabled]);
//
//   const clearTimer = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   };
//
//   const startTimer = useCallback(() => {
//     if (isRunning) {
//       clearTimer();
//       setIsRunning(false);
//     } else {
//       setIsFinished(false);
//       setIsRunning(true);
//       intervalRef.current = setInterval(() => {
//         setSeconds((prevSeconds) => {
//           if (prevSeconds > 0) {
//             return prevSeconds - 1;
//           } else {
//             setMinutes((prevMinutes) => {
//               if (prevMinutes > 0) {
//                 return prevMinutes - 1;
//               } else {
//                 setIsRunning(false);
//                 setIsFinished(true);
//                 playNotificationSound();
//                 return 0;
//               }
//             });
//             return 59;
//           }
//         });
//       }, 1000);
//     }
//   }, [isRunning, playNotificationSound]);
//
//   const resetTimer = () => {
//     clearTimer();
//     setIsRunning(false);
//     setIsFinished(false);
//     setMinutes(initialMinutes);
//     setSeconds(initialSeconds);
//   };
//
//   const selectPreset = (preset: (typeof TIMER_PRESETS)[0]) => {
//     if (!isRunning) {
//       setTime(preset.minutes, preset.seconds);
//       setShowPresets(false);
//     }
//   };
//
//   const setTime = useCallback((newMinutes: number, newSeconds: number) => {
//     if (newMinutes > 60) {
//       newMinutes = 60;
//     }
//     if (newSeconds > 59) {
//       newSeconds = 59;
//     }
//     setMinutes(newMinutes);
//     setSeconds(newSeconds);
//     setInitialMinutes(newMinutes);
//     setInitialSeconds(newSeconds);
//   }, []);
//
//   useEffect(() => {
//     if (minutes === 0 && seconds === 0) {
//       clearTimer();
//       setIsRunning(false);
//     }
//   }, [minutes, seconds]);
//
//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//       {/* Audio element for notifications */}
//       <audio ref={audioRef} preload="auto">
//         <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvWYdDDuU2+/JfCEELIfL8dmMNg=" />
//       </audio>
//
//       {/* Header with sound control */}
//       <div className="w-full max-w-md flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//           <Clock className="w-6 h-6" />
//           Таймер
//         </h1>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setSoundEnabled(!soundEnabled)}
//           className="p-2"
//         >
//           {soundEnabled ? (
//             <Volume2 className="w-4 h-4" />
//           ) : (
//             <VolumeX className="w-4 h-4" />
//           )}
//         </Button>
//       </div>
//
//       {/* Timer Display */}
//       <div
//         className={`relative mb-8 transition-all duration-500 ${isFinished ? "animate-pulse" : ""}`}
//       >
//         <div
//           className={`text-8xl md:text-9xl font-mono text-center transition-all duration-300 ${
//             isRunning
//               ? "text-blue-600 font-bold scale-105"
//               : isFinished
//                 ? "text-green-600 font-bold"
//                 : "text-gray-800"
//           }`}
//         >
//           <div className="flex items-center justify-center gap-4">
//             <Input
//               className={`text-8xl md:text-9xl h-24 w-32 border-none shadow-none font-mono text-center bg-transparent transition-all duration-300 ${
//                 isRunning
//                   ? "text-blue-600 font-bold"
//                   : isFinished
//                     ? "text-green-600 font-bold"
//                     : "text-gray-800"
//               }`}
//               onChange={(e) =>
//                 setTime(parseInt(e.target.value) || 0, initialSeconds)
//               }
//               disabled={isRunning}
//               value={formatTime(minutes)}
//             />
//             <span className="text-6xl md:text-7xl">:</span>
//             <Input
//               className={`text-8xl md:text-9xl h-24 w-32 border-none shadow-none font-mono text-center bg-transparent transition-all duration-300 ${
//                 isRunning
//                   ? "text-blue-600 font-bold"
//                   : isFinished
//                     ? "text-green-600 font-bold"
//                     : "text-gray-800"
//               }`}
//               onChange={(e) =>
//                 setTime(initialMinutes, parseInt(e.target.value) || 0)
//               }
//               disabled={isRunning}
//               value={formatTime(seconds)}
//             />
//           </div>
//         </div>
//
//         {/* Progress Ring */}
//         <div className="absolute inset-0 -z-10 flex items-center justify-center">
//           <div className="w-80 h-80 rounded-full border-4 border-gray-200">
//             <div
//               className={`w-full h-full rounded-full border-4 border-transparent transition-all duration-1000 ${
//                 isRunning
//                   ? "border-t-blue-500 animate-spin"
//                   : isFinished
//                     ? "border-t-green-500"
//                     : ""
//               }`}
//               style={{
//                 animationDuration: "60s",
//                 animationTimingFunction: "linear",
//               }}
//             />
//           </div>
//         </div>
//       </div>
//
//       {/* Preset Buttons */}
//       {!isRunning && (
//         <div className="w-full max-w-md mb-6">
//           <Button
//             variant="outline"
//             onClick={() => setShowPresets(!showPresets)}
//             className="w-full mb-4 flex items-center justify-center gap-2"
//           >
//             <Clock className="w-4 h-4" />
//             {showPresets ? "Скрыть пресеты" : "Быстрая настройка"}
//           </Button>
//
//           {showPresets && (
//             <div className="grid grid-cols-2 gap-2 animate-in fade-in-50 slide-in-from-top-5 duration-200">
//               {TIMER_PRESETS.map((preset) => (
//                 <Button
//                   key={preset.name}
//                   variant="secondary"
//                   size="sm"
//                   onClick={() => selectPreset(preset)}
//                   className="text-sm py-3 hover:scale-105 transition-transform"
//                 >
//                   <div className="text-center">
//                     <div className="font-medium">{preset.name}</div>
//                     <div className="text-xs text-gray-600">
//                       {formatTime(preset.minutes)}:{formatTime(preset.seconds)}
//                     </div>
//                   </div>
//                 </Button>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//
//       {/* Control Buttons */}
//       <div className="w-full max-w-md space-y-4">
//         <Button
//           onClick={startTimer}
//           size="lg"
//           className={`w-full text-xl py-6 transition-all duration-300 ${
//             isRunning
//               ? "bg-orange-500 hover:bg-orange-600 scale-105"
//               : isFinished
//                 ? "bg-green-500 hover:bg-green-600"
//                 : "bg-blue-500 hover:bg-blue-600"
//           } hover:scale-105`}
//           disabled={minutes === 0 && seconds === 0 && !isRunning}
//         >
//           <div className="flex items-center justify-center gap-3">
//             {isRunning ? (
//               <Pause className="w-6 h-6" />
//             ) : (
//               <Play className="w-6 h-6" />
//             )}
//             {isRunning ? "Пауза" : isFinished ? "Начать снова" : "Старт"}
//           </div>
//         </Button>
//
//         <Button
//           onClick={resetTimer}
//           variant="outline"
//           size="lg"
//           className="w-full text-lg py-4 hover:scale-105 transition-transform"
//         >
//           <div className="flex items-center justify-center gap-2">
//             <RotateCcw className="w-5 h-5" />
//             Сброс
//           </div>
//         </Button>
//       </div>
//
//       {/* Status Messages */}
//       {isFinished && (
//         <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg animate-in fade-in-50 slide-in-from-bottom-5">
//           <p className="text-green-800 font-medium text-center">
//             🎉 Время вышло! Отличная работа!
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

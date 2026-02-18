"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TimerPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(300); // 300 ثانیه = 5 دقیقه
  const [isActive, setIsActive] = useState(true);
  const [secretWord, setSecretWord] = useState('');

  useEffect(() => {
    // دریافت کلمه مخفی از localStorage
    const word = localStorage.getItem('secretWord');
    if (word) {
      setSecretWord(word);
    }

    // تنظیم تایمر
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // زمان تموم شد
      if (interval) clearInterval(interval);
    }

    // پاکسازی
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // تبدیل ثانیه به دقیقه:ثانیه
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // محاسبه درصد پیشرفت برای نمایش دایره
  const progress = (timeLeft / 300) * 100;
  const circumference = 2 * Math.PI * 120; // شعاع 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const pauseTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(300);
    setIsActive(true);
  };

  const endGame = () => {
    router.push('/');
  };

  // تعیین رنگ بر اساس زمان باقی‌مونده
  const getTimerColor = () => {
    if (timeLeft > 180) return 'text-emerald-400'; // بیشتر از ۳ دقیقه
    if (timeLeft > 60) return 'text-amber-400'; // بین ۱ تا ۳ دقیقه
    return 'text-red-400'; // کمتر از ۱ دقیقه
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* کارت اصلی */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/20 shadow-2xl">
          
          {/* هدر */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-amber-400 mb-2">⏳ زمان بحث</h1>
         
          </div>

          {/* تایمر دایره‌ای */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            {/* دایره پس‌زمینه */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-stone-700"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={`${getTimerColor()} transition-all duration-1000`}
              />
            </svg>
            
            {/* متن تایمر */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${getTimerColor()}`}>
                {formatTime(timeLeft)}
              </span>
              <span className="text-stone-400 text-sm mt-2">زمان باقی‌مانده</span>
            </div>
          </div>

          {/* دکمه‌های کنترل */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={pauseTimer}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isActive 
                  ? 'bg-amber-600/30 hover:bg-amber-600/50 text-amber-400 border border-amber-500/30' 
                  : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {isActive ? '⏸️ توقف' : '▶️ ادامه'}
            </button>
            <button
              onClick={resetTimer}
              className="flex-1 py-3 bg-blue-600/30 hover:bg-blue-600/50 text-blue-400 rounded-lg font-semibold transition-all border border-blue-500/30"
            >
              🔄 ریست
            </button>
          </div>

          {/* پیام‌های وضعیت */}
          {timeLeft === 0 ? (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4 text-center">
              <p className="text-red-400 font-bold text-lg mb-2">⏰ زمان تموم شد!</p>
              <p className="text-stone-300 text-sm">حالا وقت رای‌گیری است</p>
            </div>
          ) : timeLeft < 60 ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 text-center">
              <p className="text-red-400">⚠️ زمان کمه! سریع تصمیم بگیرید</p>
            </div>
          ) : null}

          {/* راهنمای بازی */}
          <div className="bg-stone-800/50 rounded-xl p-4 mb-4 text-right">
            <h3 className="text-amber-400 font-semibold mb-2">📋 قوانین:</h3>
            <ul className="text-stone-300 text-sm space-y-1 list-disc list-inside">
              <li>شهروندا: درباره کلمه صحبت کنید</li>
              <li>جاسوس‌ها: سعی کنید کلمه رو حدس بزنید</li>
              <li>پایان زمان: رای‌گیری برای شناسایی جاسوس</li>
            </ul>
          </div>

          {/* دکمه پایان بازی */}
          <button
            onClick={endGame}
            className="w-full py-3 bg-red-600/30 hover:bg-red-600/50 text-red-400 rounded-lg font-semibold transition-all border border-red-500/30"
          >
            🏁 پایان بازی
          </button>
        </div>
      </div>
    </div>
  );
}
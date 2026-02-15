"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [citizens, setCitizens] = useState(5);
  const [spies, setSpies] = useState(2);

  const startGame = () => {
    // ذخیره تنظیمات در localStorage
    localStorage.setItem('gameSettings', JSON.stringify({
      citizens,
      spies,
      totalPlayers: citizens + spies
    }));
    
    // رفتن به صفحه بازی
    router.push('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-zinc-900 flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 w-96 border border-amber-500/20 shadow-2xl">
        {/* هدر */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">🕵️ شهروند و جاسوس</h1>
          <p className="text-stone-400">تنظیمات بازی رو انتخاب کن</p>
        </div>

        {/* نمایش مجموع بازیکنان */}
        <div className="bg-amber-500/10 rounded-lg p-3 mb-6 text-center border border-amber-500/30">
          <span className="text-amber-400 font-semibold">تعداد کل بازیکنان: </span>
          <span className="text-white font-bold text-xl">{citizens + spies}</span>
          <span className="text-stone-400 text-sm block mt-1">(شهروندان + جاسوس‌ها)</span>
        </div>

        {/* کنترل شهروندان */}
        <div className="bg-emerald-500/5 rounded-lg p-4 mb-3 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-400 flex items-center gap-2">
              <span className="text-2xl">👨‍🌾</span>
              <span className="font-semibold">شهروندان</span>
            </span>
            <span className="text-xs text-stone-400">(۳ تا ۸)</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setCitizens(Math.max(3, citizens - 1))}
              disabled={citizens <= 3}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all
                ${citizens > 3 
                  ? 'bg-red-500/30 hover:bg-red-500/50 text-white cursor-pointer border border-red-400/30' 
                  : 'bg-stone-700/30 text-stone-500 cursor-not-allowed border border-stone-600/30'
                }`}
            >
              -
            </button>
            <span className="flex-1 text-center text-3xl font-bold text-emerald-400">
              {citizens}
            </span>
            <button
              onClick={() => setCitizens(Math.min(8, citizens + 1))}
              disabled={citizens >= 8}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all
                ${citizens < 8 
                  ? 'bg-green-500/30 hover:bg-green-500/50 text-white cursor-pointer border border-green-400/30' 
                  : 'bg-stone-700/30 text-stone-500 cursor-not-allowed border border-stone-600/30'
                }`}
            >
              +
            </button>
          </div>
        </div>

        {/* کنترل جاسوس‌ها */}
        <div className="bg-red-500/5 rounded-lg p-4 mb-6 border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-400 flex items-center gap-2">
              <span className="text-2xl">🕵️</span>
              <span className="font-semibold">جاسوس‌ها</span>
            </span>
            <span className="text-xs text-stone-400">(۱ تا ۳)</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setSpies(Math.max(1, spies - 1))}
              disabled={spies <= 1}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all
                ${spies > 1 
                  ? 'bg-red-500/30 hover:bg-red-500/50 text-white cursor-pointer border border-red-400/30' 
                  : 'bg-stone-700/30 text-stone-500 cursor-not-allowed border border-stone-600/30'
                }`}
            >
              -
            </button>
            <span className="flex-1 text-center text-3xl font-bold text-red-400">
              {spies}
            </span>
            <button
              onClick={() => setSpies(Math.min(3, spies + 1))}
              disabled={spies >= 3}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all
                ${spies < 3 
                  ? 'bg-green-500/30 hover:bg-green-500/50 text-white cursor-pointer border border-green-400/30' 
                  : 'bg-stone-700/30 text-stone-500 cursor-not-allowed border border-stone-600/30'
                }`}
            >
              +
            </button>
          </div>
        </div>

        {/* دکمه شروع بازی */}
        <button
          onClick={startGame}
          className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
        >
          🎮 شروع بازی
        </button>

        {/* راهنما */}
        <div className="mt-6 text-xs text-stone-500 text-center space-y-1">
          <p>📌 بعد از شروع، هر بازیکن صفحه رو کلیک می‌کنه تا نقششو ببینه</p>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GamePage() {
  const router = useRouter();
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [gameSettings, setGameSettings] = useState({ citizens: 0, spies: 0, totalPlayers: 0 });
  const [spyPositions, setSpyPositions] = useState<number[]>([]);

  // لود تنظیمات و ساخت لیست بازیکنان
  useEffect(() => {
    const settings = localStorage.getItem('gameSettings');
    if (!settings) {
      router.push('/');
      return;
    }

    const parsed = JSON.parse(settings);
    setGameSettings(parsed);

    // تعیین موقعیت جاسوس‌ها (به صورت رندوم)
    const total = parsed.totalPlayers;
    const spyCount = parsed.spies;
    
    // ساخت آرایه‌ای از موقعیت‌های جاسوس
    const positions: number[] = [];
    while (positions.length < spyCount) {
      const pos = Math.floor(Math.random() * total);
      if (!positions.includes(pos)) {
        positions.push(pos);
      }
    }
    setSpyPositions(positions);

    // ساخت لیست بازیکنان (با شماره)
    const playersList = Array.from({ length: total }, (_, i) => `بازیکن ${i + 1}`);
    setPlayers(playersList);
  }, [router]);

  const revealRole = () => {
    setRevealed(true);
  };

  const nextPlayer = () => {
    if (currentPlayer < players.length - 1) {
      setCurrentPlayer(currentPlayer + 1);
      setRevealed(false);
    }
  };

  const isSpy = spyPositions.includes(currentPlayer);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-zinc-900 flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 w-96 border border-amber-500/20 shadow-2xl">
        
        {/* هدر */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-amber-400 mb-2">
            {players[currentPlayer] || 'بازیکن'}
          </h2>
          <div className="flex justify-center gap-2 text-stone-400 text-sm">
            <span>بازیکن {currentPlayer + 1} از {players.length}</span>
          </div>
        </div>

        {/* کارت نقش */}
        <div 
          onClick={revealRole}
          className={`
            relative h-64 rounded-xl mb-6 cursor-pointer transition-all duration-500 transform
            ${revealed ? 'rotate-y-180' : 'hover:scale-105'}
            ${!revealed && 'bg-gradient-to-br from-amber-900/50 to-stone-800/50 border-2 border-amber-500/50'}
          `}
        >
          {!revealed ? (
            // پشت کارت
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl mb-4">🃏</span>
              <span className="text-amber-400 font-semibold">کلیک کن تا نقشتو ببینی</span>
              <span className="text-xs text-stone-500 mt-2">فقط خودت نگاه کن!</span>
            </div>
          ) : (
            // روی کارت - نمایش نقش
            <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl
              ${isSpy 
                ? 'bg-gradient-to-br from-red-900/90 to-red-800/90 border-2 border-red-500' 
                : 'bg-gradient-to-br from-emerald-900/90 to-emerald-800/90 border-2 border-emerald-500'
              }`}
            >
              <span className="text-7xl mb-4">{isSpy ? '🕵️' : '👨‍🌾'}</span>
              <span className={`text-3xl font-bold ${isSpy ? 'text-red-400' : 'text-emerald-400'}`}>
                {isSpy ? 'جاسوس' : 'شهروند'}
              </span>
              {isSpy && (
                <span className="text-xs text-red-300 mt-4 text-center px-4">
                  تو جاسوسی! بقیه رو گول بزن!
                </span>
              )}
            </div>
          )}
        </div>

        {/* راهنما و دکمه‌ها */}
        {revealed ? (
          <button
            onClick={nextPlayer}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
          >
            {currentPlayer < players.length - 1 ? '👉 نفر بعدی' : '🎯 شروع بازی اصلی'}
          </button>
        ) : (
          <p className="text-center text-stone-400 text-sm">
            روی کارت کلیک کن تا نقش خودتو ببینی
          </p>
        )}

        {/* نمایش پیشرفت */}
        <div className="mt-6">
          <div className="w-full bg-stone-800 rounded-full h-2">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPlayer + 1) / players.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* دکمه ریست */}
        <button
          onClick={() => router.push('/')}
          className="w-full mt-4 py-2 text-stone-400 hover:text-amber-400 transition-colors text-sm"
        >
          ⚙️ تنظیمات مجدد
        </button>
      </div>
    </div>
  );
}
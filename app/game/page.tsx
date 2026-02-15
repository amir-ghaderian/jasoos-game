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
  const [showReverse, setShowReverse] = useState(false);

  useEffect(() => {
    const settings = localStorage.getItem('gameSettings');
    if (!settings) {
      router.push('/');
      return;
    }

    const parsed = JSON.parse(settings);
    setGameSettings(parsed);

    const total = parsed.totalPlayers;
    const spyCount = parsed.spies;
    
    const positions: number[] = [];
    while (positions.length < spyCount) {
      const pos = Math.floor(Math.random() * total);
      if (!positions.includes(pos)) {
        positions.push(pos);
      }
    }
    setSpyPositions(positions);

    const playersList = Array.from({ length: total }, (_, i) => `بازیکن ${i + 1}`);
    setPlayers(playersList);
  }, [router]);

  // تابع برعکس کردن اسم فارسی
  const reversePersianName = (name: string) => {
    const match = name.match(/([^\d]+)(\d+)/);
    if (match) {
      const text = match[1]; // "بازیکن "
      const number = match[2]; // "۱"
      const reversedText = text.split('').reverse().join('');
      return reversedText + number;
    }
    return name.split('').reverse().join('');
  };

  const revealRole = () => {
    setRevealed(true);
  };

  const toggleReverseName = () => {
    setShowReverse(!showReverse);
  };

  const nextPlayer = () => {
    if (currentPlayer < players.length - 1) {
      setCurrentPlayer(currentPlayer + 1);
      setRevealed(false);
      setShowReverse(false);
    } else {
      // آخرین بازیکن - شروع بازی اصلی
      // اینجا می‌تونی یه صفحه دیگه یا یه پیام اضافه کنی
      alert('همه نقش خود را دیدند! بازی شروع شود!');
    }
  };

  const resetGame = () => {
    router.push('/');
  };

  const isSpy = spyPositions.includes(currentPlayer);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* کارت اصلی */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/20 shadow-2xl">
          
          {/* هدر با اسم بازیکن */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-amber-400 mb-2">
              {showReverse ? reversePersianName(players[currentPlayer]) : players[currentPlayer]}
            </h1>
            <div className="text-stone-400">
              بازیکن {currentPlayer + 1} از {players.length}
            </div>
          </div>

          {/* کارت نقش */}
          <div className="mb-6">
            {!revealed ? (
              /* پشت کارت - با کلیک برای دیدن نقش */
              <div 
                onClick={revealRole}
                className="bg-gradient-to-br from-amber-900/50 to-stone-800/50 border-2 border-amber-500/50 rounded-xl p-8 text-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="text-7xl mb-4">🃏</div>
                <div className="text-amber-400 font-semibold text-lg">کلیک کن تا نقشتو ببینی</div>
                <div className="text-stone-500 text-sm mt-2">فقط خودت نگاه کن!</div>
              </div>
            ) : (
              /* روی کارت - نمایش نقش */
              <div className={`rounded-xl p-8 text-center border-2 ${
                isSpy 
                  ? 'bg-gradient-to-br from-red-900/90 to-red-800/90 border-red-500' 
                  : 'bg-gradient-to-br from-emerald-900/90 to-emerald-800/90 border-emerald-500'
              }`}>
                <div className="text-7xl mb-4">{isSpy ? '🕵️' : '👨‍🌾'}</div>
                <div className={`text-4xl font-bold mb-2 ${isSpy ? 'text-red-400' : 'text-emerald-400'}`}>
                  {isSpy ? 'جاسوس' : 'شهروند'}
                </div>
                {isSpy && (
                  <div className="text-red-300 text-sm">
                    تو جاسوسی! بقیه رو گول بزن!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* دکمه برعکس کردن اسم - فقط بعد از دیدن نقش */}
          {revealed && (
            <button
              onClick={toggleReverseName}
              className="w-full mb-3 py-3 bg-purple-600/30 hover:bg-purple-600/50 text-white rounded-xl font-semibold transition-all border border-purple-400/30"
            >
              {showReverse ? '👁️ نمایش اسم' : '🔄 مخفی کردن اسم'}
            </button>
          )}

          {/* دکمه نفر بعدی - فقط بعد از دیدن نقش */}
          {revealed && (
            <button
              onClick={nextPlayer}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg"
            >
              {currentPlayer < players.length - 1 ? '👉 نفر بعدی' : '🎯 شروع بازی اصلی'}
            </button>
          )}

          {/* راهنما وقتی نقش دیده نشده */}
          {!revealed && (
            <p className="text-center text-stone-400">
              روی کارت کلیک کن تا نقش خودتو ببینی
            </p>
          )}

          {/* نوار پیشرفت */}
          <div className="mt-6">
            <div className="w-full bg-stone-800 rounded-full h-2.5">
              <div 
                className="bg-amber-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentPlayer + 1) / players.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* دکمه تنظیمات مجدد */}
          <button
            onClick={resetGame}
            className="w-full mt-4 py-3 text-stone-400 hover:text-amber-400 transition-colors"
          >
            ⚙️ تنظیمات مجدد
          </button>
        </div>
      </div>
    </div>
  );
}
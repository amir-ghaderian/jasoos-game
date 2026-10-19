"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { allWords } from "../data/words";

type GameSettings = {
  citizens: number;
  spies: number;
  totalPlayers: number;
};

type GameData = {
  settings: GameSettings;
  players: string[];
  spyPositions: number[];
  secretWord: string;
};

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function createGameData(): GameData | null {
  const storedSettings = localStorage.getItem("gameSettings");

  if (!storedSettings) return null;

  let settings: GameSettings;

  try {
    settings = JSON.parse(storedSettings) as GameSettings;
  } catch {
    localStorage.removeItem("gameSettings");
    return null;
  }

  const { citizens, spies, totalPlayers } = settings;

  const validSettings =
    Number.isInteger(citizens) &&
    citizens >= 3 &&
    citizens <= 8 &&
    Number.isInteger(spies) &&
    spies >= 1 &&
    spies <= 3 &&
    totalPlayers === citizens + spies;

  if (!validSettings || !Array.isArray(allWords) || allWords.length === 0) {
    localStorage.removeItem("gameSettings");
    return null;
  }

  let usedWords: string[] = [];

  try {
    const storedWords = localStorage.getItem("usedWords");
    const parsedWords: unknown = storedWords
      ? JSON.parse(storedWords)
      : [];

    if (Array.isArray(parsedWords)) {
      usedWords = parsedWords.filter(
        (word): word is string => typeof word === "string"
      );
    }
  } catch {
    usedWords = [];
  }

  const unusedWords = allWords.filter(
    (word) => !usedWords.includes(word)
  );

  const availableWords =
    unusedWords.length > 0 ? unusedWords : allWords;

  const secretWord =
    availableWords[Math.floor(Math.random() * availableWords.length)];

  if (!secretWord) return null;

  const shuffledPositions = Array.from(
    { length: totalPlayers },
    (_, index) => index
  );

  for (let i = shuffledPositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledPositions[i], shuffledPositions[j]] = [
      shuffledPositions[j],
      shuffledPositions[i],
    ];
  }

  return {
    settings,
    secretWord,
    spyPositions: shuffledPositions.slice(0, spies),
    players: Array.from(
      { length: totalPlayers },
      (_, index) => `بازیکن ${index + 1}`
    ),
  };
}

function LoadingScreen() {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-zinc-900 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="text-center text-amber-400">
        در حال آماده‌سازی بازی...
      </div>
    </main>
  );
}

export default function GamePage() {
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!isClient) {
    return <LoadingScreen />;
  }

  return <GameContent />;
}

function GameContent() {
  const router = useRouter();

  // اطلاعات اولیه فقط هنگام ساخت کامپوننت در مرورگر خوانده می‌شود.
  const [initialGame] = useState<GameData | null>(() => createGameData());

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showReverse, setShowReverse] = useState(false);

  useEffect(() => {
    if (!initialGame) {
      router.replace("/");
      return;
    }

    // ذخیره اطلاعات بازی بدون تغییر state داخل effect
    localStorage.setItem("secretWord", initialGame.secretWord);

    let usedWords: string[] = [];

    try {
      const storedWords = localStorage.getItem("usedWords");
      const parsedWords: unknown = storedWords
        ? JSON.parse(storedWords)
        : [];

      if (Array.isArray(parsedWords)) {
        usedWords = parsedWords.filter(
          (word): word is string => typeof word === "string"
        );
      }
    } catch {
      usedWords = [];
    }

    if (!usedWords.includes(initialGame.secretWord)) {
      localStorage.setItem(
        "usedWords",
        JSON.stringify([...usedWords, initialGame.secretWord])
      );
    }
  }, [initialGame, router]);

  if (!initialGame) {
    return <LoadingScreen />;
  }

  const { players, spyPositions, secretWord, settings } = initialGame;

  const reversePersianName = (name: string) => {
    const match = name.match(/([^\d]+)(\d+)/);

    if (match) {
      return (
        match[1].split("").reverse().join("") + match[2]
      );
    }

    return name.split("").reverse().join("");
  };

  const revealRole = () => {
    setRevealed(true);
  };

  const toggleReverseName = () => {
    setShowReverse((previous) => !previous);
  };

  const nextPlayer = () => {
    if (currentPlayer < players.length - 1) {
      setCurrentPlayer((previous) => previous + 1);
      setRevealed(false);
      setShowReverse(false);
    } else {
      router.push("/timer");
    }
  };

  const resetGame = () => {
    router.push("/");
  };

  const isSpy = spyPositions.includes(currentPlayer);

  if (currentPlayer >= players.length) {
    return <LoadingScreen />;
  }

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-zinc-900 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/20 shadow-2xl">
          {/* سربرگ بازیکن */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-amber-400 mb-2">
              {showReverse
                ? reversePersianName(players[currentPlayer])
                : players[currentPlayer]}
            </h1>

            <div className="text-stone-400 text-sm">
              بازیکن {currentPlayer + 1} از {settings.totalPlayers}
            </div>

            <button
              type="button"
              onClick={toggleReverseName}
              className="mt-2 text-xs text-stone-400 hover:text-amber-400"
              aria-label="برعکس کردن نام بازیکن"
            >
              ↔️ تغییر جهت نام
            </button>
          </div>

          {/* کارت نقش */}
          <div className="mb-6">
            {!revealed ? (
              <button
                type="button"
                onClick={revealRole}
                className="w-full bg-gradient-to-br from-amber-900/50 to-stone-800/50 border-2 border-amber-500/50 rounded-xl p-8 text-center cursor-pointer hover:scale-105 transition-transform"
                aria-label="نمایش نقش بازیکن"
              >
                <div className="text-7xl mb-4">🃏</div>

                <div className="text-amber-400 font-semibold text-lg">
                  کلیک کن تا نقشتو ببینی
                </div>

                <div className="text-stone-500 text-sm mt-2">
                  فقط خودت نگاه کن!
                </div>
              </button>
            ) : (
              <div
                className={`rounded-xl p-6 text-center border-2 ${
                  isSpy
                    ? "bg-gradient-to-br from-red-900/90 to-red-800/90 border-red-500"
                    : "bg-gradient-to-br from-emerald-900/90 to-emerald-800/90 border-emerald-500"
                }`}
              >
                {isSpy ? (
                  <>
                    <div className="text-7xl mb-3">🕵️</div>

                    <div className="text-3xl font-bold text-red-400 mb-3">
                      جاسوس
                    </div>

                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-red-300 text-sm mb-2">
                        تو جاسوسی!
                      </p>

                      <p className="text-stone-300 text-sm">
                        کلمه رو نمی‌دونی! باید با بقیه صحبت کنی و
                        بفهمی کلمه چیه.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-7xl mb-3">👨‍🌾</div>

                    <div className="text-3xl font-bold text-emerald-400 mb-3">
                      شهروند
                    </div>

                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-emerald-300 text-sm mb-2">
                        کلمه امروز:
                      </p>

                      <p className="text-4xl font-bold text-white mb-2">
                        {secretWord}
                      </p>

                      <p className="text-stone-300 text-sm">
                        با بقیه درباره این کلمه صحبت کن و جاسوس رو
                        پیدا کن!
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* بازیکن بعدی */}
          {revealed && (
            <button
              type="button"
              onClick={nextPlayer}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg"
            >
              {currentPlayer < players.length - 1
                ? "👉 نفر بعدی"
                : "🎮 شروع مرحله اصلی"}
            </button>
          )}

          {!revealed && (
            <p className="text-center text-stone-400">
              روی کارت کلیک کن تا نقش خودتو ببینی.
            </p>
          )}

          {/* نوار پیشرفت */}
          <div className="mt-6">
            <div
              className="w-full bg-stone-800 rounded-full h-2.5"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={settings.totalPlayers}
              aria-valuenow={currentPlayer + 1}
            >
              <div
                className="bg-amber-500 h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentPlayer + 1) / settings.totalPlayers) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* تنظیم مجدد */}
          <button
            type="button"
            onClick={resetGame}
            className="w-full mt-4 py-3 text-stone-400 hover:text-amber-400 transition-colors"
          >
            ⚙️ تنظیمات مجدد
          </button>
        </div>
      </div>
    </main>
  );
}

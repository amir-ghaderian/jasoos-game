
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const [citizens, setCitizens] = useState(5);
  const [spies, setSpies] = useState(2);

  const startGame = () => {
    localStorage.setItem(
      'gameSettings',
      JSON.stringify({
        citizens,
        spies,
        totalPlayers: citizens + spies,
      })
    );

    router.push('/game');
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4 py-8"
      dir="rtl"
    >

      {/* =====================================================
          GAME CARD
      ====================================================== */}

      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-8 w-96 max-w-full">

        <div className="text-center mb-8">

          {/* SEO H1 */}
          <h1 className="text-4xl font-bold text-amber-400 mb-2">
            🕵️ بازی جاسوس آنلاین
          </h1>

          <p className="text-stone-400 leading-7">
            بازی جاسوس
             گروهی و دورهمی 
           
          </p>

        </div>

        {/* ===================================================
            TOTAL PLAYERS
        ==================================================== */}

        <div className="bg-amber-500/10 rounded-lg p-3 mb-6 text-center border border-amber-500/30">

          <span className="text-amber-400 font-semibold">
            تعداد کل بازیکنان:{' '}
          </span>

          <span className="text-white font-bold text-xl">
            {citizens + spies}
          </span>

          <span className="text-stone-400 text-sm block mt-1">
            (شهروندان + جاسوس‌ها)
          </span>

        </div>

        {/* ===================================================
            CITIZENS
        ==================================================== */}

        <div className="bg-emerald-500/5 rounded-lg p-4 mb-3 border border-emerald-500/30">

          <div className="flex items-center justify-between mb-2">

            <span className="text-emerald-400 flex items-center gap-2">

              <span className="text-2xl">
                👨‍🌾
              </span>

              <span className="font-semibold">
                شهروندان
              </span>

            </span>

            <span className="text-xs text-stone-400">
              (۳ تا ۸)
            </span>

          </div>

          <div className="flex items-center justify-between gap-2">

            <button
              onClick={() =>
                setCitizens(Math.max(3, citizens - 1))
              }
              disabled={citizens <= 3}
              aria-label="کاهش تعداد شهروندان"
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all
                ${
                  citizens > 3
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
              onClick={() =>
                setCitizens(Math.min(8, citizens + 1))
              }
              disabled={citizens >= 8}
              aria-label="افزایش تعداد شهروندان"
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all
                ${
                  citizens < 8
                    ? 'bg-green-500/30 hover:bg-green-500/50 text-white cursor-pointer border border-green-400/30'
                    : 'bg-stone-700/30 text-stone-500 cursor-not-allowed border border-stone-600/30'
                }`}
            >
              +
            </button>

          </div>

        </div>

        {/* ===================================================
            SPIES
        ==================================================== */}

        <div className="bg-red-500/5 rounded-lg p-4 mb-6 border border-red-500/30">

          <div className="flex items-center justify-between mb-2">

            <span className="text-red-400 flex items-center gap-2">

              <span className="text-2xl">
                🕵️
              </span>

              <span className="font-semibold">
                جاسوس‌ها
              </span>

            </span>

            <span className="text-xs text-stone-400">
              (۱ تا ۳)
            </span>

          </div>

          <div className="flex items-center justify-between gap-2">

            <button
              onClick={() =>
                setSpies(Math.max(1, spies - 1))
              }
              disabled={spies <= 1}
              aria-label="کاهش تعداد جاسوس‌ها"
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all
                ${
                  spies > 1
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
              onClick={() =>
                setSpies(Math.min(3, spies + 1))
              }
              disabled={spies >= 3}
              aria-label="افزایش تعداد جاسوس‌ها"
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all
                ${
                  spies < 3
                    ? 'bg-green-500/30 hover:bg-green-500/50 text-white cursor-pointer border border-green-400/30'
                    : 'bg-stone-700/30 text-stone-500 cursor-not-allowed border border-stone-600/30'
                }`}
            >
              +
            </button>

          </div>

        </div>

        {/* ===================================================
            START GAME
        ==================================================== */}

        <button
          onClick={startGame}
          aria-label="شروع بازی جاسوس آنلاین"
          className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
        >
          🎮 شروع بازی جاسوس
        </button>

        <div className="mt-6 text-xs text-stone-500 text-center space-y-1">

          <p>
            📌 بعد از شروع، هر بازیکن صفحه را کلیک می‌کند
            تا نقش خود را ببیند.
          </p>

        </div>

      </div>

      {/* =====================================================
          SEO CONTENT
      ====================================================== */}

      <section
        className="w-96 max-w-full mt-8 text-right"
        dir="rtl"
        aria-label="درباره بازی جاسوس"
      >

        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">

          {/* =================================================
              SECTION 1
          ================================================== */}

          <h2 className="text-xl font-bold text-amber-400 mb-3">
            بازی جاسوس آنلاین چیست؟
          </h2>

          <p className="text-stone-300 text-sm leading-8 mb-6">

            بازی جاسوس آنلاین یک بازی گروهی و دورهمی است که در آن
            بازیکنان به دو گروه شهروند و جاسوس تقسیم می‌شوند.
            هدف شهروندان شناسایی جاسوس‌ها و هدف جاسوس‌ها مخفی ماندن
            و فریب دادن سایر بازیکنان است.

            این بازی جاسوس تحت وب نیاز به نصب برنامه ندارد و می‌توانید
            آن را مستقیماً با مرورگر اجرا کنید.

          </p>

          {/* =================================================
              SECTION 2
          ================================================== */}

          <h2 className="text-xl font-bold text-amber-400 mb-3">
            بازی جاسوس بدون نصب روی موبایل
          </h2>

          <p className="text-stone-300 text-sm leading-8 mb-6">

            اگر به دنبال بازی جاسوس برای موبایل، بازی جاسوس برای آیفون
            یا یک بازی جاسوس تحت وب هستید، می‌توانید این بازی را
            مستقیماً از طریق مرورگر گوشی اجرا کنید.

            بازی جاسوس آنلاین برای گوشی‌های آیفون و دستگاه‌های اندرویدی
            طراحی شده و برای شروع بازی نیازی به نصب اپلیکیشن ندارید.

          </p>

          {/* =================================================
              SECTION 3
          ================================================== */}

          <h2 className="text-xl font-bold text-amber-400 mb-3">
            بازی جاسوس برای آیفون و اندروید
          </h2>

          <p className="text-stone-300 text-sm leading-8 mb-6">

            برای انجام بازی جاسوس در آیفون کافی است با مرورگر گوشی
            وارد این صفحه شوید و بازی را شروع کنید.

            این نسخه از بازی جاسوس آنلاین روی گوشی‌های هوشمند،
            تبلت، کامپیوتر و لپ‌تاپ قابل استفاده است.

          </p>

          {/* =================================================
              SECTION 4
          ================================================== */}

          <h2 className="text-xl font-bold text-amber-400 mb-3">
            چگونه بازی جاسوس را انجام دهیم؟
          </h2>

          <ol className="text-stone-300 text-sm leading-8 mb-6 pr-5 list-decimal">

            <li>
              تعداد شهروندان و جاسوس‌ها را انتخاب کنید.
            </li>

            <li>
              روی دکمه «شروع بازی جاسوس» بزنید.
            </li>

            <li>
              هر بازیکن به نوبت صفحه را لمس یا کلیک می‌کند
              تا نقش خود را ببیند.
            </li>

            <li>
              نقش خود را از سایر بازیکنان مخفی نگه دارید.
            </li>

            <li>
              بازی را با دوستان، خانواده یا اعضای گروه خود ادامه دهید.
            </li>

          </ol>

          {/* =================================================
              SECTION 5
          ================================================== */}

          <h2 className="text-xl font-bold text-amber-400 mb-3">
            بازی جاسوس گروهی و دورهمی
          </h2>

          <p className="text-stone-300 text-sm leading-8 mb-6">

            این بازی برای مهمانی‌ها، دورهمی‌های دوستانه و جمع‌های
            خانوادگی مناسب است. کافی است بازیکنان کنار یکدیگر باشند
            و گوشی یا کامپیوتر را به نوبت در اختیار بگیرند.

            با انتخاب تعداد شهروندان و جاسوس‌ها می‌توانید بازی را
            متناسب با تعداد افراد گروه تنظیم کنید.

          </p>

          {/* =================================================
              SECTION 6
          ================================================== */}

          <h2 className="text-xl font-bold text-amber-400 mb-3">
            تنظیم تعداد بازیکنان
          </h2>

          <p className="text-stone-300 text-sm leading-8 mb-6">

            در این نسخه می‌توانید بین ۳ تا ۸ شهروند و بین ۱ تا ۳
            جاسوس انتخاب کنید. تعداد کل بازیکنان به‌صورت خودکار
            محاسبه می‌شود.

            پس از شروع بازی، نقش هر بازیکن به‌صورت جداگانه نمایش
            داده خواهد شد تا سایر بازیکنان از نقش او مطلع نشوند.

          </p>

          {/* =================================================
              SECTION 7
          ================================================== */}

          <h2 className="text-xl font-bold text-amber-400 mb-3">
            چرا بازی جاسوس آنلاین؟
          </h2>

          <p className="text-stone-300 text-sm leading-8">

            بازی جاسوس یک بازی فکری و اجتماعی برای تقویت دقت،
            توجه و مهارت تشخیص در یک جمع دوستانه است.

            اگر به دنبال یک بازی جاسوس رایگان، بازی جاسوس آنلاین،
            بازی جاسوس بدون نصب یا بازی گروهی برای مهمانی هستید،
            می‌توانید بازی را همین حالا در مرورگر خود اجرا کنید.

          </p>

        </div>

      </section>

    </main>
  );
}


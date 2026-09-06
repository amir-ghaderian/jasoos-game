
"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function InstallGameModal() {
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [installPrompt, setInstallPrompt] =
    useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const userAgent = navigator.userAgent;

    // تشخیص iPhone / iPad / iPod
    const ios =
      /iPhone|iPad|iPod/i.test(userAgent) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1);

    // تشخیص Android
    const android = /Android/i.test(userAgent);

    // بررسی اینکه برنامه قبلاً نصب شده است
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & {
        standalone?: boolean;
      }).standalone === true;

    // اگر روی دسکتاپ هستیم یا قبلاً نصب شده، چیزی نشان نده
    if (isStandalone || (!ios && !android)) {
      return;
    }

    // اگر قبلاً کاربر Modal را بسته، دوباره نشان نده
    const alreadySeen = localStorage.getItem(
      "jasoos-install-modal-seen"
    );

    if (alreadySeen === "true") {
      return;
    }

    setIsIOS(ios);
    setIsAndroid(android);

    // Android / Chrome
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      const installEvent = event as InstallPromptEvent;

      setInstallPrompt(installEvent);

      if (android) {
        window.setTimeout(() => {
          setShowModal(true);
        }, 800);
      }
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    // iPhone / iPad
    let iosTimer: number | undefined;

    if (ios) {
      iosTimer = window.setTimeout(() => {
        setShowModal(true);
      }, 800);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      if (iosTimer !== undefined) {
        window.clearTimeout(iosTimer);
      }
    };
  }, []);

  // بستن Modal
  const closeModal = () => {
    localStorage.setItem(
      "jasoos-install-modal-seen",
      "true"
    );

    setShowModal(false);
  };

  // نصب روی Android
  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }

    try {
      await installPrompt.prompt();

      const result = await installPrompt.userChoice;

      if (result.outcome === "accepted") {
        localStorage.setItem(
          "jasoos-install-modal-seen",
          "true"
        );

        setShowModal(false);
      }

      setInstallPrompt(null);
    } catch (error) {
      console.error("PWA installation failed:", error);
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <div
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-game-title"
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/70
        px-4
        backdrop-blur-sm
        animate-in
        fade-in
        duration-300
      "
    >
      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-slate-900
          via-slate-800
          to-indigo-950
          p-6
          text-white
          shadow-2xl
          animate-in
          zoom-in-95
          duration-300
        "
      >
        {/* دکمه بستن */}

        <button
          type="button"
          onClick={closeModal}
          aria-label="بستن"
          className="
            absolute
            left-4
            top-4
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/10
            text-xl
            text-white/80
            transition
            hover:bg-white/20
            hover:text-white
          "
        >
          ×
        </button>

        {/* آیکن */}

        <div className="mb-5 flex justify-center">
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-indigo-500/20
              text-5xl
              shadow-lg
            "
          >
            🕵️
          </div>
        </div>

        {/* عنوان */}

        <h2
          id="install-game-title"
          className="
            mb-3
            text-center
            text-2xl
            font-black
          "
        >
          بازی جاسوس را نصب کن
        </h2>

        <p
          className="
            mb-6
            text-center
            text-sm
            leading-7
            text-slate-300
          "
        >
          بازی جاسوس را به صفحه اصلی گوشی اضافه کن
          تا هر زمان خواستی، سریع و راحت وارد بازی شوی.
        </p>

        {/* =========================
            iOS
        ========================= */}

        {isIOS && (
          <div className="space-y-3">
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-4
              "
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="text-2xl">1️⃣</span>

                <span className="font-bold">
                  دکمه Share را بزن
                </span>
              </div>

              <p className="mr-9 text-sm leading-6 text-slate-300">
                در مرورگر Safari روی دکمه
                <span className="mx-1 font-bold text-white">
                  Share
                </span>
                بزن.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-4
              "
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="text-2xl">2️⃣</span>

                <span className="font-bold">
                  Add to Home Screen
                </span>
              </div>

              <p className="mr-9 text-sm leading-6 text-slate-300">
                گزینه
                <span className="mx-1 font-bold text-white">
                  Add to Home Screen
                </span>
                را انتخاب کن.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-4
              "
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">3️⃣</span>

                <span className="font-bold">
                  Add را بزن
                </span>
              </div>
            </div>
          </div>
        )}

        {/* =========================
            Android
        ========================= */}

        {isAndroid && (
          <div className="space-y-4">
            {installPrompt ? (
              <>
                <div
                  className="
                    rounded-2xl
                    border
                    border-green-400/20
                    bg-green-400/10
                    p-4
                    text-center
                  "
                >
                  <div className="mb-2 text-3xl">
                    📲
                  </div>

                  <p className="text-sm leading-6 text-slate-200">
                    بازی جاسوس آماده نصب روی گوشی شماست.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleInstall}
                  className="
                    w-full
                    rounded-2xl
                    bg-indigo-600
                    px-5
                    py-4
                    text-base
                    font-black
                    text-white
                    shadow-lg
                    transition
                    hover:bg-indigo-500
                    active:scale-[0.98]
                  "
                >
                  📲 نصب بازی جاسوس
                </button>
              </>
            ) : (
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  text-center
                "
              >
                <div className="mb-3 text-3xl">
                  📱
                </div>

                <p className="text-sm leading-7 text-slate-300">
                  از منوی مرورگر گزینه
                  <span className="mx-1 font-bold text-white">
                    Install app
                  </span>
                  یا
                  <span className="mx-1 font-bold text-white">
                    Add to Home screen
                  </span>
                  را انتخاب کن.
                </p>
              </div>
            )}
          </div>
        )}

        {/* بعداً */}

        <button
          type="button"
          onClick={closeModal}
          className="
            mt-5
            w-full
            rounded-2xl
            bg-white/5
            px-5
            py-3
            text-sm
            font-bold
            text-slate-300
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          بعداً
        </button>
      </div>
    </div>
  );
}


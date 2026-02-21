export const words = [
  {
    category: "📱 تکنولوژی",
    words: [
      "آیفون",
      "لپ‌تاپ",
      "اینترنت",
      "واتساپ",
      "اینستاگرام",
      "تلویزیون",
      "یخچال",
      "ماشین لباسشویی",
      "هدفون",
      "شارژر"
    ]
  },
  {
    category: "🍽️ آشپزخانه",
    words: [
      "پیتزا",
      "برگر",
      "ماکارونی",
      "کباب",
      "چای",
      "قهوه",
      "آش",
      "حلیم",
      "بستنی",
      "شیرینی"
    ]
  },
  {
    category: "🚗 وسایل نقلیه",
    words: [
      "ماشین",
      "موتورسیکلت",
      "دوچرخه",
      "هواپیما",
      "قطار",
      "اتوبوس",
      "تاکسی",
      "کشتی",
      "بالگرد",
      "اسکوتر"
    ]
  },
  {
    category: "🏠 خانه",
    words: [
      "اتاق خواب",
      "آشپزخانه",
      "حمام",
      "بالکن",
      "پشت بام",
      "حیاط",
      "پله",
      "آسانسور",
      "گاراژ",
      "انباری"
    ]
  },
  {
    category: "👕 لباس",
    words: [
      "پیراهن",
      "شلوار",
      "کت",
      "کفش",
      "جوراب",
      "کلاه",
      "شال",
      "دستکش",
      "کمربند",
      "کراوات"
    ]
  }
];

// همه کلمات رو در یک آرایه صاف کن
export const allWords = words.flatMap(category => category.words);

// کلید برای ذخیره در localStorage
const STORAGE_KEY = 'usedWords';

// تابع برای گرفتن کلمه رندوم بدون تکرار
export const getRandomWord = () => {
  // دریافت کلمه‌های استفاده شده از localStorage
  let usedWords: string[] = [];
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    usedWords = stored ? JSON.parse(stored) : [];
  }

  // کلمه‌های موجود (کلماتی که استفاده نشدن)
  const availableWords = allWords.filter(word => !usedWords.includes(word));

  // اگه همه کلمه‌ها استفاده شدن، لیست رو ریست کن
  if (availableWords.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
    usedWords = [];
    
    // حالا همه کلمه‌ها در دسترس هستن
    const randomIndex = Math.floor(Math.random() * allWords.length);
    const newWord = allWords[randomIndex];
    
    // ذخیره کلمه جدید در localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newWord]));
    }
    
    return newWord;
  }

  // انتخاب رندوم از کلمه‌های موجود
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const selectedWord = availableWords[randomIndex];

  // اضافه کردن کلمه جدید به لیست استفاده شده‌ها
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...usedWords, selectedWord]));
  }

  return selectedWord;
};

// تابع برای گرفتن چند کلمه مختلف (برای استفاده‌های دیگه)
export const getRandomWords = (count: number) => {
  const shuffled = [...allWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// تابع برای ریست کردن لیست کلمه‌های استفاده شده
export const resetUsedWords = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};
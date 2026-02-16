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
  
  // تابع برای گرفتن کلمه رندوم
  export const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * allWords.length);
    return allWords[randomIndex];
  };
  
  // تابع برای گرفتن چند کلمه مختلف
  export const getRandomWords = (count: number) => {
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
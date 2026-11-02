/* Greeting Card Studio - Data Library */
window.GCS_DATA = (function() {
  const OCCASION_CATEGORIES = [
    { id: 'personal', name: 'Personal Celebrations', icon: '🎉' },
    { id: 'indian', name: 'Indian Festivals', icon: '🪔' },
    { id: 'international', name: 'International Holidays', icon: '🌍' },
    { id: 'everyday', name: 'Everyday Greetings', icon: '💌' },
    { id: 'professional', name: 'Professional & Corporate', icon: '💼' },
    { id: 'custom', name: 'Custom Occasion', icon: '✨' },
  ];

  const OCCASIONS = [
    { id: 'birthday', name: 'Birthday', category: 'personal', icon: '🎂', colors: ['#FF6B6B', '#FFD93D', '#6BCB77'] },
    { id: 'wedding-anniversary', name: 'Wedding Anniversary', category: 'personal', icon: '💍', colors: ['#E91E63', '#F8BBD9'] },
    { id: 'engagement', name: 'Engagement', category: 'personal', icon: '💎', colors: ['#9C27B0', '#E1BEE7'] },
    { id: 'wedding', name: 'Wedding', category: 'personal', icon: '💒', colors: ['#FFFFFF', '#FCE4EC', '#C2185B'] },
    { id: 'baby-shower', name: 'Baby Shower', category: 'personal', icon: '🍼', colors: ['#81D4FA', '#F8BBD9'] },
    { id: 'new-baby', name: 'New Baby', category: 'personal', icon: '👶', colors: ['#B3E5FC', '#FCE4EC'] },
    { id: 'graduation', name: 'Graduation', category: 'personal', icon: '🎓', colors: ['#1A237E', '#FFD700'] },
    { id: 'retirement', name: 'Retirement', category: 'personal', icon: '🏖️', colors: ['#00897B', '#B2DFDB'] },
    { id: 'promotion', name: 'Promotion', category: 'personal', icon: '📈', colors: ['#1565C0', '#BBDEFB'] },
    { id: 'housewarming', name: 'Housewarming', category: 'personal', icon: '🏠', colors: ['#8D6E63', '#D7CCC8'] },
    { id: 'farewell', name: 'Farewell', category: 'personal', icon: '👋', colors: ['#5C6BC0', '#C5CAE9'] },
    { id: 'friendship-day', name: 'Friendship Day', category: 'personal', icon: '🤝', colors: ['#26A69A', '#B2DFDB'] },
    { id: 'valentines-day', name: "Valentine's Day", category: 'personal', icon: '❤️', colors: ['#E53935', '#FFCDD2'] },
    { id: 'mothers-day', name: "Mother's Day", category: 'personal', icon: '👩', colors: ['#EC407A', '#F8BBD9'] },
    { id: 'fathers-day', name: "Father's Day", category: 'personal', icon: '👨', colors: ['#1976D2', '#BBDEFB'] },
    { id: 'best-friend', name: 'Best Friend Greetings', category: 'personal', icon: '🌟', colors: ['#FF7043', '#FFCCBC'] },
    { id: 'diwali', name: 'Diwali', category: 'indian', icon: '🪔', colors: ['#FF6F00', '#FFD54F'] },
    { id: 'holi', name: 'Holi', category: 'indian', icon: '🎨', colors: ['#E91E63', '#FFEB3B', '#2196F3'] },
    { id: 'sankranti', name: 'Sankranti', category: 'indian', icon: '🪁', colors: ['#FF5722', '#FFC107'] },
    { id: 'ugadi', name: 'Ugadi', category: 'indian', icon: '🌸', colors: ['#C62828', '#FFEB3B'] },
    { id: 'pongal', name: 'Pongal', category: 'indian', icon: '🌾', colors: ['#F57C00', '#FFF176'] },
    { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', category: 'indian', icon: '🐘', colors: ['#F57C00', '#FFECB3'] },
    { id: 'navratri', name: 'Navratri', category: 'indian', icon: '💃', colors: ['#D32F2F', '#FFC107'] },
    { id: 'dussehra', name: 'Dussehra', category: 'indian', icon: '🏹', colors: ['#C62828', '#FFD54F'] },
    { id: 'durga-puja', name: 'Durga Puja', category: 'indian', icon: '🕉️', colors: ['#AD1457', '#F8BBD9'] },
    { id: 'onam', name: 'Onam', category: 'indian', icon: '🌺', colors: ['#2E7D32', '#FFEB3B'] },
    { id: 'raksha-bandhan', name: 'Raksha Bandhan', category: 'indian', icon: '🧿', colors: ['#E91E63', '#FCE4EC'] },
    { id: 'janmashtami', name: 'Janmashtami', category: 'indian', icon: '🦚', colors: ['#1565C0', '#BBDEFB'] },
    { id: 'christmas', name: 'Christmas', category: 'international', icon: '🎄', colors: ['#C62828', '#2E7D32', '#FFD700'] },
    { id: 'new-year', name: 'New Year', category: 'international', icon: '🎆', colors: ['#1565C0', '#FFD700'] },
    { id: 'easter', name: 'Easter', category: 'international', icon: '🐰', colors: ['#CE93D8', '#A5D6A7'] },
    { id: 'eid-fitr', name: 'Eid al-Fitr', category: 'international', icon: '🌙', colors: ['#00695C', '#A5D6A7'] },
    { id: 'thanksgiving', name: 'Thanksgiving', category: 'international', icon: '🦃', colors: ['#E65100', '#FFCC80'] },
    { id: 'halloween', name: 'Halloween', category: 'international', icon: '🎃', colors: ['#FF6F00', '#212121'] },
    { id: 'chinese-new-year', name: 'Chinese New Year', category: 'international', icon: '🧧', colors: ['#C62828', '#FFD700'] },
    { id: 'thank-you', name: 'Thank You', category: 'everyday', icon: '🙏', colors: ['#5C6BC0', '#C5CAE9'] },
    { id: 'sorry', name: 'Sorry', category: 'everyday', icon: '😔', colors: ['#78909C', '#CFD8DC'] },
    { id: 'get-well', name: 'Get Well Soon', category: 'everyday', icon: '💐', colors: ['#66BB6A', '#C8E6C9'] },
    { id: 'congratulations', name: 'Congratulations', category: 'everyday', icon: '🎊', colors: ['#7B1FA2', '#E1BEE7'] },
    { id: 'good-luck', name: 'Good Luck', category: 'everyday', icon: '🍀', colors: ['#43A047', '#C8E6C9'] },
    { id: 'best-wishes', name: 'Best Wishes', category: 'everyday', icon: '✨', colors: ['#5E35B1', '#D1C4E9'] },
    { id: 'welcome', name: 'Welcome', category: 'everyday', icon: '🤗', colors: ['#00897B', '#B2DFDB'] },
    { id: 'thinking-of-you', name: 'Thinking of You', category: 'everyday', icon: '💭', colors: ['#7E57C2', '#D1C4E9'] },
    { id: 'good-morning', name: 'Good Morning', category: 'everyday', icon: '☀️', colors: ['#FFA726', '#FFE0B2'] },
    { id: 'good-night', name: 'Good Night', category: 'everyday', icon: '🌙', colors: ['#5C6BC0', '#C5CAE9'] },
    { id: 'employee-appreciation', name: 'Employee Appreciation', category: 'professional', icon: '🏆', colors: ['#1565C0', '#BBDEFB'] },
    { id: 'work-anniversary', name: 'Work Anniversary', category: 'professional', icon: '📅', colors: ['#00695C', '#B2DFDB'] },
    { id: 'new-job', name: 'New Job', category: 'professional', icon: '💼', colors: ['#2E7D32', '#C8E6C9'] },
    { id: 'client-appreciation', name: 'Client Appreciation', category: 'professional', icon: '🤝', colors: ['#4527A0', '#D1C4E9'] },
    { id: 'project-completion', name: 'Project Completion', category: 'professional', icon: '✅', colors: ['#388E3C', '#C8E6C9'] },
    { id: 'custom', name: 'Custom Occasion', category: 'custom', icon: '✏️', colors: ['#7E57C2', '#D1C4E9'] },
  ];

  const CARD_FORMATS = {
    square: { name: 'Square (1080×1080)', width: 1080, height: 1080 },
    portrait: { name: 'Portrait (1080×1350)', width: 1080, height: 1350 },
    landscape: { name: 'Landscape (1920×1080)', width: 1920, height: 1080 },
    story: { name: 'Story (1080×1920)', width: 1080, height: 1920 },
    '5x7': { name: '5×7 inch Print', width: 1500, height: 2100 },
    a6: { name: 'A6 Print', width: 1240, height: 1748 },
  };

  const STICKERS = ['🎂','🎉','🎈','🎁','⭐','✨','💖','❤️','💕','🌸','🌺','🌻','🌼','🍀','🌈','☀️','🌙','💫','🎊','🪔','🎄','🎅','❄️','🎃','🐰','🎓','💍','🏠','👶','💐','🦋','🕊️','🎀','🧸','🍰','🧁','🥂','🍾','🏆','🧿','🐘','🌾'];

  const BG_PRESETS = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Soft Pink', value: '#FFF0F5' },
    { name: 'Cream', value: '#FFF8E7' },
    { name: 'Light Blue', value: '#E3F2FD' },
    { name: 'Mint', value: '#E8F5E9' },
    { name: 'Lavender', value: '#F3E5F5' },
    { name: 'Dark Elegant', value: '#1A1A2E' },
    { name: 'Deep Navy', value: '#0D1B2A' },
    { name: 'Crimson', value: '#B71C1C' },
    { name: 'Sunset', value: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #6BCB77 100%)' },
    { name: 'Ocean', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Rose Gold', value: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)' },
    { name: 'Night Sky', value: 'linear-gradient(180deg, #0F2027 0%, #203A43 50%, #2C5364 100%)' },
    { name: 'Gold', value: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)' },
    { name: 'Diwali Glow', value: 'linear-gradient(180deg, #1A0A00 0%, #4A1C00 40%, #FF6F00 100%)' },
    { name: 'Christmas', value: 'linear-gradient(180deg, #0B3D0B 0%, #1B5E20 50%, #C62828 100%)' },
  ];

  // Templates (simplified for size)
  const TEMPLATES = [
    { id: 'tpl-birthday-1', name: 'Birthday Balloons', occasionId: 'birthday', style: 'festive', width: 1080, height: 1350, background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #6BCB77 100%)', elements: [
      { type: 'text', content: 'Happy Birthday!', x: 540, y: 400, fontSize: 64, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#FFFFFF', textAlign: 'center' },
      { type: 'text', content: 'Wishing you an amazing day!', x: 540, y: 520, fontSize: 28, fontFamily: 'Arial', fill: '#FFFFFF', textAlign: 'center' },
    ]},
    { id: 'tpl-birthday-2', name: 'Elegant Birthday', occasionId: 'birthday', style: 'elegant', width: 1080, height: 1350, background: '#1A1A2E', elements: [
      { type: 'text', content: 'HAPPY BIRTHDAY', x: 540, y: 450, fontSize: 56, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#E94560', textAlign: 'center' },
      { type: 'text', content: 'Celebrate another year of wonderful you', x: 540, y: 560, fontSize: 24, fontFamily: 'Arial', fill: '#AAAAAA', textAlign: 'center' },
    ]},
    { id: 'tpl-birthday-3', name: 'Cute Cake', occasionId: 'birthday', style: 'cute', width: 1080, height: 1080, background: 'linear-gradient(180deg, #FFF0F5 0%, #FFE4E9 100%)', elements: [
      { type: 'text', content: '🎂', x: 540, y: 300, fontSize: 100, textAlign: 'center' },
      { type: 'text', content: 'Happy Birthday!', x: 540, y: 480, fontSize: 48, fontFamily: 'Comic Sans MS', fontWeight: 'bold', fill: '#FF1493', textAlign: 'center' },
    ]},
    { id: 'tpl-diwali-1', name: 'Diwali Lights', occasionId: 'diwali', style: 'festive', width: 1080, height: 1350, background: 'linear-gradient(180deg, #1A0A00 0%, #4A1C00 40%, #FF6F00 100%)', elements: [
      { type: 'text', content: '🪔', x: 540, y: 300, fontSize: 90, textAlign: 'center' },
      { type: 'text', content: 'Happy Diwali', x: 540, y: 480, fontSize: 56, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#FFD54F', textAlign: 'center' },
      { type: 'text', content: 'May the festival of lights bring joy & prosperity', x: 540, y: 600, fontSize: 24, fontFamily: 'Arial', fill: '#FFFFFF', textAlign: 'center' },
    ]},
    { id: 'tpl-diwali-2', name: 'Shubh Deepavali', occasionId: 'diwali', style: 'traditional', width: 1080, height: 1080, background: '#8B0000', elements: [
      { type: 'text', content: 'शुभ दीपावली', x: 540, y: 400, fontSize: 52, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#FFD700', textAlign: 'center' },
      { type: 'text', content: 'Happy Diwali', x: 540, y: 520, fontSize: 36, fontFamily: 'Arial', fill: '#FFFFFF', textAlign: 'center' },
    ]},
    { id: 'tpl-christmas-1', name: 'Merry Christmas', occasionId: 'christmas', style: 'festive', width: 1080, height: 1350, background: 'linear-gradient(180deg, #0B3D0B 0%, #1B5E20 50%, #C62828 100%)', elements: [
      { type: 'text', content: '🎄', x: 540, y: 300, fontSize: 90, textAlign: 'center' },
      { type: 'text', content: 'Merry Christmas', x: 540, y: 480, fontSize: 52, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#FFD700', textAlign: 'center' },
      { type: 'text', content: 'Wishing you peace, joy and happiness', x: 540, y: 600, fontSize: 24, fontFamily: 'Arial', fill: '#FFFFFF', textAlign: 'center' },
    ]},
    { id: 'tpl-valentine-1', name: 'Romantic Hearts', occasionId: 'valentines-day', style: 'romantic', width: 1080, height: 1350, background: 'linear-gradient(180deg, #FFEBEE 0%, #FCE4EC 40%, #E91E63 100%)', elements: [
      { type: 'text', content: '❤️', x: 540, y: 320, fontSize: 90, textAlign: 'center' },
      { type: 'text', content: "Happy Valentine's Day", x: 540, y: 500, fontSize: 44, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#880E4F', textAlign: 'center' },
      { type: 'text', content: 'You make my heart smile every day', x: 540, y: 620, fontSize: 26, fontFamily: 'Arial', fill: '#AD1457', textAlign: 'center' },
    ]},
    { id: 'tpl-wedding-1', name: 'Elegant Wedding', occasionId: 'wedding', style: 'elegant', width: 1080, height: 1350, background: 'linear-gradient(180deg, #FAFAFA 0%, #FCE4EC 100%)', elements: [
      { type: 'text', content: 'Congratulations', x: 540, y: 400, fontSize: 36, fontFamily: 'Georgia', fill: '#880E4F', textAlign: 'center' },
      { type: 'text', content: 'On Your Wedding', x: 540, y: 500, fontSize: 48, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#C2185B', textAlign: 'center' },
    ]},
    { id: 'tpl-newyear-1', name: 'New Year Sparkle', occasionId: 'new-year', style: 'modern', width: 1080, height: 1080, background: 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #415A77 100%)', elements: [
      { type: 'text', content: 'Happy New Year!', x: 540, y: 420, fontSize: 52, fontFamily: 'Arial', fontWeight: 'bold', fill: '#FFD700', textAlign: 'center' },
      { type: 'text', content: 'May this year bring new opportunities', x: 540, y: 540, fontSize: 24, fontFamily: 'Arial', fill: '#E0E0E0', textAlign: 'center' },
    ]},
    { id: 'tpl-thankyou-1', name: 'Simple Thank You', occasionId: 'thank-you', style: 'minimalist', width: 1080, height: 1080, background: '#F5F5F5', elements: [
      { type: 'text', content: 'Thank You', x: 540, y: 420, fontSize: 60, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#3949AB', textAlign: 'center' },
      { type: 'text', content: 'Your kindness means the world', x: 540, y: 540, fontSize: 24, fontFamily: 'Arial', fill: '#555555', textAlign: 'center' },
    ]},
    { id: 'tpl-grad-1', name: 'Graduation Pride', occasionId: 'graduation', style: 'professional', width: 1080, height: 1350, background: 'linear-gradient(180deg, #1A237E 0%, #283593 100%)', elements: [
      { type: 'text', content: '🎓', x: 540, y: 320, fontSize: 90, textAlign: 'center' },
      { type: 'text', content: 'Congratulations Graduate!', x: 540, y: 500, fontSize: 40, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#FFD700', textAlign: 'center' },
    ]},
    { id: 'tpl-holi-1', name: 'Holi Colors', occasionId: 'holi', style: 'festive', width: 1080, height: 1080, background: 'linear-gradient(45deg, #E91E63, #FFEB3B, #2196F3, #4CAF50)', elements: [
      { type: 'text', content: 'Happy Holi!', x: 540, y: 420, fontSize: 56, fontFamily: 'Arial', fontWeight: 'bold', fill: '#FFFFFF', textAlign: 'center' },
    ]},
    { id: 'tpl-mother-1', name: "Mother's Love", occasionId: 'mothers-day', style: 'floral', width: 1080, height: 1350, background: 'linear-gradient(180deg, #FCE4EC 0%, #F8BBD9 100%)', elements: [
      { type: 'text', content: '🌸', x: 540, y: 300, fontSize: 80, textAlign: 'center' },
      { type: 'text', content: "Happy Mother's Day", x: 540, y: 460, fontSize: 44, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#AD1457', textAlign: 'center' },
    ]},
    { id: 'tpl-corporate-1', name: 'Corporate Thanks', occasionId: 'employee-appreciation', style: 'corporate', width: 1920, height: 1080, background: 'linear-gradient(90deg, #0D47A1 0%, #1565C0 100%)', elements: [
      { type: 'text', content: 'Thank You for Your Dedication', x: 960, y: 420, fontSize: 44, fontFamily: 'Arial', fontWeight: 'bold', fill: '#FFFFFF', textAlign: 'center' },
    ]},
    { id: 'tpl-getwell-1', name: 'Get Well Soon', occasionId: 'get-well', style: 'nature', width: 1080, height: 1350, background: 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%)', elements: [
      { type: 'text', content: '💐', x: 540, y: 320, fontSize: 80, textAlign: 'center' },
      { type: 'text', content: 'Get Well Soon', x: 540, y: 480, fontSize: 48, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#2E7D32', textAlign: 'center' },
    ]},
    { id: 'tpl-rakhi-1', name: 'Rakhi Special', occasionId: 'raksha-bandhan', style: 'traditional', width: 1080, height: 1080, background: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)', elements: [
      { type: 'text', content: 'Happy Raksha Bandhan', x: 540, y: 450, fontSize: 40, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#C2185B', textAlign: 'center' },
    ]},
    { id: 'tpl-blank-1', name: 'Minimalist Blank', occasionId: 'custom', style: 'minimalist', width: 1080, height: 1350, background: '#FFFFFF', elements: [
      { type: 'text', content: 'Your Message Here', x: 540, y: 600, fontSize: 36, fontFamily: 'Arial', fill: '#999999', textAlign: 'center' },
    ]},
    { id: 'tpl-blank-2', name: 'Gradient Modern', occasionId: 'custom', style: 'gradient', width: 1080, height: 1080, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', elements: [
      { type: 'text', content: 'Special Day', x: 540, y: 480, fontSize: 48, fontFamily: 'Arial', fontWeight: 'bold', fill: '#FFFFFF', textAlign: 'center' },
    ]},
  ];

  const MESSAGES = {
    birthday: {
      en: {
        heartfelt: 'Wishing you a birthday filled with love, laughter, and all the things that make you happiest. May this year bring you closer to your dreams!',
        funny: "Happy Birthday! Another year older, another year wiser... or at least that's what we'll tell people. Enjoy your special day!",
        friendly: "Happy Birthday, my friend! Hope your day is as awesome as you are.",
        simple: 'Happy Birthday! Wishing you a wonderful day and an amazing year ahead.',
        inspirational: "On your birthday, remember how far you've come. The best is yet to come!",
      },
      hi: {
        heartfelt: 'जन्मदिन की हार्दिक शुभकामनाएँ! आपका दिन खुशियों और प्यार से भरा हो।',
        simple: 'जन्मदिन मुबारक! आपको बहुत-बहुत शुभकामनाएँ।',
        funny: 'जन्मदिन मुबारक! एक साल और बड़े हो गए... केक काटने में मदद चाहिए?',
      },
      te: {
        heartfelt: 'పుట్టినరోజు శుభాకాంక్షలు! మీ రోజు సంతోషం మరియు ఆనందంతో నిండి ఉండాలని కోరుకుంటున్నాను.',
        simple: 'పుట్టినరోజు శుభాకాంక్షలు!',
      },
    },
    diwali: {
      en: {
        traditional: 'May the divine light of Diwali spread into your life and bring peace, prosperity and happiness. Happy Diwali!',
        heartfelt: 'Wishing you and your family a Diwali filled with lights, laughter and love.',
        simple: 'Happy Diwali! May this festival of lights brighten your life.',
      },
      hi: {
        traditional: 'दीपावली की हार्दिक शुभकामनाएँ! भगवान आपको सुख, समृद्धि और खुशियाँ प्रदान करें।',
      },
      te: {
        traditional: 'దీపావళి శుభాకాంక్షలు! ఈ పండుగ మీ జీవితాన్ని వెలుగుతో నింపాలని కోరుకుంటున్నాను.',
      },
    },
    christmas: {
      en: {
        heartfelt: 'May the magic of Christmas fill your heart with joy and your home with love. Merry Christmas!',
        simple: 'Merry Christmas! Wishing you peace, joy and happiness.',
        friendly: 'Merry Christmas! Hope Santa brings you everything on your list!',
      },
    },
    'valentines-day': {
      en: {
        romantic: 'Every moment with you feels like a dream. Happy Valentine\'s Day to the one who owns my heart.',
        heartfelt: 'You make every day brighter. Happy Valentine\'s Day!',
        funny: "Roses are red, violets are blue, I'm terrible at poetry, but I love you!",
        simple: "Happy Valentine's Day! You mean the world to me.",
      },
    },
    'thank-you': {
      en: {
        heartfelt: 'Thank you from the bottom of my heart. Your kindness means more than words can express.',
        simple: 'Thank you so much! I truly appreciate everything you\'ve done.',
        professional: 'Thank you for your outstanding contribution and professionalism.',
      },
    },
    graduation: {
      en: {
        inspirational: 'Congratulations on your graduation! This is just the beginning of an incredible journey.',
        heartfelt: "So proud of all you've achieved. Congratulations, graduate!",
      },
    },
    'new-year': {
      en: {
        inspirational: 'Happy New Year! May this year bring new opportunities and moments that take your breath away.',
        simple: 'Happy New Year! Wishing you health, happiness and success.',
      },
    },
    'mothers-day': {
      en: {
        emotional: 'Mom, thank you for your endless love and strength. You are my greatest blessing. Happy Mother\'s Day!',
        heartfelt: "Happy Mother's Day to the most amazing woman I know.",
        simple: "Happy Mother's Day! Thank you for everything.",
      },
    },
    'get-well': {
      en: {
        heartfelt: 'Sending you warm wishes and healing thoughts. Get well soon!',
        simple: 'Get well soon! Wishing you a speedy recovery.',
      },
    },
    custom: {
      en: {
        simple: 'Wishing you all the best on this special occasion!',
        heartfelt: 'On this special day, I wanted to share how much you mean to me. Celebrating you!',
      },
    },
  };

  function generateMessage(occasionId, tone, lang, recipient) {
    const occ = MESSAGES[occasionId] || MESSAGES.custom;
    const langMsgs = occ[lang] || occ.en || {};
    let msg = langMsgs[tone] || langMsgs.heartfelt || langMsgs.simple || Object.values(langMsgs)[0] || 'Wishing you all the best!';
    if (recipient) {
      msg = 'Dear ' + recipient + ',\n\n' + msg;
    }
    return msg;
  }

  return {
    OCCASION_CATEGORIES,
    OCCASIONS,
    CARD_FORMATS,
    STICKERS,
    BG_PRESETS,
    TEMPLATES,
    MESSAGES,
    generateMessage,
  };
})();

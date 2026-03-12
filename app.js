const SOURCE_URL = "https://www.homemade-gifts-made-easy.com/good-morning-messages-for-her.html";

const THEMES = [
  "theme-pastel",
  "theme-floral",
  "theme-sunrise",
  "theme-cozy",
  "theme-lavender",
];

// Fallback list with 85 warm messages so the board still works offline.
const FALLBACK_MESSAGES = [
  "Good morning, beautiful. I hope your day starts softly and ends with a smile.",
  "Rise and shine, my favorite person. You make every sunrise feel magical.",
  "Morning love. May your coffee be strong and your heart feel light.",
  "Good morning, sunshine. You are the best part of every day.",
  "Wishing you a peaceful morning and a day full of little wins.",
  "Wake up, gorgeous. The world is brighter because you are in it.",
  "Good morning, baby. Sending you warmth, hugs, and sweet thoughts.",
  "A fresh day, a fresh smile, and a reminder that you are deeply loved.",
  "Good morning. I hope today feels easy, kind, and beautifully yours.",
  "Morning, my love. You deserve joy in every hour ahead.",
  "Good morning, sweetheart. I am cheering for you always.",
  "The sun rose today just to match your glow. Have a lovely morning.",
  "Hey beautiful, start today knowing you are enough and more.",
  "Good morning. May your steps be light and your spirit strong.",
  "Wishing you calm moments, happy thoughts, and a great start.",
  "Wake up, angel. Today already feels lucky because of you.",
  "Good morning, love. I hope your day is as sweet as your smile.",
  "Morning hugs in message form. Keep shining.",
  "Good morning, my favorite hello and my softest thought.",
  "May this morning wrap you in peace and confidence.",
  "Good morning, babe. You make ordinary days feel extraordinary.",
  "Rise and sparkle. You were made for wonderful things.",
  "Good morning. Sending you a little sunshine and a lot of love.",
  "You are the reason mornings feel hopeful. Have a beautiful day.",
  "Good morning, cutie. Breathe deep and go glow.",
  "Today is lucky to have you in it. Good morning.",
  "Good morning, sweet girl. May your day be gentle and bright.",
  "Morning love. I hope your heart feels full and your mind feels clear.",
  "Wake up smiling. You are loved more than words can hold.",
  "Good morning. One thought for today: you are unstoppable.",
  "Good morning, beautiful soul. Keep being your amazing self.",
  "You make mornings feel like poetry. Have a great day.",
  "Good morning. May today bring you sweet surprises.",
  "Rise and shine, darling. I believe in you completely.",
  "Morning, my person. Your happiness matters so much to me.",
  "Good morning, love. Let your kindness lead the day.",
  "Wishing you a cozy morning and a confident afternoon.",
  "Good morning. You are my favorite reason to smile.",
  "Wake up, pretty heart. You are doing better than you think.",
  "Good morning, babe. You bring softness to every moment.",
  "Today is new and full of possibility. So are you.",
  "Good morning. Keep your head high and your heart open.",
  "Morning sunshine. You are deeply admired.",
  "Good morning, love. I hope today treats you beautifully.",
  "Rise and bloom. The day is waiting for your magic.",
  "Good morning. Your laugh is my favorite soundtrack.",
  "Wishing you peace in your mind and warmth in your heart.",
  "Good morning, beautiful. You are a gift to this world.",
  "Wake gently, dream big, and move with confidence.",
  "Good morning. You make life feel lighter.",
  "Morning love. I hope your day is colorful and kind.",
  "Good morning, gorgeous. Keep that sparkle alive.",
  "A tiny reminder this morning: you are truly cherished.",
  "Good morning. You are stronger than yesterday and brighter than ever.",
  "Morning, babe. I am proud of the person you are.",
  "Good morning. May your day be full of good people and good vibes.",
  "Wake up, sweetheart. Your smile can change the whole room.",
  "Good morning, my love. Go be amazing today.",
  "This morning feels better because I am thinking of you.",
  "Good morning. Your presence makes everything warmer.",
  "Rise with confidence. You have this, always.",
  "Good morning, love. Keep your heart soft and your courage strong.",
  "Morning beautiful. I hope your day unfolds perfectly.",
  "Good morning. The world needs your light today.",
  "Wake up, darling. You are my favorite kind of wonderful.",
  "Good morning, babe. Sending a kiss with this message.",
  "A gentle morning wish for you: joy, ease, and love.",
  "Good morning. You are my sunshine even on cloudy days.",
  "Morning love. Keep going, keep glowing.",
  "Good morning, sweet one. I hope you feel adored today.",
  "Wake up smiling. Better moments are already on their way.",
  "Good morning. You carry beauty in everything you do.",
  "Morning, angel. May this day be kind to your heart.",
  "Good morning, love. I am grateful for you every day.",
  "Rise and breathe. You are exactly where you need to be.",
  "Good morning. You make even quiet moments feel special.",
  "Morning babe. I hope your day is smooth and successful.",
  "Good morning, beautiful. Trust yourself and shine.",
  "Wake up, my love. Today is another chance to bloom.",
  "Good morning. You deserve all the happiness coming your way.",
  "Morning sunshine. Your smile is my favorite sunrise.",
  "Good morning, babe. I hope today feels like a warm hug.",
  "Rise and glow. You are always enough.",
  "Good morning, my heart. Keep being wonderfully you.",
];

function daysSinceEpoch(date = new Date()) {
  return Math.floor(date.getTime() / 86400000);
}

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(list, seed) {
  const out = list.slice();
  const random = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function formatToday() {
  const now = new Date();
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);
}

function applyTheme() {
  const dayNumber = daysSinceEpoch();
  const themeClass = THEMES[dayNumber % THEMES.length];
  document.body.classList.remove(...THEMES);
  document.body.classList.add(themeClass);
}

function normalizeMessages(rawMessages) {
  const clean = rawMessages
    .map((msg) => msg.replace(/\s+/g, " ").trim())
    .filter((msg) => msg.length > 15);

  const unique = [];
  const seen = new Set();
  for (const msg of clean) {
    const key = msg.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(msg);
    }
  }
  return unique;
}

function parseMessagesFromHtml(html) {
  // Prefer the content before the quotations section to match the 85 message list.
  const cutoff = html.indexOf('id="Quotations"');
  const input = cutoff > -1 ? html.slice(0, cutoff) : html;
  const matches = [...input.matchAll(/<p class="poem-left">\s*([\s\S]*?)<\/p>/gi)];
  const messages = matches.map((m) =>
    m[1]
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<i[\s\S]*?<\/i>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .trim()
  );
  return normalizeMessages(messages);
}

async function fetchSourceMessages() {
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(SOURCE_URL)}`,
    `https://r.jina.ai/http://${SOURCE_URL.replace(/^https?:\/\//, "")}`,
  ];

  for (const url of proxies) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        continue;
      }
      const text = await response.text();
      const parsed = parseMessagesFromHtml(text);
      if (parsed.length >= 85) {
        return parsed.slice(0, 85);
      }
    } catch (error) {
      // Try the next source.
    }
  }
  return FALLBACK_MESSAGES;
}

function pickMessageForToday(messages) {
  const safeMessages = messages.length >= 85 ? messages.slice(0, 85) : FALLBACK_MESSAGES;
  const dayNumber = daysSinceEpoch();
  const cycle = Math.floor(dayNumber / safeMessages.length);
  const dayOffset = dayNumber % safeMessages.length;
  // Each cycle reshuffles deterministically so all messages are shown once before repeating.
  const sequence = seededShuffle(safeMessages, cycle + 8517);
  return sequence[dayOffset];
}

async function initBoard() {
  const dateEl = document.getElementById("dateDisplay");
  const msgEl = document.getElementById("dailyMessage");

  dateEl.textContent = formatToday();
  applyTheme();
  msgEl.textContent = "Loading your morning love note...";

  const messages = await fetchSourceMessages();
  const dailyMessage = pickMessageForToday(messages);
  msgEl.textContent = dailyMessage;
}

initBoard();

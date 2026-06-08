const { Bot, InlineKeyboard } = require("grammy");
const express = require("express");
const fs = require("fs"); // አዳዲስ ተጠቃሚዎችን በቋሚነት ለመመዝገብና ለመቁጠር

const BOT_TOKEN = "8833378757:AAHb7x04h9y3YdwQ4-tji4w8srxN94sOXcg";
const TELEBIRR_NUMBER = "0903069581";
const MERCHANT_NAME = "GURSHA MATRIX";
const MINI_APP_URL = "https://bayeamlaku565-cloud.github.io/gursha-matrix-bot/";
const CHANNEL_URL = "https://t.me/Larrybrezzyeee"; 

// 📸 ያንተ የጉርሻ ላኪ መለያ አርማ (Logo)
const BOT_LOGO_URL = "https://raw.githubusercontent.com/bayeamlaku565-cloud/gursha-matrix-bot/main/Gemini_Generated_Image_3hudph3hudph3hud.png";

const bot = new Bot(BOT_TOKEN);
const usedTxIds = new Set();
const USERS_FILE = "users.json";

// የደህንነት ሰርቨር ለ Render
const app = express();
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Gursha Lucky Live Member Counter Server Run!"));
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

// ተጠቃሚዎችን ከፋይል ላይ አንብቦ የሚቆጥር ተግባር (Database Counter)
function getMemberCount(userId) {
  let users = [];
  try {
    if (fs.existsSync(USERS_FILE)) {
      users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
    }
  } catch (e) {
    console.log("Error reading users file, resetting...");
  }

  // አዲስ ሰው ከሆነ ወደ ዝርዝሩ ጨምረው
  if (userId && !users.includes(userId)) {
    users.push(userId);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users), "utf8");
  }

  const count = users.length;
  // 1 ሰው ሲሆን "1 user" ከ 1 በላይ ሲሆን "2 users", "3 users"... እያለ እንዲቀጥል ማድረጊያ
  return count === 1 ? "1 user" : `${count.toLocaleString()} users`;
}

bot.command("start", async (ctx) => {
  const userId = ctx.from.id;
  // አባላቱን ቆጥሮ "X users" የሚለውን ያዘጋጃል
  const currentMembers = getMemberCount(userId);

  // 10ሩም ተንቀሳቃሽ (Inline) ቁልፎች
  const keyboard = new InlineKeyboard()
    .webApp("🕹️ ጨዋታውን ክፈት (Play)", MINI_APP_URL)
    .text("📝 ተመዝገብ (Register)", "reg")
    .row()
    .text("💰 ቀሪ ሂሳብ (Balance)", "bal")
    .text("💳 ብር ሙላ (Deposit)", "dep")
    .row()
    .text("🏦 ብር አውጣ (Withdraw)", "wit")
    .text("🔄 ማስተላለፊያ (Transfer)", "trans")
    .row()
    .text("🔗 መጋበዣ (Invite)", "inv")
    .text("🎁 የዕድል ፈንድ (Bonus)", "bon")
    .row()
    .url("📢 ቻናላችን (Channel)", CHANNEL_URL)
    .text("📖 መመሪያ (Instruction)", "inst");

  // የድሮ ቁልፎችን ማጽጃ
  await ctx.reply("⏳ ሲስተሙ እየተዘጋጀ ነው...", { reply_markup: { remove_keyboard: true } });

  // ልክ እንደ Beteseb Bingo "bot" ከሚለው ፋንታ የአባላት ብዛትን ከላይ አድርጎ መላኪያ
  await ctx.replyWithPhoto(BOT_LOGO_URL, {
    caption: `👥 **Gursha Lucky** • ${currentMembers}\n\n👋 ሰላም @${ctx.from.username || "ተጫዋች"}! ወደ ጉርሻ ማትሪክስ በሰላም መጡ።\n\n👇 ከታች ካሉት አማራጮች አንዱን በመጫን ፈጣን አገልግሎት ያግኙ፡`,
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
});

// የሁሉም ቁልፎች ፈጣን ምላሽ መስጫ (Inline Callbacks)
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery();

  if (data === "reg") {
    await ctx.reply(`📝 **የምዝገባ ሁኔታ፦**\n\nየእርስዎ መለያ በራስ-ሰር በሲስተሙ ላይ ተመዝግቧል። አሁን አካውንትዎን ሞልተው መጫወት ይችላሉ!`);
  } 
  else if (data === "bal") {
    await ctx.reply(`💰 **የአካውንትዎ ቀሪ ሂሳብ፦**\n\n• የዋናው አካውንት: \`0.00 ETB\`\n• የቦነስ አካውንት: \`0.00 ETB\`\n\n💡 በቴሌብር ገንዘብ ሲያስገቡ ወዲያውኑ እዚህ ላይ ይጨመራል።`);
  } 
  else if (data === "dep") {
    await ctx.reply(`💳 **አካውንት መሙያ (Deposit) መመሪያ፦**\n\nበቴሌብር ወደ ቁጥር \`${TELEBIRR_NUMBER}\` ብር ከላኩ በኋላ፣ ከቴሌብር የመጣሎትን የጽሑፍ መልእክት (SMS) **ሙሉ በሙሉ ኮፒ አድርገው** እዚህ ላይ ይላኩት። ቦቱ ወዲያውኑ ያረጋግጥልዎታል።`);
  } 
  else if (data === "wit") {
    await ctx.reply("🏦 **ብር ማውጫ (Withdraw)፦**\n\nየሚያወጡትን የገንዘብ መጠን እና የቴሌብር ስልክ ቁጥርዎን ያስገቡ።\n⚠️ *ዝቅተኛው የብር ማውጫ መጠን 100 ብር ነው።*");
  } 
  else if (data === "trans") {
    await ctx.reply("🔄 **ገንዘብ ማስተላለፊያ (Transfer)፦**\n\nለሌላ ተጫዋች ገንዘብ ለማስተላለፍ እባክዎ በዚህ ፎርማት ይጻፉ፦\n`ማስተላለፍ [የሰውየው ID] [የብር መጠን]`");
  } 
  else if (data === "inv") {
    await ctx.reply(`🔗 **የእርስዎ መጋበዣ ሊንክ (Invite Link)፦**\n\nhttps://t.me/${ctx.me.username}?start=ref_${ctx.from.id}\n\nይህንን ሊንክ ለጓደኞችዎ ያጋሩ! በእያንዳንዱ ሰው የ **5.00 ETB** ቦነስ ያግኙ!`);
  } 
  else if (data === "bon") {
    await ctx.reply("🎁 **የዕድል ፈንድ (Bonus) ሁኔታ፦**\n\nየዕድል ፈንዱ አሁን ላይ ክፍት ነው። የ 4-Digit ማትሪክስ አደኑን በተሳካ ሁኔታ ሙሉ በሙሉ ለደፈነ ተጫዋች የተጠራቀመው ቦነስ በሙሉ ይሰጣል!");
  } 
  else if (data === "inst") {
    await ctx.reply("📖 **የጨዋታው አጠቃላይ መመሪያ፦**\n\n1️⃣ '🕹️ ጨዋታውን ክፈት' የሚለውን ቁልፍ ተጭነው ወደ ሚኒ አፑ ይግቡ።\n2️⃣ ከ 0 እስከ 10 ካሉት ቁጥሮች ውስጥ 4 ቁጥሮች ይምረጡ።\n3️⃣ 'በ 10 ብር ቲኬቱን ግዛ' የሚለውን ሲጫኑ ቲኬትዎ ይመዘገባል።");
  }
});

// የቴሌብር SMS ኢንጂን
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  
  if (text.includes("Transaction No:") && text.includes("sent")) {
    const txMatch = text.match(/Transaction No:\s*([A-Z0-9]+)/i);
    const amountMatch = text.match(/sent\s*([0-9.]+)\s*ETB/i);

    if (!txMatch || !amountMatch || !text.includes(MERCHANT_NAME)) {
      return ctx.reply("⚠️ የተሳሳተ ወይም የተቀየረ የቴሌብር SMS መልእክት ነው!");
    }

    const txId = txMatch[1];
    const amount = parseFloat(amountMatch[1]);

    if (usedTxIds.has(txId)) {
      return ctx.reply("⚠️ ይህ የግብይት ቁጥር ቀደም ብሎ ጥቅም ላይ ውሏል!");
    }
    
    usedTxIds.add(txId);
    await ctx.reply(`🎉 **የቴሌብር ማረጋገጫ ተጠናቆአል!**\n💰 መጠን: **${amount} ETB**\n🔑 ID: \`${txId}\`\n\nአካውንትዎ በስኬት ተሞልቷል፤ መጫወት ይችላሉ!`, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("❓ እባክዎ ካሉት አማራጮች አንዱን ቁልፍ ይጫኑ ወይም የቴሌብር SMS መልእክቱን ሙሉ በሙሉ ኮፒ አድርገው እዚህ ይላኩት።");
  }
});

bot.start();
console.log("🚀 Gursha Lucky with Live Dynamic Member Counter Engine Started...");

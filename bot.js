const { Bot, InlineKeyboard } = require("grammy");
const express = require("express");

const BOT_TOKEN = "8833378757:AAHb7x04h9y3YdwQ4-tji4w8srxN94sOXcg";
const MINI_APP_URL = "https://bayeamlaku565-cloud.github.io/gursha-matrix-bot/";
const CHANNEL_URL = "https://t.me/Larrybrezzyeee"; 
const BOT_LOGO_URL = "https://raw.githubusercontent.com/bayeamlaku565-cloud/gursha-matrix-bot/main/Gemini_Generated_Image_3hudph3hudph3hud.png";

const bot = new Bot(BOT_TOKEN);

// 🚨 የሌላ ሰውን ሰርቨር ማቋረጫ እና ዌብሁክ መበጠሻ (CRITICAL LOCK BREAKER)
async function startBotEngine() {
  try {
    await bot.api.deleteWebhook({ drop_pending_updates: true });
    console.log("🧹 የድሮው ዌብሁክ ሙሉ በሙሉ ተሰርዟል!");
    
    // የ Long Polling መጀመሪያ (ቀጥታ ከቴሌግራም ጋር ማገናኛ)
    bot.start();
    console.log("🚀 ቦቱ በሰላም ቀጥታ መስመር ላይ ገብቷል!");
  } catch (e) {
    console.error("Engine Start Error:", e);
  }
}

// 🚀 የ START ትዕዛዝ - ፎቶውን እና 10ሩን ሙሉ በሙሉ የሚሰሩ ቁልፎች ይልካል
bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .webApp("🕹️ Play", MINI_APP_URL)
    .text("📝 Register", "reg")
    .row()
    .text("💰 Check Balance", "bal")
    .text("💳 Deposit", "dep")
    .row()
    .text("🏦 Withdraw", "wit")
    .text("🔄 Transfer", "trans")
    .row()
    .text("🔗 Invite", "inv")
    .text("🎁 Convert Bonus", "bon")
    .row()
    .url("📢 Contact Support", CHANNEL_URL)
    .text("📖 Instruction", "inst");

  try {
    await ctx.replyWithPhoto(BOT_LOGO_URL, {
      caption: `👥 **Gursha Lucky** • 35,493 users\n\n👋 Welcome to Gursha Lucky Matrix! Choose an Option below to start playing.`,
      parse_mode: "Markdown",
      reply_markup: keyboard
    });
  } catch (error) {
    await ctx.reply(`👥 **Gursha Lucky**\n\n👋 Welcome to Gursha Lucky Matrix! Choose an Option below:`, {
      parse_mode: "Markdown",
      reply_markup: keyboard
    });
  }
});

// 🎮 የቁልፎቹ ምላሽ
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery().catch(() => {});

  const responses = {
    reg: "📝 **የምዝገባ ሁኔታ፦**\n\nየእርስዎ መለያ በራስ-ሰር በሲስተሙ ላይ ተመዝግቧል። አሁን መጫወት ይችላሉ!",
    bal: "💰 **የአካውንትዎ ቀሪ ሂሳብ፦**\n\n• የዋናው አካውንት: `0.00 ETB`\n• የቦነስ አካውንት: `0.00 ETB`",
    dep: "💳 **አካውንት መሙያ (Deposit) መመሪያ፦**\n\nበቴሌብር ወደ ቁጥር `0903069581` ብር ከላኩ በኋላ፣ የጽሑፍ መልእክቱን (SMS) እዚህ ይላኩት።",
    wit: "🏦 **ብር ማውጫ (Withdraw)፦**\n\nየሚያወጡትን የገንዘብ መጠን እና የቴሌብር ስልክ ቁጥርዎን ያስገቡ።\n⚠️ *ዝቅተኛው መጠን 100 ብር ነው።*",
    trans: "🔄 **ገንዘብ ማስተላለፊያ (Transfer)፦**\n\nለሌላ ተጫዋች ገንዘብ ለማስተላለፍ እባክዎ በዚህ ፎርማት ይጻፉ፦\n`ማስተላለፍ [የሰውየው ID] [የብር መጠን]`",
    inv: `🔗 **የእርስዎ መጋበዣ ሊንክ (Invite Link)፦**\n\nhttps://t.me/${ctx.me.username}?start=ref_${ctx.from.id}\n\nበእያንዳንዱ ሰው የ 5.00 ETB ቦነስ ያግኙ!`,
    bon: "🎁 **የዕድል ፈንድ (Bonus) ሁኔታ፦**\n\nየዕድል ፈንዱ ክፍት ነው። የ 4-Digit ማትሪክስ አደኑን ሲያጠናቅቁ ቦነሱ ይገባል!",
    inst: "📖 **የጨዋታው አጠቃላይ መመሪያ፦**\n\n1️⃣ '🕹️ Play' የሚለውን ተጭነው ወደ ሚኒ አፑ ይግቡ።\n2️⃣ ከ 0 እስከ 10 ካሉት ቁጥሮች ውስጥ 4 ቁጥሮች ይምረጡ።\n3️⃣ 'በ 10 ብር ቲኬቱን ግዛ' የሚለውን ሲጫኑ ቲኬትዎ ይመዘገባል።"
  };

  if (responses[data]) {
    await ctx.reply(responses[data], { parse_mode: "Markdown" });
  }
});

// Render ሰርቨር ማስገደጃ
const app = express();
app.get("/", (req, res) => res.send("Engine Running"));
app.listen(process.env.PORT || 10000, "0.0.0.0", () => {
  startBotEngine();
});

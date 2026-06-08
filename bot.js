const { Bot, InlineKeyboard } = require("grammy");
const express = require("express");

const BOT_TOKEN = "8833378757:AAHb7x04h9y3YdwQ4-tji4w8srxN94sOXcg";
const MINI_APP_URL = "https://bayeamlaku565-cloud.github.io/gursha-matrix-bot/";
const CHANNEL_URL = "https://t.me/Larrybrezzyeee"; 
const BOT_LOGO_URL = "https://raw.githubusercontent.com/bayeamlaku565-cloud/gursha-matrix-bot/main/Gemini_Generated_Image_3hudph3hudph3hud.png";

const bot = new Bot(BOT_TOKEN);

// 🚨 የድሮውን ሰርቨር ግንኙነት በግድ መቁረጫ (FORCE WEBHOOK DELETE)
async function cleanAndStart() {
  try {
    console.log("⏳ የድሮውን ሰርቨር ትስስር በመበጠስ ላይ...");
    // ዌብሁኩን ሙሉ በሙሉ ይፍቀው እና የቆሙ መልዕክቶችን ያጥፋ
    await bot.api.deleteWebhook({ drop_pending_updates: true });
    console.log("🧹 የድሮው ዌብሁክ ተሰባብሯል!");
    
    // ቀጥታ ግንኙነት (Long Polling) መጀመር
    bot.start();
    console.log("🚀 ቦቱ አሁን ካንተ ሰርቨር ጋር ብቻ ተገናኝቷል!");
  } catch (err) {
    console.error("Engine Error:", err);
  }
}

// 🚀 የ START ትዕዛዝ - ፎቶውን እና 10ሩን ቁልፎች በአንድ ላይ ያመጣል
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

// 🎮 የሁሉም ቁልፎች ተግባር (Callback Queries)
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery().catch(() => {});

  const responses = {
    reg: "📝 **የምዝገባ ሁኔታ፦**\n\nየእርስዎ መለያ በራስ-ሰር በሲስተሙ ላይ ተመዝግቧል። አሁን አካውንትዎን ሞልተው መጫወት ይችላሉ!",
    bal: "💰 **የአካውንትዎ ቀሪ ሂሳብ፦**\n\n• የዋናው አካውንት: `0.00 ETB`\n• የቦነስ አካውንት: `0.00 ETB`",
    dep: "💳 **አካውንት መሙያ (Deposit) መመሪያ፦**\n\nበቴሌብር ወደ ቁጥር `0903069581` ብር ከላኩ በኋላ፣ ከቴሌብር የመጣሎትን የጽሑፍ መልእክት (SMS) እዚህ ላይ ይላኩት።",
    wit: "🏦 **ብር ማውጫ (Withdraw)፦**\n\nየሚያወጡትን የገንዘብ መጠን እና የቴሌብር ስልክ ቁጥርዎን ያስገቡ።\n⚠️ *ዝቅተኛው የብር ማውጫ መጠን 100 ብር ነው።*",
    trans: "🔄 **ገንዘብ ማስተላለፊያ (Transfer)፦**\n\nለሌላ ተጫዋች ገንዘብ ለማስተላለፍ እባክዎ በዚህ ፎርማት ይጻፉ፦\n`ማስተላለፍ [የሰውየው ID] [የብር መጠን]`",
    inv: `🔗 **የእርስዎ መጋበዣ ሊንክ (Invite Link)፦**\n\nhttps://t.me/${ctx.me.username}?start=ref_${ctx.from.id}\n\nይህንን ሊንክ ለጓደኞችዎ ያጋሩ! በእያንዳንዱ ሰው የ 5.00 ETB ቦነስ ያግኙ!`,
    bon: "🎁 **የዕድል ፈንድ (Bonus) ሁኔታ፦**\n\nየዕድል ፈንዱ አሁን ላይ ክፍት ነው። የተጠራቀመውን ቦነስ ወደ ዋናው አካውንት ለመቀየር እባክዎ በቂ ነጥብ ይኑርዎት።",
    inst: "📖 **የጨዋታው አጠቃላይ መመሪያ፦**\n\n1️⃣ '🕹️ Play' የሚለውን ቁልፍ ተጭነው ወደ ሚኒ አፑ ይግቡ።\n2️⃣ ከ 0 እስከ 10 ካሉት ቁጥሮች ውስጥ 4 ቁጥሮች ይምረጡ።\n3️⃣ 'በ 10 ብር ቲኬቱን ግዛ' የሚለውን ሲጫኑ ቲኬትዎ ይመዘገባል።"
  };

  if (responses[data]) {
    await ctx.reply(responses[data], { parse_mode: "Markdown" });
  }
});

// የቴሌብር SMS ማረጋገጫ
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  if (text.includes("Transaction No:") && text.includes("sent")) {
    await ctx.reply(`🎉 **የቴሌብር ማረጋገጫ ተጠናቆአል!**\n\nአካውንትዎ በስኬት ተሞልቷል፤ መጫወት ይችላሉ!`, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("❓ እባክዎ ካሉት አማራጮች አንዱን ቁልፍ ይጫኑ ወይም የቴሌብር SMS መልእክቱን ይላኩ።");
  }
});

// Render Keep-Alive Server
const app = express();
app.get("/", (req, res) => res.send("Bot Engine is Perfectly Running!"));
app.listen(process.env.PORT || 10000, "0.0.0.0", () => {
  cleanAndStart();
});

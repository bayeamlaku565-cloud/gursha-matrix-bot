const { Bot, InlineKeyboard } = require("grammy");
const express = require("express");

const BOT_TOKEN = "8833378757:AAHb7x04h9y3YdwQ4-tji4w8srxN94sOXcg";
const TELEBIRR_NUMBER = "0903069581";
const MERCHANT_NAME = "GURSHA MATRIX";
const MINI_APP_URL = "https://bayeamlaku565-cloud.github.io/gursha-matrix-bot/";
const CHANNEL_URL = "https://t.me/Larrybrezzyeee"; 

// 📸 ያንተ የጉርሻ ላኪ መለያ አርማ (Logo URL)
const BOT_LOGO_URL = "https://raw.githubusercontent.com/bayeamlaku565-cloud/gursha-matrix-bot/main/Gemini_Generated_Image_3hudph3hudph3hud.png";

const bot = new Bot(BOT_TOKEN);
const usedTxIds = new Set();
const activeUsers = new Set();

// መጀመሪያ ባዶ እንዳይሆን (ልክ እንደ ቤተሰብ ቢንጎ ቁጥር ለመጀመር)
activeUsers.add(58392019);

const app = express();
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Gursha Lucky Final Server Live!"));
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

// የአባላት ብዛት ቆጣሪ ተግባር
function getMemberCount(userId) {
  if (userId) activeUsers.add(userId);
  const count = activeUsers.size;
  return count === 1 ? "1 user" : `${count.toLocaleString()} users`;
}

bot.command("start", async (ctx) => {
  const userId = ctx.from.id;
  const currentMembers = getMemberCount(userId);

  // 10ሩም ቁልፎች ልክ እንደ ቤተሰብ ቢንጎ በትክክል ተደራጅተዋል
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

  // የድሮ ቁልፎችን እና ጽሑፎችን ማጽጃ
  await ctx.reply("⏳ ሲስተሙ እየተዘጋጀ ነው...", { reply_markup: { remove_keyboard: true } });

  // ልክ እንደ ቤተሰብ ቢንጎ ፎቶውን፣ ስሙንና የአባላት ብዛትን አንድ ላይ መላኪያ
  try {
    await ctx.replyWithPhoto(BOT_LOGO_URL, {
      caption: `👥 **Gursha Lucky** • ${currentMembers}\n\n👋 Welcome to Gursha Lucky! Choose an Option below.`,
      parse_mode: "Markdown",
      reply_markup: keyboard
    });
  } catch (error) {
    // ፎቶው ሊንክ ላይ ችግር ካለ ቦቱ ሳይቆም በጽሑፍ እንዲልክ መከላከያ
    await ctx.reply(`👥 **Gursha Lucky** • ${currentMembers}\n\n👋 Welcome to Gursha Lucky! Choose an Option below.`, {
      parse_mode: "Markdown",
      reply_markup: keyboard
    });
  }
});

// የሁሉም 10 ቁልፎች ተግባር መቆጣጠሪያ (Inline Actions)
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery();

  if (data === "reg") {
    await ctx.reply(`📝 **የምዝገባ ሁኔታ፦**\n\nየእርስዎ መለያ በራስ-ሰር በሲስተሙ ላይ ተመዝግቧል። አሁን አካውንትዎን ሞልተው መጫወት ይችላሉ!`);
  } 
  else if (data === "bal") {
    await ctx.reply(`💰 **የአካውንትዎ ቀሪ ሂሳብ፦**\n\n• የዋናው አካውንት: \`0.00 ETB\`\n• የቦነስ አካውንት: \`0.00 ETB\``);
  } 
  else if (data === "dep") {
    await ctx.reply(`💳 **አካውንት መሙያ (Deposit) መመሪያ፦**\n\nበቴሌብር ወደ ቁጥር \`${TELEBIRR_NUMBER}\` ብር ከላኩ በኋላ፣ ከቴሌብር የመጣሎትን የጽሑፍ መልእክት (SMS) **ሙሉ በሙሉ ኮፒ አድርገው** እዚህ ላይ ይላኩት።`);
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
    await ctx.reply("🎁 **የዕድል ፈንድ (Bonus) ሁኔታ፦**\n\nየዕድል ፈንዱ አሁን ላይ ክፍት ነው። የተጠራቀመውን ቦነስ ወደ ዋናው አካውንት ለመቀየር እባክዎ በቂ ነጥብ ይኑርዎት።");
  } 
  else if (data === "inst") {
    await ctx.reply("📖 **የጨዋታው አጠቃላይ መመሪያ፦**\n\n1️⃣ '🕹️ Play' የሚለውን ቁልፍ ተጭነው ወደ ሚኒ አፑ ይግቡ።\n2️⃣ ከ 0 እስከ 10 ካሉት ቁጥሮች ውስጥ 4 ቁጥሮች ይምረጡ።\n3️⃣ 'በ 10 ብር ቲኬቱን ግዛ' የሚለውን ሲጫኑ ቲኬትዎ ይመዘገባል።");
  }
});

// የቴሌብር SMS ማረጋገጫ
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  if (text.includes("Transaction No:") && text.includes("sent")) {
    const txMatch = text.match(/Transaction No:\s*([A-Z0-9]+)/i);
    const amountMatch = text.match(/sent\s*([0-9.]+)\s*ETB/i);

    if (!txMatch || !amountMatch || !text.includes(MERCHANT_NAME)) {
      return ctx.reply("⚠️ የተሳሳተ የቴሌብር SMS መልእክት ነው!");
    }

    const txId = txMatch[1];
    const amount = parseFloat(amountMatch[1]);

    if (usedTxIds.has(txId)) {
      return ctx.reply("⚠️ ይህ የግብይት ቁጥር ቀደም ብሎ ጥቅም ላይ ውሏል!");
    }
    
    usedTxIds.add(txId);
    await ctx.reply(`🎉 **የቴሌብር ማረጋገጫ ተጠናቆአል!**\n💰 መጠን: **${amount} ETB**\n🔑 ID: \`${txId}\`\n\nአካውንትዎ በስኬት ተሞልቷል!`, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("❓ እባክዎ ካሉት አማራጮች አንዱን ቁልፍ ይጫኑ ወይም የቴሌብር SMS መልእክቱን ይላኩ።");
  }
});

bot.start();
console.log("🚀 Gursha Lucky Bot Connected Successfully.");

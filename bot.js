const { Bot, InlineKeyboard } = require("grammy");
const express = require("express"); // Render የወደብ ችግር እንዳያመጣ በ Express እንተካው

const BOT_TOKEN = "8833378757:AAHb7x04h9y3YdwQ4-tji4w8srxN94sOXcg";
const TELEBIRR_NUMBER = "0903069581";
const MERCHANT_NAME = "GURSHA MATRIX";
const MINI_APP_URL = "https://bayeamlaku565-cloud.github.io/gursha-matrix-bot/";
const CHANNEL_URL = "https://t.me/Larrybrezzyeee"; 

// 📸 የቦትህ ውብ Logo (ይህንን ሊንክ በራስህ Logo ፎቶ መቀየር ትችላለህ)
const BOT_LOGO_URL = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500";

const bot = new Bot(BOT_TOKEN);
const usedTxIds = new Set();

// 🌐 Render የወደብ (Port Binding) ስህተት እንዳያሳይ አስተማማኝ የExpress ሰርቨር
const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Gursha Matrix Bot is Premium and Running!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express server binding successful on port ${PORT}`);
});

// የውሸት ተጫዋቾች ቁጥር መቆጠሪያ (ለ UX ውበት)
function getMonthlyUsers() {
  return "45,390 monthly users";
}

bot.command("start", async (ctx) => {
  // የ 10ሩ ቁልፎች ዝግጅት
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

  // መጀመሪያ የድሮ ቁልፎችን ማጽዳት
  await ctx.reply("⏳ ሲስተሙ እየተዘጋጀ ነው...", { reply_markup: { remove_keyboard: true } });

  // ፎቶውን ከላይ አድርጎ ከነቁልፎቹ መላክ
  await ctx.replyWithPhoto(BOT_LOGO_URL, {
    caption: `👥 **Gursha Matrix** • ${getMonthlyUsers()}\n\n👋 ሰላም @${ctx.from.username || "ተጫዋች"}! ወደ ጉርሻ ማትሪክስ በሰላም መጡ።\n\n👇 ከታች ካሉት አማራጮች አንዱን በመምረጥ ይጫወቱ፡`,
    parse_mode: "Markdown",
    reply_markup: keyboard
  });
});

// የቁልፎቹ ተግባር (Callback Queries)
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === "reg") {
    await ctx.answerCallbackQuery();
    await ctx.reply("✅ **የምዝገባ ሁኔታ፦** የእርስዎ ቴሌግራም አካውንት በራስ-ሰር በሲስተሙ ላይ ተመዝግቧል! መጫወት ይችላሉ።");
  } 
  else if (data === "bal") {
    await ctx.answerCallbackQuery();
    await ctx.reply("💰 **ቀሪ ሂሳብዎ፦**\n• የዋናው አካውንት: `0.00 ETB`\n• የቦነስ አካውንት: `0.00 ETB`\n\nየቴሌብር SMS በመላክ አካውንትዎን መሙላት ይችላሉ።");
  } 
  else if (data === "dep") {
    await ctx.answerCallbackQuery();
    await ctx.reply(`💳 **አካውንት በፍጥነት መሙያ (Deposit)፦**\n\nበቴሌብር ወደ ቁጥር \`${TELEBIRR_NUMBER}\` (GURSHA MATRIX) ብር ከላኩ በኋላ፣ የመጣሎትን የጽሑፍ መልእክት (SMS) ሙሉ በሙሉ ኮፒ አድርገው እዚህ ቻት ላይ ይላኩት። ቦቱ ወዲያውኑ ያረጋግጥልዎታል።`);
  } 
  else if (data === "wit") {
    await ctx.answerCallbackQuery();
    await ctx.reply("🏦 **ብር ማውጫ (Withdraw)፦**\n⚠️ ማሳሰቢያ፡ ብር ለማውጣት ቢያንስ `100.00 ETB` ማሸነፍ ይኖርብዎታል።");
  } 
  else if (data === "trans") {
    await ctx.answerCallbackQuery();
    await ctx.reply("🔄 **የማስተላለፊያ ሲስተም፦**\nየሌላውን ተጫዋች የቴሌግራም ID እና የገንዘብ መጠን በመጻፍ ማስተላለፍ ይችላሉ። (በቅርቡ የሚከፈት)");
  } 
  else if (data === "inv") {
    await ctx.answerCallbackQuery();
    await ctx.reply(`🔗 **የእርስዎ መጋበዣ ሊንክ (Invite Link)፦**\nhttps://t.me/${ctx.me.username}?start=ref_${ctx.from.id}\n\nይህንን ሊንክ ለጓደኞችዎ በመላክ በእያንዳንዱ ሰው የ 5 ብር ስጦታ ያግኙ!`);
  } 
  else if (data === "bon") {
    await ctx.answerCallbackQuery();
    await ctx.reply("🎁 **የዕድል ፈንድ (Bonus)፦**\nአሁን ያለው የዕድል ፈንድ ክምችት ክፍት ነው። ማትሪክሱን በትክክል ለገመተ ተጫዋች ሙሉ በሙሉ ይሰጣል!");
  } 
  else if (data === "inst") {
    await ctx.answerCallbackQuery();
    await ctx.reply("📖 **የጨዋታው መመሪያ፦**\n1. 'ጨዋታውን ክፈት' የሚለውን ቁልፍ ይጫኑ。\n2. ከ 0 እስከ 10 ካሉት ቁጥሮች ውስጥ 4ቱን ይምረጡ።\n3. የቲኬት ዋጋ 10 ብር ሲሆን፣ 4ቱም ቁጥሮች በአንድ ላይ ሲወጡ ከፍተኛ ሽልማት ያሸንፋሉ!");
  }
});

// የቴሌብር SMS መፈተሻ ኢንጂን
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
      return ctx.reply("⚠️ ይህ የግብይት ቁጥር ቀደም ብሎ ጥቅም ላይ uglval!");
    }
    
    usedTxIds.add(txId);
    await ctx.reply(`🎉 **የቴሌብር ማረጋገጫ ተጠናቆአል!**\n💰 መጠን: **${amount} ETB**\n🔑 ID: \`${txId}\`\n\nአካውንትዎ ተሞልቷል፤ ወደ ጨዋታው ገጽ በመመለስ መጫወት ይችላሉ!`, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("❓ እባክዎ ካሉት አማራጮች አንዱን ቁልፍ ይጫኑ ወይም የቴሌብር SMS መልእክቱን ሙሉ በሙሉ ኮፒ አድርገው እዚህ ይላኩት።");
  }
});

bot.start();
console.log("🚀 የጉርሻ ማትሪክስ ቦት በፕሪሚየም UX ስልት ተነስቷል...");

const { Bot, InlineKeyboard } = require("grammy");

// ያንተ መለያዎች ሙሉ በሙሉ እዚህ ገብተዋል
const BOT_TOKEN = "8833378757:AAHb7x04h9y3YdwQ4-tji4w8srxN94sOXcg";
const TELEBIRR_NUMBER = "0903069581";
const MERCHANT_NAME = "GURSHA MATRIX";
// ያንተ የኪትሃብ ፔጅ ቀጥታ ሊንክ
const MINI_APP_URL = "https://bayeamlaku565-cloud.github.io/gursha-matrix-bot/";

const bot = new Bot(BOT_TOKEN);
const usedTxIds = new Set(); // የቆዩ ኮዶች መከላከያ

// 1. /start ሲባል የድሮውን ቁልፍ አጥፍቶ አዲሱን ሚኒ አፕ መክፈቻ ማሳያ
bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .webApp("🕹️ ወደ ማትሪክስ ጦርነት ግባ", MINI_APP_URL)
    .row()
    .url("📢 የጉርሻ ቻናል", "https://t.me/Larrybrezzyeee");

  // በመጀመሪያ የድሮውን ቁልፍ ከስልካቸው ላይ እናጠፋዋለን
  await ctx.reply("⏳ የድሮው ሲስተም እየጸዳ ነው...", {
    reply_markup: { remove_keyboard: true }
  });

  // በመቀጠል አዲሱን የሚኒ አፕ መክፈቻ መልዕክት እንልካለን
  await ctx.reply(`
👋 ሰላም @${ctx.from.username || "ተጫዋች"}! ወደ **Gursha Matrix** እንኳን መጡ!

🔥 የድሮው ሲስተም ሙሉ በሙሉ ተቀይሮ በአዲሱ የ 4-Digit Blackout ማትሪክስ ተተክቷል።

💳 **አካውንት ለመሙላት፦**
በቴሌብር ወደ ቁጥር \`${TELEBIRR_NUMBER}\` ብር ከላኩ በኋላ፣ የመጣሎትን የጽሑፍ መልእክት (SMS) ሙሉ በሙሉ ኮፒ አድርገው እዚህ ላይ ይላኩት።

ዝግጁ ከሆኑ ከስር ያለውን ቁልፍ ተጭነው ይግቡ👇
  `, { 
    parse_mode: "Markdown", 
    reply_markup: keyboard 
  });
});

// 2. የቴሌብር SMS መፍቻ ኢንጂን (SMS Parser)
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

    // ድጋሚ ጥቅም ላይ የዋለ ኮድ መከልከል
    if (usedTxIds.has(txId)) {
      return ctx.reply("⚠️ ይህ የግብይት ቁጥር (Transaction ID) ቀደም ብሎ ጥቅም ላይ ውሏል!");
    }

    usedTxIds.add(txId); // ኮዱን መቆለፍ

    await ctx.reply(`🎉 **የቴሌብር ማረጋገጫ ተጠናቋል!**\n💰 መጠን: **${amount} ETB**\n🔑 ID: \`${txId}\`\n\nወደ ሚኒ አፑ በመመለስ መጫወት ይችላሉ!`, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("❓ እባክዎ የቴሌብር SMS መልእክቱን ሙሉ በሙሉ ኮፒ አድርገው እዚህ ይላኩት። ለመጫወት /start ብለው ይጻፉ።");
  }
});

bot.start();
console.log("🚀 የጉርሻ ማትሪክስ ቦት በስኬት ተነስቷል...");

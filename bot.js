const { Bot, InlineKeyboard } = require("grammy");
const http = require("http");

const BOT_TOKEN = "8833378757:AAHb7x04h9y3YdwQ4-tji4w8srxN94sOXcg";
const TELEBIRR_NUMBER = "0903069581";
const MERCHANT_NAME = "GURSHA MATRIX";
const MINI_APP_URL = "https://bayeamlaku565-cloud.github.io/gursha-matrix-bot/";
// ⚠️ እዚህ ጋ ያንተን ትክክለኛ የቻናል መጋበዣ ሊንክ ማስገባት ትችላለህ
const CHANNEL_URL = "https://t.me/MyAird_09"; 

const bot = new Bot(BOT_TOKEN);
const usedTxIds = new Set();

// Render ሰርቨር እንዳይዘጋ በሩን ክፍት ማድረግ (Dummy Server)
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running perfectly\n");
});
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .webApp("🕹️ ወደ ማትሪክስ ጦርነት ግባ", MINI_APP_URL)
    .row()
    .url("📢 የጉርሻ ቻናል", CHANNEL_URL);

  // የድሮ ቁልፎችን ሙሉ በሙሉ ማጽጃ
  await ctx.reply("⏳ የድሮው ሲስተም እየጸዳ ነው...", {
    reply_markup: { remove_keyboard: true }
  });

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

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  
  // የቴሌብር SMS መፈተኛ ኢንጂን
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
    await ctx.reply(`🎉 **የቴሌብር ማረጋገጫ ተጠናቋል!**\n💰 መጠን: **${amount} ETB**\n🔑 ID: \`${txId}\`\n\nወደ ሚኒ አፑ በመመለስ መጫወት ይችላሉ!`, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("❓ እባክዎ የቴሌብር SMS መልእክቱን ሙሉ በሙሉ ኮፒ አድርገው እዚህ ይላኩት። ለመጫወት /start ብለው ይጻፉ።");
  }
});

bot.start();
console.log("🚀 የጉርሻ ማትሪክስ ቦት በስኬት ተነስቷል...");

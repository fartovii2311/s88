import fetch from 'node-fetch';

const handler = async (m, { text, command, args, usedPrefix }) => {
  if (!text) {
    return m.reply(`*• Ingresa un texto*\n\n*Ejemplo:*\n*${usedPrefix + command}* Hola bot`);
  }
  
  await m.react('📩');

  try {
    const apiBingia = await fetch(`https://delirius-apiofc.vercel.app/ia/bingia?query=${encodeURIComponent(text)}`);
    const resBingia = await apiBingia.json();

    if (resBingia.status) {
      return m.reply(resBingia.data); 
    } else {
      const apiChatGPT = await fetch(`https://delirius-apiofc.vercel.app/ia/chatgpt?q=${encodeURIComponent(text)}`);
      const resChatGPT = await apiChatGPT.json();

      if (resChatGPT.status) {
        return m.reply(resChatGPT.data); 
      } else {
        console.log("Ambas APIs fallaron");
      }
    }
  } catch (error) {
    await m.react('❌');
  }
};

handler.help = ['simi'];
handler.tags = ['fun'];
handler.command = /^((sim)?simi|alexa|cortana|bot)$/i;

export default handler;

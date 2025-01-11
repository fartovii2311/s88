import fetch from 'node-fetch';

const handler = async (m, { text, command, args, usedPrefix }) => {
  if (!text) {
    return m.reply(`*• Ingresa un texto*\n\n*Ejemplo:*\n*${usedPrefix + command}* Hola bot`);
  }

  try {
    const api = await fetch(`https://delirius-apiofc.vercel.app/ia/bingia?query=${encodeURIComponent(text)}`);
    const resBingia = await api.json();

    if (resBingia.status) {
      m.reply(resBingia.data);
    } else {
      throw new Error("Error en la respuesta de la API");
    }
  } catch (error) {
   await 
  }
};

handler.help = ['simi'];
handler.tags = ['fun'];
handler.command = /^((sim)?simi|alexa|cortana|bot)$/i;

export default handler;

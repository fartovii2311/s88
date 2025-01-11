import fetch from 'node-fetch';

const handler = async (m, { text, command, args, usedPrefix }) => {
  if (!text) {
    return m.reply(`*• Ingresa un texto*\n\n*Ejemplo:*\n*${usedPrefix + command}* Hola bot`);
  }

  try {
    // Usamos encodeURIComponent para codificar el texto antes de pasarlo en la URL
    const api = await fetch(`https://delirius-apiofc.vercel.app/ia/bingia?query=${encodeURIComponent(text)}`);
    const resBingia = await api.json();

    if (resBingia.status) {
      m.reply(resBingia.data);  // Si la respuesta es válida, la enviamos al chat
    } else {
      throw new Error("Error en la respuesta de la API");
    }
  } catch (error) {
    // Si ocurre un error, lo capturamos y enviamos un mensaje de error
    m.reply("Ocurrió un error al procesar tu solicitud.");
  }
};

handler.help = ['simi'];
handler.tags = ['fun'];
handler.command = /^((sim)?simi|alexa|cortana|bot)$/i;

export default handler;

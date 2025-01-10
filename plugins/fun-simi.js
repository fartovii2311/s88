import fetch from 'node-fetch';

const handler = async (m, { text, command, args, usedPrefix }) => {
  if (!text) {
    return m.reply(`*• Ingresa un texto*\n\n*Ejemplo:*\n*${usedPrefix + command}* Hola bot`);
  }

  try {
    const api = await fetch(`https://delirius-apiofc.vercel.app/ia/llamaia?query=${encodeURIComponent(text)}`);
    const resLlama = await api.json();

    if (resLlama.status) {
      m.reply(resLlama.data); // Responde con el contenido de 'data' de la API
    } else {
      m.reply('Hubo un problema al obtener la respuesta de la API.');
    }
  } catch (error) {
    m.reply(`Ocurrió un error al procesar tu solicitud: ${error.message}`);
  }
};

handler.help = ['simi'];
handler.tags = ['fun'];
handler.command = /^((sim)?simi|alexa|cortana|bot)$/i;

export default handler;

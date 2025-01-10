import fetch from 'node-fetch';

const handler = async (m, { text, command, args, usedPrefix }) => {
  if (!text) {
    return m.reply(`*• Ingresa un texto*\n\n*Ejemplo:*\n*${usedPrefix + command}* Hola bot`);
  }

  try {
    // Consultar la API Llama 3.1 para obtener la respuesta
    const api = await fetch(`https://delirius-apiofc.vercel.app/ia/llamaia?query=${encodeURIComponent(text)}`);
    const resLlama = await api.json();

    if (resLlama.status) {
      // Si la API devuelve una respuesta satisfactoria
      m.reply(resLlama.data);
    } else {
      // Si la API no responde correctamente
      throw new Error('Error al procesar la respuesta');
    }
  } catch (error) {
    // Si todo falla, lanzamos un error
    throw `*Miku Bot😺* | 「 *ERROR* 」\n\nOcurrió un *Error*`;
  }
};

handler.help = ['simi'];
handler.tags = ['fun'];
handler.command = /^((sim)?simi|alexa|cortana|bot)$/i;

export default handler;

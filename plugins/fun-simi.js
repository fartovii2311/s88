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
    try {
      // Si algo falla, intentamos usar la API de traducción y BrainShop AI
      const reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=' + text);
      const resu = await reis.json();
      const nama = m.pushName || '1';
      const api = await fetch('http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=' + nama + '&msg=' + resu[0][0][0]);
      const res = await api.json();
      const reis2 = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=' + res.cnt);
      const resu2 = await reis2.json();
      m.reply(resu2[0][0][0]);
    } catch (e) {
      // Si todo falla, lanzamos un error de reserva
      throw `*Miku Bot😺* | 「 *ERROR* 」\n\nOcurrió un *Error*`;
    }
  }
};

handler.help = ['simi'];
handler.tags = ['fun'];
handler.command = /^((sim)?simi|alexa|cortana|bot)$/i;

export default handler;

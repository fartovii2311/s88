import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    try {
      let response = await fetch('https://dark-core-api.vercel.app/api/random/milf?key=api');
      let data = await response.json();
  
      if (!data.success) {
        return conn.reply(m.chat, '❌ No se pudo obtener la imagen. Intenta de nuevo más tarde.', m);
      }
  
      await conn.sendFile(m.chat, data.url, 'milf.jpg', 'Aquí tienes 🔥', m);
    } catch (error) {
      console.error(error);
      await conn.reply(m.chat, '❌ Ocurrió un error al obtener la imagen.', m);
    }
  };
  
handler.help = ['milf'];
handler.tags = ['random'];
handler.command = ['milf'];

export default handler;

import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  const apiUrl = 'https://api.vreden.web.id/api/hentaivid';
  
  try {
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (json.result && json.result.length > 0) {
      const randomVideo = json.result[Math.floor(Math.random() * json.result.length)];

      if (randomVideo.type === 'video/mp4') {
        await conn.sendFile(m.chat, randomVideo.video_1, 'video.mp4', m);
      } else {
        await m.reply('El contenido seleccionado no es un video válido.');
      }
    } else {
      console.log('No se encontraron resultados en la API.');
    }
  } catch (e) {
    console.error(e);
    await m.reply('Hubo un error al intentar obtener un video.');
  }
};

handler.command = ['videorandom', 'randomvideo'];

export default handler;

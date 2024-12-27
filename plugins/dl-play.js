import fetch from 'node-fetch';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import yts from 'yt-search';  // Para buscar videos en YouTube

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un término de búsqueda de YouTube`, m);

  await m.react('🕓');

  try {
    // Buscar el video en YouTube usando yt-search
    const results = await yts(text);
    if (!results.videos || results.videos.length === 0) {
      return conn.reply(m.chat, `❀ No se encontraron resultados para "${text}"`, m);
    }

    // Tomar el primer video encontrado
    const video = results.videos[0];
    const videoUrl = video.url;

    // Obtener la URL de descarga del video MP4
    let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${videoUrl}`)).json();
    let dl_url = api.data.dl;

    // Descargamos el video MP4
    const videoPath = path.join(__dirname, 'video.mp4');
    const videoStream = await fetch(dl_url);
    const videoBuffer = await videoStream.buffer();
    fs.writeFileSync(videoPath, videoBuffer);

    // Convertir el video MP4 a MP3
    const mp3Path = path.join(__dirname, 'audio.mp3');
    ffmpeg(videoPath)
      .output(mp3Path)
      .audioCodec('libmp3lame')
      .on('end', async () => {
        // Enviar el archivo MP3 como respuesta
        await conn.sendMessage(m.chat, {
          audio: fs.createReadStream(mp3Path),
          mimetype: 'audio/mp3',
          caption: `*Aquí está tu archivo MP3*`,
        }, { quoted: m });

        // Limpiar los archivos temporales
        fs.unlinkSync(videoPath);
        fs.unlinkSync(mp3Path);
        await m.react('✅');
      })
      .on('error', async (err) => {
        console.error('Error al convertir el video:', err);
        await m.react('❌');
      })
      .run();

  } catch (error) {
    console.error('Error al obtener el video:', error);
    await m.react('❌');
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['downloader'];
handler.command = ['play'];
handler.register = true;

export default handler;

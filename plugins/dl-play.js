import yts from 'youtube-yts';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';

export default async function handler(m, { conn, args, command }) {
  try {
    if (!args[0]) {
      await m.reply('[ ✰ ] Proporciona un título o URL de YouTube para descargar.');
      return;
    }

    const query = args.join(' ');
    let videoInfo;

    if (command === 'play') {
      const results = await searchVideos(query);
      if (results.length === 0) {
        await m.reply('[ ✰ ] No se encontraron resultados para tu búsqueda.');
        return;
      }
      videoInfo = results[0];
    } else {
      videoInfo = { url: args[0] };
    }

    const audioPath = await downloadAudio(videoInfo.url);

    const caption = `🎶 *Audio descargado de YouTube* 🎶\n\n` +
                    `*Título:* ${videoInfo.title || 'Desconocido'}\n` +
                    `*Duración:* ${videoInfo.duration || 'Desconocido'}\n` +
                    `*Autor:* ${videoInfo.author || 'Desconocido'}`;

    await conn.sendMessage(m.chat, {
      audio: { url: audioPath },
      mimetype: 'audio/mp4',
      ptt: false,
      caption
    });

    fs.unlinkSync(audioPath); // Limpieza del archivo temporal
  } catch (error) {
    console.error(error);
    await m.reply('[ ✖ ] Hubo un error al procesar tu solicitud.');
  }
}

async function searchVideos(query) {
  const result = await yts(query);
  return result.videos.map(video => ({
    title: video.title,
    author: video.author,
    description: video.description,
    thumbnail: video.thumbnail,
    views: video.views,
    url: video.url,
    timestamp: video.timestamp,
    duration: video.duration
  }));
}

async function downloadAudio(url) {
  const videoId = new URL(url).searchParams.get('v');
  const stream = ytdl(videoId, { filter: 'audioonly', quality: 'highestaudio' });
  const audioPath = `./tmp/${randomBytes(3).toString('hex')}.mp3`;

  return new Promise((resolve, reject) => {
    ffmpeg(stream)
      .audioFrequency(48000)
      .audioChannels(2)
      .audioBitrate(320)
      .audioCodec('libmp3lame')
      .toFormat('mp3')
      .save(audioPath)
      .on('end', () => resolve(audioPath))
      .on('error', reject);
  });
}

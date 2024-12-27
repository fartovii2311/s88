import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import yts from 'yt-search';

const __dirname = path.resolve();

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa el nombre del video que deseas buscar`, m,rcanal);

  await m.react('🕓');

  try {
    const { videos } = await yts(text);
    if (!videos.length) {
      return conn.reply(m.chat, '❌ No se encontraron resultados en YouTube para tu búsqueda.', m,rcanal);
    }

    const video = videos[0];
    const videoUrl = video.url;
    const title = video.title;
    const thumbnail = video.thumbnail;
    const duration = video.timestamp;

    let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${videoUrl}`)).json();

    if (!api || !api.data || !api.data.dl) {
      return conn.reply(m.chat, '❌ No se pudo obtener el enlace de descarga. Por favor verifica el enlace de YouTube.', m,rcanal);
    }

    let dl_url = api.data.dl;

    const tmpDir = path.join(__dirname, 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }

    const timestamp = Date.now();
    const tmpMp4Path = path.join(tmpDir, `${timestamp}.mp4`);
    const tmpMp3Path = path.join(tmpDir, `${timestamp}.mp3`);

    await fetch(dl_url)
      .then(res => {
        const dest = fs.createWriteStream(tmpMp4Path);
        res.body.pipe(dest);
        return new Promise((resolve, reject) => {
          res.body.on('end', resolve);
          res.body.on('error', reject);
        });
      })
      .catch(err => {
        console.error('Error al descargar el MP4:', err);
        throw new Error('Error al descargar el video');
      });

    await new Promise((resolve, reject) => {
      ffmpeg(tmpMp4Path)
        .output(tmpMp3Path)
        .audioCodec('libmp3lame')
        .on('end', () => {
          console.log('Conversión a MP3 finalizada');
          resolve();
        })
        .on('error', (err) => {
          console.error('Error durante la conversión:', err);
          reject(err);
        })
        .run();
    });

    const sendAudio = async (audioPath, sizeLimit = 25 * 1024 * 1024) => {
      const stats = fs.statSync(audioPath);
      const fileSize = stats.size;

      if (fileSize <= sizeLimit) {
        await conn.sendMessage(m.chat, { audio: { url: audioPath }, mimetype: 'audio/mp4', caption: `*Aquí tienes tu audio*` }, { quoted: m });
      } else {
        const numParts = Math.ceil(fileSize / sizeLimit);
        for (let i = 0; i < numParts; i++) {
          const partPath = path.join(tmpDir, `${timestamp}_part${i + 1}.mp3`);
          await new Promise((resolve, reject) => {
            ffmpeg(audioPath)
              .setStartTime(i * sizeLimit / 1000000) // Definir el inicio de cada parte
              .setDuration(sizeLimit / 1000000) // Limitar la duración de la parte
              .output(partPath)
              .on('end', () => resolve())
              .on('error', reject)
              .run();
          });

          await conn.sendMessage(m.chat, { audio: { url: partPath }, mimetype: 'audio/mp4', caption: `*Parte ${i + 1} de ${numParts}*` }, { quoted: m });
          fs.unlinkSync(partPath); // Eliminar la parte después de enviarla
        }
      }
    };

    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail },
        caption: `*Título:* ${title}\n*Duración:* ${duration}\n*¡Aquí tienes tu audio!*`
      },
      { quoted: m }
    );

    await sendAudio(tmpMp3Path);

    fs.unlinkSync(tmpMp4Path);
    fs.unlinkSync(tmpMp3Path);

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, '❌ Ocurrió un error al procesar tu solicitud. Por favor intenta de nuevo.', m,rcanal);
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['downloader'];
handler.command = ['play'];
handler.register = true;

export default handler;

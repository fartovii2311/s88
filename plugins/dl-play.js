import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { exec } from 'child_process';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube válido`, m);

  await m.react('🕓');

  try {
    // Hacer la petición a la API
    let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${text}`)).json();

    // Verificar que la respuesta contiene los datos esperados
    if (!api || !api.data || !api.data.dl) {
      return conn.reply(m.chat, '❌ No se pudo obtener el enlace de descarga. Por favor verifica el enlace de YouTube.', m);
    }

    // Obtener el enlace de descarga MP4
    let dl_url = api.data.dl;

    // Ruta temporal para guardar el archivo MP4
    const tmpMp4Path = path.join(__dirname, 'tmp', 'video.mp4');
    const tmpMp3Path = path.join(__dirname, 'tmp', 'audio.mp3');

    // Descargar el MP4
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

    // Convertir MP4 a MP3
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

    // Enviar el archivo MP3
    await conn.sendMessage(m.chat, { audio: { url: tmpMp3Path }, mimetype: 'audio/mp4', caption: `*Aqui tienes tu audio*` }, { quoted: m });

    // Limpiar archivos temporales
    fs.unlinkSync(tmpMp4Path);
    fs.unlinkSync(tmpMp3Path);

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, '❌ Ocurrió un error al procesar el enlace de YouTube. Por favor intenta de nuevo.', m);
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['downloader'];
handler.command = ['play'];
handler.register = true;

export default handler;

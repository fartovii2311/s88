import fetch from 'node-fetch';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execPromise = promisify(exec);
const videoLimit = 300 * 1024 * 1024; // 300 MB

let handler = async (m, { conn, text }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `⚠️ Debes etiquetar el mensaje que contenga el resultado de YouTube Play.`, m);
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(m.chat, `⚠️ El mensaje etiquetado no contiene un resultado de YouTube Play.`, m);
  }

  const urls = m.quoted.text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11,})/gi);

  if (!urls || urls.length < 1) {
    return conn.reply(m.chat, `⚠️ No se encontraron enlaces válidos en el mensaje etiquetado.`, m);
  }

  const videoUrl = urls[0];
  await m.react('🕓');

  try {
    const apiUrl = `https://api.vreden.web.id/api/ytmp4?url=${videoUrl}`;
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (result.status && result.result.download) {
      await handleVideoDownload(conn, m, result.result);
      return;
    }

  } catch (error) {
    console.error('Error al procesar el video:', error);
    await m.react('✖️');
  }
};

const handleVideoDownload = async (conn, m, data) => {
  const { metadata, download } = data;
  const { title, duration, thumbnail } = metadata;
  const { url: downloadUrl, filename } = download;

  const tempPath = `./tmp/${Date.now()}.mp4`;

  try {
    await downloadFile(downloadUrl, tempPath);

    const fileSize = fs.statSync(tempPath).size;

    if (fileSize > videoLimit) {
      const compressedPath = `compressed_${Date.now()}.mp4`;
      await compressVideo(tempPath, compressedPath);

      const compressedSize = fs.statSync(compressedPath).size;

      if (compressedSize > videoLimit) {
        await conn.sendMessage(m.chat,
          {
            document: { url: compressedPath },
            fileName: filename || `${title}.mp4`,
            mimetype: 'video/mp4',
            caption: `⚠️ El archivo comprimido aún supera el límite permitido (${(videoLimit / 1024 / 1024).toFixed(2)} MB). Se envía como documento.\n\n🎥 *Título:* ${title}\n⏱️ *Duración:* ${duration.timestamp}`,
          },
          { quoted: m }
        );
      } else {
        await conn.sendMessage(m.chat,
          {
            video: { url: compressedPath },
            fileName: filename || `${title}.mp4`,
            mimetype: 'video/mp4',
            caption: `🎥 *Título:* ${title}\n⏱️ *Duración:* ${duration.timestamp}`,
            thumbnail: thumbnail ? { url: thumbnail } : undefined,
          },
          { quoted: m }
        );
      }

      fs.unlinkSync(tempPath);
      fs.unlinkSync(compressedPath);
    } else {
      await conn.sendMessage(m.chat,
        {
          video: { url: tempPath },
          fileName: filename || `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: `🎥 *Título:* ${title}\n⏱️ *Duración:* ${duration.timestamp}`,
          thumbnail: thumbnail ? { url: thumbnail } : undefined,
        },
        { quoted: m }
      );
    }

    await m.react('✅');
  } catch (error) {
    console.error('Error al procesar el video:', error);
    await conn.reply(m.chat, `⚠️ Error al procesar o enviar el video.`, m);
  }
};

const downloadFile = async (url, dest) => {
  const response = await fetch(url);
  const fileStream = fs.createWriteStream(dest);
  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
};

const compressVideo = async (inputPath, outputPath) => {
  const ffmpegCommand = `ffmpeg -i "${inputPath}" -vf scale=1280:-2 -c:v libx264 -crf 28 -preset fast "${outputPath}"`;
  await execPromise(ffmpegCommand);
};

handler.help = ['Video'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Video|video|vídeo|Vídeo)/i;
handler.command = new RegExp;

export default handler;

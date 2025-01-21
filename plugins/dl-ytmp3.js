import fs from 'fs';
import { fetchBuffer } from '../lib/gets';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg-7';
import { randomBytes } from 'crypto';

/**
 * Descargar audio de YouTube y convertirlo a MP3
 * @param {string} url URL de YouTube
 * @returns {Promise<{ path: string, meta: object }>} Ruta del archivo MP3 y metadatos
 */
const downloadMP3 = async (url) => {
    try {
        if (!url) throw new Error('URL requerida');
        const videoId = ytdl.getVideoID(url); // Extrae el ID del video de YouTube
        const { videoDetails } = await ytdl.getInfo(url); // Obtén los detalles del video

        // Obtén el stream de solo audio en calidad 140
        const stream = ytdl(url, { filter: 'audioonly', quality: '140' });
        const songPath = `./tmp/${randomBytes(3).toString('hex')}.mp3`; // Ruta temporal del archivo MP3

        // Proceso de conversión a MP3 usando ffmpeg
        await new Promise((resolve, reject) => {
            ffmpeg(stream)
                .audioFrequency(44100)
                .audioChannels(2)
                .audioBitrate(128)
                .audioCodec('libmp3lame')
                .audioQuality(5)
                .toFormat('mp3')
                .save(songPath)
                .on('end', () => resolve(songPath))
                .on('error', reject);
        });

        // Retorna la ruta del archivo MP3 y los metadatos del video
        return {
            meta: {
                title: videoDetails.title,
                artist: videoDetails.author.name,
                image: videoDetails.thumbnails.slice(-1)[0].url,
                album: 'YouTube Download'
            },
            path: songPath
        };
    } catch (error) {
        throw new Error('Error descargando MP3: ' + error.message);
    }
};

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '🎁 Por favor, envíame una URL de YouTube válida para descargar el audio.');

    try {
        // Verificar si la URL es válida
        const isValidUrl = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/.test(text);
        if (!isValidUrl) {
            return conn.reply(m.chat, '❌ URL no válida. Asegúrate de enviar un enlace válido de YouTube.');
        }

        // Descargar el MP3
        const { path, meta } = await downloadMP3(text);

        // Informar que el audio está listo
        conn.reply(m.chat, '🎼 ¡El audio está listo! Enviando...');

        // Enviar el archivo de audio
        await conn.sendMessage(m.chat, {
            audio: fs.readFileSync(path),
            mimetype: 'audio/mp3',  // Mimetype correcto para MP3
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: meta.title,
                    body: meta.artist,
                    thumbnail: await fetchBuffer(meta.image),
                    mediaType: 2,
                    mediaUrl: text,
                }
            },
        }, { quoted: m });

        // Eliminar el archivo temporal después de enviarlo
        fs.unlinkSync(path);
    } catch (error) {
        console.error(error);  // Muestra el error completo en la consola
        conn.reply(m.chat, '❀ Hubo un error al procesar el audio. Verifica la URL y prueba nuevamente.');
    }
};

// Configuración del comando y los tags
handler.help = ['mp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['mp3'];

export default handler;

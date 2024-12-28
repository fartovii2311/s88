import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { randomBytes } from 'crypto';
import fs from 'fs';

// Clase YT para manejar la descarga de MP3 desde YouTube
class YT {
    constructor() {}

    /**
     * Descarga un archivo MP3 desde un URL de YouTube.
     * @param {string} url - URL del video de YouTube.
     * @returns {Promise<MusicResult>} - Archivo MP3 descargado.
     */
    static downloadMP3FromURL = async (url) => {
        try {
            // Obtener información del video usando ytdl-core
            const videoInfo = await ytdl.getInfo(url);
            
            // Generar un nombre de archivo aleatorio para guardar el MP3
            let songPath = `./tmp/${randomBytes(3).toString('hex')}.mp3`;

            // Crear un stream de solo audio con la mejor calidad disponible
            const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

            // Convertir el stream de audio a formato MP3
            const file = await new Promise((resolve, reject) => {
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

            // Retornar el resultado con el archivo y los metadatos
            return {
                meta: {
                    title: videoInfo.videoDetails.title,
                    channel: videoInfo.videoDetails.author.name,
                    duration: videoInfo.videoDetails.lengthSeconds,
                    image: videoInfo.videoDetails.thumbnails.slice(-1)[0].url,
                },
                path: file,
                size: fs.statSync(file).size
            };
        } catch (error) {
            throw new Error('Error descargando el MP3: ' + error.message);
        }
    }
}

// Comando para descargar MP3 desde YouTube
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m);
    await m.react('🕓');
    try {
        // Usar la clase YT para descargar el MP3 desde el link de YouTube
        const result = await YT.downloadMP3FromURL(text);
        
        // Verificar si el archivo existe y es válido
        if (result && result.path) {
            // Enviar el MP3 descargado
            conn.sendMessage(m.chat, { 
                audio: { url: result.path },
                mimetype: "audio/mp3",
                ptt: true
            }, { quoted: m });
            await m.react('✅');
        } else {
            // Si hay un error en la descarga del MP3
            conn.reply(m.chat, '❀ Hubo un error al intentar descargar el MP3. Intenta nuevamente.', m);
        }
    } catch (error) {
        // Si hay un error en el proceso
        console.error('Error al obtener el MP3:', error);
        conn.reply(m.chat, '❀ Ocurrió un error al intentar descargar el MP3. Intenta nuevamente más tarde.', m);
    }
}

handler.command = ['ytmp3']; // Comando para activar el proceso de descarga de MP3

export default handler;

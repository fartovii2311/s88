import ytdlp from 'yt-dlp';
import ffmpeg from 'fluent-ffmpeg';
import { randomBytes } from 'crypto';
import fs from 'fs';
import ytSearch from 'yt-search';  // Importar yt-search para buscar videos

class YT {
    static downloadMP3FromURL = async (url) => {
        try {
            // Descargar la mejor calidad de audio disponible utilizando yt-dlp
            const info = await ytdlp.getInfo(url);
            const audioStream = ytdlp(url, { format: 'bestaudio' });

            // Generar el archivo MP3 en una ruta temporal
            const songPath = `./tmp/${randomBytes(3).toString('hex')}.mp3`;

            // Usar ffmpeg para convertir el flujo de audio a MP3
            await new Promise((resolve, reject) => {
                ffmpeg(audioStream)
                    .audioFrequency(44100)
                    .audioChannels(2)
                    .audioBitrate(128)
                    .audioCodec('libmp3lame')
                    .toFormat('mp3')
                    .save(songPath)
                    .on('end', resolve)
                    .on('error', reject);
            });

            return {
                meta: {
                    title: info.title,
                    duration: info.duration,
                },
                path: songPath,
                size: fs.statSync(songPath).size,
            };
        } catch (error) {
            console.error('Error al descargar el MP3 con yt-dlp:', error);
            throw new Error('Error descargando el MP3: ' + error.message);
        }
    }

    // Función para buscar el video usando yt-search
    static searchAndDownloadMP3 = async (query) => {
        try {
            // Realizar la búsqueda en YouTube
            const results = await ytSearch(query);
            if (!results || results.videos.length === 0) {
                throw new Error('No se encontraron resultados para la búsqueda.');
            }

            // Obtener el primer video de los resultados
            const videoURL = results.videos[0].url;

            // Llamar a la función para descargar el MP3 usando el enlace del video
            return await YT.downloadMP3FromURL(videoURL);
        } catch (error) {
            console.error('Error al buscar o descargar el MP3:', error);
            throw new Error('Error buscando o descargando el MP3: ' + error.message);
        }
    }
};

// Comando para descargar el MP3 desde YouTube
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un término de búsqueda`, m);
    await m.react('🕓');

    try {
        // Usar la clase YT para buscar y descargar el MP3 desde YouTube
        const result = await YT.searchAndDownloadMP3(text);

        // Verificar si el archivo existe y es válido
        if (result && result.path) {
            // Enviar el MP3 descargado
            await conn.sendMessage(m.chat, { 
                audio: { url: result.path },
                mimetype: 'audio/mp4',
                caption: `*Aquí tienes tu audio:* ${result.meta.title}`
            }, { quoted: m });

            // Limpiar archivos temporales
            fs.unlinkSync(result.path);

            await m.react('✅');
        } else {
            // Si hay un error en la descarga del MP3
            conn.reply(m.chat, '❀ Hubo un error al intentar descargar el MP3. Intenta nuevamente.', m);
        }
    } catch (error) {
        // Si hay un error en el proceso
        console.error('Error al obtener el MP3:', error);
        conn.reply(m.chat, '❀ Ocurrió un error al intentar descargar el MP3. Intenta nuevamente más tarde.', m);
        await m.react('❌');
    }
}

handler.help = ['play *<texto>*'];
handler.tags = ['downloader'];
handler.command = ['play'];
handler.register = true;

export default handler;

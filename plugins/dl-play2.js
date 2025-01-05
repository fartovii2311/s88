import yts from 'youtube-yts';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg-7';
import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';

// Función para buscar videos en YouTube
const searchVideos = async (query) => {
    try {
        const result = await yts(query);
        if (result && result.videos) {
            return result.videos.map(video => ({
                title: video.title,
                author: video.author,
                description: video.description,
                thumbnail: video.thumbnail,
                views: video.views,
                url: video.url,
                timestamp: video.timestamp,
                duration: video.duration,
            }));
        } else {
            console.log('No se encontraron videos');
            return [];
        }
    } catch (error) {
        console.error('Error al obtener los resultados de YouTube:', error);
        return { error: 'Error al obtener los resultados' };
    }
};

// Función para descargar el MP3
const downloadMp3 = async (query) => {
    try {
        const getTrack = Array.isArray(query) ? query : await searchVideos(query);
        const search = getTrack[0];
        const videoId = search.url.split('v=')[1];
        const videoInfo = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`, { lang: 'id' });

        let stream = ytdl(videoId, {
            filter: 'audioonly',
            quality: 'highestaudio',
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
            }
        });

        let songPath = `./tmp/${randomBytes(3).toString('hex')}.mp3`;

        stream.on('error', (err) => console.error('Error en el stream de YouTube:', err));

        // Procesar el stream de audio y guardarlo como MP3
        const file = await new Promise((resolve, reject) => {
            ffmpeg(stream)
                .audioFrequency(48000) // Frecuencia más alta para mejor calidad de audio
                .audioChannels(2)
                .audioBitrate(320) // Mayor bitrate para mejor calidad
                .audioCodec('libmp3lame')
                .audioQuality(0) // Mejor calidad (escala de 0 a 9, donde 0 es lo mejor)
                .toFormat('mp3')
                .save(songPath)
                .on('end', () => {
                    console.log('Archivo MP3 guardado:', songPath);
                    resolve(songPath);
                })
                .on('error', (err) => {
                    console.error('Error en FFmpeg:', err);
                    reject(err);
                });
        });

        // Retornar la ruta del archivo MP3
        return { path: file };

    } catch (error) {
        console.error('Error al descargar MP3:', error);
        throw new Error('Falló la descarga del MP3');
    }
};

// Comando para manejar el proceso
let handler = async (m, { conn: command, args, text, usedPrefix }) => {
    const namebot = "MiBot";

    // Verificar si no se proporciona texto
    if (!text) {
        return conn.reply(m.chat, '🚩 Por favor, proporcione el texto para buscar');
    }

    try {
        const results = await searchVideos(text);

        if (!results || results.length === 0) {
            return conn.reply(m.chat, `🚫 No se encontraron resultados para *${text}* en YouTube. Intenta con otro término.`);
        }

        const video = results[0];
        
        let videoText = `* - Y O U T U B E  - M U S I C - *\n\n`;
        videoText += `✩  *Título* : ${video.title}\n`;
        videoText += `✩ *_views:_*  ${video.views}\n`;
        videoText += `✩ Un momento, su pedido está descargando\n\n`;
        videoText += `> 🚩 *${namebot}*`;

        // Enviar la miniatura y la información del video
        await conn.sendMessage(m.chat, { 
            image: { url: video.thumbnail }, 
            caption: videoText,  
        });

        // Descargar el MP3
        const mp3Data = await downloadMp3(text);

        // Enviar el MP3 como audio
        await conn.sendMessage(m.chat, {
            audio: { url: mp3Data.path },
            mimetype: 'audio/mp4',
            caption: videoText,
        });

    } catch (error) {
        console.error('Error:', error);
        return conn.reply(m.chat, '🚩 Ocurrió un error al buscar los videos. Intenta de nuevo.');
    }
};

// Información del comando
handler.help = ['play2 *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play2'];
handler.register = true;

export default handler;

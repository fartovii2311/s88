
import yts from 'youtube-yts';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
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
            console.log('No videos found');
            return [];
        }
    } catch (error) {
        console.error('Error fetching YouTube search results:', error);
        return { error: 'Error fetching results' };
    }
};

// Función para descargar el MP3
const downloadMp3 = async (query) => {
    try {
        const getTrack = Array.isArray(query) ? query : await searchVideos(query);
        const search = getTrack[0];
        const videoId = search.url.split('v=')[1];
        const videoInfo = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`, { lang: 'id' });

        let stream = ytdl(videoId, { filter: 'audioonly', quality: 'highestaudio' });
        let songPath = `./tmp/${randomBytes(3).toString('hex')}.mp3`;

        stream.on('error', (err) => console.log('Stream error:', err));

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
                    console.log('MP3 file saved:', songPath);
                    resolve(songPath);
                })
                .on('error', (err) => {
                    console.error('FFmpeg error:', err);
                    reject(err);
                });
        });

        // Retornar la ruta del archivo MP3
        return { path: file };

    } catch (error) {
        console.error('Error downloading MP3:', error);
        throw new Error('MP3 download failed');
    }
};

const handler = async (sock, from, reply, comando, info, args, sender, text, prefixo, namebot) => {
    if (!text) {
        return reply('🚩 Porfavor proporcione el texto para buscar');
    }
  
    try {
        const results = await searchVideos(text);
        
        if (!results || results.length === 0) {
            return m.reply(`🚫 No se encontraron resultados para *${text}* en YouTube. Intenta con otro término.`);
        }

        const video = results[0];
        
        let videoText = `* - Y O U T U B E  - M U S I C - *\n\n`;
        videoText += `✩  *Título* : ${video.title}\n`;
        videoText += `✩ *_views:_*  ${video.views}\n`;
        videoText += `✩ Un momento su pedido anda descargando\n\n`;
        videoText += `> 🚩 *${namebot}*`;

        // Enviar la miniatura y la información del video
        await sock.sendMessage(from, { 
            image: { url: video.thumbnail }, 
            caption: videoText,  
            contextInfo: {
                mentionedJid: [sender],
                externalAdReply: {
                    showAdAttribution: true,
                    title: '【 D A R K ✘ B A S E 】',
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPx11BO4l-0lFbEjOCQez5YEMvg8M8NVxLWQ&usqp=CAU',
                }
            }
        }, { quoted: info });

        // Descargar el MP3 y enviarlo
        const mp3Data = await downloadMp3(text);
        
        await sock.sendMessage(from, {
            audio: { url: mp3Data.path }, 
            mimetype: 'audio/mp4'
        }, { quoted: info });       
        
    } catch (error) {
        console.error('Error:', error);  // Registrar el error para depuración
        return m.reply('🚩 Ocurrió un error al buscar los videos. Intenta de nuevo.');
    }
};

handler.help = ['play2 *<texto>*'];
handler.tags = ['dl'];
handler.corazones = 2;
handler.command = ['play2'];
handler.register = true;

export default handler;

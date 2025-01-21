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

        // Asegúrate de que la carpeta tmp existe
        const tmpFolder = './tmp';
        if (!fs.existsSync(tmpFolder)) {
            fs.mkdirSync(tmpFolder);  // Crea la carpeta 'tmp' si no existe
        }

        // Obtén el stream de solo audio en calidad 140
        const stream = ytdl(url, { filter: 'audioonly', quality: '140' });
        const songPath = `${tmpFolder}/${randomBytes(3).toString('hex')}.mp3`; // Ruta temporal del archivo MP3

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

export default downloadMP3;

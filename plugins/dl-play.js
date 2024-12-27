import fs from 'fs';
import fetch from 'node-fetch';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import NodeID3 from 'node-id3';
import { randomBytes } from 'crypto';
import yts from 'yt-search';

const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/;

class YT {
    static isYTUrl(url) {
        return ytIdRegex.test(url);
    }

    static getVideoID(url) {
        if (!this.isYTUrl(url)) throw new Error('Not a valid YouTube URL');
        return ytIdRegex.exec(url)[1];
    }

    static async WriteTags(filePath, Metadata) {
        NodeID3.write(
            {
                title: Metadata.Title,
                artist: Metadata.Artist,
                album: Metadata.Album,
                year: Metadata.Year || '',
                image: {
                    mime: 'jpeg',
                    type: {
                        id: 3,
                        name: 'front cover',
                    },
                    imageBuffer: (await fetch(Metadata.Image)).buffer,
                },
            },
            filePath
        );
    }

    static async mp3(url, metadata = {}, autoWriteTags = false) {
        try {
            if (!url) throw new Error('YouTube URL is required');
            url = this.isYTUrl(url) ? 'https://www.youtube.com/watch?v=' + this.getVideoID(url) : url;
            const { videoDetails } = await ytdl.getInfo(url);

            // Verificar si los detalles del video están disponibles
            if (!videoDetails) {
                throw new Error('No se pudo obtener los detalles del video.');
            }

            const stream = ytdl(url, { 
                filter: 'audioonly', 
                quality: 140, 
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
                }
            });

            const songPath = `./tmp/${randomBytes(3).toString('hex')}.mp3`;

            const file = await new Promise((resolve, reject) => {
                ffmpeg(stream)
                    .audioFrequency(44100)
                    .audioChannels(2)
                    .audioBitrate(128)
                    .audioCodec('libmp3lame')
                    .toFormat('mp3')
                    .save(songPath)
                    .on('end', () => resolve(songPath))
                    .on('error', (err) => reject(err)); // Manejo de errores en ffmpeg
            });

            if (Object.keys(metadata).length !== 0) {
                await this.WriteTags(file, metadata);
            }

            if (autoWriteTags) {
                await this.WriteTags(file, {
                    Title: videoDetails.title,
                    Album: videoDetails.author.name,
                    Year: videoDetails.publishDate.split('-')[0],
                    Image: videoDetails.thumbnails.slice(-1)[0].url,
                });
            }

            return {
                meta: {
                    title: videoDetails.title,
                    channel: videoDetails.author.name,
                    seconds: videoDetails.lengthSeconds,
                    image: videoDetails.thumbnails.slice(-1)[0].url,
                },
                path: file,
                size: fs.statSync(songPath).size,
            };
        } catch (error) {
            console.error(error);
            throw new Error('Error en el procesamiento del audio');
        }
    }

    static async search(query) {
        try {
            const results = await yts(query);
            if (results && results.videos.length > 0) {
                return results.videos[0].url;
            }
            throw new Error('No se encontraron resultados.');
        } catch (error) {
            throw new Error('Error al buscar en YouTube: ' + error.message);
        }
    }
}

let handler = async (m, { conn, args }) => {
    try {
        let url;

        if (!args[0]) {
            return m.reply('❌ Por favor, proporciona un enlace de YouTube válido o un término de búsqueda.');
        }

        if (YT.isYTUrl(args[0])) {
            url = args[0];
        } else {
            m.reply('⏳ Buscando en YouTube...');
            url = await YT.search(args.join(' '));
        }

        m.reply('⏳ Descargando y procesando el audio... Esto puede tardar unos minutos.');

        const result = await YT.mp3(url, {}, true);

        await conn.sendMessage(m.chat, {
            image: { url: result.meta.image },
            caption: `🎵 *Título:* ${result.meta.title}\n📡 *Canal:* ${result.meta.channel}\n⏳ *Duración:* ${(result.meta.seconds / 60).toFixed(2)} minutos\n📥 *Tamaño:* ${(result.size / 1024 / 1024).toFixed(2)} MB`,
        });

        await conn.sendMessage(m.chat, {
            document: { url: result.path },
            mimetype: 'audio/mpeg',
            fileName: `${result.meta.title}.mp3`,
        });

        try {
            fs.unlinkSync(result.path);
        } catch (error) {
            console.error(`No se pudo eliminar el archivo temporal: ${result.path}`, error);
        }
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al procesar tu solicitud. Inténtalo nuevamente más tarde.');
    }
};

handler.help = ['play <url|texto>'];
handler.tags = ['downloader'];
handler.command = /^(play)$/i;

export default handler;

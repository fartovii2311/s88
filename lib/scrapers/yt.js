import fetch from 'node-fetch';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import NodeID3 from 'node-id3';
import fs from 'fs';
import { randomBytes } from 'crypto';

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
            const stream = ytdl(url, { filter: 'audioonly', quality: 140 });
            const songPath = `./tmp/${randomBytes(3).toString('hex')}.mp3`;

            const file = await new Promise((resolve) => {
                ffmpeg(stream)
                    .audioFrequency(44100)
                    .audioChannels(2)
                    .audioBitrate(128)
                    .audioCodec('libmp3lame')
                    .toFormat('mp3')
                    .save(songPath)
                    .on('end', () => resolve(songPath));
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
            throw error;
        }
    }
}

export default YT;

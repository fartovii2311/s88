import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { ffmpeg } from './converter.js';
import fluent_ffmpeg from 'fluent-ffmpeg';
import { spawn } from 'child_process';
import uploadFile from './uploadFile.js';
import uploadImage from './uploadImage.js';
import { fileTypeFromBuffer } from 'file-type';
import webp from 'node-webpmux';
import fetch from 'node-fetch';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tmp = path.join(__dirname, '../tmp');

/**
 * Convert Image to Sticker
 * @param {Buffer} img Image Buffer
 * @param {String} url Image URL
 */
async function sticker2(img, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (res.status !== 200) throw new Error('Failed to fetch image from URL');
      img = await res.buffer();
    }

    const inp = path.join(tmp, `${+new Date()}.jpeg`);
    await fs.promises.writeFile(inp, img);

    const ff = spawn('ffmpeg', [
      '-y',
      '-i', inp,
      '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1',
      '-f', 'png',
      '-'
    ]);

    const bufs = [];
    ff.on('error', (err) => {
      console.error('FFmpeg error:', err);
      fs.promises.unlink(inp);
    });

    ff.stdout.pipe(fs.createWriteStream(path.join(tmp, 'temp.png')));

    ff.on('close', async () => {
      await fs.promises.unlink(inp);
    });

    const _spawnprocess = module.exports.support.gm ? ['gm'] : module.exports.magick ? ['magick'] : [];
    const im = spawn(_spawnprocess[0] || 'convert', ['png:-', 'webp:-']);
    im.stdout.on('data', chunk => bufs.push(chunk));

    im.on('exit', () => {
      resolve(Buffer.concat(bufs));
    });
  } catch (e) {
    console.error('Error in sticker2 function:', e);
    throw e;
  }
}

/**
 * Convert Image/Video to Sticker with EXIF
 * @param {Buffer} img Image/Video Buffer
 * @param {String} url Image/Video URL
 * @param {String} packname EXIF Packname
 * @param {String} author EXIF Author
 */
async function sticker3(img, url, packname, author) {
  try {
    url = url || await uploadFile(img);
    const res = await fetch('https://api.xteam.xyz/sticker/wm?' + new URLSearchParams({ url, packname, author }));
    return await res.buffer();
  } catch (e) {
    console.error('Error in sticker3 function:', e);
    throw e;
  }
}

/**
 * Add WhatsApp JSON Exif Metadata
 * @param {Buffer} webpSticker 
 * @param {String} packname 
 * @param {String} author 
 * @param {String} categories 
 * @param {Object} extra 
 * @returns 
 */
async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
  try {
    const img = new webp.Image();
    const stickerPackId = crypto.randomBytes(32).toString('hex');
    const json = { 
      'sticker-pack-id': stickerPackId, 
      'sticker-pack-name': packname, 
      'sticker-pack-publisher': author, 
      'emojis': categories, 
      ...extra 
    };
    const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
    const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
    const exif = Buffer.concat([exifAttr, jsonBuffer]);
    exif.writeUIntLE(jsonBuffer.length, 14, 4);
    await img.load(webpSticker);
    img.exif = exif;
    return await img.save(null);
  } catch (e) {
    console.error('Error adding EXIF:', e);
    throw e;
  }
}

/**
 * Image/Video to Sticker Handler
 * @param {Buffer} img Image/Video Buffer
 * @param {String} url Image/Video URL
 * @param {String} packname EXIF Packname
 * @param {String} author EXIF Author
 */
async function sticker(img, url, packname, author, ...args) {
  let lastError, stiker;
  for (const func of [
    sticker3, global.support.ffmpeg && sticker6, sticker5,
    global.support.ffmpeg && global.support.ffmpegWebp && sticker4,
    global.support.ffmpeg && (global.support.convert || global.support.magick || global.support.gm) && sticker2,
  ].filter(f => f)) {
    try {
      stiker = await func(img, url, packname, author, ...args);
      if (stiker.includes('html')) continue;
      if (stiker.includes('WEBP')) {
        try {
          return await addExif(stiker, packname, author, ...args);
        } catch (e) {
          console.error('Error adding EXIF:', e);
          return stiker;
        }
      }
      throw new Error(stiker.toString());
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  console.error('Final error:', lastError);
  return lastError;
}

const support = {
  ffmpeg: true,
  ffprobe: true,
  ffmpegWebp: true,
  convert: true,
  magick: false,
  gm: false,
  find: false
};

export { 
  sticker, 
  sticker2, 
  sticker3, 
  addExif, 
  support 
};

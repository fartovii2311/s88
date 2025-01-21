import fs from 'fs';
import { fetchBuffer } from 'some-library'; // Asegúrate de usar la librería adecuada para fetchBuffer
import { mp3 } from '../lib/ytdl'; // Cambia esto por la forma correcta de importar desde tu archivo `ytdl.js`

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '🎁 Por favor, envíame una URL de YouTube válida para descargar el audio.');

    try {
        const audio = await mp3(text); // Llamada a la función mp3 del archivo `ytdl.js`
        conn.reply(m.chat, '🎼 Espere un momento mientras descargo su audio. No haga spam.');

        await conn.sendMessage(m.chat, {
            audio: fs.readFileSync(audio.path),
            mimetype: 'audio/mp4',
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: audio.meta.title,
                    body: "♡༺::Dark:: ༻♡",
                    thumbnail: await fetchBuffer(audio.meta.image),
                    mediaType: 2,
                    mediaUrl: text,
                }
            },
        }, { quoted: m });

        await fs.unlinkSync(audio.path);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❀ El audio es demasiado pesado o hubo un error al procesar la solicitud.');
    }
};

handler.help = ['mp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['mp3'];

export default handler;

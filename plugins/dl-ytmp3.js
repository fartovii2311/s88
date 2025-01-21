import fs from 'fs';
import { fetchBuffer } from 'some-library'; // Asegúrate de usar la librería adecuada para fetchBuffer
import { mp3 } from '../lib/ytdl'; // Cambia esto por la forma correcta de importar desde tu archivo `ytdl.js`

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Verifica si el usuario ha proporcionado una URL
    if (!text) return conn.reply(m.chat, '🎁 Por favor, envíame una URL de YouTube válida para descargar el audio.');

    try {
        // Llama a la función mp3 para descargar el audio
        const audio = await mp3(text); 
        conn.reply(m.chat, '🎼 Espere un momento mientras descargo su audio. No haga spam.');

        // Envía el audio descargado como un archivo de audio
        await conn.sendMessage(m.chat, {
            audio: fs.readFileSync(audio.path),
            mimetype: 'audio/mp4', // Asegúrate de que sea el tipo adecuado
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: audio.meta.title,
                    body: "♡༺::Dark:: ༻♡", // Personaliza el mensaje que se enviará junto al audio
                    thumbnail: await fetchBuffer(audio.meta.image), // Obtiene la imagen de la miniatura del video
                    mediaType: 2,
                    mediaUrl: text, // La URL del video de YouTube
                }
            },
        }, { quoted: m });

        // Elimina el archivo temporal una vez que se ha enviado
        await fs.unlinkSync(audio.path);
    } catch (error) {
        // Muestra un mensaje de error si ocurre algún problema
        console.error(error);
        conn.reply(m.chat, '❀ El audio es demasiado pesado o hubo un error al procesar la solicitud.');
    }
};

// Configuración del comando y los tags
handler.help = ['mp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['mp3'];

export default handler;

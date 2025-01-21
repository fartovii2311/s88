import fs from 'fs';
import fetch from 'node-fetch';  // Usamos node-fetch para obtener el buffer de la imagen
import { julzinmp3 } from '../lib/ytdl'; // Asegúrate de que esta función esté correctamente importada

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Verifica si el usuario ha proporcionado una URL
    if (!text) return conn.reply(m.chat, '🎁 Por favor, envíame una URL de YouTube válida para descargar el audio.');

    try {
        const audio = await julzinmp3(text); 
        conn.reply(m.chat, '🎼 Espere un momento mientras descargo su audio. No haga spam.');

        // Obtiene la miniatura (imagen) del video
        const thumbnailBuffer = await fetch(audio.meta.image).then(res => res.buffer());

        // Envía el audio descargado como un archivo de audio
        await conn.sendMessage(m.chat, {
            audio: fs.readFileSync(audio.path),
            mimetype: 'audio/mp3',  // Usamos audio/mp3 en lugar de audio/mp4
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: audio.meta.title,
                    body: "♡༺::Dark:: ༻♡", // Personaliza el mensaje que se enviará junto al audio
                    thumbnail: thumbnailBuffer, // Usamos el buffer de la miniatura
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

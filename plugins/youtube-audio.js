import fetch from 'node-fetch';
import Sph from 'ytdl-mp3';

let handler = async (m, { conn, text }) => {
    // Verificar si se cita un mensaje
    if (!m.quoted) {
        await m.react('✖️');
        return conn.reply(m.chat, `🚩 Por favor, etiqueta el mensaje que contenga el resultado de YouTube Play.`, m);
    }

    // Validar que el mensaje citado contenga el marcador específico
    if (!m.quoted.text || !m.quoted.text.includes("*`【Y O U T U B E - P L A Y】`*")) {
        await m.react('✖️');
        return conn.reply(m.chat, `🚩 El mensaje citado no parece ser un resultado de YouTube Play.`, m);
    }

    // Extraer URL del mensaje citado
    let urls = m.quoted.text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/gi);
    if (!urls) {
        await m.react('✖️');
        return conn.reply(m.chat, `🚩 No se encontró ninguna URL válida en el mensaje citado.`, m);
    }

    // Elegir la primera URL
    let videoUrl = urls[0];

    // Reacción inicial
    await m.react('🕓');

    try {
        // Descargar el audio con Sph.ytdl
        let cxf = await Sph.ytdl(videoUrl);

        // Enviar el archivo como audio
        await conn.sendMessage(m.chat, {
            audio: { url: cxf.dl_url },
            fileName: `${cxf.title}.mp3`,
            mimetype: 'audio/mp4'
        }, { quoted: m });

        // Reacción de éxito
        await m.react('✅');
    } catch (error) {
        // Manejar errores
        console.error(error);
        await m.react('✖️');
        return conn.reply(m.chat, `🚩 Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.`, m);
    }
};

// Configuración del comando
handler.customPrefix = /^(Audio|A)/i; // Prefijo personalizado (opcional)
handler.command = ['audiofromyt']; // Alias del comando (opcional)

export default handler;

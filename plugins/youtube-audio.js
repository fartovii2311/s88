import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text || !/^https?:\/\/(www\.)?youtube\.com\/.+/.test(text)) {
        await m.react('✖️');
        return conn.reply(m.chat, `🚩 Por favor, proporciona un enlace válido de YouTube para descargar el audio.`, m);
    }

    await m.react('🕓');

    try {
        // Realizar la solicitud a la API
        let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${text}`);
        let json = await api.json();

        // Validar la respuesta de la API
        if (!json.result || !json.result.download_url) {
            await m.react('✖️');
            return conn.reply(m.chat, `🚩 No se pudo procesar el enlace. Verifica que sea un enlace válido de YouTube.`, m);
        }

        let { quality, title, download_url } = json.result;

        // Enviar el archivo como audio
        await conn.sendMessage(m.chat, { 
            audio: { url: download_url }, 
            fileName: `${title}.mp3`, 
            mimetype: 'audio/mpeg' 
        }, { quoted: m });

        await m.react('✅'); // Reacción de éxito
    } catch (error) {
        // Manejo de errores
        console.error(error);
        await m.react('✖️');
        conn.reply(m.chat, `🚩 Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.`, m);
    }
};

// Configuración del comando
handler.customPrefix = /^(Audio|A)/i;

export default handler;

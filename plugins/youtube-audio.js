import fetch from 'node-fetch';

const limit = 200; // Límite en MB

let handler = async (m, { conn, text }) => {
    if (!m.quoted) {
        await m.react('✖️');
        return conn.reply(m.chat, `⚠️ Debes etiquetar el mensaje que contenga el resultado de YouTube Play.`, m);
    }

    if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
        await m.react('✖️');
        return conn.reply(m.chat, `⚠️ El mensaje etiquetado no contiene un resultado de YouTube Play.`, m);
    }

    const urls = m.quoted.text.match(
        new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/, 'gi')
    );

    if (!urls || urls.length < 1) {
        await m.react('✖️');
        return conn.reply(m.chat, `⚠️ No se encontraron enlaces válidos en el mensaje etiquetado.`, m);
    }

    await m.react('🕓');

    try {
        const videoUrl = urls[0];
        const apiUrl = `https://darkcore-api.onrender.com/api/Youtube-mp3?url=${videoUrl}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener los datos de la API.');

        const apiData = await response.json();
        if (!apiData.success || !apiData.result || !apiData.result.data) {
            throw new Error('La API no devolvió datos válidos.');
        }

        const { url: dl_url, size, bytes_size } = apiData.result.data.download;

        // Enviar solo el archivo MP3
        await conn.sendFile(
            m.chat,
            dl_url,
            `audio.mp3`,
            null,
            m,
            false,
            { mimetype: 'audio/mpeg' }
        );

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
        conn.reply(m.chat, `⚠️ Ocurrió un error al intentar descargar el audio.\n\nError: ${error.message}`, m);
    }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)$/i;
handler.command = new RegExp();

export default handler;

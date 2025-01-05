import fetch from 'node-fetch';

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
        const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${videoUrl}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener los datos de la API.');

        const apiData = await response.json();
        if (!apiData.status || !apiData.data) {
            throw new Error('La API no devolvió datos válidos.');
        }

        const { url: dl_url, title } = apiData.data.download;

        // Enviar el archivo MP3 con el nombre correcto
        await conn.sendMessage(
            m.chat, 
            { 
                audio: { url: dl_url }, 
                fileName: `${title}.mp3`, 
                mimetype: 'audio/mp4' 
            }, 
            { quoted: m }
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

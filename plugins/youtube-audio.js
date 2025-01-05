import fetch from 'node-fetch';

const limit = 200; // Límite en MB

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
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

        const { title, size, quality, thumbnail, dl_url } = await response.json();
        
        // Convertir el tamaño del archivo a MB
        const fileSizeMB = parseFloat(size.replace('MB', '').trim());
        
        if (fileSizeMB >= limit) {
            await m.react('✖️');
            return conn.reply(m.chat, `⚠️ El archivo supera el límite de ${limit} MB. Se canceló la descarga.`, m);
        }

        // Enviar el archivo como documento o audio dependiendo de la configuración del usuario
        const user = global.db.data.users[m.sender];
        await conn.sendFile(
            m.chat,
            dl_url,
            `${title}.mp3`,
            null,
            m,
            false,
            { mimetype: 'audio/mpeg', asDocument: user?.useDocument || false }
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

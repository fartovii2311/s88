import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de YouTube válido', m);

    try {
        await m.react('🕒');

        let apiUrl = `https://api.vreden.web.id/api/ytmp3?url=${text}`;
        let apiResponse = await fetch(apiUrl);
        let json = await apiResponse.json();

        if (!json?.result?.status) {
            return conn.reply(m.chat, '❀ No se pudo obtener el archivo de audio. Verifica el enlace e inténtalo de nuevo.', m);
        }

        const { metadata, download } = json.result;
        const { title, thumbnail, duration, views, author, timestamp } = metadata;
        const { url: dl_url, quality, filename } = download;

        let messageInfo = `✨ *Título:* ${title}
⏳ *Duración:* ${timestamp}
👤 *Autor:* ${author.name}
👀 *Vistas:* ${views.toLocaleString()} 
🎶 *Calidad:* ${quality}
📅 *Hace:* ${metadata.ago}`;

    await conn.sendFile(m.chat,thumbnail,'thumbnail.jpg',messageInfo,m,fake,rcanal);


        const maxSizeBytes = 100 * 1024 * 1024;

        let fileResponse = await fetch(dl_url, { method: 'HEAD' });
        let fileSizeBytes = fileResponse.headers.get('content-length') || 0;
        fileSizeBytes = parseInt(fileSizeBytes, 10);

        if (fileSizeBytes >= maxSizeBytes) {
            await conn.sendMessage(m.chat, { 
                document: { url: dl_url }, 
                mimetype: 'audio/mpeg',
                fileName: filename,
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { 
                audio: { url: dl_url }, 
                mimetype: 'audio/mp4',
                fileName: filename 
            }, { quoted: m });
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, '❀ Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.', m);
        await m.react('✖');
    }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];

export default handler;

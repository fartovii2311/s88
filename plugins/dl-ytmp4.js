import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de youtube', m);

    try {
        await m.react('🕒');

        // Lista de las APIs a usar
        let apiUrls = [
            `https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`,
            `https://api.vreden.web.id/api/ytmp4?url=${text}`,
            `https://delirius-apiofc.vercel.app/download/ytmp4?url=${text}`,
            `https://api.siputzx.my.id/api/d/ytmp4?url=${text}`
        ];

        let json = null;
        let title, dl_url, sizeBytes, fileSizeStr;

        for (let apiUrl of apiUrls) {
            try {
                let api = await fetch(apiUrl);
                let apiResponse = await api.json();
                
                // Estructura de la primera API
                if (apiResponse.status && apiResponse.result?.download) {
                    const metadata = apiResponse.result.metadata;
                    title = metadata.title || 'Video sin título';
                    dl_url = apiResponse.result.download.url;
                    fileSizeStr = metadata.size || null;
                    sizeBytes = fileSizeStr ? parseFloat(fileSizeStr) * 1024 * 1024 : null;
                    break;
                } 
                // Estructura de la segunda API
                else if (apiResponse.success && apiResponse.data?.download) {
                    const metadata = apiResponse.data.metadata;
                    title = metadata.title || 'Video sin título';
                    dl_url = apiResponse.data.download.url;
                    fileSizeStr = metadata.size || null;
                    sizeBytes = fileSizeStr ? parseFloat(fileSizeStr) * 1024 * 1024 : null;
                    break;
                } 
                // Estructura de la tercera API
                else if (apiResponse.status && apiResponse.data?.dl) {
                    title = apiResponse.data.title || 'Video sin título';
                    dl_url = apiResponse.data.dl;
                    sizeBytes = null;
                    break;
                }
            } catch (e) {
                console.error(`Error con API: ${apiUrl}`, e);
            }
        }

        if (!dl_url) {
            return conn.reply(m.chat, '❀ No se pudo obtener la información del video, intenta con otro enlace.', m);
        }

        let HS = `*Titulo :* ${title}\nDuración : ${duration}\nCalidad : ${quality}p`;

        if (sizeBytes && sizeBytes >= 2400 * 1024 * 1024) {
            await conn.sendMessage(m.chat, { 
                document: { url: dl_url }, 
                mimetype: 'video/mp4', 
                fileName: `${title}.mp4`, 
                caption: HS 
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { 
                video: { url: dl_url }, 
                caption: HS 
            }, { quoted: m });
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖');
    }
};

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp4'];
handler.register = true;

export default handler;


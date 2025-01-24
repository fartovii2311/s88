//`https://api.vreden.web.id/api/ytmp4?url=${text}`,
//`https://delirius-apiofc.vercel.app/download/ytmp4?url=${text}`,
//`https://api.siputzx.my.id/api/d/ytmp4?url=${text}`

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de youtube', m);

    try {
        await m.react('🕒');
        let json;
        let downloadUrl = null;
        let apiUrl;

        apiUrl = `https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${encodeURIComponent(text)}&quality=360`;
        let api = await fetch(apiUrl);
        json = await api.json();
        
        if (json?.result?.download_url) {
            downloadUrl = json.result.download_url;
        }

        if (!downloadUrl) {
            apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(text)}`;
            api = await fetch(apiUrl);
            json = await api.json();
            
            if (json?.result?.download_url) {
                downloadUrl = json.result.download_url;
            }
        }

        if (!downloadUrl) {
            apiUrl = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(text)}`;
            api = await fetch(apiUrl);
            json = await api.json();
            
            if (json?.result?.download_url) {
                downloadUrl = json.result.download_url;
            }
        }
        if (!downloadUrl) {
            return conn.reply(m.chat, '🚫 *Error al obtener el video.* Verifica la URL o intenta nuevamente más tarde.', m);
        }

        let { title, duration, quality } = json.result;

        let HS = `*Titulo :* ${title}\nDuración : ${duration}\nCalidad : ${quality}p`;

        let durationInSeconds = 0;
        if (duration.includes("min")) {
            let minutes = parseFloat(duration.replace(" min", ""));
            durationInSeconds = Math.round(minutes * 60); 
        }

        if (durationInSeconds >= 2400) {
            await conn.sendMessage(m.chat, { 
                document: { url: downloadUrl }, 
                mimetype: 'video/mp4', 
                fileName: `${title}.mp4`, 
                caption: HS 
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { 
                video: { url: downloadUrl }, 
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
handler.Monedas = 1;

export default handler;

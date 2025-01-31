import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de YouTube', m);

    try {
        await m.react('🕒');

        const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=xenzpedo`);
        const result = await response.json();

        if (result.status && result.result && result.result.mp4) {
            const { title, mp4, thumb } = result.result;
            await conn.sendMessage(m.chat, { 
                video: { url: mp4 }, 
                caption: `🎥 *Título:* ${title}`,
                thumbnail: { url: thumb }
            }, { quoted: m });

            await m.react('✅');
            return;
        }

        throw new Error('No se pudo obtener el enlace de descarga.');

    } catch (error) {
        console.error(error);
        await m.react('❌');
        m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
    }
};

handler.tags = ['dl'];
handler.command = /^ytmp4$/i;
handler.register = true;
handler.Monedas = 3;

export default handler;

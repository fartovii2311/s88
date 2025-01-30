import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de YouTube', m);

    try {
        await m.react('🕒');

        const response1 = await fetch(`https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(text)}`);
        const result1 = await response1.json();

        if (result1.status === 200 && result1.success && result1.result && result1.result.download_url) {
            await conn.sendMessage(m.chat, { 
                video: { url: result1.result.download_url }, 
                caption: '🎥 Aquí está tu video' 
            }, { quoted: m });
            await m.react('✅');
            return;
        }

        const response2 = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4?url=${encodeURIComponent(text)}&type=video&quality=hdHigh&key=api`);
        const result2 = await response2.json();

        if (result2.success && result2.downloadLink) {
            await conn.sendMessage(m.chat, { 
                video: { url: result2.downloadLink }, 
                caption: '🎥 Aquí está tu video' 
            }, { quoted: m });
            await m.react('✅');
            return;
        }

        throw new Error('No se pudo obtener el enlace de descarga de ninguna API');

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

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de YouTube', m);

    try {
        await m.react('🕒');

        // Intentar con la API de Dark-Core para MP4
        const response = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4?url=${encodeURIComponent(text)}&type=video&quality=hdHigh&key=api`);
        const result = await response.json();

        if (result.success && result.downloadLink) {
            await conn.sendMessage(m.chat, { 
                video: { url: result.downloadLink }, 
                caption: '🎥 Aquí está tu video' 
            }, { quoted: m });
            await m.react('✅');
        } else {
            throw new Error('No se pudo obtener el enlace de descarga del video');
        }

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

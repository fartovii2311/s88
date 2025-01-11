 // *[ ❀ FACEBOOK DL ]*
import fetch from 'node-fetch';

let handler = async (m, { conn, text, rcanal }) => {
    if (!text) return conn.reply(m.chat, `[ ᰔᩚ ] Ingresa el url de video de *Facebook*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.facebook.com/share/v/15cuhDnBf2/`, m, rcanal,fake);
    await m.react('🕓');
    try {
        let api = await fetch(`https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(text)}`);
        let json = await api.json();
        await conn.sendFile(m.chat, json.data.video, 'video.mp4', null, m,listo);
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `❀ Ocurrió un error al procesar tu solicitud.`, m, rcanal,fake);
        await m.react('❌');
    }
};

handler.help = ['fb *<link>*'];
handler.tags = ['dl'];
handler.command = /^(fb|facebook|Facebook|fbdl)$/i;
handler.register = true;

export default handler;

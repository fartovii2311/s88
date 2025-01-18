 // *[ ❀ FACEBOOK DL ]*
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(
            m.chat,
            '[ ᰔᩚ ] Ingresa la URL del video de *Facebook*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.facebook.com/share/`,
            m,rcanal
        );
    }

    await m.react('🕓');

    try {
        let apiResponse = await fetch(`https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(text)}`);
        let json = await apiResponse.json();
        const videoUrl = json.data.video;
        const videoSizeLimit = 50 * 1024 * 1024;

        let videoBuffer = await fetch(videoUrl).then((res) => res.buffer());
        
        if (videoBuffer.length > videoSizeLimit) {
            await conn.sendMessage(m.chat, {
                document: videoBuffer,
                fileName: 'video.mp4',
                mimetype: 'video/mp4',
                caption: '[ ᰔᩚ ] Aquí tienes el video solicitado como documento.',
            },{ quoted: m });
        } else {
            await conn.sendMessage(m.chat, {
                video: videoBuffer,
                caption: '[ ᰔᩚ ] Aquí tienes el video solicitado.',
            },{ quoted: m });
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await conn.reply(
            m.chat,
            `❀ Ocurrió un error al procesar tu solicitud. Por favor, verifica la URL y vuelve a intentarlo.`,
            m,rcanal
        );
        await m.react('❌');
    }
};

handler.help = ['fb *<link>*'];
handler.tags = ['dl'];
handler.command = /^(fb|facebook|Facebook|fbdl)$/i;
handler.register = true;

export default handler;

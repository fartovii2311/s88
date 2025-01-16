let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    if (!m.quoted) {
        return conn.reply(m.chat, `🚩 Responde a una imagen, video o audio ViewOnce.`, m,rcanal);
    }
    if (m.quoted.mtype !== 'viewOnceMessageV2') {
        return conn.reply(m.chat, `🚩 Responde a una imagen, video o audio ViewOnce.`, m,rcanal);
    }

    try {
        let msg = m.quoted.message;
        let type = Object.keys(msg)[0]; // Detecta si es imagen, video o audio

        // Descarga el contenido del mensaje ViewOnce
        let media = await downloadContentFromMessage(
            msg[type], 
            type === 'imageMessage' ? 'image' : 
            type === 'videoMessage' ? 'video' : 
            'audio'
        );

        let buffer = Buffer.from([]);
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (/video/.test(type)) {
            return conn.sendMessage(m.chat, { video: buffer, caption: msg[type]?.caption || '' }, { quoted: m });
        } else if (/image/.test(type)) {
            return conn.sendMessage(m.chat, { image: buffer, caption: msg[type]?.caption || '' }, { quoted: m });
        } else if (/audio/.test(type)) {
            return conn.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mpeg' }, { quoted: m });
        } else {
            return conn.reply(m.chat, `🚩 Tipo de archivo no soportado.`, m);
        }
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, `🚩 Error al procesar el mensaje ViewOnce.`, m);
    }
};

handler.help = ['ver'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'read', 'ver', 'readvo']; 
// handler.limit = 1;
handler.register = true;

export default handler;

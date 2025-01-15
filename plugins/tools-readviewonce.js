let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    if (!m.quoted) return conn.reply(m.chat, `🚩 Responde a una imagen, video o audio ViewOnce.`, m,rcanal;
    if (!['viewOnceMessageV2'].includes(m.quoted.mtype)) return conn.reply(m.chat, `🚩 Responde a una imagen, video o audio ViewOnce.`, m,rcanal);
    
    let msg = m.quoted.message;
    let type = Object.keys(msg)[0];
    
    let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : type == 'videoMessage' ? 'video' : 'audio');
    
    let buffer = Buffer.from([]);
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    if (/video/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m);
    } else if (/image/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m);
    } else if (/audio/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.mp3', msg[type].caption || '', m);
    } else {
        return conn.reply(m.chat, `🚩 Tipo de archivo no soportado.`, m);
    }
}

handler.help = ['ver']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'ver', 'readvo'] 
//handler.limit = 1
handler.register = true 

export default handler;

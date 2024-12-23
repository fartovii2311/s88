import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    m.react('🤍');

    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split`@`[0]}`;

    let vcard = `BEGIN:VCARD
VERSION:3.0
N:WhatsApp;   🍃
FN:DARK CORE 🍃
ORG:Owner
TEL;TYPE=cell:+51968382008
EMAIL:@gmail.co
ADR:;;🇵🇪 Perú;;;;;;
BDAY;value=date:🤍 Q7-06-2006
END:VCARD`;

    const tag_own = await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: 'Owner Contact', 
            contacts: [{ vcard }] 
        } 
    }, { quoted: fkontak });

    let caption = `*👋 Hola ${edtr}, este es el contacto de mi creador 🤍*`;
    await conn.reply(m.chat, caption, tag_own, { mentions: conn.parseMention(caption) });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;

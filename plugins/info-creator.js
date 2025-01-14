import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
await m.react('🤍');

let vcard = `BEGIN:VCARD
VERSION:3.0
N:WhatsApp;
FN:DARK-CORE 🍃
ORG:Owner
TEL;TYPE=cell:+51968382008
EMAIL:darkcoreyt@gmail.com
ADR:;;🇵🇪 Perú;;;;;;
BDAY;value=date:🤍 anonimous
END:VCARD`;

    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: 'Owner Contact', 
            contacts: [{ vcard }] 
        } 
    });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;

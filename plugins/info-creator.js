import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    await m.react('🤍'); // Reacciona al mensaje con un emoji

    let vcard = `BEGIN:VCARD
VERSION:3.0
N:DARK-CORE;;
FN:DARK-CORE 🍃
ORG:Owner
TEL;TYPE=CELL:+51968382008
EMAIL:darkcoreyt@gmail.com
ADR:;;🇵🇪 Perú;;;;;
BDAY:2000-01-01
END:VCARD`;

    // Envía el contacto como vCard
    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: 'DARK-CORE 🍃', 
            contacts: [{ vcard }]
        } 
    }, { quoted: m }); // Incluye el mensaje citado (si lo deseas)
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;

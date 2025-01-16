import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    await m.react('🤍'); // Reacciona al mensaje con un emoji

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

    // Envía el mensaje con el contacto
    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: 'Owner Contact', 
            contacts: [{ vcard }]
        }
    }, { quoted: m }); // Este parámetro debe ir fuera del objeto principal
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;

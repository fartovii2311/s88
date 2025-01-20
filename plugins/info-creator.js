import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    await m.react('🤍');

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

    try {
        const profilePicUrl = await conn.profilePictureUrl(conn.user.jid, 'image');
        const response = await fetch(profilePicUrl);
        const buffer = await response.buffer();

        await conn.sendMessage(
            m.chat,
            { 
                contacts: { 
                    displayName: 'DARK-CORE 🍃', 
                    contacts: [{ vcard }]
                },
                jpegThumbnail: buffer
            }, 
            { quoted: m }
        );
    } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error.message);
        await conn.sendMessage(
            m.chat,
            { 
                contacts: { 
                    displayName: 'DARK-CORE 🍃', 
                    contacts: [{ vcard }]
                }
            }, 
            { quoted: m }
        );
    }
};

handler.help = ['creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;

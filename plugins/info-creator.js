import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    await m.react('🤍');

    const targetJid = '51968382008@s.whatsapp.net'; // JID del contacto
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
        const profilePicUrl = await conn.profilePictureUrl(targetJid, 'image');
        if (!profilePicUrl) throw new Error('No se pudo obtener la imagen de perfil del contacto.');

        console.log('URL de la imagen de perfil del contacto:', profilePicUrl);

        const response = await fetch(profilePicUrl);
        if (!response.ok) throw new Error(`Error al descargar la imagen: ${response.statusText}`);

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

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;

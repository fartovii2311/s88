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
        const profilePicUrl = await conn.profilePictureUrl(conn.user.jid, 'image'); // Obtener la URL de la imagen de perfil
        if (!profilePicUrl) throw new Error('No se pudo obtener la URL de la imagen de perfil.');

        console.log('URL de la imagen de perfil:', profilePicUrl);

        const response = await fetch(profilePicUrl); // Descargar la imagen
        if (!response.ok) throw new Error(`Error al descargar la imagen: ${response.statusText}`);

        const buffer = await response.buffer(); // Convertir a buffer

        await conn.sendMessage(
            m.chat,
            { 
                contacts: { 
                    displayName: 'DARK-CORE 🍃', 
                    contacts: [{ vcard }]
                },
                jpegThumbnail: buffer // Enviar como miniatura
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('Error al obtener la imagen o enviar el contacto:', error.message);

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

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
        // Obtén la URL de la imagen de perfil del contacto
        const profilePicUrl = await conn.profilePictureUrl(targetJid, 'image');
        if (!profilePicUrl) throw new Error('No se pudo obtener la imagen de perfil del contacto.');

        console.log('URL de la imagen de perfil del contacto:', profilePicUrl);

        // Descarga la imagen de perfil
        const response = await fetch(profilePicUrl);
        if (!response.ok) throw new Error(`Error al descargar la imagen: ${response.statusText}`);

        const buffer = await response.buffer(); // Convierte la respuesta en un buffer

        // Enviar el contacto con la imagen como miniatura
        await conn.sendMessage(
            m.chat,
            { 
                contacts: { 
                    displayName: 'DARK-CORE 🍃', 
                    contacts: [{ vcard }]
                },
                jpegThumbnail: buffer // Miniatura de la imagen de perfil
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('Error al obtener la imagen o enviar el contacto:', error.message);

        // Enviar el contacto sin miniatura si hay errores
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

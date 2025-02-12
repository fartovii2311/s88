import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('☁️');

    // VCARD
    let list = [{
        displayName: "Darkcore ☁️",
        vcard: `привет`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                body: 'Это официальный контакт моего создателя',
                vcard: `привет`,
                thumbnailUrl: 'https://i.ibb.co/Y7mhFdf/file.jpg',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m `привет как дела`,
    });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;

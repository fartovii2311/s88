import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('☁️');

    // VCARD
    let list = [{
        displayName: "Darkcore ☁️",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: Darkcore\nitem1.TEL;waid=+79883576985:+79883576985\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET: darkcore@example.com\nitem2.X-ABLabel:Email\nitem3.URL:https://darkcore-support.vercel.app/\nitem3.X-ABLabel:Internet\nitem4.ADR:;; Perú;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'һ᥆ᥣᥲ s᥆ᥡ ᑕrᥱᥲძ᥆r Darkcore ☁️',
                body: 'Это официальный контакт моего создателя',
                thumbnailUrl: 'https://i.ibb.co/Y7mhFdf/file.jpg',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;

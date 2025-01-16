import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return true;

    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
        .catch(_ => 'https://th.bing.com/th/id/R.3c44682163aece471be5e9be31853c5f?rik=ffeQ00G9XjrtnA&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f3%2f96%2fzCEgo6.jpg&ehk=AG0SIiF60d%2fqhZysxXu70HHHGZOSdQ5xhUnW0SeytiI%3d&risl=&pid=ImgRaw&r=0');
    let img = await (await fetch(pp)).buffer();

    let chat = global.db.data.chats[m.chat];
    if (!chat.bienvenida) return true;

    const welcomeMessage = `
*⭒─ׄ─ׅ─ׄ─⭒ \`ʙɪᴇɴᴠᴇɴɪᴅᴀ\` ⭒─ׄ─ׅ─ׄ─⭒*

╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*
┊:⁖֟⊱┈֟፝❥ *ᴡᴇʟᴄᴏᴍᴇ* :: @${m.messageStubParameters[0].split`@`[0]}
┊:⁖֟⊱┈֟፝❥  ${groupMetadata.subject}
╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩

> ✐ Puedes usar */help* para ver la lista de comandos.
`;

    const byeMessage = `
*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*

╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*
┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${m.messageStubParameters[0].split`@`[0]}
┊:⁖֟⊱┈֟፝❥  NADIE TE QUISO AQUÍ
╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩
`;

    if (m.messageStubType === 27) {
        await conn.sendAi(m.chat, 'Bienvenida', 'Welcome', welcomeMessage, img, img, 'Canal', 'Estilo');
    } else if (m.messageStubType === 28 || m.messageStubType === 32) {
        await conn.sendAi(m.chat, 'Despedida', 'Bye', byeMessage, img, img, 'Canal', 'Estilo');
    }
}

export async function toggleWelcome(m, { conn, args, groupMetadata }) {
    const chat = global.db.data.chats[m.chat];

    if (!m.isGroup) {
        return conn.reply(m.chat, 'Este comando solo se puede usar en grupos.', m);
    }

    const isAdmin = groupMetadata.participants.find(p => p.id === m.sender).admin;
    if (!isAdmin) {
        return conn.reply(m.chat, 'Necesitas ser administrador para usar este comando.', m);
    }

    if (args[0] === 'on') {
        chat.bienvenida = true;
        conn.reply(m.chat, 'La bienvenida y despedida se han activado. 🎉', m);
    } else if (args[0] === 'off') {
        chat.bienvenida = false;
        conn.reply(m.chat, 'La bienvenida y despedida se han desactivado. 🛑', m);
    } else {
        conn.reply(m.chat, 'Uso: */togglewelcome on* para activar o */togglewelcome off* para desactivar.', m);
    }
}

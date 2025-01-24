import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];

  if (!chat || !chat.bienvenida || !user?.registered) return;

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(() =>
    'https://th.bing.com/th/id/R.3c44682163aece471be5e9be31853c5f?rik=ffeQ00G9XjrtnA&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f3%2f96%2fzCEgo6.jpg&ehk=AG0SIiF60d%2fqhZysxXu70HHHGZOSdQ5xhUnW0SeytiI%3d&risl=&pid=ImgRaw&r=0'
  );
  let img = await (await fetch(`${pp}`)).buffer();

  if (m.messageStubType === 27) {
    let welcome = `*⭒─ׄ─ׅ─ׄ─⭒ \`ʙɪᴇɴᴠᴇɴɪᴅᴀ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ᴡᴇʟᴄᴏᴍᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥  ${groupMetadata.subject}\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩\n\n> ✐ Puedes usar */help* para ver la lista de comandos.`;
    await conn.sendMessage(m.chat, { text: welcome, mentions: [m.messageStubParameters[0]], image: img });
  }

  if (m.messageStubType === 28) {
    let bye = `*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥  SE NOS FUE XD\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
    await conn.sendMessage(m.chat, { text: bye, mentions: [m.messageStubParameters[0]], image: img });
  }

  if (m.messageStubType === 32) {
    let kick = `*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥  SE NOS FUE XD\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
    await conn.sendMessage(m.chat, { text: kick, mentions: [m.messageStubParameters[0]], image: img });
  }
}

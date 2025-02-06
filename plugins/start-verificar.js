import { createHash } from 'crypto';
import fetch from 'node-fetch';
import { determinarIdiomaPorNumero } from '../lib/determinaidioma.js';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender];
  let name2 = conn.getName(m.sender) || 'Usuario';

  if (user.registered) return m.reply('✨ Ya estás registrado.');

  let name, age;
  if (command === 'verificar') {
    name = name2.trim() || 'Usuario';
    age = 18; // Edad por defecto si es "verificar"
  } else {
    if (!Reg.test(text)) {
      return conn.reply(
        m.chat,
        `🌟 *Registro requerido*\n\nPor favor, usa el formato:\n\`${usedPrefix + command} <nombre.edad>\`\nEjemplo:\n\`${usedPrefix + command} LynxAI.18\``,
        m
      );
    }

    let [_, n, splitter, a] = text.match(Reg);
    name = n.trim();
    age = parseInt(a);
    
    if (!name) return conn.reply(m.chat, '❌ El nombre no puede estar vacío.', m);
    if (!age || age < 1 || age > 100) {
      return conn.reply(m.chat, '❌ La edad debe estar entre 1 y 100 años.', m);
    }
  }

  let idioma = determinarIdiomaPorNumero(m.sender.replace('@s.whatsapp.net', ''));
  user.DKLanguage = idioma;
  user.name = name;
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);
  let imgURL = 'https://i.ibb.co/Y7mhFdf/file.jpg';
  let now = new Date();
  let date = now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  let time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  let txt = `🎉 *¡Registro exitoso!*\n\n` +
            `✨ *Información del Usuario:*\n` +
            `🆔 *Tag:* @${m.sender.split('@')[0]}\n` +
            `👤 *Nombre:* ${name}\n` +
            `🎂 *Edad:* ${age} años\n` +
            `📅 *Fecha:* ${date}\n` +
            `⏰ *Hora:* ${time}\n` +
            `🔑 *N° Serial:* ${sn}\n\n` +
            `🌟 *Bienvenido a la comunidad Dark Team.*`;

  try {
    await conn.sendFile(m.chat, imgURL, 'registro.jpg', txt, m, rcanal, fake);
  } catch (err) {
    console.error("Error al enviar el mensaje al usuario:", err);
    return conn.reply(m.chat, '❌ Hubo un problema al enviarte el registro.', m);
  }

  let channelId = '120363372958306577@newsletter';
  try {
    await conn.sendMessage(
      channelId,
      {
        image: { url: imgURL },
        caption:
          `╭─────────── ✦ ✦ ────────────╮\n` +
          `├ 🆔 *Tag:* @${m.sender.split('@')[0]}\n` +
          `├ 👤 *Nombre:* ${name}\n` +
          `├ 🎂 *Edad:* ${age} años\n` +
          `├ 🔑 *N° Serial:* ${sn}\n` +
          `├ 🗓️ *Fecha:* ${date}\n` +
          `├ ⏰ *Hora:* ${time}\n` +
          `├ 🌍 *Origen:* ${m.chat}\n` +
          `╰─────────── ✦ ✦ ────────────╯\n\n` +
          `🌟 _“Unidos, somos más fuertes.”_`,
        footer: '> ✨ Dark Team Oficial',
      }
    );
  } catch (err) {
    console.error("Error al enviar el mensaje al canal de noticias:", err);
  }

  try {
    await m.react('✅');
  } catch (err) {
    console.error("Error al reaccionar al mensaje:", err);
  }
};

handler.help = ['reg'].map(v => v + ' <nombre.edad>');
handler.tags = ['start'];
handler.command = ['verify', 'reg', 'register', 'registrar', 'verificar'];

export default handler;

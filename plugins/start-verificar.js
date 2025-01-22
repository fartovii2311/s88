import { createHash } from 'crypto';
import fetch from 'node-fetch';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender];
  let name2 = conn.getName(m.sender);

  if (user.registered) return m.reply('✨ Ya estás registrado.');

  if (!Reg.test(text) && command !== 'verificar') {
    return conn.reply(
      m.chat,
      `🌟 *Registro requerido*\n\nPor favor, utiliza el formato:\n\`${usedPrefix + command} <nombre.edad>\`\n\nEjemplo:\n\`${usedPrefix + command} LynxAI.18\``,
      m,
      rcanal
    );
  }

  let name, age;
  if (command === 'verificar') {
    name = name2.trim();
    age = 18; // Predeterminado a 18 si no se proporciona la edad
    if (!name || isNaN(age) || age < 1 || age > 100) {
      return conn.reply(
        m.chat,
        `❌ *Registro fallido*\n\nNo se pudo obtener un nombre o edad válidos.\nUsa el formato:\n\`${usedPrefix + command} <nombre.edad>\``,
        m,
        rcanal
      );
    }
  } else {
    let [_, n, splitter, a] = text.match(Reg);
    name = n.trim();
    age = parseInt(a);
    if (!name) return conn.reply(m.chat, '❌ El nombre no puede estar vacío.', m);
    if (!age || age < 1 || age > 100) {
      return conn.reply(m.chat, '❌ La edad debe ser entre 1 a 100 años.', m);
    }
  }

  // Guardar los datos del usuario
  user.name = name;
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;

  // Generar un serial único para el usuario
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

  // Intentar enviar el mensaje al usuario con manejo de errores
  try {
    await conn.sendMessage(
      m.chat,
      {
        image: { url: imgURL },
        caption: txt,
        footer: '✨ Powered by Dark Team',
        buttons: [
          { buttonId: `.perfil`, buttonText: { displayText: '👤 VER PERFIL' } },
          { buttonId: `.owner`, buttonText: { displayText: '🛠️ CONTACTAR OWNER' } },
        ],
        viewOnce: true,
        headerType: 4,
      },
      { quoted: m }
    );
  } catch (err) {
    console.error("Error al enviar el mensaje al usuario:", err);
    return m.reply("❌ Hubo un problema al procesar tu registro. Por favor, intenta nuevamente.");
  }

  // Enviar mensaje al canal de noticias con manejo de errores
  let channelId = '120363372958306577@newsletter'; // Asegúrate de que este canal sea correcto
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
        headerType: 4,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: 'Registros Lynx',
            body: 'Dark Team Oficial',
            thumbnailUrl: imgURL,
            mediaType: 1,
            mediaUrl: 'https://darkteam.com',
            sourceUrl: 'https://darkteam.com', // Fuente del enlace
          },
        },
      }
    );
  } catch (err) {
    console.error("Error al enviar el mensaje al canal de noticias:", err);
  }

  // Reaccionar al mensaje del usuario con manejo de errores
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

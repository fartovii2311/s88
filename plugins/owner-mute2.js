import fetch from 'node-fetch';

const handler = async (message, { conn: botConnection, command, text, isAdmin }) => {
  const groupMetadata = await botConnection.groupMetadata(message.chat);
  const groupOwnerJid = groupMetadata.owner || message.chat.split`-`[0] + "@s.whatsapp.net";
  const botOwnerJid = global.owner[0][0] + "@s.whatsapp.net";

  // Obtener usuario objetivo
  let targetUserJid = message.mentionedJid?.[0] || (message.quoted ? message.quoted.sender : null);
  if (!targetUserJid) {
    return botConnection.reply(message.chat, "💥 *Menciona a la persona que deseas mutar/desmutar*", message);
  }

  // Evitar acciones no válidas
  if (targetUserJid === botOwnerJid) throw "👑 *No puedes mutar/desmutar al creador del bot*";
  if (targetUserJid === botConnection.user.jid) throw "🚩 *No puedes mutar/desmutar al bot*";
  if (targetUserJid === groupOwnerJid) throw "👑 *No puedes mutar/desmutar al creador del grupo*";

  // Acceso a la base de datos del usuario
  const userData = global.db.data.users[targetUserJid];
  if (!userData) {
    return botConnection.reply(message.chat, "⚠️ *El usuario no está registrado en la base de datos*", message);
  }

  if (command === "mute2") {
    if (!isAdmin) throw "💌 *Solo un administrador puede ejecutar este comando*";
    if (userData.muted) throw "🚩 *Este usuario ya ha sido mutado*";

    // Notificación de mute
    const muteNotification = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: "𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗺𝘂𝘁𝗮𝗱𝗼",
          jpegThumbnail: await (
            await fetch("https://telegra.ph/file/f8324d9798fa2ed2317bc.png")
          ).buffer(),
        },
      },
      participant: "0@s.whatsapp.net",
    };

    // Actualizar estado de mute
    userData.muted = true;
    botConnection.reply(
      message.chat,
      "✅ *El usuario ha sido mutado. Sus mensajes serán eliminados.*",
      muteNotification,
      { mentions: [targetUserJid] }
    );
  } else if (command === "unmute2") {
    if (!isAdmin) throw "💭 *Solo un administrador puede ejecutar este comando*";
    if (!userData.muted) throw "☁️ *Este usuario no está mutado*";

    // Notificación de unmute
    const unmuteNotification = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: "𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗱𝗲𝗺𝘂𝘁𝗮𝗱𝗼",
          jpegThumbnail: await (
            await fetch("https://telegra.ph/file/aea704d0b242b8c41bf15.png")
          ).buffer(),
        },
      },
      participant: "0@s.whatsapp.net",
    };

    // Actualizar estado de unmute
    userData.muted = false;
    botConnection.reply(
      message.chat,
      "✅ *El usuario ha sido desmutado. Ahora puede enviar mensajes.*",
      unmuteNotification,
      { mentions: [targetUserJid] }
    );
  }
};

handler.command = ['mute2', 'unmute2'];
handler.tags = ['owner'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

import fetch from 'node-fetch';

const handler = async (message, { conn: botConnection, command, text, isAdmin }) => {
  if (command === "mute") {
    if (!isAdmin) {
      throw "💌 *Solo un administrador puede ejecutar este comando*";
    }
    const botOwnerJid = global.owner[0][0] + "@s.whatsapp.net";
    if (message.mentionedJid[0] === botOwnerJid) {
      throw "👑 *El creador del bot no puede ser mutado*";
    }
    let targetUserJid = message.mentionedJid[0]
      ? message.mentionedJid[0]
      : message.quoted
      ? message.quoted.sender
      : text;
    if (targetUserJid === botConnection.user.jid) {
      throw "🚩 *No puedes mutar el bot*";
    }
    const groupMetadata = await botConnection.groupMetadata(message.chat);
    const groupOwnerJid =
      groupMetadata.owner || message.chat.split`-`[0] + "@s.whatsapp.net";
    if (message.mentionedJid[0] === groupOwnerJid) {
      throw "👑 *No puedes mutar al creador del grupo*";
    }
    let targetUserData = global.db.data.users[targetUserJid];
    let muteNotification = {
      key: {
        participants: "0@s.whatsapp.net",
        fromMe: false,
        id: "Halo",
      },
      message: {
        locationMessage: {
          name: "𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗺𝘂𝘁𝗮𝗱𝗼",
          jpegThumbnail: await (
            await fetch(
              "https://telegra.ph/file/f8324d9798fa2ed2317bc.png"
            )
          ).buffer(),
        },
      },
      participant: "0@s.whatsapp.net",
    };
    if (!message.mentionedJid[0] && !message.quoted) {
      return botConnection.reply(
        message.chat,
        "💥 *Menciona a la persona que deseas mutar*",
        message
      );
    }
    if (targetUserData.muted === true) {
      throw "🚩 *Este usuario ya ha sido mutado*";
    }
    botConnection.reply(
      message.chat,
      "*Tus mensajes serán eliminados*",
      muteNotification,
      null,
      {
        mentions: [targetUserJid],
      }
    );
    global.db.data.users[targetUserJid].muted = true;
  } else if (command === "unmute") {
    if (!isAdmin) {
      throw "💭 *Solo un administrador puede ejecutar este comando*";
    }
    let targetUserJid = message.mentionedJid[0]
      ? message.mentionedJid[0]
      : message.quoted
      ? message.quoted.sender
      : text;
    let targetUserData = global.db.data.users[targetUserJid];
    let unmuteNotification = {
      key: {
        participants: "0@s.whatsapp.net",
        fromMe: false,
        id: "Halo",
      },
      message: {
        locationMessage: {
          name: "𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗱𝗲𝗺𝘂𝘁𝗮𝗱𝗼",
          jpegThumbnail: await (
            await fetch(
              "https://telegra.ph/file/aea704d0b242b8c41bf15.png"
            )
          ).buffer(),
        },
      },
      participant: "0@s.whatsapp.net",
    };
    if (targetUserJid === message.sender) {
      throw "✨️ *Sólo otro administrador puede desmutarte*";
    }
    if (!message.mentionedJid[0] && !message.quoted) {
      return botConnection.reply(
        message.chat,
        "💥 *Menciona a la persona que deseas desmutar*",
        message
      );
    }
    if (targetUserData.muted === false) {
      throw "☁️ *Este usuario no ha sido mutado*";
    }
    global.db.data.users[targetUserJid].muted = false;
    botConnection.reply(
      message.chat,
      "*Tus mensajes no serán eliminados*",
      unmuteNotification,
      null,
      {
        mentions: [targetUserJid],
      }
    );
  }
};

handler.command = ['mute2', 'unmute2'];
handler.tag = ['owner'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

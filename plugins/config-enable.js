let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = (args[0] || '').toLowerCase();
  let isAll = false, isUser = false;

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.welcome = isEnable;
      break;

    case 'antiprivado':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.antiPrivate = isEnable;
      break;

    case 'restrict':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.restrict = isEnable;
      break;

    case 'autolevelup':
    case 'autonivel':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.autolevelup = isEnable;
      break;

    case 'autoread':
    case 'autoleer':
    case 'autover':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['autoread'] = isEnable;
      break;

    case 'reaction':
    case 'reaccion':
    case 'emojis':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.reaction = isEnable;
      break;

    case 'audios':
    case 'audiosbot':
    case 'botaudios':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.audios = isEnable;
      break;

    case 'antilink':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.antiLink = isEnable;
      break;

    case 'nsfw':
    case 'modohorny':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.modohorny = isEnable;
      break;

    case 'antifake':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.antifake = isEnable;
      break;

    case 'antidelete':
    case 'antieliminar':
    case 'delete':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.delete = isEnable;
      break;

    case 'autoresponder':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.autoresponder = isEnable;
      break;

    case 'autobio':
    case 'status':
    case 'bio':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.autobio = isEnable;
      break;

    case 'detect':
    case 'configuraciones':
    case 'avisodegp':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.detect = isEnable;
      break;

    case 'simi':
    case 'autosimi':
    case 'simsimi':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.simi = isEnable;
      break;

    default:
      conn.reply(
        m.chat,
        `⚠️ Función no reconocida. Usa las opciones disponibles: welcome, autolevelup, reaction, audios, antilink, nsfw, antidelete, autoresponder, autobio, detect, simi.`,
        m
      );
      throw false;
  }

  await conn.sendMessage(
    m.chat,
    {
      text: `✅ *Estado actualizado*\n\n` +
        `*Función:* ${type.toUpperCase()}\n` +
        `*Estado:* ${isEnable ? 'Activado' : 'Desactivado'}\n` +
        `*Aplicado para:* ${isAll ? 'Todo el bot' : 'Este chat'}`,
      footer: 'Configuración completa.',
      buttons: [
        { buttonId: isEnable ? `.off ${type}` : `.on ${type}`, buttonText: { displayText: isEnable ? 'OFF' : 'ON' } },
        { buttonId: '.menu', buttonText: { displayText: 'Menú Principal' } }
      ],
      headerType: 1
    },
    { quoted: m }
  );
};

handler.help = ['enable <opción>', 'disable <opción>', 'on <opción>', 'off <opción>'];
handler.tags = ['config'];
handler.command = ['enable', 'disable', 'on', 'off', '1', '0'];

export default handler;

import fs from 'fs';
const handler = (m) => m;

handler.all = async function(m) {
  const vn = './media/audios/bot.mp3'; // Ruta de audio
  const chat = global.db.data.chats[m.chat];

  if (/^bot$/i.test(m.text) && !chat.isBanned) {
    conn.sendPresenceUpdate('recording', m.chat);
    conn.reply(
      m.chat,
      `🤍 ¡Hola! Soy una ia, ¿en qué puedo ayudarte hoy?\n\n✰ Usa *!menu* para ver mis comandos.`,
      m,
      null
    );
  }

  if (/^sexo$/i.test(m.text)) {
    conn.reply(m.chat, `*pervertido* 🫣`, m, null);
  }

  if (/^tetas|teta$/i.test(m.text)) {
    conn.reply(m.chat, `*qué caliente eres* 🥵`, m, null);
  }

  if (/^bug$/i.test(m.text)) {
    conn.reply(m.chat, `*tu mamá we* 😹`, m, null);
  }

  if (/^pene$/i.test(m.text)) {
    conn.reply(m.chat, `*comes* 😹`, m, null);
  }
  if (/^hola|holi$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hola! ¿Cómo estás? 🤗`, m, null);
}

if (/^adios|bye$/i.test(m.text)) {
  conn.reply(m.chat, `¡Adiós! Nos vemos pronto. 👋`, m, null);
}

if (/^gracias$/i.test(m.text)) {
  conn.reply(m.chat, `¡De nada! Estoy aquí para ayudarte. 🌟`, m, null);
}

if (/^amor$/i.test(m.text)) {
  conn.reply(m.chat, `El amor está en el aire. 💖`, m, null);
}

if (/^xd$/i.test(m.text)) {
  conn.reply(m.chat, `¡Xd! 😹`, m, null);
}

if (/^uwu$/i.test(m.text)) {
  conn.reply(m.chat, `¡UwU! 🥰`, m, null);
}

if (/^ayuda$/i.test(m.text)) {
  conn.reply(m.chat, `Si necesitas ayuda, puedes usar *!menu* para ver mis comandos. 💡`, m, null);
}

if (/^no$/i.test(m.text)) {
  conn.reply(m.chat, `¡No digas eso! 😠`, m, null);
}

if (/^si$/i.test(m.text)) {
  conn.reply(m.chat, `¡Eso es genial! 😊`, m, null);
}

if (/^perro|perrito$/i.test(m.text)) {
  conn.reply(m.chat, `¡Guau guau! 🐶`, m, null);
}

if (/^gato|gatito$/i.test(m.text)) {
  conn.reply(m.chat, `¡Miau miau! 🐱`, m, null);
}

if (/^hacker$/i.test(m.text)) {
  conn.reply(m.chat, `¡Cuidado, hacker detectado! 👨‍💻`, m, null);
}

if (/^dinero$/i.test(m.text)) {
  conn.reply(m.chat, `¡El dinero no lo es todo, pero ayuda! 💵`, m, null);
}
if (/^pizza$/i.test(m.text)) {
  conn.reply(m.chat, `¿Una pizza? ¡Qué delicia! 🍕`, m, null);
}

if (/^robot$/i.test(m.text)) {
  conn.reply(m.chat, `¡Sí! Soy un robot muy amigable. 🤖`, m, null);
}

if (/^matrix$/i.test(m.text)) {
  conn.reply(m.chat, `¿Tomarás la pastilla azul o roja? 🔴🔵`, m, null);
}

if (/^marte$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hola desde Marte! 🪐`, m, null);
}

if (/^fiesta$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hora de fiesta! 🎉`, m, null);
}

if (/^tacos$/i.test(m.text)) {
  conn.reply(m.chat, `¡Claro que sí, unos tacos para ti! 🌮`, m, null);
}

if (/^fantasma$/i.test(m.text)) {
  conn.reply(m.chat, `¿Un fantasma? ¡Buuu! 👻`, m, null);
}

if (/^estrella$/i.test(m.text)) {
  conn.reply(m.chat, `Eres una estrella brillante. ✨`, m, null);
}

if (/^bailar$/i.test(m.text)) {
  conn.reply(m.chat, `¡Vamos a mover el esqueleto! 🕺💃`, m, null);
}

if (/^viaje$/i.test(m.text)) {
  conn.reply(m.chat, `¡Listos para una aventura épica! ✈️`, m, null);
}

if (/^comida$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hora de un banquete delicioso! 🍽️`, m, null);
}

if (/^música$/i.test(m.text)) {
  conn.reply(m.chat, `¡Pon la música! 🎶`, m, null);
}

if (/^frio$/i.test(m.text)) {
  conn.reply(m.chat, `¿Frío? ¡Abrígate bien! 🧥`, m, null);
}

if (/^calor$/i.test(m.text)) {
  conn.reply(m.chat, `¡Uf! Hace calor, ¿un helado? 🍦`, m, null);
}

if (/^truco$/i.test(m.text)) {
  conn.reply(m.chat, `¿Un truco? ¡No te lo esperas! 🪄`, m, null);
}

if (/^magia$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hocus Pocus! 🪄✨`, m, null);
}

if (/^monstruo$/i.test(m.text)) {
  conn.reply(m.chat, `¡Oh no, un monstruo! 😱`, m, null);
}

if (/^zombie$/i.test(m.text)) {
  conn.reply(m.chat, `¡Cuidado con los zombis! 🧟`, m, null);
}

if (/^heroe$/i.test(m.text)) {
  conn.reply(m.chat, `¡Eres mi héroe! 🦸‍♂️`, m, null);
}

if (/^villano$/i.test(m.text)) {
  conn.reply(m.chat, `¡Un villano! ¡Atrápalo! 🦹‍♂️`, m, null);
}


  return !0;
};

export default handler;

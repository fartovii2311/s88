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
      m,,rcanal
      null
    );
  }

  if (/^sexo$/i.test(m.text)) {
    conn.reply(m.chat, `*pervertido* 🫣`, m, null,rcanal);
  }

  if (/^tetas|teta$/i.test(m.text)) {
    conn.reply(m.chat, `*qué caliente eres* 🥵`, m, null,rcanal);
  }

  if (/^bug$/i.test(m.text)) {
    conn.reply(m.chat, `*tu mamá we* 😹`, m, null,rcanal);
  }

  if (/^pene$/i.test(m.text)) {
    conn.reply(m.chat, `*comes* 😹`, m, null,rcanal);
  }
  if (/^hola|holi$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hola! ¿Cómo estás? 🤗`, m, null,rcanal);
}

if (/^adios|bye$/i.test(m.text)) {
  conn.reply(m.chat, `¡Adiós! Nos vemos pronto. 👋`, m, null,rcanal);
}

if (/^gracias$/i.test(m.text)) {
  conn.reply(m.chat, `¡De nada! Estoy aquí para ayudarte. 🌟`, m, null,rcanal);
}

if (/^amor$/i.test(m.text)) {
  conn.reply(m.chat, `El amor está en el aire. 💖`, m, null,rcanal);
}

if (/^xd$/i.test(m.text)) {
  conn.reply(m.chat, `¡Xd! 😹`, m, null,rcanal);
}

if (/^uwu$/i.test(m.text)) {
  conn.reply(m.chat, `¡UwU! 🥰`, m, null,rcanal);
}

if (/^ayuda$/i.test(m.text)) {
  conn.reply(m.chat, `Si necesitas ayuda, puedes usar *!menu* para ver mis comandos. 💡`, m, null,rcanal);
}

if (/^no$/i.test(m.text)) {
  conn.reply(m.chat, `¡No digas eso! 😠`, m, null,rcanal);
}

if (/^si$/i.test(m.text)) {
  conn.reply(m.chat, `¡Eso es genial! 😊`, m, null,rcanal);
}

if (/^perro|perrito$/i.test(m.text)) {
  conn.reply(m.chat, `¡Guau guau! 🐶`, m, null,rcanal);
}

if (/^gato|gatito$/i.test(m.text)) {
  conn.reply(m.chat, `¡Miau miau! 🐱`, m, null,rcanal);
}

if (/^hacker$/i.test(m.text)) {
  conn.reply(m.chat, `¡Cuidado, hacker detectado! 👨‍💻`, m, null,rcanal);
}

if (/^dinero$/i.test(m.text)) {
  conn.reply(m.chat, `¡El dinero no lo es todo, pero ayuda! 💵`, m, null,rcanal);
}
if (/^pizza$/i.test(m.text)) {
  conn.reply(m.chat, `¿Una pizza? ¡Qué delicia! 🍕`, m, null,rcanal);
}

if (/^robot$/i.test(m.text)) {
  conn.reply(m.chat, `¡Sí! Soy un robot muy amigable. 🤖`, m, null,rcanal);
}

if (/^matrix$/i.test(m.text)) {
  conn.reply(m.chat, `¿Tomarás la pastilla azul o roja? 🔴🔵`, m, null,rcanal);
}

if (/^marte$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hola desde Marte! 🪐`, m, null,rcanal);
}

if (/^fiesta$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hora de fiesta! 🎉`, m, null,rcanal);
}

if (/^tacos$/i.test(m.text)) {
  conn.reply(m.chat, `¡Claro que sí, unos tacos para ti! 🌮`, m, null,rcanal);
}

if (/^fantasma$/i.test(m.text)) {
  conn.reply(m.chat, `¿Un fantasma? ¡Buuu! 👻`, m, null,rcanal);
}

if (/^estrella$/i.test(m.text)) {
  conn.reply(m.chat, `Eres una estrella brillante. ✨`, m, null,rcanal);
}

if (/^bailar$/i.test(m.text)) {
  conn.reply(m.chat, `¡Vamos a mover el esqueleto! 🕺💃`, m, null,rcanal);
}

if (/^viaje$/i.test(m.text)) {
  conn.reply(m.chat, `¡Listos para una aventura épica! ✈️`, m, null,rcanal);
}

if (/^comida$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hora de un banquete delicioso! 🍽️`, m, null,rcanal);
}

if (/^música$/i.test(m.text)) {
  conn.reply(m.chat, `¡Pon la música! 🎶`, m, null,rcanal);
}

if (/^frio$/i.test(m.text)) {
  conn.reply(m.chat, `¿Frío? ¡Abrígate bien! 🧥`, m, null,rcanal);
}

if (/^calor$/i.test(m.text)) {
  conn.reply(m.chat, `¡Uf! Hace calor, ¿un helado? 🍦`, m, null,rcanal);
}

if (/^truco$/i.test(m.text)) {
  conn.reply(m.chat, `¿Un truco? ¡No te lo esperas! 🪄`, m, null,rcanal);
}

if (/^magia$/i.test(m.text)) {
  conn.reply(m.chat, `¡Hocus Pocus! 🪄✨`, m, null,rcanal);
}

if (/^monstruo$/i.test(m.text)) {
  conn.reply(m.chat, `¡Oh no, un monstruo! 😱`, m, null,rcanal);
}

if (/^zombie$/i.test(m.text)) {
  conn.reply(m.chat, `¡Cuidado con los zombis! 🧟`, m, null,rcanal);
}

if (/^heroe$/i.test(m.text)) {
  conn.reply(m.chat, `¡Eres mi héroe! 🦸‍♂️`, m, null,rcanal);
}

if (/^villano$/i.test(m.text)) {
  conn.reply(m.chat, `¡Un villano! ¡Atrápalo! 🦹‍♂️`, m, null,rcanal);
}


  return !0;
};

export default handler;

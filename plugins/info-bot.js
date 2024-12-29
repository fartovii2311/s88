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
      m, rcanal
    );
  }

  if (/^sexo$/i.test(m.text)) {
    conn.reply(m.chat, `*pervertido* 🫣`, m, rcanal);
  }

  if (/^tetas|teta$/i.test(m.text)) {
    conn.reply(m.chat, `*qué caliente eres* 🥵`, m, rcanal);
  }

  if (/^bug$/i.test(m.text)) {
    conn.reply(m.chat, `*tu mamá we* 😹`, m, rcanal);
  }

  if (/^pene$/i.test(m.text)) {
    conn.reply(m.chat, `*comes* 😹`, m, rcanal);
  }

  if (/^hola|holi$/i.test(m.text)) {
    conn.reply(m.chat, `¡Hola! ¿Cómo estás? 🤗`, m, rcanal);
  }

  if (/^adios|bye$/i.test(m.text)) {
    conn.reply(m.chat, `¡Adiós! Nos vemos pronto. 👋`, m, rcanal);
  }

  if (/^gracias$/i.test(m.text)) {
    conn.reply(m.chat, `¡De nada! Estoy aquí para ayudarte. 🌟`, m, rcanal);
  }

  if (/^amor$/i.test(m.text)) {
    conn.reply(m.chat, `El amor está en el aire. 💖`, m, rcanal);
  }

  if (/^xd$/i.test(m.text)) {
    conn.reply(m.chat, `¡Xd! 😹`, m, rcanal);
  }

  if (/^uwu$/i.test(m.text)) {
    conn.reply(m.chat, `¡UwU! 🥰`, m, rcanal);
  }

  if (/^ayuda$/i.test(m.text)) {
    conn.reply(m.chat, `Si necesitas ayuda, puedes usar *!menu* para ver mis comandos. 💡`, m, rcanal);
  }

  if (/^no$/i.test(m.text)) {
    conn.reply(m.chat, `¡No digas eso! 😠`, m, rcanal);
  }

  if (/^si$/i.test(m.text)) {
    conn.reply(m.chat, `¡Eso es genial! 😊`, m, rcanal);
  }

  if (/^perro|perrito$/i.test(m.text)) {
    conn.reply(m.chat, `¡Guau guau! 🐶`, m, rcanal);
  }

  if (/^gato|gatito$/i.test(m.text)) {
    conn.reply(m.chat, `¡Miau miau! 🐱`, m, rcanal);
  }

  if (/^hacker$/i.test(m.text)) {
    conn.reply(m.chat, `¡Cuidado, hacker detectado! 👨‍💻`, m, rcanal);
  }

  if (/^dinero$/i.test(m.text)) {
    conn.reply(m.chat, `¡El dinero no lo es todo, pero ayuda! 💵`, m, rcanal);
  }

  if (/^pizza$/i.test(m.text)) {
    conn.reply(m.chat, `¿Una pizza? ¡Qué delicia! 🍕`, m, rcanal);
  }

  if (/^robot$/i.test(m.text)) {
    conn.reply(m.chat, `¡Sí! Soy un robot muy amigable. 🤖`, m, rcanal);
  }

  if (/^matrix$/i.test(m.text)) {
    conn.reply(m.chat, `¿Tomarás la pastilla azul o roja? 🔴🔵`, m, rcanal);
  }

  if (/^marte$/i.test(m.text)) {
    conn.reply(m.chat, `¡Hola desde Marte! 🪐`, m, rcanal);
  }

  if (/^fiesta$/i.test(m.text)) {
    conn.reply(m.chat, `¡Hora de fiesta! 🎉`, m, rcanal);
  }

  if (/^tacos$/i.test(m.text)) {
    conn.reply(m.chat, `¡Claro que sí, unos tacos para ti! 🌮`, m, rcanal);
  }

  if (/^fantasma$/i.test(m.text)) {
    conn.reply(m.chat, `¿Un fantasma? ¡Buuu! 👻`, m, rcanal);
  }

  if (/^estrella$/i.test(m.text)) {
    conn.reply(m.chat, `Eres una estrella brillante. ✨`, m, rcanal);
  }

  if (/^bailar$/i.test(m.text)) {
    conn.reply(m.chat, `¡Vamos a mover el esqueleto! 🕺💃`, m, rcanal);
  }

  if (/^viaje$/i.test(m.text)) {
    conn.reply(m.chat, `¡Listos para una aventura épica! ✈️`, m, rcanal);
  }

  if (/^comida$/i.test(m.text)) {
    conn.reply(m.chat, `¡Hora de un banquete delicioso! 🍽️`, m, rcanal);
  }

  if (/^música$/i.test(m.text)) {
    conn.reply(m.chat, `¡Pon la música! 🎶`, m, rcanal);
  }

  if (/^frio$/i.test(m.text)) {
    conn.reply(m.chat, `¿Frío? ¡Abrígate bien! 🧥`, m, rcanal);
  }

  if (/^calor$/i.test(m.text)) {
    conn.reply(m.chat, `¡Uf! Hace calor, ¿un helado? 🍦`, m, rcanal);
  }

  if (/^truco$/i.test(m.text)) {
    conn.reply(m.chat, `¿Un truco? ¡No te lo esperas! 🪄`, m, rcanal);
  }

  if (/^magia$/i.test(m.text)) {
    conn.reply(m.chat, `¡Hocus Pocus! 🪄✨`, m, rcanal);
  }

  if (/^monstruo$/i.test(m.text)) {
    conn.reply(m.chat, `¡Oh no, un monstruo! 😱`, m, rcanal);
  }

  if (/^zombie$/i.test(m.text)) {
    conn.reply(m.chat, `¡Cuidado con los zombis! 🧟`, m, rcanal);
  }

  if (/^heroe$/i.test(m.text)) {
    conn.reply(m.chat, `¡Eres mi héroe! 🦸‍♂️`, m, rcanal);
  }

  if (/^villano$/i.test(m.text)) {
    conn.reply(m.chat, `¡Un villano! ¡Atrápalo! 🦹‍♂️`, m, rcanal);
  }

  if (/^galaxia$/i.test(m.text)) {
    conn.reply(m.chat, `¡Explorando las galaxias! 🌌`, m, rcanal);
  }

  if (/^universo$/i.test(m.text)) {
    conn.reply(m.chat, `El universo es infinito y fascinante. 🌠`, m, rcanal);
  }

  if (/^planeta$/i.test(m.text)) {
    conn.reply(m.chat, `¡Nuestro planeta es hermoso! 🌍`, m, rcanal);
  }

  if (/^naturaleza$/i.test(m.text)) {
    conn.reply(m.chat, `¡La naturaleza es asombrosa! 🌳`, m, rcanal);
  }

  return !0;
};

export default handler;

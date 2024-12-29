import fs from 'fs';

const handler = (m) => m;

const respuestas = JSON.parse(fs.readFileSync('./lib/respuestas.json', 'utf-8'));

handler.all = async function (m) {
  const chat = global.db.data.chats[m.chat];
  const texto = m.text.toLowerCase();

  // Comprobar si el chat está bloqueado
  if (chat.isBanned) return;

  let responded = false; // Flag para saber si ya se respondió

  // Respuestas dinámicas desde el JSON
  for (const categoria in respuestas) {
    const { pregunta, respuesta, audio } = respuestas[categoria];

    // Comprobamos si alguna de las preguntas coincide con el texto del mensaje
    for (const p of pregunta) {
      if (texto.includes(p.toLowerCase())) {
        const mensaje = respuesta[Math.floor(Math.random() * respuesta.length)];
        await conn.reply(m.chat, mensaje, m);

        // Si hay un audio, lo enviamos también
        if (audio) {
          await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp3' }, { quoted: m });
        }
        
        responded = true; // Indicamos que ya se respondió
        break; // Salimos del bucle de preguntas
      }
    }

    if (responded) break; // Si ya respondió, salimos del bucle de categorías
  }

  // Si no hay ninguna coincidencia, respondemos con un mensaje por defecto
  if (!responded) {
    await conn.reply(
      m.chat,
      "Lo siento, no entendí eso. ¿Puedes intentarlo de otra manera? 🤔",
      m
    );
  }
};

export default handler;

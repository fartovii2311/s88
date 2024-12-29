import fs from 'fs';
const handler = (m) => m;

const respuestas = JSON.parse(fs.readFileSync('./lib/respuestas.json', 'utf-8'));

handler.all = async function (m) {
  const chat = global.db.data.chats[m.chat];
  const texto = m.text.toLowerCase();

  // Comprobar si el chat está bloqueado
  if (chat.isBanned) return;

  // Respuestas dinámicas desde el JSON
  for (const categoria in respuestas) {
    const { pregunta, respuesta, audio } = respuestas[categoria];

    // Comprobar si el texto incluye alguna de las preguntas
    for (const p of pregunta) {
      if (texto.includes(p.toLowerCase())) {
        const mensaje = respuesta[Math.floor(Math.random() * respuesta.length)];
        conn.reply(m.chat, mensaje, m);

        // Enviar audio si está definido
        if (audio) {
          conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp3' }, { quoted: m });
        }
        return;
      }
    }
  }

  // Respuesta predeterminada si no hay coincidencias
  conn.reply(
    m.chat,
    "Lo siento, no entendí eso. ¿Puedes intentarlo de otra manera? 🤔",
    m
  );
};

export default handler;


import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return await conn.reply(
      m.chat, 
      `❌ *El comando necesita una descripción para generar una respuesta.*\n\n*✧ Ejemplo:*\n${usedPrefix + command} ¿Qué día es hoy?`, 
      m
    );
  }
  try {
    let response = await fetch(`https://delirius-apiofc.vercel.app/ia/bingia?query=${encodeURIComponent(text)}`);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    let json = await response.json();
    if (json && json.status && json.data) {
      await conn.reply(m.chat, json.data, m); // Enviar solo el campo `data`
    } else {
      await conn.reply(m.chat, "⚠️ No se pudo obtener una respuesta válida de la API.", m);
    }
  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, "❌ Ocurrió un error al procesar tu solicitud.", m);
  }
};

handler.help = ['bing *<texto>*'];
handler.tags = ['ai'];
handler.command = /^(bing|Bing|BING)$/i;
handler.register = true;

export default handler;

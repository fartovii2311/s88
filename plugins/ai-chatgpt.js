import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let response = await fetch(`https://delirius-apiofc.vercel.app/ia/chatgpt?q=${encodeURIComponent(text)}`);
    if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
    
    let json = await response.json();
    if (json && json.status && json.data) {
      await conn.reply(m.chat, json.data, m);
    } else {
      await conn.reply(m.chat, "No se pudo obtener una respuesta válida de la API.", m);
    }
  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, "Ocurrió un error al procesar tu solicitud.", m);
  }
};

export default handler;



import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `☁️ Ingresa un link de YouTube`, m);
  }
  await m.react('🕓');

  let apiUrl1 = `https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`;
  let apiUrl2 = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${text}`;
  let downloadUrl = null;
  let title = "Archivo de YouTube";

  try {
    const response1 = await fetch(apiUrl1);
    if (!response1.ok) throw new Error("Error en la segunda API");

    const json1 = await response1.json();
    if (json1.status && json1.result && json1.result.download && json1.result.download.url) {
      title = json1.result.metadata.title || "Archivo MP3";
      downloadUrl = json1.result.download.url;
    } else {
      throw new Error("Datos inválidos de la segunda API");
    }
  } catch (error) {
    console.log("Error en la segunda API:", error);
    try {
      const response2 = await fetch(apiUrl2);
      if (!response2.ok) throw new Error("Error en la primera API");

      const json2 = await response2.json();
      if (json2.status && json2.data.download && json2.data.download.url) {
        title = json2.data.download.filename || "Archivo MP3";
        downloadUrl = json2.data.download.url;
      } else {
        console.log("Datos inválidos de la primera API");
      }
    } catch (error2) {
      console.log("Error en la primera API:", error2);
      await m.react('❌');
      return conn.reply(m.chat, `⚠️ Hubo un problema al procesar tu solicitud. Por favor, verifica el enlace o intenta de nuevo más tarde.`, m);
    }
  }

  if (downloadUrl) {
    await m.react('✅');
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: downloadUrl },
        fileName: `${title}.mp3`,
        mimetype: 'audio/mpeg',
      },
      { quoted: m }
    );
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];

export default handler;

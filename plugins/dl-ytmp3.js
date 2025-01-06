import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `☁️ Ingresa un link de YouTube`, m);
  }
  await m.react('🕓');

  let apiUrl1 = `https://axeel.my.id/api/download/audio?url=${text}`;
  let apiUrl2 = `https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`;
  let apiUrl3 = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${text}`;
  let downloadUrl = null;
  let title = "Archivo de YouTube";

  try {
    const response1 = await fetch(apiUrl1);
    const json1 = await response1.json();
    if (json1.metadata && json1.metadata.url) {
      title = json1.metadata.title || "Archivo MP3";
      downloadUrl = json1.metadata.url;
    } else {
      console.log("Datos inválidos de la API de Axeel");
    }
  } catch (error) {
    console.log("Error en la API de Axeel:", error);
    try {
      const response2 = await fetch(apiUrl2);
      const json2 = await response2.json();
      if (json2.status && json2.result && json2.result.download && json2.result.download.url) {
        title = json2.result.metadata.title || "Archivo MP3";
        downloadUrl = json2.result.download.url;
      } else {
        console.log("Datos inválidos de la segunda API");
      }
    } catch (error2) {
      console.log("Error en la segunda API:", error2);
      try {
        const response3 = await fetch(apiUrl3);

        const json3 = await response3.json();
        if (json3.status && json3.data.download && json3.data.download.url) {
          title = json3.data.download.filename || "Archivo MP3";
          downloadUrl = json3.data.download.url;
        } else {
          console.log("Datos inválidos de la tercera API");
        }
      } catch (error3) {
        console.log("Error en la tercera API:", error3);
        await m.react('❌');
        return conn.reply(
          m.chat,
          `⚠️ Hubo un problema al procesar tu solicitud. Por favor, verifica el enlace o intenta de nuevo más tarde.`,
          m
        );
      }
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

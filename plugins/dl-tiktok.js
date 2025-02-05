import fetch from 'node-fetch';

async function tiktokdl(url) {
  try {
    let tikwm = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    let response = await (await fetch(tikwm)).json();

    if (response.code === 0 && response.data) {
      let videoResponse = await fetch(response.data.play);
      if (!videoResponse.ok) throw new Error("Error en el video de TikWM");

      return {
        buffer: await videoResponse.buffer(),
        source: "tikwm"
      };
    }
  } catch (err) {
    console.log("TikWM falló, probando Dark-Core API...");
  }

  try {
    let api2 = `https://dark-core-api.vercel.app/api/download/tiktok?key=api&url=${encodeURIComponent(url)}`;
    let response = await (await fetch(api2)).json();

    if (response.success && response.result.mp4) {
      let videoResponse = await fetch(response.result.mp4);
      if (!videoResponse.ok) throw new Error("Error en el video de Dark-Core");

      return {
        buffer: await videoResponse.buffer(),
        source: "dark-core"
      };
    }
  } catch (err) {
    console.log("Dark-Core API también falló.");
  }

  return null;
}

let handler = async (m, { conn, args }) => {
  let url = args[0];

  if (!url) {
    return conn.reply(m.chat,"[ ᰔᩚ ] Ingresa una URL válida de *TikTok*."m,fake,rcanal);
  }

  try {
    const videoData = await tiktokdl(url);

    if (videoData) {
      let mensaje = `✅ *Descarga de TikTok completada* \n📌 *Fuente:* ${videoData.source.toUpperCase()}`;
      await conn.sendFile(m.chat, videoData.buffer, 'video.mp4', mensaje, m);
      await m.react('✅');
    } else {
      m.reply("❌ *No se pudo descargar el video.*");
    }
  } catch (err) {
    console.error(err);
    m.reply("❌ *Hubo un error al obtener el video.*");
  }
};

handler.help = ['tiktok *<url>*'];
handler.tags = ['dl'];
handler.command = /^(tiktok)$/i;
handler.register = true;
handler.Monedas = 1;

export default handler;

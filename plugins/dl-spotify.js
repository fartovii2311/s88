import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text || !text.startsWith('http')) {
    return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa una URL válida de *Spotify*.', m);
  }

  await m.react('🕓');

  try {
    let apiURL = `https://delirius-apiofc.vercel.app/download/spotifydlv3?url=${encodeURIComponent(text)}`;
    let apiDL = await fetch(apiURL);
    let jsonDL = await apiDL.json();

    if (jsonDL && jsonDL.status && jsonDL.data) {
      let { title, image, url: musicUrl } = jsonDL.data;

      let externalAdReply = {
        title: title,
        thumbnailUrl: image,
        mediaType: 1,
        mediaUrl: musicUrl,
        sourceUrl: musicUrl
      };

      await conn.sendMessage(m.chat, {
        audio: { url: musicUrl },
        mimetype: 'audio/mp4',
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply
        }
      }, { quoted: m });

      await m.react('✅');
    } else {
      const response = await fetch(`https://api.vreden.web.id/api/spotify?url=${encodeURIComponent(text)}`);
      const result = await response.json();

      if (result.status === 200 && result.result?.status) {
        const { title, artists, cover, music } = result.result;

        let externalAdReply = {
          title: title,
          thumbnailUrl: cover,
          mediaType: 1,
          mediaUrl: music,
          sourceUrl: music
        };

        await conn.sendMessage(m.chat, {
          audio: { url: music },
          mimetype: 'audio/mp4',
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply
          }
        }, { quoted: m });

        await m.react('✅');
      } else {
        await m.react('❌');
      }
    }
  } catch (error) {
    console.error(error);
    await m.react('❌');
  }
};

handler.command = /^(spotify|sp|Spotify)$/i;
handler.tags = ["dl"];
handler.register = true;
handler.Monedas = 1;
export default handler;

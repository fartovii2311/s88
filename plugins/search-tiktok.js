import axios from 'axios';
import { generateWAMessage, proto } from '@whiskeysockets/baileys';

let handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(message.chat, "❕️ *¿QUÉ BÚSQUEDA DESEA REALIZAR EN TIKTOK?*", message);
  }

  await message.react('🕓');

  async function createVideoMessage(url) {
    console.log('URL del video:', url); // Verifica la URL
    const videoMessage = await generateWAMessage(message.chat, {
      video: { url },
      caption: '🎥 Video de TikTok'
    }, { upload: conn.waUploadToServer });

    return videoMessage.message;
  }

  try {
    let results = [];
    let { data } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${text}`);
    console.log('Datos de la API:', data);

    let searchResults = data.data.slice(0, 7);

    if (searchResults.length === 0) {
      console.log('No se encontraron resultados');
      return conn.reply(message.chat, "⚠️ No se encontraron resultados en TikTok.", message);
    }

    const videoMessages = await Promise.all(searchResults.map(async (result) => {
      const videoMessage = await createVideoMessage(result.nowm);
      return {
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "DARK CORE" }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: result.title,
          hasMediaAttachment: true,
          videoMessage: videoMessage.video
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] }),
      };
    }));

    const messageContent = generateWAMessage(message.chat, {
      interactiveMessage: proto.Message.InteractiveMessage.fromObject({
        body: proto.Message.InteractiveMessage.Body.create({
          text: "✨️ RESULTADO DE: " + text
        }),
        footer: proto.Message.InteractiveMessage.Footer.create({
          text: "DARK CORE"
        }),
        header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false
        }),
        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
          cards: videoMessages
        })
      })
    }, { quoted: message });

    await conn.relayMessage(message.chat, messageContent.message, { messageId: messageContent.key.id });
    await message.react('✅');
  } catch (error) {
    console.error('Error:', error);
    conn.reply(message.chat, `❌️ *OCURRIÓ UN ERROR:* ${error.message}`, message);
  }
};

handler.help = ["tiktoksearch <txt>"];
handler.register = true;
handler.tags = ["search"];
handler.command = ["tiktoksearch", "ttss", "tiktoks"];
handler.Monedas = 3;

export default handler;

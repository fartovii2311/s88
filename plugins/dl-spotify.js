import axios from 'axios';

let delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn, args }) => {
  if (!args || !args[0]) return conn.reply(m.chat, '*\`Ingresa El link Del audio a descargar 🤍\`*', m, fake);
  
  await m.react('🕓'); // React with clock emoji while processing

  try {
    let api = await axios.get(`https://deliriussapi-oficial.vercel.app/download/spotifydlv3?url=${encodeURIComponent(args[0])}`);
    let json = api.data;

    if (json.status) {
      let { title, author, image, url } = json.data; // Use correct response structure

      // Fetch the audio file
      let audioGet = await axios.get(url, { responseType: 'arraybuffer' });
      let audio = audioGet.data;

      let text = `*\`【 S P O T I F Y - D L 】\`*

> *\`TÍTULO:\`* ${title}
> *\`ARTISTA:\`* ${author}
> *\`IMAGEN:\`* ${image}

> ©️ `;

      await m.react('✅'); // React with checkmark when successful
      await conn.sendFile(m.chat, image, `image.jpeg`, text, m, null, fake); // Send the image and details
      await conn.sendMessage(m.chat, {
        audio: audio,
        mimetype: 'audio/mp4',
        fileName: `${title}.mp3`,
        caption: ` `
      }, { quoted: m }); // Send the audio file
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // React with cross emoji if an error occurs
    m.reply('Hubo un error al intentar descargar el contenido de Spotify.');
  }
};

handler.command = /^(spotify)$/i;

export default handler;

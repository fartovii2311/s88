import axios from 'axios';

let delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn, args }) => {
  if (!args || !args[0]) return conn.reply(m.chat, '*\`Ingresa el link del audio a descargar 🤍\`*', m);

  await m.react('🕓'); // React con emoji de reloj mientras procesa

  try {
    // Realiza la solicitud a la API con la nueva URL
    let api = await axios.get(`https://deliriussapi-oficial.vercel.app/download/spotifydl?url=${encodeURIComponent(args[0])}`);
    let json = api.data;

    if (json.status) {
      let { title, author, image, cover, url } = json.data; // Estructura correcta de la respuesta

      // Descarga el archivo de audio
      let audioGet = await axios.get(url, { responseType: 'arraybuffer' });
      let audio = audioGet.data;

      // Mensaje de texto que incluye detalles de la canción
      let text = `*\`【 S P O T I F Y - D L 】\`*

> *\`TÍTULO:\`* ${title}
> *\`ARTISTA:\`* ${author}`;

      await m.react('✅'); // React con checkmark cuando es exitoso
      await conn.sendFile(m.chat, cover, `cover.jpeg`, text, m); // Envía la imagen del cover y detalles
      await conn.sendMessage(m.chat, {
        audio: audio,
        mimetype: 'audio/mp4',
        fileName: `Ayo.mp3`,  // Se cambia el nombre del archivo a "Ayo"
        caption: ``
      }, { quoted: m }); // Envía el archivo de audio
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // React con emoji de cruz si ocurre un error
    m.reply('Hubo un error al intentar descargar el contenido de Spotify.');
  }
};

handler.command = /^(spotify)$/i;

export default handler;

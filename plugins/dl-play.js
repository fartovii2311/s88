// [ ❀ PLAY ]
import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, text, args }) => {
  if (!text) return conn.reply(m.chat '❀ Ingresa un texto de lo que quieres buscar',m,rcanal,fake);
  

  await m.react('🕓'); 

  try {
    let ytres = await search(args.join(" "));
    let txt = `- Título: ${ytres[0].title}
- Duración: ${ytres[0].timestamp}
- Publicado: ${ytres[0].ago}
- Canal: ${ytres[0].author.name || 'Desconocido'}
- Url: ${'https://youtu.be/' + ytres[0].videoId}`;

    await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', txt,m,rcanal,fake);
    
    let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${ytres[0].url}`);
    let json = await api.json();
    let { quality, title, download_url } = json.result;

    await conn.sendMessage(m.chat, { 
      audio: { url: download_url }, 
      fileName: `${title}.mp3`, 
      mimetype: 'audio/mp4' 
    }, { quoted: m });

    await m.react('✅');  // Reacción de éxito
  } catch (error) {
    console.error('Error al obtener el MP3:', error);
    m.reply('❀ Ocurrió un error al intentar obtener el MP3. Intenta nuevamente.');
    await m.react('❌');  // Reacción de error
  }
};

handler.help = ["play *<texto>*"]
handler.tags = ['dl'];
handler.corazones = 2;
handler.command = /^(play)$/i;
handler.register = true;
export default handler;

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return search.videos;
}

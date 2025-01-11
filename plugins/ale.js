import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
    const apiUrl = 'https://source.unsplash.com/random/800x600';
    
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`Error al obtener la imagen: ${res.statusText}`);
      const imageUrl = res.url;

      await conn.sendFile(m.chat, imageUrl, 'imagen.jpg', 'Aquí tienes una imagen aleatoria:', m);
    } catch (e) {
      console.error(e);
      await m.reply('Hubo un error al intentar obtener una imagen.');
    }
  };
  
  handler.command = ['imagenrandom', 'randomimage'];
  
  export default handler;

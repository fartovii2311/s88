import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `*🌸 Ingresa un texto para generar tu imagen a tu gusto*`;
  m.react('🪷');
  await conn.reply(m.chat, '*🌺 Espere, Estamos Trabajando en su imagen*', m);
  
  try {
    
    const response = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);
    
    if (!response.ok) throw new Error('Network response was not ok');
   
    const buffer = await response.buffer();
    // Mostramos un emoji de éxito
    m.react('✔️');
    
    
    const thumbBuffer = fs.readFileSync('/ruta/a/la/imagen/pequena.jpg'); // Cambiar por la ruta donde esté almacenada la imagen
    await conn.sendFile(m.chat, buffer, 'imagen.jpg', '¡Aquí está tu imagen generada! 🎨', m, false, {
      thumbnail: thumbBuffer
    });
  } catch (error) {
    console.error(error);
    throw `*🚨 Lo sentimos, ha ocurrido un error 😔*`;
  }
}

handler.tags = ['tools'];
handler.help = ['genearimg'];
handler.command = ['genearimg', 'imgg'];
handler.Monedas = 1;
export default handler;
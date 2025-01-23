import fetch from 'node-fetch';
import Jimp from 'jimp';

const handler = async (m, { conn, text }) => {
  if (!text) throw '*🌸 Ingresa un texto para generar tu imagen a tu gusto*';
  m.react('🪷');
  await conn.reply(m.chat, '*🌺 Espere, Estamos Trabajando en su imagen*', m);

  try {
    const response = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);
    if (!response.ok) throw new Error('Network response was not ok');

    const buffer = await response.buffer();
    const mainImage = await Jimp.read(buffer);
    const watermark = await Jimp.read('/mnt/data/file-JgYMG1XBibWfXjyvceirRs');

    watermark.resize(100, 100);
    const x = mainImage.bitmap.width - watermark.bitmap.width - 10;
    const y = mainImage.bitmap.height - watermark.bitmap.height - 10;
    mainImage.composite(watermark, x, y, { mode: Jimp.BLEND_SOURCE_OVER, opacitySource: 0.8 });

    const finalBuffer = await mainImage.getBufferAsync(Jimp.MIME_JPEG);

    m.react('✔️');
    await conn.sendFile(m.chat, finalBuffer, 'imagen.jpg', '🌸 Imagen generada con éxito', m);
  } catch (error) {
    console.error(error);
    throw '*🚨 Lo sentimos, ha ocurrido un error 😔*';
  }
};
const thumbBuffer = fs.readFileSync('https://files.catbox.moe/ohla62.png'); 
 
handler.tags = ['tools'];
handler.help = ['genearimg'];
handler.command = ['genearimg', 'imgg'];
handler.Monedas = 1;

export default handler;
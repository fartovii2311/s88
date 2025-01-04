import { Sticker } from 'wa-sticker-formatter';

let handler = async (m, { conn, args }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  if (!/image|video/.test(mime)) {
    return m.reply('✧ Responde a una imagen o video para convertirlo en sticker.');
  }

  let media = await q.download?.();
  if (!media) return m.reply('No se pudo descargar el archivo.');

  try {
    const sticker = new Sticker(media, {
      pack: 'TuPaquete',
      author: 'TuNombre',
      type: 'full',
      quality: 80
    });

    const buffer = await sticker.toBuffer();
    await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m);
  } catch (e) {
    console.error(e);
    m.reply('Hubo un error al generar el sticker.');
  }
};

handler.help = ['sticker'];
handler.tags = ['sticker'];
handler.command = ['sticker', 's', 'stiker'];

export default handler;

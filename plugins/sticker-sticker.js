import { Sticker } from 'wa-sticker-formatter';

let handler = async (m, { conn }) => {
  try {
    // Obtener el mensaje citado o el mensaje actual
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    // Verificar que el mensaje contenga imagen o video
    if (!/image|video/.test(mime)) {
      return m.reply('✧ Responde a una imagen o video para convertirlo en sticker.');
    }

    // Descargar el archivo multimedia
    let media = await q.download?.();
    if (!media) return m.reply('No se pudo descargar el archivo.');

    // Crear el sticker y obtener el buffer
    const sticker = new Sticker(media, {
      pack: 'Mi Paquete',     // Nombre del paquete
      author: 'Mi Nombre',   // Autor
      type: 'full',          // Tipo: 'crop' o 'full'
      quality: 80,           // Calidad (0-100)
    });

    const buffer = await sticker.toBuffer();  // Asegurarse de que toBuffer() esté disponible

    // Enviar el sticker
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

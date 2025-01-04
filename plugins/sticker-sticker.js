import { Sticker } from 'wa-sticker-formatter';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

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

    // Crear el sticker
    const sticker = new Sticker(media, {
      pack: 'Mi Paquete',      // Nombre del paquete
      author: 'Mi Nombre',    // Autor
      type: 'full',           // Tipo: 'crop' o 'full'
      quality: 80,            // Calidad (0-100)
    });

    // Generar el sticker en formato WebP y obtener el buffer
    const buffer = await sticker.toBuffer();  // Usar 'toBuffer' para obtener el sticker

    // Guardar el sticker como un archivo WebP
    const outputPath = path.join(__dirname, 'sticker.webp');
    fs.writeFileSync(outputPath, buffer);

    // Enviar el sticker
    await conn.sendFile(m.chat, outputPath, 'sticker.webp', '', m);

    // Eliminar el archivo después de enviarlo
    fs.unlinkSync(outputPath);

  } catch (e) {
    console.error(e);
    m.reply('Hubo un error al generar el sticker.');
  }
};

handler.help = ['sticker'];
handler.tags = ['sticker'];
handler.command = ['sticker', 's', 'stiker'];

export default handler;

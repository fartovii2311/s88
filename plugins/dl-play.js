import { igdl } from '../lib/youtube.js';  // Importamos la función igdl
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '❀ Ingresa la URL del contenido de Instagram que quieres descargar', m);

  try {
    // Llamamos a la función igdl para obtener los datos de la URL de Instagram
    let data = await igdl(text);

    // Verificamos si la respuesta tiene enlaces de descarga
    if (!data || !data.url || data.url.length === 0) {
      return conn.reply(m.chat, '❀ Descarga fallida :(', m);
    }

    // Enviar los enlaces de descarga encontrados
    let resultMessage = `❀ Resultados encontrados para la URL proporcionada: ${data.result_count} enlaces disponibles.`;
    
    await conn.reply(m.chat, resultMessage, m);

    // Enviar los enlaces de descarga disponibles
    data.url.forEach(async (link, index) => {
      await conn.sendMessage(m.chat, {
        text: `Enlace ${index + 1}: ${link}`,  // Enviar cada enlace encontrado
      }, { quoted: m });
    });

  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, '❀ Ocurrió un error al procesar la solicitud :(', m);
  }
};

handler.command = ['igdl'];

export default handler;

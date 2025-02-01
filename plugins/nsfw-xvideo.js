import fetch from 'node-fetch';
import fs from 'fs';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const handler = async (m, { conn, text }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m);
  }

  await m.react('🕓');
  
  if (!text) throw 'Proporcióname un enlace de video para descargar.';

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/xvideo?key=user1&url=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

      if (data.success && data.results) {
        const videoData = data.results;
        const videoUrl = videoData.VideoUrlHigh;
        const videoTitle = 'Desconocido';
        const videoImage = videoData.ThumbUrl || '';

        // Verifica el tamaño del video (puedes hacer esto con la respuesta del servidor si proporciona información sobre el tamaño)
        const videoResponse = await fetch(videoUrl);
        const videoBuffer = await videoResponse.buffer();
        const videoSize = videoBuffer.length;

        // Limite de tamaño en bytes (ejemplo: 5MB)
        const maxSize = 5 * 1024 * 1024;

        if (videoSize > maxSize) {
          // Crear un archivo .docx
          const doc = new Document({
            sections: [
              {
                properties: {},
                children: [
                  new Paragraph({
                    children: [
                      new TextRun(`🎥 *Título:* ${videoTitle}\n`),
                      new TextRun(`⏱️ *Duración:* Desconocida\n`),
                      new TextRun(`🔗 *Enlace de Video:* ${videoUrl}\n`),
                    ],
                  }),
                ],
              },
            ],
          });

          const docBuffer = await Packer.toBuffer(doc);
          const docPath = './videoDetails.docx';
          fs.writeFileSync(docPath, docBuffer);

          // Enviar el archivo .docx
          await conn.sendMessage(m.chat, {
            document: fs.createReadStream(docPath),
            fileName: 'videoDetails.docx',
            mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            caption: `El archivo de video es demasiado grande, se ha enviado como un archivo de detalles.`,
          }, { quoted: m });

          fs.unlinkSync(docPath); // Eliminar el archivo temporal
        } else {
          // Si el tamaño es menor al límite, enviar el video directamente
          await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: `🎥 *Título:* ${videoTitle}\n⏱️ *Duración:* Desconocida`,
            mimetype: 'video/mp4',
            fileName: `${videoTitle}.mp4`,
            thumbnail: { url: videoImage },
          }, { quoted: m });
        }

        await m.react('✅');
      } else {
        throw new Error('No se encontraron resultados.');
      }
    } else {
      throw new Error('Error al realizar la solicitud.');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['xvideo'];
handler.command = ['xvideo', 'xvideodownload'];
handler.register = true;

export default handler;

import YT from '../lib/scrapers/yt.js';
import fs from 'fs';

let handler = async (m, { conn, args }) => {
    try {
        if (!args[0]) {
            return m.reply('❌ Por favor, proporciona un enlace de YouTube válido.');
        }
        const url = args[0];
        if (!YT.isYTUrl(url)) {
            return m.reply('❌ El enlace proporcionado no es válido o no pertenece a YouTube.');
        }

        m.reply('⏳ Descargando y procesando el audio... Esto puede tardar unos minutos.');

        // Descargar el audio y convertirlo a MP3
        const result = await YT.mp3(url, {}, true);

        // Enviar información del archivo antes de enviarlo
        await conn.sendMessage(m.chat, {
            image: { url: result.meta.image },
            caption: `🎵 *Título:* ${result.meta.title}\n📡 *Canal:* ${result.meta.channel}\n⏳ *Duración:* ${(result.meta.seconds / 60).toFixed(2)} minutos\n📥 *Tamaño:* ${(result.size / 1024 / 1024).toFixed(2)} MB`,
        });

        // Enviar el archivo MP3
        await conn.sendMessage(m.chat, {
            document: { url: result.path },
            mimetype: 'audio/mpeg',
            fileName: `${result.meta.title}.mp3`,
        });

        // Eliminar el archivo temporal
        fs.unlinkSync(result.path);
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al procesar tu solicitud. Inténtalo nuevamente más tarde.');
    }
};

handler.help = ['mp3 <url>'];
handler.tags = ['downloader'];
handler.command = /^(mp3|ytmp3|descargamp3)$/i;

export default handler;

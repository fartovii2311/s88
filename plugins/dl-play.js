import fs from 'fs';
import YT  from '../plugins/dl-scraper';  // Asegúrate de que la clase YT esté correctamente exportada
import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
    try {
        let url;

        // Verifica si el usuario proporcionó un término de búsqueda o URL
        if (!args[0]) {
            return m.reply('❌ Por favor, proporciona un enlace de YouTube válido o un término de búsqueda.');
        }

        // Verifica si el primer argumento es un URL de YouTube
        if (YT.isYTUrl(args[0])) {
            url = args[0];
        } else {
            m.reply('⏳ Buscando en YouTube...');
            const searchResult = await YT.search(args.join(' '));  // Realiza la búsqueda en YouTube
            if (!searchResult) {
                return m.reply('❌ No se encontraron resultados para tu búsqueda.');
            }
            url = searchResult.url;  // Usa el URL del primer resultado de la búsqueda
        }

        m.reply('⏳ Descargando y procesando el audio... Esto puede tardar unos minutos.');

        // Descarga el MP3 usando la función mp3 de la clase YT
        const result = await YT.mp3(url, {}, true);
        if (!result || !result.path) {
            return m.reply('❌ No se pudo descargar el audio, intenta con otro enlace.');
        }

        // Enviar una imagen con los metadatos del video
        await conn.sendMessage(m.chat, {
            image: { url: result.meta.image },
            caption: `🎵 *Título:* ${result.meta.title}\n📡 *Canal:* ${result.meta.channel}\n⏳ *Duración:* ${(result.meta.seconds / 60).toFixed(2)} minutos\n📥 *Tamaño:* ${(result.size / 1024 / 1024).toFixed(2)} MB`,
        });

        // Enviar el archivo de audio MP3
        await conn.sendMessage(m.chat, {
            document: { url: result.path },
            mimetype: 'audio/mpeg',
            fileName: `${result.meta.title}.mp3`,
        });

        // Eliminar el archivo temporal después de enviarlo
        setTimeout(() => {
            try {
                fs.unlinkSync(result.path);  // Eliminar el archivo temporal
            } catch (error) {
                console.error(`No se pudo eliminar el archivo temporal: ${result.path}`, error);
            }
        }, 5000); // Espera de 5 segundos antes de eliminar el archivo

    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al procesar tu solicitud. Inténtalo nuevamente más tarde.');
    }
};

handler.help = ['play <url|texto>'];
handler.tags = ['downloader'];
handler.command = /^(play)$/i;

export default handler;

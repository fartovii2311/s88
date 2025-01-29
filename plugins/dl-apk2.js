import axios from 'axios';
import cheerio from 'cheerio';

async function dlapkdirect(pageUrl) {
    try {
        const response = await axios.get(pageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            }
        });

        const $ = cheerio.load(response.data);

        const downloadLink = $('a.download-btn').attr('href');
        let appImage = $('img.app-img').attr('src') || $('img.app-img').attr('data-lazy-src');
        const appTitle = $('h1.entry-title').text().trim();
        const appVersion = $('span.appver').text().trim();

        // Verifica si la imagen obtenida es un `data URL`, si lo es, asigna una imagen por defecto
        if (appImage && appImage.startsWith('data:image')) {
            appImage = 'https://via.placeholder.com/160';  // Imagen por defecto
        }

        if (downloadLink && appImage && appTitle && appVersion) {
            return {
                downloadLink,
                appImage,
                appTitle,
                appVersion
            };
        } else {
            throw new Error('Datos de la aplicación no encontrados');
        }
    } catch (error) {
        console.error('Error al obtener los detalles de la descarga:', error.message);
        throw new Error('Error al procesar la página de detalles del APK');
    }
}

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return await m.reply('⚠️ Debes proporcionar la URL de la página del APK.');
    }

    const pageUrl = args[0];

    try {
        const apkData = await dlapkdirect(pageUrl);

        const message = `
📱 *Título:* ${apkData.appTitle}
📌 *Versión:* ${apkData.appVersion}
📥 *Descargar:* [Click aquí](${apkData.downloadLink})
        `.trim();

        await conn.sendMessage(m.chat, { image: { url: apkData.appImage }, caption: message }, { quoted: m });
    } catch (error) {
        await m.reply(`❌ Error: ${error.message}`);
    }
};

handler.command = ['apkdirect'];
handler.help = ['apkdirect <url>'];
handler.tags = ['dl'];

export default handler;

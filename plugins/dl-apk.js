import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import https from 'https'; // Para descargar archivos desde una URL

// Función para buscar APKs
export async function apkdirect(query) {
    try {
        const response = await axios.get(`https://www.apkdirect.io/?s=${encodeURIComponent(query)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            }
        });

        const $ = cheerio.load(response.data);

        const results = [];
        $('.flex-container .flex-item').each((i, el) => {
            const title = $(el).find('.card-title').text().trim();
            const imageUrl = $(el).find('.card-img img').attr('src');
            const link = $(el).find('a').attr('href');
            const fullLink = link ? `${link}download` : null;
            const description = $(el).find('.post-content span').text().trim();

            if (title && imageUrl && fullLink) {
                results.push({ title, imageUrl, link: fullLink, description });
            }
        });

        return results;
    } catch (error) {
        console.error('Error en apkdirect:', error);
        throw new Error('Error al obtener los datos de APK');
    }
}

// Función para obtener detalles de la descarga del APK
export async function dlapkdirect(pageUrl) {
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
        const appImage = $('div.download-title-block img.app-img').attr('src');
        const appTitle = $('h1.entry-title').text().trim();
        const appVersion = $('span.appver').text().trim();

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

// Función para descargar el archivo APK
export async function downloadAPK(downloadUrl, filename) {
    try {
        const writer = fs.createWriteStream(path.resolve(__dirname, filename));
        https.get(downloadUrl, (response) => {
            response.pipe(writer);
            writer.on('finish', () => {
                console.log(`Archivo descargado como ${filename}`);
            });
        });
    } catch (error) {
        console.error('Error al descargar el APK:', error);
        throw new Error('Error al intentar descargar el archivo');
    }
}

// Manejador del comando
export let handler = async (m, { text, args, command, conn, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, 'Por favor, proporciona el nombre del APK que deseas buscar.', m);

    try {
        const results = await apkdirect(text);
        if (results.length === 0) {
            return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
        }

        let message = 'Resultados encontrados:\n\n';
        results.forEach((result, index) => {
            message += `*${index + 1}. ${result.title}*\n`;
            message += `Descripción: ${result.description}\n`;
            message += `Descargar: ${result.link}\n\n`;
        });

        conn.reply(m.chat, message, m);
        const downloadDetails = await dlapkdirect(results[0].link);
        await downloadAPK(downloadDetails.downloadLink, `${downloadDetails.appTitle}.apk`);
        conn.reply(m.chat, `¡El APK de ${downloadDetails.appTitle} se ha descargado exitosamente!`, m);

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Hubo un error al obtener los resultados o al descargar el APK. Intenta de nuevo más tarde.', m);
    }
};

handler.help = ['apk2 *<nombre>*'];
handler.tags = ['dl'];
handler.command = /^(apk2)$/i;
handler.register = true;
handler.Monedas = 1;

export default handler;

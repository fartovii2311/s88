import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

async function dlapkdirect(pageUrl) {
    try {
        const response = await axios.get(pageUrl, {
            const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0',  // Opcional, controla el cache
    'TE': 'Trailers'  // Opcional, relacionado con transferencias de datos
};

        });

        const $ = cheerio.load(response.data);

        const downloadLink = $('a.download-btn').attr('href');

        if (downloadLink) {
            return downloadLink;
        } else {
            throw new Error('No se encontró el enlace de descarga');
        }
    } catch (error) {
        console.error('Error al obtener el enlace de descarga:', error.message);
        throw new Error('Error al procesar la página del APK');
    }
}

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return await m.reply('⚠️ Debes proporcionar la URL de la página del APK.');
    }

    const pageUrl = args[0];

    try {
        const downloadLink = await dlapkdirect(pageUrl);

        // Descargar el archivo APK
        const response = await axios.get(downloadLink, {
            responseType: 'arraybuffer',
        });

        const apkPath = path.join(__dirname, 'apkfile.xapk');
        fs.writeFileSync(apkPath, response.data);

        // Enviar el archivo descargado
        await conn.sendFile(m.chat, apkPath, 'apkfile.xapk', 'Aquí tienes el APK:', m);

        // Eliminar el archivo después de enviarlo
        fs.unlinkSync(apkPath);
    } catch (error) {
        await m.reply(`❌ Error: ${error.message}`);
    }
};

handler.command = ['apkdirect'];
handler.help = ['apkdirect <url>'];
handler.tags = ['dl'];

export default handler;

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de MediaFire`, m);

    try {
        // Obtener la información del archivo de la API
        let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`);
        let json = await api.json();
        let { filename, type, size, uploaded, ext, mimetype, download: dl_url } = json.data.response;

        // Si el archivo es demasiado grande, lo comprimimos
        const MAX_SIZE = 50 * 1024 * 1024;  // 50MB, puedes cambiar este límite
        if (size > MAX_SIZE) {
            // Crear un archivo temporal con el nombre
            const tempFilePath = path.join(__dirname, 'temp', filename);
            const fileStream = fs.createWriteStream(tempFilePath);

            // Descargar el archivo y guardarlo temporalmente
            const res = await fetch(dl_url);
            res.body.pipe(fileStream);

            fileStream.on('finish', async () => {
                // Comprimir el archivo descargado en un archivo ZIP
                const zipPath = path.join(__dirname, 'temp', `${filename}.zip`);
                const output = fs.createWriteStream(zipPath);
                const archive = archiver('zip', { zlib: { level: 9 } });

                archive.pipe(output);
                archive.file(tempFilePath, { name: filename });
                await archive.finalize();

                // Enviar el archivo comprimido
                await conn.sendFile(m.chat, zipPath, `${filename}.zip`, null, m);
                // Limpiar archivos temporales
                fs.unlinkSync(tempFilePath);
                fs.unlinkSync(zipPath);
            });
        } else {
            // Si el archivo es pequeño, enviarlo como un documento
            await conn.sendFile(m.chat, dl_url, filename, null, m, 'rcanal', false, null, { mimetype: ext, asDocument: true });
        }

        // Información del archivo
        conn.reply(m.chat, `⇏ 𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴\n
        - Titulo: *${filename}*
        - *Tipo*: ${type}
        - *Tamaño*: ${size}
        - *Creado*: ${uploaded}`, m);
        
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❗ Ocurrió un error al procesar el archivo', m);
    }
};

handler.help = ['mediafire'].map(v => v + ' *<url>*');
handler.tags = ['dl', 'premium'];
handler.command = ['mediafire', 'mdfire', 'mf'];

export default handler;

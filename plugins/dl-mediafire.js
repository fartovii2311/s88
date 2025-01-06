import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de MediaFire`, m);

    try {
        let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`);
        let json = await api.json();
        let { filename, type, size, uploaded, ext, mimetype, download: dl_url } = json.data.response;

        const sizeInBytes = parseFloat(size) * 1024 * 1024;

        const MAX_SIZE = 50 * 1024 * 1024;  
        if (sizeInBytes > MAX_SIZE) {
            const tempDir = path.join(__dirname, 'temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }

            const tempFilePath = path.join(tempDir, filename);
            const fileStream = fs.createWriteStream(tempFilePath);

            const res = await fetch(dl_url);
            res.body.pipe(fileStream);

            fileStream.on('finish', async () => {
                const zipPath = path.join(tempDir, `${filename}.zip`);
                const output = fs.createWriteStream(zipPath);
                const archive = archiver('zip', { zlib: { level: 9 } });

                archive.pipe(output);
                archive.file(tempFilePath, { name: filename });
                await archive.finalize();

                await conn.sendFile(m.chat, zipPath, `${filename}.zip`, null, m);
                fs.unlinkSync(tempFilePath);
                fs.unlinkSync(zipPath);
            });
        } else {
            await conn.sendFile(m.chat, dl_url, filename, null, m, 'rcanal', false, null, { mimetype: ext, asDocument: true });
        }

        conn.reply(m.chat, `⇏ 𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴\n
        - Titulo: *${filename}*
        - *Tipo*: ${type}
        - *Tamaño*: ${size} MB
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

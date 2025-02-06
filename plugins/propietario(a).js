let handler = async function (m, { conn, text, usedPrefix }) {
    const isCommand1 = /^(backup|respaldo|copia)$/i.test(command)
    switch (true) {
        case isCommand1:
            const databasePath = './storage/data/database.json';
            const zipPath = './database_backup.zip';

            if (!fs.existsSync(databasePath)) {
                await m.reply('⚠️ El archivo *database.json* no existe.');
                return;
            }

            const credsPath = conn.user.jid !== global.conn.user.jid
                ? `./LynxSession/${conn.user.jid.split`@`[0]}/creds.json`
                : './LynxSession/creds.json';

            if (!fs.existsSync(credsPath)) {
                await m.reply('⚠️ El archivo *creds.json* no existe.');
                return;
            }

            await m.reply(`_*🗂️ Preparando envío de base de datos...*_`);

            try {
                let d = new Date();
                let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' });
                let creds = await fs.readFileSync(credsPath);

                const output = fs.createWriteStream(zipPath);
                const archive = archiver('zip', { zlib: { level: 9 } });

                output.on('close', async () => {
                    console.log(`Archivo .zip creado: ${archive.pointer()} bytes`);
                    await conn.reply(m.sender, `*🗓️ Database:* ${date}`, fkontak);
                    await conn.sendMessage(m.sender, { document: creds, mimetype: 'application/json', fileName: `creds.json` }, { quoted: m });
                    await conn.sendMessage(m.sender, { document: fs.readFileSync(zipPath), mimetype: 'application/zip', fileName: `.database.zip` }, { quoted: m });
                    fs.unlinkSync(zipPath);
                });

                archive.on('error', (err) => {
                    throw err;
                });

                archive.pipe(output);
                archive.directory(databaseFolder, false);
                archive.finalize();
            } catch (e) {
                reportError(e);
            }
            break;
    }
};

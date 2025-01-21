import downloadMP3 from '../lib/ytmp3.js';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '🎁 Por favor, envíame una URL de YouTube válida para descargar el audio.');
    
    try {
        const { path, meta } = await downloadMP3(text);
        conn.reply(m.chat, '🎼 ¡El audio está listo! Enviando...');

        // Envía el audio
        await conn.sendMessage(m.chat, {
            audio: fs.readFileSync(path),
            mimetype: 'audio/mp4',
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: meta.title,
                    body: meta.artist,
                    thumbnail: await fetchBuffer(meta.image),
                    mediaType: 2,
                    mediaUrl: text,
                }
            },
        }, { quoted: m });

        // Elimina el archivo temporal
        fs.unlinkSync(path);
    } catch (error) {
        conn.reply(m.chat, '❀ Hubo un error al procesar el audio.');
    }
};

// Configuración del comando y los tags
handler.help = ['mp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['mp3'];

export default handler;

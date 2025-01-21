let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '🎁 Por favor, envíame una URL de YouTube válida para descargar el audio.');

    const julzinmp3 = require('../lib/ytdl');

    try {
        const audio = await julzinmp3.mp3(text);
        conn.reply(m.chat, '🎼 Espere un momento mientras descargo su audio. No haga spam.');

        await conn.sendMessage(m.chat, {
            audio: fs.readFileSync(audio.path),
            mimetype: 'audio/mp4',
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: audio.meta.title,
                    body: "♡༺::Dark:: ༻♡",
                    thumbnail: await fetchBuffer(audio.meta.image),
                    mediaType: 2,
                    mediaUrl: text,
                }
            },
        }, { quoted: m });

        await fs.unlinkSync(audio.path);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❀ El audio es demasiado pesado o hubo un error al procesar la solicitud.');
    }
};

handler.help = ['mp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['mp3'];

export default handler;

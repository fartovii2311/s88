import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, '*\`Por favor ingresa un término de búsqueda\`*', m);

    await m.react('⏳');
    try {
        let searchResults = await searchVideos(args.join(" "));
        let video = searchResults[0];
        let thumbnail = await (await fetch(video.image)).buffer();

        let messageText = `🌟 *YouTube Reproductor* 🌟\n\n`;
        messageText += `🎬 *Título:* ${video.title}\n`;
        messageText += `⏰ *Duración:* ${formatDuration(video.duration.seconds)}\n`;
        messageText += `👤 *Autor:* ${video.author.name || 'Desconocido'}\n`;
        messageText += `📅 *Publicado:* ${convertTimeToSpanish(video.ago)}\n`;
        messageText += `🔗 *Enlace directo:* https://youtu.be/${video.videoId}\n`;

        await conn.sendButton2(
            m.chat,
            messageText,
            'Bot WhatsApp',
            video.image,
            [
                ['🎶 Descargar MP3', `.ytmp3 https://youtu.be/${video.videoId}`],
                ['📺 Descargar MP4', `.ytmp4 https://youtu.be/${video.videoId}`]
            ], 
            [
                ['🎶 Descargar MP3DOC', `.ytmp3doc https://youtu.be/${video.videoId}`],
                ['📺 Descargar MP4DOC', `.ytmp4doc https://youtu.be/${video.videoId}`]
            ],
            m, 
            {}
        );

        await m.react('✅'); 
    } catch (error) {
        console.error(error);
        await m.react('❌'); 
        conn.reply(m.chat, '*\`Hubo un error al buscar el video.\`*', m);
    }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];

export default handler;

async function searchVideos(query, options = {}) {
    let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return search.videos;
}

function formatDuration(seconds) {
    seconds = Number(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${secondsLeft}s`;
}

function convertTimeToSpanish(timeText) {
    return timeText
        .replace(/year/g, 'año').replace(/years/g, 'años')
        .replace(/month/g, 'mes').replace(/months/g, 'meses')
        .replace(/day/g, 'día').replace(/days/g, 'días')
        .replace(/hour/g, 'hora').replace(/hours/g, 'horas')
        .replace(/minute/g, 'minuto').replace(/minutes/g, 'minutos');
}

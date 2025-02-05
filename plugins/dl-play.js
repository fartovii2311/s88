import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, `*Por favor ingresa un término de búsqueda*`, m);

    await m.react('⏳');
    try {
        let searchResults = await searchVideos(args.join(" "));
        
        if (!searchResults.length) throw new Error('No se encontraron resultados.');

        let video = searchResults.find(v => v.seconds < 3600) || searchResults[0];

        if (!video) throw new Error('No se encontraron videos adecuados.');

        let messageText = `🌟 *YouTube Reproductor* 🌟\n\n`;
        messageText += `🎬 *Título:* ${video.title}\n`;
        messageText += `⏰ *Duración:* ${formatDuration(video.seconds)}\n`;
        messageText += `👤 *Autor:* ${video.author.name || 'Desconocido'}\n`;
        messageText += `📅 *Publicado:* ${convertTimeToSpanish(video.ago)}\n`;
        messageText += `👀 *Vistas:* ${video.views.toLocaleString()}\n`;
        messageText += `🔗 *Enlace directo:* ${video.url}\n`;

        // Usar una imagen por defecto si no hay una disponible
        let image = video.image || 'https://via.placeholder.com/150';

        await conn.sendButton2(
            m.chat,
            messageText,
            'Bot WhatsApp',
            image,
            [
                ['🎶 MP3', `.ytmp3 ${video.url}`],
                ['📺 MP4', `.ytmp4 ${video.url}`],
                ['🎶 MP3DOC', `.ytmp3doc ${video.url}`],
                ['📺 MP4DOC', `.ytmp4doc ${video.url}`]
            ],
            '',
            [], 
            m, 
            {}
        );

        await m.react('✅');
    } catch (error) {
        console.error('Error al buscar el video:', error);
        await m.react('❌');
        conn.reply(m.chat, '*`Hubo un error al buscar el video.`*', m);
    }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];

export default handler;

async function searchVideos(query) {
    try {
        let search = await yts.search({ query, hl: "es", gl: "ES", pages: 5 });
        
        console.log('Detalles de la búsqueda:', search);

        return search.videos
            .filter(v => v.seconds > 0 && v.views) 
            .sort((a, b) => b.views - a.views); 
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        return [];
    }
}

function formatDuration(seconds) {
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

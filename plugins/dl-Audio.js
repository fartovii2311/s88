import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Verificar si el mensaje es una mención
    if (!m.quoted) return; // Si no es un mensaje citado, no hacer nada

    const quotedMessage = m.quoted; // Obtener el mensaje citado

    // Verificar si el mensaje citado contiene un enlace de YouTube
    const urlRegex = /(https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\/videos\/(?:youtube|music))[\w-]+)/;
    const match = quotedMessage.text.match(urlRegex);

    // Si no se encuentra un enlace de YouTube en el mensaje citado, terminar la ejecución
    if (!match) {
        return conn.reply(m.chat, '❀ No se ha encontrado un enlace de YouTube en el mensaje citado.', m);
    }

    // Extraer el enlace de YouTube
    const youtubeUrl = match[0];

    await m.react('🕓');
    try {
        let apiResponse = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${youtubeUrl}`);
        let api = await apiResponse.json();

        if (api.status === true) {
            let dl_url = api.result.download.url;

            conn.sendMessage(m.chat, { 
                audio: { url: dl_url },
                mimetype: "audio/mp3",
                ptt: true
            }, { quoted: m });
            await m.react('✅');
        } else {
            conn.reply(m.chat, '❀ Hubo un error al obtener el enlace de descarga. Intenta nuevamente.', m);
        }
    } catch (error) {
        console.error('Error al obtener el MP3:', error);
        conn.reply(m.chat, '❀ Ocurrió un error al intentar descargar el MP3. Intenta nuevamente más tarde.', m);
    }
}

handler.command = ['ytmp3', 'Audio'];  // Añadir 'Audio' como un comando válido.

export default handler;

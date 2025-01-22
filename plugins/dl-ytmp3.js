import axios from 'axios';

const handler = async (m, { text, conn }) => {
    if (!text) return m.reply('Proporcióname el enlace de YouTube para que pueda ayudarte. 🎵');

    try {
       await m.react('🕓');

        const response = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${text}`);

        if (!response.data || !response.data.metadata) {
            return m.reply('No se pudo obtener los datos del enlace de YouTube. Asegúrate de que el enlace sea correcto. 😕');
        }

        const { dl } = response.data;
        const audioUrl = dl.url;

            await conn.sendMessage(m.chat, { 
                audio: { url: audioUrl }, 
                fileName: `${dl.title}.mp3`, 
                mimetype: 'audio/mp4' 
            }, { quoted: m });

        await m.react('✅');

    } catch (error) {
        await m.react('✖️');
    }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];
export default handler;


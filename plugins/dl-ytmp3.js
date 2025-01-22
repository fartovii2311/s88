import axios from 'axios';

const handler = async (m, { text, conn }) => {
    if (!text) return conn.reply(m.chat,'⚠️ Proporcióname el enlace de YouTube para que pueda ayudarte. 🎵',m,rcanal);

    try {
        await m.react('🕓');

        const response = await axios.get(`https://api.siputzx.my.id/api/dl/youtube/mp3?url=${text}`);
        const data = response.data;

        if (!data || !data.data) return m.reply('❌ No se pudo obtener los datos del enlace de YouTube. Verifica que el enlace sea correcto. 😕');

        const audioUrl = data.data;

        await conn.sendMessage(
            m.chat,
            {
                audio: { url: audioUrl },
                mimetype: 'audio/mp4',
            },
            { quoted: m }
        );

        await m.react('✅');
    } catch (error) {
        await m.react('✖️');
        return m.reply('❌ Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.');
    }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];
export default handler;

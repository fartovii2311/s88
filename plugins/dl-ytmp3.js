import axios from 'axios';

const handler = async (m, { text, conn }) => {
    if (!text) {
        return m.reply('⚠️ Proporcióname el enlace de YouTube para que pueda ayudarte. 🎵');
    }

    try {
        await m.react('🕓'); // Reacción de espera

        // Llamada a la API para obtener los datos
        const response = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${text}`);
        const data = response.data;

        if (!data || !data.data || !data.data.dl) {
            return m.reply('❌ No se pudo obtener los datos del enlace de YouTube. Verifica que el enlace sea correcto. 😕');
        }

        const { title, dl } = data.data; // Extraemos el título y la URL de descarga
        const audioUrl = dl;

        // Enviar audio normal (streaming desde la URL)
        await conn.sendMessage(
            m.chat,
            {
                audio: { url: audioUrl }, // URL del archivo de audio
                fileName: `${title}.mp3`, // Título del archivo
                mimetype: 'audio/mp4',
            },
            { quoted: m } // Mensaje citado
        );

        await m.react('✅'); 
    } catch (error) {
        console.error(error); 
        await m.react('✖️');
        return m.reply('❌ Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.');
    }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3']; // Comando activador
export default handler;

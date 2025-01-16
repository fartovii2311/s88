import axios from 'axios';

const handler = async (m, {conn, text, usedPrefix, command}) => {
    try {
        const response = await axios.get('https://some-random-api.com/animal/cat');
        const imageUrl = response.data.image;

        await conn.sendFile(m.chat, imageUrl, 'gato.jpg', "🐱 *G A T O* 🐱", null, m, rcanal);

    } catch (error) {
        console.error('Error al obtener la imagen del gato:', error);
    }
};

handler.help = ['gato']
handler.tags = ['img']
handler.register = true
handler.command = /^(gato|cat|gatarandom)$/i;

export default handler;

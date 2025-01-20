import axios from 'axios';

const handler = async (m, { conn }) => {
    try {
        const response = await axios.get('https://some-random-api.com/animal/cat');
        const imageUrl = response.data.image;

        await conn.sendMessage(
            m.chat, 
            { 
                image: { url: imageUrl },
                caption: "🐱 *G A T O* 🐱\nAquí tienes una imagen aleatoria de un gato. ¡Espero que te guste!",
                buttons: [
                    { 
                        buttonId: '.gato',
                        buttonText: { displayText: 'Siguiente 🐾' },
                        type: 1
                    }
                ],
                viewOnce: true,
                headerType: 4
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('Error al obtener la imagen del gato:', error);
        await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al intentar obtener la imagen del gato. Inténtalo nuevamente.' }, { quoted: m });
    }
};

handler.help = ['gato'];
handler.tags = ['img'];
handler.register = true;
handler.command = /^(gato|cat|gatarandom)$/i;

export default handler;

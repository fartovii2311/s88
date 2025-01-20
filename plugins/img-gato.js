import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        const response = await axios.get('https://some-random-api.com/animal/cat');
        const imageUrl = response.data.image;

        await conn.sendMessage(
            m.chat, 
            { 
                image: { url: imageUrl },
                caption: "🐱 *G A T O* 🐱\nDisfruta de esta imagen aleatoria de un gato.",
                buttons: [
                    { 
                        buttonId: 'mas_gatos',
                        buttonText: { displayText: 'Otro Gato 🐾' },
                        type: 1,
                    }
                ],
                headerType: 4
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('Error al obtener la imagen del gato:', error);
    }
};

handler.help = ['gato'];
handler.tags = ['img'];
handler.register = true;
handler.command = /^(gato|cat|gatarandom)$/i;

export default handler;

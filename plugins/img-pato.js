import axios from 'axios';

const handler = async (m, { conn }) => {
    try {
        // Hacemos la solicitud para obtener la imagen del pato
        const response = await axios.get('https://random-d.uk/api/randomimg');
        const imageUrl = response.data.url;  // Accede a la URL de la imagen

        // Reacción al mensaje
        await m.react('🕓');
        
        // Enviar la imagen con los botones
        await conn.sendMessage(
            m.chat, 
            { 
                image: { url: imageUrl },  // Enviar la imagen obtenida
                caption: "🦆 *P A T O* 🦆\nAquí tienes una imagen aleatoria de un pato. ¡Espero que te guste!",
                buttons: [
                    { 
                        buttonId: '.pato',  // El ID del botón para la siguiente acción
                        buttonText: { displayText: 'Siguiente 🦆' },  // El texto del botón
                        type: 1  // Tipo de botón
                    }
                ],
                viewOnce: true,  // La imagen será visible solo una vez
                headerType: 4  // Establece el tipo de encabezado para la imagen
            },
            { quoted: m }
        );

        // Reacción exitosa
        await m.react('✅');
    } catch (error) {
        // Si ocurre un error
        await m.react('✖️');
        console.error('Error al obtener la imagen del pato:', error);
        
        // Enviar mensaje de error
        await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al intentar obtener la imagen del pato. Inténtalo nuevamente.' }, { quoted: m });
    }
};

handler.help = ['pato'];
handler.tags = ['img'];
handler.register = true;
handler.command = /^(pato|duck|patorandom)$/i;

export default handler;

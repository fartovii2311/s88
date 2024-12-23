const fs = require('fs');
const respuestas = JSON.parse(fs.readFileSync('./json/chatbot.json', 'utf8'));

handler.all = async function(m) {
    try {
        const texto = m.message.conversation || m.message.extendedTextMessage.text;
        const chatId = m.key.remoteJid;
        const mensaje = texto.toLowerCase();

        // Función para obtener la respuesta del archivo JSON
        function obtenerRespuesta(mensaje) {
            if (respuestas.saludos[mensaje]) {
                return respuestas.saludos[mensaje];
            }
            if (respuestas.despedidas[mensaje]) {
                return respuestas.despedidas[mensaje];
            }
            if (respuestas.preguntas[mensaje]) {
                return respuestas.preguntas[mensaje];
            }
            if (respuestas.chistes[mensaje]) {
                return respuestas.chistes[mensaje];
            }
            return "Lo siento, no entiendo esa pregunta.";
        }

        // Si el mensaje no comienza con .chatbot, no procesar como comando
        if (texto.toLowerCase().startsWith('.chatbot')) {
            const args = texto.slice(9).trim().toLowerCase(); // Remueve ".chatbot" y obtiene el mensaje

            const respuesta = obtenerRespuesta(args);
            await conn.sendMessage(chatId, { text: respuesta }, { quoted: m });
        }

    } catch (err) {
        console.error('Error procesando el mensaje:', err);
    }
};

handler.command = /^\.chatbot$/i; // Comando ".chatbot"
handler.register = true;

export default handler;

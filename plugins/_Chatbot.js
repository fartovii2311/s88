const fs = require('fs');
const respuestas = JSON.parse(fs.readFileSync('respuestas.json', 'utf8'));

handler.all = async function(m) {
    try {
        const texto = m.message.conversation || m.message.extendedTextMessage.text;
        const chatId = m.key.remoteJid;
        const mensaje = texto.toLowerCase();

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

        const respuesta = obtenerRespuesta(mensaje);
        await conn.sendMessage(chatId, { text: respuesta }, { quoted: m });

    } catch (err) {
        console.error('Error procesando el mensaje:', err);
    }
};

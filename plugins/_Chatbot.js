import fs from 'fs';

let respuestas = JSON.parse(fs.readFileSync('./json/chatbot.json', 'utf8'));

let handler = async (m, { conn, args }) => {
    try {
        let texto = m.message.conversation || m.message.extendedTextMessage.text;
        let chatId = m.key.remoteJid;
        let mensaje = texto.toLowerCase();

        console.log('Mensaje recibido:', texto); // Debugging line

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

        if (texto.toLowerCase().startsWith('.chatbot')) {
            let argsTexto = texto.slice(9).trim().toLowerCase();
            let respuesta = obtenerRespuesta(argsTexto);

            console.log('Respuesta a enviar:', respuesta); // Debugging line

            // Use m.reply to send the response
            await m.reply(respuesta);
        }

    } catch (err) {
        console.error('Error procesando el mensaje:', err);
    }
};

handler.command = /^\.chatbot /i;
handler.register = true;

export default handler;

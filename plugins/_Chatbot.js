import fs from 'fs';

let respuestas = JSON.parse(fs.readFileSync('./json/chatbot.json', 'utf8'));

let handler = {};

handler.all = async function(m) {
    try {
        let texto = m.message.conversation || m.message.extendedTextMessage.text;
        let chatId = m.key.remoteJid;
        let mensaje = texto.toLowerCase();

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
            let args = texto.slice(9).trim().toLowerCase();
            let respuesta = obtenerRespuesta(args);

            await conn.sendMessage(chatId, { text: respuesta }, { quoted: m });
        }

    } catch (err) {
        console.error('Error procesando el mensaje:', err);
    }
};

handler.command = /^\.chatbot /i;
handler.register = true;

export default handler;

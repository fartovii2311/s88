import { derivative } from 'mathjs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `[ ᰔᩚ ] Por favor ingresa una función para derivar.\n\nEjemplo:\n` + `> *${usedPrefix + command}* x^2 + 3*x + 2`, m );
    }

    try {
        const expression = args.join(' '); 
        const variable = 'x';
        const result = derivative(expression, variable).toString();

        const respuesta = `[ ᰔᩚ ] ✨ Resultado del Cálculo Diferencial ✨\n\n` +
            `📗 *Función Original:* ${expression}\n` +
            `📘 *Derivada:* ${result}\n` +
            `📊 *Variable:* ${variable}\n\n` +
            `💡 ¡Gracias por usar el comando de cálculo diferencial!`;

        await conn.reply(m.chat, respuesta, m);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat,`❀ Ocurrió un error al procesar tu solicitud.\n\n` + `⚠️ Asegúrate de que la función ingresada sea válida.\n\n` + `📕 Detalles del error:\n${error.message}`, m);
    }
};

handler.help = ['derivar *<función>*'];
handler.tags = ['tools'];
handler.command = /^(derivar|diferencial|derivada)$/i;

export default handler;

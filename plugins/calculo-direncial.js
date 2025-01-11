import { derivative } from 'mathjs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(
            m.chat,
            `[ ᰔᩚ ] Por favor ingresa una función para derivar.\n\nEjemplo:\n` +
            `> *${usedPrefix + command}* x^2 + 3*x + 2`,
            m
        );
    }

    try {
        const expression = args.join(' '); // Unir la función completa ingresada
        const variable = 'x'; // Variable respecto a la cual se deriva
        const result = derivative(expression, variable).toString();

        await conn.reply(m.chat,`[ ᰔᩚ ] La derivada de la función *${expression}* respecto a *${variable}* es:\n\n` +`📘 Resultado: *${result}*`,m);
    } catch (error) {
        console.error(error);
        await conn.reply(
            m.chat,
            `❀ Ocurrió un error al procesar tu solicitud. Asegúrate de que la función ingresada sea válida.\n\n` +
            `⚠️ Detalles: ${error.message}`,
            m
        );
    }
};

handler.help = ['derivar *<función>*'];
handler.tags = ['tools'];
handler.command = /^(derivar|diferencial|derivada)$/i;

export default handler;

import { derivative, evaluate, simplify } from 'mathjs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(
            m.chat,
            `[ ᰔᩚ ] Por favor ingresa una función para derivar.\n\n` +
            `Ejemplo:\n> *${usedPrefix + command}* x^2 + 3*x + 2\n\n` +
            `Opciones avanzadas:\n` +
            `- Derivada de orden superior: *${usedPrefix + command}* x^2 + 3*x + 2 2\n` +
            `- Evaluar en un punto: *${usedPrefix + command}* x^2 + 3*x + 2 @2`,
            m
        );
    }

    try {
        // Unir los argumentos en una sola cadena
        const argsText = args.join(' ');
        const [expression, extra] = argsText.split(/ (?=\d+$|@\d+$)/);
        const variable = 'x';

        // Validación básica: verificar si los paréntesis están balanceados
        const openParentheses = (expression.match(/\(/g) || []).length;
        const closeParentheses = (expression.match(/\)/g) || []).length;

        if (openParentheses !== closeParentheses) {
            throw new Error(
                `❀ Los paréntesis no están balanceados. Asegúrate de que cada '(' tenga un ')' correspondiente.\n\n` +
                `Ejemplos:\n` +
                `- Correcto: sqrt(x^2 - 3)\n` +
                `- Incorrecto: sqrt(x^2 - 3`
            );
        }

        // Derivada de orden (por defecto: 1)
        const order = extra && extra.startsWith('@') ? 1 : parseInt(extra, 10) || 1;

        // Calcular derivada
        const result = derivative(expression, variable, { simplify: true, nth: order }).toString();

        // Evaluar en un punto específico si se incluye '@'
        let evalPoint = null;
        if (extra && extra.startsWith('@')) {
            evalPoint = parseFloat(extra.replace('@', ''));
        }
        const evalResult = evalPoint !== null
            ? evaluate(result.replace(/x/g, `(${evalPoint})`))
            : null;

        // Simplificar la derivada
        const simplified = simplify(result).toString();

        // Construir respuesta
        let respuesta = `[ ᰔᩚ ] ✨ Resultado del Cálculo Diferencial ✨\n\n` +
            `📗 *Función Original:* ${expression}\n` +
            `📘 *Derivada de Orden ${order}:* ${result}\n`;

        if (evalPoint !== null) {
            respuesta += `📙 *Evaluada en x = ${evalPoint}:* ${evalResult}\n`;
        }

        respuesta += `📙 *Forma Simplificada:* ${simplified}\n\n` +
            `💡 ¡Gracias por usar el comando de cálculo diferencial!`;

        // Enviar respuesta
        await conn.reply(m.chat, respuesta, m);

    } catch (error) {
        console.error(error);
        await conn.reply(
            m.chat,
            `❀ Ocurrió un error al procesar tu solicitud.\n\n` +
            `⚠️ Asegúrate de que la función ingresada sea válida.\n\n` +
            `📕 Detalles del error:\n${error.message}`,
            m
        );
    }
};

// Configuración del comando
handler.help = ['derivar *<función>*'];
handler.tags = ['tools'];
handler.command = /^(derivar|diferencial|derivada)$/i;

export default handler;

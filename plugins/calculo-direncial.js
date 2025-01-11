import { derivative, evaluate, simplify } from 'mathjs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(
            m.chat,
            `[ ᰔᩚ ] Por favor ingresa una función para derivar.\n\n` +
            `Ejemplo:\n> *${usedPrefix + command}* x^2 + 3*x + 2\n\n` +
            `Opciones avanzadas:\n` +
            `- Derivada de orden superior: *${usedPrefix + command}* x^2 + 3*x + 2 2\n` +
            `- Evaluar en un punto: *${usedPrefix + command}* f(x)=x^2 + 3*x + 2 @2`,
            m
        );
    }

    try {
        const argsText = args.join(' ');

        // Reemplazo de símbolos especiales
        const processedExpression = argsText
            .replace(/√/g, 'sqrt') // Reemplaza √ por sqrt
            .replace(/\^/g, '**'); // Reemplaza ^ por ** (para potencias en mathjs)

        // Detecta si la entrada es del tipo f(x)=...
        const functionMatch = processedExpression.match(/^f\((.*?)\)\s*=\s*(.+)$/i);
        const variable = functionMatch ? functionMatch[1] : 'x';
        const expression = functionMatch ? functionMatch[2] : processedExpression;

        // Extra: Orden o punto de evaluación
        const [pureExpression, extra] = expression.split(/ (?=\d+$|@\d+$)/);
        const order = extra && extra.startsWith('@') ? 1 : parseInt(extra, 10) || 1;

        // Derivada
        const derived = derivative(pureExpression, variable, { simplify: true, nth: order }).toString();

        // Simplificar
        const simplified = simplify(derived).toString();

        // Evaluación en punto (si se especifica)
        let evalPoint = null;
        let evalResult = null;
        if (extra && extra.startsWith('@')) {
            evalPoint = parseFloat(extra.replace('@', ''));
            evalResult = evaluate(derived.replace(new RegExp(variable, 'g'), `(${evalPoint})`));
        }

        // Respuesta
        let respuesta = `[ ᰔᩚ ] ✨ Resultado del Cálculo Diferencial ✨\n\n` +
            `📗 *Función Original:* ${pureExpression}\n` +
            `📘 *Variable:* ${variable}\n` +
            `📙 *Derivada de Orden ${order}:* ${derived}\n`;

        if (evalPoint !== null) {
            respuesta += `📘 *Evaluada en ${variable} = ${evalPoint}:* ${evalResult}\n`;
        }

        respuesta += `📘 *Forma Simplificada:* ${simplified}\n\n` +
            `💡 ¡Gracias por usar el comando de cálculo diferencial!`;

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

handler.help = ['derivar *<función>*'];
handler.tags = ['tools'];
handler.command = /^(derivar|diferencial|derivada)$/i;

export default handler;

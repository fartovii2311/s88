const translate = require('google-translate-api');

let handler = async (m, { conn, command, args }) => {
    if (!args.length) {
        return conn.reply(m.chat, '🚩 Por favor, ingresa el texto que deseas traducir.', m);
    }

    const targetLanguage = 'es';
    const textToTranslate = args.join(' ');

    try {
        const res = await translate(textToTranslate, { to: targetLanguage });
        conn.reply(m.chat, `🚩 *Traducción:* ${res.text}`, m);
    } catch (error) {
        console.error('Error al traducir:', error);
        conn.reply(m.chat, '🚩 Hubo un error al intentar traducir el texto.', m);
    }
};

handler.command = ['traducir'];

export default handler;

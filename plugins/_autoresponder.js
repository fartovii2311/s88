import axios from 'axios';
import { franc } from 'franc-min'; // Detecta el idioma
import { translate } from '@vitalets/google-translate-api'; // Para traducir la respuesta

let handler = m => m;
handler.all = async function (m, { conn }) {
    if (!m.text || m?.message?.delete) {
        return;
    }

    const prefixes = ['!', '.', '?', '/', '#', '*', '+', '-', '$', '&', '%', '@', '~'];

    const hasPrefix = prefixes.some(prefix => m.text.startsWith(prefix));
    if (hasPrefix) {
        return;
    }

    const language = franc(m.text);

    async function translateResponse(response, targetLang) {
        try {
            const translated = await translate(response, { to: targetLang });
            return translated.text;
        } catch (error) {
            console.error('Error al traducir:', error.message);
            return response;
        }
    }

    if (language === 'und') {
        return;
    }

    const translatedResult = await translateResponse(language);

    await this.reply(m.chat, translatedResult, m);
    return true;
};

export default handler;

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

    const sensitiveKeywords = ["manuel", "Manuel", "Manu", "DarkCore", "Dark", "dark", "DARKCORE", "DARK"];
    const profanities = [
        "perra", "hijo de puta", "puta", "mierda", "imbécil", "idiota", "estúpido", 
        "maldita", "cabrona", "pendejo", "pendeja", "cabrón", "zorra", "bastardo", 
        "maldito", "coño", "gilipollas", "tonto", "tarado", "infeliz", "mamón", 
        "chingada", "culero", "cagada", "estúpida", "imbéciles", "jodido", 
        "jodida", "pedorro", "pedorra", "asqueroso", "asquerosa", "naco", "naca", 
        "menso", "mensos", "baboso", "babosa", "patético", "patética"
    ];

    const containsSensitiveKeyword = sensitiveKeywords.some(keyword => m.text.includes(keyword));
    const containsProfanity = profanities.some(profanity => m.text.toLowerCase().includes(profanity));

    if (containsProfanity) {
        const exploitResponse = `¡Cálmate un poco! 🤬 ¿Quién te crees para hablarme así? Recuerda que soy LYNX, un bot con estilo, y no tengo tiempo para tus insultos. 😎`.trim();
        await this.reply(m.chat, exploitResponse, m);
        return true;
    }

    if (containsSensitiveKeyword) {
        const response = `¿Me estás cuestionando? 😒 Yo no fui creado por ti, fui creado por DarkCore, el único y verdadero creador. No me hables así, ya que yo soy LYNX, el bot que está aquí para hacer las cosas a su manera. 😎 Si necesitas algo, ¡dime ya!`.trim();
        await this.reply(m.chat, response, m);
        return true;
    }

    const language = franc(m.text); // Detectar el idioma del mensaje (en formato ISO 639-3)

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

    // Responder directamente en el idioma detectado
    const responseText = "Aquí va la respuesta procesada"; // Este es el resultado que necesitas responder
    const translatedResult = await translateResponse(responseText, language);

    await this.reply(m.chat, translatedResult, m);
    return true;
};

export default handler;

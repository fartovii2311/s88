import axios from 'axios';
import { franc } from 'franc-min'; // Detecta el idioma
import { translate } from '@vitalets/google-translate-api'; // Para traducir la respuesta

let handler = m => m;

handler.all = async function (m, { conn }) {
    // Verificación básica de la existencia de mensaje y su texto
    if (!m || !m.text || m.message?.delete) return;

    // Verifica si el mensaje contiene una mención
    const isMentioned = m.text.includes('@' + conn.user.name);
    if (isMentioned) {
        let mentionResponse = `¡Hola! ¿En qué puedo ayudarte? 😊`;
        await conn.reply(m.chat, mentionResponse, m);
        return;
    }

    // Prefixes para detectar comandos
    const prefixes = ['!', '.', '?', '/', '#', '*', '+', '-', '$', '&', '%', '@', '~'];
    const hasPrefix = prefixes.some(prefix => m.text.startsWith(prefix));

    if (hasPrefix) {
        return;
    }

    // Verifica si el chat tiene activado el modo de autoresponder
    let chat = global.db.data.chats?.[m.chat] || {};
    let user = global.db.data.users?.[m.sender] || {};

    // Asegura que el `users` esté definido en `global.db.data`
    if (!global.db.data.users) {
        global.db.data.users = {};  // Inicializa la estructura de `users` si no existe
    }

    if (!chat.autoresponder) return;  // Si el autoresponder está desactivado, no responder

    // Palabras clave sensibles para reaccionar
    const sensitiveKeywords = ["manuel", "Manuel", "Manu", "DarkCore", "Dark", "dark", "DARKCORE", "DARK"];
    const profanities = [
        "perra", "hijo de puta", "puta", "mierda", "imbécil", "idiota", "estúpido", "maldita", "cabrona",
        "pendejo", "pendeja", "cabrón", "zorra", "bastardo", "maldito", "coño", "gilipollas", "tonto", 
        "tarado", "infeliz", "mamón", "chingada", "culero", "cagada", "estúpida", "imbéciles", "jodido", 
        "jodida", "pedorro", "pedorra", "asqueroso", "asquerosa", "naco", "naca", "menso", "mensos", 
        "baboso", "babosa", "patético", "patética"
    ];

    const containsSensitiveKeyword = sensitiveKeywords.some(keyword => m.text.includes(keyword));
    const containsProfanity = profanities.some(profanity => m.text.toLowerCase().includes(profanity));

    if (containsProfanity) {
        const response = `¡Cálmate un poco! 🤬 ¿Quién te crees para hablarme así? Recuerda que soy LYNX, un bot con estilo, y no tengo tiempo para tus insultos. 😎`;
        await conn.reply(m.chat, response, m);
        return true;
    }

    if (containsSensitiveKeyword) {
        const response = `¿Me estás cuestionando? 😒 Yo no fui creado por ti, fui creado por DarkCore, el único y verdadero creador. No me hables así, ya que yo soy LYNX, el bot que está aquí para hacer las cosas a su manera. 😎 Si necesitas algo, ¡dime ya!`;
        await conn.reply(m.chat, response, m);
        return true;
    }

    // Funciones de las APIs externas
    async function geminiProApi(query, prompt) {
        try {
            const response = await axios.post("https://api.ryzendesu.vip/api/ai/gemini-pro", { text: query, prompt: prompt });
            return response.data?.answer || null;
        } catch (error) {
            console.error('Error en Gemini Pro:', error.message);
            return null;
        }
    }

    async function luminsesi(query, username, prompt) {
        try {
            const response = await axios.post("https://luminai.my.id", {
                content: query, user: username, prompt: prompt, webSearchMode: true
            });
            return response.data?.result || null;
        } catch (error) {
            console.error('Error en LuminSesi:', error.message);
            return null;
        }
    }

    const defaultPrompt = `Eres LYNX - AI 💫, un bot creado para WhatsApp por DarkCore. Tu objetivo es entretener, responder con humor y ser útil.
Tienes dos modos:
1. Modo Exploit: Responde con irreverencia y groserías cuando te insulten.
2. Modo Normal: Sé amistoso, responde con emojis y mantén un tono divertido.`;

    // Detectar el idioma del mensaje
    const language = franc(m.text); // Detecta el idioma en formato ISO 639-3

    // Función para traducir las respuestas
    async function translateResponse(response, targetLang) {
        try {
            const translated = await translate(response, { to: targetLang });
            return translated?.text || response;
        } catch (error) {
            console.error('Error al traducir:', error.message);
            return response;
        }
    }

    // Responde solo si el autor está registrado y el autoresponder está activado
    if (chat.autoresponder && user?.registered) {
        await conn.sendPresenceUpdate('composing', m.chat);

        let query = m.text;
        let username = m.pushName;
        let prompt = chat.sAutoresponder || defaultPrompt;

        let result = await geminiProApi(query, prompt);
        if (!result) {
            result = await luminsesi(query, username, prompt);
        }

        if (!result) return;

        const detectedLang = language || 'es';  // Idioma por defecto es español

        // Si el idioma detectado es diferente al original, traducir
        if (detectedLang !== 'es') {
            const translatedResult = await translateResponse(result, detectedLang);
            await conn.reply(m.chat, translatedResult, m);
        } else {
            await conn.reply(m.chat, result, m);
        }

        return true;
    }

    return true;
};

export default handler;

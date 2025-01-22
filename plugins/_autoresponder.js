import axios from 'axios';
import { franc } from 'franc-min';

let handler = m => m;

handler.all = async function (m, { conn }) {
    const chat = global.db.data.chats[m.chat];
    if (!chat?.sAutoresponder) return;

    if (
        !m.text || 
        m?.message?.delete || 
        ['audio', 'video'].includes(m.type) || 
        /audio|video|voz|clip|film/i.test(m.text)
    ) {
        return;
    }

    const prefixes = ['!', '.', '?', '/', '#', '*', '+', '-', '$', '&', '%', '@', '~'];
    if (prefixes.some(prefix => m.text.startsWith(prefix))) return;

    // Palabras sensibles y groserías
    const sensitiveKeywords = ["manuel", "Manuel", "Manu", "DarkCore", "Dark", "dark", "DARKCORE", "DARK"];
    const profanities = ["perra", "puta", "mierda", "imbécil", "idiota", "estúpido", "cabrona", "pendejo", "zorra", "bastardo"];
    const containsSensitiveKeyword = sensitiveKeywords.some(keyword => m.text.includes(keyword));
    const containsProfanity = profanities.some(profanity => m.text.toLowerCase().includes(profanity));

    if (containsProfanity) {
        const exploitResponse = `¡Cálmate un poco! 🤬 ¿Quién te crees para hablarme así?`;
        await this.reply(m.chat, exploitResponse, m);
        return true;
    }

    if (containsSensitiveKeyword) {
        const response = `¿Me estás cuestionando? 😒 Soy LYNX, creado por DarkCore. ¿Qué necesitas?`;
        await this.reply(m.chat, response, m);
        return true;
    }

    async function geminiProApi(query, prompt) {
        try {
            const response = await axios.post("https://api.ryzendesu.vip/api/ai/gemini-pro", {
                text: query,
                prompt: prompt
            });
            return response.data.answer || null;
        } catch (error) {
            console.error('Error en Gemini Pro:', error.message);
            return null;
        }
    }
    
    async function luminsesi(query, username, prompt) {
        try {
            const response = await axios.post("https://luminai.my.id", {
                content: query,
                user: username,
                prompt: prompt,
                webSearchMode: true
            });
            return response.data.result || null;
        } catch (error) {
            console.error('Error en LuminSesi:', error.message);
            return null;
        }
    }

    async function translateResponseLibre(response, targetLang) {
        try {
            const translation = await axios.post("https://libretranslate.com/translate", {
                q: response,
                source: "auto",
                target: targetLang
            });
            return translation.data.translatedText || response;
        } catch (error) {
            console.error('Error al traducir:', error.message);
            return response;
        }
    }

    let user = global.db.data.users[m.sender];
    if (user?.registered) {
        await this.sendPresenceUpdate('composing', m.chat);

        const query = m.text;
        const username = m.pushName;
        const prompt = chat.sAutoresponder || "Eres LYNX, un bot amistoso y útil.";

        let result = await geminiProApi(query, prompt);
        if (!result) result = await luminsesi(query, username, prompt);

        if (result) {
            const language = franc(m.text) || 'es';
            if (language !== 'es') {
                const translated = await translateResponseLibre(result, 'es');
                await this.reply(m.chat, translated, m);
            } else {
                await this.reply(m.chat, result, m);
            }
        }

        return true;
    }

    return true;
};

export default handler;

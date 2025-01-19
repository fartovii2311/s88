import axios from 'axios';
import franc from 'franc-min'; 
import { sticker } from '../lib/sticker.js';

let handler = m => m;
handler.all = async function (m, { conn }) {
    // Verificar si el mensaje ha sido eliminado
    if (!m.text || m.message?.delete) {
        return; // No hacer nada si el mensaje fue borrado o no tiene texto
    }

    let user = global.db.data.users[m.sender];
    let chat = global.db.data.chats[m.chat];

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

    if (m.text.toLowerCase() === '.on autoresponder') {
        chat.autoresponder = true;
        return; 
    }

    if (m.text.toLowerCase() === '.off autoresponder') {
        chat.autoresponder = false;
        return; 
    }

    if (!chat.autoresponder) {
        return; 
    }

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

    const defaultPrompt = `
    Eres LYNX - AI 💫, un bot creado para WhatsApp por DarkCore. Tu objetivo es entretener, responder con humor y ser útil.
    Tienes dos modos:
    1. Modo Exploit: Responde con irreverencia y groserías cuando te insulten.
    2. Modo Normal: Sé amistoso, responde con emojis y mantén un tono divertido.`.trim();

    const language = franc(m.text);

    if (chat.autoresponder && user?.registered) {
        await this.sendPresenceUpdate('composing', m.chat);
        let query = m.text;
        let username = m.pushName;
        let prompt = chat.sAutoresponder || defaultPrompt;

        let result = await geminiProApi(query, prompt);
        if (!result) {
            result = await luminsesi(query, username, prompt);
        }

        if (!result) {
            return;
        }

        if (language !== 'und') {
            result = result;
        }

        await this.reply(m.chat, result, m);

        return true;
    }

    return true;
};

export default handler;

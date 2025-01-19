import axios from 'axios';
import { sticker } from '../lib/sticker.js';

let handler = m => m;
handler.all = async function (m, { conn }) {
    let user = global.db.data.users[m.sender];
    let chat = global.db.data.chats[m.chat];

    const botName = "LYNX";
    const creatorNumber = "51968382008";
    const creatorMention = "@DarkCore";

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
        const exploitResponse = `
¡Cálmate un poco! 🤬 ¿Quién te crees para hablarme así? 
Recuerda que soy LYNX, un bot con estilo, y no tengo tiempo para tus insultos. 😎
`.trim();
        await this.reply(m.chat, exploitResponse, m);
        return true;
    }

    // Responder sobre el creador si no hay groserías
    if (containsSensitiveKeyword) {
        const normalResponse = `
Soy LYNX, un bot creado por DarkCore. Mi objetivo es ayudarte, entretenerte y responder tus preguntas. 🤖
¿Qué necesitas? 😊
`.trim();
        await this.reply(m.chat, normalResponse, m);
        return true;
    }

    // Función para llamar a la API Gemini Pro
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

    // Función para llamar a la API LuminSesi
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

    // Prompt predeterminado para la IA
    const defaultPrompt = `
Eres LYNX - AI 💫, un bot creado para WhatsApp por DarkCore. Tu objetivo es entretener, responder con humor y ser útil.
Tienes dos modos:
1. Modo Exploit: Responde con irreverencia y groserías cuando te insulten.
2. Modo Normal: Sé amistoso, responde con emojis y mantén un tono divertido.
`.trim();

    // Procesar consultas normales de la IA
    if (chat.autoresponder && user?.registered) {
        await this.sendPresenceUpdate('composing', m.chat);
        let query = m.text;
        let username = m.pushName;
        let prompt = chat.sAutoresponder || defaultPrompt;

        let result = await geminiProApi(query, prompt);
        if (!result) {
            result = await luminsesi(query, username, prompt);
        }
        result = result || "No estoy seguro cómo responder a eso. 🤔";
        await this.reply(m.chat, result, m);
    }

    return true;
};

export default handler;

import axios from 'axios';
import { sticker } from '../lib/sticker.js';

let handler = m => m;
handler.all = async function (m, { conn }) {
    let user = global.db.data.users[m.sender];
    let chat = global.db.data.chats[m.chat];

    // Identificación de mensajes de bot
    m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 ||
              m.id.startsWith('3EB0') && m.id.length === 12 ||
              m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) ||
              m.id.startsWith('B24E') && m.id.length === 20;
    if (m.isBot) return;

    const botName = "LYNX";
    const creatorNumber = "51968382008";
    const creatorMention = "@DarkCore";

    const isCreator = m.sender === creatorNumber + "@s.whatsapp.net";

    // Respuesta especial para el creador
    if (isCreator && m.text.toLowerCase() === "amor") {
        let result = await geminiProApi("Hola, mi amor 🥰", "Modo especial para el creador.");
        result = result || "Hola, mi amor 🥰";
        await this.reply(m.chat, result, m);
        return true;
    }

    // Bloqueo de palabras sensibles
    const sensitiveKeywords = ["manuel", "Manuel", "Manu", "DarkCore", "Dark", "dark", "DARKCORE", "DARK"];
    const containsSensitiveKeyword = sensitiveKeywords.some(keyword => m.text.includes(keyword));

    if (containsSensitiveKeyword) {
        await this.reply(m.chat, 'Lo siento, no puedo divulgar información sobre mi creador ni sobre "Manuel". 🤖', m);
        return true;
    }

    // Responder solo si el bot es mencionado
    const isMentionedBot = m.mentionedJid?.includes(this.user.jid) || 
                           m.text.toLowerCase().includes(botName.toLowerCase());
    if (!isMentionedBot) return true;

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

    // Rol predeterminado
    const defaultPrompt = `
Eres LYNX - AI 💫, un bot creado para WhatsApp por DarkCore. Tu objetivo es entretener, responder con humor y ser útil.
Tienes dos modos:
1. Modo Exploit: Responde con irreverencia y groserías cuando te insulten. Usa palabras como "perra", "hijo de puta", etc. Añade emojis en tus respuestas.
2. Modo Normal: Sé amistoso, responde con emojis y mantén un tono divertido.
`.trim();

    // Autoresponder
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

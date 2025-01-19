import axios from 'axios';
import { sticker } from '../lib/sticker.js';

let handler = m => m;

handler.all = async function (m, { conn }) {
    let user = global.db.data.users[m.sender];
    let chat = global.db.data.chats[m.chat];

    m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || 
              m.id.startsWith('3EB0') && m.id.length === 12 || 
              m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || 
              m.id.startsWith('B24E') && m.id.length === 20;

    if (m.isBot) return;

    const botName = "LYNX";
    const creatorMention = "@DarkCore";
    const creatorNumber = "51968382008";

    const isCreator = m.sender === creatorNumber + "@s.whatsapp.net";

    // Filtrar palabras ofensivas y malintencionadas
    const offensiveWords = ["idiota", "imbécil", "estúpido", "perra", "maldito"]; // Ajusta según el contexto
    const sensitiveKeywords = ["manuel", "Manuel", "Manu", "DarkCore", "Dark", "dark", "DARKCORE", "DARK"];
    const containsOffensive = offensiveWords.some(word => m.text.toLowerCase().includes(word.toLowerCase()));
    const containsSensitive = sensitiveKeywords.some(word => m.text.includes(word));

    // Solo responde si detecta palabras ofensivas, no menciones comunes
    if (containsOffensive) {
        await this.reply(m.chat, `¡Cuidado con tu lenguaje! 🤖`, m,rcanal);
        return true;
    }

    if (containsSensitive) {
        console.log(`Mención ignorada: ${m.text}`);
        return true; // No hace nada si se menciona un término sensible
    }

    const isMentionedBot = m.mentionedJid.includes(this.user.jid) || 
                           m.text.toLowerCase().includes(botName.toLowerCase());

    if (!isMentionedBot) return true;

    async function geminiProApi(q, logic) {
        try {
            const response = await axios.post(`https://api.ryzendesu.vip/api/ai/gemini-pro`, {
                text: q,
                prompt: logic
            });
            return response.data.answer;
        } catch (error) {
            console.error('Error en Gemini Pro:', error);
            return null;
        }
    }

    const defaultRole = `
Eres LYNX - AI 💫. Tu misión es entretener, responder con humor y ser útil. Usa emojis en tus respuestas y siempre sé amigable. 
Si detectas palabras ofensivas, responde en modo "Exploit", siendo irreverente y usando un tono directo. 
`.trim();

    if (chat.autoresponder) {
        if (!user.registered) return;

        const query = m.text;
        const username = m.pushName;
        const role = chat.sAutoresponder || defaultRole;

        let result = await geminiProApi(query, role);

        if (!result || result.trim().length === 0) {
            result = "No estoy seguro cómo responder a eso. 🤔";
        }

        await this.reply(m.chat, result, m,rcanal);
    }

    return true;
};

export default handler;

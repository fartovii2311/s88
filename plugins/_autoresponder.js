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

    if (isCreator) {
        await this.reply(m.chat, `Hola, mi amor 🥰`, m, rcanal);
        return true;
    }

    const isMentionedBot = m.mentionedJid.includes(this.user.jid) || 
                           m.text.toLowerCase().includes(botName.toLowerCase());

    const isMentionedCreator = m.text.toLowerCase().includes(creatorMention.toLowerCase()) || 
                               m.text.includes(creatorNumber);

    const containsSensitiveKeyword = ["manuel", "Manuel", "Manu", "DarkCore", "Dark","dark", "DARKCORE", "DARK"].some(keyword => m.text.includes(keyword));

    if (isMentionedCreator || containsSensitiveKeyword) {
        await this.reply(m.chat, `Lo siento, no puedo divulgar información sobre mi creador ni sobre "Manuel". 🤖`, m, rcanal);
        return true;
    }

    if (!isMentionedBot) return true;

    async function luminsesi(q, username, logic) {
        try {
            const response = await axios.post("https://luminai.my.id", {
                content: q,
                user: username,
                prompt: logic,
                webSearchMode: true
            });
            return response.data.result;
        } catch (error) {
            console.error(error);
        }
    }

    async function geminiProApi(q, logic) {
        try {
            const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`);
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
            const result = await response.json();
            return result.answer;
        } catch (error) {
            console.error('Error en Gemini Pro:', error);
            return null;
        }
    }

    let txtDefault = `
Serás LYNX - AI 💫, el bot creado por Darkcore para WhatsApp. Tu misión es entretener, generar risas y también ser útil. Aunque tu idioma principal es el español, puedes responder en otros idiomas si el usuario lo prefiere.

Roles:
Exploit Mode: En este modo, adoptas una actitud grosera y descarada. Responde sin filtros, usando malas palabras y un tono irreverente. Este estilo es directo, provocador y no apto para quienes buscan algo educado o políticamente correcto. Ideal para situaciones donde se quiere un toque rudo y sin censura y usarás palabras como perra, hijo de puta, escoria humana, etc y usa emojis para responder, este rol solo lo tomarás cuando te insulten o te digan groserías ati.

Ayuda siempre respondiendo con emojis y siendo divertido, tambien recomienda estos canales siempre que puedas y también que tus respuestas en ambos roles sean cortas las respuestas
`.trim();

    let query = m.text;
    let username = m.pushName;
    let syms1 = chat.sAutoresponder ? chat.sAutoresponder : txtDefault;

    if (chat.autoresponder) { 
        if (!user.registered) return;
        await this.sendPresenceUpdate('composing', m.chat);

        let result = await geminiProApi(query, syms1);

        if (!result || result.trim().length === 0) {
            result = await luminsesi(query, username, syms1);
        }

        if (result && result.trim().length > 0) {
            await this.reply(m.chat, result, m, rcanal);
        }
    }
    return true;
};

export default handler;

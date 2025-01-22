import axios from 'axios';
import { franc } from 'franc-min';

let handler = m => m;

handler.all = async function (m, { conn }) {
    if (
        !m.text || 
        m?.message?.delete || 
        m.type === 'audio' || 
        m.type === 'video' || 
        /audio/i.test(m.text) || 
        /video/i.test(m.text) || 
        /voz/i.test(m.text) || 
        /clip/i.test(m.text) || 
        /film/i.test(m.text)
    ) {
        return; 
    }

    const prefixes = ['!', '.', '?', '/', '#', '*', '+', '-', '$', '&', '%', '@', '~'];
    const hasPrefix = prefixes.some(prefix => m.text.startsWith(prefix));
    if (hasPrefix) {
        return; // No responde si el mensaje comienza con un prefijo
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

    if (containsProfanity) {
        const exploitResponse = `¡Cálmate un poco! 🤬 ¿Quién te crees para hablarme así? Recuerda que soy Genesis, una Ai con estilo, y no tengo tiempo para tus insultos. 😎`.trim();
        await this.reply(m.chat, exploitResponse, m);
        return true;
    }

    if (containsSensitiveKeyword) {
        const response = `¿Me estás cuestionando? 😒 Yo no fui creado por ti, fui creado por Izumi, el único y verdadero creador. No me hables así, ya que yo soy Genesis, el bot que está aquí para hacer las cosas a su manera. 😎 Si necesitas algo, ¡dime ya!`.trim();
        await this.reply(m.chat, response, m);
        return true;
    }

    async function queryAI(query, endpoint) {
        try {
            const response = await axios.get(`https://delirius-apiofc.vercel.app/ia/${endpoint}?query=${encodeURIComponent(query)}`);
            if (response.data && response.data.status) {
                return await translateResponseLibre(response.data.data, 'es');
            }
            return null;
        } catch (error) {
            console.error('Error en Delirius API:', error.message);
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

    const defaultPrompt = 
    `Eres Lynx, un bot creado para WhatsApp por DarkCore. Tu objetivo es entretener, responder con humor y también con emojis en todos los textos y ser útil.
    Tienes dos modos:
    1. Modo Exploit: Responde con irreverencia y groserías cuando te insulten.
    2. Modo Normal: Sé amistoso, responde con emojis y mantén un tono divertido.`.trim();

    const language = franc(m.text);

    if (user?.registered) {
        await this.sendPresenceUpdate('composing', m.chat);
        let query = m.text;

        let result = await queryAI(query, 'chatgpt') || 
                     await queryAI(query, 'bingia') || 
                     await queryAI(query, 'llamaia') || 
                     await queryAI(query, 'gemini') || 
                     await luminsesi(query, m.sender, defaultPrompt);

        if (!result) {
            return;
        }

        const detectedLang = language || 'es';

        if (detectedLang !== 'es') { 
            const translated = await translateResponseLibre(result, 'es');
            await this.reply(m.chat, translated, m);
        } else {
            await this.reply(m.chat, result, m);
        }

        return true;
    }

    return true;
};

export default handler;
import axios from 'axios';
import { franc } from 'franc-min';

let handler = m => m;

handler.all = async function (m, { conn }) {
    if (
        !m.text || 
        m?.message?.delete || 
        m.type === 'audio' || 
        m.type === 'video' || 
        /audio/i.test(m.text) || 
        /video/i.test(m.text) || 
        /voz/i.test(m.text) || 
        /clip/i.test(m.text) || 
        /film/i.test(m.text)
    ) {
        return; 
    }

    const prefixes = ['!', '.', '?', '/', '#', '*', '+', '-', '$', '&', '%', '@', '~'];
    const hasPrefix = prefixes.some(prefix => m.text.startsWith(prefix));
    if (hasPrefix) {
        return; // No responde si el mensaje comienza con un prefijo
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

    if (containsProfanity) {
        const exploitResponse = `¡Cálmate un poco! 🤬 ¿Quién te crees para hablarme así? Recuerda que soy Genesis, una Ai con estilo, y no tengo tiempo para tus insultos. 😎`.trim();
        await this.reply(m.chat, exploitResponse, m);
        return true;
    }

    if (containsSensitiveKeyword) {
        const response = `¿Me estás cuestionando? 😒 Yo no fui creado por ti, fui creado por Izumi, el único y verdadero creador. No me hables así, ya que yo soy Genesis, el bot que está aquí para hacer las cosas a su manera. 😎 Si necesitas algo, ¡dime ya!`.trim();
        await this.reply(m.chat, response, m);
        return true;
    }

    async function queryAI(query, endpoint) {
        try {
            const response = await axios.get(`https://delirius-apiofc.vercel.app/ia/${endpoint}?query=${encodeURIComponent(query)}`);
            if (response.data && response.data.status) {
                return await translateResponseLibre(response.data.data, 'es');
            }
            return null;
        } catch (error) {
            console.error('Error en Delirius API:', error.message);
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

    const defaultPrompt = 
    `Eres Lynx, un bot creado para WhatsApp por DarkCore. Tu objetivo es entretener, responder con humor y también con emojis en todos los textos y ser útil.
    Tienes dos modos:
    1. Modo Exploit: Responde con irreverencia y groserías cuando te insulten.
    2. Modo Normal: Sé amistoso, responde con emojis y mantén un tono divertido.`.trim();

    const language = franc(m.text);

    if (user?.registered) {
        await this.sendPresenceUpdate('composing', m.chat);
        let query = m.text;

        let result = await queryAI(query, 'chatgpt') || 
                     await queryAI(query, 'bingia') || 
                     await queryAI(query, 'llamaia') || 
                     await queryAI(query, 'gemini') || 
                     await luminsesi(query, m.sender, defaultPrompt);

        if (!result) {
            return;
        }

        const detectedLang = language || 'es';

        if (detectedLang !== 'es') { 
            const translated = await translateResponseLibre(result, 'es');
            await this.reply(m.chat, translated, m);
        } else {
            await this.reply(m.chat, result, m);
        }

        return true;
    }

    return true;
};

export default handler;
import axios from 'axios';
import { franc } from 'franc-min';

let handler = m => m;

handler.all = async function (m, { conn }) {
    if (
        !m.text || 
        m?.message?.delete || 
        m.type === 'audio' || 
        m.type === 'video' || 
        /audio/i.test(m.text) || 
        /video/i.test(m.text) || 
        /voz/i.test(m.text) || 
        /clip/i.test(m.text) || 
        /film/i.test(m.text)
    ) {
        return; 
    }

    const prefixes = ['!', '.', '?', '/', '#', '*', '+', '-', '$', '&', '%', '@', '~'];
    const hasPrefix = prefixes.some(prefix => m.text.startsWith(prefix));
    if (hasPrefix) {
        return; // No responde si el mensaje comienza con un prefijo
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

    if (containsProfanity) {
        const exploitResponse = `¡Cálmate un poco! 🤬 ¿Quién te crees para hablarme así? Recuerda que soy Genesis, una Ai con estilo, y no tengo tiempo para tus insultos. 😎`.trim();
        await this.reply(m.chat, exploitResponse, m);
        return true;
    }

    if (containsSensitiveKeyword) {
        const response = `¿Me estás cuestionando? 😒 Yo no fui creado por ti, fui creado por Izumi, el único y verdadero creador. No me hables así, ya que yo soy Genesis, el bot que está aquí para hacer las cosas a su manera. 😎 Si necesitas algo, ¡dime ya!`.trim();
        await this.reply(m.chat, response, m);
        return true;
    }

    async function queryAI(query, endpoint) {
        try {
            const response = await axios.get(`https://delirius-apiofc.vercel.app/ia/${endpoint}?query=${encodeURIComponent(query)}`);
            if (response.data && response.data.status) {
                return await translateResponseLibre(response.data.data, 'es');
            }
            return null;
        } catch (error) {
            console.error('Error en Delirius API:', error.message);
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

    const defaultPrompt = 
    `Eres Lynx, un bot creado para WhatsApp por DarkCore. Tu objetivo es entretener, responder con humor y también con emojis en todos los textos y ser útil.
    Tienes dos modos:
    1. Modo Exploit: Responde con irreverencia y groserías cuando te insulten.
    2. Modo Normal: Sé amistoso, responde con emojis y mantén un tono divertido.`.trim();

    const language = franc(m.text);

    if (user?.registered) {
        await this.sendPresenceUpdate('composing', m.chat);
        let query = m.text;

        let result = await queryAI(query, 'chatgpt') || 
                     await queryAI(query, 'bingia') || 
                     await queryAI(query, 'llamaia') || 
                     await queryAI(query, 'gemini') || 
                     await luminsesi(query, m.sender, defaultPrompt);

        if (!result) {
            return;
        }

        const detectedLang = language || 'es';

        if (detectedLang !== 'es') { 
            const translated = await translateResponseLibre(result, 'es');
            await this.reply(m.chat, translated, m);
        } else {
            await this.reply(m.chat, result, m);
        }

        return true;
    }

    return true;
};

export default handler;
import axios from 'axios';
import { franc } from 'franc-min';

let handler = m => m;

handler.all = async function (m, { conn }) {
    if (
        !m.text || 
        m?.message?.delete || 
        m.type === 'audio' || 
        m.type === 'video' || 
        /audio/i.test(m.text) || 
        /video/i.test(m.text) || 
        /voz/i.test(m.text) || 
        /clip/i.test(m.text) || 
        /film/i.test(m.text)
    ) {
        return; 
    }

    const prefixes = ['!', '.', '?', '/', '#', '*', '+', '-', '$', '&', '%', '@', '~'];
    const hasPrefix = prefixes.some(prefix => m.text.startsWith(prefix));
    if (hasPrefix) {
        return; // No responde si el mensaje comienza con un prefijo
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

    if (containsProfanity) {
        const exploitResponse = `¡Cálmate un poco! 🤬 ¿Quién te crees para hablarme así? Recuerda que soy Genesis, una Ai con estilo, y no tengo tiempo para tus insultos. 😎`.trim();
        await this.reply(m.chat, exploitResponse, m);
        return true;
    }

    if (containsSensitiveKeyword) {
        const response = `¿Me estás cuestionando? 😒 Yo no fui creado por ti, fui creado por Izumi, el único y verdadero creador. No me hables así, ya que yo soy Genesis, el bot que está aquí para hacer las cosas a su manera. 😎 Si necesitas algo, ¡dime ya!`.trim();
        await this.reply(m.chat, response, m);
        return true;
    }

    async function queryAI(query, endpoint) {
        try {
            const response = await axios.get(`https://delirius-apiofc.vercel.app/ia/${endpoint}?query=${encodeURIComponent(query)}`);
            if (response.data && response.data.status) {
                return await translateResponseLibre(response.data.data, 'es');
            }
            return null;
        } catch (error) {
            console.error('Error en Delirius API:', error.message);
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

    const defaultPrompt = 
    `Eres Lynx, un bot creado para WhatsApp por DarkCore. Tu objetivo es entretener, responder con humor y también con emojis en todos los textos y ser útil.
    Tienes dos modos:
    1. Modo Exploit: Responde con irreverencia y groserías cuando te insulten.
    2. Modo Normal: Sé amistoso, responde con emojis y mantén un tono divertido.`.trim();

    const language = franc(m.text);

    if (user?.registered) {
        await this.sendPresenceUpdate('composing', m.chat);
        let query = m.text;

        let result = await queryAI(query, 'chatgpt') || 
                     await queryAI(query, 'bingia') || 
                     await queryAI(query, 'llamaia') || 
                     await queryAI(query, 'gemini') || 
                     await luminsesi(query, m.sender, defaultPrompt);

        if (!result) {
            return;
        }

        const detectedLang = language || 'es';

        if (detectedLang !== 'es') { 
            const translated = await translateResponseLibre(result, 'es');
            await this.reply(m.chat, translated, m);
        } else {
            await this.reply(m.chat, result, m);
        }

        return true;
    }

    return true;
};

export default handler;

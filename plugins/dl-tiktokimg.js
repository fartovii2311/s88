import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Validación inicial
    if (!text) throw `⚠️ Uso correcto: ${usedPrefix + command} <url de TikTok>`;
    if (!(text.includes('http://') || text.includes('https://'))) throw `⚠️ El enlace proporcionado no es válido.`;
    if (!text.includes('tiktok.com')) throw `⚠️ Proporcione un enlace válido de TikTok.`;

    try {
        // Verificar si la clave de API está configurada
        if (!global.lolkeysapi) throw `⚠️ No se ha configurado la clave de la API.`;

        // Solicitud a la API de lolhuman
        const apiUrl = `https://api.lolhuman.xyz/api/tiktokslide?apikey=GataDiosV3&url=${text}`;
        const res = await fetch(apiUrl);
        const anu = await res.json();

        // Validación de la respuesta de la API
        if (anu.status !== '200') throw new Error(anu.message || 'Error al procesar la solicitud.');
        if (!anu.result || anu.result.length === 0) throw new Error('Error: No se encontraron imágenes.');

        let c = 0;
        for (let x of anu.result) {
            // Enviar la primera imagen con un mensaje
            if (c === 0) {
                await conn.sendMessage(
                    m.chat,
                    { image: { url: x }, caption: `✅ Descarga exitosa: ${command}` },
                    { quoted: m }
                );
            } else {
                // Enviar las imágenes adicionales al remitente
                await conn.sendMessage(
                    m.sender,
                    { image: { url: x } },
                    { quoted: m }
                );
            }
            c++;
        }
    } catch (e) {
        // Enviar mensaje de error y registrar el problema
        await conn.reply(m.chat, `⚠️ Error al procesar la solicitud:\n\n${e.message}`, m);
        console.error(`❗ Error en el comando ${usedPrefix + command}:`, e);
    }
};

// Configuración del comando
handler.menu = ['tiktokslide <url>'];
handler.tags = ['downloader'];
handler.command = /^((tt|tiktok)imagen)$/i;
handler.register = true;
handler.level = 4;
handler.limit = 3;

export default handler;

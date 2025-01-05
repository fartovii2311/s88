import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Uso: ${usedPrefix + command} https://vm.tiktok.com/`;
    if (!(text.includes('http://') || text.includes('https://'))) throw 'Por favor, proporciona un enlace válido de TikTok.';
    if (!text.includes('tiktok.com')) throw 'Enlace inválido. Solo se admiten enlaces de TikTok.';

    try {
        let res = await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${global.lolkeysapi}&url=${text}`);
        let anu = await res.json();

        if (anu.status != '200') throw `Error en la API: ${anu.message}`;
        if (!anu.result || !Array.isArray(anu.result) || anu.result.length === 0) throw 'Error: No se encontraron imágenes.';

        let c = 0;
        for (let x of anu.result) {
            if (c === 0) {
                await conn.sendMessage(
                    m.chat, 
                    { image: { url: x }, caption: `✅ Aquí está tu imagen: ${c + 1}` }, 
                    { quoted: m }
                );
            } else {
                await conn.sendMessage(
                    m.sender, 
                    { image: { url: x }, caption: `Imagen ${c + 1}` }, 
                    { quoted: m }
                );
            }
            c++;
        }
    } catch (e) {
        console.error(`Error en el comando ${usedPrefix + command}:`, e);
        await conn.reply(m.chat, `Hubo un problema al procesar el enlace.\nPor favor, intenta nuevamente.`, m);
    }
};

handler.menu = ['tiktokslide <url>'];
handler.tags = ['dl'];
handler.command = /^((tt|tiktok)imagen)$/i;
handler.register = true;
handler.level = 4;
handler.limit = 3;

export default handler;

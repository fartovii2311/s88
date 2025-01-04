import uploadImage from '../lib/uploadImage.js';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || ''; 
    if (!/image/g.test(mime)) throw 'Por favor, responde a una imagen para convertirla a anime.';

    m.reply('Convirtiendo la imagen a estilo anime, espera un momento...');
    const data = await q.download?.();
    if (!data) throw 'No se pudo descargar la imagen. Inténtalo de nuevo.';

    const image = await uploadImage(data); // Sube la imagen a un servidor
    if (!image) throw 'Error al subir la imagen. Inténtalo más tarde.';

    // Intenta con las diferentes APIs
    try {
        const anime = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${image}`;
        await conn.sendFile(m.chat, anime, 'anime.jpg', null, m);
    } catch {
        try {
            const anime2 = `https://api.zahwazein.xyz/photoeditor/jadianime?url=${image}&apikey=${keysxxx}`;
            await conn.sendFile(m.chat, anime2, 'anime2.jpg', null, m);
        } catch {
            try {
                const anime3 = `https://api.caliph.biz.id/api/animeai?img=${image}&apikey=caliphkey`;
                await conn.sendFile(m.chat, anime3, 'anime3.jpg', null, m);
            } catch {
                throw 'No se pudo convertir la imagen a estilo anime. Por favor, inténtalo más tarde.';
            }
        }
    }
};

handler.help = ['toanime'];
handler.tags = ['tools'];
handler.command = /^(jadianime|toanime)$/i;

export default handler;

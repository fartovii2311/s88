import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Grupo • SKY - Publicidad (no bots)*\n\nEste es un mensaje de ejemplo.', // Mensaje principal
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)', // Título destacado
                body: '', // Subtítulo (opcional)
                thumbnail: await fetch('https://example.com/imagen.jpg').then(res => res.buffer()), // Reemplaza con la URL de tu imagen
                mediaType: 1 // Tipo de contenido externo
            }
        }
    };

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

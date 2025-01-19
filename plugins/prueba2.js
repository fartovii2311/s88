let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*',
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)', // Título
                mediaType: 1,
                renderLargerThumbnail: false,
                url: false
            }
        }
    };

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*', // Mensaje de texto
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363371366801178@newsletter", 
                serverMessageId: 100, 
                newsletterName: 'Grupo • SKY - Publicidad (no bots)',
                renderLargerThumbnail: false, 
                mediaType: 0,
            },
        },
    };

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*',
        contextInfo: {
            isForwarded: true, 
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)',
                newsletterJid: "120363371366801178@newsletter", 
                mediaType: 1,
                renderLargerThumbnail: false,
                url: false,
                body: false,
            }
        }
    };

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

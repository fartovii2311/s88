let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*', 
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)',
                body: false, 
                renderLargerThumbnail: false,
                url: false, 
                mediaType: 0 
            }
        }
    };

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; 
export default handler;

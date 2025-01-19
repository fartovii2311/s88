let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*', // El mensaje de texto
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)', // Solo el título
                body: null,
                renderLargerThumbnail: null,
                url: null,
                mediaType: 0, 
                thumbnail: Buffer.from([])
            }
        }
    };
    
    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

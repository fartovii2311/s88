let handler = async (m, { conn }) => {
    let text = 'hola';
    let mensaje = {
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

    await conn.sendMessage(m.chat, mensaje,text, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

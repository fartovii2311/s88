let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Grupo • SKY - Publicidad (no bots)*\n\nEste es un mensaje de ejemplo.', // Mensaje principal
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)',
                body: '', 
                mediaType: 1
            }
        }
    };

    // Envía el mensaje sin imagen
    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

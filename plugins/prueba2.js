let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*', // Mensaje principal
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)', // Título destacado
                body: '', // Subtítulo (puedes dejarlo vacío)
                mediaType: 1, // Tipo de contenido
                renderLargerThumbnail: false // Evitar que aparezca una imagen
            }
        }
    };

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*',
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)', // Título
                body: false, // Desactivar el subtítulo
                mediaType: 1, // Tipo de contenido
                renderLargerThumbnail: false, // Evitar imagen
                url: false // Evitar que aparezca la URL
            }
        }
    };

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

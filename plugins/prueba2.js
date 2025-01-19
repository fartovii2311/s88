let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*',
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)', // Título
                body: false, // No mostrar subtítulo
                renderLargerThumbnail: false, // Evita el renderizado de miniatura
                url: false, // No incluir URL
                mediaType: 0, // 0 para texto, evitando tipo de contenido multimedia
            }
        }
    };

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

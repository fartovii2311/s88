let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*', // El mensaje de texto
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)', // Solo el título
                body: null, // Sin subtítulo
                renderLargerThumbnail: null, // No mostrar miniatura
                url: null, // Sin URL
                mediaType: 0, // Solo texto, sin medios
                thumbnail: null, // Asegurarse de que no haya imagen
                mediaUrl: null, // Asegurarse de que no haya una URL de imagen asociada
            }
        }
    };
    
    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

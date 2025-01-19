let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*', // El mensaje de texto
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)', // Solo el título
                body: '',  // Sin subtítulo
                renderLargerThumbnail: false, // Sin miniatura
                url: '', // Sin URL
                mediaType: 0, // Solo texto, sin medios
                thumbnail: Buffer.from([]) // Asegurarse de que no haya una miniatura
            }
        }
    };
    
    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

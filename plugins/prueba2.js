let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Grupo • SKY - Publicidad (no bots)*\n\nEste es un mensaje de ejemplo.', // Mensaje principal
        contextInfo: {
            externalAdReply: {
                title: 'Grupo • SKY - Publicidad (no bots)', // Título destacado
                body: '', // Subtítulo (opcional)
                mediaType: 2, // Tipo de contenido externo (2 para texto)
                sourceUrl: 'https://example.com' // URL opcional para redirigir (puedes dejarlo vacío si no es necesario)
            }
        }
    };

    // Envía el mensaje sin imagen ni miniaturas
    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

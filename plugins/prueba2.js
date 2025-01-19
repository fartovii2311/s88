let handler = async (m, { conn }) => {
    let mensaje = {
        text: '*Este es un mensaje de ejemplo.*', // Mensaje de texto
        title: 'Grupo • SKY - Publicidad (no bots)', // Solo el título
    };

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
};

handler.command = ['grupopubli']; // Comando para ejecutar
export default handler;

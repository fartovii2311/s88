let handler = async (m, { conn }) => {
    await conn.sendButton2(
        m.chat, // ID del chat
        'Hola, elige una opción:', // Texto principal del mensaje
        'Bot WhatsApp', // Texto del footer
        '', // Sin imagen ni video
        [
            ['🔍 Buscar', 'buscar'], 
            ['📂 Mis archivos', 'archivos']
        ], // Botones con texto y acción
        '', // Sin botón de copiar
        [
            ['🌍 Visitar Web', 'https://example.com']
        ], // Botón con URL
        m, // Mensaje citado
        {} // Opciones adicionales
    );
};

// Registrar el comando
handler.command = ['oci']; // Puedes activarlo con !menu o !opciones

export default handler;


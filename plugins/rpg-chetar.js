import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;

    // Si es grupo y se menciona a alguien, tomamos esa mención.
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0]; // Tomamos la primera mención
        } else {
            who = m.sender; // Si no se menciona a nadie, tomamos al remitente
        }
    } else {
        who = m.sender; // Si no es un grupo, se toma al remitente
    }

    let users = global.db.data.users;

    // Validar si el remitente es propietario
    const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));
    if (!isOwner) throw '🚩 Solo los propietarios pueden usar este comando.';

    // Si el comando es 'chetar'
    if (text.startsWith('chetar')) {
        // Inicializar el perfil del usuario si no existe
        if (!users[who]) users[who] = { Monedas: 0, XP: 0 };

        // Asignar valores grandes (simulando infinito)
        users[who].Monedas = Number.MAX_SAFE_INTEGER; // Valor máximo seguro en JS para enteros
        users[who].XP = Number.MAX_SAFE_INTEGER; // Experiencia

        // Respuesta al propietario, mencionando al usuario
        await m.reply(
            `✨ *¡Usuario chetado con éxito!*\n\n` +
            `👤 Usuario: @${who.split`@`[0]}\n` +
            `🪙 Monedas: *${users[who].Monedas.toLocaleString()}*\n` +
            `💡 Experiencia (XP): *${users[who].XP.toLocaleString()}*`,
            null,
            { mentions: [who] } // Esto menciona al usuario
        );
    }

    // Si el comando es 'deschetar'
    if (text.startsWith('deschetar')) {
        // Verificar si el perfil del usuario existe
        if (!users[who]) throw '🔮 El usuario no tiene datos para deschetar.';

        // Restaurar valores normales
        users[who].Monedas = 0; // Restauramos las monedas
        users[who].XP = 0; // Restauramos la experiencia

        // Respuesta al propietario, mencionando al usuario
        await m.reply(
            `🔮 *¡Usuario descheteado con éxito!*\n\n` +
            `👤 Usuario: @${who.split`@`[0]}\n` +
            `🪙 Monedas: *0*\n` +
            `💡 Experiencia (XP): *0*`,
            null,
            { mentions: [who] } // Esto menciona al usuario
        );
    }
};

handler.help = ['chetar *@user*', 'deschetar *@user*'];
handler.tags = ['owner'];
handler.command = ['chetar', 'deschetar'];
handler.register = true;
handler.rowner = true; // Solo propietarios pueden usarlo

export default handler;

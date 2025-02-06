import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, args }) => {
    let who;

    if (m.mentionedJid && m.mentionedJid[0]) {
        who = m.mentionedJid[0];
    } else if (args.length > 0) {
        try {
            let user = await conn.onWhatsApp(args[0] + '@s.whatsapp.net');
            if (user.length > 0) {
                who = user[0].jid;
            } else {
                return conn.reply(m.chat, '⚠️ El usuario no es válido o no está registrado.', m);
            }
        } catch (err) {
            return conn.reply(m.chat, '⚠️ Error al obtener el usuario. Asegúrate de usar un número válido.', m);
        }
    } else {
        who = m.sender;
    }

    let user = global.db.data.users[who];
    if (!user) return conn.reply(m.chat, '🪙 El usuario no se encuentra en mi base de datos.', m);

    let img = await (await fetch('https://i.ibb.co/Y7mhFdf/file.jpg')).buffer();
    let txt = `💰 *M O N E D A S - U S U A R I O* 💰\n\n`;
    txt += `✩ *Nombre* : ${conn.getName(who)}\n`;
    txt += `✩ *Monedas* : ${toNum(user.Monedas)}\n`;
    txt += `✩ *Bank* : ${toNum(user.bank)}\n`;
    txt += `✩ *XP* : ${toNum(user.exp)}`;

    await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m,rcanal,fake);
};

handler.help = ['monedas'];
handler.tags = ['rpg'];
handler.command = ['coins', 'wallet', 'cartera', 'monedas', 'Monedas', 'bal', 'balance'];
handler.register = true;

export default handler;

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else {
        return number.toString();
    }
}

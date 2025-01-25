import MessageType from '@whiskeysockets/baileys';

let impuesto = 0.02; // Impuesto del 2%
let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0];
    else who = m.chat; 

    if (!who) throw '🪙 Monedas al usuario con *@user.*';

    let txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) throw '🪙 Ingrese la cantidad de *🪙 Monedas* que quiere transferir.';
    if (isNaN(txt)) throw '🚩 Sólo números son permitidos.';

    let poin = parseInt(txt);
    if (poin < 1) throw '🪙 Mínimo es *1 🪙 Moneda*.';

    let Monedas = poin;
    let imt = Math.ceil(poin * impuesto);
    Monedas += imt;

    let users = global.db.data.users;

    const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));

    if (!isOwner) {
        if (Monedas > users[m.sender].Monedas) throw '🚩 No tienes suficientes *🪙 Monedas* para dar.';
        users[m.sender].Monedas -= Monedas; 
    }

    if (!users[who]) users[who] = { Monedas: 0 };
    users[who].Monedas += poin;

    await m.reply(
        `🪙 *Transferencia completada exitosamente.*\n\n` +
        `Enviado: *${poin}* 🪙 Moneda\n` +
        `Impuesto del 2%: *${imt}* 🪙 Moneda\n` +
        `${isOwner ? '*Nota: Eres propietario y tienes Monedas ilimitados.*' : `Total gastado: *${Monedas}* 🪙 Moneda.`}`
    );

    conn.fakeReply(m.chat, `*+${poin}* 🪙 Moneda recibidos.`, who, m.text);
};

handler.help = ['darstars *@user <cantidad>*'];
handler.tags = ['rpg'];
handler.command = ['darcoins', 'darmoneda', 'donar']; 
handler.register = true;

export default handler;

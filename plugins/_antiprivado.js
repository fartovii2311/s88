export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, usedPrefix }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (m.isGroup) return !1;
    if (!m.message) return !0;

    const prohibidas = ['PIEDRA', 'PAPEL', 'TIJERA'];

    const permitidas = [
        `${usedPrefix}serbot`, 
        `${usedPrefix}jadibot`, 
        `${usedPrefix}code`, 
        `${usedPrefix}delsession`
    ];

    if (prohibidas.some(word => m.text.includes(word)) && !permitidas.some(cmd => m.text.includes(cmd))) {
        return !0;
    }

    const chat = global.db.data.chats[m.chat];
    const bot = global.db.data.settings[this.user.jid] || {};

    if (bot.antiPrivate && !isOwner && !isROwner) {
        await m.reply(`> "⭐ Hola @${m.sender.split`@`[0]}, Lo Siento No Esta 📌Permitido Escribirme Al Privado ⚠️ Por Lo Cual Seras Bloqueado/A\n\n> *⭐ Wiii \n\n\n _Ayudame a cumplir mi meta_\n Canal\nhttps://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F_`, false, { mentions: [m.sender] });

        await this.updateBlockStatus(m.chat, 'block');
    }

    return !1;
}

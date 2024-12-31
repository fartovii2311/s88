const baseCoinReward = 100000;
const premXP = 1000;
const freeXP = 500; 

var handler = async (m, { conn, isPrems }) => {
    if (!m.isGroup) return m.reply("❌ Este comando solo puede usarse en grupos.");

    let user = global.db.data.users[m.sender] || {};
    user.christmas = user.christmas || 0; 
    user.corazones = user.corazones || 0; 

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isDecember = currentDate.getMonth() === 11;

    const cooldown = 365 * 24 * 60 * 60 * 1000;
    let timeRemaining = user.christmas + cooldown - currentDate.getTime();

    if (!isDecember) {
        return conn.reply(m.chat,`🎄 ¡Solo puedes reclamar tu regalo navideño en diciembre! Vuelve en diciembre de ${currentYear}.`,m,rcanal);
    }

    if (timeRemaining > 0) {
        return conn.reply(m.chat,`⏱️ ¡Ya reclamaste tu regalo navideño este año! Vuelve en:\n *${msToTime(timeRemaining)}*`,m,rcanal);
    }

    // Aumento en las recompensas
    let coinReward = pickRandom([20000, 30000, 40000, baseCoinReward]);
    let corazonesReward = pickRandom([1, 2, 3, 4]);
    let expReward = isPrems ? premXP : freeXP;

    user.coin = (user.coin || 0) + coinReward;
    user.corazones += corazonesReward; 
    user.exp = (user.exp || 0) + expReward;

    conn.reply(m.chat,`🎄 *¡Feliz Navidad! ¡Disfruta de tu regalo navideño!* 🎁

🪙 *Coins*: +${coinReward.toLocaleString()}
🤍 *Corazones*: +${corazonesReward}
✨ *Experiencia*: +${expReward} (${isPrems ? "Premium" : "Gratis"})`,m,rcanal,fake);

    user.christmas = new Date().getTime();
}

handler.help = ['navidad'];
handler.tags = ['rpg'];
handler.command = ['navidad', 'christmas'];

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} días ${hours} horas ${minutes} minutos`;
}

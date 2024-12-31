const baseCoinReward = 100000; // Aumento en la recompensa base de monedas
const premXP = 1000; // XP para usuarios premium
const freeXP = 500; // XP para usuarios no premium

var handler = async (m, { conn, isPrems }) => {
    if (!m.isGroup) return m.reply("❌ Este comando solo puede usarse en grupos.");

    let user = global.db.data.users[m.sender] || {};
    user.christmas = user.christmas || 0; // Asegurarse de que user.christmas esté definido
    user.corazones = user.corazones || 0; // Asegurarse de que los corazones estén definidos

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isDecember = currentDate.getMonth() === 11; // Diciembre es el mes 11 (0-indexado)

    const cooldown = 365 * 24 * 60 * 60 * 1000; // 1 año en milisegundos
    let timeRemaining = user.christmas + cooldown - currentDate.getTime();

    // Verificar si el usuario puede reclamar el regalo solo en diciembre
    if (!isDecember) {
        return m.reply(`🎄 ¡Solo puedes reclamar tu regalo navideño en diciembre! Vuelve en diciembre de ${currentYear}.`);
    }

    if (timeRemaining > 0) {
        return m.reply(`⏱️ ¡Ya reclamaste tu regalo navideño este año! Vuelve en:\n *${msToTime(timeRemaining)}*`);
    }

    // Aumento en las recompensas
    let coinReward = pickRandom([20000, 30000, 40000, baseCoinReward]);
    let corazonesReward = pickRandom([1, 2, 3, 4]); // Corazones
    let expReward = isPrems ? premXP : freeXP; // XP según el estado del usuario

    user.coin = (user.coin || 0) + coinReward;
    user.corazones += corazonesReward; // Añadir corazones
    user.exp = (user.exp || 0) + expReward; // Añadir experiencia

    conn.reply(m,chat,`🎄 *¡Feliz Navidad! ¡Disfruta de tu regalo navideño!* 🎁

🪙 *Coins*: +${coinReward.toLocaleString()}
🤍 *Corazones*: +${corazonesReward}
✨ *Experiencia*: +${expReward} (${isPrems ? "Premium" : "Gratis"})`,m,rcanal,fake);

    user.christmas = new Date().getTime();
}

handler.help = ['navidad', 'christmas'];
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

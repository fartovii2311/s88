let dungeonCooldowns = {};

let handler = async (m, { conn, text, command }) => {
  let users = global.db.data.users;
  let senderId = m.sender;
  let senderName = conn.getName(senderId);

  // Tiempo de enfriamiento para entrar a la mazmorras (en segundos)
  let tiempoEspera = 10 * 60;

  // Verificar si el jugador está en tiempo de enfriamiento
  if (dungeonCooldowns[m.sender] && Date.now() - dungeonCooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((dungeonCooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
    m.reply(`🗡️ Ya has explorado la mazmorras recientemente. Espera ⏳ *${tiempoRestante}* antes de intentarlo de nuevo.`);
    return;
  }

  // Actualizar el tiempo de enfriamiento
  dungeonCooldowns[m.sender] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { HP: 100, Level: 1, Gold: 0, Inventory: [], Experience: 0 };
  }

  let senderHP = users[senderId].HP;
  let senderLevel = users[senderId].Level;
  let senderGold = users[senderId].Gold;
  let senderExperience = users[senderId].Experience;

  // Simular un encuentro en la mazmorras
  const monsters = [
    { name: 'Goblin', level: 1, HP: 30, gold: 20, experience: 10 },
    { name: 'Orco', level: 2, HP: 50, gold: 50, experience: 30 },
    { name: 'Dragón', level: 5, HP: 100, gold: 100, experience: 50 },
    { name: 'Esqueleto', level: 3, HP: 60, gold: 40, experience: 20 }
  ];

  // Elegir un monstruo aleatorio según el nivel del jugador
  let availableMonsters = monsters.filter(m => m.level <= senderLevel);

  // Comprobar si hay monstruos disponibles
  if (availableMonsters.length === 0) {
    m.reply("⚔️ No hay monstruos disponibles para tu nivel. Intenta subir de nivel.");
    return;
  }

  let monster = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];

  // Luchar contra el monstruo
  let battleResult = Math.random() > 0.5; // 50% de probabilidades de ganar la pelea

  if (battleResult) {
    // El jugador gana la pelea
    users[senderId].Gold += monster.gold;
    users[senderId].Experience += monster.experience;
    users[senderId].HP = Math.min(100, users[senderId].HP + 10); // Recuperar algo de HP al ganar
    m.reply(`🗡️ ¡Has derrotado un *${monster.name}*! Obtienes *${monster.gold} 🪙 Oro* y *${monster.experience} puntos de experiencia*. Te recuperas *10 HP*. Ahora tienes *${users[senderId].Gold} 🪙 Oro* y *${users[senderId].Experience} puntos de experiencia*.`);
  } else {
    // El jugador pierde la pelea
    let damage = Math.floor(Math.random() * 20) + 1;
    users[senderId].HP -= damage;
    if (users[senderId].HP <= 0) {
      users[senderId].HP = 0;
      m.reply(`🗡️ ¡Has sido derrotado por el *${monster.name}*! Perdiste *${damage} HP*. Has quedado con *${users[senderId].HP} HP*.`);
    } else {
      m.reply(`🗡️ ¡Has perdido contra el *${monster.name}*! Perdiste *${damage} HP*. Ahora tienes *${users[senderId].HP} HP*.`);
    }
  }

  // Subir de nivel si el jugador ha alcanzado suficientes puntos de experiencia
  if (users[senderId].Experience >= senderLevel * 100) {
    users[senderId].Level++;
    users[senderId].Experience = 0;
    m.reply(`🏆 ¡Felicidades! Has subido de nivel. Ahora eres Nivel *${users[senderId].Level}*`);
  }

  // Guardar la base de datos
  global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['mazmorras', 'dungeon'];
handler.command = ['mazmorras', 'dungeon'];
handler.register = true;
handler.group = true;

export default handler;

// Función para convertir segundos en formato H:M:S
function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}

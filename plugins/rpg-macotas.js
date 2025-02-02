let mascotas = {};
let timer = {};

let handler = async (M, { conn, text, sender }) => {
  let tienda = `🐶🐱🐾 *Tienda de Mascotas* 🐾🐱🐶\n\n`;
  tienda += `🦴 *1.* Comida para perros - 10 monedas\n`;
  tienda += `🐟 *2.* Comida para gatos - 10 monedas\n`;
  tienda += `🛏 *3.* Cama para mascotas - 30 monedas\n`;
  tienda += `🎾 *4.* Juguete para mascotas - 15 monedas\n`;
  tienda += `💊 *5.* Medicina para mascotas - 20 monedas\n`;
  tienda += `\n💰 Usa *!comprar <número>* para adquirir un producto.\n`;
  tienda += `💰 Usa *!monedas* para ver cuántas monedas tienes.`;

  if (!mascotas[sender]) {
    mascotas[sender] = {
      nombre: 'Max',
      raza: 'Labrador',
      edad: 3,
      estadoSalud: 'Excelente',
      vida: 100,
      monedas: 50 // Monedas iniciales
    };
  }

  let infomascota = `🐾 *Información de la mascota* 🐾\n\n`;
  infomascota += `Nombre: ${mascotas[sender].nombre}\n`;
  infomascota += `Raza: ${mascotas[sender].raza}\n`;
  infomascota += `Edad: ${mascotas[sender].edad} años\n`;
  infomascota += `Estado de salud: ${mascotas[sender].estadoSalud}\n`;
  infomascota += `Vida: ${mascotas[sender].vida} / 100\n`;

  if (text && text.startsWith('!nombre')) {
    let nuevoNombre = text.split(' ')[1];
    if (nuevoNombre) {
      mascotas[sender].nombre = nuevoNombre;
      conn.reply(M.chat, `¡El nombre de tu mascota ha sido cambiado a ${nuevoNombre}!`, M);
    } else {
      conn.reply(M.chat, 'Por favor, ingresa un nombre válido para la mascota.', M);
    }
    return;
  }

  if (text && text.startsWith('!alimentar')) {
    mascotas[sender].edad += 1;
    mascotas[sender].vida = Math.min(mascotas[sender].vida + 10, 100);
    // Ganar monedas al alimentar a la mascota
    mascotas[sender].monedas += 5;
    conn.reply(M.chat, `¡Has alimentado a tu mascota! Ahora tiene ${mascotas[sender].edad} años y ${mascotas[sender].vida} de vida. Ganaste 5 monedas. Tienes ${mascotas[sender].monedas} monedas.`, M);
    return;
  }

  if (text && text.toLowerCase() === 'infomascota') {
    conn.reply(M.chat, infomascota, M);
  } else if (text && text.toLowerCase().startsWith('!comprar')) {
    let item = text.split(' ')[1];
    if (!item || isNaN(item)) {
      conn.reply(M.chat, 'Por favor, elige un número de producto válido (1-5).', M);
      return;
    }

    item = parseInt(item);

    if (item < 1 || item > 5) {
      conn.reply(M.chat, 'Número de producto inválido. Elige un número entre 1 y 5.', M);
      return;
    }

    if (item === 1 || item === 2) {
      if (mascotas[sender].monedas >= 10) {
        mascotas[sender].vida = Math.min(mascotas[sender].vida + 10, 100);
        mascotas[sender].monedas -= 10;
        conn.reply(M.chat, `¡Has comprado comida para tu mascota! Ahora tiene ${mascotas[sender].vida} de vida. Te quedan ${mascotas[sender].monedas} monedas.`, M);
      } else {
        conn.reply(M.chat, 'No tienes suficientes monedas para comprar este producto.', M);
      }
    } else if (item === 3) {
      if (mascotas[sender].monedas >= 30) {
        mascotas[sender].monedas -= 30;
        conn.reply(M.chat, `¡Has comprado una cama para tu mascota! Te quedan ${mascotas[sender].monedas} monedas.`, M);
      } else {
        conn.reply(M.chat, 'No tienes suficientes monedas para comprar este producto.', M);
      }
    } else if (item === 4) {
      if (mascotas[sender].monedas >= 15) {
        mascotas[sender].monedas -= 15;
        conn.reply(M.chat, `¡Has comprado un juguete para tu mascota! Te quedan ${mascotas[sender].monedas} monedas.`, M);
      } else {
        conn.reply(M.chat, 'No tienes suficientes monedas para comprar este producto.', M);
      }
    } else if (item === 5) {
      if (mascotas[sender].monedas >= 20) {
        mascotas[sender].monedas -= 20;
        conn.reply(M.chat, `¡Has comprado medicina para tu mascota! Te quedan ${mascotas[sender].monedas} monedas.`, M);
      } else {
        conn.reply(M.chat, 'No tienes suficientes monedas para comprar este producto.', M);
      }
    }
    return;
  }

  if (text && text.toLowerCase() === '!monedas') {
    conn.reply(M.chat, `Tienes ${mascotas[sender].monedas} monedas.`, M);
    return;
  } else {
    conn.reply(M.chat, tienda, M);
  }

  if (!timer[sender]) {
    timer[sender] = setInterval(() => {
      if (mascotas[sender].vida > 0) {
        mascotas[sender].vida -= 1;
        if (mascotas[sender].vida <= 0) {
          mascotas[sender].estadoSalud = 'En peligro';
        }
      }
    }, 60000);
  }
};

handler.command = ['tienda', 'petshop', 'infomascota', 'nombre', 'alimentar', 'comprar', 'monedas'];
export default handler;

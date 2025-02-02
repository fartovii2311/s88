let mascotas = {};
let timer = {};

let handler = async (m, { conn, text, sender }) => {
  let tienda = `🐶🐱🐾 *Tienda de Mascotas* 🐾🐱🐶\n\n`;
  tienda += `🦴 *1.* Comida para perros - 10 monedas\n`;
  tienda += `🐟 *2.* Comida para gatos - 10 monedas\n`;
  tienda += `🛏 *3.* Cama para mascotas - 30 monedas\n`;
  tienda += `🎾 *4.* Juguete para mascotas - 15 monedas\n`;
  tienda += `💊 *5.* Medicina para mascotas - 20 monedas\n`;
  tienda += `\n💰 Usa *!comprar <número>* para adquirir un producto.`;

  if (!mascotas[sender]) {
    mascotas[sender] = {
      nombre: 'Max',
      raza: 'Labrador',
      edad: 3,
      estadoSalud: 'Excelente',
      vida: 100 // Vida inicial
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
      conn.reply(m.chat, `¡El nombre de tu mascota ha sido cambiado a ${nuevoNombre}!`, m);
    } else {
      conn.reply(m.chat, 'Por favor, ingresa un nombre válido para la mascota.', m);
    }
    return;
  }

  if (text && text.startsWith('!alimentar')) {
    mascotas[sender].edad += 1;
    mascotas[sender].vida = Math.min(mascotas[sender].vida + 10, 100); // Alimenta y aumenta la vida, sin exceder 100
    conn.reply(m.chat, `¡Has alimentado a tu mascota! Ahora tiene ${mascotas[sender].edad} años y ${mascotas[sender].vida} de vida.`, m);
    return;
  }

  if (text && text.toLowerCase() === 'infomascota') {
    conn.reply(m.chat, infomascota, m);
  } else {
    conn.reply(m.chat, tienda, m);
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

handler.command = ['tienda', 'petshop', 'infomascota', 'nombre', 'alimentar'];
export default handler;

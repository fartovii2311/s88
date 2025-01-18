import { canLevelUp, xpRange } from '../lib/levelling.js';
import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0] 
    ? m.mentionedJid[0] 
    : m.fromMe 
    ? conn.user.jid 
    : m.sender;

  let prefijos = {
    '+51': 'Perú',
    '+52': 'México',
    '+54': 'Argentina',
    '+55': 'Brasil',
    '+56': 'Chile',
    '+57': 'Colombia',
    '+58': 'Venezuela',
    '+591': 'Bolivia',
    '+592': 'Guyana',
    '+593': 'Ecuador',
    '+595': 'Paraguay',
    '+598': 'Uruguay',
    '+34': 'España',
    '+506': 'Costa Rica',
    '+507': 'Panamá',
    '+503': 'El Salvador',
    '+502': 'Guatemala',
    '+504': 'Honduras',
    '+505': 'Nicaragua',
    '+53': 'Cuba',
    '+1-787': 'Puerto Rico',
    '+1-809': 'República Dominicana',
    '+1-868': 'Trinidad y Tobago',
    '+1-246': 'Barbados',
    '+1-473': 'Granada',
    '+1-784': 'San Vicente y las Granadinas',
    '+1-721': 'Sint Maarten',
    '+1-649': 'Islas Turcas y Caicos',
    '+1-345': 'Islas Caimán',
    '+1-242': 'Bahamas',
    '+1-284': 'Islas Vírgenes Británicas',
    '+1-767': 'Dominica',
    '+1-441': 'Bermuda',
    '+1-829': 'República Dominicana',
    '+1-849': 'República Dominicana'
  };

  let numeroCompleto = '+' + who.replace('@s.whatsapp.net', '');
  let nacionalidad = 'Desconocida';
  for (let prefijo in prefijos) {
    if (numeroCompleto.startsWith(prefijo)) {
      nacionalidad = prefijos[prefijo];
      break;
    }
  }

  let bio = await conn.fetchStatus(who).catch(() => ({ status: 'Sin información' }));
  let biot = bio.status || 'Sin información';
  let user = global.db.data.users[who];
  let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://i.ibb.co/JndpnfX/LynxAI.jpg');
  let { exp = 0, corazones = 0, name = '-', registered = false, age = '-', level = 0 } = user || {};
  let { min, xp, max } = xpRange(level, global.multiplier || 1);
  let prem = global.prems.includes(who.split`@`[0]);
  let username = conn.getName(who) || 'Usuario';

  let txt = `🎭 *P E R F I L  D E  U S U A R I O* 🎭\n\n`;
  txt += `💡 *Nombre*: ${name || username}\n`;
  txt += `🎂 *Edad*: ${registered ? `${age} años` : 'No registrado'}\n`;
  txt += `📞 *Número*: ${PhoneNumber(numeroCompleto).getNumber('international')}\n`;
  txt += `🌍 *Nacionalidad*: ${nacionalidad}\n`;
  txt += `📌 *Link directo*: (https://wa.me/${who.split`@`[0]})\n`;
  txt += `❤️ *Corazones*: ${corazones}\n`;
  txt += `📈 *Nivel*: ${level}\n`;
  txt += `⚡ *XP*: Total ${exp} (${exp - min}/${xp})\n`;
  txt += `🌟 *Premium*: ${prem ? 'Sí' : 'No'}\n`;
  txt += `📝 *Estado*: ${biot}\n`;
  txt += `🕒 *Registrado*: ${registered ? 'Sí' : 'No'}\n`;

  await conn.reply(m.chat, txt, m, { image: { url: pp }, caption: txt });
};

handler.help = ['perfil'];
handler.tags = ['start'];
handler.command = /^(perfil|profile)$/i;
handler.register = true;

export default handler;

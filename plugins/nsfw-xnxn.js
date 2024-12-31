import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {

handler.help = ['xnxxsearch'].map(v => v + ' <query>');
handler.tags = ['search'];
handler.command = ['xnxxsearch', 'xnxxs'];
handler.register = true;

export default handler;

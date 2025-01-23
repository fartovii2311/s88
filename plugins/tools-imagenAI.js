
import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) throw '*🌸 Ingresa un texto para generar una imagen con un estilo floral femenino*';
m.react('🌺');
await conn.sendMessage(m.chat, {text: '*🌷 Por favor espera, estamos diseñando tu imagen con un toque floral...*'}, {quoted: m});
try {
const response = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text + ' mujer rodeada de flores hermosas')}`);
if (!response.ok) throw new Error('Network response was not ok');
const buffer = await response.buffer();
m.react('✔️');
await conn.sendMessage(m.chat, {image: buffer}, {quoted: m});
} catch (error) {
console.error(error);
throw '*🚨 Lo sentimos, ocurrió un error 😔*';
}
};
handler.tags = ['tools'];
handler.help = ['genimgflores'];
handler.command = ['genimgflores', 'imggflores'];
export default handler;
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import axios from 'axios'
import fs from 'fs'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto }  = (await import(global.baileys))

let handler = m => m
handler.before = async function (m, { conn } ) {

// redes
global.tk = 'https://www.tiktok.com/'
global.ths = 'https://www.threads.net/'
global.yt = 'https://youtube.com/'
global.yt2 = 'https://youtu.be/'
global.ig = 'https://www.instagram.com/'
global.md = 'https://github.com/'
global.fb = ''
global.paypal = 'https://paypal.me/OficialGD'
global.asistencia = 'https://wa.me/message/'
global.tg = 'https://t.me/' // canal

// canales
global.canal1 = "https://whatsapp.com/channel/"
global.canal2 = "https://whatsapp.com/channel/"
global.canal3 = "https://whatsapp.com/channel/"
global.canal4 = "https://whatsapp.com/channel/"
global.canal5 = "https://whatsapp.com/channel/"

// grupos (algunos pueden estar repetidos con otros, es temporal)
global.nna = 'https://whatsapp.com/channel/' //CANAL UPDATE
global.nn2 = 'https://t.me/globalgb'
global.nna2 = 'https://chat.whatsapp.com/' //Help
global.nn = 'https://chat.whatsapp.com/' //Grupo 1
global.nnn = 'https://chat.whatsapp.com/' //Grupo 2
global.nnnt = 'https://chat.whatsapp.com/' //Grupo 3
global.nnntt = 'https://chat.whatsapp.com/' //Grupo 4
global.nnnttt = 'https://chat.whatsapp.com/' //Grupo 5
global.nnnttt1 = 'https://chat.whatsapp.com/' //Grupo 6 COL
global.nnnttt2 = 'https://chat.whatsapp.com/' //Grupo 7 COL
global.nnnttt3 = 'https://chat.whatsapp.com/' //Grupo 8 COL
global.nnnttt4 = 'https://chat.whatsapp.com/' //Grupo 9 COL
global.nnnttt5 = 'https://chat.whatsapp.com/' //A.T.M.M

// Imágenes locales
global.imagen1 = fs.readFileSync('./media/menus/Menu3.jpg')
global.imagen2 = fs.readFileSync('./media/menus/img1.jpg')
global.imagen3 = fs.readFileSync('./media/menus/img2.jpg')
global.imagen4 = fs.readFileSync('./media/menus/img3.jpg')
global.imagen5 = fs.readFileSync('./media/menus/img4.jpg')
global.imagen6 = fs.readFileSync('./media/menus/img5.jpg')
global.imagen7 = fs.readFileSync('./media/menus/img6.jpg')
global.imagen8 = fs.readFileSync('./media/menus/img7.jpg')
global.imagen9 = fs.readFileSync('./media/menus/img8.jpg')
global.imagen10 = fs.readFileSync('./media/menus/img9.jpg')
global.imagen11 = fs.readFileSync('./media/menus/img10.jpg')
global.imagen12 = fs.readFileSync('./media/menus/img11.jpg')
global.imagen13 = fs.readFileSync('./media/menus/img12.jpg')

// Imágenes en la nube
global.img = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img2 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img3 = 'https://i.ibb.co/Y7mhFdf/file.jpg' //ft rectangular
global.img5 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img6 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img7 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img8 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img9 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img10 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img11 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img12 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img13 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img14 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img15 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img17 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img18 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img19 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img20 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img21 = 'https://i.ibb.co/Y7mhFdf/file.jpg'
global.img21 = 'https://i.ibb.co/Y7mhFdf/file.jpg' // imagen paypal

global.welgata = [ig, yt2, yt2, ig, md, ig, yt, paypal, yt2, yt2, ig, fb, tg]
global.redesMenu = [nna, nn2, nn, nnn, nnnt, nnntt, nnnttt, nnnttt1, nnnttt2, nnnttt3, nnnttt4, md, ig, paypal, yt, asistencia, fb, tg]
global.gataMenu = [img, img2, img6, img7, img8, img9, img13, img14, img15, img17, img18, img19, img20, img21]
global.gataImg = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8, imagen9, imagen10, imagen11, imagen12, imagen13]
global.accountsgb = [canal1, canal2, canal3, canal4, canal5, tk, ig, yt, paypal, fb, ths, md, asistencia, tg].getRandom()

global.canalIdGB = ["120363377833048768@newsletter", "120363220939514640@newsletter", "120363220939514640@newsletter", "120363368073378190@newsletter", "120363374486687514@newsletter", "120363183614708156@newsletter"]
global.canalNombreGB = ["Nino Nakano Bot 💫", "Free Codes Titans 🐈", "Genesis Bot 🤩", "Crow Bot ✨", "Lynx Bot ☁️", 'Sylphiettes Bot']

global.channelRD = await getRandomChannel()

global.fakeChannel = { contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name }, externalAdReply: { title: wm, body: vs, mediaType: 1, renderLargerThumbnail: false, previewType: `PHOTO`, thumbnailUrl: gataImg.getRandom(), thumbnail: imagen1, sourceUrl: accountsgb }}}, { quoted: m }
global.fakeChannel2 = { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }, forwardingScore: 200, externalAdReply: { title: packname, body: author, thumbnailUrl: gataMenu.getRandom(), sourceUrl: accountsgb, mediaType: 1, renderLargerThumbnail: false }}
global.fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
}

export default handler

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdGB.length)
let id = canalIdGB[randomIndex]
let nombre = canalNombreGB[randomIndex]
return { id, nombre }
} 	

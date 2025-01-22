import gplay from 'google-play-scraper'
import fetch from 'node-fetch'
let handler = async (m, {conn, args, usedPrefix: prefix, command, text}) => {
if (!args[0]) throw `*❌ Ingresa un link de la PlayStore. Ejemplo:*\n\n ${prefix + command} https://play.google.com/store/apps/details?id=com.facebook.lite`
m.react(rwait)
const url = `${args[0]}`;
const packageName = url.split("=")[1];
console.log(packageName);
const info = await gplay.app({appId: packageName})
const h = info.title
console.log(h + `\n` + info.appId)
let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`
conn.sendFile(m.chat, link, h + '.apk', ``, m, false, { mimetype: 'application/videos.android.package-archive', asDocument: true })
m.react(done)
}
handler.help = ['dlplaystore *<url>*'];
handler.tags = ['dl'];
handler.command = /^(dlplaystore)$/i;
export default handler



/* import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.reply(m.chat, '*\`Ingrese el nombre de la APK que quiera buscar. 🤍\`*', m,rcanal);
  }
    await m.react('🕓');
  try {
    const fallbackUrl = `https://delirius-apiofc.vercel.app/download/apk?query=${text}`;
    const response = await fetch(fallbackUrl);
    const data = await response.json();

    const apkData = data.data;
    let message = `
📲 *Información de la APK* 📲
📌 *Nombre:* ${apkData.name}
🧑‍💻 *Desarrollador:* ${apkData.developer || 'N/A'}
📦 *Package:* ${apkData.id}
🕒 *Última actualización:* ${apkData.publish}
📥 *Tamaño:* ${apkData.size}
⭐ *Calificación:* ${apkData.stats.rating.average || 'N/A'} (Total: ${apkData.stats.rating.total || 0})
📈 *Descargas:* ${apkData.stats.downloads || 0}`;

    await conn.sendFile(m.chat, apkData.image, 'thumbnail.jpg', message, m,rcanal,fake);

    if (apkData.size.includes('GB') || parseFloat(apkData.size.replace(' MB', '')) > 999) {
      return await conn.sendMessage(m.chat, { text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*' }, { quoted: m });
    }

    await conn.sendMessage(m.chat, {
      document: { url: apkData.download },
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${apkData.name}.apk`,
      caption: null
    }, { quoted: m });
  await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️')
  }
};

handler.help = ['apk *<nombre>*'];
handler.tags = ['dl'];
handler.command = /^(apk|modapk|dapk2|aptoide|aptoidedl)$/i;

export default handler;/*

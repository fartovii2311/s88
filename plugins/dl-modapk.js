import { search, download } from 'aptoide-scraper';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  if (!text) throw conn.reply(m.chat, '*\`Ingrese el nombre de la APK que quiera buscar. 🤍\`*', m,rcanal);

  try {
    const searchA = await search(text);

    if (searchA.length === 0) {
      const fallbackUrl = `https://delirius-apiofc.vercel.app/download/apk?query=${text}`;
      const response = await fetch(fallbackUrl);
      const data = await response.json();

      const apkData = data.data;
      let fallbackResponse = `📲 *APK desde API Alternativa* 📲\n\n📌 *Nombre:* ${apkData.name}\n📦 *Package:* ${apkData.package}\n🕒 *Última actualización:* ${apkData.publish}\n📥 *Tamaño:* ${apkData.size}`;

      await conn.sendFile(m.chat, apkData.image, 'thumbnail.jpg', fallbackResponse, m);

      if (apkData.size.includes('GB') || parseFloat(apkData.size.replace(' MB', '')) > 999) {
        return await conn.sendMessage(m.chat, { text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*' }, { quoted: m });
      }

      await conn.sendMessage(m.chat, { document: { url: apkData.download }, mimetype: 'application/vnd.android.package-archive', fileName: `${apkData.name}.apk`, caption: null }, { quoted: m });
    } else {
      const data5 = await download(searchA[0].id);

      let response = `📲 *Descargador de Aptoide* 📲\n\n📌 *Nombre:* ${data5.name}\n📦 *Package:* ${data5.package}\n🕒 *Última actualización:* ${data5.lastup}\n📥 *Tamaño:* ${data5.size}`;

      await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', response, m);

      if (data5.size.includes('GB') || parseFloat(data5.size.replace(' MB', '')) > 999) {
        return await conn.sendMessage(m.chat, { text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*' }, { quoted: m });
      }

      await conn.sendMessage(m.chat, { document: { url: data5.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: `${data5.name}.apk`, caption: null }, { quoted: m });
    }

  } catch (error) {
    console.error(error);
    throw `*[❗] Hubo un error al buscar la APK.*`;
  }
};

handler.help = ['apk *<nombre>*'];
handler.tags = ['dl'];
handler.command = /^(apk|modapk|dapk2|aptoide|aptoidedl)$/i;

export default handler;

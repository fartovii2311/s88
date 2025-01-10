import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.reply(m.chat, '*\`Ingrese el nombre de la APK que quiera buscar. 🤍\`*', m,rcanal);
  }

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

    await conn.sendFile(m.chat, apkData.image, 'thumbnail.jpg', message, m,rcanl,fake);

    if (apkData.size.includes('GB') || parseFloat(apkData.size.replace(' MB', '')) > 999) {
      return await conn.sendMessage(m.chat, { text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*' }, { quoted: m });
    }

    await conn.sendMessage(m.chat, {
      document: { url: apkData.download },
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${apkData.name}.apk`,
      caption: null
    }, { quoted: m });

  } catch (error) {
    console.error(error);
  }
};

handler.help = ['apk *<nombre>*'];
handler.tags = ['dl'];
handler.command = /^(apk|modapk|dapk2|aptoide|aptoidedl)$/i;

export default handler;

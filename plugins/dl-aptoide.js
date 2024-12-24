const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
  if (!text) throw conn.reply(m.chat, '*\`Ingrese el nombre de la APK que quiera buscar. 🤍\`*', m);

  try {
    const searchA = await search(text);
    const apkId = searchA[0].id;  
    const data5 = await download(apkId);

    const { name, size, image, download: downloadLink, developer } = data5.data;

    let response = `📲 *Descargador de Aptoide* 📲\n\n📌 *Nombre:* ${name}\n📦 *Package:* ${apkId}\n🕒 *Última actualización:* ${data5.data.publish}\n📥 *Tamaño:* ${size}\n👨‍💻 *Desarrollador:* ${developer}`;

    await conn.sendFile(m.chat, image, 'thumbnail.jpg', response, m);

    if (size.includes('GB') || parseFloat(size.replace(' MB', '').replace(',', '')) > 999) {
      return await conn.sendMessage(m.chat, {text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*'}, {quoted: m});
    }

    await conn.sendMessage(m.chat, {
      document: {url: downloadLink},
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${name}.apk`,
      caption: null
    }, {quoted: m});

  } catch (error) {
    throw `*[❗] Error, no se encontraron resultados para su búsqueda.*`;
  }
};

handler.help = ['apk *<nombre>*'];
handler.tags = ['dl'];
handler.command = /^(apk|modapk|dapk2|aptoide|aptoidedl)$/i;

export default handler;

const search = async (text) => {
  const response = await fetch(`${apis}/search/apk?query=${text}`);
  const data = await response.json();
  return data.results;
};

const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
  if (!text) throw conn.reply(m.chat, '*\`Ingrese el nombre de la APK que quiera buscar. 🤍\`*', m);

  try {
    const searchA = await search(text);

    if (!searchA || !searchA.length) {
      throw '*[❗] No se encontraron resultados para su búsqueda.*';
    }

    const { name, size, image, download, developer } = searchA[0];

    let response = `📲 *Descargador de Aptoide* 📲\n\n📌 *Nombre:* ${name}\n📦 *Package:* ${searchA[0].id}\n🕒 *Última actualización:* ${searchA[0].publish}\n📥 *Tamaño:* ${size}\n👨‍💻 *Desarrollador:* ${developer}`;

    await conn.sendFile(m.chat, image, 'thumbnail.jpg', response, m);

    if (size.includes('GB') || parseFloat(size.replace(' MB', '').replace(',', '')) > 999) {
      return await conn.sendMessage(m.chat, {text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*'}, {quoted: m});
    }

    await conn.sendMessage(m.chat, {
      document: {url: download},
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${name}.apk`,
      caption: null
    }, {quoted: m});

  } catch (error) {
    throw error;
  }
};

handler.help = ['apk *<nombre>*'];
handler.tags = ['dl'];
handler.command = /^(apk|modapk|dapk2|aptoide|aptoidedl)$/i;

export default handler;

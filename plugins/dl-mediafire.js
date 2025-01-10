import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un link de MediaFire`, m, rcanal);
  await m.react('🕓');

  try {
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`);
    let json = await api.json();
    let { filename, type, size, uploaded, ext, mimetype, download: dl_url } = json.data.response;
    
    m.reply(`*${filename}*\n\n- *Tipo :* ${type}\n- *Tamaño :* ${size}\n- *Creado :* ${uploaded}`);
    await m.react('✅');
    await conn.sendFile(m.chat, dl_url, filename, null, m, null, { mimetype: ext, asDocument: true });
  } catch (error) {
    console.error('❌ Error with the first API:', error.message);
    try {
      let api2 = await fetch(`https://api.vreden.web.id/api/mediafiredl?url=${text}`);
      let json2 = await api2.json();

      if (json2.status === 200 && json2.result && json2.result.length > 0) {
        const { nama, mime, size, link } = json2.result[0];
        
        m.reply(`*${nama}*\n\n- *Mime:* ${mime}\n- *Tamaño:* ${size}`);
        await m.react('✅');
        await conn.sendFile(m.chat, link, nama, null, m, null, { mimetype: mime, asDocument: true });
      } else {
        console.log('No valid data received from the second API.');
      }
    } catch (error2) {
      console.error('❌ Error with the second API:', error2.message);
      await m.react('❌');
    }
  }
};

handler.help = ['mediafire *<url>*'];
handler.tags = ['dl'];
handler.command = ['mediafire'];

export default handler;

// [ ❀ APK DL ]
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '❀ Ingresa el nombre de la app que quieres buscar', m,rcanal);
  }

  await m.react('🕓');

  try {
    let api = await fetch(`https://api.giftedtech.my.id/api/download/apkdl?apikey=gifted&appName=${text}`);
    let json = await api.json();
    let { appname, appicon, developer, download_url, mimetype } = json.result;
    let txt = `- Nombre: ${appname}
- Creador: ${developer}\n> Porfavor un momento se este enviando su pedido..`;
    
    await conn.sendFile(m.chat, appicon, 'defoult.jpg', txt, m,rcanal,fake);
    await conn.sendMessage(m.chat, { 
      document: { url: download_url }, 
      mimetype: mimetype, 
      fileName: `${appname}.apk`, 
      caption: null 
    }, { quoted: m });

    await m.react('✅'); 
  } catch (error) {
    console.error('Error al obtener el APK:', error);
    await m.react('❌');
  }
};

handler.help = ["apk *<text>*"]
handler.command = /^(apk)$/i;
handler.corazones = 2;
handler.tags = ['dl'];
handler.register = true;

export default handler;

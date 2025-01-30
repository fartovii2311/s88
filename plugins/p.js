import axios from 'axios';
import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, 'Por favor, proporciona la URL de la página del APK.', m);
  }

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/getapk?key=user1&url=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl);
    
    if (!response.data.success) {
      return conn.reply(m.chat, 'No se pudieron obtener los detalles del APK.', m);
    }

    const apkDetails = response.data.data;
    
    const extension = path.extname(apkDetails.downloadLink).toLowerCase();
    let fileType = 'application/vnd.android.package-archive';
    let fileName = `${apkDetails.title}.apk`;

    if (extension === '.zip') {
      fileType = 'application/zip';
      fileName = `${apkDetails.title}.zip`;
    }

    const filePath = path.join('./temp', fileName);

    const writer = fs.createWriteStream(filePath);
    const downloadResponse = await axios({
      url: apkDetails.downloadLink,
      method: 'GET',
      responseType: 'stream'
    });

    downloadResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    await conn.sendMessage(m.chat, { document: fs.readFileSync(filePath), mimetype: fileType, fileName }, { quoted: m });

    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Hubo un error al obtener o enviar el archivo. Intenta nuevamente más tarde.', m);
  }
};

handler.help = ['apk4 <url>'];
handler.tags = ['dl'];
handler.command = ['apk4'];
export default handler;

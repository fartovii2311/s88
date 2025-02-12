let handler = async (m, { conn }) => {

  const imageUrl = "https://i.ibb.co/JndpnfX/LynxAI.jpg";

  const mensaje = `
🌟 *¡Hola a todos!* 🌟

📢 Это сообщение, отправленное с *моего бота WhatsApp*.

🎨 *Красивый дизайн* для всех:

---

*🔧 Funcionalidades:*
- ✅ *Descargar Videos*: Descarga videos de YouTube, TikTok y más.
- ✅ *Enviar Stickers*: Convierte imágenes y videos en stickers para WhatsApp.
- ✅ *Descargar Música*: Descargar música directamente desde tu WhatsApp.
- ✅ *Enlaces Rápidos*: Accede fácilmente a tus grupos y recursos favoritos.
- ✅ *Automatización*: Realiza tareas automáticas como enviar recordatorios o mensajes.

---

*🔗 Enlaces a mis grupos:*
- 🟢 [ *Lynx -ai* ](https://chat.whatsapp.com/IJYbkCk5lLsBNi463rjZqg) 

---

*📡 Canal de Información:*
- 📺 [ *Canal de Lynx* ](https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F)
- 📺 [ *Canal de Darkcore* ](https://whatsapp.com/channel/0029Vaxb5xr7z4koGtOAAc1Q)

---

💬 *¡Gracias por estar aquí! Si tienes alguna duda, no dudes en preguntar.* 

📅 *¡Nos vemos pronto!*

- _*Tu bot favorito*_ ❤️

---

🌐 *¿Tienes alguna sugerencia?*

- 🟢 [ *DarkCore* ]( https://wa.me/+79883576985?text=Hola ) 
`;

  await conn.sendFile(m.chat, imageUrl, "imagen.jpg", mensaje,m,rcanal,fake);

};

handler.command = ['grupo', 'group', 'Grupos', 'GRUPO'];
handler.tags = ['group'];
handler.help = ['групп'];
export default handler;

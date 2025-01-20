let handler = async (m, { conn }) => {

  const imageUrl = "https://i.ibb.co/JndpnfX/LynxAI.jpg";

  const mensaje = `
🌟 *¡Hola a todos!* 🌟

📢 Este es un mensaje enviado desde *mi bot de WhatsApp*.

🎨 *Diseño Bonito* para todos:

---

*🔧 Funcionalidades:*
- ✅ *Descargar Videos*: Descarga videos de YouTube, TikTok y más.
- ✅ *Enviar Stickers*: Convierte imágenes y videos en stickers para WhatsApp.
- ✅ *Descargar Música*: Descargar música directamente desde tu WhatsApp.
- ✅ *Enlaces Rápidos*: Accede fácilmente a tus grupos y recursos favoritos.
- ✅ *Automatización*: Realiza tareas automáticas como enviar recordatorios o mensajes.

---

*🔗 Enlaces a mis grupos:*
- 🟢 [*Grupo 1*](https://chat.whatsapp.com/KVpZsgm9wHG5ooZPsFVCac) 
- 🔵 [*Grupo 2*](https://chat.whatsapp.com/D58CSUpwMH2CQi3iLitIWp)

---

*📡 Canal de Información:*
- 📺 [*Canal de Lynx*](https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F)
- 📺 [*Canal de Darkcore*](https://whatsapp.com/channel/0029Vaxb5xr7z4koGtOAAc1Q)

---

💬 *¡Gracias por estar aquí! Si tienes alguna duda, no dudes en preguntar.* 

📅 *¡Nos vemos pronto!*

- _*Tu bot favorito*_ ❤️

---

🌐 *¿Tienes alguna sugerencia?*

- 🟢 [*DarkCore*](https://wa.me/51912345678) 
`;

  await conn.sendFile(m.chat, imageUrl, "imagen.jpg", mensaje,m,rcanal,fake);

};

handler.command = /^(|GRUPOS|grupos|Grupo|)$/i;

export default handler;

let handler = async (m, { conn }) => {

  const imageUrl = "https://i.ibb.co/JndpnfX/LynxAI.jpg";

  const mensaje = `
🌟 *¡Hola a todos!* 🌟

📢 Este es un mensaje enviado desde *mi bot de WhatsApp*.

🎨 *Diseño Bonito* para todos:

---

**🔧 Funcionalidades:**
- ✅ *Descargar Videos*: Descarga videos de YouTube, TikTok y más.
- ✅ *Enviar Stickers*: Convierte imágenes y videos en stickers para WhatsApp.
- ✅ *Reproducir Música*: Escucha música directamente desde tu WhatsApp.
- ✅ *Enlaces Rápidos*: Accede fácilmente a tus grupos y recursos favoritos.
- ✅ *Generar Imágenes*: Crea imágenes personalizadas con texto y emojis.
- ✅ *Crear Encargos*: Haz pedidos o solicitudes rápidamente.
- ✅ *Automatización*: Realiza tareas automáticas como enviar recordatorios o mensajes.

---

**🔗 Enlaces a mis grupos:**
- 🟢 [**Grupo 1**](https://chat.whatsapp.com/KVpZsgm9wHG5ooZPsFVCac) | *Únete a este grupo para más información*
- 🔵 [**Grupo 2**](https://chat.whatsapp.com/D58CSUpwMH2CQi3iLitIWp) | *Participa en el debate y más*

---

**📡 Canal de Información:**
- 📺 [**Canal de Noticias**](https://t.me/TuCanalDeNoticias) | *Únete a nuestro canal para noticias y actualizaciones.*

---

💬 *¡Gracias por estar aquí! Si tienes alguna duda, no dudes en preguntar.* 

📅 *¡Nos vemos pronto!*

- _**Tu bot favorito**_ ❤️

---

🌐 **¿Tienes alguna sugerencia?** Envíala por mensaje privado. ¡Estoy aquí para ayudarte!
`;

  await conn.sendFile(m.chat, imageUrl, "imagen.jpg", mensaje);

};

handler.command = /^(|GRUPOS|grupos|Grupo|)$/i;

export default handler;

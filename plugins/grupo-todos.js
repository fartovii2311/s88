let handler = async (m, { conn }) => {

  const imageUrl = "https://i.ibb.co/JndpnfX/LynxAI.jpg";

  const mensaje = `
🌟 *¡Hola a todos!* 🌟

📢 Este es un mensaje enviado desde mi bot de WhatsApp.

🎨 *Diseño Bonito*:
- ✅ *Funcionalidad 1*: Descripción corta.
- ✅ *Funcionalidad 2*: Descripción corta.
- ✅ *Funcionalidad 3*: Descripción corta.

🔗 *Enlaces*:
- 🟢 [Grupo 1](https://chat.whatsapp.com/KVpZsgm9wHG5ooZPsFVCac)
- 🔵 [Grupo 2](https://chat.whatsapp.com/D58CSUpwMH2CQi3iLitIWp)

💬 ¡Gracias por estar aquí! Si tienes alguna duda, no dudes en preguntar.

📅 ¡Nos vemos pronto!

- _Tu bot favorito_ ❤️
`;

  // Enviar el mensaje e imagen al chat donde se ejecutó el comando
  await conn.sendMessage(m.chat, { 
    image: { url: imageUrl },
    caption: mensaje
  });
};

handler.command = /^(grupo|GRUPOS|grupos|Grupo|)$/i;

export default handler;

let handler = async (m, { conn }) => {
  const enlacesGrupos = [
    "https://chat.whatsapp.com/KVpZsgm9wHG5ooZPsFVCac",
    "https://chat.whatsapp.com/D58CSUpwMH2CQi3iLitIWp"
  ];

  const imageUrl = "https://i.ibb.co/JndpnfX/LynxAI.jpg";

  const mensaje = `
🌟 *¡Hola a todos mis grupos!* 🌟

📢 Este es un mensaje enviado desde mi bot de WhatsApp.

🎨 *Diseño Bonito*:
- ✅ *Funcionalidad 1*: Descripción corta.
- ✅ *Funcionalidad 2*: Descripción corta.
- ✅ *Funcionalidad 3*: Descripción corta.

🔗 *Enlaces a mis grupos*:
- 🟢 [Grupo 1](https://chat.whatsapp.com/KVpZsgm9wHG5ooZPsFVCac)
- 🔵 [Grupo 2](https://chat.whatsapp.com/D58CSUpwMH2CQi3iLitIWp)

💬 ¡Gracias por estar en mis grupos! Si tienes alguna duda, no dudes en preguntar.

📅 ¡Nos vemos pronto!

- _Tu bot favorito_ ❤️
`;

  let grupos = await conn.getAllChats();
  let gruposActivos = grupos.filter(chat => chat.isGroup);

  for (let grupo of gruposActivos) {
    await conn.sendMessage(grupo.id, { 
      image: { url: imageUrl },
      caption: mensaje
    });
  }

  await conn.sendMessage(m.chat, { text: '✅ Mensaje e imagen enviados a todos los grupos con éxito.' }, { quoted: m });
};

handler.command = /^(grupo|grupos|grupo aso|grupos aso|Grupo|Grupo aso)$/i;

export default handler;

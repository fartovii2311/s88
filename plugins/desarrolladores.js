const handler = async (m, { conn }) => {
    let gifUrl = "https://i.ibb.co/JndpnfX/LynxAI.jpg";
  
    let text = `
╭────────⚔──────╮  
 DESARROLLADORES  
╰────────⚔──────╯  
  
🔹 *SOBRE EL BOT:*  
  
🔹 *CONTACTO DE LOS DESARROLLADORES:*  
╭─────────────────────────╮  
│🏆 * - Equipo Oficial*  
│  
│📌 **: []  
│📌 **: []  
│📌 **: []  
╰─────────────────────────╯  
  
🔹 *AGRADECIMIENTOS:*  
  
🔹 *¿DUDAS O SUGERENCIAS?*  `.trim();
  
  
    await conn.sendMessage(
      m.chat,
      {
        video: { url: gifUrl },
        gifPlayback: true, 
        caption: text,
        mentions: [m.sender], 
      },
      { quoted: m }
    );
  };
  
  handler.command = /^(desarrolladores)$/i; 
  export default handler;

const handler = async (m, { conn }) => {
    let gifUrl = "https://i.ibb.co/JndpnfX/LynxAI.jpg";
  
    let text = `
╭───────⚔──────╮  
\t\t\tDESARROLLADORES  
╰───────⚔──────╯  
  
🔹 *SOBRE EL BOT:* 

- DESARROLLADO PARA ENTRETENER A TODA LA COMUNIDAD TEAM - DARK - OFICIAL

🔹 *CONTACTO DE LOS DESARROLLADORES:*  
╭─────────────────────────╮  
│🏆 * - Equipo Oficial*  
│  
│📌 *DARCORE*: [ +51968382008 ]  
│📌 **: [ +51917154203 ]  
│📌 **: []  
╰─────────────────────────╯  
  
🔹 *AGRADECIMIENTOS:*  
  
🔹 *¿DUDAS O SUGERENCIAS?*  

🔹 *GRUPOS OFICIALES*
- https://chat.whatsapp.com/D58CSUpwMH2CQi3iLitIWp
-
`.trim();
  
  
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

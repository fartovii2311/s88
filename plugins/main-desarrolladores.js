const handler = async (m, { conn }) => {
    let gifUrl = "https://i.ibb.co/Y7mhFdf/file.jpg";
  
    let text = `
╭───────⚔──────╮  
\t\tDESARROLLADORES  
╰───────⚔──────╯  
      
🔹 *SOBRE EL BOT:*   

1.DESARROLLADO PARA ENTRETENER A TODA LA COMUNIDAD TEAM - DARK - OFICIAL  

🔹 *CONTACTO DE LOS DESARROLLADORES:*  
╭─────────────────────────╮  
│🏆 * - Equipo Oficial- *  
│  
│📌 *DARCORE*: [ +51968382008 ]  
│📌 *Lynx*: [ +51917154203 ]   
│  
╰─────────────────────────╯  
      
🔹 *AGRADECIMIENTOS:*  
- DARKCORE  

🔹 *¿DUDAS O SUGERENCIAS?*  
- +51968382008  

🔹 *GRUPOS OFICIALES*  
1. https://chat.whatsapp.com/D58CSUpwMH2CQi3iLitIWp  
2. pronto
3. pronto
`.trim();

    await conn.sendFile(m.chat, gifUrl, 'image.jpg', text, m,rcanal,fake);
};

handler.command = /^(desarrolladores)$/i;  
handler.help = ['desarrolladores'];  
handler.tags = ['main'];  

export default handler;

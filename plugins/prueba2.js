import { spawn } from 'child_process';

let handler = async (m, { conn }) => {
    const imageUrl = 'https://i.ibb.co/Y7mhFdf/file.jpg'; 

    await conn.sendMessage(m.chat, { 
        image: { url: imageUrl },
        caption: '¡Bienvenido al bot! ¿Qué acción te gustaría realizar?',
        buttons: [
          { 
            buttonId: 'accion_1', 
            buttonText: { displayText: 'Acción 1' }, 
            type: 1 
          },
          { 
            buttonId: 'accion_2', 
            buttonText: { displayText: 'Acción 2' }, 
            type: 1 
          },
          { 
            buttonId: 'accion_3', 
            buttonText: { displayText: 'Acción 3' }, 
            type: 1 
          },
        ],
        viewOnce: true,
        headerType: 4 
      }, { quoted: m });
};

handler.help = ['start'];
handler.tags = ['general'];
handler.command = ['Start', 'start'];

export default handler;

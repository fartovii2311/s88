import { spawn } from 'child_process';

let handler = async (m, { conn, isROwner, text }) => {
    if (!process.send) return m.react('✖️');
    if (conn.user.jid == conn.user.jid) {
        await m.reply('🚩 Reiniciando Bot...');

        const restartPM2 = spawn('pm2', ['restart', 'Dark-Bot'], {
            stdio: 'inherit',
        });

        restartPM2.on('close', (code) => {
            if (code === 0) {
                console.log('PM2 proceso reiniciado correctamente');
            } else {
                console.log(`Error al reiniciar el proceso PM2, código de salida: ${code}`);
            }
        });

        process.exit();
    } else {
        return m.react('✖️');
    }
};

handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];

handler.rowner = true;

export default handler;

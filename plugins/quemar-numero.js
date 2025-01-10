import { setInterval } from 'timers';

const adminNumber = '212774102658@s.whatsapp.net'; 
const intervalTime = 5 * 60 * 1000;

const sendAutomaticReport = async (conn) => {
    const mensajeReporte = `🔔 *Reporte Automático*\n\n🕒 Hora: ${new Date().toLocaleString()}\n✅ El bot está funcionando correctamente.`;

    try {
        await conn.sendMessage(adminNumber, { text: mensajeReporte });
        console.log('Reporte automático enviado correctamente.');
    } catch (error) {
        console.error('Error al enviar el reporte automático:', error);
    }
};

const startAutomaticReports = (conn) => {
    console.log('Iniciando envíos automáticos de reportes cada 5 minutos...');
    setInterval(() => sendAutomaticReport(conn), intervalTime);
};

const handler = async (m, { conn }) => {
    startAutomaticReports(conn);
    await conn.reply(m.chat, '✅ Los reportes automáticos han sido configurados correctamente.', m);
};

handler.command = ['repo'];
handler.tags = ['admin'];
handler.help = ['quemar'];

export default handler; 

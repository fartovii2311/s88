import speed from 'performance-now';
import { exec } from 'child_process';
import { totalmem, freemem } from 'os';
import { sizeFormatter } from 'human-readable';

let handler = async (m, { conn }) => {
  let format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
  });

  let timestamp = speed();
  let latensi = speed() - timestamp;

  let _muptime = await new Promise((resolve) => {
    exec('cat /proc/uptime', (error, stdout) => {
      if (error) {
        resolve(0);
      } else {
        resolve(parseFloat(stdout.split(' ')[0]) * 1000);
      }
    });
  });
  let muptime = clockString(_muptime);

  // Información del sistema
  exec('uname -a', (error, stdout, stderr) => {
    let systemInfo = stdout.toString('utf-8').trim();

    exec('cat /proc/cpuinfo', (error, stdout, stderr) => {
      let cpuInfo = stdout.toString('utf-8');
      let procesador = (cpuInfo.match(/model name\s*:\s*(.*)/) || [])[1] || 'Unknown';
      let cpu = (cpuInfo.match(/cpu MHz\s*:\s*(.*)/) || [])[1] || 'Unknown';

      exec('uptime -p', (error, stdout, stderr) => {
        let uptime = stdout.toString('utf-8').trim();

        // Información del servidor (personalizable)
        let serverName = 'MyServer'; // Reemplaza con el nombre de tu servidor
        let serverLocation = 'Unknown'; // Reemplaza con la ubicación real si aplica
        let ping = `${latensi.toFixed(4)} ms`;
        let downloadSpeed = 'N/A'; // Puedes integrar una librería para medir velocidad
        let uploadSpeed = 'N/A';

        // Formatear respuesta
        let txt = '`乂  S P E E D - T E S T`\n\n';
        txt += `	✩   *Hosted By* : ${serverName}\n`;
        txt += `	✩   *Ubicación* : ${serverLocation}\n`;
        txt += `	✩   *Ping* : ${ping}\n`;
        txt += `	✩   *Speed Descarga* : ${downloadSpeed}\n`;
        txt += `	✩   *Speed Subida* : ${uploadSpeed}\n\n`;
        txt += `	✩   *Sistema* : ${systemInfo}\n`;
        txt += `	✩   *Procesador* : ${procesador}\n`;
        txt += `	✩   *CPU* : ${cpu} MHz\n`;
        txt += `	✩   *RAM* : ${format(totalmem() - freemem())} / ${format(totalmem())}\n`;
        txt += `	✩   *Tiempo de actividad* : ${muptime}\n\n`;
        txt += '> 🚩 Powered by MyBot';

        conn.reply(m.chat, txt, m);
      });
    });
  });
};

handler.help = ['ping'];
handler.tags = ['main'];
handler.command = ['ping', 'speed', 'p'];
export default handler;

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map((v) => v.toString().padStart(2, 0)).join('');
}

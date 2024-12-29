import speed from 'performance-now';
import { exec } from 'child_process';
import { totalmem, freemem } from 'os';
import { sizeFormatter } from 'human-readable';
import speedTest from 'speedtest-net';

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

  // Obtener velocidades de internet
  let internetSpeeds = await testInternetSpeed();

  // Información del sistema
  exec('uname -a', (error, stdout, stderr) => {
    let systemInfo = stdout.toString('utf-8').trim();

    exec('cat /proc/cpuinfo', (error, stdout, stderr) => {
      let cpuInfo = stdout.toString('utf-8');
      let procesador = (cpuInfo.match(/model name\s*:\s*(.*)/i) || [])[1]?.trim() || 'Unknown';
      let cpu = (cpuInfo.match(/cpu MHz\s*:\s*(.*)/i) || [])[1]?.trim() || 'Unknown';

      // Formatear respuesta
      let txt = '`乂  S P E E D - T E S T`\n\n';
      txt += `	✩   *Ping* : ${latensi.toFixed(4)} ms\n`;
      txt += `	✩   *Procesador* : ${procesador}\n`;
      txt += `	✩   *CPU* : ${cpu} MHz\n`;
      txt += `	✩   *RAM* : ${format(totalmem() - freemem())} / ${format(totalmem())}\n`;
      txt += `	✩   *Tiempo de actividad* : ${muptime}\n`;
      txt += `	✩   *Velocidad Descarga* : ${internetSpeeds.downloadSpeed} Mbps\n`;
      txt += `	✩   *Velocidad Subida* : ${internetSpeeds.uploadSpeed} Mbps\n`;

      conn.reply(m.chat, txt, m);
    });
  });
};

handler.help = ['ping'];
handler.tags = ['main'];
handler.command = ['ping', 'speed', 'p'];
export default handler;

// Función para medir velocidad de internet
async function testInternetSpeed() {
  try {
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true });
    return {
      downloadSpeed: result.download.bandwidth / 125000, // Convertir a Mbps
      uploadSpeed: result.upload.bandwidth / 125000, // Convertir a Mbps
    };
  } catch (error) {
    console.error('Error midiendo velocidad de internet:', error);
    return { downloadSpeed: 'N/A', uploadSpeed: 'N/A' };
  }
}

// Función para formatear tiempo
function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map((v) => v.toString().padStart(2, 0)).join('');
}

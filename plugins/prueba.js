case 'wallpaper':
    if (!text) {
        return sock.sendMessage(from, { text: '🚩 *Debes proporcionar un texto para generar el wallpaper*' }, { quoted: m });
    }

    try {
        let wallpaperUrl = `https://dark-core-api.vercel.app/api/img/wallpaper?key=api&text=${encodeURIComponent(text)}`;
        await sock.sendMessage(from, { image: { url: wallpaperUrl }, caption: '🖼️ Aquí tienes tu wallpaper generado' }, { quoted: m });
    } catch (error) {
        console.error('Error al obtener el wallpaper:', error);
        sock.sendMessage(from, { text: '❌ *Hubo un error al generar el wallpaper. Intenta nuevamente más tarde.*' }, { quoted: m });
    }
    break;


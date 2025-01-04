let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let banner = 'https://th.bing.com/th/id/R.3c44682163aece471be5e9be31853c5f?rik=ffeQ00G9XjrtnA&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f3%2f96%2fzCEgo6.jpg&ehk=AG0SIiF60d%2fqhZysxXu70HHHGZOSdQ5xhUnW0SeytiI%3d&risl=&pid=ImgRaw&r=0';
    let txt = `Nose?`;

    conn.sendMessage(m.chat, { 
      image: { url: banner }, 
      caption: "Dark", 
      footer: "dark buttones", 
      buttons: [
        { buttonId: "$ echo hola gei", buttonText: { displayText: "hola" } }, 
        { buttonId: "$ echo adios gei", buttonText: { displayText: "bye" } }
      ], 
      headerType: 6, 
      viewOnce: true, 
      contextInfo: {
        forwardedNewsletterMessageInfo: { 
          newsletterJid: '0@newsletter', 
          serverMessageId: '', 
          newsletterName: 'Test Bot' 
        }, 
        isForwarded: true
      }
    }, { quoted: m });

  } catch (error) {
    m.reply(`Error: ${error.message}`);
    m.react('✖️');
  }
}

handler.command = ['test'];
export default handler;

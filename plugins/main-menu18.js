let handler = async (m, { isPrems, conn }) => {

let img = '' 
let texto = `🌟 𝐌𝐄𝐍𝐔 🔞 𝐍𝐒𝐅𝐖 🌟

📌 *Categorías Principales:*
  ──────────────────
  🍑 **Genshin Impact**:
  • genshin

  👙 **Ropa y Temas de Verano**:
  • swimsuit
  • schoolswimsuit
  • bikini
  • topless
  • torncloth
  • pantypull
  • dress
  • shirtlift

  🐾 **Chicas y Fantasía**:
  • foxgirl
  • wolfgirl
  • bunnygirl
  • bunnyear
  • maid
  • idol
  • vampire
  • demon
  • hololive

  👓 **Accesorios y Detalles**:
  • sunglasses
  • glasses
  • headdress
  • headphone
  • chain
  • tie
  • weapon

  💕 **Cuerpo y Apariencia**:
  • breast
  • flatchest
  • erectnipples
  • nipples
  • spreadpussy
  • anusview

  🔥 **Acción y Escenas**:
  • sex
  • sex2
  • sex3
  • fingering
  • bondage
  • tears
  • seethrough
  • spreadlegs

  🎨 **Colores y Estilos**:
  • white
  • blonde
  • pinkhair
  • whitehair
  • greenhair

  🌳 **Otros Temas**:
  • tree
  • food
  • bed
  • beach
  • uniform
  • skirt
  • shorts
  • underwear
  • nobra
  • topless
  • fateseries
  • catgirl
──────────────────
⚠️ *Nota:* Usa estos comandos bajo tu responsabilidad.`
const fkontak = {
        "key": {
    "participants":"0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
        },
        "message": {
                "contactMessage": {
                        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
        },
        "participant": "0@s.whatsapp.net"
}
await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak)
}
handler.help = ['menuhot (menu +18)']
handler.tags = ['crow']
handler.command = ['menu18', 'menuhorny', 'menunsfw', 'menuhot'] 
export default handler;

let handler = async (m, { isPrems, conn }) => {

let img = 'https://imgs.search.brave.com/Y3137Ak8ctIYjrNFn1yE2UPDs7R8TY_wbbAjgpRysg4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/MDg4NTUyOC92ZWN0/b3IvdW5kZXItMTgt/c2lnbi13YXJuaW5n/LXN5bWJvbC1vdmVy/LTE4LW9ubHktY2Vu/c29yZWQtZWlnaHRl/ZW4tYWdlLW9sZGVy/LWZvcmJpZGRlbi1h/ZHVsdC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9YXN0MlhD/eHIwd2ZIbTFYQkRX/TC11MnNmc25ma1p2/VW9QakVfaDUtWXNQ/RT0' 
let texto = `🌟 𝐌𝐄𝐍𝐔 🌟
*˚₊·˚₊· ͟͟͞͞➳❥ @${m.sender.split("@")[0]}*
*│* ┊▸ ✦ 
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*│ ㊂ ▸▸ _
*╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│* ┊*│* ┊▸ ✦,
*│* ┊▸ ✦ вызов + текст
*│* ┊▸ ✦ внимание
*│* ┊▸ ✦ снести
*│* ┊▸ ✦ 
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ┊▸ ✦
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
──────────────────
⚠️ *Ознакомтесь с правильностью команд.`
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
handler.tags = ['main']
handler.command = ['меню'] 
export default handler;

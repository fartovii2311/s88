let handler = async (m, { isPrems, conn }) => {

let img = 'https://steamuserimages-a.akamaihd.net/ugc/895511849408015946/214FBCFBB51CFC88629DE8E2E89067607ABE5FF9/?imw=512&amp;imh=320&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true' 
let texto = `🌟 𝐌𝐄𝐍𝐔 🌟
*˚₊·˚₊· ͟͟͞͞➳❥ @${m.sender.split("@")[0]}*
*│* ┊▸ ✦ 
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*│ ㊂ ▸▸ _Создатель  
*│ ㊂ ▸▸ _Номер +79241612091
*╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│* ┊*│* ┊▸ ✦,
*│* ┊▸ ✦ вызов 
*│* ┊▸ ✦ внимание
*│* ┊▸ ✦ снести
*│* ┊▸ ✦ удалить
*│* ┊▸ ✦ молчуны
*│* ┊▸ ✦ неактивные
*│* ┊▸ ✦ ссылка
*│* ┊▸ ✦ создатель
*│* ┊▸ ✦ аренда 
*│* ┊▸ ✦ чекаренды 
*│* ┊▸ ✦ удалитьаренду
*│* ┊▸ ✦ автоадмин
*│* ┊▸ ✦ активность
*│* ┊▸ ✦ группу закрыть/открыть
*│* ┊▸ ✦ включить/выключить антиссылка
*│* ┊▸ ✦ включить/выключить антиссылка2
*│* ┊▸ ✦ включить/выключить приветствие
*│* ┊▸ ✦ включить/выключить ограничить
*│* ┊▸ ✦ включить/выключить авточтение
*│* ┊▸ ✦ включить/выключить антивызов
*│* ┊▸ ✦ включить/выключить антиличка
*│* ┊▸ ✦ включить/выключить антиудаление
*│* ┊▸ ✦ включить/выключить реакция
*│* ┊▸ ✦ включить/выключить толькоадмин
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
──────────────────
⚠️ *Ознакомтесь с правильностью команд*.`
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

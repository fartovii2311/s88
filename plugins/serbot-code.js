/* 
- code hecho por By DarkCore
- https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F
- Parchado por DarkCore... vip plus
*/

const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    MessageRetryMap,
    makeCacheableSignalKeyStore,
    jidNormalizedUser
} = await import('@whiskeysockets/baileys')
import fs from "fs";
import pino from 'pino';
import NodeCache from 'node-cache';
import readline from 'readline';
import qrcode from "qrcode";
import * as ws from 'ws';
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

global.conns = global.conns || [];


if (!global.db) loadDatabase();

async function loadDatabase() {
    if (!fs.existsSync('./storage/data/database.json')) fs.writeFileSync('./storage/data/database.json', JSON.stringify({ users: {}, sessions: {}, subBots: [] }, null, 2));
    global.db = JSON.parse(fs.readFileSync('./database.json', 'utf-8'));
}

async function saveDatabase() {
    fs.writeFileSync('./storage/data/database.json', JSON.stringify(global.db, null, 2));
}

let handler = async (m, { conn: _conn, args, usedPrefix, command }) => {
    let parent = args[0] && args[0] == 'plz' ? _conn : global.conn;

    if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
        return m.reply(`Este comando solo puede ser usado en el bot principal! wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix}code`);
    }

    async function serbot() {
        let authFolderB = m.sender.split('@')[0];
        const userFolderPath = `./LynxJadiBot/${authFolderB}`;

        if (!fs.existsSync(userFolderPath)) fs.mkdirSync(userFolderPath, { recursive: true });

        args[0] && fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t'));

        const { state, saveState, saveCreds } = await useMultiFileAuthState(userFolderPath);
        const msgRetryCounterCache = new NodeCache();
        const { version } = await fetchLatestBaileysVersion();
        let phoneNumber = m.sender.split('@')[0];

        const connectionOptions = {
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            browser: ["Ubuntu", "Chrome", "20.0.04"],
            auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })) },
            markOnlineOnConnect: false,
            generateHighQualityLinkPreview: true,
            msgRetryCounterCache,
            defaultQueryTimeoutMs: undefined,
            version
        };

        let conn = makeWASocket(connectionOptions);

        if (!conn.authState.creds.registered) {
            if (!phoneNumber) process.exit(0);
            let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
            setTimeout(async () => {
                let codeBot = await conn.requestPairingCode(cleanedNumber);
                codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
                let txt = `👑 Vesion de code V2\n\n`
                txt += `┌  👑  *Usa este Código para convertirte en un Sub Bot*\n`
                txt += `│  👑  Pasos\n`
                txt += `│  👑  1️⃣ : Haga click en los 3 puntos\n`
                txt += `│  👑  2️⃣ : Toque dispositivos vinculados\n`
                txt += `│  👑  3️⃣ : Selecciona *Vincular con el número de teléfono*\n`
                txt += `└  👑  4️⃣ : Escriba el Codigo\n\n`
                txt += `> 💬 *Nota:* Este Código solo funciona en el número en el que se solicito\n`;
                txt += `> 💬 *Nota:* Si no Conecto porfavor borre la session con el comando *${usedPrefix}delsession*`;

                await parent.reply(m.chat, txt, m, menu);
                await parent.reply(m.chat, codeBot, m);
            }, 3000);
        }

        conn.isInit = false;
        let isInit = true;
        let channel = 'https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F';

        async function connectionUpdate(update) {
            try {
                console.log("📡 Estado de conexión:", update);

                const { connection, lastDisconnect, isNewLogin } = update;
                if (isNewLogin) conn.isInit = true;
                const code = lastDisconnect?.error?.output?.statusCode;

                if (code && code !== DisconnectReason.loggedOut && !conn.ws.socket) {
                    console.log("🔄 Reintentando conexión...");
                    let i = global.conns.indexOf(conn);
                    if (i < 0) return console.log(await creloadHandler(true).catch(console.error));

                    delete global.conns[i];
                    global.conns.splice(i, 1);
                    fs.rmdirSync(userFolderPath, { recursive: true });

                    if (parent && m.chat) {
                        await parent.sendMessage(m.chat, { text: "❌ Conexión perdida, reconectando..." }, { quoted: m });
                    }
                }

                if (global.db.data == null) loadDatabase();

                if (connection === 'open') {
                    console.log("✅ Conexión exitosa, enviando mensaje...");

                    conn.isInit = true;
                    global.conns.push({ user: conn.user, ws: conn.ws, connectedAt: Date.now() });

                    global.db.subBots.push({ jid: conn.user.id, connectedAt: Date.now() });
                    saveDatabase();

                    await new Promise(res => setTimeout(res, 2000));

                    if (parent && m.chat) {
                        await parent.reply(m.chat,
                            args[0]
                                ? '✔️ *Conectado con éxito*'
                                : `✨ *[ Conexión Exitosa 🔱 ]* ✨\n\n` +
                                `🤖 *Bot:* Lynx-AI\n` +
                                `👑 *Dueño:* Darkcore\n\n` +
                                `⚠️ *Antes de desvincular tu cuenta, por favor asegúrate de borrar tu sesión previamente usando el comando* ${usedPrefix}delsession *para evitar problemas de conexión.*\n\n` +
                                `📱 *Síguenos en nuestros canales oficiales para más actualizaciones y soporte:*\n\n` +
                                `🔗 *Enlace:* ${channel}\n\n` +
                                `*Gracias por confiar en nosotros. ¡Disfruta de tu experiencia con Lynx-AI! 💬*`,
                            m
                        );
                    } else {
                        console.log("⚠️ No se pudo enviar el mensaje porque 'parent' o 'm.chat' no están definidos.");
                    }
                }

                if (connection === 'close') {
                    console.log("⚠️ Se ha desconectado. Enviando mensaje de advertencia...");

                    if (parent && m.chat) {
                        await parent.sendMessage(m.chat, { text: "⚠️ *Se desconectó, por favor borre su sesión con /delsession*" }, { quoted: m });
                    }
                }

            } catch (error) {
                console.error("❌ Error en connectionUpdate:", error);
            }
        }

        setInterval(async () => {
            if (!conn.user) {
                try {
                    if (conn.ws && conn.ws.readyState !== ws.OPEN) conn.ws.close();
                    conn.ev.removeAllListeners();
                    let i = global.conns.indexOf(conn);
                    if (i < 0) return;
                    delete global.conns[i];
                    global.conns.splice(i, 1);
                } catch (err) {
                    console.error('Error al cerrar la conexión:', err);
                    if (global.conns && global.conns[0]) {
                        await global.conns[0].sendMessage(m.chat, { text: "❌ Error al cerrar la conexión." });
                    }
                }
            }
        }, 60000);

        let handler = await import('../handler.js');
        let creloadHandler = async function (restatConn) {
            try {
                const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
                if (Object.keys(Handler || {}).length) handler = Handler;
            } catch (e) {
                console.error(e);
            }
            if (restatConn) {
                try { conn.ws.close() } catch { }
                conn.ev.removeAllListeners();
                conn = makeWASocket(connectionOptions);
                isInit = true;
            }

            if (!isInit) {
                conn.ev.off('messages.upsert', conn.handler);
                conn.ev.off('connection.update', conn.connectionUpdate);
                conn.ev.off('creds.update', conn.credsUpdate);
            }

            conn.handler = handler.handler.bind(conn);
            conn.connectionUpdate = connectionUpdate.bind(conn);
            conn.credsUpdate = saveCreds.bind(conn, true);

            conn.ev.on('messages.upsert', conn.handler);
            conn.ev.on('connection.update', conn.connectionUpdate);
            conn.ev.on('creds.update', conn.credsUpdate);
            isInit = false;
            return true;
        };
        creloadHandler(false);
    }

    serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code'];

export default handler;

/* 
- Code hecho por By DarkCore
- https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F
- Parchado por DarkCore... VIP Plus
*/

const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    MessageRetryMap,
    makeCacheableSignalKeyStore,
    jidNormalizedUser
} = await import('@whiskeysockets/baileys');

import fs from "fs";
import pino from 'pino';
import NodeCache from 'node-cache';
import qrcode from "qrcode";
import * as ws from 'ws';
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

if (!global.conns) global.conns = [];
if (!global.db) loadDatabase();

async function loadDatabase() {
    if (!fs.existsSync('./storage/data/database.json')) {
        fs.writeFileSync('./storage/data/database.json', JSON.stringify({ users: {}, sessions: {}, subBots: [] }, null, 2));
    }
    global.db = JSON.parse(fs.readFileSync('./storage/data/database.json', 'utf-8'));
}

async function saveDatabase() {
    fs.writeFileSync('./storage/data/database.json', JSON.stringify(global.db, null, 2));
}

let handler = async (m, { conn: _conn, args, usedPrefix, command }) => {
    let parent = args[0] && args[0] === 'plz' ? _conn : global.conn;

    if (!((args[0] && args[0] === 'plz') || (await global.conn).user.jid === _conn.user.jid)) {
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
                let txt = `👑 *Versión de Code V2*\n\n`
                txt += `📌 *Sigue estos pasos para convertirte en un Sub Bot:*\n`
                txt += `1️⃣ Abre WhatsApp y ve a los *tres puntos* (Menú).\n`
                txt += `2️⃣ Toca *Dispositivos Vinculados*.\n`
                txt += `3️⃣ Selecciona *Vincular con el número de teléfono*.\n`
                txt += `4️⃣ Ingresa el siguiente código:\n\n`
                txt += `⚠️ *Nota:* Este código solo funciona en el número que lo solicitó.\n`;
                txt += `⚠️ Si no conecta, borra la sesión con *${usedPrefix}delsession* y vuelve a intentarlo.`;

                await parent.reply(m.chat, txt, m, menu);
                await parent.reply(m.chat, codeBot, m);
            }, 3000);
        }

        async function connectionUpdate(update) {
            try {
                const { connection, lastDisconnect, isNewLogin } = update;
                if (isNewLogin) conn.isInit = true;
                const code = lastDisconnect?.error?.output?.statusCode;

                if (code && code !== DisconnectReason.loggedOut && !conn.ws.socket) {
                    let i = global.conns.indexOf(conn);
                    if (i < 0) return console.log(await creloadHandler(true).catch(console.error));

                    delete global.conns[i];
                    global.conns.splice(i, 1);
                    fs.rmdirSync(userFolderPath, { recursive: true });

                    if (parent && m.chat) {
                        await parent.sendMessage(m.chat, { text: "❌ Conexión perdida, reconectando..." }, { quoted: m });
                    }
                }

                if (connection === 'open') {
                    conn.isInit = true;
                    global.conns.push({ user: conn.user, ws: conn.ws, connectedAt: Date.now() });

                    if (parent && m && m.chat) {
                        await parent.reply(m.chat, 
                            `✨ *[ Conectado Exitosamente 🔱 ]*\n\n> _Si se desconecta, se intentará reconectar automáticamente._\n> _Si deseas eliminar el Sub Bot, borra la sesión en dispositivos vinculados._\n\n🔗 *Únete a nuestro canal para más soporte:* https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F`, 
                            m
                        );
                    }
                }

                if (connection === 'close') {
                    console.log("⚠️ Se ha desconectado. Enviando mensaje de advertencia...");

                    if (parent && m.chat) {
                        await parent.sendMessage(m.chat, { text: "⚠️ Se desconectó, por favor borra la sesión con */delsession*." }, { quoted: m });
                    }
                }

            } catch (error) {
                console.error("❌ Error en connectionUpdate:", error);
            }
        }

        let handler = await import('../handler.js');
        let creloadHandler = async function (restartConn) {
            try {
                const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
                if (Object.keys(Handler || {}).length) handler = Handler;
            } catch (e) {
                console.error(e);
            }
            if (restartConn) {
                try { conn.ws.close() } catch { }
                conn.ev.removeAllListeners();
                conn = makeWASocket(connectionOptions);
            }

            conn.handler = handler.handler.bind(conn);
            conn.connectionUpdate = connectionUpdate.bind(conn);
            conn.ev.on('messages.upsert', conn.handler);
            conn.ev.on('connection.update', conn.connectionUpdate);
        };

        creloadHandler(false);
    }

    serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code'];

export default handler;

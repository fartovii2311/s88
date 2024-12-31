import baileys from '@whiskeysockets/baileys';
import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import readline from 'readline';
import qrcode from "qrcode";
import crypto from 'crypto';
import fs from "fs";
import pino from 'pino';
import * as ws from 'ws';
import { Boom } from '@hapi/boom';

const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    jidNormalizedUser,
    MessageRetryMap
} = baileys;

const serbotBasePath = './serbot';
if (!fs.existsSync(serbotBasePath)) {
    fs.mkdirSync(serbotBasePath, { recursive: true });
}

if (!(global.conns instanceof Array)) global.conns = [];

// Función principal
let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
    if (!isOwner) return m.reply('Solo el dueño puede usar este comando.');
    let folderPath = `${serbotBasePath}/${m.sender.split('@')[0]}`;
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    async function serbot() {
        const { state, saveCreds } = await useMultiFileAuthState(folderPath);
        const { version } = await fetchLatestBaileysVersion();

        const conn = baileys.default({
            logger: pino({ level: 'silent' }),
            auth: state,
            version
        });

        conn.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'open') {
                global.conns.push(conn);
                console.log(`Conectado para ${m.sender}`);
            } else if (connection === 'close') {
                const reason = lastDisconnect?.error?.output?.statusCode;
                if (reason !== DisconnectReason.loggedOut) {
                    console.log(`Reintentando conexión para ${m.sender}...`);
                    setTimeout(() => serbot(), 3000);
                }
            }
        });

        conn.ev.on('creds.update', saveCreds);
    }

    serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'serbotcode'];
handler.rowner = true;

export default handler;

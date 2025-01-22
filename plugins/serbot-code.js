const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    MessageRetryMap,
    makeCacheableSignalKeyStore,
    jidNormalizedUser
  } = await import('@whiskeysockets/baileys')
  import moment from 'moment-timezone';
  import NodeCache from 'node-cache';
  import readline from 'readline';
  import qrcode from "qrcode";
  import crypto from 'crypto';
  import fs from "fs";
  import pino from 'pino';
  import * as ws from 'ws';
  const { CONNECTING } = ws;
  import { Boom } from '@hapi/boom';
  import { makeWASocket } from '../lib/simple.js';
  
 if (!(global.conns instanceof Array)) global.conns = [];
  
 let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
    let parent = await global.conn;
    async function serbot() {
      let authFolderB = m.sender.split('@')[0];
      const userFolderPath = `./LynxJadiBot/${authFolderB}`;
  
      if (!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath, { recursive: true });
      }
  
      args[0] ? fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : "";
  
      const { state, saveState, saveCreds } = await useMultiFileAuthState(userFolderPath);
      const msgRetryCounterMap = (MessageRetryMap) => { };
      const msgRetryCounterCache = new NodeCache();
      const { version } = await fetchLatestBaileysVersion();
      let phoneNumber = m.sender.split('@')[0];
  
      const methodCodeQR = process.argv.includes("qr");
      const methodCode = !!phoneNumber || process.argv.includes("code");
      const MethodMobile = process.argv.includes("mobile");
  
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const question = (texto) => new Promise((resolver) => rl.question(texto, resolver));
  
      const connectionOptions = {
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        mobile: MethodMobile,
        browser: ["Lynx-Ai(Sub-bot)", "Lynx-Ai(Sub-bot)", "20.0.04"],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async (clave) => {
          let jid = jidNormalizedUser(clave.remoteJid);
          let msg = await store.loadMessage(jid, clave.id);
          return msg?.message || "";
        },
        msgRetryCounterCache,
        msgRetryCounterMap,
        defaultQueryTimeoutMs: undefined,
        version
      };
  
      let conn = makeWASocket(connectionOptions);
  
      if (methodCode && !conn.authState.creds.registered) {
        if (!phoneNumber) process.exit(0);
        let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
        setTimeout(async () => {
          let codeBot = await conn.requestPairingCode(cleanedNumber);
          codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
          let txt = `┌  👑  *Usa este Código para convertirte en un Sub Bot*\n`
             txt += `│  👑  Pasos\n`
             txt += `│  👑  *1* : Haga click en los 3 puntos\n`
             txt += `│  👑  *2* : Toque dispositivos vinculados\n`
             txt += `│  👑  *3* : Selecciona *Vincular con el número de teléfono*\n`
             txt += `└  👑  *4* : Escriba el Codigo\n\n`
             txt += `*👑Nota:* Este Código solo funciona en el número en el que se solicitó\n\n> *Sigan El Canal*\n> ${channel}`;
          await parent.reply(m.chat, txt, m);
          await parent.reply(m.chat, codeBot, m);
          rl.close();
        }, 3000);
      }
  
      conn.isInit = false;
      let isInit = true;
      let channel = 'https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F'
  
      async function connectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin, qr } = update;
        if (isNewLogin) conn.isInit = true;
        const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
  
        if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
          let i = global.conns.indexOf(conn);
          if (i < 0) return console.log(await creloadHandler(true).catch(console.error));
          delete global.conns[i];
          global.conns.splice(i, 1);

          if (code !== DisconnectReason.connectionClosed) {
            fs.rmdirSync(userFolderPath, { recursive: true });
            parent.sendMessage(m.chat, { text: "Conexión perdida.." }, { quoted: m });
          }
        }
          
  
        if (global.db.data == null) loadDatabase();
  
        if (connection == 'open') {
          conn.isInit = true;
          global.conns.push({ user: conn.user, ws: conn.ws, connectedAt: Date.now() });
          await parent.reply(m.chat, args[0] ? 'Conectado con éxito' : '*\`[ Conectado Exitosamente 🔱 ]\`*\n\n> _Se intentará reconectar en caso de desconexión de sesión_\n> _Si quieres eliminar el subbot borra la sesión en dispositivos vinculados_\n> _El número del bot puede cambiar, guarda este enlace :_\n\nhttps://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F', m);
          await sleep(5000);
          if (args[0]) return;
      
          // Eliminar la línea de envío de base64
          // await parent.sendMessage(conn.user.jid, { text: usedPrefix + command + " " + Buffer.from(fs.readFileSync(`./LynxJadiBot/${authFolderB}/creds.json`), "utf-8").toString("base64") }, { quoted: m });
      
          await parent.reply(conn.user.jid, `> La siguiente vez que se conecte solo borra session *.delsession* porfavor si no conecta solo borra`, m);
      }}
    
      setInterval(async () => {
        if (!conn.user) {
          try { conn.ws.close() } catch { }
          conn.ev.removeAllListeners();
          let i = global.conns.indexOf(conn);
          if (i < 0) return;
          delete global.conns[i];
          global.conns.splice(i, 1);
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
  
  handler.help = ['serbot --code'];
  handler.tags = ['serbot'];
  handler.command = ['code', 'code', 'serbot --code', 'serbot'];
  handler.rowner = false
  
  export default handler;
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

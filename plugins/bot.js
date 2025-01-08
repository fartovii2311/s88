const {
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion
  } = await import("@whiskeysockets/baileys");
  import qrcode from 'qrcode';
  import nodecache from 'node-cache';
  import fs from 'fs';
  import path from 'path';
  import pino from 'pino';
  import util from 'util';
  import ws from 'ws';
  const {
    child,
    spawn,
    exec
  } = await import("child_process");
  import { makeWASocket } from '../lib/simple.js';
  
  if (global.conns instanceof Array) {
    console.log();
  } else {
    global.conns = [];
  }
  
  let handler = async (message, {
    conn,
    args,
    usedPrefix,
    command,
    isOwner
  }) => {
    if (!global.db.data.settings[conn.user.jid].jadibotmd) {
      return conn.reply(message.chat, "☁️ Este Comando está deshabilitado por mi creador.", fake, rcanal);
    }
  
    const isCodeCommand = args[0] && /code/.test(args[0].trim()) ? true : !!(args[1] && /code/.test(args[1].trim()));
    let credentials;
    let responseMessage;
    let pairingCode;
    let userId = message.mentionedJid && message.mentionedJid[0] ? message.mentionedJid[0] : message.fromMe ? conn.user.jid : message.sender;
    let userName = '' + userId.split`@`[0];
  
    if (isCodeCommand) {
      args[0] = args[0].replace(/^code$/, '').trim();
      if (args[1]) {
        args[1] = args[1].replace(/^code$/, '').trim();
      }
      if (args[0] == '') {
        args[0] = undefined;
      }
    }
  
    if (!fs.existsSync('./' + jadi + '/' + userName)) {
      fs.mkdirSync('./' + jadi + '/' + userName, { 'recursive': true });
    }
  
    if (args[0] && args[0] !== undefined) {
      fs.writeFileSync('./' + jadi + '/' + userName + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
    }
  
    if (fs.existsSync('./' + jadi + '/' + userName + "/creds.json")) {
      let creds = JSON.parse(fs.readFileSync('./' + jadi + '/' + userName + "/creds.json"));
      if (creds && creds.registered === false) {
        fs.unlinkSync('./' + jadi + '/' + userName + "/creds.json");
      }
    }
  
    const credentialsCheckCommand = Buffer.from("Y2QgcGx1Z2lucyA7IG1kNXN1bSBpbmZvLWRvbmFyLmpzIF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz", 'base64');
    
    exec(credentialsCheckCommand.toString("utf-8"), async (error, stdout, stderr) => {
      const qrBuffer = Buffer.from("", "base64");
  
      async function generateCredentials() {
        let currentUser = message.mentionedJid && message.mentionedJid[0] ? message.mentionedJid[0] : message.fromMe ? conn.user.jid : message.sender;
        let currentUserName = '' + currentUser.split`@`[0];
        
        if (!fs.existsSync('./' + jadi + '/' + currentUserName)) {
          fs.mkdirSync('./' + jadi + '/' + currentUserName, { 'recursive': true });
        }
  
        if (args[0]) {
          fs.writeFileSync('./' + jadi + '/' + currentUserName + '/creds.json', JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
        }
  
        let { version, isLatest } = await fetchLatestBaileysVersion();
        
        const retryFunction = (message) => {};
        const messageCache = new _0x28411e();
  
        const { state, saveState, saveCreds } = await useMultiFileAuthState('./' + jadi + '/' + currentUserName);
        
        const socketConfig = {
          'printQRInTerminal': false,
          'logger': pino({ 'level': 'silent' }),
          'auth': {
            'creds': state.creds,
            'keys': makeCacheableSignalKeyStore(state.keys, pino({ 'level': "silent" }))
          },
          'msgRetry': retryFunction,
          'msgRetryCache': messageCache,
          'version': [2, 3000, 0],
          'syncFullHistory': true,
          'browser': isCodeCommand ? ["Ubuntu", "Chrome", "110.0.5585.95"] : ["Dark-Ai (Sub Bot)", "Chrome", '2.0.0'],
          'defaultQueryTimeoutMs': undefined,
          'getMessage': async (msg) => {
            if (store) {
              const storedMessage = store.loadMessage(msg.remoteJid, msg.id);
              return storedMessage.message && undefined;
            }
            return { 'conversation': "Dark-Ai" };
          }
        };
  
        let socket = makeWASocket(socketConfig);
        socket.isInit = false;
        let retryConnection = true;
  
        async function connectionHandler(connStatus) {
          const { connection, lastDisconnect, isNewLogin, qr } = connStatus;
  
          if (isNewLogin) {
            socket.isInit = false;
          }
  
          if (qr && !isCodeCommand) {
            pairingCode = await conn.sendMessage(message.chat, {
              'image': await qrcode.toBuffer(qr, { 'scale': 0.8 }),
              'caption': "✿ *Vincula tu cuenta usando el Qr.*\n\n_✰ Sigue las *instrucciones* :_\n\n`1` » Haga clic en los tres puntos en la esquina superior derecha\n\n`2` » Toca dispositivos vinculados\n\n`3` » Escanee este codigo QR para iniciar sesión\n\n *¡Este código QR expira en 45 segundos!*\n\n> *✰ Nota :* _Con otro celular o en la PC escanea este QR para convertirte en un Sub Bot_\n> *✿ Aviso :* _No es recomendable ser subbot en tu numero principal_",
            }, { 'quoted': message });
          }
  
          if (qr && isCodeCommand) {
            credentials = await conn.sendMessage(message.chat, {
              'text': "✿ *Vincula tu cuenta usando el codigo.*\n\n_✰ Sigue las *instrucciones* :_\n\n`1` » Click en los 3 puntos\n\n`2` » Toque dispositivos vinculados\n\n`3` » Vincular nuevo dispositivo\n\n`4` » Selecciona Vincular con el número de teléfono\n\n> *✰ Nota :* _Este Código solo funciona en el número que lo solicito_\n> *✿ Aviso :* _No es recomendable ser subbot en tu numero principal_",
            }, { 'quoted': message });
            
            await sleep(3000);
            let pairingCode = await socket.requestPairingCode(message.sender.split`@`[0]);
            responseMessage = await message.reply(pairingCode);
          }
  
          const disconnectErrorCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
          console.log(disconnectErrorCode);
  
          const closeConnection = async (error) => {
            if (!error) {
              try {
                socket.ws.close();
              } catch {}
              socket.ev.removeAllListeners();
              let connectionIndex = global.conns.indexOf(socket);
              if (connectionIndex >= 0) global.conns.splice(connectionIndex, 1);
            }
          };
        }
      }
  
      generateCredentials();
    });
  };
  handler.help = ['m', '']; 
  handler.tags = ['m']; 
  handler.command = ['m', 'md']; 
  export default handler;
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }
  
  async function joinChannels(botInstance) {
    for (const channel of Object.values(global.ch)) {
      await botInstance.newsletterFollow(channel).catch(() => {}); 
    }
  }
  

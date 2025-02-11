const lenguaje = () => { return 'en' } //ENGLISH

const smsAvisoRG = () => { return `╰⊱✅⊱ *результат* ⊱✅⊱╮\n\n` }
const smsAvisoAG = () => { return `╰⊱⚠️⊱ *предупреждение* ⊱⚠️⊱╮\n\n` }
const smsAvisoIIG = () => { return `╰⊱❕⊱ *информация* ⊱❕⊱╮\n\n` }
const smsAvisoFG = () => { return `╰⊱❌⊱ *ошибка* ⊱❌⊱╮\n\n` }
const smsAvisoMG = () => { return `╰⊱❗️⊱ *НЕПРАВИЛЬНОЕ ДЕЙСТВИЕ* ⊱❗️⊱╮\n\n` }
const smsAvisoEEG = () => { return `╰⊱📩⊱ *доклад* ⊱📩⊱╮\n\n` }
const smsAvisoEG = () => { return `╰⊱💚⊱ *успех* ⊱💚⊱╮\n\n` }

const smsRowner = () => { return `\`\`\`¡¡ЭТУ КОМАНДУ МОЖЕТ ИСПОЛЬЗОВАТЬ ТОЛЬКО НОМЕР БОТА!!\`\`\`` }
const smsOwner = () => { return `\`\`\`¡¡ЭТУ КОМАНДУ МОЖЕТ ИСПОЛЬЗОВАТЬ ТОЛЬКО МОЙ СОЗДАТЕЛЬ!!\`\`\`` }
const smsMods = () => { return `\`\`\`¡¡ЭТУ КОМАНДУ МОГУТ ИСПОЛЬЗОВАТЬ ТОЛЬКО МОДЕРАТОРЫ И МОЙ СОЗДАТЕЛЬ!!\`\`\`\`` }
const smsPremium = () => { return `\`\`\`¡¡ЭТА КОМАНДА ДОСТУПНА ТОЛЬКО ДЛЯ ПРЕМИУМ-ПОЛЬЗОВАТЕЛЕЙ И MY CREATOR(A)!! ЧТОБЫ ПОЛУЧИТЬ ПРЕМИУМ-БИЛЕТ, КУПИТЕ ЕГО С ПОМОЩЬЮ #pass premium\`\`\`` }
const smsGroup = () => { return `\`\`\`¡¡THIS COMMAND CAN ONLY BE USED IN GROUPS!!\`\`\`` }
const smsPrivate = () => { return `\`\`\`¡¡THIS COMMAND CAN ONLY BE USED BY THE PRIVATE!!\`\`\`` }
const smsAdmin = () => { return `\`\`\`¡¡THIS COMMAND IS ONLY FOR ADMINS!!\`\`\`` }
const smsBotAdmin = () => { return `\`\`\`¡¡I NEED TO BE ADMIN SO YOU CAN USE THIS COMMAND!!\`\`\`` }
const smsUnreg = () => { return `\`\`\`¡¡YOU NEED TO BE REGISTERED TO USE THIS COMMAND, WRITE #verify TO REGISTER!!\`\`\`` }
const smsRestrict = () => { return `\`\`\`¡¡THIS COMMAND IS RESTRICTED BY MY CREATOR!!\`\`\`` }

//main.js
const smsWelcome = () => { return `*╭┈⊰* @subject *⊰┈ ✦*\n*┊✨ WELCOME!!*\n┊💖 @user\n┊📄 *READ THE GROUP DESCRIPTION*\n*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ✦*\n${String.fromCharCode(8206).repeat(850)}\n@desc`}
const smsBye = () => { return '*╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*\n┊ *@user*\n┊ *HE WAS NOT WORTHY TO BE HERE!!* 🌟\n*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*'}
const smsSpromote = () => { return '*@user HE HAS BEEN PROMOTED AS GROUP ADMIN!!*'}
const smsSdemote = () => { return '*@user HE HAS BEEN DEMOVED AS GROUP ADMIN!!*'}
const smsSdesc = () => { return '*KNOW THE NEW DESCRIPTION OF THE GROUP:*\n\n@desc'}
const smsSsubject = () => { return '*GROUP NAME HAS BEEN UPDATED!!*\n@subject'}
const smsSicon = () => { return '*THE GROUP PHOTO HAS BEEN UPDATED!!*'}
const smsSrevoke = () => { return '*KNOW THE NEW LINK OF THE GROUP!!*\n*@revoke*'}
const methodCode1 = () => { return ` BINDING METHOD` }
const methodCode2 = () => { return ` HOW DO YOU WANT TO CONNECT?` }
const methodCode3 = () => { return ` Option` }
const methodCode4 = () => { return ` QR code` }
const methodCode5 = () => { return ` 8 digit code.` }
const methodCode6 = () => { return ` Write only the number of` }
const methodCode7 = () => { return ` the option to connect.` }
const methodCode8 = () => { return ` ADVICE` }
const methodCode9 = () => { return ` Si usa Termux, Replit, Linux, or Windows` }
const methodCode10 = () => { return ` Use these commands for direct execution:` }
const methodCode11 = (chalk) => { return ` NUMBERS OTHER THAN ARE NOT ALLOWED ${chalk.bold.greenBright("1")} O ${chalk.bold.greenBright("2")}, NO LETTERS OR SPECIAL SYMBOLS.\n${chalk.bold.yellowBright(" TIP: COPY THE OPTION NUMBER AND PASTE IT INTO THE CONSOLE.")}` }
const methodCode12 = () => { return ` Start with QR code` }
const methodCode13 = () => { return ` Start with 8 digit code` }
const methodCode14 = () => { return ` Default startup with options` }
const phNumber = (chalk) => { return ` Set file ${chalk.bold.greenBright("config.js")} The number entered does not have a country code. ${chalk.bold.yellowBright(" Example: +593090909090")}` }
const phNumber2 = (chalk) => { return ` Please enter the WhatsApp number.\n${chalk.bold.yellowBright(" TIP: Copy the WhatsApp number and paste it into the console.")}\n${chalk.bold.yellowBright(" Example: +593090909090")}\n${chalk.bold.magentaBright('---> ')}` }
const phNumber3 = () => { return ` Make sure to add the country code.` }
const pairingCode = () => { return ` BINDING CODE:` }

const smsConexion = () => { return `\n╭┈ ┈ ┈ ┈ ┈ • ${packname} • ┈ ┈ ┈ ┈ ┈╮\n┊ 💚 SUCCESSFUL CONNECTION WITH WHATSAPP 💚\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`} 
const smsCargando = () => { return `✨ CHARGING...\n`} 
const smsCodigoQR = () => { return `\n✅ SCAN THE QR CODE EXPIRES IN 45 SECONDS ✅`}
const smsConexionOFF = () => { return `\n⚠️ NO CONNECTION, DELETE THE FOLDER ${global.authFile} AND SCAN THE QR CODE ⚠️`}
const smsClearTmp = () => { return `\n╭▸ ☘️ MULTIMEDIA ☘️\n┆• FILES FROM THE TMP FOLDER DELETED\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈◎`} 
const smspurgeSession = () => { return `\n╭▸ 🌻 ${global.authFile} 🌻\n┆• NON-ESSENTIAL SESSIONS ELIMINATED\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈◎`} 
const smspurgeOldFiles = () => { return `\n╭▸ 🌹 FILES 🌹\n┆• RESIDUAL FILES DELETED\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈◎`} 
const smspurgeSessionSB1 = () => { return `\n╭▸ 🌺 GataJadiBot 🌺\n┆• NOTHING TO DELETE \n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈◎`} 
const smspurgeSessionSB2 = () => { return `\n╭▸ 🌼 GataJadiBot 🌼\n┆• NON-ESSENTIAL FILES DELETED\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈◎`} 
const smspurgeSessionSB3 = () => { return `\n╭▸ ⚠️ GataJadiBot ⚠️\n┆• AN ERROR OCCURRED\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈◎\n`} 
const smspurgeOldFiles1 = () => { return `\n╭▸ ♻️ ARCHIVE ♻️\n┆•`} 
const smspurgeOldFiles2 = () => { return `DELETE SUCCESSFULLY\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈◎`} 
const smspurgeOldFiles3 = () => { return `\n╭▸ ⚠️ ARCHIVE ⚠️\n┆•`} 
const smspurgeOldFiles4 = () => { return `FAILED TO DELETE\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈◎\n`}
const smsConexioncerrar = () => { return `\n⚠️ CLOSED CONNECTION, RECONNECTING....`}
const smsConexionperdida = () => { return `\n⚠️ LOST CONNECTION WITH SERVER, RECONNECTING...`}
const smsConexionreem = () => { return `\n⚠️ CONNECTION REPLACED, ANOTHER NEW SESSION HAS BEEN OPENED, PLEASE CLOSE THE CURRENT SESSION FIRST.`}
const smsConexionreinicio = () => { return `\n❇️ CONNECTING TO THE SERVER...`}
const smsConexiontiem = () => { return `\n⌛ CONNECTION TIME OUT, RECONNECTING...`}
const smsConexiondescon = (reason, connection) => { return `\n⚠️❗ UNKNOWN DISCONNECTION REASON: ${reason || ''} >> ${connection || ''}`}
const languageSave = () => { return `✅ The language is already configured.`} 
const languageRegister = (selectedLanguage) => { return `❇️ The language has been set as "${selectedLanguage}".\n`} 
const smsMainBot = () => { return "UPDATED 'main.js' SUCCESSFULLY"}

//_antiprivado 
const smsprivado = () => { return `*You cannot use this bot in a private chat*\n\n*Join the official bot group to use the bot*`}

//Boton
const smsConMenu = () => { return `🌻 MENU`}

//info-creadora.js
const smsCreA = () => { return 'Hello!!'}
const smsCreB = () => { return 'My name is'}
const smsCreC = () => { return 'Always available to help you 😸'}

//info-cuentas-oficiales.js
const smsOfc1 = () => { return '🌸 *◜OFFICIAL ACCOUNTS◞* 🌸'}
const smsOfc2 = () => { return `*❥ _Follow us on the Official Accounts to stay up-to-date with_ ${packname}*`}

//info-donar.js
const smsMensajeDonar = () => { return `🌼 Voluntary support is accepted through PayPal, if you want to help in another way you can donate a Number on Instagram so that the repository remains valid, Thank you!!\n\n🌺 You can always support by following the Official Accounts and Sharing the work achieved in ${packname}`}
const smsTituloDonar = () => { return '*◜🌹❤️ VOLUNTARY DONATION ❤️🌹◞*'}
const smsPrivadoDonar = () => { return '🍄 *_You can also share the following as a Show of Support_*\n*_Rate the repository with a 🌟 Thank you!!_*'}

//info-gruposofc.js
const smsGrupoOfc1 = () => { return '*◜🌺 OFFICIAL GROUPS 🌺◞*'}
const smsGrupoOfc2 = () => { return '*◜🌸 COLLABORATION 🌸◞*'}

//info-grupos-lista.js
const smsLisA = () => { return '_*YOU ARE IN THESE GROUPS:*_'}
const smsLisB = () => { return '*⭔ Total Groups:*'}
const smsLisC = () => { return '*⋄ Group:*'}
const smsLisD = () => { return '*⋄ ID:*'}
const smsLisE = () => { return '*⋄ Participants:*'}

//info-estado.js
const smsCreApoyo = () => { return '✨ S U P P O R T'}
const smsEstado1 = () => { return 'STATE'}
const smsEstado2 = () => { return 'Version'}
const smsEstado3 = () => { return 'Users'}
const smsEstado4 = () => { return 'Registered'}
const smsEstado5 = () => { return 'Forbidden Chat'}
const smsEstado6 = () => { return 'Banned Users'}
const smsEstado7 = () => { return 'Active during'}

//info-ping.js
const smsVl1 = () => { return 'SPEED'}
const smsVl2 = () => { return 'S E R V E R*'}
const smsVl3 = () => { return '*🔵 Free RAM:*'}
const smsVl4 = () => { return '*💻 Platform :*'}
const smsVl5 = () => { return '*📡 Place :*'}
const smsVl6 = () => { return '*NodeJS Memory Usage*'}

//info-infobot.js
const smsBT1 = () => { return 'CREATOR'}
const smsBT2 = () => { return 'VERSION'}
const smsBT3 = () => { return 'PREFIX'}
const smsBT4 = () => { return 'PRIVATE CHAT'}
const smsBT5 = () => { return 'GROUP CHAT'}
const smsBT6 = () => { return 'TOTAL CHATS'}
const smsBT7 = () => { return 'ACTIVITY'}
const smsBT8 = () => { return 'USERS'}
const smsBT9 = () => { return 'ACTIVE SUB BOTS'}
const smsCreInfo = () => { return '🌟 I N F O R M A T I O N '}


//info-contacto.js
const smsContacto1 = () => { return ' I Am ' + packname + ' a WhatsApp Bot dedicated to helping with whatever you ask 😎'}
const smsContacto2 = () => { return 'I am Owner of ' + packname + ' if you have any questions you can tell me ✌️'}
const smsContacto3 = () => { return '👑 Owner'}
const smsContacto4 = () => { return 'GataBot Official Contact 🐈'}
const smsContacto5 = () => { return '🐣 How can I help you?'}
const smsContacto6 = () => { return 'I do not have mail 🙏'}
const smsContacto7 = () => { return '🌎 Global'}
const smsContacto8 = () => { return 'This Account is Bot 👀'}

//ejemplos
const smsMalused = () => { return '⚡ *USE THE COMMAND LIKE THIS:*\n'}
const smsMalused2 = () => { return `${lenguajeGB['smsAvisoMG']()}🐈 *YOU MUST USE THE COMMAND AS IN THIS EXAMPLE:*\n`}
const smsMalused3 = () => { return `${lenguajeGB['smsAvisoMG']()}🐈 *REPLY TO A MESSAGE WITH THE COMMAND OR USE THIS EXAMPLE:*\n`}

//Error
const smsMalError = () => { return `${lenguajeGB['smsAvisoFG']()}\`\`\`AN UNEXPECTED ERROR OCCURRED.\`\`\``}
const smsMalError2 = () => { return `${lenguajeGB['smsAvisoFG']()}\`\`\`AN INCONVENIENCE ARISED.\`\`\`\n`}
const smsMalError3 = () => { return `${lenguajeGB['smsAvisoFG']()}\`\`\`SOMETHING WENT WRONG, REPORT THIS COMMAND USING:\`\`\`\n`}

//descargas.js
const smsYT1 = () => { return 'TITLE'}
const smsYT2 = () => { return 'DESCRIPTION'}
const smsYT3 = () => { return 'DURATION'}
const smsYT4 = () => { return 'VIEWS'}
const smsYT5 = () => { return 'SEE ON YOUTUBE'}
const smsYT6 = () => { return 'TRY ANOTHER NAME'}

//descargas.js
const smsYTA1 = () => { return 'DOWNLOADING AUDIO... WAIT A MOMENT'}

//descargas.js
const smsYTV1 = () => { return 'DOWNLOADING VIDEO...PLEASE WAIT A MOMENT'}

//descargas.js
const smsYTA2 = () => { return 'DOWNLOADING AUDIO DOCUMENT... WAIT A MOMENT'}

//descargas.js
const smsYTV2 = () => { return 'DOWNLOADING VIDEO DOCUMENT...PLEASE WAIT A MOMENT'}

//descargas.js
const smsTiktok = () => { return 'SOON WILL HAVE THE TIKTOK VIDEO'}

//descargas.js
const smsGit = () => { return 'Send files, the moment 🚀\nsi does not reach the file because the warehouse is heavy'}

//_antiviewonce.js
const smsAntiView1 = () => { return `\n🪻 \`\`\`FORBIDDEN TO HIDE VIDEO\`\`\` 🪻`} 
const smsAntiView2 = () => { return `\n🪷 \`\`\`FORBIDDEN HIDE IMAGE\`\`\` 🪷`} 

//buscadores.js
const smsOpenai1 = () => { return '*MAKE A QUERY, EXAMPLE:*'} 
const smsOpenai2 = () => { return 'Recommend a top 10 action movie'} 
const smsOpenai3 = () => { return 'Explain what a quadratic equation is and perform a simple and a compound example.'} 

//convertidores.js
const smsToimg = () => { return lenguajeGB.smsAvisoMG() + '*RESPOND TO A STICKER TO CONVERT TO IMAGE*'} 

//convertidores.js
const smsConURL = () => { return lenguajeGB.smsAvisoMG() + '*RESPOND TO AN IMAGE TO CONVERT TO A LINK*'} 
const smsConURL1 = () => { return '🔗 *LINK*'} 
const smsConURL2 = () => { return '⚖️ *SIZE*'} 
const smsConURL3 = () => { return '♻️ *EXPIRATION*'} 
const smsConURL4 = () => { return '🪄 *SHORT LINK*'}
const smsConURLERR1 = () => { return 'Infinite'} 
const smsConURLERR2 = () => { return 'Unknown'} 

//convertidores.js
const smsConVIDEO = () => { return lenguajeGB.smsAvisoMG() + '*RESPOND TO MOTION STICKER TO CONVERT TO VIDEO*'} 
const smsConVIDEO2 = () => { return lenguajeGB.smsAvisoMG() + '*ONLY STICKER IN MOTION TO CONVERT TO VIDEO*'} 
const smsConVIDEO3 = () => { return lenguajeGB.smsAvisoEG() + '*✓ HERE YOU HAVE YOUR VIDEO!!*'} 

//convertidores.js
const smsConGIF = () => { return lenguajeGB.smsAvisoMG() + '*REPLY TO A VIDEO TO CONVERT TO A GIF WITH AUDIO*'} 
const smsConGIF2 = () => { return lenguajeGB.smsAvisoMG() + '*RESPOND TO A VIDEO. THE TYPE OF FILES USED IS NOT CORRECT* '} 
const smsConGIF3 = () => { return lenguajeGB.smsAvisoEG() + '*GIF WITH AUDIO (Open the gif to hear the audio)*'} 

//convertidores.js
const smsConVN = () => { return lenguajeGB.smsAvisoMG() + '*REPLY TO A VIDEO OR AUDIO TO CONVERT TO A VOICE NOTE*'} 
const smsConVN1 = () => { return lenguajeGB.smsAvisoFG() + '*SOMETHING WRONG WITH THE VIDEO, TRY AGAIN*'} 
const smsConVN2 = () => { return lenguajeGB.smsAvisoFG() + '*SOMETHING WRONG WITH THE AUDIO, TRY AGAIN*'} 
const smsConVN3 = () => { return lenguajeGB.smsAvisoFG() + '*SOMETHING WENT WRONG WHEN TRYING TO CONVERT YOUR AUDIO TO VOICE MEMO*'}
const smsConVN4 = () => { return lenguajeGB.smsAvisoFG() + '*SOMETHING WENT WRONG WHEN TRYING TO CONVERT YOUR VIDEO TO VOICE MEMO*'} 

//convertidores.js
const smsTradc1 = () => { return lenguajeGB.smsAvisoMG() + '*REPLY TO A TEXT MESSAGE OR TYPE THE CODE AND TEXT TO CONVERT TO AUDIO, EXAMPLE:*\n'}
const smsTradc2 = () => { return ' (code) (text)\n'} 
const smsTradc3 = () => { return lenguajeGB.lenguaje() + ' This text will be audio\n\n'}
const smsTradc4 = () => { return '*YOU CAN GET THE CODE OF THE LANGUAGES SUPPORTED AT:*\nhttps://cloud.google.com/translate/docs/languages?hl=es-419'} 

//config.js
const smsWait = () => { return '*❤️ Wait a moment please...*'}

//descargas.js
const smsMediaFr = () => { return '❕ *_GREATER THAN 150 MG IT IS POSSIBLE NOT TO BE SENT_*'}
const smsImageGg = () => { return '*💞 RESULT OF:*'}

//grupos.js
const smsGI1 = () => { return '*GROUP INFORMATION*'}
const smsGI2 = () => { return '*GROUP ID*'}
const smsGI3 = () => { return '*GROUP NAME*'}
const smsGI4 = () => { return '*GROUP DESCRIPTION*'}
const smsGI5 = () => { return '*NO DESCRIPTION*'}
const smsGI6 = () => { return '*NUMBER OF USERS*'}
const smsGI7 = () => { return '*Users*'}
const smsGI8 = () => { return '*CREATOR OF THE GROUP*'}
const smsGI9 = () => { return '*GROUP ADMIN*'}

//grupos.js
const smsAddB3 = () => { return `*NOTIFICATION FOR ADMINS*`}
const smsAddB4 = () => { return `*ADMIN PRESENCE*`}
const smsAddB5 = () => { return `*MESSAGE:*`}
const smsAddB6 = () => { return `I request the admins please.`}

//grupos-admins.js
const smsDemott = () => { return `*THE NUMBER IS INVALID, PLEASE TRY AGAIN REPLY TO SOMEONE'S MESSAGE OR USE AS IN THIS EXAMPLE:*\n`}
const smsDemott2 = () => { return '*NOW HAS POWER IN THE GROUP!!*'}
const smsDemott3 = () => { return '*NO LONGER HAS POWER IN THE GROUP!!*'}

//grupos-admins.js
const smsSetW = () => { return `${lenguajeGB['smsAvisoEG']()}*GROUP WELCOME HAS BEEN SET UP*`}
const smsSetW2 = () => { return `${lenguajeGB['smsAvisoIIG']()}🙌 *_WRITE THE WELCOME MESSAGE_*\n*_OPTIONAL YOU CAN USE WHAT IS WITH "@" TO ADD MORE INFORMATION:_*\n\n*⚡ @user (Mention to the user)*\n*⚡ @subject (Group name)*\n*⚡ @desc (Group description)*\n\n*REMEMBER THAT THE "@" ARE OPTIONAL*`}

//grupos-admins.js
const smsSetB = () => { return `${lenguajeGB['smsAvisoEG']()}*THE FAREWELL OF THE GROUP HAS BEEN CONFIGURED*`}
const smsSetB2 = () => { return `${lenguajeGB['smsAvisoIIG']()}🙌 *_WRITE THE FAREWELL MESSAGE_*\n*_OPTIONAL YOU CAN USE WHAT IS WITH "@" TO ADD MORE INFORMATION:_*\n\n*⚡ @user (Mention to the user)*\n\n*REMEMBER THAT THE "@" IS OPTIONAL*`}

//grupos-admins.js
const smsDest = () => { return `${lenguajeGB['smsAvisoEG']()}*GROUP DESCRIPTION HAS BEEN CONFIGURED*`}

//grupos-admins.js
const smsNam1 = () => { return `${lenguajeGB['smsAvisoEG']()}*THE GROUP NAME HAS BEEN SET*`}
const smsNam2 = () => { return `${lenguajeGB['smsAvisoMG']()}*🙌 WRITE THE NEW GROUP NAME*`}
const smsNam3 = () => { return `${lenguajeGB['smsAvisoFG']()}*THE NAME OF THE GROUP MUST NOT HAVE MORE THAN 25 CHARACTERS*`}

//grupos-admins.js
const smsGrupoPP = () => { return `${lenguajeGB['smsAvisoMG']()}*RESPOND TO AN PICTURE TO CHANGE THE GROUP PHOTO*`}
const smsGrupoPP2 = () => { return `${lenguajeGB['smsAvisoEG']()}*🪄 THE IMAGE OF THE GROUP WAS UPDATED!!*`}

//grupos-admins.js
const smsRestGp = () => { return `${lenguajeGB['smsAvisoEG']()}*THE GROUP LINK HAS BEEN RESETTED*`}

//grupos-admins.js
const smskick1 = () => { return `${lenguajeGB['smsAvisoAG']()}*TAG THE PERSON OR REPLY TO THE MESSAGE OF THE PERSON YOU WANT TO REMOVE*\n\n*EXAMPLE: `}
const smskick2 = () => { return `DELETED 😼`}
const smskick3 = () => { return `I CAN'T DELETE THE GROUP CREATOR 😆🫵`}
const smskick4 = () => { return `NOT IN THIS GROUP 👻`}

//grupos-admins.js
const smsGrupoOpen = () => { return `${lenguajeGB['smsAvisoEG']()}*EVERYONE CAN WRITE NOW!!*`}
const smsGrupoClose = () => { return `${lenguajeGB['smsAvisoEG']()}*CLOSED GROUP, ONLY ADMINS CAN WRITE!!*`}

//grupo-tagall.js
const smstagaa = () => { return `⚡ SUMMONING THE GROUP ⚡`}

//grupos.js
const smsInsGC1 = () => { return `*ID*`}
const smsInsGC2 = () => { return `*NAME*`}
const smsInsGC3 = () => { return `*CREATED*`}
const smsInsGC4 = () => { return `*MAIN ADMIN*`}
const smsInsGC5 = () => { return `*DESCRIPTION*`}

//propietario(a.js
const smsResP1 = () => { return `_*🗂️ SENDING BACKUP TO YOUR PRIVATE...*_`}
const smsResP2 = (date) => { return `*🗓️ Database:* ${date}`}

//propietario(a.js
const smsPropban1 = (usedPrefix, command, bot) => { return `${lenguajeGB['smsAvisoMG']()}*TAG SOMEONE OR REPLY TO THE USER'S MESSAGE OR WRITE THE NUMBER YOU WANT TO BAN FROM THE COMMANDS*\n\n*EXAMPLE:*\n*${usedPrefix + command} @${bot}*`}
const smsPropban2 = (bot) => { return `${lenguajeGB['smsAvisoFG']()}*@${bot} CANNOT BE BANNED WITH THIS COMMAND* 😹`}
const smsPropban3 = (ownerNumber) => { return `${lenguajeGB.smsAvisoIIG()}😳 *I CAN'T BAN THE OWNER @${ownerNumber} OF ${packname}*`}
const smsPropban4 = (number) => { return `${lenguajeGB.smsAvisoIIG()}*IT IS NOT NECESSARY TO BAN AGAIN @${number} YES IT ALREADY IS* 😊`}
const smsPropban5 = () => { return `${lenguajeGB['smsAvisoEG']()}*USER SUCCESSFULLY BANNED* 🙀`}
const smsPropban6 = (number, usr) => { return `${lenguajeGB.smsAvisoAG()}*@${number} YOU ARE BANNED BY @${usr} YOU CANNOT USE THE COMMANDS UNTIL SOMEONE REVERSES THE BAN* 😿`}
const smsPropban7 = (usedPrefix, command, number) => { return `${lenguajeGB['smsAvisoFG']()}*AN ERROR CAME UP, IT MAY BE THAT THE USER IS NOT IN MY DATABASE TRY TO WRITE ${usedPrefix + command} ${number}*\n\`\`\`IF THE ERROR CONTINUES REPORT THIS COMMAND\`\`\``}

//owner-unbanuser.js
const smsPropdesban1 = (usedPrefix, command, bot) => { return `${lenguajeGB['smsAvisoMG']()}*TAG SOMEONE OR REPLY TO THE USER'S MESSAGE OR WRITE THE NUMBER YOU WANT TO UNBAN FROM COMMANDS*\n\n*EXAMPLE:*\n*${usedPrefix + command} @${bot}*`}
const smsPropdesban2 = (number) => { return `${lenguajeGB.smsAvisoIIG()}*NO NEED TO UNBAN AGAIN @${number} YES IT ALREADY IS* 😊`}
const smsPropdesban3 = () => { return `${lenguajeGB['smsAvisoEG']()}*USER UNBANED SUCCESSFULLY* 💙`}
const smsPropdesban4 = (number, usr) => { return `${lenguajeGB.smsAvisoAG()}*@${number} YOU ARE UNBANED BY @${usr} YOU CAN NOW USE THE COMMANDS!!* 🪄`}
const smsPropdesban5 = (usedPrefix, command, number) => { return `${lenguajeGB['smsAvisoFG']()}*AN ERROR CAME UP, IT MAY BE THAT THE USER IS NOT IN MY DATABASE TRY TO WRITE ${usedPrefix + command} ${number}*\n\`\`\`IF THE ERROR CONTINUES REPORT THIS COMMAND\`\`\``}

//propietario(a).js
const smsAutoAdmin1 = () => { return '*YOU ARE ALREADY ADMIN 😳🌹*'}
const smsAutoAdmin2 = () => { return `*I COULDN'T MAKE IT ADMIN 🥹🥀*`}

//owner-unbanchat.js
const smsUnbanCH1 = () => { return lenguajeGB['smsAvisoFG']() + '🗂️ *THIS CHAT IS NOT REGISTERED IN THE DATABASE*'}
const smsUnbanCH2 = () => { return lenguajeGB.smsAvisoAG() + '🌹 *THIS CHAT IS NOT BANNED!!*'}
const smsUnbanCH3 = () => { return lenguajeGB['smsAvisoEG']() + '🪄 *THIS CHAT WAS UNBANED, YOU CAN NOW USE THE COMMANDS!!*'}

//propietario(a).js
const smsBioEd1 = () => { return `*WRITE THE TEXT YOU WANT TO BE DISPLAYED IN THE BIOGRAPHY OF* ${packname}`}
const smsBioEd2 = () => { return `*THE BIOGRAPHY IS VERY LONG, SUMMARIZE THE INFORMATION PLEASE*`}
const smsBioEd3 = () => { return '✅ ```BOT BIO INFO CHANGED SUCCESSFULLY```'}

//propietario(a).js
const smsNameEd1 = () => { return `*WRITE THE TEXT YOU WANT TO BE DISPLAYED AS USERNAME IN* ${packname}`}
const smsNameEd2 = () => { return `*THE NAME IS TOO LONG, SUMMARIZE THE INFORMATION PLEASE*`}
const smsNameEd3 = () => { return '✅ ```BOT USERNAME CHANGED SUCCESSFULLY```'}

//propietario(a).js
const smsFotoEd1 = (usedPrefix, command) => { return `*RESPOND TO AN IMAGE USING THE COMMAND ${usedPrefix + command} TO UPDATE THE BOT PROFILE PHOTO*`}
const smsFotoEd2 = () => { return '✅ ```SUCCESSFULLY CHANGED BOT PROFILE PHOTO```'}
const smsFotoEd3 = (usedPrefix, command) => { return `*REMEMBER TO RESPOND TO AN IMAGE USING THE COMMAND ${usedPrefix + command}*`}

//propietario(a).js
const smsBanChE = () => { return '✅ *THIS CHAT WAS BANNED, YOU WILL NOT BE ABLE TO USE THE COMMANDS UNTIL YOU UNBAN THE CHAT*'}

//propietario(a).js
const smsBlockUn1 = (usedPrefix, command, toUser) => { return lenguajeGB.smsMalused2() + `${usedPrefix + command} ${toUser}`}
const smsBlockUn2 = (comd, ownerNumber) => { return lenguajeGB.smsAvisoAG() + `*CAN'T ${comd} TO THE OWNER @${ownerNumber}*`}
const smsBlockUn3 = (comd, useB) => { return `*IT HAS BEEN ${comd} TO ${useB} WITH ÉXITO*`}

//propietario(a).js
const smsRestarU1 = () => { return lenguajeGB['smsAvisoMG']() + '*LABEL THE USER, WRITE THEIR NUMBER OR RESPOND TO THE MESSAGE TO RESTART DATA*'}
const smsRestarU2 = () => { return lenguajeGB['smsAvisoFG']() + '*THE NUMBER YOU ENTERED IS INVALID TO RESET THE DATA*'}
const smsRestarU3 = (number) => { return lenguajeGB['smsAvisoEG']() + `*RESETS TO @${number} FROM THE DATABASE*`}

//propietario(a).js
const smsJoin1 = (usedPrefix, command) => { return lenguajeGB['smsAvisoMG']() + `*ENTER THE LINK OF A GROUP*\n*EXAMPLE:*\n*${usedPrefix + command}* ${nna}`}
const smsJoin2 = () => { return lenguajeGB['smsAvisoEG']() + `${packname}\n*HE HAS JOINED THE GROUP ✅*`}

//info.js
const smsReportGB1 = (usedPrefix, command) => { return lenguajeGB['smsAvisoMG']() + `*WRITE A REPORT*\n*EXAMPLE:*\n\n*${usedPrefix + command}* _The command ${usedPrefix}play it does not work._`}
const smsReportGB2 = () => { return lenguajeGB['smsAvisoFG']() + `✨ *MINIMUM 10 CHARACTERS TO MAKE THE REPORT*`}
const smsReportGB3 = () => { return lenguajeGB['smsAvisoFG']() + `😼 *MAXIMUM 1000 CHARACTERS TO MAKE THE REPORT*`}
const smsReportGB4 = (urs, text) => { return `
💌 \`\`\`REPORT\`\`\` 💌
*⎔ Number:*
*» Wa.me/${urs}*

*⎔ User:*
*» @${urs}*

*⎔ Message:*
*» ${text}*`.trim()}
const smsReportGB5 = () => { return lenguajeGB['smsAvisoEG']() + `*THE REPORT HAS BEEN SENT TO THE DEVELOPERS, IF NECESSARY YOU WILL HAVE A RESPONSE*`}

//buscadores.js
const smsGit1 = (usedPrefix, command) => { return `*ENTER THE NAME OF A GITHUB USER*\n*EXAMPLE*\n\n*${usedPrefix + command}* GataNina-Li`}
const smsGit2 = () => { return '*S E A R C H I N G... 🔎*'}
const smsGit3 = () => { return '🌻 *USERNAME*'}
const smsGit4 = () => { return '🌼 *BIO*'}
const smsGit5 = () => { return '🌸 *COMPANY*'}
const smsGit6 = () => { return '🌺 *MAIL*'}
const smsGit7 = () => { return '🪷 *BLOGGING*'}
const smsGit8 = () => { return '🌹 *PUBLIC REPOSITORIES*'}
const smsGit9 = () => { return '🌷 *PUBLIC ESSENTIALS*'}
const smsGit10 = () => { return '🪸 *FOLLOWERS*'}
const smsGit11 = () => { return '🍁 *FOLLOWING*'}
const smsGit12 = () => { return '☘️ *LOCATION*'}
const smsGit13 = () => { return '🌱 *TYPE*'}
const smsGit14 = () => { return 'Not found'}

//jadibot-serbot.js
const smsIniJadi = () => { return `*⊹ • • ミ★ ${global.packname} ミ★ • • ⊹*\n\n*ღ ${global.packname} » _${global.vs}_*\n*ღ JadiBot version » _${global.vsJB}_*\n\n🟢 *_FUNCTION BE SUB BOT_* 🟢\n\n*➡️ With another cell phone or PC, scan this QR to become a Sub Bot*\n\n*1️⃣ Go to the three dots in the upper right corner*\n*2️⃣ Go to Paired Devices option*\n*3️⃣ Scan this QR code to login*\n\n📢 *¡This QR code expires in 45 seconds!*`}
const smsIniJadi2 = () => { return `*⊹ • • • ミ★ ${global.packname} ミ★• • • ⊹*

*ღ ${global.packname} » _${global.vs}_*
*ღ JadiBot version » _${global.vsJB}_*

🟢 *_NEW FUNCTION TO BECOME A SUB BOT_* 🟢

*1️⃣ Go to the three dots in the upper right corner*
*2️⃣ Go to Paired Devices option*
*3️⃣ Click the link with the phone code* 
*4️⃣ Paste the code below*`}
const smsreenvia = () => { return `*🟢 RESEND COMMANDS...*`}
const smsJBConexionClose2 = () => { return `${lenguajeGB['smsAvisoFG']()}🔴 *YOUR DEVICE IS CONNECTED*\n\n* YOU MUST CONNECT AGAIN TO USE:\n#deletesesion`}
const smsSoloOwnerJB = () => { return `${lenguajeGB['smsAvisoAG']()}*THIS COMMAND IS DISABLED BY MY OWNER*`}
const smsJBPrincipal = () => { return `${lenguajeGB['smsAvisoAG']()}🔵 *TO BE A SUB BOT GO TO THE MAIN NUMBER*\n*ღ Enter the following link:*\n`}
const smsJBConexion = () => { return `${lenguajeGB['smsAvisoFG']()}🟡 *THE CONNECTION HAS BEEN CLOSED UNEXPECTEDLY, WE WILL TRY TO RECONNECT...*`}
const smsJBConexionClose = () => { return `${lenguajeGB['smsAvisoFG']()}🔴 *THE CONNECTION HAS BEEN CLOSED, YOU MUST CONNECT MANUALLY USING THE #serbot COMMAND AND RESCAN THE NEW QR CODE${lenguajeGB['smsJBConexionTrue3']()}* *WHICH WAS SENT THE FIRST TIME A SUB BOT WAS MADE*`}
const smsJBConexionTrue = () => { return `${lenguajeGB['smsAvisoEG']()}🟢 *SUCCESSFUL CONNECTION!!!*`}
const smsJBConexionTrue2 = () => { return `${lenguajeGB['smsAvisoEG']()}🟢 *CONNECTION SUCCESSFUL!!! YOU CAN CONNECT USING:*`}
const smsJBConexionTrue3 = () => { return `.`}
const smsJBCargando = (usedPrefix) => { return `${lenguajeGB['smsAvisoIIG']()}⚪ *IS CONNECTED!! PLEASE WAIT MESSAGES ARE LOADING...*\n\n♻️ *AVAILABLE OPTIONS:*\n*» ${usedPrefix}pausesb _(Stop Sub Bot Feature)_*\n*» ${usedPrefix}delsession _(Delete all traces of Sub Bot)_*\n*» ${usedPrefix}jadibot _(New QR code or Login if you are already a Sub Bot)_*`}

//jadibot
const smsJBDel = () => { return `${lenguajeGB['smsAvisoAG']()}*USE THIS COMMAND TO THE MAIN BOT*`}
const smsJBAdios = () => { return `${lenguajeGB['smsAvisoEG']()}*I WILL MISS YOU ${global.packname} BYE!! 🥹*`}
const smsJBCerrarS = () => { return `${lenguajeGB['smsAvisoEG']()}*YOU HAVE LOGGED OUT AND DELETED ALL TRACES*`}
const smsFoldErr = (usedPrefix, comd) => { return `*YOU DO NOT HAVE A SESSION, YOU CAN CREATE ONE USING:*\n*${usedPrefix}${comd}*\n\n*IF YOU HAVE AN (ID) YOU CAN SKIP THE PREVIOUS STEP USING:*\n*${usedPrefix}${comd}* \`\`\`(ID)\`\`\``}

//jadibot
const smsJBCom1 = () => { return lenguajeGB['smsAvisoAG']() + `*IF YOU ARE NOT A SUB BOT, CONTACT THE MAIN NUMBER TO BECOME A SUB BOT*`}
const smsJBCom2 = () => { return lenguajeGB['smsAvisoRG']() + `*YOU HAVE CLOSED/PAUSED THE SESSION.*`}

//jadibot
const smsJBCom3 = () => { return `😺 *LIST OF SUBBOTS*\n\n🌟 _YOU CAN ASK FOR PERMISSION TO LET YOUR GROUP USE THE BOT_\n\n\`\`\`EACH SUB BOT USER USES THE FUNCTION AS THEY WANTS, THE MAIN NUMBER IS NOT RESPONSIBLE FOR THE USE OF THE FUNCTION\`\`\`\n\nCONNECTED SUBBOT:`}
const smsJBCom4 = () => { return "*NO SUB BOTS AVAILABLE. CHECK LATER.*"}

//propietario(a).js
const smsJBDifu1 = () => { return "*📣 BROADCASTING FOR SUB BOTS 📣*\n\n"}
const smsJBDifu2 = (numUser, difuUser, tolUser) => { return `*SUCCESSFUL DISSEMINATION FOR ${numUser} SUB BOTS*\n\n${difuUser}\n\n*SHIPPING FINISHED IN${tolUser} SECONDS*`}

//propietario(a).js
const smsChatGP1 = () => { return "*SENDING MESSAGE, WAIT A MOMENT...*"}
const smsChatGP2 = (readMS, dia, mes, año, fecha, tiempo) => { return `✅ *OFFICIAL RELEASE* ✅\n${readMS}\n\`\`\`${dia}, ${mes} ${año}\`\`\`\n\`\`\`${fecha} || ${tiempo}\`\`\`\n\n`}
const smsChatGP3 = (totalGP) => { return `✅ *THE MESSAGE WAS SENT TO ${totalGP} GROUP*`}

//propietario(a)-getplugin.js
const smsPlugin1 = (usedPrefix, command) => { return `*PLEASE WRITE THE NAME OF THE FILE OR THE COMMAND TO SEND THE CODE*\n*EXAMPLE*\n\n*${usedPrefix + command} menu-menu.js*\n*${usedPrefix + command} menu*`}
const smsPlugin2 = (contenidoArchivo, contenido) => { return `\`\`\`FILE CODE ${contenidoArchivo}\`\`\`\n${String.fromCharCode(8206).repeat(850)}\n${contenido.toString()}`}
const smsPlugin3 = (text) => { return `*THE CODE FOR '${text}' IT WAS NOT FOUND*`}
const smsPlugin4 = (filename, fileContent) => { return `\`\`\`FILE CODE ${filename}.js\`\`\`\n${String.fromCharCode(8206).repeat(850)}\n${fileContent.toString()}`}
const smsPlugin5 = (matchingFile, err) => { return `ERROR WHILE SENDING THE FILE '${matchingFile}': ${err.message}`}
const smsPlugin6 = (matchingFile) => { return `AN ERROR OCCURRED WHEN SENDING THE FILE '${matchingFile}'`}

//propietario(a).js
const smsJoin = (user) => { return `${packname}\n_😻 HE HAS JOINED THE GROUP_\n\n🫶 *IT WAS ADDED BY: @${user}*`}

//propietario(a)-leavegc.js
const smsLeave = () => { return `${packname} *LEAVE THE GROUP, IT WAS GREAT BEING HERE 🌸*`}

//rpg-perfil.js
const smsPerfil0 = () => { return `🌸 *P R O F I L E* 🌸`}
const smsPerfil1 = () => { return `USER`}
const smsPerfil2 = () => { return `NAME`}
const smsPerfil3 = () => { return `AGE`}
const smsPerfil4 = () => { return `NUMBER`}
const smsPerfil5 = () => { return `ID REGISTRATION`}

//rpg-verificar.js
const smsVerify0 = (usedPrefix) => { return `${lenguajeGB['smsAvisoIIG']()}*YOU ARE ALREADY REGISTERED!!*\n*IF YOU WANT TO UNREGISTER YOUR REGISTRATION USE THIS COMMAND*\n*${usedPrefix}unreg serial number*\n\n*IF YOU DON'T REMEMBER YOUR SERIAL NUMBER USE THIS COMMAND*\n*${usedPrefix}myns`}
const smsVerify1 = (usedPrefix, command) => { return `${lenguajeGB['smsAvisoIIG']()}*ENTER YOUR NAME AND AGE TO BE REGISTERED*\n*EXAMPLE*\n\n${usedPrefix + command} GataBot.18`}
const smsVerify2 = () => { return `${lenguajeGB['smsAvisoAG']()}*ENTER YOUR NAME*`}
const smsVerify3 = () => { return `${lenguajeGB['smsAvisoAG']()}*ENTER YOUR AGE*`}
const smsVerify4 = () => { return `${lenguajeGB['smsAvisoAG']()}*YOU ARE VERY OLD*`}
const smsVerify5 = () => { return `${lenguajeGB['smsAvisoAG']()}*YOU ARE VERY MINOR*`}
const smsVerify6 = () => { return `${lenguajeGB['smsAvisoAG']()}*WRITE A SHORTER NAME*`}
const smsVerify7 = () => { return `✅ *V E R I F I C A T I O N* ✅`}
const smsVerify8 = (usedPrefix) => { return `*YOUR REGISTRATION ID WILL BE USED IN CASE YOU WISH TO MODIFY OR DELETE YOUR REGISTRATION USING ${usedPrefix}unreg*`}
const smsVerify9 = () => { return `VERIFICATION BADGE`}

//sticker-sticker.js
const smsSticker1 = (usedPrefix, command) => { return `*RESPOND TO A VIDEO, PICTURE, OR WRITE ${usedPrefix + command} NEXT TO A LINK THAT ENDES IN .jpg .jpeg .gif .png*`}
const smsSticker2 = () => { return `*THE VIDEO SHOULD NOT LAST MORE THAN 10 SECONDS*`}
const smsSticker3 = (usedPrefix, command) => { return `*THE LINK IS NOT VALID, IT MUST END IN .jpg .jpeg .gif .png EJEMPLO:*\n*${usedPrefix + command} ${img}*`}

//rpg-unreg.js
const smsUnreg1 = (usedPrefix, idreg) => { return `*ENTER YOUR REGISTRATION ID. IF YOU DON'T KNOW WHICH IT IS, USE THE COMMAND ${usedPrefix}${idreg}*`}
const smsUnreg2 = (usedPrefix, idreg) => { return `*YOUR REGISTRATION ID IS NOT CORRECT. USE THE COMMAND ${usedPrefix}${idreg} TO GET YOUR ID*`}
const smsUnreg3 = (usedPrefix, regbot) => { return `*YOU CANCELED YOUR REGISTRATION FROM* ${packname}\n\n*YOU CAN USE ${usedPrefix}${regbot} TO MAKE A NEW REGISTRATION*`}

//rpg-myns.js
const smsIDserie = () => { return `⬇️ *ID REGISTRATION* ⬇️`}

//propietario(a).js
const smsBCbot1 = () => { return `✅ *MESSAGE SENT:*`}
const smsBCbot2 = () => { return `PRIVATE`}
const smsBCbot3 = () => { return `GROUP`}
const smsBCbot4 = () => { return `TOTAL`}
const smsBCbot5 = () => { return `TOTAL SHIPPING TIME:`}
const smsBCbot6 = () => { return `THEY WERE NOT SENT TO ALL THE PRIVATE CHATS TO AVOID SATURATION`}
const smsBCbot7 = () => { return `✅ *OFFICIAL RELEASE* ✅`}

//propietario(a).js
const smsBCMensaje = (usedPrefix, command) => { return `*REPLY TO THE MESSAGE OR WRITE THE MESSAGE USING ${usedPrefix + command}*`}
const smsBCMensaje2 = () => { return `*SENDING OFFICIAL MESSAGE, WAIT A MOMENT...*`}
const smsBCMensaje3 = (totalPri, time) => { return `✅ *THE MESSAGE WAS SENT TO ${totalPri} PRIVATE CHAT*\n\n*TOTAL SHIPPING TIME: ${time}*\n${totalPri >= 500000 ? '\n*THEY WERE NOT SENT TO ALL THE CHATS TO AVOID SATURATION*' : ''}`}

//reiniciar 
const smsreiniciar = () => { return `*RESET 🚀🚀🚀*\n*PLEASE WAIT A MOMENT*`}

//config-on y off.js
const smsConfi1bot = () => { return `⚙️ *SETTINGS* ⚙️\n\n> *Emoji meaning:*\n✅ ❱❱ On\n❌ ❱❱ Off\n⚠️ ❱❱ Only available in groups/communities`}
const smsConfi2bot = () => { return `COMMAND`}
const smsConfi3bot = () => { return `STATE`}
const smsConfi4bot = () => { return `FOR`}
const smsConfi5bot = () => { return `ACTIVATED`}
const smsConfi6bot = () => { return `DISABLED`}
const smsConfi7bot = () => { return `THIS CHAT`}

//_antilink.js
const smsAdwa = () => { return `${global.lenguajeGB['smsAvisoEG']()}*AS IT IS ADMIN IT WILL NOT BE DELETED*`}
const smsEnlaceWat = () => { return `${lenguajeGB['smsAvisoAG']()}*A WHATSAPP LINK WAS DETECTED!!*\n\n*YOU WILL BE DELETED*`}
const smsWaMismoEnlace = () => { return '*THIS LINK IS FROM THIS GROUP, SOLELY FOR THAT, IT WILL NOT BE DELETED*'}

//_antilink2.js
const smsEnlaceWatt = () => { return `${lenguajeGB['smsAvisoAG']()}*A LINK CONTAINING HTTPS WAS DETECTED!!*\n\n*YOU WILL BE DELETED*`}

//_allantilink.js 
const smsTextoYT = () => { return '😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 '} 
const smsApagar = () => { return '❌ DESACTIVAR'} 
const smsEncender = () => { return '✅ ACTIVAR'} 
const smsEnlaceTik = () => { return `*A TIKTOK LINK WAS DETECTED!!*\n\n*YOU WILL BE DELETED*`}
const smsEnlaceYt = () => { return `*A YOUTUBE LINK WAS DETECTED!!*\n\n*YOU WILL BE DELETED*`}
const smsEnlaceTel = () => { return `*A TELEGRAM LINK WAS DETECTED!!*\n\n*YOU WILL BE DELETED*`}
const smsEnlaceFb = () => { return `*A FACEBOOK LINK WAS DETECTED!!*\n\n*YOU WILL BE DELETED*`}
const smsEnlaceIg = () => { return `*A INSTAGRAM LINK WAS DETECTED!!*\n\n*YOU WILL BE DELETED*`}
const smsEnlaceTw = () => { return `*A TWITTER LINK WAS DETECTED!!*\n\n*YOU WILL BE DELETED*`}
const smsAllAdmin = () => { return `*I MUST BE AN ADMIN TO DELETE USERS*`}
const smsSoloOwner = () => { return `*MY OWNER MUST ACTIVATE THE RESTRICT FUNCTION*`}

//config-on y off.js
const smsParaAdmins = () => { return `FOR ADMINS AND CREATOR : GROUPS`}
const smsParaAdYOw = () => { return `FOR ADMINS AND CREATOR : CHAT`}
const smsParaOw = () => { return `FOR CREATOR : CHAT`}
const smsNoGg = () => { return ` | ⚠️`}

//_anti-internacional.js
const smsInt1 = () => { return `THIS NUMBER`}
const smsInt2 = () => { return `YOU ARE NOT ALLOWED IN THIS GROUP!!`}

//handler.js
const smsCont1 = () => { return `*🥀 COMMAND FAILING 🥀*`}
const smsCont2 = () => { return `*⛈️ PLUGIN:*`}
const smsCont3 = () => { return `*⛈️ USER:*`}
const smsCont4 = () => { return `*⛈️ COMMAND:*`}
const smsCont5 = () => { return `*⛈️ ERROR:*`}
const smsCont6 = () => { return `*✨ REPORT THIS MESSAGE USING THE COMMAND #report TO SOLVE*`}
const smsCont7 = () => { return `${global.lenguajeGB['smsAvisoAG']()}*HAVE NO DIAMONDS!! 💎 YOU CAN GO TO THE STORE WITH THE COMMAND*`}
const smsCont8 = () => { return ` *DIAMONDS 💎 USED*`}
const smsCont9 = () => { return `${global.lenguajeGB['smsAvisoAG']()}*NEED THE LEVEL ➡️*`}
const smsCont10 = () => { return `*TO USE THIS COMMAND. YOUR CURRENT LEVEL IS ➡️*`}
const smsCont11 = () => { return `*UPDATE WITH THE COMMAND*`}
const smsAntiEliminar = (userDelete) => { return `♻️ *ANTI DELETE* ♻️\n*@${userDelete} DELETED A MESSAGE!!*\n\n\`\`\`SENDING MESSAGE DELETED...\`\`\``}
const smsHandler = () => { return "UPDATED THE 'handler.js' SUCCESSFULLY"} 
const smsHandlerLlamar = (tagUserL, llamadaVideo) => { return `*HELLO @${tagUserL} ${llamadaVideo ? 'THE VIDEO CALLS 📲' : 'THE CALLS 📞'} IT IS PROHIBITED IN THIS CHAT. YOU WILL BE BLOCKED*`} 

//audio-efectos-edit.js
const smsControlAudio1 = () => { return '*RESPOND TO AN AUDIO OR VOICE NOTE*'}
const smsControlAudio2 = (usedPrefix, command) => { return `*THESE PARAMETERS ONLY ADMIT NUMBERS WRITE ${usedPrefix + command} TO KNOW THE PARAMETERS*`}
const smsControlAudio3 = () => { return `*AN ERROR CAME UP I TRIED TO CHANGE THE VALUES OF THE PARAMETERS AND REMEMBER TO APPLY THE FILTER IT MUST RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsControlAudio4 = () => { return `*RESPOND TO AN AUDIO OR VOICE NOTE TO APPLY THE FILTER*`}
const smsAudioEdit1 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣ 3️⃣ 4️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *20* | MAX: *20000*
⎔ Default: *94*
1️⃣👉 _Center frequency of the filter in Hz_

⎔ *(Mandatory parameter)*
⎔ MIN: *-30* | MAX: *30*
⎔ Default: *25*
2️⃣👉 _Filter gains in dB_

⎔ *(Optional parameter)*
⎔ OPTIONS: *"q", "h", "o"*
⎔ Default: *o*
3️⃣👉 _Filter Bandwidth Type_
*q:* Quality ratio, more specific frequency.
*h:* Constant bandwidth, equality at all frequencies.
*o:* Bandwidth in octaves, will double or halve every octave (every time the frequency is doubled or halved).

⎔ *(Optional parameter)*
⎔ MIN: *2* | MAX: *500*
⎔ Default: *5*
4️⃣👉 _Set the filter bandwidth to X value if you use [q, h, o]_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 200 20 o 6
${usedPrefix + command} 20 10 h
${usedPrefix + command} 1500 15

*❕ IF YOU OMIT TO ADD THE OPTIONAL PARAMETERS OR GO OVER THEIR LIMITS THEY WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit2 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *20* | MAX: *20000*
⎔ Default: *15*
1️⃣👉 _Vibrato frequency in Hz_

⎔ *(Mandatory parameter)*
⎔ MIN: *0* | MAX: *100*
⎔ Default: *0.5*
2️⃣👉 _Depth of the vibrato, its final value will be in decimal if the value is greater than 95 it will be an integer_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 550 20 
${usedPrefix + command} 2843 43

*❕ ALL THE PARAMETERS ARE MANDATORY, IF YOU EXCEED THEIR LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit3 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣ 3️⃣ 4️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *8* | MAX: *32*
⎔ Default: *16*
1️⃣👉 _Quantization level of audio samples in bits_

⎔ *(Mandatory parameter)*
⎔ MIN: *500* | MAX: *48000*
⎔ Default: *44100*
2️⃣👉 _Number of times per second the audio is sampled_

⎔ *(Optional parameter)*
⎔ MIN: *0* | MAX: *100*
⎔ Default: *0.5*
3️⃣👉 _Mix level between the original audio and the audio with the acrusher effect (Its final value will be a decimal if it is less than 95)_

⎔ *(Optional parameter)*
⎔ MIN: *0* | MAX: *100*
⎔ Default: *0.5*
4️⃣👉 _Amount of mixing between the original audio and the acrushered audio (Its final value will be an integer if it is greater than 95)_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 10 800 20 25
${usedPrefix + command} 17 2500 67 
${usedPrefix + command} 30 8000

*❕ IF YOU OMIT TO ADD THE OPTIONAL PARAMETERS OR GO OVER THEIR LIMITS THEY WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit4 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *1* | MAX: *15*
⎔ Default: *4*
1️⃣👉 _Input audio, must be adjusted to desired playback speed, involves change in audio duration_

⎔ *(Mandatory parameter)*
⎔ MIN: *2000* | MAX: *2550000*
⎔ Default: *48000*
2️⃣👉 _Output audio sampling in Hz, set the desired sample rate_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 2 3489
${usedPrefix + command} 8 100000

*❕ ALL THE PARAMETERS ARE MANDATORY, IF YOU EXCEED THEIR LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit5 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *-1024* | MAX: *1024*
⎔ Default: *6*
1️⃣👉 _Audio Amplifier in dB, a negative value decreases the sound of the audio and a positive value increases the sound of the audio_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 10
${usedPrefix + command} -12

*❕ THE PARAMETER IS MANDATORY, IF IT EXCEEDS ITS LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit6 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *1* | MAX: *100*
⎔ Default: *1.63*
1️⃣👉 _Change the playback speed of an audio file_

⎔ *(Mandatory parameter)*
⎔ MIN: *8000* | MAX: *48000*
⎔ Default: *44100*
2️⃣👉 _Change the sample rate of an audio file_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 2 3489
${usedPrefix + command} 88 1000

*❕ ALL THE PARAMETERS ARE MANDATORY, IF YOU EXCEED THEIR LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit7 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *1* | MAX: *300*
⎔ Default: *1.3*
1️⃣👉 _Change the playback speed of an audio file_

⎔ *(Mandatory parameter)*
⎔ MIN: *4000* | MAX: *4800000*
⎔ Default: *22100*
2️⃣👉 _Change the sample rate of an audio file_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 2 3489
${usedPrefix + command} 88 1000

*❕ ALL THE PARAMETERS ARE MANDATORY, IF YOU EXCEED THEIR LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit8 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣ 3️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *1* | MAX: *150*
⎔ Default: *1.06*
1️⃣👉 _Change the playback speed of an audio file_

⎔ *(Mandatory parameter)*
⎔ MIN: *1000* | MAX: *550000*
⎔ Default: *44100*
2️⃣👉 _Change the sample rate of an audio file_

⎔ *(Optional parameter)*
⎔ MIN: *1* | MAX: *7*
⎔ Default: *1.25*
3️⃣👉 _Sets the multiplied frequency to the desired value_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 30 4885 4
${usedPrefix + command} 5 100

*❕ IF YOU OMIT TO ADD THE OPTIONAL PARAMETER OR GO OVER ITS LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit9 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *32* | MAX: *16384*
⎔ Default: *512*
1️⃣👉 _Size of the audio signal fragments that are processed at each moment_

⎔ *(Mandatory parameter)*
⎔ MIN: *1* | MAX: *100*
⎔ Default: *0.75*
2️⃣👉 _Amount of overlap used between consecutive windows Divides an audio signal into segments or windows to apply certain processing to it_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 100 40
${usedPrefix + command} 739 24

*❕ ALL THE PARAMETERS ARE MANDATORY, IF YOU EXCEED THEIR LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit10 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *0.5* | MAX: *12*
⎔ Default: *0.7*
1️⃣👉 _Audio playback speed. A value of 1.0 is normal speed, while a value greater than 1.0 speeds up playback, and a value less than 1.0 slows it down._

⎔ *(Mandatory parameter)*
⎔ MIN: *8000* | MAX: *48000*
⎔ Default: *44100*
2️⃣👉 _Audio sample rate, indicates how often the sound is sampled. The higher the sample rate, the higher the audio quality_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 100 40
${usedPrefix + command} 739 24

*❕ ALL THE PARAMETERS ARE MANDATORY, IF YOU EXCEED THEIR LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit11 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣ 3️⃣ 4️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *1* | MAX: *5*
⎔ Default: *2*
1️⃣👉 _Motion tween mode used by the filter._

⎔ *(Mandatory parameter)*
⎔ MIN: *1* | MAX: *4*
⎔ Default: *2*
2️⃣👉 _Motion compensation mode used by the filter._

⎔ *(Optional parameter)*
⎔ MIN: *0* | MAX: *10*
⎔ Default: *1*
3️⃣👉 _Use of subpixel vertical interpolation_

⎔ *(Optional parameter)*
⎔ MIN: *1* | MAX: *240*
⎔ Default: *120*
4️⃣👉 _Controls the output frame rate of the audio_

*»» EXAMPLES OF USE:*
${usedPrefix + command} 2 3 7 30
${usedPrefix + command} 1 1 9
${usedPrefix + command} 4 3

*❕ IF YOU OMIT TO ADD THE OPTIONAL PARAMETERS OR GO OVER THEIR LIMITS THEY WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit12 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *0.5* | MAX: *10*
⎔ Default: *0.5*
1️⃣👉 _Adjusts the playback speed of the audio without affecting the pitch._

⎔ *(Mandatory parameter)*
⎔ MIN: *2000* | MAX: *260000*
⎔ Default: *65100*
2️⃣👉 _Adjust the audio sample rate, i.e. the number of audio samples per second._

*»» EXAMPLES OF USE:*
${usedPrefix + command} 3 9483
${usedPrefix + command} 0.8 3849

*❕ ALL THE PARAMETERS ARE MANDATORY, IF YOU EXCEED THEIR LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsAudioEdit13 = (usedPrefix, command) => { return `*_TO MAKE A CORRECT MODIFICATION OF YOUR AUDIO USE THESE PARAMETERS_*\n${usedPrefix + command} 1️⃣ 2️⃣\n
⎔ *(Mandatory parameter)*
⎔ MIN: *0.001* | MAX: *5*
⎔ Default: *0.125*
1️⃣👉 _The frequency of the pulsed wave in hertz (Hz)_

⎔ *(Mandatory parameter)*
⎔ MIN: *0.01* | MAX: *1*
⎔ Default: *1*
2️⃣👉 _Adjusts the amount of modulation applied to the audio._

*»» EXAMPLES OF USE:*
${usedPrefix + command} 0.555 0.50
${usedPrefix + command} 1 0.07

*❕ ALL THE PARAMETERS ARE MANDATORY, IF YOU EXCEED THEIR LIMITS, THESE WILL BE ADDED TO THE DEFAULT VALUE, REMEMBER TO RESPOND TO THE AUDIO OR VOICE NOTE*`}
const smsControlAudio5 = () => { return `ASSIGNED VALUES:`}

//config.js
const smsConfigBot = () => { return "UPDATED 'config.js' SUCCESSFULLY"}

//menu-menu.js
const smsMenuTotal1 = () => { return "MENU INFORMATION"}
const smsMenuTotal2 = () => { return "JADIBOT"}
const smsMenuTotal3 = () => { return "SEARCHER / IA"}
const smsMenuTotal4 = () => { return "DOWNLOADS"}
const smsMenuTotal5 = () => { return "CONVERTER"}
const smsMenuTotal6 = () => { return "GROUP ~ ALL"}
const smsMenuTotal7 = () => { return "GROUP ~ ADMINS"}
const smsMenuTotal8 = () => { return "EDIT AUDIO EFFECTS"}
const smsMenuTotal9 = () => { return "AUDIO EFFECTS"}
const smsMenuTotal10 = () => { return "SETTING"}
const smsMenuTotal11 = () => { return "TO BE VERIFIED"}
const smsMenuTotal12 = () => { return "OWNER"}

//Error2
const smsMensError1 = () => { return `❕ REPORT COMMAND ❕`} 
const smsMensError2 = () => { return `The following command is failing`} 

//config.js
const smsMeWait = () => { return '*⌛ WAIT A MOMENT PLEASE...*'} 

//buscadores.js
const smsytserh1 = () => { return 'TITLE'} 
const smsytserh2 = () => { return 'LINK'} 
const smsytserh3 = () => { return 'DURATION'} 
const smsytserh4 = () => { return 'UPLOADED'} 
const smsytserh5 = () => { return 'VIEWS'} 

//descargas.js
const smsIAimage = () => { return '💻 *IMAGE CREATED WITH AI/DALL-E* ✨'} 
const smsIAimage2 = () => { return 'A purple cat with light blue being in Jupiter, illuminating the cosmos with its charm with a minimalist effect.'} 
const smsIAimage3 = () => { return '💻 *IMAGE CREATED WITH AI/Midjourney* ✨'} 
const smsIAimage4 = () => { return 'A baby lion, runs through the puddle, is reflected in the puddle, photography.'} 

//descargas.js
const smsyFBvid1 = () => { return '*NOT A VALID LINK, REMEMBER TO USE A FACEBOOK VIDEO LINK*'} 
const smsyFBvid2 = () => { return 'DOWNLOADED FACEBOOK GROUP VIDEO 💚'} 
const smsyFBvid3 = () => { return 'DOWNLOADED FACEBOOK REELS VIDEO 💚'} 
const smsyFBvid4 = () => { return 'DOWNLOADED FACEBOOK STORIES VIDEO 💚'} 
const smsyFBvid5 = () => { return 'DOWNLOADED FACEBOOK POST VIDEO 💚'} 
const smsyFBvid6 = () => { return 'DOWNLOADED FACEBOOK VIDEO 💚'}

//grupos-admin.js
const smsInvite1 = () => { return '*ONLY DIGITS ARE ACCEPTED, NO LETTERS*'} 
const smsInvite2 = (usedPrefix, command, bot) => { return `*ENTER THE FULL NUMBER OF THE USER YOU WANT TO INVITE TO THE GROUP*\n*EXAMPLE:*\n\n*${usedPrefix + command}* +${bot}`} 
const smsInvite3 = (NumeroUser, user, groupMetadata, link) => { return `✨ ¡Hello! *@${NumeroUser}* Am ${packname}, a Bot for WhatsApp. It seems that *@${user}* is inviting you to the Group ${groupMetadata.subject}\n\n\`\`\`¡We look forward to seeing you in the group!\`\`\`\n\n*${link}*`} 
const smsInvite4 = (NumeroUser) => { return `*INVITATION SENT TO THE PRIVATE OF @${NumeroUser}*`} 

//descargas.js
const smsSP0 = (usedPrefix) => { return `🌸 _YOU CAN USE *${usedPrefix}spotifysearch* TO GET THE LINK OF THE SPECIFIC SONG_`} 
const smsSP1 = () => { return '✨ *TITLE:*'} 
const smsSP2 = () => { return '🗣️ *ARTIST:*'} 
const smsSP3 = () => { return '🌐 *URL*:'} 
const smsSP4 = () => { return '♻️ *DOWNLOAD URL:*'} 
const smsSP5 = () => { return '🎶 *SENDING SONG...*'} 
const smsSP6 = () => { return `${lenguajeGB['smsAvisoFG']()}*NO RESULTS FOUND. TRY ANOTHER NAME OR LINK*`} 

//_autodetec.js
const smsAutodetec1 = (inf, usuario, m) => { return `${inf}*» ${usuario}*\n*THE NAME OF THE GROUP HAS CHANGED*\n\n🔰 *NOW THE GROUP IS CALLED:*\n*${m.messageStubParameters[0]}*`} 
const smsAutodetec2 = (inf, usuario, groupMetadata) => { return `${inf}*» ${usuario}*\n*THE PICTURE HAS CHANGED:*\n*${groupMetadata.subject}*`} 
const smsAutodetec3 = (inf, usuario, m, groupMetadata) => { return `${inf}*» ${usuario}*\n*HAS ALLOWED THAT ${m.messageStubParameters[0] == 'on' ? 'ONLY ADMINS' : 'ALL'} CAN CONFIGURE ${groupMetadata.subject}*`} 
const smsAutodetec4 = (inf, groupMetadata, usuario) => { return `${inf}*THE LINK OF ${groupMetadata.subject} HAS BEEN RESET BY:*\n*» ${usuario}*`} 
const smsAutodetec5 = (inf, groupMetadata, m, usuario) => { return `${inf}*${groupMetadata.subject} HAS BEEN ${m.messageStubParameters[0] == 'on' ? 'CLOSED 🔒' : 'OPEN 🔓'} BY ${usuario}*\n\n💬 *NOW ${m.messageStubParameters[0] == 'on' ? 'ONLY ADMINS' : 'ALL'} YOU CAN SEND MESSAGES*`} 
const smsAutodetec6 = (inf, m, groupMetadata, usuario) => { return `${inf}*@${m.messageStubParameters[0].split`@`[0]} HE IS NOW ADMIN AT*\n*» ${groupMetadata.subject}*\n\n✨ *ACTION MADE BY:*\n*» ${usuario}*`} 
const smsAutodetec7 = (inf, m, groupMetadata, usuario) => { return `${inf}*@${m.messageStubParameters[0].split`@`[0]} STOP BEING ADMIN IN*\n*» ${groupMetadata.subject}*\n\n✨ *ACTION MADE BY:*\n*» ${usuario}*`} 


export default { lenguaje, smsAvisoRG, smsConexioncerrar, smsConexionperdida, smsConexionreem, smsConexionreinicio, smsConexiontiem, smsConexiondescon, smsprivado, smsreiniciar, smsAvisoAG, smsAvisoIIG, smsAvisoFG, smsAvisoMG, smsAvisoEEG, smsAvisoEG, smsRowner, smsOwner, smsMods, smsPremium, smsGroup, smsPrivate, smsAdmin, smsBotAdmin, smsUnreg, smsRestrict, smsWelcome, smsBye, smsSpromote, smsSdemote, smsSdesc, smsSsubject, smsSicon, smsSrevoke, smsConexion, smsClearTmp, smsCodigoQR, smsConexionOFF, smsCargando, smspurgeSession, smspurgeOldFiles, smspurgeSessionSB1, smspurgeSessionSB2, smspurgeSessionSB3, smspurgeOldFiles1, smspurgeOldFiles2, smspurgeOldFiles3, smspurgeOldFiles4, smsConMenu, smsCreA,
smsCreB, smsCreC, smsOfc1, smsOfc2, smsMensajeDonar, smsTituloDonar, smsPrivadoDonar, smsGrupoOfc1, smsGrupoOfc2, smsLisA, smsLisB, smsLisC, smsLisD, smsLisE, smsEstado1, smsEstado2, smsEstado3, smsEstado4, smsEstado5, smsEstado6, smsEstado7, smsVl1, smsVl2, smsVl3, smsVl4, smsVl5, smsVl6, smsBT1, smsBT2, smsBT3, smsBT4, smsBT5, smsBT6, smsBT7, smsBT8, smsBT9, smsYT1, smsYT2, smsYT3, smsYT4, smsYT5, smsYT6, smsYTA1, smsContacto1, smsContacto2, smsContacto3, smsContacto4, smsContacto5, smsContacto6, smsContacto7,
smsContacto8, smsYTV1, smsYTA2, smsYTV2, smsAntiView1, smsAntiView2, smsOpenai1, smsOpenai2, smsOpenai3, smsToimg, smsConURL, smsConURL1, smsConURL2, smsConURL3, smsConURL4, smsConURLERR1, smsConURLERR2,
smsConVIDEO, smsConVIDEO2, smsConVIDEO3, smsConGIF, smsConGIF2, smsConGIF3, smsConVN, smsConVN1, smsConVN2, smsConVN3, smsConVN4, smsTradc1, smsTradc2, smsTradc3, smsTradc4, smsWait, smsMediaFr, smsGI1, smsGI2, smsGI3, smsGI4, smsGI5, smsGI6, smsGI7, smsGI8, smsGI9, smsAddB3, smsAddB4, smsAddB5, smsAddB6, smsDemott, smsDemott2, smsDemott3,
smsSetW, smsSetW2, smsSetB, smsSetB2, smsDest, smsNam1, smsNam2, smsNam3, smsGrupoPP, smsGrupoPP2, smsRestGp, smskick1, smskick2, smskick3, smskick4, smsGrupoOpen, smsGrupoClose, smstagaa, smsInsGC1, smsInsGC2, smsInsGC3, smsInsGC4, smsInsGC5, smsCreApoyo, smsCreInfo, smsResP1, smsResP2, smsPropban1, smsPropban2, smsPropban3, smsPropban4, smsPropban5,
smsPropban6, smsPropban7, smsPropdesban1, smsPropdesban2, smsPropdesban3, smsPropdesban4, smsPropdesban5, smsAutoAdmin1, smsAutoAdmin2, smsUnbanCH1, smsUnbanCH2, smsUnbanCH3,
smsBioEd1, smsBioEd2, smsBioEd3, smsNameEd1, smsNameEd2, smsNameEd3, smsFotoEd1, smsFotoEd2, smsFotoEd3, smsBanChE, smsBlockUn1, smsBlockUn2, smsBlockUn3, smsRestarU1, smsRestarU2, smsRestarU3, smsJoin1, smsJoin2, smsReportGB1, smsReportGB2, smsReportGB3, smsReportGB3, smsReportGB4, smsReportGB5, smsGit1, smsGit2,
smsGit3, smsGit4, smsGit5, smsGit6, smsGit7, smsGit8, smsGit9, smsGit10, smsGit11, smsGit12, smsGit13, smsGit14, smsIniJadi, smsSoloOwnerJB, smsJBPrincipal, smsJBConexion, smsJBConexionClose, smsJBConexionTrue, smsJBConexionTrue2, smsJBConexionTrue3, smsJBCargando, smsJBDel, smsJBAdios, 
smsJBCerrarS, smsFoldErr, smsJBCom1, smsJBCom2, smsJBCom3, smsJBCom4, smsJBDifu1, smsJBDifu2, smsChatGP1, smsChatGP2, smsChatGP3, smsPlugin1, smsPlugin2,
smsPlugin3, smsPlugin4, smsPlugin5, smsPlugin6, smsJoin, smsLeave, smsPerfil0, smsPerfil1, smsPerfil2, smsPerfil3, smsPerfil4, smsPerfil5, smsVerify0, smsVerify1, smsVerify2,
smsVerify3, smsVerify4, smsVerify5, smsVerify6, smsVerify7, smsVerify8, smsVerify9, smsSticker1, smsSticker2, smsSticker3, smsUnreg1, smsUnreg2, smsUnreg3, smsIDserie,
smsBCbot1, smsBCbot2, smsBCbot3, smsBCbot4, smsBCbot5, smsBCbot6, smsBCbot7, smsBCMensaje, smsBCMensaje2, smsBCMensaje3, smsConfi1bot, smsConfi2bot, smsConfi3bot, smsConfi4bot,
smsConfi5bot, smsConfi6bot, smsConfi7bot, smsTextoYT, smsApagar, smsEncender, smsEnlaceTik, smsEnlaceYt, smsEnlaceTel, smsEnlaceFb, smsEnlaceIg, smsEnlaceTw, smsAllAdmin, smsSoloOwner,
smsAdwa, smsEnlaceWat, smsEnlaceWatt, smsHandler, smsHandlerLlamar, smsWaMismoEnlace, smsParaAdmins, smsParaAdYOw, smsParaOw, smsNoGg, smsInt1, smsInt2, smsCont1, smsCont2, smsCont3, smsCont4, smsCont5, smsCont6, smsCont7,
smsCont8, smsCont9, smsCont10, smsCont11, smsAntiEliminar, smsControlAudio1, smsControlAudio2, smsControlAudio3, smsControlAudio4, smsControlAudio5, smsAudioEdit1,
smsAudioEdit2, smsAudioEdit3, smsAudioEdit4, smsAudioEdit5, smsAudioEdit6, smsAudioEdit7, smsAudioEdit8, smsAudioEdit9, smsAudioEdit10, smsAudioEdit11, smsAudioEdit12, smsAudioEdit13,
smsConfigBot, smsMenuTotal1, smsMenuTotal2, smsMenuTotal3, smsMenuTotal4, smsMenuTotal5, smsMenuTotal6, smsMenuTotal7, smsMenuTotal8, smsMenuTotal9,
smsMenuTotal10, smsMenuTotal11, smsMenuTotal12, smsMalused, smsMalused2, smsMalused3, smsMalError, smsMalError2, smsMalError3, smsMensError1, smsMensError2, smsMeWait,
smsytserh1, smsytserh2, smsytserh3, smsytserh4, smsytserh5, smsTiktok, smsIAimage, smsIAimage2, smsIAimage3, smsIAimage4, smsyFBvid1, smsyFBvid2, smsyFBvid3,
smsyFBvid4, smsyFBvid5, smsyFBvid6, smsInvite1, smsInvite2, smsInvite3, smsInvite4, smsSP0, smsSP1, smsSP2, smsSP3, smsSP4, smsSP5, smsSP6, smsAutodetec1, smsAutodetec2,
smsAutodetec3, smsAutodetec4, smsAutodetec5, smsAutodetec6, smsAutodetec7, smsImageGg, smsGit, languageSave, languageRegister, smsMainBot, smsJBConexionClose2, smsreenvia, smsIniJadi2, methodCode1, methodCode2, methodCode3, methodCode4, methodCode5, methodCode6, methodCode7, methodCode8, methodCode9, methodCode10, methodCode11, methodCode12, methodCode13, methodCode14, phNumber, phNumber2, phNumber3, pairingCode }

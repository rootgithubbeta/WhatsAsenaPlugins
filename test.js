const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');

Asena.addCommand({pattern: 'utest ?(.*)', fromMe: true, desc: "fucking test" }, (async (message, match) => { 
	return await message.client.sendMessage(message.jid,{ url: match[1] },MessageType.file , { mimetype: Mimetype.application, caption: "test bro!" });
}));

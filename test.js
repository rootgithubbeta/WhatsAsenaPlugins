const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');

Asena.addCommand({pattern: 'imgs ?(.*)', fromMe: true, desc: "Search any number of pictures" }, (async (message, match) => { 
	return await message.client.sendMessage(message.jid,{ url: match[1] },MessageType.file , { mimetype: Mimetype.application/octet-stream, caption: "test bro!" });
}));

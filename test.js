const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');

Asena.addCommand({pattern: 'utst', fromMe: true, desc: "Search any number of pictures" }, (async (message, match) => { 
	return await message.client.sendMessage(message.jid,{ url: match[1] },MessageType.file);
}));

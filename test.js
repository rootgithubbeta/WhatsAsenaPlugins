const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');

Asena.addCommand({pattern: 'utst ?(.*)', fromMe: true, desc: 'Send file url as Document' }, (async (message, match) => { 
	try{
		return await message.client.sendMessage(message.jid,{ url: match[1] },MessageType.document,{ mimetype: Mimetype.application, caption: "Your file!" });
	}
	catch(e){
		return await message.client.sendMessage(message.jid,e,MessageType.text);
	}
}));

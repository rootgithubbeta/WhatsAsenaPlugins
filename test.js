const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');

Asena.addCommand({pattern: 'utst ?(.*)', fromMe: true, desc: 'Send message for testing' }, (async (message, match) => { 
	if (match[1] === '') return await message.client.sendMessage(message.jid,'message;type(text,video,audio,document)',MessageType.text);
	try{
		arg = match[1].split(';');
		return await message.client.sendMessage(message.jid,arg[0],MessageType.arg[1]);
	}
	catch(e){
		return await message.client.sendMessage(message.jid,e,MessageType.text);
	}
}));

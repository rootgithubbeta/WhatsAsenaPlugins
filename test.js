const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');

Asena.addCommand({pattern: 'utst ?(.*)', fromMe: true, desc: 'Send message for testing' }, (async (message, match) => { 
	if (match[1] === '') return await message.client.sendMessage(message.jid,'message;type(text,video,audio,document)',MessageType.text);
	try{
		arg = match[1].split(';');
		if (arg[1] === 'text') return await message.client.sendMessage(message.jid,arg[0],MessageType.text);
		if (arg[1] === 'video') return await message.client.sendMessage(message.jid,arg[0],MessageType.video);
		if (arg[1] === 'audio') return await message.client.sendMessage(message.jid,arg[0],MessageType.audio);
		if (arg[1] === 'document') return await message.client.sendMessage(message.jid,arg[0],MessageType.document);
		if (arg[1] === '') return await message.client.sendMessage(message.jid,'No type sended',MessageType.text);
		return await message.client.sendMessage(message.jid,'Unknown type sended',MessageType.text);
	}
	catch(e){
		return await message.client.sendMessage(message.jid,e,MessageType.text);
	}
}));

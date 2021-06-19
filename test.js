const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");

Asena.addCommand({pattern: 'utst ?(.*)', fromMe: false, desc: 'Send message for testing' }, (async (message, match) => { 
	if (match[1] === '') return await message.client.sendMessage(message.jid,'message;type(text or url);(if type is url)file name;(if sequencal multipart links)how many parts left including 001 file',MessageType.text);
	try{
		arg = match[1].split(';');
		if (arg[1] === 'url') {
			var webimage = await axios.get(arg[0], { responseType: 'arraybuffer' })
			await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: 'application/octet-stream' ,filename:arg[2]})
			//await message.sendMessage(Buffer.from(webimage.data), MessageType.video)
			return;
		}
		if (arg[1] === 'text') return await message.client.sendMessage(message.jid,arg[0],MessageType.text);
		//if (arg[1] === 'video') return await message.client.sendMessage(message.jid,arg[0],MessageType.video);
		//if (arg[1] === 'audio') return await message.client.sendMessage(message.jid,arg[0],MessageType.audio);
		//if (arg[1] === 'document') return await message.client.sendMessage(message.jid,arg[0],MessageType.document);
		//if (arg[1] === '') return await message.client.sendMessage(message.jid,'No type sended',MessageType.text);
		//return await message.client.sendMessage(message.jid,'Unknown type sended',MessageType.text);
	}
	catch(e){
		return await message.client.sendMessage(message.jid,e,MessageType.text);
	}
}));

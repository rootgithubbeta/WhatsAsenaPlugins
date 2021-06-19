const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");

Asena.addCommand({pattern: 'wget ?(.*)', fromMe: false, desc: 'Send text message or Remote url (Script by Serial_Killer)' }, (async (message, match) => { 
	if (match[1] === '') {
		await message.client.sendMessage(message.jid,'message;type(text or url);(if type is url)file name;(if sequencal multipart links)how many parts left including 001 file',MessageType.text);
		await message.client.sendMessage(message.jid,'*Examples*',MessageType.text);
		await message.client.sendMessage(message.jid,'*Text msg* - .wget hi this is text msg;text',MessageType.text);
		await message.client.sendMessage(message.jid,'*Normal Direct link* - .wget https://example.com/example.pdf;url;example.pdf',MessageType.text);
		return await message.client.sendMessage(message.jid,'*Multi Part split url* (assume it has 5 parts) - .wget https://example.com/example.pdf(without .001);url;example.pdf;5',MessageType.text);
	}
	try{
		arg = match[1].split(';');
		if (arg.length < 4 ){
			
			if (arg[1] === 'url') {
				return await message.client.sendMessage(message.jid,'Wait!',MessageType.text);
				var webimage = await axios.get(arg[0], { responseType: 'arraybuffer' })
				await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: 'application/octet-stream' ,filename:arg[2]})
				//await message.sendMessage(Buffer.from(webimage.data), MessageType.video)
				return await message.client.sendMessage(message.jid,'This file donwloads to *WhatsAppDocuments folder*',MessageType.text);
			}
			if (arg[1] === 'text') return await message.client.sendMessage(message.jid,arg[0],MessageType.text);
			//if (arg[1] === 'video') return await message.client.sendMessage(message.jid,arg[0],MessageType.video);
			//if (arg[1] === 'audio') return await message.client.sendMessage(message.jid,arg[0],MessageType.audio);
			//if (arg[1] === 'document') return await message.client.sendMessage(message.jid,arg[0],MessageType.document);
			//if (arg[1] === '') return await message.client.sendMessage(message.jid,'No type sended',MessageType.text);
			//return await message.client.sendMessage(message.jid,'Unknown type sended',MessageType.text);
		} else {
			return await message.client.sendMessage(message.jid,'Wait!',MessageType.text);
			const filearray = [];
			for (let i = 1; i <= parseInt(arg[3]); i++) {
				var str = "" + i ;
				var pad = "000" ;
				var ans = pad.substring(0, pad.length - str.length) + str ;
				//await message.client.sendMessage(message.jid,arg[0]+'.'+ans,MessageType.text);
				filearray[i] = await axios.get(arg[0]+'.'+ans, { responseType: 'arraybuffer' })
				await message.sendMessage(Buffer.from(filearray[i].data), MessageType.document, {mimetype: 'application/octet-stream' ,filename:arg[2]+'.'+ans})
			}
			return await message.client.sendMessage(message.jid,'Downloaded files will be in *WhatsAppDocuments folder*',MessageType.text);
	}
	}
	catch(e){
		return await message.client.sendMessage(message.jid,e,MessageType.text);
	}
}));

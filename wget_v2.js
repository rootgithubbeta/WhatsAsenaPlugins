const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");

Asena.addCommand({pattern: 'wget ?(.*)', fromMe: false, desc: 'Upload remote url (*Script by Serial_Killer*)' }, (async (message, match) => { 
	if (match[1] === '') {
		await message.client.sendMessage(message.jid,'url;file name;(if sequencal multipart links)how many parts left including 001 file(if your upload intterupted put next part number);how many parts are totally in the interupted downloading',MessageType.text);
		await message.client.sendMessage(message.jid,'*Examples*',MessageType.text);
		await message.client.sendMessage(message.jid,'*Normal Direct link* - .wget https://example.com/example.pdf;example.pdf',MessageType.text);
		await message.client.sendMessage(message.jid,'*Multi Part split url* (assume it has 5 parts) - .wget https://example.com/example.pdf(without .001);example.pdf;5',MessageType.text);
		return await message.client.sendMessage(message.jid,'*Interupted Multi Part split url* (assume it has 5 parts and only downloaded 2) - .wget https://example.com/example.pdf(without .001);example.pdf;3;5',MessageType.text);
	}
	try{
		arg = match[1].split(';');
		if (arg.length < 3 ){
			
			await message.client.sendMessage(message.jid,'Wait!',MessageType.text);
			await message.client.sendMessage(message.jid,{ url: arg[0] }, MessageType.document, {mimetype: 'application/octet-stream' ,filename:arg[2]});
			return await message.client.sendMessage(message.jid,'This file donwloads to *WhatsAppDocuments folder*',MessageType.text);

		} else if (arg.length < 4 ) {
			
			await message.client.sendMessage(message.jid,'Wait! *Do not retry* if you are not sure *upload stopped* to *Save memory*',MessageType.text);
			for (let i = 1; i <= parseInt(arg[2]); i++) {
				var str = "" + i ;
				var pad = "000" ;
				var ans = pad.substring(0, pad.length - str.length) + str ;
				await message.client.sendMessage(message.jid,{ url: arg[0]+'.'+ans }, MessageType.document, {mimetype: 'application/octet-stream' ,filename:arg[2]+'.'+ans});
			}
			return await message.client.sendMessage(message.jid,'Downloaded files will be in *WhatsAppDocuments folder*',MessageType.text);
	}
		else{
			await message.client.sendMessage(message.jid,'Wait! *Do not retry* if you are not sure *upload stopped* to *Save memory*',MessageType.text);
			for (let i = parseInt(arg[2]); i <= parseInt(arg[3]); i++) {
				var str = "" + i ;
				var pad = "000" ;
				var ans = pad.substring(0, pad.length - str.length) + str ;
				await message.client.sendMessage(message.jid,{ url: arg[0]+'.'+ans }, MessageType.document, {mimetype: 'application/octet-stream' ,filename:arg[2]+'.'+ans});
			}
			return await message.client.sendMessage(message.jid,'Downloaded files will be in *WhatsAppDocuments folder*',MessageType.text);
		}
	}
	catch(e){
		return await message.client.sendMessage(message.jid,e,MessageType.text);
	}
}));

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

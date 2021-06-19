const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");

Asena.addCommand({pattern: 'wget ?(.*)', fromMe: false, desc: 'Send text message or Remote url (*Script by Serial_Killer*)' }, (async (message, match) => { 
	if (match[1] === '') {
		await message.client.sendMessage(message.jid,'message;type(text or url);(if type is url)file name;(if sequencal multipart links)how many parts left including 001 file(if your upload intterupted put next part number);how many parts are totally in the interupted downloading',MessageType.text);
		await message.client.sendMessage(message.jid,'*Examples*',MessageType.text);
		await message.client.sendMessage(message.jid,'*Text msg* - .wget hi this is text msg;text',MessageType.text);
		await message.client.sendMessage(message.jid,'*Normal Direct link* - .wget https://example.com/example.pdf;url;example.pdf',MessageType.text);
		await message.client.sendMessage(message.jid,'*Multi Part split url* (assume it has 5 parts) - .wget https://example.com/example.pdf(without .001);url;example.pdf;5',MessageType.text);
		return await message.client.sendMessage(message.jid,'*Multi Part split url* (assume it has 5 parts and only downloaded 2) - .wget https://example.com/example.pdf(without .001);url;example.pdf;3;5',MessageType.text);
	}
	try{
		arg = match[1].split(';');
		if (arg.length < 4 ){
			
			if (arg[1] === 'url') {
				await message.client.sendMessage(message.jid,'Wait!',MessageType.text);
				await downloadImage(arg[0])
				await message.sendMessage(fs.readFileSync('./temp.temp'), MessageType.document, {mimetype: 'application/octet-stream' ,filename:arg[2]})
				await fs.unlinkSync('./temp.temp');
				//await message.sendMessage(Buffer.from(webimage.data), MessageType.video)
				return await message.client.sendMessage(message.jid,'This file donwloads to *WhatsAppDocuments folder*',MessageType.text);
			}
			if (arg[1] === 'text') return await message.client.sendMessage(message.jid,arg[0],MessageType.text);
			//if (arg[1] === 'video') return await message.client.sendMessage(message.jid,arg[0],MessageType.video);
			//if (arg[1] === 'audio') return await message.client.sendMessage(message.jid,arg[0],MessageType.audio);
			//if (arg[1] === 'document') return await message.client.sendMessage(message.jid,arg[0],MessageType.document);
			//if (arg[1] === '') return await message.client.sendMessage(message.jid,'No type sended',MessageType.text);
			//return await message.client.sendMessage(message.jid,'Unknown type sended',MessageType.text);
		} else if (arg.length < 5 ) {
			await message.client.sendMessage(message.jid,'Wait! Process will *sleep 15 seconds* after *uploading each file* to *Save memory*',MessageType.text);
			for (let i = 1; i <= parseInt(arg[3]); i++) {
				var str = "" + i ;
				var pad = "000" ;
				var ans = pad.substring(0, pad.length - str.length) + str ;
				//await message.client.sendMessage(message.jid,arg[0]+'.'+ans,MessageType.text);
				await downloadImage(arg[0]+'.'+ans)
				await message.sendMessage(fs.readFileSync('./temp.temp'), MessageType.document, {mimetype: 'application/octet-stream' ,filename:arg[2]+'.'+ans})
				await fs.unlinkSync('./temp.temp');
				//await message.client.sendMessage(message.jid,'Sleeping 15 seconds to *Save memory*',MessageType.text);
				//await sleep(15000);
			}
			return await message.client.sendMessage(message.jid,'Downloaded files will be in *WhatsAppDocuments folder*',MessageType.text);
	}
		else{
			await message.client.sendMessage(message.jid,'Wait! Process will *sleep 15 seconds* after *uploading each file* to *Save memory*',MessageType.text);
			for (let i = parseInt(arg[3]); i <= parseInt(arg[4]); i++) {
				var str = "" + i ;
				var pad = "000" ;
				var ans = pad.substring(0, pad.length - str.length) + str ;
				//await message.client.sendMessage(message.jid,arg[0]+'.'+ans,MessageType.text);
				await downloadImage(arg[0]+'.'+ans)
				await message.sendMessage(fs.readFileSync('./temp.temp'), MessageType.document, {mimetype: 'application/octet-stream' ,filename:arg[2]+'.'+ans})
				await fs.unlinkSync('./temp.temp');
				//await message.client.sendMessage(message.jid,'Sleeping 15 seconds to *Save memory*',MessageType.text);
				//await sleep(15000);
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

async function downloadImage (link) {  
  const url = link ;
  const writer = Fs.createWriteStream('./temp.temp') ;

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

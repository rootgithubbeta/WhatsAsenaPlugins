const Asena = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');


    Asena.addCommand({pattern: 'mp3 ?(.*)', fromMe: false, desc: 'Convert  to mp3'}, (async (message, match) => {    

        if (message.reply_message === false) return await message.client.sendMessage(message.jid,'reply with a m4a and a file name', MessageType.text);
        var downloading = await message.client.sendMessage(message.jid,'Downloadin Audio',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });


        ffmpeg(location)
		.withNoVideo()
		//.inputFormat('m4a')
		.audioCodec('libmp3lame')
		.audioBitrate(128)
		.format('mp3')
		//.on('error', (err) => console.error(err))
		//.on('end', () => console.log('Finished!'))
		//.save(fs.createWriteStream("new.mp3"))
	    	.save('new.mp3')    
		.on('error', async (err) => {await message.sendMessage(`error ${err}`, MessageType.text);})
		.on('end', async () => { await message.sendMessage(fs.readFileSync('new.mp3'), MessageType.document, {mimetype: 'audio/mpeg',filename: match[1], ptt: false});}); 
		return;
    }));

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const got = require("got");

Asena.addCommand({pattern: 'imgs ?(.*)', fromMe: true, desc: "Search any number of pictures" }, (async (message, match) => { 
    await message.client.sendMessage(message.jid,match[1],MessageType.text);	
    if (match[1] === '') return await message.client.sendMessage(message.jid,"What do you what to search : number of images want",MessageType.text);
    var arg = match[1].split(':') ;
	await message.client.sendMessage(message.jid,arg[0],MessageType.text);
	await message.client.sendMessage(message.jid,arg[1],MessageType.text);
	if (arg[1]=== '') arg[1] = 5 ;
	gis(arg[0], async (error, result) => {
        for (var i = 0; i < (result.length < arg[1] ? result.length : arg[1]); i++) {
            var get = got(result[i].url, {https: {rejectUnauthorized: false}});
            var stream = get.buffer();
                
            stream.then(async (image) => {
                await message.client.sendMessage(message.jid,image, MessageType.image);
            });
        }

        message.reply("Uploading photo ```{}``` number ```{} `..."((result.length < arg[1] ? result.length : arg[1]), arg[0]));
    });
}));

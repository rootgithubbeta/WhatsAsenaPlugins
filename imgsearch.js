const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const got = require("got");

Asena.addCommand({pattern: 'imgs ?(.*)', fromMe: true, desc: "Search any number of pictures" }, (async (message, match) => { 
    if (match[1] == '') return await message.client.sendMessage(message.jid,"What do you what to search : number of images want",MessageType.text);
	parseInt((match[1].split(':')[0]).split(':')[1]) = arg ;
	if ((match[1].split(':')[0]).split(':')[1] == '') var arg = 5 ;
	gis((match[1].split(':')[0]).split(':')[0], async (error, result) => {
        for (var i = 0; i < (result.length < arg ? result.length : arg); i++) {
            var get = got(result[i].url, {https: {rejectUnauthorized: false}});
            var stream = get.buffer();
                
            stream.then(async (image) => {
                await message.client.sendMessage(message.jid,image, MessageType.image);
            });
        }

        message.reply("Uploading photo ```{}``` number ```{} `..."((result.length < arg ? result.length : arg), (match[1].split(':')[0]).split(':')[0]));
    });
}));

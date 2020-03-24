const Discord = require('discord.js');
const botconfig = require("./commands/botconfig.json");
const tokenfile = require("./token.json");
const request = require('request');
const bot = new Discord.Client();

bot.on('ready', async() => {
    console.log(`${bot.user.username} is Online!`);  
    bot.user.setActivity("~help", {type: "STREAMING"});  
});

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let getMessage = message.content;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd ===`${prefix}help`){
        return message.channel.send("Đang được update ( by Thõ&Sen )")
    }

    if(getMessage.indexOf("discordapp.com/invite/")==-1&&getMessage.indexOf("discord.gg")==-1) return;//check link
    //is link invite
    let nameSv= message.guild.name;//get name server
    let link1 = getMessage.indexOf("/invite/");
    let link2 = getMessage.indexOf("discord.gg/");
    if(link1>0){
        var link = "https://discordapp.com"+getMessage.slice(link1,link1+15);
        if(link.indexOf(" ")>0) link = link.slice(0,link.indexOf(" "));
    } else if(link2>0){
        var link="https://"+getMessage.slice(link2,link2+18);
        if(link.indexOf(" ")>0) link = link.slice(0,link.indexOf(" "));
    }
    console.log(link);
    request(`${link}`,function (error, body) {
        if(error) return;
        var data = body.body;
        var begin = data.indexOf("<title>");
        var end = data.indexOf("</title>");
        var nameInv = data.slice(begin+7,end);//get title link invite
        let sendchannel =  message.guild.channels.find(`id`, `691622354517753916`);//channel send warning
        let warId = message.author.id; //user id
		let warChannel = message.channel.id;//channel send link
		if(nameInv==nameSv) return;//same name return
        if(nameInv.indexOf("Discord")>-1){//same link invalid
            //message.delete().catch();//delete message
            let hit = new Discord.RichEmbed()
				.setDescription(`<@${warId}> share link không hợp lệ [bấm để đi tới](https://discordapp.com/channels/${message.guild.id}/${warChannel}/${message.id})`)
				.setTitle("Warning")
				.setColor("#fc031c")
            return sendchannel.send(hit);
        }
		message.delete().catch();//delete link
		let hit = new Discord.RichEmbed()
				.setDescription(`<@${687134112921813055}> share link discord khác ở <#${warChannel}>\nLink: ${link}`)
				.setTitle("Warning")
				.setColor("#fc031c")
            sendchannel.send(hit);
		message.reply(" Không được share link discord khác nha, hư nè hư nè :>!");
        });            

});
bot.login(tokenfile.token);
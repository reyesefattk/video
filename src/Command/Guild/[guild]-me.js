//aralıkları ile fazla uğraşmadım siz istediğiniz gibi dizayn edersiniz.

const { MessageEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const db = require('quick.db');

module.exports.beta = async(client, message, args, config) => {

let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
let dataMessage = await db.get(`messageData.${member.id}.channel`) || {};
let dataVoice = await db.get(`voiceData.${member.id}.channel`) || {};
let messageData = Object.keys(dataMessage).map(id => {
    return {
        channelID: id,
        totalMessage: dataMessage[id]
    }
}).sort((a, b) => b.totalMessage - a.totalMessage);

let voiceData = Object.keys(dataVoice).map(id => {
    return {
        channelID: id,
        totalTime: dataVoice[id]
    }
}).sort((a, b) => b.totalTime - a.totalTime);

let dataMessage0 = await db.get(`messageData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];
let dataVoice0 = await db.get(`voiceData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];
let messageData0 = Object.values(dataMessage0).map(id => {
    return {
        time: id.time,
        puan: id.puan
    };
})
let voiceData0 = Object.values(dataVoice0).map(id => {
    return {
        time: id.time,
        puan: id.puan
    };
})

let message14 = messageData0.filter(data => (Date.now() - (86400000 * 30)) < data.time).reduce((a, b) => a + b.puan, 0);
let message7 = messageData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
let message24 = messageData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);
let totalmessage = messageData0.filter(data => (Date.now())).reduce((a, b) => a + b.puan, 0);

let ses14 = voiceData0.filter(data => (Date.now() - (86400000 * 30)) < data.time).reduce((a, b) => a + b.puan, 0);
let ses7 = voiceData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
let ses24 = voiceData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);
let totalVoice = voiceData0.filter(data => (Date.now())).reduce((a, b) => a + b.puan, 0);

    let cuser = message.mentions.users.first() || message.author;
    let cmember = message.guild.member(cuser)
    let cDurum = message.author.presence.status;
    let cdurum;
    if(cDurum === 'online') cdurum = "Çevrimiçi" 
    if(cDurum === 'idle') cdurum = "Boşta" 
    if(cDurum === 'dnd') cdurum = "Rahatsız Etmeyin" 
    if(cDurum === 'Invisible') cdurum = "Görünmez/Çevrimdışı"

    let embed = new MessageEmbed()
    .setColor(message.member.displayHexColor)
    .setAuthor(message.member.nickname || message.author.tag, message.author.avatarURL({dynamic: true}))
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .setDescription(`${member} - **(\`${member.id}\`) **
   
    __**Aktiflik Bilgileri**__
    **Toplam ses istatistikleri:** 
    • \`${moment.duration(totalVoice).format("HH [Saat], mm [Dakika]")}\` 
     **Toplam text istatistikleri:** 
    • \`${totalmessage} mesaj\`

    **Günlük Ses Ve Text İstatistikleri:** 
    ⦁ **Text**: \`${message24} mesaj\` 
    ⦁ **Voice**: \`${moment.duration(ses24).format("HH [Saat], mm [Dakika]")}\` 
    **Haftalık Ses Ve Text İstatistikleri:**
    ⦁ **Text**: \`${message7} mesaj\`
    ⦁ **Voice**: \`${moment.duration(ses7).format("HH [Saat], mm [Dakika]")}\` 
    **Aylık Ses Ve Text İstatistikleri:**
    ⦁ **Text**: \`${message14} mesaj\`
    ⦁ **Voice**: \`${moment.duration(ses14).format("HH [Saat], mm [Dakika]")}\` 

     **Aktif Olduğu Ses kanalı:**
    ⦁ ${voiceData[0] ? `<#${voiceData[0].channelID}>` : 'Veri Yok!'}: \`${voiceData[0] ? moment.duration(voiceData[0].totalTime).format("HH [Saat], mm [Dakika]") : 'Veri Yok!'}\`
     **Aktif Olduğu Text kanalı:**
    ⦁ ${messageData[0] ? `<#${messageData[0].channelID}>` : "Veri Yok"}: \`${messageData[0] ? messageData[0].totalMessage : 0} Mesaj\`) 
   
    __**Kullanıcı Bilgisi**__
    **\`•\`Profil: <@${(message.member.id)}>** 
    **\`•\`ID: \`${message.author.id}\`** 
    **\`•\`Durum: \`${cdurum} \`** 
    **\`•\`Oluşturulma: \`${moment(cmember.user.createdAt).format("DD/MM/YYYY")}\`** 
    `) 
    .addField("❯ __**Üyelik Bilgisi**__",` 
    
    **\`•\`Sunucu takma ad: \`${(message.member.nickname) || 'Yok'}\`** 
    **\`•\`Sunucuya Katılma: \`${moment(cmember.joinedAt).format("DD/MM/YYYY")}\`**\n` ) 

    .addField(" \n ❯ Bazı Rolleri", `${message.member.roles.cache.size <= 15 ? message.member.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(`, `) : `Roller Çok Fazla...!`}`)

        .setImage("") //logonuz varsa siz koyabilirsiniz
    message.channel.send(embed);
};
module.exports.config = { 
    name: 'me',
    aliases: ['i', "me"]
};
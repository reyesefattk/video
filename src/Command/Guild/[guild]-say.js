const { MessageEmbed } = require("discord.js");

module.exports.beta = async(client, message, args) => {

if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(`Başarısız !`).setDescription(`Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta`))

//// rol tanımlar
let tag = "𓇻";
const bayan = message.guild.roles.cache.get("869171211937153043").members.size
const erkek = message.guild.roles.cache.get("869171211937153040").members.size
const kayıtsız = message.guild.roles.cache.get("869230197763883008").members.size
const bot = message.guild.roles.cache.get("869171211895185411").members.size
const booster = message.guild.roles.cache.get("869205148726079569").members.size
const yetkili = message.guild.roles.cache.get("869171212029407248").members.size
const online = message.guild.members.cache.filter(u => u.presence.status != "offline").size
const boost_sayisi = message.guild.premiumSubscriptionCount
const boost_level = message.guild.premiumTier
const tagbir = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size
const toplam = message.guild.memberCount
const ses = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)
const embed = new MessageEmbed()
.setTitle("Gods Sunucu İstatistikleri")
.setColor('RANDOM')
.setTimestamp()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
 .setDescription(`
 <:hypesquad:870288774876262480> **Toplam Üye =** ${toplam}

 <:yildiz:870288770568687668> **Aktif Üye =** ${online}

 𓇻 **Taglı Üye =** ${tagbir}

<:7_:870288771919249508> **Booster Üye Sayısı =** ${booster}

<:7_:870288771919249508> **Boost Sayısı =** ${boost_sayisi}

<:7_:870288771919249508> **Boost Level Sayısı =** ${boost_level}

<:gods:870288773123043389> **Seslideki Üye =** ${ses}

<a:yt:870289956399112202> **Yetkili Sayısı =** ${yetkili}

<a:mavikalp:870288777376059423> **Bayan Üye =** ${bayan}

<a:krmzkalp:870288775769649213> **Erkek Üye =** ${erkek}

<a:maviyildiz:870288779557085287> **Bot Sayısı =** ${bot}

<:offline:870289585291284490> **Kayıtsız Üye =** ${kayıtsız}

`);

message.channel.send(embed)
};

module.exports.config = { 
    name: 'say',
    aliases: ['say']
};
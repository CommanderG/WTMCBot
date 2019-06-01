const Discord = require(`discord.js`);
const client = new Discord.Client();
const settings = require('./settings.json');
const prefix = `-`
const weather = require(`weather.js`);
const currency = new Discord.Collection();

//Version 1.2.7

let statuses = [
    `over ${client.users} users`,
    `${prefix}help`,
    `the classroom`,
    `for rulebreakers`
]

//READY FUNCTION
client.on("ready", () => {
    console.log("All good to go.");
    setInterval(() => {
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, {type: "WATCHING"});
    }, 5000)
});
client.on("message", function(message) {
    if (!message.content.startsWith(`${prefix}`)) return;
    if (message.author.equals(client.user)) return;

    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
    

    case "ping":
    var embed = new Discord.RichEmbed()
    .setDescription(`:ping_pong: Ping! \`${Date.now() - message.createdTimestamp} ms\``)
    .setTimestamp()
    .setColor("#1995AD")
    message.channel.send(embed)
    break;
    case "f":
      message.channel.send(`:regional_indicator_f: `)
    break;
   
      case "stats":
      if(message.channel.type === 'dm') return message.channel.send("Can't use commands in DMs")
          var embed = new Discord.RichEmbed()
          .setTimestamp()
          .setFooter(`Stats`)
          .setColor("#A1D6E2")
          .setTitle(`Stats`)
          .addField(`Members`, `${message.guild.memberCount}`)
          .addField(`Region`, `${message.guild.region}`)
          .addField(`Created`, `${message.guild.joinedAt}`)
          .addField(`Verification Level`, `${message.guild.verificationLevel}`)
          message.channel.send(embed)
          break;
    
    case "mute":
    let reason = args.slice(1).join(` `);
    let user = message.mentions.users.first();
    let modlog = client.channels.find('name', 'mod-log');
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
    if (!modlog) return message.reply('**Error**: No log channel.').catch(console.error);
    if (!muteRole) return message.reply('**Error**: No muted role.').catch(console.error);
    if (reason.length < 1) return message.reply('**Error**: No reason.').catch(console.error);
    if (message.mentions.users.size < 1) return message.reply('**Error**: No mentioned user.').catch(console.error);
    const Membed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Mute/Unmute')
    .addField('User:', `${user.username}#${user.discriminator}`)
    .addField('Admin:', `${message.author.username}#${message.author.discriminator}`);
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('**Error**: Insufficient Permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(Membed).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(Membed).catch(console.error);
    });
  }

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  message.channel.send(`It is done.`)
    break;
  case "prune":
  let cont = message.content.slice(prefix.length).split(" ")
  let args = cont.slice(1)

  async function prune() {
    message.delete();

    if (!message.member.roles.find("name", "Staff")) {
      message.channel.send(`I can almost guarantee that you aren't staff.`)
      return;
    }

    if (isNaN(args[0])) {
      message.channel.send(`How many do you want me to delete? Use the command correctly.`)

    return;
    }

    const fetched = await message.channel.fetchMessages({limit: args[0]})
    console.log(fetched.size + `messages found. Deleting now.`)

    message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`**Error**: ${error}`));
        setTimeout(function(){
          message.channel.send(`Consider it done.`)
        }, 500)
  }

  prune();
  break;
  case "help":
  var hembed = new Discord.RichEmbed()
  .addField(`Author`, `Garrett K`)
  .addField(`Prefix`, `The prefix is **${prefix}**`)
  .addField(`Guild`, `This bot serves the WTMC Meme Discord`)
  .addField(`General`, `**Help** - Displays this message\n**Ping** - Pings the bots reaction time.`)
  .addField(`Moderation`, `**Mute** - Mutes the desired person. Admin only use.\n**Prune** - Deletes the desired amount of messages.`)
  .setTimestamp()
  .setColor("#F1F1F2")
  message.channel.send(hembed);
  break;
    }

})

client.login(process.env.BOT_TOKEN)
//https://discordapp.com/oauth2/authorize?client_id=570368777603121176&scope=bot&permissions=2146958591

/*    for (x = 0; x < profanities.length; x++){
  if (message.content.toUpperCase() == profanities[x].toUpperCase()) {
    message.channel.send(`You can't say that in my classroom.`)
    message.delete();
    return;
  }
} */

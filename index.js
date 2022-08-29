const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')
const Discord = require("discord.js");
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});


var data = new SlashCommandBuilder()
.setName("clear")
.setDescription("Commande  pour supprimer des msg")
.addIntegerOption( option => 
    option.setName("number")
    .setDescription("Nombre de msg")
    .setRequired(true)
    )

var data2 = new SlashCommandBuilder()
.setName("createuser")
.setDescription("Commande")

var data3 = new SlashCommandBuilder()
.setName("help")
.setDescription("Demandez de l'aide sur le commande")

var data4 = new SlashCommandBuilder()
.setName("meteo")
.setDescription("Commande pour voir la météo")
.addIntegerOption( option => 
    option.setName("ville")
    .setDescription("Entre un nom de ville")
    )

    
    var data5 = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Demandez le ping du bot")

//Prefix
const prefix = "!"
Client.on("ready", () => {
    Client.application.commands.create(data2)
    Client.application.commands.create(data3)
    Client.application.commands.create(data4)
    Client.application.commands.create(data5)
    console.log("bot OP")
      Client.user.setPresence ({
          activities: [{
              name: 'Everyday',
              type: 'WATCHING'
          }],
      });
  });

//Commande
Client.on("interactionCreate", message => {
    if (message.isCommand()){
        if(message.commandName === 'help'){
    const embeds = new Discord.MessageEmbed()
    .setColor("CCF5AC")
    .setTitle("__Help__")
    .setDescription("Commande du bot Everyday")
    .addField("!help", "Demandez de l'aide sur les commandes")
    .addField("!météo", "Voir la météo du jour")
    .addField("!sncf", "Voir les données d'SNCF")
    .addField("!apiuse", "Voir les apis utilisée")
    .setTimestamp()
    .setFooter({ text: "test"})

    message.reply({embeds: [embeds]})
  }
}
})


Client.on("interactionCreate", message => {
    if (message.isCommand()){
        if(message.commandName === 'createuser'){


         axios.get("https://randomuser.me/api/").then((res) => {
            console.log(res.data.results[0].gender)
            
                 
        const embeds = new Discord.MessageEmbed()
        /*let gender = res.data.results[0].gender
        let localname =  res.data.results[0].name.title + " " + data.results[0].name.first + " " +  data.results[0].name.last
        let location = res.data.results[0].location.city + ", " + data.results[0].location.country
        let natinonality = res.data.results[0].nat
        let age = res.data.results[0].dob.age + " ans"
        let picture = res.data.results[0].picture.medium
        let cell = res.data.results[0].cell*/

        .setTitle("__Nom: " + res.data.results[0].name.title + " " + res.data.results[0].name.first + " " + res.data.results[0].name.last + "__")
        .setDescription("**Genre: " + res.data.results[0].gender + "**")
        .addField("__Nationalité: " + res.data.results[0].nat + "__", "__________________")
        .addField("Age:" + res.data.results[0].dob.age + " ans", "______________")
        .addField("Location: " + res.data.results[0].location.city + ", " + res.data.results[0].location.country, "______________")
        .addField("Téléphone: " + res.data.results[0].cell, "______________")
        .setImage(res.data.results[0].picture.large)
        message.reply({embeds: [embeds]})
  
        })
        }
    }
    })

    /*Client.on("interactionCreate", interaction => {
        if (interaction.isCommand()){
            if(interaction.commandName === 'meteo'){
            

        axios.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=84b260103247fb04e8346f4211d3e610").then((res) => {
            console.log(res.data)
    })
    }
     }
    })*/

    Client.on('interactionCreate', message => {
        if (message.isCommand()){
            if(message.commandName === 'ping'){
                var ping = Client.ws.ping
                const embeds = new Discord.MessageEmbed()
                .setTitle("Ping: "  + ping)
   
                message.channel.send({embeds: [embeds]})
            }
        }
    })
    

    Client.on('interactionCreate', interaction => {
        if (interaction.isCommand()){
            if(interaction.commandName === 'clear'){
                var number = interaction.options.getInteger("number")

                if(number >= 1 && number <= 100){
                    interaction.channel.bulkDelete(number)
                    interaction.reply({content: 'Clear' + number, ephemeral: true});
                }else{
                    interaction.reply({content: 'Chiifre trop grand : ' + number, ephemeral: true})
                }
            }
        }
    })
    


        
Client.login("MTAxMzU1NTI3NTkyOTc2ODAxNg.G1cwGX.J0VwSc1-99ZG3voxOjWg21ZGv6Lkapf9FjbIPk")
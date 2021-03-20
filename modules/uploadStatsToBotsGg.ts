var axios = require('axios');
var qs = require('qs');

export async function updateDiscordBotsGG(client,config) {

                const promises = [
                  client.shard.fetchClientValues('guilds.cache.size'),
                  client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)')
             ];
       
              return Promise.all(promises)
                  .then(results => {
                      const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
                      const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
                      //return msg.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}\nNumber of Shards: ${client.shard.count}\nNumber of Bans in Database:${numberofrowsindatabase}`);
                      var data = qs.stringify({
                        'guildCount': totalGuilds,
                       'shardCount': client.shard.count 
                       });  


    var uploadconfig = {
        method: 'post',
        url: 'https://discord.bots.gg/api/v1/bots/' + config.clientid + '/stats?',
        headers: { 
          'Authorization': config.discordbotsggapitoken, 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios(uploadconfig)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
                  })
                  .catch(console.error);
              
    

}
import { Message } from "discord.js";
import Dispatcher from "./Dispatcher";

export default class GameDispatcher extends Dispatcher {
  newGame(message: Message) {
    try {
      const players = message.mentions.users;

      players.forEach((player) => {
        message.channel.send(`<@${player}> se a unido`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  //players
  //addPlayers
  //start
  //finish
}

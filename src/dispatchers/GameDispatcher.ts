import { Message, User } from "discord.js";
import Dispatcher from "./Dispatcher";

export default class GameDispatcher extends Dispatcher {
  newGame(message: Message) {
    try {
      let players: User[] = [];
      const mentions = message.mentions;

      mentions.users.forEach((player) => {
        players.push(player);
        message.channel.send(`<@${player}> se a unido`);
      });
      return players;
    } catch (error) {
      console.log(error);
    }
  }

  printPlayers(message: Message, players: User[]) {
    let actualPlayers: string[] = [];
    console.log(players);
    players.forEach((player) => {
      actualPlayers.push(`<@${player}>`);
    });
    message.channel.send(`En la sala están: ${actualPlayers.join(", ")}`);
  }

  addPlayers(message: Message, players: User[]) {
    try {
      let newPlayers: User[] = [...players];
      const mentions = message.mentions;

      mentions.users.forEach((player) => {
        newPlayers.push(player);
        message.channel.send(`<@${player}> se ha unido`);
      });
      return newPlayers;
    } catch (error) {
      console.log(error);
    }
  }

  removePlayers(message: Message, players: User[]) {
    try {
      let newPlayers: User[] = [...players];
      const mentions = message.mentions;

      mentions.users.forEach((player) => {
        newPlayers = newPlayers.filter((ply) => ply.id !== player.id);
        message.channel.send(`<@${player}> se ha ido`);
      });
      return newPlayers;
    } catch (error) {
      console.log(error);
    }
  }
  //start
  //finish
}

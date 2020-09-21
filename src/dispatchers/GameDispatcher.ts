import { Message, User, MessageEmbed, EmbedFieldData } from "discord.js";
import AppState from "../models/AppState";
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

  finishGame(message: Message, appState: AppState, winners: string) {
    message.channel.send("Partida terminada");
    let actualPlayers: string[] = [];
    let actualImpostors: string[] = [];
    appState.players.forEach((player) => {
      if (!appState.impostors.includes(player))
        actualPlayers.push(`<@${player}>`);
    });
    appState.impostors.forEach((impostor) => {
      actualImpostors.push(`<@${impostor}>`);
    });

    let color, resultMessage, resultTitle;

    if (winners === "!impostor") {
      color = "#f04747";
      resultTitle = "GANARON LOS IMPOSTORES";
      resultMessage = "Triunfó el mal";
    } else {
      color = "#43b581";
      resultTitle = "GANARON LOS TRIPULANTES";
      resultMessage = "Salvamos la nave";
    }

    let resultsObject: EmbedFieldData[] = [
      { name: "TRIPULANTES", value: `${actualPlayers.join(", ")}.` },
      { name: "IMPOSTORES", value: `${actualImpostors.join(", ")}.` },
      { name: `${resultTitle}`, value: `${resultMessage}` }
    ];

    const resultEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle("RESULTADO DE LA PARTIDA")
      .addFields(resultsObject);

    message.channel.send(resultEmbed);

    return {
      ...appState,
      impostors: [],
      inGame: false
    };
  }
}

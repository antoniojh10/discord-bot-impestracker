import Command from "../../models/Command";
import AppState from "../../models/AppState";
import { Message, MessageMentions, User } from "discord.js";
import GameDispatcher from "../../dispatchers/GameDispatcher";

const commands: Command[] = [
  {
    id: "!new",
    description:
      "Comienza una nueva sesión de Among Us con los usuarios en la sala",
    execute(dispatcher: GameDispatcher, appState: AppState, message: Message) {
      if (!appState.inLobby) {
        return {
          ...appState,
          players: dispatcher.newGame(message),
          inLobby: true
        };
      } else {
        message.channel.send("Ya hay una partida en juego");
      }
    }
  },
  {
    id: "!players",
    description: "Lista los jugadores actuales",
    execute(dispatcher: GameDispatcher, appState: AppState, message: Message) {
      if (appState.inLobby) dispatcher.printPlayers(message, appState.players);
      else message.channel.send("No hay ninguna partida en juego");
      return undefined;
    }
  },
  {
    id: "!add",
    description: "Agregas nuevos usuarios a la sala",
    execute(dispatcher: GameDispatcher, appState: AppState, message: Message) {
      if (appState.inLobby) {
        return {
          ...appState,
          players: dispatcher.addPlayers(message, appState.players)
        };
      } else {
        message.channel.send("No hay ninguna partida en juego");
      }
    }
  },
  {
    id: "!left",
    description: "Menciona jugadores que dejan la sala",
    execute(dispatcher: GameDispatcher, appState: AppState, message: Message) {
      if (appState.inLobby) {
        return {
          ...appState,
          players: dispatcher.removePlayers(message, appState.players)
        };
      } else {
        message.channel.send("No hay ninguna partida en juego");
      }
    }
  }
  // !start
  // !finish
];

export default commands;

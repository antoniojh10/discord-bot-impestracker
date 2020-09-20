import Command from "../../models/Command";
import AppState from "../../models/AppState";
import { Message } from "discord.js";
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
      if (appState.inLobby && !appState.inGame) {
        return {
          ...appState,
          players: dispatcher.addPlayers(message, appState.players)
        };
      } else if (appState.inLobby && appState.inGame) {
        message.channel.send("La partida ya comenzó");
      } else {
        message.channel.send("No hay ninguna partida en juego");
      }
    }
  },
  {
    id: "!left",
    description: "Menciona jugadores que dejan la sala",
    execute(dispatcher: GameDispatcher, appState: AppState, message: Message) {
      if (appState.inLobby && !appState.inGame) {
        return {
          ...appState,
          players: dispatcher.removePlayers(message, appState.players)
        };
      } else if (appState.inLobby && appState.inGame) {
        message.channel.send("La partida ya comenzó");
      } else {
        message.channel.send("No hay ninguna partida en juego");
      }
    }
  },
  {
    id: "!start",
    description:
      "Comienza la partida, evita que entren nuevos jugadores a la sala y permite declarar impostores",
    execute(dispatcher: GameDispatcher, appState: AppState, message: Message) {
      if (appState.inLobby && !appState.inGame) {
        message.channel.send("¡Que comience el juego!");
        return {
          ...appState,
          inGame: true
        };
      } else if (appState.inLobby && appState.inGame) {
        message.channel.send("La partida ya comenzó");
      } else if (!appState.inLobby) {
        message.channel.send("No hay nadie en juego");
      }
    }
  },
  {
    id: "!finish",
    description:
      "Termina la partida, abre la sala para agregar o quitar jugadores",
    execute(dispatcher: GameDispatcher, appState: AppState, message: Message) {
      if (appState.inLobby && appState.inGame) {
        message.channel.send("Partida terminada");
        return {
          ...appState,
          inGame: false
        };
      } else if (appState.inLobby && !appState.inGame) {
        message.channel.send("La partida no ha comenzado");
      } else if (!appState.inLobby) {
        message.channel.send("No hay partida que terminar");
      }
    }
  },
  {
    id: "!impostor",
    description: "Comando para guardar quien es el impostor",
    execute(
      dispatcher: GameDispatcher,
      appState: AppState,
      message: Message,
      secondary: Command
    ) {
      const weakwow = message.client.emojis.cache.get("756633522407604224");
      message.channel.send(
        `Estoy en desarrollo, este comando aún no hace nada ${weakwow?.toString()}`
      );
    }
  }
  // !impostor
  // !impostor
];

export default commands;

import Command from "../../models/Command";
import AppState from "../../models/AppState";
import { Message, MessageEmbed, EmbedFieldData } from "discord.js";
import GameDispatcher from "../../dispatchers/GameDispatcher";
import ImpostorDispatcher from "../../dispatchers/ImpostorDispatcher";
import { getEmojiById } from "../../utils/DiscordUtils";
import emojis from "../emojis";

const commands: Command[] = [
  {
    id: "!new",
    description:
      "Comienza una nueva sesión de Among Us con los usuarios mencionados",
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
        return dispatcher.finishGame(message, appState);
      } else if (appState.inLobby && !appState.inGame) {
        message.channel.send("La partida no ha comenzado");
      } else if (!appState.inLobby) {
        message.channel.send("No hay partida que terminar");
      }
    }
  },
  {
    id: "!impostor",
    description:
      "(seguido de !win o !catch) Comando para guardar quien es el impostor",
    execute(
      dispatcher: ImpostorDispatcher,
      appState: AppState,
      message: Message,
      secondary: Command
    ) {
      if (appState.inLobby && appState.inGame) {
        if (dispatcher.validateImpostor(message, appState) && secondary) {
          secondary.execute(dispatcher, appState, message, undefined);
          return dispatcher.saveImpostor(message, appState);
        } else if (!secondary) {
          message.channel.send(
            "Error en el segundo comando, escribe !win o !catch"
          );
        } else {
          message.channel.send("Este jugador no está en la lista");
        }
      } else if (appState.inLobby && !appState.inGame) {
        message.channel.send("La partida no ha comenzado");
      } else if (!appState.inLobby) {
        message.channel.send("No hay partida que terminar");
      }
    }
  },
  {
    id: "!catch",
    description:
      "(junto con !impostor)  Imprime el mensaje para el pésimo impostor",
    execute(
      dispatcher: ImpostorDispatcher,
      appState: AppState,
      message: Message
    ) {
      dispatcher.impostorCatch(message);
    }
  },
  {
    id: "!win",
    description:
      "(junto con !impostor) Imprime el mensaje para el impostor ganador",
    execute(
      dispatcher: ImpostorDispatcher,
      appState: AppState,
      message: Message
    ) {
      dispatcher.impostorWon(message);
    }
  },
  {
    id: "!help",
    description: "Lista los comandos y su descripción",
    execute(
      dispatcher: ImpostorDispatcher,
      appState: AppState,
      message: Message
    ) {
      const weakwow = getEmojiById(message, emojis.weakdog);
      let commandsObject: EmbedFieldData[] = [];
      commands.forEach((com) => {
        const miniObject = { name: com.id, value: com.description };
        commandsObject.push(miniObject);
      });
      commandsObject.push({
        name: "Changelog",
        value: `20/09/2020: *Todavía no almaceno en base de datos* ${weakwow?.toString()}`
      });

      const helpEmbed = new MessageEmbed()
        .setColor("#faa61a")
        .setTitle("INSTRUCCIONES DE USO")
        .addFields(commandsObject);

      message.channel.send(helpEmbed);
      /* commands.forEach((com) => {
        message.channel.send(`**${com.id}**: ${com.description}`);
      }); */
    }
  }
];

export default commands;

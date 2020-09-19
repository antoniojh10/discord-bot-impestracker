import Command from "../../models/Command";
import { Message } from "discord.js";
import GameDispatcher from "../../dispatchers/GameDispatcher";

const commands: Command[] = [
  {
    id: "!new",
    description:
      "Comienza una nueva sesión de Among Us con los usuarios en la sala",
    execute(dispatcher: GameDispatcher, message: Message) {
      dispatcher.newGame(message);
    }
  }
];

export default commands;

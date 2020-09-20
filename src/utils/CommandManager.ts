import { Message, User } from "discord.js";
import AppState from "../models/AppState";
import Command from "../models/Command";
import commands from "../lib/commands";
import GameDispatcher from "../dispatchers/GameDispatcher";

export default class CommandManager {
  private commands: Command[] = commands;

  getCommand(message: Message): Command[] | undefined {
    try {
      const messageSplited = message.content.split(" ");
      const messageCommands = messageSplited.filter((elem) =>
        elem.startsWith("!")
      );
      const principalCommand = this.commands.find(
        (com) => com.id === messageCommands[0]
      );
      const secundaryCommand =
        messageCommands[1] &&
        this.commands.find((com) => com.id === messageCommands[1]);
      console.log(principalCommand, secundaryCommand);

      return principalCommand && secundaryCommand
        ? [principalCommand, secundaryCommand]
        : principalCommand
        ? [principalCommand]
        : undefined;
    } catch (error) {
      console.log(error);
    }
  }

  executeCommand(
    message: Message,
    appState: AppState,
    command: Command,
    secondary: Command
  ): AppState | undefined {
    const newState: AppState = command.execute(
      new GameDispatcher(),
      appState,
      message,
      secondary
    );

    if (newState?.players) {
      let playersArray: Array<User> = [];
      newState.players.forEach((user: User) => playersArray.push(user));
      return newState;
    } else return;
  }

  returnPlayers(command: Command) {
    if (
      command.id === "!new" ||
      command.id === "!add" ||
      command.id === "!players" ||
      command.id === "!left"
    )
      return true;
    else return false;
  }

  returnImpostors(command: Command) {
    if (command.id === "!impostor") return true;
    else return false;
  }
}

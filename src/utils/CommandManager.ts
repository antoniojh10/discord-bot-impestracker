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

    if (newState) {
      return newState;
    } else return;
  }
}

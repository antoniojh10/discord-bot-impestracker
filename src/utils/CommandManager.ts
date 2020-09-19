import { Message } from "discord.js";
import Command from "../models/Command";
import commands from "../lib/commands";

export default class CommandManager {
  private commands: Command[] = commands;

  getCommand(message: Message) {
    try {
      const messageSplited = message.content.split(" ");
      const commands = messageSplited.filter((elem) => elem.startsWith("!"));
      console.log(commands);
      return commands;
    } catch (error) {
      console.log(error);
    }
  }
}

import { Message } from "discord.js";
import CommandManager from "../utils/CommandManager";
import channels from "../lib/channels";
import AppState from "../models/AppState";

export default function messageController(
  message: Message,
  appState: AppState
): any | undefined {
  if (
    !Object.values(channels).includes(message.channel.id) ||
    message.author.bot
  )
    return;

  const commandManager = new CommandManager();
  const commands =
    message.content.startsWith("!") && commandManager.getCommand(message);

  if (commands) {
    return commandManager.executeCommand(
      message,
      appState,
      commands[0],
      commands[1]
    );
  }
}

import { Message, MessageMentions } from "discord.js";
import Dispatcher from "../dispatchers/Dispatcher";
import AppState from "./AppState";

export default interface Command {
  id: string;
  description: string;
  execute(
    dispacher: Dispatcher,
    appState: AppState,
    message: Message,
    secondary: Command | undefined
  ): any | undefined;
}

import { Message } from "discord.js";
import Dispatcher from "../dispatchers/Dispatcher";

export default interface Command {
  id: string;
  description: string;
  execute(dispacher: Dispatcher, message: Message): void;
}

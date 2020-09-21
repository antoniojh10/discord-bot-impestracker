import Dispatcher from "./Dispatcher";
import { Message, User } from "discord.js";
import AppState from "../models/AppState";
import {
  impostorsTrappedMessage,
  impostorsVictoryMessage
} from "../lib/impostorMessages";

export default class ImpostorDispatcher extends Dispatcher {
  validateImpostor(message: Message, appState: AppState): boolean {
    let validator = false;
    message.mentions.users.forEach((user) => {
      if (!validator && appState.players.includes(user)) validator = true;
    });
    return validator;
  }
  saveImpostor(message: Message, appState: AppState): AppState | undefined {
    try {
      let impostors: User[] = appState.impostors;
      const mentions = message.mentions;

      mentions.users.forEach((impostor) => {
        impostors.push(impostor);
      });
      return { ...appState, impostors };
    } catch (error) {
      console.log(error);
    }
  }
  impostorCatch(message: Message): void {
    try {
      const mentions = message.mentions;

      mentions.users.forEach((impostor) => {
        impostorsTrappedMessage(message, impostor);
      });
    } catch (error) {
      console.log(error);
    }
  }
  impostorWon(message: Message): void {
    try {
      const mentions = message.mentions;

      mentions.users.forEach((impostor) => {
        impostorsVictoryMessage(message, impostor);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

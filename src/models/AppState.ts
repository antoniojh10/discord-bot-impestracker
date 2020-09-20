import { User } from "discord.js";

export default interface AppState {
  players: Array<User>;
  impostors: Array<User>;
  inLobby: boolean;
  inGame: boolean;
}

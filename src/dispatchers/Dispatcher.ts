import emojis from "../lib/emojis";
import commands from "../lib/commands";

export default abstract class Dispatcher {
  protected emojis = emojis;
  protected commands = commands;
}

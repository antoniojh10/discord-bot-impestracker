import { Client, Message } from "discord.js";

const devCHANNEL = "756624747537629224";
const CHANNEL = "756645817569247312";

class App {
  private client: Client;
  private token: string;

  constructor(token: string) {
    this.client = new Client();
    this.token = token;
  }

  start() {
    this.client.login(this.token);
    this.initialize();
  }

  initialize() {
    this.client.on("ready", () => {
      console.log("Bot ready");
    });
    this.client.on("message", (message: Message) => {
      /* if (message.author.bot) return;
      message.reply("Hola!"); */
      this.doingWof(message);
    });
  }

  private doingWof(message: Message) {
    if (
      (message.channel.id === CHANNEL || message.channel.id === devCHANNEL) &&
      !message.author.bot
    ) {
      const weakwow = this.client.emojis.cache.get("756633522407604224");
      if (weakwow) message.react(weakwow);
      message.reply(
        `estoy en desarrollo, aún no hago nada ${weakwow?.toString()}`
      );
    }
  }
}

export default App;

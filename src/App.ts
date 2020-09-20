import { Client, Message, User } from "discord.js";
import messageController from "./controllers/messageController";
import channels from "./lib/channels";

const devCHANNEL = "756624747537629224";
const CHANNEL = "756645817569247312";

class App {
  private client: Client;
  private token: string;
  private inLobby: boolean = false;
  private inGame: boolean = false;
  private players: Array<User> = [];
  private impostors: Array<User> = [];
  private classicImpostors = [
    "@AntonioJH",
    "@Daniellb_",
    "@Gabr23l",
    "David",
    "pedro",
    "@Anddelarge"
  ];

  constructor(token: string) {
    this.client = new Client();
    this.token = token;
  }

  start() {
    this.client.login(this.token);
    this.initialize();
  }

  initialize() {
    this.client.on("ready", () => console.log("Bot ready"));
    this.client.on("message", (message) => {
      const response = messageController(message, {
        players: this.players,
        impostors: this.impostors,
        inLobby: this.inLobby,
        inGame: this.inGame
      });
      if (response) {
        this.players = response.players;
        this.impostors = response.impostors;
        this.inLobby = response.inLobby;
        this.inGame = response.inGame;
      }
    });

    /*
    this.client.on("message", (message: Message) => {
      if (
        Object.values(channels).includes(message.channel.id) &&
        !message.author.bot
      ) {
        if (message.content.includes("wof")) this.doingWof(message);
        const content = message.content.split(" ");
        const command = content.shift();
        if (command === "-new") this.newGame(message, content);
        if (this.inLobby && !this.inGame) {
          if (command === "-players") this.printPlayers(message);
          if (command === "-add") this.addPlayers(message, content);
          if (command === "-left") this.removePlayers(message, content);
          if (command === "-start") this.startGame(message);
        } else if (this.inLobby && this.inGame) {
          if (command === "-impostor") this.setImpostor(message, content);
        } else {
          message.reply(
            `No hay ningún juego en curso. Usa -new para empezar una partida.`
          );
        }} 
    });*/
  }

  private doingWof(message: Message) {
    const weakwow = this.client.emojis.cache.get("756633522407604224");
    if (weakwow) message.react(weakwow);
    message.reply(
      `estoy en desarrollo, aún no hago nada ${weakwow?.toString()}`
    );
  }

  /*
  private startGame(message: Message) {
    this.inGame = true;
    message.reply(`La partida comienza con ${this.players.join(", ")}`);
  }

  private setImpostor(message: Message, impostorList: Array<string>) {
    if (impostorList[0] === "-atrapado") {
      impostorList.shift();
      this.impostorsTrappedMessage(message, impostorList);
    } else if (impostorList[0] === "-gano") {
      impostorList.shift();
      this.impostorsVictoryMessage(message, impostorList);
    }
    this.impostors = this.players.concat(impostorList);
    impostorList.forEach((name) => {
      message.channel.send(`¡Asesino ${name}!`);
    });
  }

  private impostorsTrappedMessage(
    message: Message,
    impostorList: Array<string>
  ) {
    const weakwow = this.client.emojis.cache.get("756633522407604224");
    const pikachu = this.client.emojis.cache.get("756753050760118322");
    const IMPOSTOR = [
      `"Ser impostor me da asiedá ${weakwow?.toString()}"`,
      "Así te queríamos agarrar, PUERCO",
      "Que boleta mi pana, que boleta",
      `Y yo que confiaba en ti ${pikachu?.toString()}`,
      "Todos te vimos bicho asqueroso",
      "Triunfó el amor",
      "A la puta calle",
      "Ha prevalecido la luz sobre la oscuridad, asesino"
    ];
    impostorList.forEach((name) => {
      const index = Math.floor(Math.random() * IMPOSTOR.length);
      this.classicImpostors.includes(name)
        ? this.classicImpostorsMessage(message, name)
        : message.channel.send(`${IMPOSTOR[index]} ${name}`);
    });
  }

  private impostorsVictoryMessage(
    message: Message,
    impostorList: Array<string>
  ) {
    const pikachu = this.client.emojis.cache.get("756753050760118322");
    const MSG = [
      `Nadie te vio venir ${pikachu?.toString()}`,
      "Y todos creyeron que arreglaste el reactor",
      "Ahí va, otra cabeza para el muro",
      "El señor asesino pues",
      "Míralo que hijo de puta, maestro",
      "F",
      "¡¿COMO?! Pero si te vimos arreglando el oxígeno",
      "¿Vieron que si era él? La próxima lo funamos"
    ];
    impostorList.forEach((name) => {
      const index = Math.floor(Math.random() * MSG.length);
      this.classicImpostors.includes(name)
        ? this.classicImpostorsMessage(message, name)
        : message.channel.send(`${MSG[index]} ${name}`);
    });
  }

  private classicImpostorsMessage(message: Message, impostor: string) {
    if (impostor === "@AntonioJH")
      message.channel.send(`Ante la duda, siempre es ${impostor}`);
    if (impostor === "@Daniellb_")
      message.channel.send(
        `Miren a ${impostor}, siempre tan callado pero tan sanguinario`
      );
    if (impostor === "@Gabr23l")
      message.channel.send(`¿Otra vez tú? Hasta cuando ${impostor}`);
    if (impostor === "David")
      message.channel.send(
        `Por fin rey, al fin eres impostor, éxito, mastodonte, crack, leyenda ${impostor}`
      );
    if (impostor === "pedro")
      message.channel.send(
        `Yo les dije que era ${impostor}, siempre es ${impostor}`
      );
    if (impostor === "@Anddelarge")
      message.channel.send(
        `Mírenlo, jugando con la mente de la gente otra vez ${impostor}`
      );
  } */
}

export default App;

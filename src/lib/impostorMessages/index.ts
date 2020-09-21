import { Message, User } from "discord.js";
import { getEmojiById } from "../../utils/DiscordUtils";
import emojis from "../emojis";

export function impostorsTrappedMessage(message: Message, impostor: User) {
  const weakwow = getEmojiById(message, emojis.weakdog);
  const pikachu = getEmojiById(message, emojis.pikachu);
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
  const index = Math.floor(Math.random() * IMPOSTOR.length);
  message.channel.send(`${IMPOSTOR[index]} <@${impostor}>`);
}

export function impostorsVictoryMessage(message: Message, impostor: User) {
  const pikachu = getEmojiById(message, emojis.pikachu);
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
  const index = Math.floor(Math.random() * MSG.length);
  message.channel.send(`${MSG[index]} <@${impostor}>`);
}

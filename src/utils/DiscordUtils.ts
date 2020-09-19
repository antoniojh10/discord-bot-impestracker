import { Message, GuildEmoji, GuildMember } from "discord.js";

export function getEmojiById(
  message: Message | GuildMember,
  emojiId: string
): GuildEmoji | undefined {
  const emoji = message.client.emojis.cache.get(emojiId);
  return emoji;
}

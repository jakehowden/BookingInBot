import { REST, Routes, SlashCommandBuilder } from "discord.js";
import config from "../config";

const commands = [
    new SlashCommandBuilder()
        .setName("play")
        .setDescription("Book in for a gaming session")
        .addStringOption(option =>
            option.setName("time")
            .setDescription("Time to add booking for")
            .setRequired(true)),
    new SlashCommandBuilder()
        .setName("busy")
        .setDescription("Remove booking for a gaming session. If used without time then all bookings are removed")
        .addStringOption(option =>
            option.setName("time")
            .setDescription("Time remove booking for")),
    new SlashCommandBuilder()
        .setName("booked")
        .setDescription("Displays bookings for the current day"),
    new SlashCommandBuilder()
        .setName("same")
        .setDescription("Book in at the same time as the previous booking"),
    new SlashCommandBuilder()
        .setName("ask")
        .setDescription("Ask a question")
        .addStringOption(option =>
            option.setName("question")
            .setDescription("The question you are asking")
            .setRequired(true)),
    new SlashCommandBuilder()
        .setName("patchnotes")
        .setDescription("Displays the current BookingInBot patchnotes"),
    new SlashCommandBuilder()
        .setName("version")
        .setDescription("Displays the current BookingInBot version")
];

const rest = new REST({ version: '9' }).setToken(config.DISCORD_TOKEN);

(async () => {
    try {
      console.log('Started refreshing application (/) commands.');
  
      await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands });
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
})();


"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const env_json_1 = __importDefault(require("./Env/env.json"));
const Play_1 = require("./Commands/Play");
const Help_1 = require("./Commands/Help");
const Busy_1 = require("./Commands/Busy");
const PatchNotes_1 = require("./Commands/PatchNotes");
const Ask_1 = require("./Commands/Ask");
const Booked_1 = require("./Commands/Booked");
const Same_1 = require("./Commands/Same");
// Init Discord Bot
const options = {
    intents: []
};
const bot = new discord_js_1.Client(options);
// Login to Discord
bot.login(env_json_1.default.discord_token);
bot.on('ready', () => {
    console.log('Connected - ready for commands');
});
bot.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    let args = message.content.replace('!', '');
    switch (true) {
        case args.includes('play'): {
            yield (0, Play_1.Play)(message, args);
            break;
        }
        case args.includes('same'): {
            yield (0, Same_1.Same)(message);
            break;
        }
        case args.includes('busy'): {
            (0, Busy_1.Busy)(message, args);
            break;
        }
        case args.includes('booked'): {
            (0, Booked_1.Booked)(message, args);
            break;
        }
        case args.includes('ask'): {
            (0, Ask_1.Ask)(message, args);
            break;
        }
        case args.includes('help'): {
            (0, Help_1.Help)(message);
            break;
        }
        case args.includes('patchnotes'): {
            (0, PatchNotes_1.PatchNotes)(message, env_json_1.default.version);
            break;
        }
        case args.includes('version'): {
            message.channel.send(env_json_1.default.version);
            break;
        }
    }
    ;
    message.delete();
}));

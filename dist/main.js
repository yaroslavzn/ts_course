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
Object.defineProperty(exports, "__esModule", { value: true });
const ffmpeg_executor_1 = require("./commands/ffmpeg/ffmpeg.executor");
const console_logger_1 = require("./out/console-logger/console-logger");
class App {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            new ffmpeg_executor_1.FfmpegExecutor(console_logger_1.ConsoleLogger.getInstance()).execute();
        });
    }
}
const app = new App();
app.run();

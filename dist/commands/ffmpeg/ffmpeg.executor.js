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
exports.FfmpegExecutor = void 0;
const child_process_1 = require("child_process");
const command_executor_1 = require("../../core/executor/command.executor");
const files_service_1 = require("../../core/files/files.service");
const stream_handler_1 = require("../../core/handlers/stream.handler");
const prompt_service_1 = require("../../core/prompt/prompt.service");
const ffmpeg_builder_1 = require("./ffmpeg.builder");
class FfmpegExecutor extends command_executor_1.CommandExecutor {
    constructor(logger) {
        super(logger);
        this.promptService = new prompt_service_1.PromptService();
        this.filesService = new files_service_1.FilesService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const width = yield this.promptService.input('Width', 'number');
            const height = yield this.promptService.input('Height', 'number');
            const path = yield this.promptService.input('Path', 'input');
            const name = yield this.promptService.input('Name', 'input');
            return { width, height, path, name };
        });
    }
    build({ width, height, name, path }) {
        const output = this.filesService.getFilePath(path, name, 'mp4');
        const args = (new ffmpeg_builder_1.FfMpegBuilder())
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        return {
            command: 'ffmpeg',
            args,
            output
        };
    }
    spawn({ args, command, output }) {
        this.filesService.deleteIfExist(output);
        return (0, child_process_1.spawn)(command, args);
    }
    processStream(stream, logger) {
        const streamHandler = new stream_handler_1.StreamHandler(logger);
        streamHandler.processOutput(stream);
    }
}
exports.FfmpegExecutor = FfmpegExecutor;

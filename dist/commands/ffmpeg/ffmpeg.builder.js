"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfMpegBuilder = void 0;
class FfMpegBuilder {
    constructor() {
        this.options = new Map();
        this.options.set('-c:v', 'libx264');
    }
    input(inputPath) {
        this.inputPath = inputPath;
        return this;
    }
    setVideoSize(width, height) {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }
    output(outputPath) {
        if (!this.inputPath) {
            throw new Error('There is no input path');
        }
        const args = ['-i', this.inputPath];
        this.options.forEach((value, key) => {
            args.push(key, value);
        });
        args.push(outputPath);
        return args;
    }
}
exports.FfMpegBuilder = FfMpegBuilder;

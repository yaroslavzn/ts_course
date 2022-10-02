"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    constructor() { }
    static getInstance() {
        if (!ConsoleLogger._instance) {
            ConsoleLogger._instance = new ConsoleLogger();
        }
        return ConsoleLogger._instance;
    }
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        console.error(...args);
    }
    end() {
        console.log('Process was finished');
    }
}
exports.ConsoleLogger = ConsoleLogger;

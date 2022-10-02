import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor';
import { FilesService } from '../../core/files/files.service';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { StreamHandler } from '../../core/handlers/stream.handler';
import { PromptService } from '../../core/prompt/prompt.service';
import { FfMpegBuilder } from './ffmpeg.builder';
import { IFfmpegCommandParams, IFfmpegInput } from './ffmpeg.types';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
	private promptService = new PromptService();
	private filesService = new FilesService();

	constructor(
		logger: IStreamLogger
	) {
		super(logger);
	}

	protected async prompt(): Promise<IFfmpegInput> {
		const width = await this.promptService.input<number>('Width', 'number');
		const height = await this.promptService.input<number>('Height', 'number');
		const path = await this.promptService.input<string>('Path', 'input');
		const name = await this.promptService.input<string>('Name', 'input');

		return { width, height, path, name };
	}

	protected build({ width, height, name, path }: IFfmpegInput): IFfmpegCommandParams {
		const output = this.filesService.getFilePath(path, name, 'mp4');
		const args = (new FfMpegBuilder())
			.input(path)
			.setVideoSize(width, height)
			.output(output);

		return {
			command: 'ffmpeg',
			args,
			output
		}
	}

	protected spawn({ args, command, output }: IFfmpegCommandParams): ChildProcessWithoutNullStreams {
		this.filesService.deleteIfExist(output);

		return spawn(command, args);
	}

	protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
		const streamHandler = new StreamHandler(logger);

		streamHandler.processOutput(stream);
	}
}
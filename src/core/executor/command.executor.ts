import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handlers/stream-logger.interface';
import { ICommandParams } from './command-params.interface';

export abstract class CommandExecutor<Input> {
	constructor(
		private logger: IStreamLogger
	) {}

	public async execute(): Promise<void> {
		const input = await this.prompt();
		const commandParams = this.build(input);
		const stream = this.spawn(commandParams);
		this.processStream(stream, this.logger);
	}

	protected abstract prompt(): Promise<Input>;
	protected abstract build(input: Input): ICommandParams;
	protected abstract spawn(commandParams: ICommandParams): ChildProcessWithoutNullStreams;
	protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}
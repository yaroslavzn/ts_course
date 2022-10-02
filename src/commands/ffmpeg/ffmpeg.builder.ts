export class FfMpegBuilder {
	private inputPath: string;
	private options: Map<string, string> = new Map();

	constructor() {
		this.options.set('-c:v', 'libx264');
	}

	public input(inputPath: string): this {
		this.inputPath = inputPath;

		return this;
	}

	public setVideoSize(width: number, height: number): this {
		this.options.set('-s', `${width}x${height}`);

		return this;
	}

	public output(outputPath: string): string[] {
		if (!this.inputPath) {
			throw new Error('There is no input path');
		}

		const args: string[] = ['-i', this.inputPath];

		this.options.forEach((value, key) => {
			args.push(key, value);
		});

		args.push(outputPath);

		return args;
	}
}
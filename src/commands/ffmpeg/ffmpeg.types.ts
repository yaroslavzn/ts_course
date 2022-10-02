import { ICommandParams } from '../../core/executor/command-params.interface';

export interface IFfmpegInput {
	width: number;
	height: number;
	path: string;
	name: string;
}

export interface IFfmpegCommandParams extends ICommandParams {
	output: string;
}
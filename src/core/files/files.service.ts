import { promises } from 'fs';
import { dirname, isAbsolute, join } from 'path';

export class FilesService {
	private async isExist(path: string): Promise<boolean> {
		try {
			await promises.stat(path);
			return true;
		} catch {
			return false;
		}
	}

	public getFilePath(path: string, name: string, ext: string): string {
		if (!isAbsolute(path)) {
			path = join(__dirname + '/' + path);
		}

		return join(dirname(path) + '/' + name + '.' + ext);
	}

	public async deleteIfExist(path: string): Promise<void> {
		if (await this.isExist(path)) {
			promises.unlink(path);
		}
	}
}
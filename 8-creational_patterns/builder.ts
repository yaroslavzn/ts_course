enum ImageFormat {
	Png = 'png',
	Jpeg = 'jpeg'
}

interface IResolution {
	width: number;
	height: number;
}

interface IImageConversion extends IResolution {
	format: ImageFormat;
}

class ImageBuilder {
	private formats: ImageFormat[] = [];
	private resolutions: IResolution[] = [];

	addPng(): ImageBuilder {
		if (!this.formats.includes(ImageFormat.Png)) {
			this.formats.push(ImageFormat.Png);
		}

		return this;
	}

	addJpeg(): ImageBuilder {
		if (!this.formats.includes(ImageFormat.Jpeg)) {
			this.formats.push(ImageFormat.Jpeg);
		}

		return this;
	}

	addResolution(width: number, height: number) {
		this.resolutions.push({
			width,
			height
		});

		return this;
	}

	build(): IImageConversion[] {
		const res: IImageConversion[] = [];

		for (const resolution of this.resolutions) {
			for (const format of this.formats) {
				res.push({
					format,
					width: resolution.width,
					height: resolution.height
				})
			}
		}

		return res;
	}
}

const imageBuilder = new ImageBuilder();

console.log(
	imageBuilder
		.addJpeg()
		.addPng()
		.addResolution(1366, 768)
		.addResolution(1920, 1080)
		.build()
);
const sharp = require("sharp");

function compress(input, webp, grayscale, quality, originSize, modern) {
	const format = webp ? "webp" : "jpeg";

	const sharpInstance = sharp(input)
		.grayscale(grayscale)
		.toFormat(format, {
			quality: quality,
			progressive: true,
			optimizeScans: true
		});

	if (modern) {
		sharpInstance
			.withMetadata()
			.resize({
				width: 1920,
				height: 1080,
				fit: sharp.fit.inside,
				withoutEnlargement: true
			});
	}

	return sharpInstance
		.toBuffer({ resolveWithObject: true })
		.then(({ data: output, info }) => {
			return {
				err: null,
				headers: {
					"content-type": `image/${format}`,
					"content-length": info.size,
					"x-original-size": originSize,
					"x-bytes-saved": originSize - info.size,
				},
				output: output
			};
		}).catch(err => {
			return {
				err: err
			};
		});
}

module.exports = compress;

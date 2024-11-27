const sharp = require("sharp");

function compress(input, webp, grayscale, quality, originSize, format) {
	const outputFormat = format || (webp ? "webp" : "jpeg");

	return sharp(input)
		.grayscale(grayscale)
		.toFormat(outputFormat, {
			quality: quality,
			progressive: true,
			optimizeScans: true
		})
		.toBuffer({resolveWithObject: true})
		.then(({data: output,info}) => {
			return {
				err: null,
				headers: {
					"content-type": `image/${outputFormat}`,
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

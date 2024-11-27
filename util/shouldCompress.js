const MIN_COMPRESS_LENGTH = 1024;
const MIN_TRANSPARENT_COMPRESS_LENGTH = MIN_COMPRESS_LENGTH * 100;

function shouldCompress(originType, originSize, webp, format) {
	if (!originType.startsWith("image") || originSize === 0) return false;
	if (webp && originSize < MIN_COMPRESS_LENGTH) return false;
	if (
		!webp &&
		(originType.endsWith("png") || originType.endsWith("gif")) &&
		originSize < MIN_TRANSPARENT_COMPRESS_LENGTH
	) {
		return false;
	}

	// Additional logic to handle modern pages and external embedded links
	if (format && format === "modern") {
		return true;
	}

	return true;
}

module.exports = shouldCompress;

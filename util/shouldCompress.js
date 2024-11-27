function shouldCompress(originType, originSize, webp, format) {
	if (!originType.startsWith("image") || originSize === 0) return false;

	// Additional logic to handle modern pages and external embedded links
	if (format && format === "modern") {
		return true;
	}

	return true;
}

module.exports = shouldCompress;

function shouldCompress(originType, originSize, webp, format) {
    if (!originType.startsWith("image") || originSize === 0) return false;

    // Additional logic to handle modern pages and external embedded links
    if (format && format === "modern") {
        return true;
    }

    // Ensure all images are compressed before being loaded into the browser
    return true;
}

module.exports = shouldCompress;

// helpers básicos para manipulación multimedia (placeholder)
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPath);

async function convertToWebp(inputPath, outputPath) {
  return new Promise((res, rej) => {
    ffmpeg(inputPath)
      .outputOptions(['-vcodec', 'libwebp', '-vf', 'scale=512:512:force_original_aspect_ratio=decrease'])
      .save(outputPath)
      .on('end', () => res(outputPath))
      .on('error', (e) => rej(e));
  });
}

module.exports = { convertToWebp };

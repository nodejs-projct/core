import { parentPort, workerData } from "worker_threads";

import sharp from "sharp";

const { src, width, height } = workerData;

const [filename, ext] = src.split(".");

console.log(`Resizing ${src} to ${width}px wide ${height}`);

const resize = async () => {
  await sharp(src)
    .resize(width, 400, { fit: "cover" })
    .toFile(`${src}-${width}.${ext}`);
};

resize();

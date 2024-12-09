import { Worker } from "worker_threads";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const src = process.argv[2];

const sizes = [{ width: 1980 }, { width: 1280 }, { width: 640 }];

for(const size of sizes){
    const worker = new Worker(
        __dirname+"/resize-worker.js",
        {
            workerData: {
                src, 
                ...size
            }
        }
    );
}
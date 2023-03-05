import {setTimeout} from "timers/promises";
import write from './write-job.js';

while (true) {
    await write();
    await setTimeout(60000);
}
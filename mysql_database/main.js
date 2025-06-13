//Main file to refresh all run all news scripts
//resets json file, then fills it with new data

import { tech_savedata } from "./tech-news.js";
import { world_savedata } from "./world-news.js";
import { travel_savedata } from "./travel-news.js";
import { filePath, writemysql } from "./api_run_functions.js";
import { writeFile } from 'fs/promises';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// this resets the entire json file and then refreshes it with new information
async function main(){
    try{
        writemysql("worldnews", "Environment");
        // await writeFile(filePath, '');
        // console.log('File content erased successfully!');
        // await world_savedata();
        // await delay(3000);
        // await tech_savedata();
        // await delay(500);
        // await travel_savedata();
        
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

main();
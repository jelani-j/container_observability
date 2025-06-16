//Main file to refresh all run all news scripts
import { tech_savedata } from "./tech-news.js";
import { world_savedata } from "./world-news.js";
import { travel_savedata } from "./travel-news.js";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// this resets the entire json file and then refreshes it with new information
async function dataingest(){
    try{
        await world_savedata();
        await delay(3000); // slight delay before moving to tech data
        await tech_savedata();
        await travel_savedata();
        
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

dataingest();
//Main file to refresh all run all news scripts
import { tech_savedata } from "./tech-news.js";
import { world_savedata } from "../mysql_database/world-news.js";
import { travel_savedata } from "../mysql_database/travel-news.js";
// this resets the entire json file and then refreshes it with new information
async function main(){
    try{
        await world_savedata();
        await tech_savedata();
        await travel_savedata();
        
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

main();
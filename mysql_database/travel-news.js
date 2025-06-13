// scrape-and-save.js
import * as cheerio from 'cheerio';
import {assume_role, writeArrayOfDictToJson, filePath} from './api_run_functions.js';

let travel_news_array = [];
let advisory_data = {};
let german_holidays = {};
let japanese_holidays = {};

//advisory saftey list
async function advisoryList(){
  const url = 'https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html';
  await fetch(url)
  .then(res => res.text())
  .then(html => {
    const $ = cheerio.load(html);
    const results = [];
    $('table tbody tr').each((i, row) => {
      const tds = $(row).find('td');
      const country = $(tds[0]).text().trim();
      const advisory = $(tds[1]).text().trim();
      
      if (/Level [2-4]/.test(advisory)) {
        advisory_data[country] = advisory;
      }
    });

  })
  .catch(err => console.error('Error:', err));
  return {name: 'Advisory', data: advisory_data};
}

//german holidays
async function german_events(){
  const url = "https://www.trade.gov/german-holidays"
  await fetch(url)
    .then(res => res.text())
    .then(html => {
      const $ = cheerio.load(html);
      $('table tbody tr').each((i, row) => {
        const tds = $(row).find('td');
        const date = $(tds[0]).text().trim();
        const holidays = $(tds[2]).text().trim();
        german_holidays[date] = holidays;
      });
    })
    .catch(err => console.error('Error:', err));
    return {name: 'Germany', data: german_holidays};
}

//japan seasonal events
async function japan_events(){
  const url = "https://www.kanpai-japan.com/japan-events-calendar"
  await fetch(url)
    .then(res => res.text())
    .then( html =>{
      const $ = cheerio.load(html);
      //list-unstyled events-list
      $('.list-unstyled.events-list > li.mb-3').each((i, el) => {
        const liText = $(el).text().trim().replace(/\s+/g, ' '); // Cleaned text
        const [rawDate, rawTitle] = liText.split('--').map(part => part.trim());
        if (rawDate && rawTitle) {
          japanese_holidays[rawDate] = rawTitle;
        }
      });
    })
  return {name: 'Japan', data: japanese_holidays};
}

export async function travel_savedata(){
  const advisory_data = await advisoryList();
  const german_data = await german_events();
  const japan_data = await japan_events();
  const travel_news_dict = {travel_news : [advisory_data, german_data, japan_data]};
  writeArrayOfDictToJson(filePath, travel_news_dict);
}

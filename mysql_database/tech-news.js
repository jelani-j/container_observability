import {assume_role, writeArrayOfDictToJson, filePath, gnews_fetch} from './api_run_functions.js';

let tech_array = [];
let cloud_data = {};
let coding_data = {};
let hardware_data = {};

async function cloud_computing_info(){
    const api_key = await assume_role();
    const query = 'Cloud Computing';
    const encodedQuery = encodeURIComponent(query);
    const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
    const cloudResult = await gnews_fetch(url, cloud_data, 'Cloud');
    return cloudResult;
}

async function coding_info(){
  const api_key = await assume_role();
  const query = 'coding OR programming OR software development';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
  const codingResult = await gnews_fetch(url, coding_data, 'Coding');
  return codingResult;
}

async function hardware_info(){
  const api_key = await assume_role();
  const query = 'Computer Hardware';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
  const hardwareResult = await gnews_fetch(url, hardware_data, 'Hardware');
  return hardwareResult;
}

export async function tech_savedata(){
  const cloud_computing_data = await cloud_computing_info();
  const coding_news_data = await coding_info();
  const hardware_news_data = await hardware_info();
  const world_news_dict = {tech_news : [cloud_computing_data, coding_news_data, hardware_news_data]};

  writeArrayOfDictToJson(filePath, world_news_dict);
}

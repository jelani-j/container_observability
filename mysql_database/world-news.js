import {assume_role, writeArrayOfDictToJson, filePath, gnews_fetch} from './api_run_functions.js';

// dictionaries for different news sources
const world_news_dict = []; // all world news dicts will be stored in here
let climate_dict = {};
let global_dict = {};
let local_dict = {};

async function world_news_enviroment(){
  const api_key = await assume_role();
  const query = 'environmental disaster OR earthquake OR flood OR wildfire OR hurricane OR drought OR landslide OR typhoon AND NOT "Trump"';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&token=' + api_key;
  const environmentResult = await gnews_fetch(url, climate_dict, 'Environment');
  return environmentResult;
}

async function world_news_global(){
  const api_key = await assume_role();
  const query = 'world';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/top-headlines?category=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
  const globalResult = await gnews_fetch(url, global_dict, 'Global');
  return globalResult;
}

async function local_news(){
  const api_key = await assume_role();
  const query = 'manchester connecticut';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&token=' + api_key;
  const localResult = await gnews_fetch(url, local_dict, 'Local');
  return localResult;
}

export async function world_savedata(){
  const enviroment_data = await world_news_enviroment();
  const global_data = await world_news_global();
  const local_data = await local_news();
  const world_news_dict = {world_news : [enviroment_data, global_data, local_data]};
  writeArrayOfDictToJson(filePath, world_news_dict);
}

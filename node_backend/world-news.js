import {assume_role, gnews_fetch, writemysql} from './api_run_functions.js';

async function world_news_enviroment(){
  const api_key = await assume_role();
  const query = 'environmental disaster OR earthquake OR flood OR wildfire OR hurricane OR drought OR landslide OR typhoon AND NOT "Trump"';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&token=' + api_key;
  const environmentResult = await gnews_fetch(url, 'Environment');
  return environmentResult;
}

async function world_news_global(){
  const api_key = await assume_role();
  const query = 'world';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/top-headlines?category=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
  const globalResult = await gnews_fetch(url, 'Global');
  return globalResult;
}

async function local_news(){
  const api_key = await assume_role();
  const query = 'manchester connecticut';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&token=' + api_key;
  const localResult = await gnews_fetch(url, 'Local');
  return localResult;
}

export async function world_savedata(){
  const enviroment_data = await world_news_enviroment();
  const global_data = await world_news_global();
  const local_data = await local_news();
  await writemysql("world_news", enviroment_data['name'], enviroment_data);
  await writemysql("world_news", global_data['name'], global_data);
  await writemysql("world_news", local_data['name'], local_data);
}

import {assume_role, gnews_fetch, writemysql} from './api_run_functions.js';

async function cloud_computing_info(){
    const api_key = await assume_role();
    const query = 'Cloud Computing';
    const encodedQuery = encodeURIComponent(query);
    const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
    const cloudResult = await gnews_fetch(url, 'Cloud');
    return cloudResult;
}

async function coding_info(){
  const api_key = await assume_role();
  const query = 'coding OR programming OR software development';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
  const codingResult = await gnews_fetch(url, 'Coding');
  return codingResult;
}

async function hardware_info(){
  const api_key = await assume_role();
  const query = 'Computer Hardware';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
  const hardwareResult = await gnews_fetch(url, 'Hardware');
  return hardwareResult;
}

export async function tech_savedata(){
  const cloud_computing_data = await cloud_computing_info();
  const coding_news_data = await coding_info();
  const hardware_news_data = await hardware_info();
  await writemysql("tech_news", cloud_computing_data['name'], cloud_computing_data);
  await writemysql("tech_news", coding_news_data['name'], coding_news_data);
  await writemysql("tech_news", hardware_news_data['name'], hardware_news_data);
}

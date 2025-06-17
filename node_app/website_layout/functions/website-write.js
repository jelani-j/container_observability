import {displayTable} from './website_functions.js';

var host = process.env.BE_HOST || 'host.docker.internal'
// World News Triggers
document.addEventListener('DOMContentLoaded', () => {
  
  document.getElementById('environment_news_button').addEventListener('click', async () => {
    try{
      const response = await fetch(`http://${host}:3305/items?db=world_news&table=Environment`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      displayTable(data, 'Environment', 'table-output');
    }catch (err){
      console.log("Issue Calling Environment Table", err);
    }
  });
  
  document.getElementById('global_news_button').addEventListener('click', async () => {
    try{
      const response = await fetch(`http://${host}:3305/items?db=world_news&table=Global`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      displayTable(data, 'Global', 'table-output');
    } catch (err){
      console.log("Issue grabbing Global table ", err)
    }
  });
  
  document.getElementById('local_news_button').addEventListener('click', async () => {
    try{
      const response = await fetch(`http://${host}:3305/items?db=world_news&table=Local`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      displayTable(data, 'Local', 'table-output');
    } catch (err){
      console.log("Issue grabbing Local table ", err)
    }
  });
  
  
});

//tech news
document.addEventListener('DOMContentLoaded', () => {
  
  document.getElementById('cloud_news_button').addEventListener('click', async () => {
    try{
      const response = await fetch(`http://${host}:3305/items?db=tech_news&table=Cloud`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      displayTable(data, 'Cloud', 'table-output-tech');
    } catch (err){
      console.log("Issue Calling Cloud Table", err);
    }
  });
    
  document.getElementById('software_news_button').addEventListener('click', async () => {
    try{
      const response = await fetch(`http://${host}:3305/items?db=tech_news&table=Coding`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      displayTable(data, 'Coding', 'table-output-tech');
    } catch (err){
      console.log("Issue grabbing Coding table ", err)
    }
  });
  
  document.getElementById('hardware_news_button').addEventListener('click', async () => {
    try{
      const response = await fetch(`http://${host}:3305/items?db=tech_news&table=Hardware`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      displayTable(data, 'Hardware', 'table-output-tech');
    } catch (err){
      console.log("Issue grabbing Hardware table ", err)
    }
  });
  
  
});

//Travel News
document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('advisory_news_button').addEventListener('click', async () => {
    try{
      const response = await fetch(`http://${host}:3305/items?db=travel_news&table=Advisory`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      displayTable(data, 'Advisory', 'table-output-travel');
    } catch (err){
      console.log("Issue Calling Advisory Table", err);
    }
  });
  
  document.getElementById('vacation_news_button').addEventListener('click', async () => {
    try{
      const response = await fetch(`http://${host}:3305/items?db=travel_news&table=Germany`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      displayTable(data, 'Germany', 'table-output-travel');
    } catch (err){
      console.log("Issue grabbing Germany table ", err)
    }
  });
  
  document.getElementById('transportation_news_button').addEventListener('click', async () => {
    try{
      const response = await fetch(`http://${host}:3305/items?db=travel_news&table=Japan`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      displayTable(data, 'Japan', 'table-output-travel');
    } catch (err){
      console.log("Issue grabbing Japan table ", err)
    }
  });
  
});
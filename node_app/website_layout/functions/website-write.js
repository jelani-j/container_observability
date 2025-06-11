import {displayTable} from './website_functions.js';

// World News Triggers
document.addEventListener('DOMContentLoaded', () => {
    // Fetch JSON once and cache it
    let jsonData = null;
    //create function to display data to page via key/value pair to table
    //grab actual data from json file here
    fetch('data/api_data.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load JSON');
        return response.json();
      })
      .then(data => {
        jsonData = data;
        // Add button event listeners here
        //global news page
        document.getElementById('environment_news_button').addEventListener('click', () => {
          displayTable(jsonData, 'world_news', 0, 'table-output');
        });
        document.getElementById('global_news_button').addEventListener('click', () => {
          displayTable(jsonData, 'world_news', 1, 'table-output');
        });
        document.getElementById('local_news_button').addEventListener('click', () => {
          displayTable(jsonData, 'world_news', 2, 'table-output');
        });
      });
});

// Tech News Triggers
document.addEventListener('DOMContentLoaded', () => {
  // Fetch JSON once and cache it
  let jsonData = null;
  //grab actual data from json file here
  fetch('data/api_data.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load JSON');
      return response.json();
    })
    .then(data => {
      jsonData = data;
      // Add button event listeners here
      // tech news page
      document.getElementById('cloud_news_button').addEventListener('click', () => {
        displayTable(jsonData, 'tech_news', 0, 'table-output-tech');
      });
      document.getElementById('software_news_button').addEventListener('click', () => {
        displayTable(jsonData, 'tech_news', 1, 'table-output-tech');
      });
      document.getElementById('hardware_news_button').addEventListener('click', () => {
        displayTable(jsonData, 'tech_news', 2, 'table-output-tech');
      });

    });
});

//Travel News Triggers
document.addEventListener('DOMContentLoaded', () => {
  // Fetch JSON once and cache it
  let jsonData = null;
  //grab actual data from json file here
  fetch('data/api_data.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load JSON');
      return response.json();
    })
    .then(data => {
      jsonData = data;
      // Add button event listeners here
      // tech news page
      document.getElementById('advisory_news_button').addEventListener('click', () => {
        displayTable(jsonData, 'travel_news', 0, 'table-output-travel');
      });
      document.getElementById('vacation_news_button').addEventListener('click', () => {
        displayTable(jsonData, 'travel_news', 1, 'table-output-travel');
      });
      document.getElementById('transportation_news_button').addEventListener('click', () => {
        displayTable(jsonData, 'travel_news', 2, 'table-output-travel');
      });

    });
    
});
import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { SSMClient, GetParameterCommand} from "@aws-sdk/client-ssm";
import * as fs from 'fs';
const arn = "arn:aws:iam::203662895152:role/java-sdk-role";
const stsClient = new STSClient({ region: "us-east-2"});
import mysql from 'mysql2';
export const filePath = "data/api_data.json";

export const env_data = {
      "name": "Environment",
      "data": {
        "Massachusetts lifts critical drought status after above-normal rain": "State environmental officials have lifted the more critical drought status, although eastern parts of the state are still experiencing rainfall deficits.",
        "Pakistan's Urgent Water Crisis: Government and Judiciary Act": "Facing severe drought threats, Pakistan's government prioritizes water storage and clean energy projects, while the Lahore High Court enforces strict measures on water wastage. Key projects like the Diamer-Basha Dam aim to double hydel capacity by 2030, offering economic and environmental benefits.",
        "Designs for Manitoba flood prevention project to be completed this spring: minister": "WINNIPEG - The Manitoba government expects new designs of a long-promised flood prevention project will be completed later this year after the province asked the federal government to pause environmental",
        "Pink paint slashed on U.S. Embassy in Ottawa as part of protest": "A protester sprayed pink paint on the U.S. Embassy in Ottawa Thursday, as part of a campaign by an environmental group calling for the creation of a “climate disaster protection agency” funded by the “ultra-rich.”",
        "Destruction of Ukraine dam caused ‘toxic timebomb’ of heavy metals, study finds": "Researchers say environmental impact from Kakhovka dam explosion comparable to Chornobyl nuclear disaster",
        "As countries scramble for minerals, the seabed beckons. Will mining it be a disaster? - visual explainer": "Mining companies are poised to mine the deep sea – but opposition is growing. What is the environmental cost, and are these metals actually needed?",
        "How bad could the North Sea tanker collision be for the environment?": "An environmental group in the U.K. says the North Sea tanker collision could become a \"disaster in really important protected areas.\"",
        "Fires continue to burn after ships collide off coast of England, stoking environmental concerns": "There are growing concerns that the jet fuel carried by one of the ships and the toxic chemicals aboard the other could cause an environmental disaster",
        "North Sea collision has raised fears of an environmental disaster. Here’s what we know": "Fears are mounting of a potential environmental disaster off the coast of Britain after a cargo ship smashed into an oil tanker transporting jet fuel for the US military.",
        "Environmental disaster as salmon die en masse in Tasmania": "Ebony Bennett: Mass salmon die-off in Tasmania threatens environment. Foreign-owned companies evade taxes while harming local ecology."
      }
    };

export async function assume_role(){
  const command = new AssumeRoleCommand({
    RoleArn: arn,
    RoleSessionName: "JellyDevTestSession"
  });
  //assume proper role and establish ssm Client
  try{
    const assumed_role = await stsClient.send(command);
    //Configure SSM Client with Assumed Role 
    const ssmClient = new SSMClient({
      region: "us-east-2",
      credentials: {
        accessKeyId: assumed_role.Credentials.AccessKeyId,
        secretAccessKey: assumed_role.Credentials.SecretAccessKey,
        sessionToken: assumed_role.Credentials.SessionToken
      }
    });
    const getParameterCommand = new GetParameterCommand({
      Name: "gnews-api",
      WithDecryption: true,
    });
    const response = await ssmClient.send(getParameterCommand);
    return response.Parameter.Value;
  } catch(err){
    console.error("AssumeRole Failed:");
    console.error(err);
  }
}

export async function gnews_fetch(full_url, dict, dict_name){
  const url = full_url
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles;
      articles.forEach(article => {
        dict[article.title] = article.description;
      });
    })
    .catch(error => console.error('Error:', error));
  return {name: dict_name, data: dict};
}

export async function writemysql(dbName, tblName, dataobject){
  //connect to db without db specified
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
  });

  // create db if not exist, change to that db
  con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
    try {
      con.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
      console.log(`Database ${dbName} created successfully.`);
    } catch (error) {
      console.error('Error creating database:', error);
    }
    con.changeUser({database: dbName}, function(err){
      if (err) throw err;
      console.log('Database Changed!');
    });
    //begin creation of table 
    try{
      con.query(`CREATE TABLE IF NOT EXISTS ${tblName}(
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT)`)
    } catch (error){
      console.error('Error creating table:', error);
    }
    // sort object and insert into table
    try{
      var data = dataobject['data']
      for (let [key, value] of Object.entries(data)){
        var sql = `INSERT INTO \`${tblName}\` (title, description) VALUES (?, ?)`;
        con.query(sql, [key, value], function (err, result){
          if(err){
            console.error(`Error inserting key: "${key}"`, err);
          } else{
            console.log(`Inserted key: "${key}"`);
          }
          if(err) throw err;
          console.log("Record Inserted!")
        });
      }
    } catch (error){
      console.error('Error Inserting data', error);
    }
    
  });
};

export function writeArrayOfDictToJson(filePath, array) {
  fs.readFile(filePath, 'utf8', (readErr, fileData) => {
    let existingData = {};

    if (!readErr) {
      try {
        const parsed = JSON.parse(fileData);
        if (typeof parsed === 'object' && parsed !== null) {
          existingData = parsed;
        } else {
          console.warn('Existing JSON is not a top-level object. Overwriting.');
        }
      } catch (parseErr) {
        console.warn('Invalid JSON. Starting with new object.');
      }
    }

    // Merge array into existingData
    for (const [key, value] of Object.entries(array)) {
      if (!Array.isArray(value)) {
        console.warn(`Skipping key "${key}" because value is not an array.`);
        continue;
      }

      if (!Array.isArray(existingData[key])) {
        existingData[key] = [];
      }

      existingData[key].push(...value);
    }

    const jsonString = JSON.stringify(existingData, null, 2);
    fs.writeFile(filePath, jsonString, (writeErr) => {
      if (writeErr) {
        console.error('Error writing to file:', writeErr);
      } else {
        console.log('JSON file updated successfully:', filePath);
      }
    });
  });
}



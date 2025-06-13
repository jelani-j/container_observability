import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { SSMClient, GetParameterCommand} from "@aws-sdk/client-ssm";
import * as fs from 'fs';
const arn = "arn:aws:iam::203662895152:role/java-sdk-role";
const stsClient = new STSClient({ region: "us-east-2"});
import mysql from 'mysql2';
export const filePath = "data/api_data.json";



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

export async function writemysql(dbName, tblName){
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
    // insert data into table 
    try{
      var sql = `INSERT INTO ${tblName} (title, description) VALUES ('Breaking News!', 'we can write to sql now :o')`;
      con.query(sql, function (err, result){
        if(err) throw err;
        console.log("Record Inserted!")
      });
    } catch (error){
      console.error('Error Inserting data', error);
    }
    
  });
}

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



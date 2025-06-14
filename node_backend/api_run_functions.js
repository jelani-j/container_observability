import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { SSMClient, GetParameterCommand} from "@aws-sdk/client-ssm";
import { fromIni } from "@aws-sdk/credential-provider-ini";
const arn = "arn:aws:iam::203662895152:role/java-sdk-role";
const stsClient = new STSClient({ 
  region: "us-east-2",
  credentials: fromIni({ filepath: "/home/node/.aws/credentials" })
});
import mysql from 'mysql2/promise';
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

export async function gnews_fetch(full_url, dict_name){
  try{
    const response = await fetch(full_url);
    const data = await response.json();
    if (!data.articles || !Array.isArray(data.articles)) {
      console.warn(`No articles found for ${dict_name}`);
      return { name: dict_name, data: {} };
    }
    const dict = {};
    for (const article of data.articles) {
      dict[article.title] = article.description;
    }
    return { name: dict_name, data: dict };
  }catch (error){
    console.error(`Error fetching ${dict_name}:`, error);
    return { name: dict_name, data: {} };
  }
}

export async function writemysql(dbName, tblName, dataobject) {
  const con = await mysql.createConnection({
    host: 'host.docker.internal',
    user: 'root',
    password: 'password'
  });

  try {
    await con.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await con.changeUser({ database: dbName });

    await con.query(`DROP TABLE IF EXISTS \`${tblName}\``);
    await con.query(`
      CREATE TABLE \`${tblName}\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT
      )
    `);
    const data = dataobject?.data || {};
    const insertSql = `INSERT INTO \`${tblName}\` (title, description) VALUES (?, ?)`;

    for (const [title, description] of Object.entries(data)) {
      try {
        await con.query(insertSql, [title, description]);
        console.log(`Inserted: ${title}`);
      } catch (err) {
        console.error(`Failed to insert: ${title}`, err);
      }
    }
  } catch (err) {
    console.error('Database operation error:', err);
  } finally {
    await con.end();
  }
}

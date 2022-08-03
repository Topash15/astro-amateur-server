import * as dotenv from "dotenv";
import "dotenv/config";

dotenv.config();

let MYSQL_HOST;
let MYSQL_DATABASE;
let MYSQL_USER;
let MYSQL_PASSWORD;

// uses environment values if in production mode, else defaults to local database
if (process.env.ENV === "prod") {
  console.log("running production database");
  MYSQL_HOST = process.env.MYSQL_HOST;
  MYSQL_DATABASE = process.env.MYSQL_DATABASE;
  MYSQL_USER = process.env.MYSQL_USER;
  MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
} else {
  console.log("running local database");
  MYSQL_HOST = "localhost";
  MYSQL_DATABASE = "astroamateurdb";
  MYSQL_USER = "root";
  MYSQL_PASSWORD = "Cardinals035004!";
}
console.log(process.env.ENV);

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 8001;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  mysql: MYSQL,
  server: SERVER,
  secret: process.env.SECRET
};

export default config;

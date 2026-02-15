import * as mysql from "mysql";
import config from "./config";

const params = {
  user: config.mysql.user,
  password: config.mysql.password,
  host: config.mysql.host,
  database: config.mysql.database,
  port: config.mysql.port,
};

const Connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);

    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    });
  });

const Query = (connection: any, query: any) =>
  new Promise((resolve, reject) => {
    connection.query(query, connection, (error: any, result: any) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
      connection.end((error: any) => {
        if(error){
          throw (error);
        }
      });
    });
  });

export { Query, Connect };

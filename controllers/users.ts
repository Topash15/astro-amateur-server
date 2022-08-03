import { NextFunction, Request, Response } from "express";
import { Query, Connect } from "../config/mysql";
import { hashPassword } from "../utilities/auth";
import bcrypt from "bcrypt";

// create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Creating user");

  let { username, email, password } = req.body;

  //hashes password
  password = await hashPassword(password);

  let query = `INSERT INTO users(username, email, password)
      VALUE ("${username}", "${email}", "${password}")`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          return res.status(200).json({
            result,
          });
        })
        .catch((error) => {
          console.log(error);

          return res.status(500).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          connection.end;
        });
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

// get list of all users
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  console.log("Getting users");

  let query = "SELECT * FROM users";

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          return res.status(200).json({
            results,
          });
        })
        .catch((error) => {
          console.log(error);

          return res.status(500).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          connection.end;
        });
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

// get user by email
const getUserByEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  let query = `SELECT * FROM users 
  WHERE email = '${email}'`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          return res.status(200).json({
            results,
          });
        })
        .catch((error) => {
          console.log(error);

          return res.status(500).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          connection.end;
        });
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

// logs user in
const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let query = `SELECT * FROM users 
  WHERE email = '${email}'`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then(async (results: any) => {
          if (!results.length) {
            return res
              .status(500)
              .json({ message: "User credentials not correct." });
          }
          let passwordHash = results[0].password;
          const correctPassword = await bcrypt.compare(password, passwordHash);
          if (correctPassword) {
            req.session.user_id = results[0].user_id;
            req.session.username = results[0].username;
            req.session.role = results[0].role;
            req.session.loggedIn = true;
            return res.status(200).json({ message: "Signed in" });
          } else {
            return res
              .status(500)
              .json({ message: "User credentials not correct" });
          }
        })
        .catch((error) => {
          console.log(error);

          return res.status(500).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          connection.end;
        });
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

// logs out user
const logout = (req: Request, res: Response, next: NextFunction) => {
  Connect()
    .then((connection) => {
      if(req.session.loggedIn) {
        req.session.user_id = undefined;
        req.session.username = undefined;
        req.session.role = undefined;
        req.session.loggedIn = false;
        return res.status(200).json({message: "Logged out"})
      }

      return res.status(500).json({message: "No user logged in"})
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { createUser, getAllUsers, getUserByEmail, login, logout };

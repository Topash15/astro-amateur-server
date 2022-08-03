import { NextFunction, Request, Response } from "express";
import { Query, Connect } from "../config/mysql";

/** Creates a new taglist */
const createTaglist = (req: Request, res: Response, next: NextFunction) => {
  console.log("Creating taglist");

  let { photo_id, tag_id } = req.body;

  let query = `INSERT INTO taglists(
      photo_id,
      tag_id)
      VALUE (    
        "${photo_id}",
        "${tag_id}")`;

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

/** Returns array of all taglists in the database*/
const getAllTaglists = (req: Request, res: Response, next: NextFunction) => {
  console.log("Getting taglists");

  let query = "SELECT * FROM taglists";

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

/** Returns a taglist based on an ID provided in params */
const getTaglistById = (req: Request, res: Response, next: NextFunction) => {
  console.log("Finding taglist");

  let id = req.params.id;
  let query = `SELECT * FROM taglists WHERE taglist_id = ${id}`;

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

/** Updates a taglist */
const updateTaglistById = (req: Request, res: Response, next: NextFunction) => {
  console.log("Updating taglist");

  let id = req.params.id;
  let { photo_id, tag_id } = req.body;

  let query = `UPDATE taglists
  SET photo_id = ${photo_id}, tag_id = ${tag_id}
  WHERE taglist_id = ${id}`;

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

/** Deletes taglist */
const deleteTaglistById = (req: Request, res: Response, next: NextFunction) => {
  console.log("Deleting taglist");

  let id = req.params.id;
  let query = `DELETE FROM taglists WHERE taglist_id = ${id}`;

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

export default {
  getAllTaglists,
  createTaglist,
  getTaglistById,
  deleteTaglistById,
  updateTaglistById
};

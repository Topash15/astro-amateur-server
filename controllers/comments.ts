import { NextFunction, Request, Response } from "express";
import { Query, Connect } from "../config/mysql";

/** Creates a new comment */
const createComment = (req: Request, res: Response, next: NextFunction) => {
  /**Uncomment once user profiles are in use */
  // if (!req.session.loggedIn) {
  //   return res.status(401).json({ message: "You must be logged in" });
  // }
  console.log("Creating comment");

  let { date, photo_id, article_id, text, commenter } = req.body;

  // if photo_id is provided, leave the article_id as undefined
  // else assume that comment is for an article and leave photo_id undefined
  let query: string;
  if (photo_id) {
    query = `INSERT INTO comments(
      date,
      photo_id,
      text,
      commenter)
      VALUE (    
        "${date}",
        "${photo_id}",
        "${text}",
        "${commenter}"
       )`;
  } else {
    query = `INSERT INTO comments(
      date,
      article_id,
      text,
      commenter)
      VALUE (    
        "${date}",
        "${article_id}",
        "${text}",
        "${commenter}"
       )`;
  }

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

/** Returns array of all comments in the database*/
const getAllComments = (req: Request, res: Response, next: NextFunction) => {
  console.log("Getting comments");

  let query = "SELECT * FROM comments";

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

/** Returns comments in descending order by date based on a photo ID provided in params */
const getCommentsByPhotoId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Finding comments");

  let id = req.params.id;
  let query = `SELECT * FROM comments WHERE photo_id = ${id} ORDER BY date DESC`;

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

/** Returns comments in descending order by date based on an article ID provided in params */
const getCommentsByArticleId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Finding comments");

  let id = req.params.id;
  let query = `SELECT * FROM comments WHERE article_id = ${id} ORDER BY date DESC`;

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

const getCommentById = (req: Request, res: Response, next: NextFunction) => {
  console.log("Finding comment");

  let id = req.params.id;
  let query = `SELECT * FROM comments WHERE comment_id = ${id}`;

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

/** Updates a comment */
const updateCommentById = (req: Request, res: Response, next: NextFunction) => {
  console.log("Updating comment");

  let id = req.params.id;
  let { date, title, summary, body, commenter } = req.body;
  if(!req.session.loggedIn && req.session.username !== commenter){
    return res.status(401).json({message: 'Not authorized to edit this comment.'})
  }

  let query = `UPDATE comments
    SET date = "${date}",
      title = "${title}",
      summary = "${summary}",
      body = "${body}",
      commenter = "${commenter}",
     WHERE id = "${id}"`;

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

/** Deletes comment */
const deleteCommentById = (req: Request, res: Response, next: NextFunction) => {
  if(!req.session.loggedIn || req.session.role !== 'mod'){
    return res.status(403).json({message: 'You do not have permission to delete this comment'});
  }
  console.log("Deleting comment");

  let id = req.params.id;
  let query = `DELETE FROM comments WHERE comment_id = ${id}`;

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
  getAllComments,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  getCommentsByArticleId,
  getCommentsByPhotoId,
};

import { NextFunction, Request, Response } from "express";
import { Query, Connect } from "../config/mysql";

/** Creates a new photo */
const createPhoto = (req: Request, res: Response, next: NextFunction) => {
  console.log("Creating photo");

  let {
    title,
    description,
    detailedDescription,
    camera,
    lens,
    iso,
    aperture,
    thumbnail,
    hdSource,
    source,
    link,
    date,
    theme,
    exposureTime,
  } = req.body;

  let query = `INSERT INTO photos(
    title,
    description,
    detailedDescription,
    camera,
    lens,
    iso,
    aperture,
    thumbnail,
    hdSource,
    source,
    link,
    date,
    theme,
    exposureTime)
    VALUE (    
      "${title}",
      "${description}",
      "${detailedDescription}",
      "${camera}",
      "${lens}",
      "${iso}",
      "${aperture}",
      "${thumbnail}",
      "${hdSource}",
      "${source}",
      "${link}",
      "${date}",
      "${theme}",
      "${exposureTime}")`;

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

/** Returns array of all photos in the database*/
const getAllPhotos = (req: Request, res: Response, next: NextFunction) => {
  console.log("Getting photos");

  let query = "SELECT * FROM photos";

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

/** Returns a photo based on an ID provided in params */
const getPhotoById = (req: Request, res: Response, next: NextFunction) => {
  console.log("Finding photo");

  let id = req.params.id;
  let query = `SELECT * FROM photos WHERE id = ${id}`;

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

/** Updates a photo */
const updatePhotoById = (req: Request, res: Response, next: NextFunction) => {
  console.log("Updating photo");

  let id = req.params.id;
  let {
    title,
    description,
    detailedDescription,
    camera,
    lens,
    iso,
    aperture,
    thumbnail,
    hdSource,
    source,
    link,
    date,
    theme,
    exposureTime,
  } = req.body;

  let query = `UPDATE photos
    SET    
      title = "${title}",
      description = "${description}",
      detailedDescription = "${detailedDescription}",
      camera = "${camera}",
      lens = "${lens}",
      iso = "${iso}",
      aperture = "${aperture}",
      thumbnail = "${thumbnail}",
      hdSource = "${hdSource}",
      source = "${source}",
      link = "${link}",
      date = "${date}",
      theme = "${theme}",
      exposureTime = "${exposureTime}"
    WHERE id = "${id}";`;

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

/** Deletes photo */
const deletePhotoById = (req: Request, res: Response, next: NextFunction) => {
  
  // only users with the "mod" role are allowed to delete photos
  if (req.session.role !== "mod") {
    return res
      .status(403)
      .json({ message: "You do not have permission to delete this photo" });
  }
  console.log("Deleting photo");

  let id = req.params.id;
  let query = `DELETE FROM photos WHERE id = ${id}`;

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
  getAllPhotos,
  createPhoto,
  getPhotoById,
  deletePhotoById,
  updatePhotoById,
};

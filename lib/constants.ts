export const MINIOURL = "http://193.203.161.79:9001/"
export const BUCKET_NAME = "projectestate";
export const DOMAIN =
  process.env.NODE_ENV == "production"
    ? process.env.DOMAIN
    : "http://localhost:5000/";

export const userTypes = ['admin'];
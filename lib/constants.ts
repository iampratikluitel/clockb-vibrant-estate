export const MINIOURL = "https://uploads.clockb.io/projectestate/"
export const BUCKET_NAME = "projectestate";
export const DOMAIN =
  process.env.NODE_ENV == "production"
    ? process.env.DOMAIN
    : "http://localhost:3000/";

export const userTypes = ['admin'];
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://hackanews.herokuapp.com/api"
    : "http://localhost:8000/api";

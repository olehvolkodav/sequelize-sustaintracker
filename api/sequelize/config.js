const host = process.env.MYSQL_HOST || "localhost";

module.exports = {
  username: process.env.MYSQL_USER || "user",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "sustaintracker",
  host,
  dialect: "mysql",
  dialectOptions:
    host !== "localhost" && host !== "database"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
};

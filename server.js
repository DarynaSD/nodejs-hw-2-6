const app = require("./app");
const mongoose = require("mongoose");

// забути - це лок підключення const DB_HOST = require("./helpers/db_config")

// при деплої (на render.com): environtment > key: DB_HOST, value: наш ключ з конфіга
// у лок файлі: const DB_HOST = process.env
// тепер, коли хост візьме з гітхаба код, він буде брати рядок підключення не з db_config.js,
// а з {} process.env, у якого ключ є

// щоб проект запускався локально: npm i dotenv > створити файл .env (його в ігнор) > в файлі: змінна=значення (без "")
// у файлі app імпортуємо дотенв і викликаємо метод конфіг: require("dotenv").config()

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
    console.log("Server running. Use our API on port: 3000");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

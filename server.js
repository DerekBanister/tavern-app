const express = require('express');
const routes = require('./controllers');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

//CORS NPM PACKAGE IS A GODSEND
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//attempt to bypass CORS, not sure if this is even doing anything tbh.
//most likely redundant code
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(routes);
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT} 🚀`));
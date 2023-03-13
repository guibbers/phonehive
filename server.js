require('dotenv').config();
const express = require('express');
const port = 3000;
const app = express();
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { globalMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// Conexão MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.error(e));

// Definição de Session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// Configurações de Session
const sessionOptions = session({
    secret: 'phonehive',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 604800000, // 7 days
        httpOnly: true
    }
});

// Configurações de segurança
app.use(helmet());

app.use(sessionOptions);
app.use(flash());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Nossos próprios middlewares
app.use(csrf());
app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);

app.on('pronto', () => {
    app.listen(port, ()=>{ console.log(`Server running on port: ${port}.`) });
});

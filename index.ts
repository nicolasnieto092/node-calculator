import express = require('express');
import { termsRouter } from './routes';

const app      = express();
const config   = require(__dirname + '/config/config.json');

app.use(express.json())
app.use(config.app.base_url + '/terms', termsRouter);

app.listen(config.server.port, () => {
    console.log(`Application listening on port ${config.server.port}`);
});


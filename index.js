const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

const port = 8000;

const actionsRoutes = require('./actions/actionsRoutes');
const projectsRoutes = require('./projects/projectsRoutes');

const server = express();
server.use(express.json(), cors(), helmet(), logger('combined'));

server.use('/api/actions', actionsRoutes);
server.use('/api/projects', projectsRoutes);

server.listen(port, () => {
    console.log(`\n=== API running on port: ${port} ===\n`);
});
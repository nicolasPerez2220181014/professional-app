const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const requestRoutes = require('./routes/request');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/requests', requestRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

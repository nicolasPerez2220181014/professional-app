const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Obtener empleados
router.get('/', authMiddleware, async (req, res) => {
  try {
    const employees = await User.findAll({ where: { role: 'employee' } });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados', error });
  }
});

// Agregar empleado
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await User.create({ username, password: hashedPassword, role: 'employee' });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar empleado', error });
  }
});

module.exports = router;

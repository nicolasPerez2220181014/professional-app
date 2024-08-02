const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const Request = require('../models/Request');

const router = express.Router();

// Obtener solicitudes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitudes', error });
  }
});

// Agregar solicitud
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const request = await Request.create({ title, description });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar solicitud', error });
  }
});

// Eliminar solicitud (solo administradores)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await Request.destroy({ where: { id } });
    res.json({ message: 'Solicitud eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar solicitud', error });
  }
});

module.exports = router;

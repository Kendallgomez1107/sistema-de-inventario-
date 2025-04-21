const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// routes/auth.js
const express = require('express');


// Simulación de base de datos de usuarios
const usuarios = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'usuario', password: 'usuario123', role: 'public' }
];

// Ruta de login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscamos el usuario en la "base de datos"
    const user = usuarios.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({
            success: true,
            role: user.role
        });
    } else {
        res.json({
            success: false,
            message: 'Usuario o contraseña incorrectos'
        });
    }
});


router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = result.rows[0];

    const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;

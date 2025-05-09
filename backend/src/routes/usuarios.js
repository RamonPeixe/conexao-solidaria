import { Router } from 'express';
import db from '../database.js';

const router = Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM usuario', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM usuario WHERE id_usuario = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { nome, idade, endereco, telefone, cpf, email, senha, saldo } = req.body;
  const sql = `
    INSERT INTO usuario
      (nome, idade, endereco, telefone, cpf, email, senha, saldo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [nome, idade, endereco, telefone, cpf, email, senha, saldo || 0.00], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_usuario: this.lastID });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, idade, endereco, telefone, cpf, email, senha, saldo } = req.body;
  const sql = `
    UPDATE usuario
    SET nome = ?, idade = ?, endereco = ?, telefone = ?, cpf = ?, email = ?, senha = ?, saldo = ?
    WHERE id_usuario = ?
  `;
  db.run(sql, [nome, idade, endereco, telefone, cpf, email, senha, saldo, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ updated: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM usuario WHERE id_usuario = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ deleted: this.changes });
  });
});

export default router;

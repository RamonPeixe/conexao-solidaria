import { Router } from 'express';
import db from '../database.js';

const router = Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM deposito', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(
    'SELECT * FROM deposito WHERE id_deposito = ?',
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Depósito não encontrado' });
      res.json(row);
    }
  );
});

router.post('/', (req, res) => {
  const { id_usuario, valor, metodo_pagamento } = req.body;
  const sql = `
    INSERT INTO deposito
      (id_usuario, valor, metodo_pagamento)
    VALUES (?, ?, ?)
  `;
  db.run(sql, [id_usuario, valor, metodo_pagamento], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_deposito: this.lastID });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { id_usuario, valor, metodo_pagamento } = req.body;
  const sql = `
    UPDATE deposito
    SET id_usuario = ?, valor = ?, metodo_pagamento = ?
    WHERE id_deposito = ?
  `;
  db.run(sql, [id_usuario, valor, metodo_pagamento, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: 'Depósito não encontrado' });
    res.json({ updated: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    'DELETE FROM deposito WHERE id_deposito = ?',
    [id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Depósito não encontrado' });
      res.json({ deleted: this.changes });
    }
  );
});

export default router;

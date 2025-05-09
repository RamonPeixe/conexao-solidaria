import { Router } from 'express';
import db from '../database.js';

const router = Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM doacao', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(
    'SELECT * FROM doacao WHERE id_doacao = ?',
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Doação não encontrada' });
      res.json(row);
    }
  );
});

router.post('/', (req, res) => {
  const { id_usuario, id_instituicao, tipo, status, componentes } = req.body;
  const sql = `
    INSERT INTO doacao
      (id_usuario, id_instituicao, tipo, status, componentes)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(sql, [id_usuario, id_instituicao, tipo, status, componentes], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_doacao: this.lastID });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { id_usuario, id_instituicao, tipo, status, componentes } = req.body;
  const sql = `
    UPDATE doacao
    SET id_usuario = ?, id_instituicao = ?, tipo = ?, status = ?, componentes = ?
    WHERE id_doacao = ?
  `;
  db.run(
    sql,
    [id_usuario, id_instituicao, tipo, status, componentes, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Doação não encontrada' });
      res.json({ updated: this.changes });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    'DELETE FROM doacao WHERE id_doacao = ?',
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Doação não encontrada' });
      res.json({ deleted: this.changes });
    }
  );
});

export default router;

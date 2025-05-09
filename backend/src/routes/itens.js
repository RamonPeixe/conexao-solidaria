import { Router } from 'express';
import db from '../database.js';

const router = Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM item_necessario', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(
    'SELECT * FROM item_necessario WHERE id_item = ?',
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Item não encontrado' });
      res.json(row);
    }
  );
});

router.post('/', (req, res) => {
  const { id_instituicao, descricao } = req.body;
  const sql = `
    INSERT INTO item_necessario (id_instituicao, descricao)
    VALUES (?, ?)
  `;
  db.run(sql, [id_instituicao, descricao], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_item: this.lastID });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { id_instituicao, descricao } = req.body;
  const sql = `
    UPDATE item_necessario
    SET id_instituicao = ?, descricao = ?
    WHERE id_item = ?
  `;
  db.run(sql, [id_instituicao, descricao, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: 'Item não encontrado' });
    res.json({ updated: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    'DELETE FROM item_necessario WHERE id_item = ?',
    [id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Item não encontrado' });
      res.json({ deleted: this.changes });
    }
  );
});

export default router;

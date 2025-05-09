import { Router } from 'express';
import db from '../database.js';

const router = Router();

router.get('/', (req, res) => {
  const { id_instituicao } = req.query;
  if (id_instituicao) {
    db.all(
      'SELECT * FROM item_necessario WHERE id_instituicao = ?',
      [id_instituicao],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
  } else {
    db.all('SELECT * FROM item_necessario', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  }
});

// POST /itens
router.post('/', (req, res) => {
  const { id_instituicao, descricao } = req.body;
  db.run(
    'INSERT INTO item_necessario (id_instituicao, descricao) VALUES (?, ?)',
    [id_instituicao, descricao],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id_item: this.lastID });
    }
  );
});

// PUT /itens/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;
  db.run(
    'UPDATE item_necessario SET descricao = ? WHERE id_item = ?',
    [descricao, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Item não encontrado' });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE /itens/:id
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

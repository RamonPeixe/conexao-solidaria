import { Router } from 'express';
import db from '../database.js';

const router = Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM instituicao', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(
    'SELECT * FROM instituicao WHERE id_instituicao = ?',
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Não encontrada' });
      res.json(row);
    }
  );
});

router.post('/', (req, res) => {
  const { nome, descricao, imagem_url, missao, qr_code_url } = req.body;
  const sql = `
    INSERT INTO instituicao
      (nome, descricao, imagem_url, missao, qr_code_url)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(
    sql,
    [nome, descricao, imagem_url, missao, qr_code_url],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id_instituicao: this.lastID });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, imagem_url, missao, qr_code_url } = req.body;
  const sql = `
    UPDATE instituicao
    SET nome = ?, descricao = ?, imagem_url = ?, missao = ?, qr_code_url = ?
    WHERE id_instituicao = ?
  `;
  db.run(
    sql,
    [nome, descricao, imagem_url, missao, qr_code_url, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Não encontrada' });
      res.json({ updated: this.changes });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    'DELETE FROM instituicao WHERE id_instituicao = ?',
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Não encontrada' });
      res.json({ deleted: this.changes });
    }
  );
});

export default router;

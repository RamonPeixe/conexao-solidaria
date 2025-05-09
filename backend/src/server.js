import express    from 'express';
import cors       from 'cors';
import bodyParser from 'body-parser';
import db         from './database.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (req, res) => res.json({ pong: true }));

app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM usuario', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/usuarios', (req, res) => {
  const { nome, idade, endereco, telefone, cpf, email, senha, saldo } = req.body;
  const sql = `
    INSERT INTO usuario (nome, idade, endereco, telefone, cpf, email, senha, saldo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [nome, idade, endereco, telefone, cpf, email, senha, saldo || 0], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id_usuario: this.lastID });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});

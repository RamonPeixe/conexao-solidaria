import express    from 'express';
import cors       from 'cors';
import bodyParser from 'body-parser';
import db         from './database.js';

import usuariosRouter     from './routes/usuarios.js';
import instituicoesRouter from './routes/instituicoes.js';
import doacoesRouter      from './routes/doacoes.js';
import depositosRouter    from './routes/depositos.js';
import itensRouter        from './routes/itens.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.json({ pong: true });
});

app.use('/usuarios',     usuariosRouter);
app.use('/instituicoes', instituicoesRouter);
app.use('/doacoes',      doacoesRouter);
app.use('/depositos',    depositosRouter);
app.use('/itens',        itensRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});

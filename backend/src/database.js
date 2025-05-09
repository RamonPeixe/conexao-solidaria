import sqlite3 from 'sqlite3';
import path    from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const dbFile = path.resolve(__dirname, 'conexao.db');
const sqlite = sqlite3.verbose();
const db     = new sqlite.Database(dbFile);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuario (
      id_usuario     INTEGER PRIMARY KEY AUTOINCREMENT,
      nome           TEXT    NOT NULL,
      idade          INTEGER,
      endereco       TEXT,
      telefone       TEXT,
      cpf            TEXT    NOT NULL UNIQUE,
      email          TEXT    NOT NULL UNIQUE,
      senha          TEXT    NOT NULL,
      saldo          REAL    NOT NULL DEFAULT 0.00
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS instituicao (
      id_instituicao INTEGER PRIMARY KEY AUTOINCREMENT,
      nome           TEXT    NOT NULL,
      descricao      TEXT,
      imagem_url     TEXT,
      missao         TEXT,
      qr_code_url    TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS deposito (
      id_deposito      INTEGER PRIMARY KEY AUTOINCREMENT,
      id_usuario       INTEGER NOT NULL,
      valor            REAL    NOT NULL,
      data             DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      metodo_pagamento TEXT,
      FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS doacao (
      id_doacao        INTEGER PRIMARY KEY AUTOINCREMENT,
      id_usuario       INTEGER NOT NULL,
      id_instituicao   INTEGER NOT NULL,
      data             DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      tipo             TEXT,
      status           TEXT,
      componentes      TEXT,
      FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE,
      FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao)
        ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS item_necessario (
      id_item          INTEGER PRIMARY KEY AUTOINCREMENT,
      id_instituicao   INTEGER NOT NULL,
      descricao        TEXT    NOT NULL,
      FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao)
        ON DELETE CASCADE
    );
  `);
  console.log('Tabelas criadas (ou já existentes) em src/conexao.db');
});

export default db;

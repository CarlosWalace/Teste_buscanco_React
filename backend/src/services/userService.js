const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("../../database.db");

function getUsuarios() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        console.error(err.message);
        reject("Internal Server Error");
      } else {
        resolve(rows);
      }
    });
  });
}

function getUsuarioByName(name) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM user WHERE nome LIKE '%${name}%'`, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject("Internal Server Error");
      } else {
        resolve(rows);
      }
    });
  });
}

function adicionarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        db.all(
          `INSERT INTO user (nome, email, senha, endereco, telefone, local) 
            VALUES ('${usuario.nome}', '${usuario.email}', '${usuario.senha}', '${usuario.endereco}', '${usuario.telefone}', '${usuario.local}')`,
          (err, rows) => {
            if (err) {
              console.error(err.message);
              reject("Internal Server Error");
            } else {
              resolve(`insert successfully into user`);
            }
          }
        );
    });
}

async function atualizarUsuario(name, usuario) {
     return new Promise((resolve, reject) => {
        db.all(
            `UPDATE user SET
                    ${usuario.nome ? ` nome = '${usuario.nome}'` : ``}
                    ${usuario.senha ? ` ,senha = '${usuario.senha}'` : ``}
                    ${usuario.email ? ` ,email = '${usuario.email}'` : ``}
                    ${usuario.endereco ? ` ,endereco = '${usuario.endereco}'` : ``}
                    ${usuario.telefone ? ` ,telefone = '${usuario.telefone}'` : ``}
                    ${usuario.local ? ` ,local = '${usuario.local}'` : ``}
            WHERE nome = '${name}'`,
          (err, rows) => {
            if (err) {
              console.error(err.message);
              reject("Internal Server Error");
            } else {
              resolve(`update successfully from user`);
            }
          }
        );
    });
}

async function removerUsuario(name) {
  return new Promise((resolve, reject) => {
    db.all(`DELETE FROM user WHERE nome = '${name}'`, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject("Internal Server Error");
      } else {
        resolve(`delete successfully from user`);
      }
    });
  });
}

async function login(email, senha) {
  return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM user WHERE nome LIKE '${email}' AND senha LIKE '${senha}'`, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject("Internal Server Error");
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  getUsuarios,
  getUsuarioByName,
  adicionarUsuario,
  atualizarUsuario,
  removerUsuario,
  login
};

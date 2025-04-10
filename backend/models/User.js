// models/User.js
import db from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM personne WHERE email = ?', [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM personne WHERE id = ?', [id]);
  return rows[0];
};

export const createUser = async ({ nom, email, password, typeUser }) => {
  const [result] = await db.query(
    'INSERT INTO personne (nom, email, password, typeUser) VALUES (?, ?, ?, ?)',
    [nom, email, password, typeUser]
  );
  return result.insertId;
};

export const updateUserPassword = async (id, newPassword) => {
  await db.query('UPDATE personne SET password = ? WHERE id = ?', [newPassword, id]);
};

export const saveResetToken = async (email, token) => {
  await db.query('UPDATE personne SET resetToken = ? WHERE email = ?', [token, email]);
};

export const findByResetToken = async (token) => {
  const [rows] = await db.query('SELECT * FROM personne WHERE resetToken = ?', [token]);
  return rows[0];
};

export const clearResetToken = async (id) => {
  await db.query('UPDATE personne SET resetToken = NULL WHERE id = ?', [id]);
};

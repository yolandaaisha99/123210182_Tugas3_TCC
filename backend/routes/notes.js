const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all notes
router.get('/', (req, res) => {
  db.query('SELECT * FROM notes ORDER BY id DESC', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// GET single note
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM notes WHERE id=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
});

// ADD note
router.post('/', (req, res) => {
  const { judul, isi } = req.body;
  if (!judul || !isi) return res.status(400).json({ error: 'Judul dan isi wajib diisi' });

  db.query(
    'INSERT INTO notes (judul, isi) VALUES (?, ?)',
    [judul, isi],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Note added', id: result.insertId });
    }
  );
});

// UPDATE note
router.put('/:id', (req, res) => {
  const { judul, isi } = req.body;
  const id = req.params.id;
  if (!judul || !isi) return res.status(400).json({ error: 'Judul dan isi wajib diisi' });

  db.query(
    'UPDATE notes SET judul=?, isi=? WHERE id=?',
    [judul, isi, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Note updated' });
    }
  );
});

// DELETE note
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM notes WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Note deleted' });
  });
});

module.exports = router;

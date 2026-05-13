const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const notesRoutes = require('./routes/notes');
app.use('/notes', notesRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
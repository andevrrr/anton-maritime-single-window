const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const vesselRoutes = require('./routes/vessels');
app.use('/api/vessels', vesselRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

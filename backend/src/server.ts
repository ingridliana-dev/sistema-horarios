import express from 'express';
import cors from 'cors';
import professorRoutes from './routes/professor.routes';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

// Usar as rotas de professor com o prefixo /api/professores
app.use('/api/professores', professorRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
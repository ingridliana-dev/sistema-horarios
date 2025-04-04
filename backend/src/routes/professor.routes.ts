import { Router } from 'express';
import { ProfessorController } from '../controllers/professor.controller';

const router = Router();
const professorController = new ProfessorController();

// Rota para criar um novo professor
router.post('/', professorController.create);

// Rota para listar todos os professores
router.get('/', professorController.findAll);

// Rota para buscar um professor específico
router.get('/:id', professorController.findOne);

// Rota para atualizar um professor
router.put('/:id', professorController.update);

// Rota para deletar um professor
router.delete('/:id', professorController.delete);

export default router;
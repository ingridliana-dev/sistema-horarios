import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProfessorController {
  async create(req: Request, res: Response) {
    try {
      const { nome, disponibilidade } = req.body;

      const professor = await prisma.professor.create({
        data: {
          nome,
          disponibilidade: {
            create: Object.entries(disponibilidade)
              .filter(([_, slots]) => slots.length > 0)
              .flatMap(([diaSemana, slots]) =>
                (slots as { start: string; end: string }[]).map((slot) => ({
                  diaSemana,
                  horaInicio: slot.start,
                  horaFim: slot.end,
                }))
              ),
          },
        },
        include: {
          disponibilidade: true,
        },
      });

      return res.status(201).json(professor);
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const professores = await prisma.professor.findMany({
        include: {
          disponibilidade: true,
        },
      });

      return res.json(professores);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const professor = await prisma.professor.findUnique({
        where: { id: Number(id) },
        include: {
          disponibilidade: true,
        },
      });

      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      return res.json(professor);
    } catch (error) {
      console.error('Erro ao buscar professor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, disponibilidade } = req.body;

      // Primeiro, excluímos todas as disponibilidades existentes
      await prisma.disponibilidade.deleteMany({
        where: { professorId: Number(id) },
      });

      // Depois, atualizamos o professor e criamos as novas disponibilidades
      const professor = await prisma.professor.update({
        where: { id: Number(id) },
        data: {
          nome,
          disponibilidade: {
            create: Object.entries(disponibilidade)
              .filter(([_, slots]) => slots.length > 0)
              .flatMap(([diaSemana, slots]) =>
                (slots as { start: string; end: string }[]).map((slot) => ({
                  diaSemana,
                  horaInicio: slot.start,
                  horaFim: slot.end,
                }))
              ),
          },
        },
        include: {
          disponibilidade: true,
        },
      });

      return res.json(professor);
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Primeiro, verificar se o professor existe
      const professor = await prisma.professor.findUnique({
        where: { id: Number(id) },
      });

      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      // Usar uma transação para garantir que todas as operações sejam executadas
      await prisma.$transaction(async (tx) => {
        // Primeiro, excluir todas as disponibilidades do professor
        await tx.disponibilidade.deleteMany({
          where: { professorId: Number(id) },
        });

        // Depois, excluir o professor
        await tx.professor.delete({
          where: { id: Number(id) },
        });
      });

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
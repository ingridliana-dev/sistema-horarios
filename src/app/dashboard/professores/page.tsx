import { ProfessorForm } from "@/components/professor/ProfessorForm";

export default function ProfessoresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Professores</h1>
      <ProfessorForm />
    </div>
  );
} 
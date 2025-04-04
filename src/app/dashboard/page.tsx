'use client';

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background-light">
      <nav className="bg-system-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-white">Sistema de Horários</span>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-md bg-system-secondary hover:bg-system-hover text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-system-primary transition-colors duration-200"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-text-primary mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card de Professores */}
            <div className="bg-background-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-text-primary">Professores</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Gerenciar professores e suas disponibilidades
                </p>
                <button 
                  onClick={() => router.push('/dashboard/professores')}
                  className="mt-4 px-4 py-2 bg-system-primary text-white rounded-md hover:bg-system-hover transition-colors duration-200"
                >
                  Acessar
                </button>
              </div>
            </div>

            {/* Card de Horários */}
            <div className="bg-background-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-text-primary">Horários</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Visualizar e gerenciar grade de horários
                </p>
                <button className="mt-4 px-4 py-2 bg-system-primary text-white rounded-md hover:bg-system-hover transition-colors duration-200">
                  Acessar
                </button>
              </div>
            </div>

            {/* Card de Relatórios */}
            <div className="bg-background-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-text-primary">Relatórios</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Gerar relatórios e análises
                </p>
                <button className="mt-4 px-4 py-2 bg-system-primary text-white rounded-md hover:bg-system-hover transition-colors duration-200">
                  Acessar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
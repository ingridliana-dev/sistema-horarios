import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Horários Professores</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-secondary-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm">&copy; 2024 Sistema de Horários. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
} 
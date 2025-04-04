'use client';

import { useState } from 'react';
import { TimeRange } from './TimeRange';

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

interface WeekAvailability {
  [key: string]: DayAvailability;
}

const DIAS_SEMANA = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
];

const initialAvailability: WeekAvailability = DIAS_SEMANA.reduce((acc, dia) => ({
  ...acc,
  [dia]: {
    enabled: false,
    timeSlots: [{ start: '07:00', end: '08:00' }]
  }
}), {});

export function ProfessorForm() {
  const [nome, setNome] = useState('');
  const [availability, setAvailability] = useState<WeekAvailability>(initialAvailability);

  const handleDayToggle = (dia: string) => {
    setAvailability(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        enabled: !prev[dia].enabled
      }
    }));
  };

  const addTimeSlot = (dia: string) => {
    setAvailability(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        timeSlots: [...prev[dia].timeSlots, { start: '07:00', end: '08:00' }]
      }
    }));
  };

  const removeTimeSlot = (dia: string, index: number) => {
    setAvailability(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        timeSlots: prev[dia].timeSlots.filter((_, i) => i !== index)
      }
    }));
  };

  const updateTimeSlot = (dia: string, index: number, field: 'start' | 'end', value: string) => {
    setAvailability(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        timeSlots: prev[dia].timeSlots.map((slot, i) => 
          i === index ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const professor = {
      nome,
      availability: Object.entries(availability).reduce((acc, [dia, { enabled, timeSlots }]) => ({
        ...acc,
        [dia]: enabled ? timeSlots : []
      }), {})
    };

    // TODO: Implementar a chamada à API para salvar os dados
    console.log('Dados do professor:', professor);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome Completo
        </label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Disponibilidade</h3>
        {DIAS_SEMANA.map((dia) => (
          <div key={dia} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`dia-${dia}`}
                  checked={availability[dia].enabled}
                  onChange={() => handleDayToggle(dia)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`dia-${dia}`} className="ml-2 block text-sm font-medium text-gray-700">
                  {dia}
                </label>
              </div>
              {availability[dia].enabled && (
                <button
                  type="button"
                  onClick={() => addTimeSlot(dia)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Adicionar Horário
                </button>
              )}
            </div>

            {availability[dia].enabled && (
              <div className="space-y-2">
                {availability[dia].timeSlots.map((slot, index) => (
                  <TimeRange
                    key={index}
                    start={slot.start}
                    end={slot.end}
                    onStartChange={(value) => updateTimeSlot(dia, index, 'start', value)}
                    onEndChange={(value) => updateTimeSlot(dia, index, 'end', value)}
                    onRemove={() => removeTimeSlot(dia, index)}
                    canRemove={availability[dia].timeSlots.length > 1}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Salvar Professor
        </button>
      </div>
    </form>
  );
} 
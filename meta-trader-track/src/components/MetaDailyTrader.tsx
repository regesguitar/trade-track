import React, { useState, useEffect } from 'react';
import { Calculator, Percent, Table, Timer, Settings } from 'lucide-react';

interface Slot {
  id: number;
  value: number;
  target: number;
  completed: boolean;
  pomodoroRunning: boolean;
  timeRemaining: number;
  pomodoroDuration: number;
}

const MetaDailyTrader = () => {
  const [initialValue, setInitialValue] = useState<number | "">("");
  const [percentage, setPercentage] = useState<number | "">("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [breakTime, setBreakTime] = useState(false);
  const [editingTime, setEditingTime] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlots(currentSlots =>
        currentSlots.map(slot => {
          if (slot.pomodoroRunning && slot.timeRemaining > 0) {
            return { ...slot, timeRemaining: slot.timeRemaining - 1 };
          } else if (slot.pomodoroRunning && slot.timeRemaining === 0) {
            return { ...slot, pomodoroRunning: false };
          }
          return slot;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateTable = () => {
    if (initialValue && percentage) {
      const newSlots: Slot[] = [];
      let value = Number(initialValue);
      for (let i = 1; i <= 5; i++) {
        const target = parseFloat((value * (1 + Number(percentage) / 100)).toFixed(2));
        newSlots.push({
          id: i,
          value,
          target,
          completed: false,
          pomodoroRunning: false,
          timeRemaining: 25 * 60, // Tempo padrão inicial
          pomodoroDuration: 25 * 60 // Duração padrão inicial
        });
        value = target;
      }
      setSlots(newSlots);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const markAsCompleted = (id: number) => {
    const updatedSlots = slots.map(slot =>
      slot.id === id ? { ...slot, completed: true, pomodoroRunning: false } : slot
    );
    setSlots(updatedSlots);
    const allCompleted = updatedSlots.every(slot => slot.completed);
    if (allCompleted) {
      setBreakTime(true);
    }
  };

  const startPomodoro = (id: number) => {
    setSlots(slots.map(slot =>
      slot.id === id ? {
        ...slot,
        pomodoroRunning: true,
        timeRemaining: slot.timeRemaining === 0 ? slot.pomodoroDuration : slot.timeRemaining
      } : slot
    ));
  };

  const updatePomodoroTime = (id: number, minutes: number) => {
    const seconds = minutes * 60;
    setSlots(slots.map(slot =>
      slot.id === id ? {
        ...slot,
        pomodoroDuration: seconds,
        timeRemaining: seconds,
        pomodoroRunning: false
      } : slot
    ));
    setEditingTime(null);
  };

  const handleNextDay = () => {
    setSlots([]);
    setInitialValue("");
    setPercentage("");
    setBreakTime(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header e inputs permanecem os mesmos */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Meta Daily Trader</h1>
          <p className="text-gray-600">Defina suas metas diárias de trading e acompanhe seu progresso</p>
        </div>

        {/* Main Card com inputs permanece o mesmo */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Inicial (R$)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calculator className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={initialValue}
                    onChange={(e) => setInitialValue(Number(e.target.value))}
                    placeholder="Ex: 20"
                    className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Porcentagem (%)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    placeholder="Ex: 10"
                    className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={generateTable}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Table className="h-5 w-5" />
              Gerar Tabela
            </button>
          </div>
        </div>

        {/* Tabela atualizada com configuração de tempo */}
        {slots.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slot</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Meta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pomodoro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {slots.map((slot) => (
                    <tr key={slot.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {slot.value.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {slot.target.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {slot.completed ? (
                          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                            Concluído
                          </span>
                        ) : (
                          <button
                            onClick={() => markAsCompleted(slot.id)}
                            className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                          >
                            Marcar
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {editingTime === slot.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                className="w-20 px-2 py-1 border rounded"
                                placeholder="Minutos"
                                defaultValue={Math.floor(slot.pomodoroDuration / 60)}
                                onChange={(e) => {
                                  const value = Number(e.target.value);
                                  if (value > 0) {
                                    updatePomodoroTime(slot.id, value);
                                  }
                                }}
                              />
                              <button
                                onClick={() => setEditingTime(null)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <>
                              {slot.pomodoroRunning ? (
                                <div className="flex items-center gap-2 text-sm text-gray-900">
                                  <Timer className="h-4 w-4 text-red-500" />
                                  {formatTime(slot.timeRemaining)}
                                  <button
                                    onClick={() => setEditingTime(slot.id)}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                  >
                                    <Settings className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                !slot.completed && (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => startPomodoro(slot.id)}
                                      className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-1"
                                    >
                                      <Timer className="h-4 w-4" />
                                      Iniciar ({Math.floor(slot.pomodoroDuration / 60)}min)
                                    </button>
                                    <button
                                      onClick={() => setEditingTime(slot.id)}
                                      className="text-gray-400 hover:text-gray-600"
                                    >
                                      <Settings className="h-4 w-4" />
                                    </button>
                                  </div>
                                )
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {breakTime && (
          <div className="bg-green-50 rounded-2xl shadow-xl p-6 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Parabéns! Você completou as 5 metas!</h2>
            <p className="text-green-700 mb-4">Faça uma pausa de 20 minutos ou volte amanhã.</p>
            <button
              onClick={handleNextDay}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Iniciar Novo Dia
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetaDailyTrader;
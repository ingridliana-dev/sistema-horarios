interface TimeRangeProps {
  start: string;
  end: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function TimeRange({ start, end, onStartChange, onEndChange, onRemove, canRemove }: TimeRangeProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="time"
        value={start}
        onChange={(e) => onStartChange(e.target.value)}
        className="block rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        required
      />
      <span className="text-gray-500">até</span>
      <input
        type="time"
        value={end}
        onChange={(e) => onEndChange(e.target.value)}
        className="block rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        required
      />
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-red-600 hover:text-red-700 focus:outline-none"
        >
          Remover
        </button>
      )}
    </div>
  );
} 
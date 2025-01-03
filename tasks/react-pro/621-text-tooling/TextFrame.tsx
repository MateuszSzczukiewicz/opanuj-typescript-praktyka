export interface TextFrameProps {
  children: React.ReactNode;
  label: string;
}

export default function TextFrame({ children, label }: TextFrameProps) {
  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
        <span className="text-gray-400">{label}</span>
      </div>
      <div data-testid="text-frame">{children}</div>
    </div>
  );
}

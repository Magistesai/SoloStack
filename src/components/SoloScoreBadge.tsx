import { getScoreBand } from '@/lib/data';

interface Props {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const bandStyles = {
  green: 'bg-green-900/60 text-green-300 border-green-700',
  yellow: 'bg-yellow-900/60 text-yellow-300 border-yellow-700',
  red: 'bg-red-900/60 text-red-300 border-red-700',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5 font-semibold',
};

export default function SoloScoreBadge({ score, size = 'md' }: Props) {
  const band = getScoreBand(score);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${bandStyles[band]} ${sizeStyles[size]}`}
      title={`Solo Score: ${score}/100`}
    >
      <span className="opacity-70 text-xs">Solo</span>
      <span>{score}</span>
    </span>
  );
}

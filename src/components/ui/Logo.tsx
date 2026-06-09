import logoUrl from '../../assets/logo.png';

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  wordmarkClassName?: string;
}

export function Logo({ className = 'h-9', withWordmark = true, wordmarkClassName = '' }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src={logoUrl}
        alt="BioGuide AI logo"
        className={`w-auto object-contain rounded-lg ${className}`}
      />
      {withWordmark && (
        <span className={`font-bold tracking-tight ${wordmarkClassName}`}>
          <span className="text-text">BioGuide</span>
          <span className="text-gradient"> AI</span>
        </span>
      )}
    </span>
  );
}

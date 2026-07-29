import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  noLink?: boolean;
  size?: 'default' | 'large' | 'small';
  inverse?: boolean;
}

export default function Logo({ noLink = false, size = 'default', inverse = false }: LogoProps) {
  const dimensions = size === 'large' ? 'h-[58px] w-[200px]' : size === 'small' ? 'h-[44px] w-[152px]' : 'h-[50px] w-[172px]';
  const mark = (
    <span className={`relative block ${dimensions}`}>
      <Image
        src="/rectify-wordmark-transparent.png"
        alt="Rectify International"
        fill
        sizes="200px"
        className={`object-contain transition-[filter] duration-200 ${inverse ? 'brightness-0 invert' : ''}`}
        priority={!noLink}
      />
    </span>
  );
  return noLink ? mark : <Link href="/" className="shrink-0" aria-label="Rectify International home">{mark}</Link>;
}

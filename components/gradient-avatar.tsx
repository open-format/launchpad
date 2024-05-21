interface GradientAvatarProps {
  seed?: string;
  size?: number;
}

export default function GradientAvatar({
  seed = "seed",
  size = 64,
}: GradientAvatarProps) {
  const generateHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const generateHSL = (hash: number): [number, number, number] => {
    const h = hash % 360;
    const s = 60 + (hash % 20); // Saturation between 60% and 80%
    const l = 70 + (hash % 20); // Lightness between 70% and 90%
    return [h, s, l];
  };

  const hash = generateHash(seed);
  const [h1, s1, l1] = generateHSL(hash);
  const [h2, s2, l2] = generateHSL(hash + 12345); // Adding an offset for the second color

  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, hsl(${h1}, ${s1}%, ${l1}%) 0%, hsl(${h2}, ${s2}%, ${l2}%) 100%)`,
    width: size,
    height: size,
  };

  return <div className="rounded-full" style={gradientStyle}></div>;
}

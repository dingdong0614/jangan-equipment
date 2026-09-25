import {
  AirVent,
  AppWindow,
  CookingPot,
  Flame,
  Hammer,
  LayoutGrid,
  PaintRoller,
  Zap,
  type LucideProps,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  boiler: Flame,
  hvac: AirVent,
  sash: AppWindow,
  kitchen: CookingPot,
  metal: Hammer,
  electric: Zap,
  interior: PaintRoller,
};

export default function CategoryIcon({
  slug,
  ...props
}: { slug: string } & LucideProps) {
  const Icon = ICONS[slug] ?? LayoutGrid;
  return <Icon aria-hidden strokeWidth={1.75} {...props} />;
}

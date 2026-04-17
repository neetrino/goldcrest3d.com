import { parseHeroSlideLayoutMeta } from "@/lib/site-media/visual-layout-meta";

type HeroTextNudgeWrapperProps = {
  layoutMeta?: unknown | null;
  children: React.ReactNode;
};

export function HeroTextNudgeWrapper({
  layoutMeta,
  children,
}: HeroTextNudgeWrapperProps) {
  const text = parseHeroSlideLayoutMeta(layoutMeta)?.text;
  if (!text) {
    return <>{children}</>;
  }
  return (
    <div
      style={{
        transform: `translate(${text.offsetX}px, ${text.offsetY}px)`,
      }}
    >
      {children}
    </div>
  );
}

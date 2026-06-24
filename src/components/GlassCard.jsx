export default function GlassCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        shadow-2xl
        rounded-3xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}
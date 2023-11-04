export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2.5 rounded-sm border-b-2 border-surface-300 pb-4 text-2xl">
      {children}
    </h3>
  );
}

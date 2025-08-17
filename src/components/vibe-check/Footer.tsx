export function Footer() {
  return (
    <footer className="text-center py-4 mt-8 border-t">
      <p className="text-muted-foreground text-sm font-bold">
        © {new Date().getFullYear()} Vibecheck
      </p>
    </footer>
  );
}

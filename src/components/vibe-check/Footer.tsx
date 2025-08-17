export function Footer() {
  return (
    <footer className="text-center py-4 mt-8 border-t space-y-2">
      <p className="text-muted-foreground text-sm font-bold">
        © {new Date().getFullYear()} Vibecheck
      </p>
      <p className="text-muted-foreground text-sm">
        Built with ❤️ for the Farcaster community
      </p>
    </footer>
  );
}

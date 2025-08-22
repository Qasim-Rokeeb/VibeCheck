import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="text-center py-4 relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary tracking-tighter">
        VibeCheck
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Can you guess the community’s vibe today? One emoji. One vote. One shot.
      </p>
    </header>
  );
}

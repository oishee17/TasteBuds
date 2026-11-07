import { Link } from "@tanstack/react-router";
import { LogOut, Plus } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return <span className={cn("font-display text-3xl font-extrabold italic tracking-tight", className)}>zomato</span>;
}

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { user, setUser, setAuthMode } = useStore();
  const tone = transparent ? "text-on-dark" : "text-foreground";
  return (
    <header className={cn("z-30 w-full", transparent ? "absolute top-0" : "sticky top-0 border-b bg-background/95 backdrop-blur")}>
      <nav className={cn("mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4", tone)}>
        <Link to="/"><Logo className={transparent ? "text-on-dark" : "text-foreground"} /></Link>
        <div className="flex items-center gap-1 text-sm font-medium sm:gap-3 sm:text-base">
          <button onClick={() => toast.success("Thanks! Our partner team will reach out soon.")}
            className="hidden items-center gap-1 rounded-lg px-3 py-2 opacity-90 hover:opacity-100 sm:inline-flex">
            <Plus className="h-4 w-4" /> Add restaurant
          </button>
          {user ? (
            <>
              <span className="rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button aria-label="Log out" onClick={() => { setUser(null); toast("Logged out"); }} className="rounded-lg p-2 opacity-90 hover:opacity-100">
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setAuthMode("login")} className="rounded-lg px-3 py-2 opacity-90 hover:opacity-100">Log in</button>
              <button onClick={() => setAuthMode("signup")} className={cn("rounded-lg px-3 py-2", transparent ? "opacity-90 hover:opacity-100" : "bg-primary text-primary-foreground hover:bg-primary/90")}>Sign up</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

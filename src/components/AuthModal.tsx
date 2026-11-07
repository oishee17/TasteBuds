import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

export function AuthModal() {
  const { authMode, setAuthMode, setUser } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  if (!authMode) return null;
  const signup = authMode === "signup";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (signup && name.trim().length < 2) return setError("Please enter your full name");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    const display = signup ? name.trim() : (email.split("@")[0] ?? email);
    setUser({ name: display, email });
    toast.success(signup ? `Welcome to Zomato, ${display}!` : `Welcome back, ${display}!`);
    setAuthMode(null); setError(""); setPassword("");
  };

  const input = "w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/60 p-4 animate-in fade-in" onClick={() => setAuthMode(null)}>
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-lift animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{signup ? "Sign up" : "Log in"}</h2>
          <button aria-label="Close" onClick={() => setAuthMode(null)} className="rounded-full p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {signup && <input className={input} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />}
          <input className={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
            {signup ? "Create account" : "Log in"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {signup ? "Already have an account? " : "New to Zomato? "}
          <button onClick={() => { setAuthMode(signup ? "login" : "signup"); setError(""); }} className="font-semibold text-primary">
            {signup ? "Log in" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
}

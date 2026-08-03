import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/Navbar";

const SignupPage: React.FC = () => {
  const [first_name, setFirst_name] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Gunakan environment variable, fallback ke localhost
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

      const response = await axios.post(`${apiUrl}/api/register`, {
        first_name,
        username,
        email,
        password,
      });

      console.log("Register success:", response.data);
      
      navigate("/login");
      
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.data && err.response.data.errors) {
        const firstError = Object.values(err.response.data.errors)[0] as any;
        setError(firstError[0]);
      } else {
        setError("Terjadi kesalahan pada server. Silakan coba lagi.");
      }
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Navbar />
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] mt-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Join with Temaxing Scan</p>
        </div>

        {/* Error Message UI */}
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          
          <div>
            <label htmlFor="first_name" className="mb-2 block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="first_name"
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-foreground">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="yourusername123"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="Minimum 6 characters"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-brand hover:underline focus:outline-none"
          >
            Log in here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
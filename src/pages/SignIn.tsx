
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-violet-100 px-4">
      <div className="bg-white shadow-xl rounded-lg max-w-md w-full p-8">
        <div className="flex flex-col items-center mb-6">
          <LogIn className="h-8 w-8 text-primary mb-2" />
          <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
          <p className="text-muted-foreground text-center">Sign in to Zenlead Studio to access your dashboard and tools.</p>
        </div>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:border-primary"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:border-primary"
            required
          />
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="#" className="text-primary hover:underline">Sign up</Link>
        </div>
        <div className="mt-2 text-center">
          <Link to="/" className="text-muted-foreground hover:text-primary text-xs">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

"use client";
import Link from "next/link";
import Footer from "../../components/foot";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../../_utils/AuthContext";
import { useRouter } from "next/navigation";

export default function signIn() {
  const router = useRouter();
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirmation] = useState("");
  const { user, registerWithEmail, loginWithEmail, googleSignIn } = useUserAuth();

  async function handleGoogleSignIn() {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  }

  async function handleEmailSignIn(event) {
    event.preventDefault();
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      console.error("Error during email sign-in:", error);
    }
  }

  async function handleEmailSignUp(event) {
    event.preventDefault();
    try {
      if(password !== confirmPassword){
        return alert("Passwords do not match");
      }
      else{
        await registerWithEmail(email, password);
      }
    } catch (error) {
      console.error("Error during email sign-up:", error);
    }
  }

  useEffect(() => {
    if (user) {
      console.log("User is signed in:", user);
      router.push("/");
    } else {
      console.log("No user is signed in.");
    }
  }, [user]);

return (
  <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center px-4">
    <header className="flex justify-between items-center px-8 py-5 border-b border-[#1E293B]">
        <Link href="/" className="text-2xl font-poppins font-semibold text-[#6366F1]">
          Model<span className="text-[#38BDF8]"> Maker</span>
        </Link>
    </header>
    <h1 className="text-3xl font-poppins font-semibold mb-8 mt-6">Sign In Page</h1>

    {signState === "Sign In" ? (
      <section className="w-full max-w-md bg-[#1E293B] rounded-2xl shadow-lg border border-[#334155] p-8 space-y-5">
        <button
          onClick={() => setSignState("Sign Up")}
          className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold py-2 rounded-xl transition"
        >
          Switch to Sign Up
        </button>
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <p>email</p>
          <input
            type="email"
            placeholder="Enter email here"
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition"
          />
          <p>password</p>
          <input
            type="password"
            placeholder="Enter password here"
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition"
          />
          <button
            type="submit"
            className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold py-3 rounded-2xl transition"
          >
            Login
          </button>
        </form>
      </section>
    ) : (
      <section className="w-full max-w-md bg-[#1E293B] rounded-2xl shadow-lg border border-[#334155] p-8 space-y-5">
        <button
          onClick={() => setSignState("Sign In")}
          className="w-full bg-[#38BDF8] hover:bg-[#0EA5E9] text-white font-semibold py-2 rounded-xl transition"
        >
          Switch to Sign In
        </button>
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <p>email</p>
          <input
            type="email"
            placeholder="Enter email here"
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition"
          />
          <p>password</p>
          <input
            type="password"
            placeholder="Enter password here"
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition"
          />
          <p>confirm password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition"
          />
          <button
            type="submit"
            className="w-full bg-[#38BDF8] hover:bg-[#0EA5E9] text-white font-semibold py-3 rounded-2xl transition"
          >
            Register
          </button>
        </form>
      </section>
    )}

    <button
      onClick={handleGoogleSignIn}
      className="mt-6 bg-[#F44336] hover:bg-[#EF5350] text-white font-semibold py-3 px-6 rounded-2xl transition"
    >
      Sign in with Google
    </button>
    <Footer />
  </div>
);
}

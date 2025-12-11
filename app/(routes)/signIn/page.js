import Header from "../../components/head";
import Footer from "../../components/foot";

export default function signIn() {
    const [signState, setSignState] = useState("Sign In");
    
    return(
    <div className="min-h-screen bg-[#0F172A] text-white font-inter">
        <Header/>
        <h1>Sign in Page</h1>
        {
            (signState === "Sign In") ? (
                <button onClick={() => setSignState("Sign Up")}>Switch to Sign Up</button>
            ) : (
                <button onClick={() => setSignState("Sign In")}>Switch to Sign In</button>
            )
        }

        <Footer/>
    </div>
    )
}
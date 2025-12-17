import GenerateModel from "@/app/components/generateModel"
import Header from "../../components/head";
import Footer from "../../components/foot";

export default function modelGen(){
    return(
        <div className="min-h-screen bg-[#0F172A] text-white font-inter">
            <Header />
                <GenerateModel />
            <Footer />
        </div>
    )
}
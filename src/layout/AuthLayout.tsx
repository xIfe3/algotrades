import { ReactNode } from "react";
import Footer from "../shared/public/Footer";
import Header from "../shared/public/Header";

function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <main className="pt-28">
                {children}
            </main>
            <Footer />
        </>
    );
}

export default AuthLayout;

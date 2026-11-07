import { ReactNode } from "react";
import Header from "../shared/public/Header.tsx";
import Footer from "../shared/public/Footer.tsx";

function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />

            <main>
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default PublicLayout;

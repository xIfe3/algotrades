"use client";

import { ReactNode, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import store from "@/store/store";

export default function Providers({ children }: { children: ReactNode }) {
    // Initialize AOS globally (was in App.tsx)
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
        AOS.refresh();
    }, []);

    return (
        <Provider store={store}>
            <Suspense fallback={null}>{children}</Suspense>
        </Provider>
    );
}

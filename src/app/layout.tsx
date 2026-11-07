import type { Metadata } from "next";
import Script from "next/script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
    title: "Algotrades",
    icons: { icon: "/images/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <Providers>{children}</Providers>
                </AppRouterCacheProvider>

                {/* Google Translate Element */}
                <div
                    id="google_translate_element"
                    style={{ width: "100%", backgroundColor: "#111D29", padding: "0 30px" }}
                />
                <Script id="google-translate-init" strategy="afterInteractive">
                    {`window.googleTranslateElementInit = function () {
                        new google.translate.TranslateElement(
                            { pageLanguage: 'en' },
                            'google_translate_element'
                        );
                    }`}
                </Script>
                <Script
                    src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                    strategy="lazyOnload"
                />

                {/* Smartsupp Live Chat */}
                <Script id="smartsupp" strategy="afterInteractive">
                    {`var _smartsupp = _smartsupp || {};
                    _smartsupp.key = '928da73dd66705ff629d6490602af0cfa3dfa037';
                    window.smartsupp||(function(d) {
                      var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                      s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                      c.type='text/javascript';c.charset='utf-8';c.async=true;
                      c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
                    })(document);`}
                </Script>
            </body>
        </html>
    );
}

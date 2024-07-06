import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import ThemeRegistry from "../../theme/ThemeRegistery";
import Header from "./components/Header";
import { Box } from "@mui/material";
import AdvBox from "./components/AdvBox";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Blogs",
  description: "LDiscover the best travel destinations, tips, and guides to make your adventures unforgettable. Join MyTravel Blogs for the latest in travel inspiration and advice.",
  keywords: 'Explore the World with TravelBlogs - Travel Guides, Tips, and Inspiratio',
  icons: '/logo.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeRegistry options={{ key: 'mui-theme' }}>
            <Box>
              <Header />
              <Box>
                {children}
              </Box>
            </Box>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}

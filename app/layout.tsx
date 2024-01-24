import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Roboto_Serif } from 'next/font/google';

import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import ActiveStatus from './Components/ActiveStatus';

const roboto = Roboto_Serif({ 
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: 'Tik Talk | Your Best Chat App', 
  description: 'Tik Talk is a chat app that allows you to chat with your friends and family.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
          <SpeedInsights />
        </AuthContext>
        </body>
    </html>
  )
}

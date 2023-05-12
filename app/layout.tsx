import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
  weight: ["400", "500", "600", "700", "900"],
  subsets: ['latin']
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
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

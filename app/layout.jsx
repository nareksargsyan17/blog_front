"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from "react-redux"
import store from "../redux/store";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

function RootLayout({ children }) {
  return (
      <html lang="en">
        <body>
          <Provider store={store}>
            {children}
          </Provider>
        </body>
      </html>
  )
}

export default RootLayout;
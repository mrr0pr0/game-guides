import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
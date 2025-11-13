import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container-page py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
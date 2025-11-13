import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-extrabold tracking-wider uppercase text-white">GameGuides</div>
          <ul className="flex gap-6 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">About</li>
            <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
            <li className="hover:text-white transition-colors cursor-pointer">Terms</li>
            <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
          </ul>
        </div>
        <div className="h-px bg-zinc-800 my-6"></div>
        <div className="text-xs text-zinc-500">&copy; 2025 GameGuides. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
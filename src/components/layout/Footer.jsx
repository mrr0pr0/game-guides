import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-neutral-400 py-12 mt-20 border-t border-neutral-800">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-white font-black text-lg mb-4">IGN<span className="text-red-600">Guide</span></h3>
            <p className="text-sm leading-relaxed">Your ultimate destination for game walkthroughs, guides, and tips.</p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Guides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/games" className="hover:text-red-500 transition-colors">All Games</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Walkthroughs</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Collectibles</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Tips & Tricks</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Forums</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Contributors</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Discord</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Twitter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Advertise</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs">&copy; 2025 IGNGuide. All rights reserved.</div>
          <div className="flex gap-6 text-xs">
            <Link to="/" className="hover:text-red-500 transition-colors">Terms of Use</Link>
            <Link to="/" className="hover:text-red-500 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-red-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
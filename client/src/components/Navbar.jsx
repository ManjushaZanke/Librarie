import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {FaBlog, FaBarsStaggered} from 'react-icons/fa6'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    //toggle menu
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
      const handleScroll = () => {
        if(Window.scrollY > 100){
          setIsSticky(true);
        }
        else{
          setIsSticky(false);
        }
      }
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.addEventListener("scroll", handleScroll);
      }
    }, [])

    //navItems here
    const navItems = [
      {link: "Home", path: "/"},
      {link: "About", path: "/about"},
      {link: "Shop", path: "/shop"},
      {link: "Sell Your Book", path: "/admin/dashboard"},
      {link: "Blog", path: "/blog"}
    ]

  return (
    <header>
      <nav>
        <div>
            {/*logo*/}
            <Link to = "/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'>
                <FaBlog className='inline-block' />Books
            </Link>

            {/*nav items for large device*/}
            <ul className='md: flex space-x-12'>
              {
                navItems.map(({link, path}) => <Link key={path} to={path} className='block text-base text-black
                uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)
              }
            </ul>

            {/*btn for lg devices*/}
            <div className='space-x-12 lg:flex items-center'>
              <button><FaBarsStaggered className='w-5 hover:text-blue-700'/></button>
            </div>
            
        </div>
      </nav>
    </header>
  )
}

export default Navbar
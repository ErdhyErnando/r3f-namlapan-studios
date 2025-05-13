import { BsInstagram } from "react-icons/bs";
import { IoLogoTiktok } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";

export const Navbar = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-12 right-12 p-3 bg-yellow-500 w-11 h-11 rounded-md">
        <div className={`bg-white h-0.5 rounded-md w-full transition-all ${menuOpened ? "rotate-45 translate-y-0.5" : ""
          }`} />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${menuOpened ? "hidden" : ""
            }`}
        />
        <div className={`bg-white h-0.5 rounded-md w-full transition-all ${menuOpened ? "-rotate-45" : ""}`} />
      </button>
      <div className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all  overflow-hidden flex flex-col ${menuOpened ? "w-80" : "w-0"}`}>
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
          <NavbarButton label="Hero" onClick={() => onSectionChange(0)} />
          <NavbarButton label="Projects" onClick={() => onSectionChange(1)} />
          <NavbarButton label="About" onClick={() => onSectionChange(2)} />
          <NavbarButton label="Contact" onClick={() => onSectionChange(3)} />
          <div className="grid grid-cols-2 items-start gap-4 mt-6 w-full">
            <div>
              <h3 className="text-base my-2">Follow Us!</h3>
              <div className="flex gap-2">
                <a href="https://www.instagram.com/namlapanstudios/" target="_blank" rel="noopener noreferrer">
                  <BsInstagram className="text-3xl  cursor-pointer hover:text-yellow-600 transition-colors" />
                </a>
                <a href="https://www.tiktok.com/@namlapanstudios" target="_blank" rel="noopener noreferrer">
                  <IoLogoTiktok className="text-3xl cursor-pointer hover:text-yellow-600 transition-colors" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-base my-2">Contact Us!</h3>
              <div className="flex gap-2">
                <a href="mailto:your-email@example.com" target="_blank" rel="noopener noreferrer">
                  <HiOutlineMailOpen className="text-3xl  cursor-pointer hover:text-yellow-600 transition-colors" />
                </a>
                {/* TODO: Add your WhatsApp link */}
                <a href="" target="_blank" rel="noopener noreferrer">
                  <BsWhatsapp className="text-3xl  cursor-pointer hover:text-yellow-600 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const NavbarButton = (props) => {
  const { label, onClick } = props;

  return (
    <button onClick={onClick} className="text-2xl font-bold cursor-pointer hover:text-yellow-600 transition-colors font-dm-serif tracking-wide">
      {label}
    </button>
  )
}

import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { IoLogoTiktok } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { label: "Work", target: "projects" },
  { label: "Studio", target: "about" },
  { label: "Contact", target: "contact" },
];

export const Navbar = (props) => {
  const { scrollToSection, menuOpened, setMenuOpened } = props;

  const handleNavigate = (target) => {
    scrollToSection(target);
    setMenuOpened(false);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-20 px-5 pt-3 sm:px-8 lg:px-12">
        <nav className="flex w-full items-center justify-between border border-white/12 bg-[#101114]/72 px-4 py-3 text-white backdrop-blur-xl">
          <button
            onClick={() => handleNavigate("hero")}
            className="flex h-11 w-11 items-center justify-center overflow-hidden bg-[#f5f21f]"
            aria-label="Namlapan Studios home"
          >
            <img src="/namlapan-favicon.svg" alt="" className="h-full w-full object-cover" />
          </button>

          <div className="hidden items-center gap-7 font-cal-sans text-xs uppercase tracking-[0.22em] text-white/68 md:flex">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavigate(item.target)}
                className="transition hover:text-[#e9ff5f]"
              >
                {item.label}
              </button>
            ))}
            <a href="/pricing" className="transition hover:text-[#e9ff5f]">
              Pricing
            </a>
          </div>

          <button
            onClick={() => setMenuOpened(!menuOpened)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center border border-white/14 bg-white/8 text-xl transition hover:border-[#e9ff5f] hover:text-[#e9ff5f] md:hidden"
          >
            {menuOpened ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </header>

      <aside
        className={`fixed inset-y-0 right-0 z-10 w-full max-w-sm border-l border-white/12 bg-[#101114] px-8 pb-8 pt-28 text-white transition-transform duration-300 md:hidden ${
          menuOpened ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="grid gap-5">
            <NavbarButton label="Home" onClick={() => handleNavigate("hero")} />
            {navItems.map((item) => (
              <NavbarButton key={item.target} label={item.label} onClick={() => handleNavigate(item.target)} />
            ))}
            <a href="/pricing" className="font-dm-serif text-5xl leading-none transition hover:text-[#e9ff5f]">
              Pricing
            </a>
          </div>

          <div>
            <p className="font-cal-sans text-xs uppercase tracking-[0.26em] text-white/42">Follow and contact</p>
            <div className="mt-4 flex gap-3">
              <SocialLink href="https://www.instagram.com/namlapanstudios/" label="Instagram">
                <BsInstagram />
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@namlapanstudios" label="TikTok">
                <IoLogoTiktok />
              </SocialLink>
              <SocialLink href="mailto:namlapanstudios@gmail.com" label="Email">
                <HiOutlineMailOpen />
              </SocialLink>
              <SocialLink href="https://wa.me/+628568991707" label="WhatsApp">
                <BsWhatsapp />
              </SocialLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const NavbarButton = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="text-left font-dm-serif text-5xl leading-none transition hover:text-[#e9ff5f]">
      {label}
    </button>
  );
};

const SocialLink = ({ href, label, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center border border-white/14 text-2xl transition hover:border-[#e9ff5f] hover:text-[#e9ff5f]"
    >
      {children}
    </a>
  );
};

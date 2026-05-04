import { Link } from "react-router-dom"

const BackButton = () => {
    return (
        <Link to="/" className="fixed left-5 top-5 z-50 border border-black bg-black px-4 py-3 font-cal-sans text-xs uppercase tracking-[0.18em] text-[#f5f21f] transition hover:bg-[#f5f21f] hover:text-black">
            Back home
        </Link>
    )
}

export default BackButton;

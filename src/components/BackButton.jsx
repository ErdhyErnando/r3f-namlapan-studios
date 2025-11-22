import { Link } from "react-router-dom"

const BackButton = () => {
    return (
        <Link to="/" className="fixed top-5 left-5 px-4 py-2 bg-black bg-opacity-70 rounded-full text-white z-50 hover:bg-opacity-90 transition-colors">
            Kembali ke Halaman Utama
        </Link>
    )
}

export default BackButton;
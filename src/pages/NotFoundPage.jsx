import { Link } from 'react-router-dom';
import { colorPalette } from '../constants/projectData';

const NotFoundPage = () => {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center text-center p-8 text-black"
            style={{
                background: `linear-gradient(to bottom, ${colorPalette.lightTeal}, ${colorPalette.orangeYellow}, ${colorPalette.white} 70%)`,
            }}
        >
            <div className="max-w-md mx-auto">
                <img src="/namlapan-favicon.svg" alt="Namlapan Studios Logo" className="h-24 w-24 mx-auto mb-8" />
                <h1 className="text-8xl font-bold mb-4 font-dm-serif">404</h1>
                <h2 className="text-3xl font-semibold mb-4 font-cal-sans">Page Not Found</h2>
                <p className="text-lg opacity-80 mb-8 font-cal-sans">
                    Sorry, you can't find what you're looking for.
                </p>
                <p className="text-lg font-cal-sans">
                    You can check our IG tho!
                </p>
                <a
                    href="https://www.instagram.com/namlapanstudios/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block py-3 px-6 rounded-lg font-semibold transition-colors text-white font-cal-sans"
                    style={{
                        backgroundColor: '#E63946', // salmon
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#FCA311'; // orangeYellow
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#E63946'; // salmon
                    }}
                >
                    @namlapanstudios
                </a>
                <div className="mt-12">
                    <Link
                        to="/"
                        className="py-3 px-6 rounded-lg font-semibold transition-colors text-white font-cal-sans"
                        style={{
                            backgroundColor: '#006D77', // darkTeal
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#94D2BD'; // lightTeal
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#006D77'; // darkTeal
                        }}
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
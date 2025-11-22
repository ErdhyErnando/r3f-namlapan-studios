import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import Gallery from '../components/Gallery';
import Lightbox from '../components/Lightbox';
import { allProjectsData, colorPalette } from '../constants/projectData';
import { Helmet } from 'react-helmet-async';

const ClientProjectPage = () => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const navigate = useNavigate();

    const openLightbox = (src) => {
        setCurrentImage(src);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setCurrentImage("");
        setIsLightboxOpen(false);
    };

    const { clientName } = useParams();
    const project = allProjectsData.find(p => p.clientName === clientName);

    if (!project) {
        return (
            <div
                className="min-h-screen flex items-center justify-center p-8"
                style={{
                    background: `linear-gradient(to bottom, ${colorPalette.lightTeal}, ${colorPalette.orangeYellow}, ${colorPalette.salmon}, ${colorPalette.white} 70%)`,
                }}
            >
                <div
                    className="text-center p-12 rounded-2xl shadow-lg max-w-md mx-auto"
                    style={{
                        backgroundColor: colorPalette.white,
                        color: colorPalette.black,
                    }}
                >
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold mb-4 font-dm-serif">Oops!</h1>
                        <h2 className="text-2xl font-semibold mb-2 font-cal-sans">Project Not Found</h2>
                        <p className="text-md opacity-70 font-cal-sans">
                            We couldn't find the project you're looking for. It might have been moved or doesn't exist.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-3 px-6 rounded-lg font-semibold transition-colors text-white font-cal-sans"
                            style={{
                                backgroundColor: colorPalette.salmon,
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = colorPalette.orangeYellow;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = colorPalette.salmon;
                            }}
                        >
                            Back to Home
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="w-full py-3 px-6 rounded-lg font-semibold transition-colors text-white font-cal-sans"
                            style={{
                                backgroundColor: colorPalette.darkTeal,
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = colorPalette.lightTeal;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = colorPalette.darkTeal;
                            }}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className='flex w-full h-screen overflow-hidden font-dm-serif'>
            <Helmet>
                <title>{`${project.clientName} - Project | Namlapan Studios`}</title>
                <meta name="description" content={project.description} />
                <link rel="canonical" href={`https://namlapan.studio/project/${encodeURIComponent(project.clientName)}`} />
                <meta property="og:title" content={`${project.clientName} - Project | Namlapan Studios`} />
                <meta property="og:description" content={project.description} />
                <meta property="og:url" content={`https://namlapan.studio/project/${encodeURIComponent(project.clientName)}`} />
                <meta property="og:image" content="https://namlapan.studio/og-image.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={`${project.clientName} - Project | Namlapan Studios`} />
                <meta property="twitter:description" content={project.description} />
                <meta property="twitter:image" content="https://namlapan.studio/og-image.png" />
            </Helmet>
            <div
                className='relative flex-grow h-screen overflow-hidden'
                style={{
                    background: `linear-gradient(to bottom, ${colorPalette.lightTeal}, ${colorPalette.orangeYellow}, ${colorPalette.salmon}, ${colorPalette.white} 70%)`,
                }}
            >
                <BackButton />
                <ProgressBar />
                <Gallery openLightbox={openLightbox} project={project} />
            </div>

            {isLightboxOpen && (
                <Lightbox currentImage={currentImage} closeLightBox={closeLightbox} />
            )}
        </main>
    );
};

export default ClientProjectPage;
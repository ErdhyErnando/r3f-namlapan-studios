import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import Gallery from '../components/Gallery';
import Lightbox from '../components/Lightbox';
import { allProjectsData } from '../constants/projectData';
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
            <div className="flex min-h-screen items-center justify-center bg-[#f5f21f] p-8 text-black">
                <div className="mx-auto max-w-md border border-black bg-black p-10 text-center text-[#f5f21f] shadow-2xl shadow-black/20">
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
                            className="w-full bg-[#f5f21f] px-6 py-3 font-cal-sans font-semibold text-black transition-colors hover:bg-white"
                        >
                            Back to Home
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="w-full border border-[#f5f21f]/30 px-6 py-3 font-cal-sans font-semibold text-[#f5f21f] transition-colors hover:border-[#f5f21f]"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className='flex h-screen w-full overflow-hidden bg-[#f5f21f] font-dm-serif'>
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
            <div className='relative h-screen flex-grow overflow-hidden bg-[#f5f21f]'>
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

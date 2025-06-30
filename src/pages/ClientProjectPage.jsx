import { useParams } from 'react-router';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import Gallery from '../components/Gallery';
import Lightbox from '../components/Lightbox';
import { allProjectsData } from '../constants/projectData';

const ClientProjectPage = () => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState("");

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
        return <div className="p-10 text-center">Project not found.</div>;
    }

    return (
        <main className='flex w-full h-screen overflow-hidden font-dm-serif'>
            {/* <div className='relative flex-grow h-screen overflow-hidden bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600'> */}
            <div className='relative flex-grow h-screen overflow-hidden bg-zinc-200'>
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
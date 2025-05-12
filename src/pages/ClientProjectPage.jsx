import { useParams, Link } from 'react-router';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import Gallery from '../components/Gallery';
import Lightbox from '../components/Lightbox';

const allProjectsData = [
    {
        type: 'image',
        src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'Nature Beauty',
        logo: 'https://via.placeholder.com/50x50?text=Logo1',
        clientName: 'nature-beauty',
        details: 'More details about Nature Beauty project, including more images or videos.',
        gallery: [
            'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ]
    },
    {
        type: 'image',
        src: 'https://images.pexels.com/photos/2570060/pexels-photo-2570060.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Urban Life',
        logo: 'https://via.placeholder.com/50x50?text=Logo2',
        clientName: 'urban-life',
        details: 'Exploring the vibrant life of the city.',
        gallery: [
            'https://images.pexels.com/photos/2570060/pexels-photo-2570060.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ]
    },
    {
        type: 'video',
        src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        title: 'Fun Video',
        logo: 'https://via.placeholder.com/50x50?text=Logo3',
        clientName: 'fun-video',
        details: 'A fun video project.',
        gallery: [
            'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
        ]
    },
    {
        type: 'image',
        src: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Delicious Food',
        logo: 'https://via.placeholder.com/50x50?text=Logo4',
        clientName: 'delicious-food',
        details: 'Showcasing culinary delights.',
        gallery: [
            'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ]
    },
    {
        type: 'image',
        src: 'https://images.pexels.com/photos/31831861/pexels-photo-31831861/free-photo-of-lone-hiker-on-cliff-at-sunrise-in-mountain-range.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'Travel Adventure',
        logo: 'https://via.placeholder.com/50x50?text=Logo5',
        clientName: 'travel-adventure',
        details: 'Chronicles of exciting travel adventures.',
        gallery: [
            'https://images.pexels.com/photos/31831861/pexels-photo-31831861/free-photo-of-lone-hiker-on-cliff-at-sunrise-in-mountain-range.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ]
    },
    {
        type: 'image',
        src: 'https://pub-e54c94b2502642d69cab5d6cd5d70cee.r2.dev/luffy-1.png',
        title: 'Luffy',
        logo: 'https://via.placeholder.com/50x50?text=Logo6',
        clientName: 'luffy',
        details: 'A project about Luffy.',
        gallery: [
            'https://pub-e54c94b2502642d69cab5d6cd5d70cee.r2.dev/luffy-1.png',
            'https://cdn.oneesports.gg/cdn-data/2024/02/Anime_MonkeyDLuffy.jpg',
            'https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/08/one-piece-luffy-gear-5-eyes-pop-out-cropped.jpg'

        ]
    },
];


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
            <div className='relative flex-grow h-screen overflow-hidden'>
                <BackButton />
                <ProgressBar />
                <Gallery openLightbox={openLightbox} projectGallery={project.gallery} />
            </div>

            {isLightboxOpen && (
                <Lightbox currentImage={currentImage} closeLightBox={closeLightbox} />
            )}
        </main>
    );
};

export default ClientProjectPage;
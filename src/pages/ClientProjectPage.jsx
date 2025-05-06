import React from 'react';
import { useParams } from 'react-router';

// You might want to move this data to a shared location or fetch it
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
            'https://pub-e54c94b2502642d69cab5d6cd5d70cee.r2.dev/luffy-1.png'
        ]
    },
];


const ClientProjectPage = () => {
    const { clientName } = useParams();
    const project = allProjectsData.find(p => p.clientName === clientName);

    if (!project) {
        return <div className="p-10 text-center">Project not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-4xl font-bold mb-5">{project.title}</h1>
            <p className="text-lg mb-5">{project.details}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery && project.gallery.map((mediaSrc, index) => (
                    <div key={index} className="bg-gray-200 rounded-lg overflow-hidden">
                        {project.type === 'image' || mediaSrc.endsWith('.png') || mediaSrc.endsWith('.jpeg') || mediaSrc.endsWith('.jpg') ? (
                            <img src={mediaSrc} alt={`${project.title} - gallery ${index + 1}`} className="w-full h-auto object-cover" />
                        ) : (
                            <video controls className="w-full h-auto">
                                <source src={mediaSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                ))}
            </div>
            {/* You can add more project-specific content here */}
        </div>
    );
};

export default ClientProjectPage;
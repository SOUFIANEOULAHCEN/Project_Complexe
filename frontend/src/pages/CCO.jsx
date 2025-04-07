import { FaEye, FaBullseye, FaBuilding } from 'react-icons/fa';
import Footer from "../components/Footer";

export default function CCO() {
    const team = [
        {
            name: "Ahmed Alami",
            role: "Responsable Événements",
            image: "/IMGCCO/Нужен профессиональный деловой портрет_ Выезжаю в офис_.jpeg",
        },
        {
            name: "Fatima Zahra",
            role: "Coordinatrice Culturelle",
            image: "/IMGCCO/Photographie _ Portrait corporate femme avec fond clair.jpeg",
        },
        {
            name: "Karim Mansouri",
            role: "Technicien Audiovisuel",
            image: "/IMGCCO/bf4cf03b-f6fa-48f6-9e20-01b37312d549.jpeg",
        },
        {
            name: "Nadia Benani",
            role: "Responsable Communication",
            image: "/IMGCCO/ba64a0ab-62a7-455d-8dff-6b0f4e58f7f3.jpeg",
        },
        {
            name: "Youssef Tahiri",
            role: "Administrateur",
            image: "/IMGCCO/ea63fa89-026a-4ff4-8691-02db157a6cb2.jpeg",
        },
    ];

    return (
        <div className="w-full bg-white">
            
            {/* Hero Section avec Slider */}
            <div className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="public/IMGCCO/complexeculturel.jpg"
                        alt="CCO Ouarzazate"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 flex h-full items-center justify-center text-center">
                    <div className="px-4">
                        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl" >
                            CCO
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-200">
                            Bienvenue au cœur de la culture à Ouarzazate.
                        </p> <p className="mx-auto max-w-2xl text-lg text-gray-200">Un espace dédié à l'art, à la créativité et au partage
                            culturel dans notre belle ville.</p>
                        <div className="mt-6">
                            <a
                                href="/accueil"
                                className="inline-block bg-[#8B4513] text-white font-semibold py-1 px-3 rounded-md hover:bg-[#6e3d20] transition duration-300"
                            >
                                Accueil
                            </a>
                            <a
                                href="/cc0"
                                className="ml-4 inline-block bg-[#8B4513] text-white font-semibold py-1 px-3 rounded-md hover:bg-[#6e3d20] transition duration-300"
                            >
                                CC0
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {/* Section Description du Complexe Culturel Ouarzazate */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        {/* Vidéo du Complexe */}
                        <div className="flex justify-center">
                            <video
                                src="/IMGCCO/video5798505470813541954.mp4" // Remplacez par le chemin de votre vidéo
                                width={600}
                                height={600}
                                controls
                                autoPlay
                                muted
                                loop
                                className="rounded-xl transition-all hover:scale-105"
                            >
                                Votre navigateur ne supporte pas la balise vidéo.
                            </video>
                        </div>
                        {/* Description */}
                        <div className="text-center mx-auto">
                            <h2 className="mb-6 text-3xl font-bold" style={{ color: '#8B4513' }}>Le Complexe Culturel Ouarzazate</h2>
                            <p className="text-gray-600" style={{ color: '#8B4513' }}>
                                Le Complexe Culturel Ouarzazate est un lieu unique qui fusionne l'art, l'histoire et la culture de la région. Il
                                offre un espace de rencontre pour les artistes locaux et internationaux, avec des expositions, des ateliers
                                créatifs, des événements culturels et des spectacles. Notre mission est de préserver et de promouvoir les
                                traditions tout en accueillant les innovations culturelles modernes.
                            </p>
                            <p className="mt-4 text-gray-600" style={{ color: '#8B4513' }}>
                                Situé dans le cœur de la ville, il est facilement accessible à tous, des habitants aux touristes, en passant
                                par les étudiants et les professionnels du domaine artistique. Il incarne l'âme culturelle de la ville et
                                offre un cadre idéal pour les événements culturels divers, tout en contribuant au développement social et
                                économique de la région.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Section Vision et Mission */}
            <div className="mx-auto max-w-7xl px-4 py-16 bg-[#FDF8F5]">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="group rounded-xl bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-4 inline-block rounded-full bg-white border-2 border-[#8B4513] p-3">
                            <FaEye className="h-6 w-6" style={{ color: '#8B4513' }} />
                        </div>

                        <h2 className="mb-4 text-2xl font-bold" style={{ color: '#8B4513' }}>Notre Vision</h2>
                        <p className="text-gray-600" style={{ color: '#8B4513' }}>
                            Faire du Complexe Culturel d'Ouarzazate un phare de la culture régionale, un espace d'échange et de
                            création artistique qui rayonne sur tout le Sud marocain.
                        </p>
                    </div>

                    <div className="group rounded-xl bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-4 inline-block rounded-full bg-white border-2 border-[#8B4513] p-3">
                            <FaBullseye className="h-6 w-6 text-[#8B4513]" />
                        </div>

                        <h2 className="mb-4 text-2xl font-bold" style={{ color: '#8B4513' }}>Notre Mission</h2>
                        <p className="text-gray-600" style={{ color: '#8B4513' }}>
                            Promouvoir la culture locale, encourager les talents artistiques et offrir un espace d'expression
                            culturelle accessible à tous les citoyens.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section Municipalité */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                            <div className="mb-4 inline-block rounded-full bg-white border-2 border-[#824B26] p-3">
                                <FaBuilding className="h-6 w-6" style={{ color: '#8B4513' }} />
                            </div>

                            <h2 className="mb-6 text-3xl font-bold" style={{ color: '#8B4513' }}>Municipalité de Ouarzazate</h2>
                            <p className="text-gray-600" style={{ color: '#8B4513' }}>
                                La Municipalité d'Ouarzazate s'engage à promouvoir la culture et les arts à travers le Complexe
                                Culturel, contribuant ainsi au développement culturel et social de notre ville. Notre engagement reflète
                                notre vision d'une ville dynamique et culturellement riche.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="./public/IMGCCO/ouarzazate.webp"
                                alt="Logo Municipalité"
                                width={500}
                                height={500}
                                className="rounded-lg transition-all hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Équipe */}
            <div className="bg-[#FDF8F5] py-16">

                <div className="mx-auto max-w-7xl px-4">
                    {/* Titre */}
                    <h2 className="mb-4 text-center text-3xl font-bold" style={{ color: '#824B26' }}>Notre Équipe</h2>
                    {/* Paragraphe */}
                    <p className="mb-12 text-center text-lg text-gray-600" style={{ color: '#824B26' }}>
                        Découvrez notre équipe dévouée et professionnelle qui travaille avec passion pour atteindre nos objectifs.
                    </p>

                    {/* Carte des membres */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
                        {team.map((member, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-xl bg-white shadow-lg">
                                <img
                                    src={member.image || "/placeholder.svg"}
                                    alt={member.name}
                                    width={300}
                                    height={400}
                                    className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    <h3 className="text-lg font-semibold">{member.name}</h3>
                                    <p className="text-sm">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Section Directeur du Complexe Culturel Ouarzazate */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        {/* Image du Directeur */}
                        <div className="flex justify-center">
                            <img
                                src="/IMGCCO/fc213b55-3fdd-4b20-a0b6-478bf8174c83.jpeg"
                                alt="Directeur du Complexe Culturel Ouarzazate"
                                className="rounded-xl transition-all hover:scale-105"
                                width={300}
                                height={400}
                            />
                        </div>

                        {/* Description du Directeur */}
                        <div>
                            <h2 className="mb-6 text-3xl font-bold" style={{ color: '#824B26' }}>Directeur du Complexe Culturel Ouarzazate</h2>
                            <p className="text-gray-600" style={{ color: '#824B26' }}>
                                M. Abde ElMalek, notre directeur visionnaire, est un leader passionné par la culture et l'art. Sous sa direction, le Complexe Culturel Ouarzazate s'est transformé en un espace dynamique pour les artistes locaux et internationaux. M. Abde ElMalek met un accent particulier sur l'innovation, l'accessibilité et la diversité culturelle, cherchant toujours à promouvoir la richesse de notre patrimoine tout en ouvrant de nouvelles voies pour l'expression artistique contemporaine.
                            </p>
                            <p className="mt-4 text-gray-600" style={{ color: '#824B26' }}>
                                Grâce à son leadership, le complexe continue de jouer un rôle essentiel dans la promotion des arts et de la culture à Ouarzazate, attirant des talents du monde entier et contribuant à la prospérité culturelle de la région.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

         <br></br>
         <Footer />
        </div>
    );
}
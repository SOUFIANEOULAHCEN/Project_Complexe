import React from "react";
import Footer from "../components/Footer";

const books = [
    {
        id: 1,
        title: "صحيح البخاري",
        author: "الإمام البخاري",
        cover: "/IMGCCO/a0c4229a-0a97-4215-b31d-a5815ae1339a.jpeg",
    },
    {
        id: 2,
        title: "الرحيق المختوم",
        author: "صفى الرحمن المباركفورى",
        cover: "/IMGCCO/Islamic Art and Quotes.jpeg",

    },
    {
        id: 3,
        title: "تفسير مختصر",
        author: "ابن كثير",
        cover: "/IMGCCO/كتاب المصباح المنير مختصر تفسير ابن كثير….jpeg",

    },
    {
        id: 4,
        title: "Les Misérables",
        author: "Victor Hugo",
        cover: "/IMGCCO/Los miserables - Wikipedia, la enciclopedia libre.jpeg",
    },
    {
        id: 5,
        title: "Le Père Goriot",
        author: "BALZAC",
        cover: "/IMGCCO/Le Père Goriot.jpeg",
    },
    {
        id: 6,
        title: "Oscar et la Dame rose",
        author: 'Éric-Emmanuel Schmitt',
        cover: "/IMGCCO/Oscar et la dame rose (ebook), Eric-Emmanuel Schmitt _ 9782226197368 _ Boeken _ bol_com.jpeg",
    },
];


export default function Bibliotheque() {
    return (
        <main >

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
                        Bibliothèque
                        </h1>

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
                               Bibliothèque
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div className="relative mb-16 text-center">
                <h1
                    className="text-[8rem] font-bold select-none [text-shadow:_1px_1px_#8B4513] [-webkit-text-stroke:_2px_rgba(139,69,19,0.5)] text-white"
                >
                    Bibliothèque
                </h1>
                <h2
                    className="text-5xl font-bold absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ color: "#8B4513" }}
                >
                    Bibliothèque
                </h2>
            </div>

            {/* Description */}
            <p
                className="max-w-3xl mx-auto text-center text-muted-foreground mb-11 -mt-8"
                style={{ color: "#8B4513" }}
            >
                Découvrez notre collection de livres et d&apos;œuvres publiées.<br />
                Cette section est dédiée à la promotion de la lecture et de la culture.<br />
                Parcourez notre catalogue et bénéficiez de l&apos;accès à des ressources précieuses disponibles au centre.

            </p>

            {/* Grille de livres */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {books.map((book) => (
                    <div key={book.id} className="group overflow-hidden bg-white shadow-lg rounded-lg">
                        {/* Image */}
                        <div className="relative overflow-hidden">
                            <img
                                src={book.cover || "/placeholder.svg"}
                                alt={book.title}
                                className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            {/* Overlay au survol */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center text-white p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                                    <p className="text-sm text-gray-300 mb-4">{book.author}</p>
                                    <button className="px-4 py-2 bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all">
                                        Lire Plus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> <br /><br />
           <Footer/>
        </main>
    );
}
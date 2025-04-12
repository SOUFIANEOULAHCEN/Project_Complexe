-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 04 avr. 2025 à 02:44
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `testcomplex`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

CREATE TABLE `administrateur` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `administrateur`
--

INSERT INTO `administrateur` (`id`) VALUES
(4),
(5),
(8);

-- --------------------------------------------------------

--
-- Structure de la table `atelier`
--

CREATE TABLE `atelier` (
  `idAtelier` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `dateDebut` date NOT NULL,
  `dateFin` date NOT NULL,
  `organisateur` varchar(255) NOT NULL,
  `idCalendar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `atelier`
--

INSERT INTO `atelier` (`idAtelier`, `nom`, `dateDebut`, `dateFin`, `organisateur`, `idCalendar`) VALUES
(1, 'Atelier Photographie', '2025-04-05', '2025-04-05', 'Pierre Dubois', 2),
(2, 'Atelier Musique', '2025-04-12', '2025-04-12', 'Michel Robert', 2),
(3, 'Atelier Création Numérique', '2025-04-19', '2025-04-19', 'Marie Lefebvre', 2);

-- --------------------------------------------------------

--
-- Structure de la table `calendrier`
--

CREATE TABLE `calendrier` (
  `idCalendrier` int(11) NOT NULL,
  `nomCalendrier` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `calendrier`
--

INSERT INTO `calendrier` (`idCalendrier`, `nomCalendrier`, `date`) VALUES
(1, 'Calendrier Général', '2025-01-01'),
(2, 'Calendrier des Ateliers', '2025-01-01'),
(3, 'Calendrier des Événements Spéciaux', '2025-01-01');

-- --------------------------------------------------------

--
-- Structure de la table `chatbot`
--

CREATE TABLE `chatbot` (
  `idChatbot` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chatbot`
--

INSERT INTO `chatbot` (`idChatbot`) VALUES
(1);

-- --------------------------------------------------------

--
-- Structure de la table `chatbotquestions`
--

CREATE TABLE `chatbotquestions` (
  `id` int(11) NOT NULL,
  `idChatbot` int(11) NOT NULL,
  `question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chatbotquestions`
--

INSERT INTO `chatbotquestions` (`id`, `idChatbot`, `question`) VALUES
(1, 1, 'Comment réserver un événement ?'),
(2, 1, 'Quels sont les prochains ateliers ?'),
(3, 1, 'Comment contacter un administrateur ?'),
(4, 1, 'Comment annuler une réservation ?');

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `idCommentaire` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `idEvenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`idCommentaire`, `contenu`, `idUtilisateur`, `idEvenement`) VALUES
(1, 'Très intéressant, j\'ai hâte d\'y participer !', 1, 1),
(2, 'Est-ce que le parking est gratuit ?', 2, 2),
(3, 'Les photos de l\'année dernière étaient magnifiques.', 6, 3);

-- --------------------------------------------------------

--
-- Structure de la table `espaces`
--

CREATE TABLE `espaces` (
  `idEspace` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `dateDebut` date NOT NULL,
  `dateFin` date NOT NULL,
  `organisateur` varchar(255) NOT NULL,
  `idCalendar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `espaces`
--

INSERT INTO `espaces` (`idEspace`, `nom`, `dateDebut`, `dateFin`, `organisateur`, `idCalendar`) VALUES
(1, 'Salle Polyvalente', '2025-01-01', '2025-12-31', 'Thomas Moreau', 1),
(2, 'Studio Photo', '2025-01-01', '2025-12-31', 'Pierre Dubois', 2),
(3, 'Studio Musique', '2025-01-01', '2025-12-31', 'Michel Robert', 2);

-- --------------------------------------------------------

--
-- Structure de la table `evenements`
--

CREATE TABLE `evenements` (
  `idEvent` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `dateDebut` date NOT NULL,
  `dateFin` date NOT NULL,
  `lieu` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `organisateur` varchar(255) NOT NULL,
  `typeEvenement` varchar(255) NOT NULL,
  `idCalendar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `evenements`
--

INSERT INTO `evenements` (`idEvent`, `nom`, `dateDebut`, `dateFin`, `lieu`, `description`, `organisateur`, `typeEvenement`, `idCalendar`) VALUES
(1, 'Conférence Annuelle', '2025-04-15', '2025-04-17', 'Centre de Conférences', 'Notre conférence annuelle sur les nouvelles technologies', 'Marie Lefebvre', 'Conférence', 1),
(2, 'Concert de Printemps', '2025-05-20', '2025-05-20', 'Salle de Concert', 'Un concert exceptionnel avec nos talents musicaux', 'Thomas Moreau', 'Concert', 3),
(3, 'Exposition Photo', '2025-06-10', '2025-06-20', 'Galerie d\'Art', 'Exposition des œuvres de nos photographes', 'Camille Richard', 'Exposition', 3);

-- --------------------------------------------------------

--
-- Structure de la table `galerie`
--

CREATE TABLE `galerie` (
  `idMedia` int(11) NOT NULL,
  `typeMedia` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `idEvenement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `galerie`
--

INSERT INTO `galerie` (`idMedia`, `typeMedia`, `description`, `idEvenement`) VALUES
(1, 'image', 'Photo de la conférence 2024', 1),
(2, 'video', 'Vidéo du concert de l\'année dernière', 2),
(3, 'image', 'Affiche de l\'exposition', 3),
(4, 'image', 'Photo de l\'atelier photographie', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `newsletter`
--

CREATE TABLE `newsletter` (
  `idNewsletter` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `dateEnvoi` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `newsletter`
--

INSERT INTO `newsletter` (`idNewsletter`, `contenu`, `dateEnvoi`) VALUES
(1, 'Newsletter de Janvier 2025', '2025-01-15'),
(2, 'Newsletter de Février 2025', '2025-02-15'),
(3, 'Événements spéciaux du printemps', '2025-03-01');

-- --------------------------------------------------------

--
-- Structure de la table `newsletterutilisateurs`
--

CREATE TABLE `newsletterutilisateurs` (
  `id` int(11) NOT NULL,
  `idNewsletter` int(11) NOT NULL,
  `utilisateurInfo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `newsletterutilisateurs`
--

INSERT INTO `newsletterutilisateurs` (`id`, `idNewsletter`, `utilisateurInfo`) VALUES
(1, 1, 'Jean Dupont'),
(2, 1, 'Sophie Martin'),
(3, 2, 'Jean Dupont'),
(4, 2, 'Julie Petit'),
(5, 3, 'Jean Dupont'),
(6, 3, 'Sophie Martin'),
(7, 3, 'Julie Petit');

-- --------------------------------------------------------

--
-- Structure de la table `personne`
--

CREATE TABLE `personne` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `typeUser` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `personne`
--

INSERT INTO `personne` (`id`, `nom`, `email`, `password`, `typeUser`) VALUES
(1, 'Dupont Jean', 'jean.dupont@example.com', 'password123', 'utilisateur'),
(2, 'Martin Sophie', 'sophie.martin@example.com', 'password456', 'utilisateur'),
(3, 'Dubois Pierre', 'pierre.dubois@example.com', 'password789', 'talent'),
(4, 'Lefebvre Marie', 'marie.lefebvre@example.com', 'passwordabc', 'administrateur'),
(5, 'Moreau Thomas', 'thomas.moreau@example.com', 'passworddef', 'superadmin'),
(6, 'Petit Julie', 'julie.petit@example.com', 'passwordghi', 'utilisateur'),
(7, 'Robert Michel', 'michel.robert@example.com', 'passwordjkl', 'talent'),
(8, 'Richard Camille', 'camille.richard@example.com', 'passwordmno', 'administrateur');

-- --------------------------------------------------------

--
-- Structure de la table `portailactualites`
--

CREATE TABLE `portailactualites` (
  `idPortail` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `datePublication` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `portailactualites`
--

INSERT INTO `portailactualites` (`idPortail`, `titre`, `contenu`, `datePublication`) VALUES
(1, 'Lancement de la nouvelle plateforme', 'Nous sommes heureux de vous annoncer le lancement de notre nouvelle plateforme...', '2025-01-10'),
(2, 'Nouveaux ateliers disponibles', 'Découvrez nos nouveaux ateliers pour le printemps 2025...', '2025-02-20'),
(3, 'Interview avec notre talent du mois', 'Rencontrez Pierre Dubois, notre photographe talentueux...', '2025-03-05');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `idReservation` int(11) NOT NULL,
  `dateReservation` date NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `idEvenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`idReservation`, `dateReservation`, `idUtilisateur`, `idEvenement`) VALUES
(1, '2025-03-10', 1, 1),
(2, '2025-03-15', 2, 2),
(3, '2025-03-20', 6, 3),
(4, '2025-03-25', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `statistiquesetrapports`
--

CREATE TABLE `statistiquesetrapports` (
  `id` int(11) NOT NULL,
  `nombreReservations` int(11) NOT NULL,
  `nombreParticipants` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `statistiquesetrapports`
--

INSERT INTO `statistiquesetrapports` (`id`, `nombreReservations`, `nombreParticipants`) VALUES
(1, 4, 3);

-- --------------------------------------------------------

--
-- Structure de la table `superadmin`
--

CREATE TABLE `superadmin` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `superadmin`
--

INSERT INTO `superadmin` (`id`) VALUES
(5);

-- --------------------------------------------------------

--
-- Structure de la table `talent`
--

CREATE TABLE `talent` (
  `id` int(11) NOT NULL,
  `domaineExpertise` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `talent`
--

INSERT INTO `talent` (`id`, `domaineExpertise`) VALUES
(3, 'Photographie'),
(7, 'Musique');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`) VALUES
(1),
(2),
(3),
(6),
(7);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurchatbot`
--

CREATE TABLE `utilisateurchatbot` (
  `idUtilisateur` int(11) NOT NULL,
  `idChatbot` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurchatbot`
--

INSERT INTO `utilisateurchatbot` (`idUtilisateur`, `idChatbot`) VALUES
(1, 1),
(2, 1),
(6, 1);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurnewsletter`
--

CREATE TABLE `utilisateurnewsletter` (
  `idUtilisateur` int(11) NOT NULL,
  `idNewsletter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurnewsletter`
--

INSERT INTO `utilisateurnewsletter` (`idUtilisateur`, `idNewsletter`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(6, 2),
(6, 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `atelier`
--
ALTER TABLE `atelier`
  ADD PRIMARY KEY (`idAtelier`),
  ADD KEY `idCalendar` (`idCalendar`);

--
-- Index pour la table `calendrier`
--
ALTER TABLE `calendrier`
  ADD PRIMARY KEY (`idCalendrier`);

--
-- Index pour la table `chatbot`
--
ALTER TABLE `chatbot`
  ADD PRIMARY KEY (`idChatbot`);

--
-- Index pour la table `chatbotquestions`
--
ALTER TABLE `chatbotquestions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idChatbot` (`idChatbot`);

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`idCommentaire`),
  ADD KEY `idUtilisateur` (`idUtilisateur`),
  ADD KEY `idEvenement` (`idEvenement`);

--
-- Index pour la table `espaces`
--
ALTER TABLE `espaces`
  ADD PRIMARY KEY (`idEspace`),
  ADD KEY `idCalendar` (`idCalendar`);

--
-- Index pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD PRIMARY KEY (`idEvent`),
  ADD KEY `idCalendar` (`idCalendar`);

--
-- Index pour la table `galerie`
--
ALTER TABLE `galerie`
  ADD PRIMARY KEY (`idMedia`),
  ADD KEY `idEvenement` (`idEvenement`);

--
-- Index pour la table `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`idNewsletter`);

--
-- Index pour la table `newsletterutilisateurs`
--
ALTER TABLE `newsletterutilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNewsletter` (`idNewsletter`);

--
-- Index pour la table `personne`
--
ALTER TABLE `personne`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `portailactualites`
--
ALTER TABLE `portailactualites`
  ADD PRIMARY KEY (`idPortail`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`idReservation`),
  ADD KEY `idUtilisateur` (`idUtilisateur`),
  ADD KEY `idEvenement` (`idEvenement`);

--
-- Index pour la table `statistiquesetrapports`
--
ALTER TABLE `statistiquesetrapports`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `superadmin`
--
ALTER TABLE `superadmin`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `talent`
--
ALTER TABLE `talent`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateurchatbot`
--
ALTER TABLE `utilisateurchatbot`
  ADD PRIMARY KEY (`idUtilisateur`,`idChatbot`),
  ADD KEY `idChatbot` (`idChatbot`);

--
-- Index pour la table `utilisateurnewsletter`
--
ALTER TABLE `utilisateurnewsletter`
  ADD PRIMARY KEY (`idUtilisateur`,`idNewsletter`),
  ADD KEY `idNewsletter` (`idNewsletter`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `atelier`
--
ALTER TABLE `atelier`
  MODIFY `idAtelier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `calendrier`
--
ALTER TABLE `calendrier`
  MODIFY `idCalendrier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `chatbot`
--
ALTER TABLE `chatbot`
  MODIFY `idChatbot` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `chatbotquestions`
--
ALTER TABLE `chatbotquestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `idCommentaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `espaces`
--
ALTER TABLE `espaces`
  MODIFY `idEspace` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `evenements`
--
ALTER TABLE `evenements`
  MODIFY `idEvent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `galerie`
--
ALTER TABLE `galerie`
  MODIFY `idMedia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `idNewsletter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `newsletterutilisateurs`
--
ALTER TABLE `newsletterutilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `personne`
--
ALTER TABLE `personne`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `portailactualites`
--
ALTER TABLE `portailactualites`
  MODIFY `idPortail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `idReservation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `statistiquesetrapports`
--
ALTER TABLE `statistiquesetrapports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD CONSTRAINT `administrateur_ibfk_1` FOREIGN KEY (`id`) REFERENCES `personne` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `atelier`
--
ALTER TABLE `atelier`
  ADD CONSTRAINT `atelier_ibfk_1` FOREIGN KEY (`idCalendar`) REFERENCES `calendrier` (`idCalendrier`);

--
-- Contraintes pour la table `chatbotquestions`
--
ALTER TABLE `chatbotquestions`
  ADD CONSTRAINT `chatbotquestions_ibfk_1` FOREIGN KEY (`idChatbot`) REFERENCES `chatbot` (`idChatbot`) ON DELETE CASCADE;

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`idEvenement`) REFERENCES `evenements` (`idEvent`);

--
-- Contraintes pour la table `espaces`
--
ALTER TABLE `espaces`
  ADD CONSTRAINT `espaces_ibfk_1` FOREIGN KEY (`idCalendar`) REFERENCES `calendrier` (`idCalendrier`);

--
-- Contraintes pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD CONSTRAINT `evenements_ibfk_1` FOREIGN KEY (`idCalendar`) REFERENCES `calendrier` (`idCalendrier`);

--
-- Contraintes pour la table `galerie`
--
ALTER TABLE `galerie`
  ADD CONSTRAINT `galerie_ibfk_1` FOREIGN KEY (`idEvenement`) REFERENCES `evenements` (`idEvent`);

--
-- Contraintes pour la table `newsletterutilisateurs`
--
ALTER TABLE `newsletterutilisateurs`
  ADD CONSTRAINT `newsletterutilisateurs_ibfk_1` FOREIGN KEY (`idNewsletter`) REFERENCES `newsletter` (`idNewsletter`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`idEvenement`) REFERENCES `evenements` (`idEvent`);

--
-- Contraintes pour la table `superadmin`
--
ALTER TABLE `superadmin`
  ADD CONSTRAINT `superadmin_ibfk_1` FOREIGN KEY (`id`) REFERENCES `administrateur` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `talent`
--
ALTER TABLE `talent`
  ADD CONSTRAINT `talent_ibfk_1` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`id`) REFERENCES `personne` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `utilisateurchatbot`
--
ALTER TABLE `utilisateurchatbot`
  ADD CONSTRAINT `utilisateurchatbot_ibfk_1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `utilisateurchatbot_ibfk_2` FOREIGN KEY (`idChatbot`) REFERENCES `chatbot` (`idChatbot`);

--
-- Contraintes pour la table `utilisateurnewsletter`
--
ALTER TABLE `utilisateurnewsletter`
  ADD CONSTRAINT `utilisateurnewsletter_ibfk_1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `utilisateurnewsletter_ibfk_2` FOREIGN KEY (`idNewsletter`) REFERENCES `newsletter` (`idNewsletter`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

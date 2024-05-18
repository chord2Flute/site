<?php
// Connexion à la base de données (à remplacer par vos propres informations)
$serveur = "localhost";
$utilisateur = "votre_utilisateur";
$motDePasse = "votre_mot_de_passe";
$baseDeDonnees = "votre_base_de_donnees";

// Connexion à la base de données
$connexion = new mysqli($serveur, $utilisateur, $motDePasse, $baseDeDonnees);

// Vérification de la connexion
if ($connexion->connect_error) {
    die("Échec de la connexion à la base de données : " . $connexion->connect_error);
}

// Récupération des données envoyées par le client
$donnees = json_decode(file_get_contents('php://input'), true);
$joueurs = $donnees['joueurs'];

// Supprimer les joueurs existants de la base de données
$connexion->query("DELETE FROM joueurs");

// Insérer les nouveaux joueurs dans la base de données
foreach ($joueurs as $joueur) {
    $stmt = $connexion->prepare("INSERT INTO joueurs (nom) VALUES (?)");
    $stmt->bind_param("s", $joueur);
    $stmt->execute();
    $stmt->close();
}

// Fermeture de la connexion
$connexion->close();
?>
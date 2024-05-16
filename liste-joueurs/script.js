document.addEventListener("DOMContentLoaded", function() {
    var listeJoueurs = document.getElementById("listeJoueurs");
    var ajouterJoueurBtn = document.getElementById("ajouterJoueur");

    // Fonction pour ajouter un joueur à la liste
    function ajouterJoueur(nom) {
        var joueurItem = document.createElement("li");
        joueurItem.textContent = nom;
        listeJoueurs.appendChild(joueurItem);
    }

    // Ajoutez les joueurs existants à la liste au chargement de la page
    var joueursExistant = ["Vincent", "Robin", "Léon"];
    joueursExistant.forEach(function(joueur) {
        ajouterJoueur(joueur);
    });

    // Ajoutez un nouveau joueur lorsque le bouton est cliqué
    ajouterJoueurBtn.addEventListener("click", function() {
        var nouveauJoueur = prompt("Entrez le nom du nouveau joueur :");
        if (nouveauJoueur) {
            ajouterJoueur(nouveauJoueur);
        }
    });
});

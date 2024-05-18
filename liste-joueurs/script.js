document.addEventListener("DOMContentLoaded", function() {
    var listeJoueurs = document.getElementById("listeJoueurs");
    var ajouterJoueurBtn = document.getElementById("ajouterJoueur");
    var modifierListeBtn = document.getElementById("modifierListe");
    var modeEdition = false; // Indicateur pour le mode de modification

    // Fonction pour ajouter un joueur à la liste
    function ajouterJoueur(nom) {
        var joueurItem = document.createElement("li");
        joueurItem.textContent = nom;
        joueurItem.contentEditable = "true"; // Permettre l'édition du nom du joueur
        listeJoueurs.appendChild(joueurItem);
        sauvegarderListe(); // Sauvegarder la liste après l'ajout d'un joueur
    }

    // Charger la liste depuis le stockage local au chargement de la page
    function chargerListe() {
        var joueurs = localStorage.getItem("joueurs");
        if (joueurs) {
            joueurs = JSON.parse(joueurs);
            joueurs.forEach(function(joueur) {
                ajouterJoueur(joueur);
            });
        }
    }

    // Sauvegarder la liste dans le stockage local et dans la base de données
    function sauvegarderListe() {
        var joueurs = [];
        var joueursItems = listeJoueurs.getElementsByTagName("li");
        for (var i = 0; i < joueursItems.length; i++) {
            joueurs.push(joueursItems[i].textContent);
        }
        localStorage.setItem("joueurs", JSON.stringify(joueurs));
        
        // Envoi des données au serveur via une requête AJAX
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'sauvegarder_liste.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('Liste sauvegardée avec succès dans la base de données !');
            } else {
                console.error('Erreur lors de la sauvegarde de la liste dans la base de données');
            }
        };
        xhr.send(JSON.stringify({ joueurs: joueurs }));
    }

    // Charger la liste au chargement de la page
    chargerListe();

    // Ajoutez un nouveau joueur lorsque le bouton est cliqué
    ajouterJoueurBtn.addEventListener("click", function() {
        var nouveauJoueur = prompt("Entrez le nom du nouveau joueur :");
        if (nouveauJoueur) {
            ajouterJoueur(nouveauJoueur);
        }
    });

    // Activez/désactivez le mode de modification lorsque le bouton est cliqué
    modifierListeBtn.addEventListener("click", function() {
        modeEdition = !modeEdition; // Bascule entre vrai et faux pour activer/désactiver le mode de modification

        // Activer/désactiver l'édition pour chaque élément de la liste
        var joueurs = listeJoueurs.getElementsByTagName("li");
        for (var i = 0; i < joueurs.length; i++) {
            joueurs[i].contentEditable = modeEdition; // Activez ou désactivez l'édition en fonction du mode
        }

        // Changer le texte du bouton en fonction du mode
        modifierListeBtn.textContent = modeEdition ? "Terminer la modification" : "Modifier la liste";

        if (!modeEdition) {
            sauvegarderListe(); // Sauvegarder la liste après avoir terminé la modification
        }
    });
});
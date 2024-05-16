// Attendez que le DOM soit entièrement chargé
document.addEventListener("DOMContentLoaded", function() {
    // Sélectionnez le bouton "Envoyer un e-mail" par son ID
    var boutonEnvoyerEmail = document.getElementById("envoyerEmail");

    // Ajoutez un écouteur d'événements de clic sur le bouton
    boutonEnvoyerEmail.addEventListener("click", function() {
        // Récupérez les informations nécessaires pour l'e-mail
        var destinataire = "votre@email.com";
        var sujet = "Sujet de l'e-mail";
        var corps = "Contenu de l'e-mail";

        // Construisez le lien mailto avec les informations
        var lienMailto = "mailto:" + destinataire + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(corps);

        // Ouvrez le lien mailto dans une nouvelle fenêtre
        window.open(lienMailto);
    });
});

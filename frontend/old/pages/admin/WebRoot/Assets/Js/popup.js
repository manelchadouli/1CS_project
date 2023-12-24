
OnLoad(() => {
    // Get the popup page
    window.popup = document.querySelector(".popup-container");

    // Set the content of the popup
    window.popup.innerHTML += "<form><h2></h2><div><label for=\"titreComplet\">Titre Complet</label><textarea name=\"titreComplet\" id=\"titreComplet\" rows=\"2\" ></textarea></div><div><label for=\"encadreur\">Encadreur</label><textarea name=\"encadreur\" id=\"encadreur\" rows=\"3\" ></textarea></div><div><label for=\"niveau\">Niveau</label><textarea name=\"niveau\" id=\"niveau\" rows=\"1\" ></textarea></div><div><label for=\"motscles\">Mots Cles</label><textarea name=\"motscles\" id=\"motscles\" rows=\"3\" ></textarea></div><div><label for=\"resume\">Resume</label><textarea name=\"resume\" id=\"resume\" rows=\"16\" ></textarea></div><div><label for=\"frontend\">Frontend</label><textarea name=\"frontend\" id=\"frontend\" rows=\"2\" ></textarea></div><div><label for=\"backend\">Backend</label><textarea name=\"backend\" id=\"backend\" rows=\"2\" ></textarea></div><div><label for=\"planDeTravail\">Plan De Travail</label><textarea name=\"planDeTravail\" id=\"planDeTravail\" rows=\"5\" ></textarea></div><div><button type=\"button\" class=\"cancelButton\">cancel</button><button type=\"submit\">OK</button></div></form>";

    // Get the button that will close the popup
    var closeButton = document.querySelector(".cancelButton");

    // Listen out for click events
    closeButton.addEventListener("click", () => {
        // Make the popup disappear when clicked
        window.popup.classList.remove("appear");
    });

});
$(document).ready(function () {
    // Variable pour suivre le mode (jour/nuit)
    let mode = 'jour';

    // Fonction pour basculer entre le mode jour et nuit
    function toggleMode() {
        if (mode === 'jour') {
            $('body').css('background-color', '#000000'); // Noir
            $('#modeButton').text('Nuit');
            mode = 'nuit';
        } else {
            $('body').css('background-color', '#ffffff'); // Blanc (par défaut)
            $('#modeButton').text('Jour');
            mode = 'jour';
        }
    }

    // Événement de clic sur le bouton pour changer de mode
    $('#modeButton').click(function () {
        toggleMode();
    });

    // Votre code pour récupérer les données et afficher les burgers
    async function fetchData() {
        try {
            const response = await $.ajax({
                url: "https://titi.startwin.fr/products/type/burger",
                type: "GET",
                dataType: "json"
            });
            console.log(response);
            displayBurgers(response); // Appel de la fonction pour afficher les burgers
        } catch (error) {
            console.log("Erreur :", error);
        }
    }

    fetchData();

    function displayBurgers(burgers) {
        const rootRow = $('.row');
        burgers.forEach(burger => {
            const imagePath = burger.image.replace(/\\/g, '/'); // Remplacer les barres obliques inversées par des barres obliques normales
            const card = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
            <a href="detail.html?name=${burger.name}&price=${burger.price.$numberDecimal}&image=${imagePath}" class="text-decoration-none text-dark">
                <div class="card">
                    <img src="./${imagePath}" class="card-img-top" alt="${burger.name}">
                    <div class="card-body">
                        <h5 class="card-title">${burger.name}</h5>
                        <p class="card-text">${burger.description}</p>
                        <p class="card-text">${burger.price.$numberDecimal} €</p>
                    </div>
                </div>
                </a>
            </div>
            `;
            rootRow.append(card);
        });
    }
});
// Garde en mémoire le projet actuellement ouvert ('mcc', 'pv' ou null)
let projetActif = null;

// Garde en mémoire l'étudiant actuellement sélectionné ('axel', 'lucas', 'romain' ou null)
let etudiantActif = null;

/**
 * Ouvre le compte-rendu d'un projet si on clique sur sa carte,
 * ou le referme si on reclique sur la même carte.
 */
function basculerProjet(id) {
    const panelMcc = document.getElementById('contenu-mcc');
    const panelPv = document.getElementById('contenu-pv');
    const cardMcc = document.getElementById('card-mcc');
    const cardPv = document.getElementById('card-pv');
    const texteMcc = document.getElementById('etat-card-mcc');
    const textePv = document.getElementById('etat-card-pv');

    // Si on reclique sur le projet déjà ouvert, on le ferme
    if (projetActif === id) {
        fermerTousLesProjets();
        return;
    }

    // Sinon, on réinitialise d'abord l'affichage des deux
    panelMcc.classList.remove('panel-open');
    panelPv.classList.remove('panel-open');
    cardMcc.classList.remove('card-open');
    cardPv.classList.remove('card-open');
    texteMcc.innerHTML = 'Afficher le compte-rendu &#9662;';
    textePv.innerHTML = 'Afficher le compte-rendu &#9662;';

    // Puis on ouvre celui qui a été cliqué
    if (id === 'mcc') {
        panelMcc.classList.add('panel-open');
        cardMcc.classList.add('card-open');
        texteMcc.innerHTML = 'Masquer le compte-rendu &#9652;';
        projetActif = 'mcc';
        panelMcc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'pv') {
        panelPv.classList.add('panel-open');
        cardPv.classList.add('card-open');
        textePv.innerHTML = 'Masquer le compte-rendu &#9652;';
        projetActif = 'pv';
        panelPv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Force l'ouverture d'un projet quand on clique depuis le bandeau de navigation du haut.
 */
function ouvrirDepuisMenu(id) {
    if (projetActif !== id) {
        basculerProjet(id);
    } else {
        const panel = document.getElementById('contenu-' + id);
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Referme tous les détails de projets pour ne laisser que les cartes et le bilan global.
 */
function fermerTousLesProjets() {
    document.getElementById('contenu-mcc').classList.remove('panel-open');
    document.getElementById('contenu-pv').classList.remove('panel-open');
    document.getElementById('card-mcc').classList.remove('card-open');
    document.getElementById('card-pv').classList.remove('card-open');
    document.getElementById('etat-card-mcc').innerHTML = 'Afficher le compte-rendu &#9662;';
    document.getElementById('etat-card-pv').innerHTML = 'Afficher le compte-rendu &#9662;';
    projetActif = null;
}

/**
 * Met en surbrillance toutes les cases de conclusion liées à un étudiant.
 * Un second clic sur le même étudiant enlève la surbrillance.
 */
function ciblerEtudiant(prenomId) {
    const boutons = document.querySelectorAll('.student-btn');
    const casesAvis = document.querySelectorAll('.review-box');

    // Si on reclique sur l'étudiant déjà actif, on remet tout à la normale
    if (etudiantActif === prenomId) {
        etudiantActif = null;
        boutons.forEach(btn => btn.classList.remove('active-student'));
        casesAvis.forEach(box => {
            box.classList.remove('highlighted-review', 'dimmed-review');
        });
        return;
    }

    etudiantActif = prenomId;

    // Mise à jour des boutons de prénoms dans l'encadré du haut
    boutons.forEach(btn => {
        if (btn.getAttribute('data-target') === prenomId) {
            btn.classList.add('active-student');
        } else {
            btn.classList.remove('active-student');
        }
    });

    // Mise en surbrillance des cases de l'étudiant choisi (dans les projets et dans le bilan)
    casesAvis.forEach(box => {
        if (box.getAttribute('data-student') === prenomId) {
            box.classList.add('highlighted-review');
            box.classList.remove('dimmed-review');
        } else {
            box.classList.remove('highlighted-review');
            box.classList.add('dimmed-review');
        }
    });
}
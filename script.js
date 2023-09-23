function genererNom() {
    var prenoms = ["Ary", "Hervé", "Gaspard", "Adrien", "Julia", "Johanna", "Elora"];
    return prenoms[Math.floor(Math.random() * prenoms.length)]; //on génère le nom aleatoirement
}

function genererCaracteristique() {
    var caracteristiques = ["intelligent", "musclé", "blondasse","expert","médecin"];
    return caracteristiques[Math.floor(Math.random() * caracteristiques.length)]; // on creer les caracterisqques et les generent aleatoirement
}

function actionSurvivant(survivant) {
    if (survivant.pointsDeVie <= 0) {                   
        return survivant.nom + " (" + survivant.caracteristique + ") est déjà mort."; // pour que un personnage n'agisse plus quand il est mort
    }

    var actions = ["Attaque !", "Esquive !", "Meurt..."];                  //On créer les actions des survivants
    var probabilites = [0.2, 0.4, 0.1];
    var actionProb = choisirActionAvecProbabilite(actions, probabilites);

    if (actions[actionProb] === "Attaque !") {
        var degats = 15;
        jason.pointsDeVie -= degats;
        return survivant.nom + " (" + survivant.caracteristique + ") attaque Jason et inflige " + degats + " points de dégâts.";
    } else if (actions[actionProb] === "Esquive !") {
        survivant.pointsDeVie -= 10;
        return survivant.nom + " (" + survivant.caracteristique + ") esquive l'attaque de Jason et inflige 10 points de dégâts.";
    } else {
        survivant.pointsDeVie = 0;
        survivantsMorts.push(survivant.nom);
        return survivant.nom + " (" + survivant.caracteristique + ") Meurt...";
    }
}

    

function choisirActionAvecProbabilite(actions, probabilites) {
    var totalProbabilites = probabilites.reduce(function(acc, prob) { return acc + prob; }, 0);
    var randomValeur = Math.random() * totalProbabilites;
    var Prob = 0;
                                                            //on attribue la part de random dans les actions
    for (var i = 0; i < actions.length; i++) {
        Prob += probabilites[i];
        if (randomValeur < Prob) {
            return i;
        }
    }

    return actions.length - 1; // refais la derniere action si ya un pb
}

var jason = { nom: "Jason", pointsDeVie: 100 };     //on créer le tueur

var survivants = [];
for (var i = 0; i < 5; i++) {           // on créer les survivants
    if (survivants.length >= 5) {
        break;  // permet d'arreter la création quand on est a 5 survivant
    }
    var nomSurvivant = genererNom();
    var caracteristique = genererCaracteristique();
    var survivant = { nom: nomSurvivant, caracteristique: caracteristique, pointsDeVie: 100 };
    survivants.push(survivant);
}

var survivantsMorts = [];

while (jason.pointsDeVie > 0 && survivants.length > 0) {
    var survivantAttaque = survivants[Math.floor(Math.random() * survivants.length)];
    var actionMessage = actionSurvivant(survivantAttaque);
    console.log(actionMessage);                         // la boucle (j'ai peur pour mon pc)

    if (survivantAttaque.pointsDeVie <= 0) {
        survivants.splice(survivants.indexOf(survivantAttaque), 1);
    }
}

if (jason.pointsDeVie <= 0) {
    console.log("Les survivants ont gagné OUAAAAIS, Jason est mort (le nul).");
} else {
    console.log("Jason a tué tous les survivants, mood snif snif, RIP à", survivantsMorts.join(", "));
}

//on affiche le message de fin et le code est fini !
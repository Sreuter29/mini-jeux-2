//PLUS OU MOINS
function nb_aleatoire(min, max)
{
  var nb = min + (max-min+1)*Math.random();
  return Math.floor(nb);
}

function PoM_manche(min, max)
{
  var nb = nb_aleatoire(min, max);        // nb a deviner
  var cpt = 0;    // nb de coups pour le trouver
  var saisie;     // nb tape par le joueur
  var msg = 'Le nombre a deviner est compris entre ' + min + ' et ' + max + '.';

  do
  {
    saisie = prompt(msg);

    // si "Annuler"
    if(saisie == null)
    return 0;

    cpt++;
    if(saisie > nb)
    msg = "C'est moins";
    else
    msg = "C'est plus";
  }
  while(saisie != nb);

  return cpt;
}

function PoM_partie(min, max)
{
  var cpt = 0;    // nb de manches jouees
  var best_score = 0;     // meilleur score
  var score;      // score de la partie en cours
  var continuer;

  do
  {
    score = PoM_manche(min, max);   // joue la manche
    if(score)
    {
      cpt++;
      if(score < best_score || best_score == 0)
      best_score = score;
      continuer = confirm("Bravo, tu as gagne en " + score + " coups.\nVeux-tu rejouer ?");
    }
    else
    continuer = false;
  }
  while(continuer);

  alert("Tu as joue " + cpt + " manche(s).\nTon meilleur score est de " + best_score + " coups.");
  return best_score;
}

//VOITURES
$(function() {
  var ok = 1;
function deplace() {
  $('#vr').animate({top: '-=600'}, 2500, 'linear', function(){
    var vrX = Math.floor(Math.random()*194)+70;
    var vrY = 400;
    $('#vr').css('top',vrY);
    $('#vr').css('left',vrX);
    ok = 1;
  });

  $('.fond').animate({
    top: '-=360'
  },
  1000,
  'linear',
  function(){
    $('.fond').css('top', 0);
    deplace();
  });
}

$(document).keydown(function(e){
  //Si appui touche droite
  if (e.which == 39)
  {
    vjX = parseInt($('#vj').css('left'));
    if (vjX < 280)
    $('#vj').css('left', vjX+30);
  }
  //Si appui touche gauche
  if (e.which == 37)
  {
    vjX = parseInt($('#vj').css('left'));
    if (vjX > 70)
    $('#vj').css('left', vjX-30);
  }
})

function collision() {
  vjX = parseInt($('#vj').css('left'));
  vrX = parseInt($('#vr').css('left'));
  vjY = 10;
  vrY = parseInt($('#vr').css('top'));
  //Si la voiture rouge entre en collision par la gauche OU Si la voiture rouge entre en collision par la droite
  if (((vrX > vjX) && (vrX < (vjX+66)) && (vrY > vjY) && (vrY < (vjY+150)) &&(ok == 1))
  || ((vjX > vrX) && (vjX < (vrX+66)) && (vrY > vjY) && (vrY < (vjY+150)) && (ok == 1)))
  {
    collision = parseInt($('#info').text()) + 1;
    $('#info').text(collision);
    ok = 0;
  }
}
deplace();
setInterval(collision, 20);
})

// Dragon slayer

function getRandomInteger(min, max)
{
    // Renvoie un nombre entier aléatoire compris entre les arguments min et max inclus.
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function requestInteger(message, min, max)
{
    var integer;

    /*
     * La boucle s'exécute tant que l'entier n'est pas un nombre (fonction isNaN()) et
     * n'est pas compris entre les arguments min et max.
     */
    do
    {
        // On demande à l'utilisateur de saisir un nombre entier.
        integer = parseInt(window.prompt(message));
    }
    while(isNaN(integer) == true || integer < min || integer > max);

    return integer;
}

function showImage(source)
{
  var image = document.createElement("img")
  image.setAttribute('src', source);
  image.setAttribute('id', 'illustration');
  div.appendChild(image);
}

var game;

// Déclaration des constantes du jeu, rend le code plus compréhensible.
const ARMOR_COPPER  = 1;
const ARMOR_IRON    = 2;
const ARMOR_MAGICAL = 3;

const LEVEL_EASY   = 1;
const LEVEL_NORMAL = 2;
const LEVEL_HARD   = 3;

const SWORD_WOOD      = 1;
const SWORD_STEEL     = 2;
const SWORD_EXCALIBUR = 3;

const div = document.querySelector('.dragon')

function computeDragonDamagePoint()
{
    var damagePoint;

    if(game.difficulty == LEVEL_EASY)
    {
        // Le dragon inflige moins de dégâts si le niveau de difficulté est facile.
        damagePoint = getRandomInteger(10, 20);
    }
    else
    {
        damagePoint = getRandomInteger(30, 40);
    }

    // Calcul du résultat final en fonction de l'armure du joueur.
    return Math.round(damagePoint / game.armorRatio);
}

function computePlayerDamagePoint()
{
    var damagePoint;

    // Les dégâts infligés par le joueur varient selon la difficulté du jeu.
    switch(game.difficulty)
    {
        case LEVEL_EASY:
        damagePoint = getRandomInteger(25, 30);
        break;

        case LEVEL_NORMAL:
        damagePoint = getRandomInteger(15, 20);
        break;

        case LEVEL_HARD:
        damagePoint = getRandomInteger(5, 10);
        break;
    }

    // Calcul du résultat final en fonction de l'épée du joueur.
    return Math.round(damagePoint * game.swordRatio);
}

function gameLoop()
{
    var damagePoint;
    var dragonSpeed;
    var playerSpeed;
    var tour = document.createElement("strong");;
    var result = document.createElement("strong");

    // Le jeu s'exécute tant que le dragon et le joueur sont vivants.
    while(game.hpDragon > 0 && game.hpPlayer > 0)
    {
      tour.innerHTML = 'Tour numéro ' + game.round;
      div.appendChild(tour)

        // Détermination de la vitesse du dragon et du joueur.
        dragonSpeed = getRandomInteger(10, 20);
        playerSpeed = getRandomInteger(10, 20);

        // Est-ce que le dragon est plus rapide que le joueur ?
        if(dragonSpeed > playerSpeed)
        {
            // Oui, le joueur se prend des dégâts et perd des points de vie.
            damagePoint = computeDragonDamagePoint();

            // Diminution des points de vie du joueur.
            game.hpPlayer -= damagePoint;
            // Identique à game.hpPlayer = game.hpPlayer - damagePoint;
            result.innerHTML = 'Le dragon est plus rapide et vous brûle, il vous enlève ' +
            damagePoint + ' PV';
            div.appendChild(result);
        }
        else
        {
            // Non, le dragon se prend des dégâts et perd des points de vie.
            damagePoint = computePlayerDamagePoint();

            // Diminution des points de vie du dragon.
            game.hpDragon -= damagePoint;
            // Identique à game.hpDragon = game.hpDragon - damagePoint;
            result.innerHTML = 'Vous êtes plus rapide et frappez le dragon, vous lui enlevez ' +
            damagePoint + ' PV';
            div.appendChild(result);
        }

        showGameState();

        // On passe au tour suivant.
        game.round++;
    }
}

function initializeGame()
{
  div.innerHTML = "";
    // Initialisation de la variable globale du jeu.
    game       = new Object();
    game.round = 1;

    game.difficulty = requestInteger
    (
        'Niveau de difficulté ?\n' +
        '1. Facile - 2. Normal - 3. Difficile',
        1, 3
    );

    /*
     * Détermination des points de vie de départ du joueur et du dragon selon
     * le niveau de difficulté.
     */
    switch(game.difficulty)
    {
        case LEVEL_EASY:
        game.hpDragon = getRandomInteger(150, 200);
        game.hpPlayer = getRandomInteger(200, 250);
        break;

        case LEVEL_NORMAL:
        game.hpDragon = getRandomInteger(200, 250);
        game.hpPlayer = getRandomInteger(200, 250);
        break;

        case LEVEL_HARD:
        game.hpDragon = getRandomInteger(200, 250);
        game.hpPlayer = getRandomInteger(150, 200);
        break;
    }


    game.armor = requestInteger
    (
        'Armure ?\n' +
        '1. Cuivre - 2. Fer - 3. Magique',
        1, 3
    );

    game.sword = requestInteger
    (
        'Epée ?\n' +
        '1. Bois - 2. Acier - 3. Excalibur',
        1, 3
    );


    switch(game.armor)
    {
        // Une armure en cuivre protège normalement.
        case ARMOR_COPPER:
        game.armorRatio = 1;
        break;

        // Une armure en fer diminue un peu les dégâts infligés.
        case ARMOR_IRON:
        game.armorRatio = 1.25;
        break;

        // Une armure magique divise par deux les dégâts infligés.
        case ARMOR_MAGICAL:
        game.armorRatio = 2;
        break;
    }

    switch(game.sword)
    {
        // Une épée en bois nécessite deux fois plus de dégâts que la normale.
        case SWORD_WOOD:
        game.swordRatio = 0.5;
        break;

        // Une épée en acier inflige des dégâts normaux.
        case SWORD_STEEL:
        game.swordRatio = 1;
        break;

        // L'épée légendaire inflige le double de dégâts.
        case SWORD_EXCALIBUR:
        game.swordRatio = 2;
        break;
    }
}

function showGameState()
{
  var gameState = document.createElement("p");
  gameState.innerHTML =
      'Dragon : ' + game.hpDragon + ' PV, ' +
      'joueur : ' + game.hpPlayer + ' PV';
      div.appendChild(gameState);
}

function showGameWinner()
{
  var final = document.createElement("strong");
    if(game.hpDragon <= 0)
    {
        showImage('images/knight.jpg');
        final.innerHTML = "Vous avez gagné, vous êtes vraiment fort ! Il vous restait " + game.hpPlayer + " PV";
        div.appendChild(final);
    }
    else // if(game.hpPlayer <= 0)
    {
        showImage('images/dragon.jpg');
        final.innerHTML = "Le dragon a gagné, vous avez été carbonisé ! Il restait " + game.hpDragon + " PV au dragon";
        div.appendChild(final);
    }
}

function startGame()
{
    // Initialisation du jeu.
    initializeGame();

    // Exécution du jeu.
    var vieDepart = document.createElement("strong");
    vieDepart.innerHTML = "Points de vie de départ :";
    div.appendChild(vieDepart);
    showGameState();
    gameLoop();

    // Fin du jeu.
    showGameWinner();
}

const modifiersEl = document.querySelector('#modifiers');

const weaponContainer = document.querySelector('#weaponContainer');
const extraWeaponContainer = document.querySelector('#weaponContainerExtra');

const inputWeaponName = document.querySelector('#weaponName');
const inputAttackerCount = document.querySelector('#attackerCount')
const inputAttacks = document.querySelector('#attacks')
const inputWbs = document.querySelector('#wbs')
const inputStrength = document.querySelector('#strength')
const inputAp = document.querySelector('#ap')
const inputDamage = document.querySelector('#damage')

const inputDefenderCount = document.querySelector('#defenderCount')
const inputToughness = document.querySelector('#toughness')
const inputSave = document.querySelector('#save')
const inputInvul = document.querySelector('#invul')
const inputWounds = document.querySelector('#wounds')
const inputFnp = document.querySelector('#fnp')

const attackerFactionSelectEl = document.querySelector('#attackers_faction_select')
const defenderFactionSelectEl = document.querySelector('#defenders_faction_select')
const attackerUnitSelectEl = document.querySelector('#attackers_select')
const defenderUnitSelectEl = document.querySelector('#defenders_select')
const attackerWeaponSelectEl = document.querySelector('#attackers_weapon_select')

// const defenderTags = document.querySelector('#defenderTags')

const informationContainer = document.querySelector('#informationContainer');

const htmlUpArrow = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.9313 14.9999H16.0686C16.6744 14.9999 16.9773 14.9999 17.1175 14.8801C17.2393 14.7762 17.3038 14.6203 17.2913 14.4607C17.2768 14.2768 17.0626 14.0626 16.6342 13.6342L12.5656 9.56561C12.3676 9.3676 12.2686 9.2686 12.1544 9.2315C12.054 9.19887 11.9458 9.19887 11.8454 9.2315C11.7313 9.2686 11.6323 9.3676 11.4342 9.56561L7.36561 13.6342C6.93724 14.0626 6.72305 14.2768 6.70858 14.4607C6.69602 14.6203 6.76061 14.7762 6.88231 14.8801C7.02257 14.9999 7.32548 14.9999 7.9313 14.9999Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
const htmlDownArrow = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.0686 9H7.9313C7.32548 9 7.02257 9 6.88231 9.1198C6.76061 9.22374 6.69602 9.37967 6.70858 9.53923C6.72305 9.72312 6.93724 9.93731 7.36561 10.3657L11.4342 14.4343C11.6322 14.6323 11.7313 14.7313 11.8454 14.7684C11.9458 14.8011 12.054 14.8011 12.1544 14.7684C12.2686 14.7313 12.3676 14.6323 12.5656 14.4343L16.6342 10.3657C17.0626 9.93731 17.2768 9.72312 17.2913 9.53923C17.3038 9.37967 17.2392 9.22374 17.1175 9.1198C16.9773 9 16.6744 9 16.0686 9Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';

//modifier elements
let halfRangeContainer = document.getElementById("halfRange");
let halfRangeInput = document.getElementById("halfRangeInput");
let chargedContainer = document.getElementById("charged");
let chargeInput = document.getElementById("chargedInput");
let losContainer = document.getElementById("los");
let losInput = document.getElementById("losInput");
let movedContainer = document.getElementById("moved");
let movedInput = document.getElementById("movedInput");

let mechanicusAttackerProtectorEl = document.getElementById("mechanicusArmyRuleAttackerProtector");

let rapidFireEl = document.getElementById("rapidFire");
let meltaEl = document.getElementById("melta");
let lanceEl = document.getElementById("lance");
let indirectFireEl = document.getElementById("indirectFire");
let heavyEl = document.getElementById("heavy");

let selectedAttackerFaction = '';
let selectedDefenderFaction = '';

let selectedAttackerUnit = false;
let selectedDefenderUnit = false;

let selectedAttackerWeapon = '';

let selectedAttackerWeaponDetails = {};

let weaponMeleeRanged = 'ranged';

let informationHTML = '';

let scenarioContainerExpanded = false;
let stratagemContainerExpanded = false;
let enhancementContainerExpanded = false;
let factionModifiersContainerExpanded = false;
let modifierContainerExpanded = false;

//some dudes dice code so we can roll dice!
function rollDice(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  const rollDice6 = () => rollDice(1, 6);
  const rollDice3 = () => rollDice(1, 3);

function rollDiceArray(arr) {
    arr.forEach((dice, index) => { 
        arr[index] = rollDice6(); 
    });
}

//function to calculate roll needed for S vs T
function woundRollVal(strength, toughness){
    // console.log('strength: ',strength);
    // console.log('toughness: ',toughness);
    if(strength >= (toughness*2)){
        // console.log(`Wound roll needed: 2`);
        return 2;
    }else if(strength > toughness){
        // console.log(`Wound roll needed: 3`);
        return 3;
    }else if(strength == toughness){
        // console.log(`Wound roll needed: 4`);
        return 4;
    }else if(strength <= (toughness/2)){
        // console.log(`Wound roll needed: 6`);
        return 6;
    }else{
        // console.log(`Wound roll needed: 5`);
        return 5;
    }
}

//function that reads a string '2d6+4' and actually maths it all out and gives us a nice number
function calcDiceRollsInString(string) {
        let tempArr = [];

        let str = string.toLowerCase();
        let strSplitPlus = str.split('+');
        let additionalDamage = parseInt(strSplitPlus[1]);
        let strSplitD = strSplitPlus[0].split('d');
        let noOfDice = strSplitD[0];
        if(noOfDice === ''){
            noOfDice = 1
        }else{
            noOfDice = parseInt(noOfDice);
        }
        let diceType = parseInt(strSplitD[1]);

        // console.log(`noOfDice: ${noOfDice}`);
        // console.log(`diceType: ${diceType}`);
        // console.log(`additionalDamage: ${additionalDamage}`);

        // console.log(`rolling ${noOfDice} d${diceType} and adding ${additionalDamage}`);

        let tempTotal = 0;

        for(let a=0,b=noOfDice;a<b;a++){
            tempTotal += rollDice(1, diceType);
        }
        
        if(string.includes('+')){
            tempTotal += additionalDamage;
        }

        return tempTotal;
}

//function to add attacks to the attacks string (and account for dice rolling)
function addToString(rollDice, string, numberToAdd){
    // console.log(`rollDice: ${rollDice}`);
    // console.log(`string: ${string}`);
    // console.log(`numberToAdd: ${numberToAdd}`);
    if(rollDice){
        let splitAttackString = string.split('+');
        if(splitAttackString.length == 2){
            splitAttackString[1] = parseInt(splitAttackString[1]) + numberToAdd;
            string = splitAttackString.join('+');
        }else{
            string = splitAttackString[0] + '+' + numberToAdd;
        }
    }else{
        string += numberToAdd;
        if(string < 1){
            string = 1;
        }
    }
    // console.log(`string: ${string}`);
    return string;
}

//function that actually does all the bits
function simulateAttackSequence() {

    // console.log(selectedDefenderUnit)

    if(!selectedAttackerUnit || !selectedDefenderUnit){
        alert('HERESY! you need to pick the units to simulate')
        return;
    }

    let simulations = parseInt(document.querySelector('#simulations').value);

    let weaponSelectEls = document.querySelectorAll('.weapon_select:checked');

    if(weaponSelectEls.length == 0){
        alert('HERESY! You didnt select any weapons to be included in the attack')
        return;
    }

    let attackerKeywords = document.querySelector(`#attackerTags`).value.split(', ');

    //defender variables, can all be grabbed now.

    //number of defenders
    let defenderCount = parseInt(document.querySelector(`#defenderCount-${selectedDefenderUnit}`).value);
    //wounds
    let wounds = parseInt(document.querySelector(`#wounds-${selectedDefenderUnit}`).value);
    let remainingDefenderWounds = wounds;
    let deadDefenders = 0;
    let toughness = parseInt(document.querySelector(`#toughness-${selectedDefenderUnit}`).value);


    let defenderKeywords = document.querySelector(`#defenderTags-${selectedDefenderUnit}`).value;
    let cover = document.getElementById("cover").checked;
    let stealth = document.getElementById("stealth").checked;

    //attacker variables that are universal
    //attacker modifiers
    let rerollSingleHit = document.getElementById("reroll1HitRoll").checked;
    let reroll1Hits = document.getElementById("reroll1Hits").checked;
    let rerollAllHits = document.getElementById("rerollAllHits").checked;
    let rerollSingleWound = document.getElementById("reroll1WoundRoll").checked;
    let reroll1Wounds = document.getElementById("reroll1Wounds").checked;
    let rerollAllWounds = document.getElementById("rerollAllWounds").checked;
    let rerollSingleSave = document.getElementById("reroll1Save").checked;
    let reroll1Saves = document.getElementById("reroll1Saves").checked;
    let rerollAllSaves = document.getElementById("rerollAllSaves").checked;
    let oneRerollAttackChain = false;
    let halveDamage = false;

    let hazardous = false;
    let hitModifierArr = [];
    let hitModifier = 0;
    let woundModifierArr = [];
    let woundModifier = 0;
    let saveModifierArr = [];
    let saveModifier = 0;

    let defenderKeywordsArray = defenderKeywords.split(', ');

    let charged = chargeInput.checked;

    //faction modifiers

    //General

    let attackerBattleshocked = document.getElementById("generalAttackerBattleshocked").checked;
    let attackerBelowStartingStrength = document.getElementById("generalAttackerBelowStartingStrength").checked;
    let attackerBelowHalfStrength = document.getElementById("generalAttackerBelowHalfStrength").checked;
    let defenderBattleshocked = document.getElementById("generalDefenderBattleshocked").checked;
    let defenderBelowStartingStrength = document.getElementById("generalDefenderBelowStartingStrength").checked;
    let defenderBelowHalfStrength = document.getElementById("generalDefenderBelowHalfStrength").checked;

    let hazardousWeaponCount = 0;

    if(attackerBelowHalfStrength){
        attackerBelowStartingStrength = true;
    }

    if(defenderBelowHalfStrength){
        defenderBelowStartingStrength = true;
    }

    let sororitasBoM = document.getElementById("adeptaSororitasDetachmentBoM").checked;
    let sororitasBlade = document.getElementById("adeptaSororitasEnhancementBlade").checked;
    let sororitasMantle = document.getElementById("adeptaSororitasEnhancementMantle").checked;
    let sororitasStratagemLightAttacker = document.getElementById("sororitasStratagemLightAttacker").checked;
    let sororitasStratagemRage = document.getElementById("sororitasStratagemRage").checked;
    let sororitasStratagemLightDefender = document.getElementById("sororitasStratagemLightDefender").checked;
    let custodesDacatari = document.getElementById("custodesArmyRuleDacatari").checked;
    let custodesRendax = document.getElementById("custodesArmyRuleRendax").checked;
    let custodesKaptaris = document.getElementById("custodesArmyRuleKaptaris").checked;
    let custodesAegis = document.getElementById("custodesDetachmentRuleAegis").checked;
    let custodesStratagemNightmares = document.getElementById("custodesStratagemNightmares").checked;
    let custodesStratagemFallen = document.getElementById("custodesStratagemFallen").checked;
    let custodesStratagemAlchemy = document.getElementById("custodesStratagemAlchemy").checked;
    let custodesBlade = document.getElementById("custodesEnhancementBlade").checked;
    let mechanicusAttackerProtector = mechanicusAttackerProtectorEl.checked;
    let mechanicusConqueror = document.getElementById("mechanicusArmyRuleConqueror").checked;
    let mechanicusDefenderProtector = document.getElementById("mechanicusArmyRuleDefenderProtector").checked;
    let mechanicusStratagemDosage = document.getElementById("mechanicusStratagemDosage").checked;
    let mechanicusStratagemHalo = document.getElementById("mechanicusStratagemHalo").checked;
    let mechanicusStratagemBulwark = document.getElementById("mechanicusStratagemBulwark").checked;
    let mechanicusOmni = document.getElementById("adeptusMechanicusEnhancementOmni").checked;
    let aeldariUnparalleledForesight = document.getElementById("aeldariDetachmentUF").checked;
    let aeldariStratagemBladestorm = document.getElementById("aeldariStratagemBladestorm").checked;
    let aeldariStratagemReactions = document.getElementById("aeldariStratagemReactions").checked;
    let aeldariAttackerMessenger = document.getElementById("aeldariEnhancementAttackerMessenger").checked;
    let aeldariDefenderMessenger = document.getElementById("aeldariEnhancementDefenderMessenger").checked;
    let militarumBayonets = document.getElementById("astraMilitarumArmyRuleAttackerBayonets").checked;
    let militarumAim = document.getElementById("astraMilitarumArmyRuleAttackerAim").checked;
    let militarumFire = document.getElementById("astraMilitarumArmyRuleAttackerFire").checked;
    let militarumBornSoldiers = document.getElementById("astraMilitarumDetachmentBornSoldiers").checked;
    let militarumCover = document.getElementById("astraMilitarumArmyRuleAttackerCover").checked;
    let militarumStratagemFields = document.getElementById("astraMilitarumStratagemFields").checked;
    let militarumStratagemBombadiers = document.getElementById("astraMilitarumStratagemBombadiers").checked;
    let militarumStratagemArmoured = document.getElementById("astraMilitarumStratagemArmoured").checked;
    let templarsUnclean = document.getElementById("blackTemplarsDetachmentTemplarVowsUnclean").checked;
    let templarsHonour = document.getElementById("blackTemplarsDetachmentTemplarVowsHonour").checked;
    let templarsWitchAttacker = document.getElementById("blackTemplarsDetachmentTemplarVowsWitchAttacker").checked;
    let templarsWitchDefender = document.getElementById("blackTemplarsDetachmentTemplarVowsWitchDefender").checked;
    let templarsChallenge = document.getElementById("blackTemplarsDetachmentTemplarVowsUncleanChallenge").checked;
    let templarsPerdition = document.getElementById("blackTemplarsEnhancementPerdition").checked;
    let templarsWitchseeker = document.getElementById("blackTemplarsEnhancementWitchseeker").checked;
    let templarsSigismund = document.getElementById("blackTemplarsEnhancementSigismund").checked;
    let templarsTanhauser = document.getElementById("blackTemplarsEnhancementTanhauser").checked;
    let bloodAngelsThirst = document.getElementById("bloodAngelsDetachmentThirst").checked;
    let bloodAngelsArtisanAttacker = document.getElementById("bloodAngelsEnhancementAttackerArtisan").checked;
    let bloodAngelsShard = document.getElementById("bloodAngelsEnhancementAttackerShard").checked;
    let bloodAngelsArtisanDefender = document.getElementById("bloodAngelsEnhancementDefenderArtisan").checked;
    let chaosDaemonsShadowAttacker = document.getElementById("chaosDaemonsArmyRuleAttackerShadow").checked;
    let chaosDaemonsShadowDefender = document.getElementById("chaosDaemonsArmyRuleDefenderShadow").checked;
    let chaosDaemonsArgath = document.getElementById("chaosDaemonsEnhancementArgath").checked;
    let chaosDaemonsEverstave = document.getElementById("chaosDaemonsEnhancementEverstave").checked;
    let chaosDaemonsGift = document.getElementById("chaosDaemonsEnhancementGift").checked;
    let chaosKnightsAttackerDoom = document.getElementById("chaosKnightsArmyRuleAttackerDoom").checked;
    let chaosKnightsDefenderDoom = document.getElementById("chaosKnightsArmyRuleDefenderDoom").checked;
    let chaosKnightsPanoply = document.getElementById("chaosKnightsEnhancementPanoply").checked;
    let CSMDarkPactLethal = document.getElementById("CSMArmyRuleDarkPactLethal").checked;
    let CSMDarkPactSustained = document.getElementById("CSMArmyRuleDarkPactSustained").checked;
    let CSMMarkKhorne = document.getElementById("CSMDetachmentMarkKhorne").checked;
    let CSMMarkTzeentch = document.getElementById("CSMDetachmentMarkTzeentch").checked;
    let CSMMarkNurgle = document.getElementById("CSMDetachmentMarkNurgle").checked;
    let CSMMarkSlaanesh = document.getElementById("CSMDetachmentMarkSlaanesh").checked;
    let CSMMarkUndivided = document.getElementById("CSMDetachmentMarkUndivided").checked;
    let CSMTalisman = document.getElementById("CSMEnhancementTalisman").checked;
    let CSMLiber = document.getElementById("CSMEnhancementLiber").checked;
    let CSMElixir = document.getElementById("CSMEnhancementElixir").checked;
    let addCSMTalismanAttacks = false;
    let darkAngelsStubborn = document.getElementById("darkAngelsEnhancementStubborn").checked;
    let darkAngelsBlade = document.getElementById("darkAngelsEnhancementBlade").checked;
    let darkAngelsRememberance = document.getElementById("darkAngelsEnhancementRememberance").checked;
    let deathGuardGift = document.getElementById("deathGuardArmyRuleGift").checked;
    let deathGuardPathogen = document.getElementById("deathGuardEnhancementPathogen").checked;
    let deathGuardPathogenInRange = document.getElementById("deathGuardEnhancementPathogenInRange").checked;
    let deathwatchFuror = document.getElementById("deathwatchDetachmentFuror").checked;
    let deathwatchMalleus = document.getElementById("deathwatchDetachmentMalleus").checked;
    let deathwatchSecrets = document.getElementById("deathwatchEnhancementSecrets").checked;
    let deathwatchSecretsKill = document.getElementById("deathwatchEnhancementSecretsKill").checked;
    let drukhariPower = document.getElementById("drukhariArmyRulePower").checked;
    let drukhariDancer = document.getElementById("drukhariEnhancementDancer").checked;
    let gscBelow = document.getElementById("GSCDetachmentBelow").checked;
    let greyKnightsDaemonica = document.getElementById("greyKnightsEnhancementDaemonica").checked;
    // let impKnightsAttackerHonored = document.getElementById("imperialKnightsArmyRuleAttackerHonored").checked;
    let impKnightsLayLow = document.getElementById("imperialKnightsArmyRuleLayLow").checked;
    let impKnightsDefenderHonored = document.getElementById("imperialKnightsArmyRuleDefenderHonored").checked;
    let impKnightsIndomitable = document.getElementById("imperialKnightsDetachmentIndomitable").checked;
    let impKnightsParagon = document.getElementById("imperialKnightsEnhancementParagon").checked;
    let leagueAncestorsOne = document.getElementById("leagueArmyRuleAncestorsOne").checked;
    let leagueAncestorsTwo = document.getElementById("leagueArmyRuleAncestorsTwo").checked;
    let necronsCommand = document.getElementById("necronsDetachmentCommand").checked;
    let necronsReanimation = document.getElementById("necronsArmyRuleReanimation").checked;
    let reanimationRoll = 0;
    let reanimationModelsReanimated = [];
    let reanimationWoundsHealed = [];
    let necronsAblator = document.getElementById("necronsEnhancementAblator").checked;
    let necronsAblatorFar = document.getElementById("necronsEnhancementAblatorFar").checked;
    let necronsWeave = document.getElementById("necronsEnhancementWeave").checked;
    let orksWaaaghAttacker = document.getElementById("orksArmyRuleAttacker").checked;
    let orksWaaaghDefender = document.getElementById("orksArmyRuleDefender").checked;
    let orksGetStuckIn = document.getElementById("orksDetachmentGetStuckIn").checked;
    let orksMekaniak = document.getElementById("orksUnitMekaniak").checked;
    let orkStratagemCarnage = document.getElementById("orkStratagemCarnage").checked;
    let orkStratagemArd = document.getElementById("orkStratagemArd").checked;
    let orksKillChoppa = document.getElementById("orksEnhancementKillchoppa").checked;
    let orksCybork = document.getElementById("orksEnhancementCybork").checked;
    let adeptusAstartesOath = document.getElementById("adeptusAstartesArmyRuleAttacker").checked;
    let adeptusAstartesHonour = document.getElementById("adeptusAstartesEnhancementHonour").checked;
    let adeptusAstartesHonourAssault = document.getElementById("adeptusAstartesEnhancementHonourAssault").checked;
    let adeptusAstartesBolter = document.getElementById("adeptusAstartesEnhancementBolter").checked;
    let adeptusAstartesBolterDevastator = document.getElementById("adeptusAstartesEnhancementBolterDevastator").checked;
    let adeptusAstartesArtificer = document.getElementById("adeptusAstartesEnhancementArtificer").checked;
    let spaceWolvesSagaWarrior = document.getElementById("spaceWolvesDetachmentSagaWarrior").checked;
    let spaceWolvesSagaSlayer = document.getElementById("spaceWolvesDetachmentSagaBeastslayer").checked;
    let spaceWolvesSagaBear = document.getElementById("spaceWolvesDetachmentSagaBear").checked;
    let spaceWolvesBlack = document.getElementById("spaceWolvesEnhancementBlack").checked;
    let spaceWolvesFrost = document.getElementById("spaceWolvesEnhancementFrost").checked;
    let spaceWolvesTalisman = document.getElementById("spaceWolvesEnhancementTalisman").checked;
    let tauGuided = document.getElementById("tauArmyRuleAttacker").checked;
    let tauObserverMarkerlight = document.getElementById("tauArmyRuleAttackerMarkerlight").checked;
    let tauKauyon = document.getElementById("tauDetachmentKauyon").checked;
    let tauPatient = document.getElementById("tauEmpireEnhancementPatient").checked;
    let thousandSonsWeaver = document.getElementById("thousandSonsArmyRuleCabalWeaver").checked;
    let thousandSonsTwist = document.getElementById("thousandSonsArmyRuleCabalTwist").checked;
    let thousandSonsMalevolent = document.getElementById("thousandSonsDetachmentMalevolent").checked;
    let thousandSonsMaelstrom = document.getElementById("thousandSonsDetachmentMaelstrom").checked;
    let thousandSonsImmaterium = document.getElementById("thousandSonsDetachmentImmaterium").checked;
    let thousandSonsVortex = document.getElementById("thousandSonsEnhancementVortex").checked;
    let tyranidSwarming = document.getElementById("tyranidDetachmentSwarming").checked;
    let tyranidAggression = document.getElementById("tyranidDetachmentAggression").checked;
    let tyranidAdaptedAttacker = document.getElementById("tyranidsEnhancementAdaptedAttacker").checked;
    let tyranidAdaptedDefender = document.getElementById("tyranidsEnhancementAdaptedDefender").checked;
    let tyranidAdaptive = document.getElementById("tyranidsEnhancementAdaptive").checked;
    let tyranidAdaptiveWounded = document.getElementById("tyranidsEnhancementAdaptiveWounded").checked;
    let worldEatersMartial = document.getElementById("worldEatersArmyRuleMartial").checked;
    let worldEatersBlades = document.getElementById("worldEatersArmyRuleBlades").checked;
    let worldEatersDevotion = document.getElementById("worldEatersArmyRuleDevotion").checked;
    let worldEatersRelentless = document.getElementById("worldEatersDetachmentRelentless").checked;
    let worldEatersGlaive = document.getElementById("worldEatersEnhancementGlaive").checked;
    let worldEatersHelm = document.getElementById("worldEatersEnhancementHelm").checked;
    let worldEatersGlaiveCharged = false;
    let stratagemTankShock = document.getElementById("genericStratagemTankShock").checked;
    let stratagemGrenade = document.getElementById("genericStratagemGrenade").checked;
    let stratagemGround = document.getElementById("genericStratagemGround").checked;
    let stratagemSmoke = document.getElementById("genericStratagemSmoke").checked;
    let halfRange = halfRangeInput.checked;
    let rollRapidFire = false;
    let los = losInput.checked;
    let moved = !movedInput.checked;
    let generalFnp = parseInt(document.querySelector(`#fnp-${selectedDefenderUnit}`).value);

    let overAllResults = {
        combinedWounds:[],
        combinedKills:[],
        combinedWipes:[]
    }

    let hazardousResults = [];

    let weaponOverallResultsObj = {};
    let weaponOverallDeadDefenderResultsObj = {};
    let weaponOverallDefenderWipedObj = {};
    let tankShockArr = [];
    let grenadeArr = [];

    let weaponStats = {};

    let tankShockDiceToRoll = 0;

    //tank shock
    //select the strongest melee weapon on the vehicle
    if(stratagemTankShock){
        tankShockDiceToRoll = 0;
        weaponSelectEls.forEach( weaponEl => {
            weaponMeleeRanged = weaponEl.getAttribute('data-weapon-type');
            if(weaponMeleeRanged == 'melee'){
                let chosenWeaponFaction = weaponEl.getAttribute('data-faction');
                let chosenWeaponUnit = weaponEl.getAttribute('data-unit');
                let chosenWeaponName = weaponEl.getAttribute('data-weapon');

                let weaponStrength = parseInt(data[chosenWeaponFaction].units[chosenWeaponUnit].weapons.melee[chosenWeaponName].s);

                if(weaponStrength > tankShockDiceToRoll){
                    tankShockDiceToRoll = weaponStrength;
                }
            }
        })

        if(tankShockDiceToRoll == 0){
            stratagemTankShock = false;
        }

        if(tankShockDiceToRoll > (toughness-1) && deathGuardGift){
            tankShockDiceToRoll += 2;
        }else if(tankShockDiceToRoll > toughness){
            tankShockDiceToRoll += 2;
        }

    }

    weaponSelectEls.forEach( weaponEl => {

        //weapon${weapon}-ranged-main

        let chosenWeaponFaction = weaponEl.getAttribute('data-faction');
        let chosenWeaponUnit = weaponEl.getAttribute('data-unit');
        let chosenWeaponName = weaponEl.getAttribute('data-weapon');
        let chosenWeaponNameDif = chosenWeaponName + '-' + weaponEl.getAttribute('data-weapon-extra');
        weaponMeleeRanged = weaponEl.getAttribute('data-weapon-type');

        let chosenWeaponParentElement = document.querySelector(`#weapon${chosenWeaponName}-${weaponMeleeRanged}-${weaponEl.getAttribute('data-weapon-extra')}`);

        let ignoreAttackerRollModifiers = false;
        let ignoreDefenderRollModifiers = false;

        hitModifierArr = [];
        hitModifier = 0;
        woundModifierArr = [];
        woundModifier = 0;
        saveModifierArr = [];
        saveModifier = 0;

        weaponStats[chosenWeaponNameDif] = {
            name: data[chosenWeaponFaction].units[chosenWeaponUnit].weapons[weaponMeleeRanged][chosenWeaponName].name,
            unitName: data[chosenWeaponFaction].units[chosenWeaponUnit].name,
            charactersWeapon: (weaponEl.getAttribute('data-weapon-extra') == 'main'),
            weaponMeleeRanged: weaponMeleeRanged,
            assault: false,
            rapidFire: false,
            rapidFireCount: '',
            ignoresCover: false,
            twinLinked: false,
            torrent: false,
            lethalHits: false,
            lance: false,
            indirectFire: false,
            precision: false,
            psychic: false,
            blast: false,
            melta: false,
            meltaCount: '',
            heavy: false,
            hazardous: false,
            devastatingWounds: false,
            sustainedHits: false,
            sustainedHitsCount: '',
            extraAttacks: false,
            anti: false,
            antiType: '',
            antiValue: '',
            toughness: parseInt(document.querySelector(`#toughness-${selectedDefenderUnit}`).value),
            save: parseInt(document.querySelector(`#save-${selectedDefenderUnit}`).value),
            invul: parseInt(document.querySelector(`#invul-${selectedDefenderUnit}`).value),
            fnp: parseInt(document.querySelector(`#fnp-${selectedDefenderUnit}`).value),
            criticalHit: parseInt(document.querySelector('#criticalHit').value),
            criticalWound: parseInt(document.querySelector('#criticalWound').value),
            criticalWoundAp: 0,
            worldEatersGlaiveCharged: false
        };

        // console.log('WeaponStats Prelim:');
        // console.log(JSON.parse(JSON.stringify(weaponStats[chosenWeaponNameDif])))

        // console.log(`initial save: ${weaponStats[chosenWeaponNameDif].save}`);

        //toughness
        
        if(isNaN(weaponStats[chosenWeaponNameDif].criticalHit)){
            weaponStats[chosenWeaponNameDif].criticalHit = 6;
        }
        
        if(isNaN(weaponStats[chosenWeaponNameDif].criticalWound)){
            weaponStats[chosenWeaponNameDif].criticalWound = 6;
        }

        let weaponTags = chosenWeaponParentElement.querySelector(`#weaponTags${chosenWeaponName}-${weaponMeleeRanged}`).value.split(', ');

        weaponOverallResultsObj[chosenWeaponNameDif] = [];
        weaponOverallDeadDefenderResultsObj[chosenWeaponNameDif] = [];
        weaponOverallDefenderWipedObj[chosenWeaponNameDif] = [];

        // console.log(`chosenWeaponFaction: ${chosenWeaponFaction}`)
        // console.log(`chosenWeaponUnit: ${chosenWeaponUnit}`)
        // console.log(`chosenWeaponType: ${chosenWeaponType}`)
        // console.log(`chosenWeaponName: ${chosenWeaponName}-${weaponMeleeRanged}`)

        // console.log(weaponTags);
        // console.log(weaponTags.includes('rapidFire'));

        weaponTags.forEach( tag => {
            switch(tag.split('-')[0]){
                case 'assault':
                    weaponStats[chosenWeaponNameDif].assault = true;
                    break;
                case 'rapidFire':
                    weaponStats[chosenWeaponNameDif].rapidFire = true;
                    weaponStats[chosenWeaponNameDif].rapidFireCount = tag.split('-')[1];
                    break;
                case 'ignoresCover':
                    weaponStats[chosenWeaponNameDif].ignoresCover = true;
                    break;
                case 'twinLinked':
                    weaponStats[chosenWeaponNameDif].twinLinked = true;
                    break;
                case 'torrent':
                    weaponStats[chosenWeaponNameDif].torrent = true;
                    break;
                case 'lethalHits':
                    weaponStats[chosenWeaponNameDif].lethalHits = true;
                    break;
                case 'lance':
                    weaponStats[chosenWeaponNameDif].lance = true;
                    break;
                case 'indirectFire':
                    weaponStats[chosenWeaponNameDif].indirectFire = true;
                    break;
                case 'precision':
                    weaponStats[chosenWeaponNameDif].precision = true;
                    break;
                case 'psychic':
                    weaponStats[chosenWeaponNameDif].psychic = true;
                    break;
                case 'blast':
                    weaponStats[chosenWeaponNameDif].blast = true;
                    break;
                case 'melta':
                    weaponStats[chosenWeaponNameDif].melta = true;
                    weaponStats[chosenWeaponNameDif].meltaCount = tag.split('-')[1];
                    break;
                case 'heavy':
                    weaponStats[chosenWeaponNameDif].heavy = true;
                    break;
                case 'hazardous':
                    weaponStats[chosenWeaponNameDif].hazardous = true;
                    hazardous = true;
                    break;
                case 'devastatingWounds':
                    weaponStats[chosenWeaponNameDif].devastatingWounds = true;
                    break;
                case 'sustainedHits':
                    weaponStats[chosenWeaponNameDif].sustainedHits = true;
                    weaponStats[chosenWeaponNameDif].sustainedHitsCount = tag.split('-')[1];
                    break;
                case 'extraAttacks':
                    weaponStats[chosenWeaponNameDif].extraAttacks = true;
                    break;
                case 'anti':
                    if(!weaponStats[chosenWeaponNameDif].anti){
                        weaponStats[chosenWeaponNameDif].anti = true;
                        weaponStats[chosenWeaponNameDif].antiType += tag.split('-')[1];
                        weaponStats[chosenWeaponNameDif].antiValue += tag.split('-')[2];
                    }else{
                        weaponStats[chosenWeaponNameDif].antiType += (', ' + tag.split('-')[1]);
                        weaponStats[chosenWeaponNameDif].antiValue += (', ' + tag.split('-')[2]);
                    }
                    break;
            }
        })

        //number of attackers
        weaponStats[chosenWeaponNameDif].attackerCount = parseInt(chosenWeaponParentElement.querySelector(`#attackerCount${chosenWeaponName}-${weaponMeleeRanged}`).value);

        //figure out how many hazardous rolls to make
        if(weaponStats[chosenWeaponNameDif].hazardous){
            hazardousWeaponCount += weaponStats[chosenWeaponNameDif].attackerCount;
        }

        //attacks
        weaponStats[chosenWeaponNameDif].attackString = chosenWeaponParentElement.querySelector(`#attacks${chosenWeaponName}-${weaponMeleeRanged}`).value;
        weaponStats[chosenWeaponNameDif].rollAttacks = false;
        if(weaponStats[chosenWeaponNameDif].attackString.includes("d") || weaponStats[chosenWeaponNameDif].attackString.includes("D")){
            weaponStats[chosenWeaponNameDif].rollAttacks = true;
        }else{
            weaponStats[chosenWeaponNameDif].attackString = parseInt(weaponStats[chosenWeaponNameDif].attackString);
            weaponStats[chosenWeaponNameDif].rollAttacks = false;    
        }

        //weapon/balistic skill
        weaponStats[chosenWeaponNameDif].hit = parseInt(chosenWeaponParentElement.querySelector(`#wbs${chosenWeaponName}-${weaponMeleeRanged}`).value);

        //strength
        weaponStats[chosenWeaponNameDif].strength = parseInt(chosenWeaponParentElement.querySelector(`#strength${chosenWeaponName}-${weaponMeleeRanged}`).value);

        //armour piercing
        weaponStats[chosenWeaponNameDif].ap = parseInt(chosenWeaponParentElement.querySelector(`#ap${chosenWeaponName}-${weaponMeleeRanged}`).value);
        if(weaponStats[chosenWeaponNameDif].ap < 0){
            weaponStats[chosenWeaponNameDif].ap = weaponStats[chosenWeaponNameDif].ap*-1;
        }
        // console.log(`ap: ${ap}`) 

        //damage
        weaponStats[chosenWeaponNameDif].damageString =  chosenWeaponParentElement.querySelector(`#damage${chosenWeaponName}-${weaponMeleeRanged}`).value;
        weaponStats[chosenWeaponNameDif].rollDamage = false;
        if(weaponStats[chosenWeaponNameDif].damageString.includes("d") || weaponStats[chosenWeaponNameDif].damageString.includes("D")){
            weaponStats[chosenWeaponNameDif].rollDamage = true;
        }else{
            weaponStats[chosenWeaponNameDif].damageString = parseInt(weaponStats[chosenWeaponNameDif].damageString);
            weaponStats[chosenWeaponNameDif].rollDamage = false;    
        }

        //Adepta Sororitas

        // console.log(`sororitasBoM: ${sororitasBoM}`)
        // console.log(`sororitasBlade: ${sororitasBlade}`)
        // console.log(`sororitasMantle: ${sororitasMantle}`)
        // console.log(`attackerBelowHalfStrength: ${attackerBelowHalfStrength}`)
        // console.log(`attackerBelowStartingStrength: ${attackerBelowStartingStrength}`)

        if(sororitasBoM && attackerBelowHalfStrength){
            hitModifierArr.push(1);
            woundModifierArr.push(1);
        }else if(sororitasBoM && attackerBelowStartingStrength){
            hitModifierArr.push(1);
        }

        if(sororitasStratagemLightAttacker && attackerBelowStartingStrength){
            ignoreAttackerRollModifiers = true;
        }
        if(sororitasStratagemRage && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            woundModifierArr.push(1);
        }
        if(sororitasStratagemLightDefender && defenderBelowStartingStrength){
            ignoreDefenderRollModifiers = true;
        }

        if(sororitasBlade && attackerBelowStartingStrength && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 2);
            }
            weaponStats[chosenWeaponNameDif].strength += 1;
        }else if(sororitasBlade && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            weaponStats[chosenWeaponNameDif].strength += 1;
        }

        //Adeptus Custodes


        if(custodesDacatari && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee' && !weaponStats[chosenWeaponNameDif].sustainedHits){
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
        }

        if(custodesRendax && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].lethalHits = true;
        }

        if(custodesKaptaris && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            hitModifierArr.push(-1);
        }


        if(custodesStratagemNightmares && ( defenderKeywordsArray.includes('Vehicle') || defenderKeywordsArray.includes('Monster') && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee' )){
            woundModifierArr.push(1);
        }  
        if(custodesStratagemFallen){
            if(attackerBelowHalfStrength){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 2);
            }else if(attackerBelowStartingStrength){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
        }
        if(custodesStratagemAlchemy && defenderKeywordsArray.includes('Infantry') && !defenderKeywordsArray.includes('Anathema Psykana')){
            weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, -1);
        }


        if(custodesBlade && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 2);
            }
        }

        //Adeptus Mechanicus
        
        if(mechanicusAttackerProtector && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            weaponStats[chosenWeaponNameDif].heavy = true;
        }

        if(mechanicusConqueror && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            weaponStats[chosenWeaponNameDif].assault = true;
            weaponStats[chosenWeaponNameDif].ap += 1;
        }

        if(mechanicusDefenderProtector && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            if(weaponStats[chosenWeaponNameDif].ap > 0){
                weaponStats[chosenWeaponNameDif].ap = weaponStats[chosenWeaponNameDif].ap - 1;
            }
        }


        if(mechanicusStratagemDosage && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged' && !defenderKeywordsArray.includes('Vehicle')){
            woundModifierArr.push(1);
        }
        if(mechanicusStratagemHalo && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee' && !attackerKeywords.includes('Vehicle')){
            woundModifierArr.push(-1);
        }
        if(mechanicusStratagemBulwark && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged' && defenderKeywordsArray.includes('Skitarii') && mechanicusDefenderProtector){
            if((weaponStats[chosenWeaponNameDif].invul > 4 || weaponStats[chosenWeaponNameDif].fnp == 0)){
                weaponStats[chosenWeaponNameDif].invul = 4;
            }
        }

        
        if(mechanicusOmni && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 3);
            }
            //add anti infantry 2 and anti monster 4
            weaponStats[chosenWeaponNameDif].anti = true;
            if(weaponStats[chosenWeaponNameDif].antiType == ''){
                weaponStats[chosenWeaponNameDif].antiType += 'Infantry, Monster';
                weaponStats[chosenWeaponNameDif].antiValue += '2, 4'
            }else{
                weaponStats[chosenWeaponNameDif].antiType += ', Infantry, Monster';
                weaponStats[chosenWeaponNameDif].antiValue += ', 2, 4'
            }
        }

        //Aeldari
        
        if(aeldariUnparalleledForesight){
            rerollSingleHit = true;
            rerollSingleWound = true;
        }

        
        if(aeldariStratagemBladestorm && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            weaponStats[chosenWeaponNameDif].criticalWoundAp = 2;
        }
        if(aeldariStratagemReactions && !defenderKeywordsArray.includes('Wraith Construct')){
            hitModifierArr.push(-1);
        }


        if(aeldariAttackerMessenger){
            oneRerollAttackChain = true;
        }

        if(aeldariDefenderMessenger){
            rerollSingleSave = true;
        }

        //Astra Militarum

        if(militarumBayonets && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee' && weaponStats[chosenWeaponNameDif].hit > 2){
            weaponStats[chosenWeaponNameDif].hit = weaponStats[chosenWeaponNameDif].hit - 1;
        }

        if(militarumAim && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged' && weaponStats[chosenWeaponNameDif].hit > 2){
            weaponStats[chosenWeaponNameDif].hit = weaponStats[chosenWeaponNameDif].hit - 1;
        }

        if(militarumFire && weaponStats[chosenWeaponNameDif].rapidFire){
            // console.log(`attack string before First Rank Fire: ${attackString}`);
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            // console.log(`attack string after First Rank Fire: ${attackString}`);
        }

        if(militarumBornSoldiers && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            weaponStats[chosenWeaponNameDif].lethalHits = true;
        }

        if(militarumCover && weaponStats[chosenWeaponNameDif].save > 3){
            weaponStats[chosenWeaponNameDif].save = weaponStats[chosenWeaponNameDif].save - 1;
        }

        if(militarumStratagemFields && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged' && !attackerBattleshocked){
            weaponStats[chosenWeaponNameDif].ap = weaponStats[chosenWeaponNameDif].ap + 1;
        }
        if(militarumStratagemBombadiers && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged' && weaponStats[chosenWeaponNameDif].indirectFire && !attackerBattleshocked){
            hitModifierArr.push(1);
        }
        if(militarumStratagemArmoured && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged' && defenderKeywordsArray.includes('Vehicle')){
            weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, -1);
        }

        //black templars

        if(templarsUnclean && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].lethalHits = true;
        }

        if(templarsHonour && weaponStats[chosenWeaponNameDif].psychic && (weaponStats[chosenWeaponNameDif].fnp > 5 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 5;
            generalFnp = 5;
        }


        if(templarsWitchAttacker && defenderKeywordsArray.includes('Psyker') && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].anti = true;
            if(weaponStats[chosenWeaponNameDif].antiType == ''){
                weaponStats[chosenWeaponNameDif].antiType += 'Psyker';
                weaponStats[chosenWeaponNameDif].antiValue += '4'
            }else{
                weaponStats[chosenWeaponNameDif].antiType += ', Psyker';
                weaponStats[chosenWeaponNameDif].antiValue += ', 4'
            }
        }

        if(templarsWitchDefender && weaponStats[chosenWeaponNameDif].psychic && (weaponStats[chosenWeaponNameDif].invul == 0 || weaponStats[chosenWeaponNameDif].invul > 4)){
            weaponStats[chosenWeaponNameDif].invul = 4;
        }

        if(templarsChallenge && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee' && !weaponStats[chosenWeaponNameDif].sustainedHits){
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
        }


        if(templarsPerdition && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].ap += 1;
            weaponStats[chosenWeaponNameDif].strength += 1;

            if(templarsUnclean && !weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
        }

        if(templarsWitchseeker && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            weaponStats[chosenWeaponNameDif].devastatingWounds = true;
            weaponStats[chosenWeaponNameDif].precision = true;
            weaponStats[chosenWeaponNameDif].anti = true;
            if(weaponStats[chosenWeaponNameDif].antiType == ''){
                weaponStats[chosenWeaponNameDif].antiType += 'Psyker';
                weaponStats[chosenWeaponNameDif].antiValue += '4'
            }else{
                weaponStats[chosenWeaponNameDif].antiType += ', Psyker';
                weaponStats[chosenWeaponNameDif].antiValue += ', 4'
            }

            if(templarsWitchAttacker && defenderKeywordsArray.includes('Psyker')){
                weaponStats[chosenWeaponNameDif].rerollAllHits = true;
                weaponStats[chosenWeaponNameDif].rerollAllWounds = true;
            }
        }

        if(templarsSigismund && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            if(templarsChallenge && weaponStats[chosenWeaponNameDif].criticalHit > 5/* && leadingUnit*/){
                weaponStats[chosenWeaponNameDif].criticalHit = 5;
            }
        }

        if(templarsTanhauser){
            weaponStats[chosenWeaponNameDif].halveDamage = true;
            if(templarsHonour && (weaponStats[chosenWeaponNameDif].fnp > 5 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))/* && leadingUnit*/){
                weaponStats[chosenWeaponNameDif].fnp = 5;
                generalFnp = 5
            }
        }

        
        //Blood Angels

        if(bloodAngelsThirst){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            weaponStats[chosenWeaponNameDif].strength += 1;
        }


        if(bloodAngelsArtisanAttacker){
            weaponStats[chosenWeaponNameDif].ap += 1;
        }

        if(bloodAngelsShard && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].lance = true;
            weaponStats[chosenWeaponNameDif]. anti = true;
            if(weaponStats[chosenWeaponNameDif].antiType == ''){
                weaponStats[chosenWeaponNameDif].antiType += 'Chaos';
                weaponStats[chosenWeaponNameDif].antiValue += '5'
            }else{
                weaponStats[chosenWeaponNameDif].antiType += ', Chaos';
                weaponStats[chosenWeaponNameDif].antiValue += ', 5'
            }
        }

        if(bloodAngelsArtisanDefender){
            weaponStats[chosenWeaponNameDif].save = 2;
        }

        //Chaos Daemons


        if(chaosDaemonsArgath && chaosDaemonsShadowAttacker && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 2);
            }
            weaponStats[chosenWeaponNameDif].strength += 2;
        }else if(chaosDaemonsArgath && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            weaponStats[chosenWeaponNameDif].strength += 1;
        }

        if(chaosDaemonsEverstave && chaosDaemonsShadowAttacker && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            weaponStats[chosenWeaponNameDif].strength += 2;
        }else if(chaosDaemonsEverstave && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            weaponStats[chosenWeaponNameDif].strength += 1;
        }

        if(chaosDaemonsGift && chaosDaemonsShadowDefender && (weaponStats[chosenWeaponNameDif].fnp > 4 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 4;
            generalFnp = 4;
        }else if(chaosDaemonsGift && (weaponStats[chosenWeaponNameDif].fnp > 5 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 5;
            generalFnp = 5;
        }


        //chaos knights

        if(chaosKnightsAttackerDoom && defenderBattleshocked){
            woundModifierArr.push(1);
        }

        if(chaosKnightsDefenderDoom && attackerBattleshocked){
            hitModifierArr.push(-1);
        }


        if(chaosKnightsPanoply){
            if(weaponStats[chosenWeaponNameDif].ap > 0){
                weaponStats[chosenWeaponNameDif].ap = weaponStats[chosenWeaponNameDif].ap - 1;
            }
        }

        //Chaos Space Marines

        if(CSMDarkPactLethal){
            weaponStats[chosenWeaponNameDif].lethalHits = true;
        }

        if(CSMDarkPactSustained && !weaponStats[chosenWeaponNameDif].sustainedHits){
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
        }

        if(CSMDarkPactLethal && CSMMarkKhorne && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee' && weaponStats[chosenWeaponNameDif].criticalHit > 5){
            weaponStats[chosenWeaponNameDif].criticalHit = 5;
        }

        if(CSMDarkPactLethal && CSMMarkTzeentch && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged' && weaponStats[chosenWeaponNameDif].criticalHit > 5){
            weaponStats[chosenWeaponNameDif].criticalHit = 5;
        }

        if(CSMDarkPactSustained && CSMMarkNurgle && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged' && weaponStats[chosenWeaponNameDif].criticalHit > 5){
            weaponStats[chosenWeaponNameDif].criticalHit = 5;
        }

        if(CSMDarkPactSustained && CSMMarkSlaanesh && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee' && weaponStats[chosenWeaponNameDif].criticalHit > 5){
            weaponStats[chosenWeaponNameDif].criticalHit = 5;
        }

        if(CSMMarkUndivided){
            reroll1Hits = true;
        }

        weaponStats[chosenWeaponNameDif].addCSMTalismanAttacks = false;
        if(CSMTalisman && (CSMDarkPactLethal || CSMDarkPactSustained) && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].addCSMTalismanAttacks = true;
            weaponStats[chosenWeaponNameDif].strength += 2;
        }else if(CSMTalisman && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            weaponStats[chosenWeaponNameDif].strength += 1;
        }

        if(CSMLiber && (CSMDarkPactLethal || CSMDarkPactSustained)){
            weaponStats[chosenWeaponNameDif].lethalHits = true;
            if(!weaponStats[chosenWeaponNameDif].sustainedHits){
                weaponStats[chosenWeaponNameDif].sustainedHits = true;
                weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
            }
        }

        if(CSMElixir && (weaponStats[chosenWeaponNameDif].fnp > 5 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 5;
            generalFnp = 5;
        }


        //Dark Angels

        if(darkAngelsStubborn/* && leadingUnit*/){
            if(attackerBelowStartingStrength){
                hitModifierArr.push(1);
            }
            if(attackerBattleshocked){
                woundModifierArr.push(1);
            }

        }

        if(darkAngelsBlade){
            if(attackerBattleshocked){
                if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                    weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 2);
                }
                weaponStats[chosenWeaponNameDif].damageString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].damageString, 2);
                weaponStats[chosenWeaponNameDif].strength += 2;
            }else{
                if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                    weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
                }
                weaponStats[chosenWeaponNameDif].damageString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].damageString, 1);
                weaponStats[chosenWeaponNameDif].strength += 1;
            }
        }

        if(darkAngelsRememberance/* && leadingUnit*/){
            if(attackerBattleshocked && (weaponStats[chosenWeaponNameDif].fnp > 4 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
                weaponStats[chosenWeaponNameDif].fnp = 4;
                generalFnp = 4;
            }else if(weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp)){
                weaponStats[chosenWeaponNameDif].fnp = 6;
                generalFnp = 6;
            }
        }

        
        //Death Guard

        if(deathGuardGift){
            weaponStats[chosenWeaponNameDif].toughness = weaponStats[chosenWeaponNameDif].toughness - 1;
        }


        if(deathGuardPathogenInRange && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 2);
            }
            weaponStats[chosenWeaponNameDif].strength += 2;
        }else if(deathGuardPathogen && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            weaponStats[chosenWeaponNameDif].strength += 1;
        }

        //Death Watch

        if(deathwatchFuror && !weaponStats[chosenWeaponNameDif].sustainedHits){
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
        }
        if(deathwatchMalleus){
            weaponStats[chosenWeaponNameDif].lethalHits = true;
        }


        if(deathwatchSecretsKill && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].strength += 2;
            weaponStats[chosenWeaponNameDif].ap += 2;
            weaponStats[chosenWeaponNameDif].damageString = addToString(weaponStats[chosenWeaponNameDif].rollDamage, weaponStats[chosenWeaponNameDif].damageString, 2);
        }else if(deathwatchSecrets && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].strength += 1;
            weaponStats[chosenWeaponNameDif].ap += 1;
            weaponStats[chosenWeaponNameDif].damageString = addToString(weaponStats[chosenWeaponNameDif].rollDamage, weaponStats[chosenWeaponNameDif].damageString, 1);
        }

        //Drukhari

        if(drukhariPower){
            rerollAllHits = true;
        }


        if(drukhariDancer && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(drukhariPower){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 2);
                weaponStats[chosenWeaponNameDif].ap += 2;
            }else{
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
                weaponStats[chosenWeaponNameDif].ap += 1;
            }
        }

        //Genestealer Cults

        if(gscBelow){
            if(!weaponStats[chosenWeaponNameDif].sustainedHits){
                weaponStats[chosenWeaponNameDif].sustainedHits = true;
                weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
            }
            weaponStats[chosenWeaponNameDif].ignoresCover = true;
        }

        //Grey Knights

        if(greyKnightsDaemonica && defenderKeywordsArray.includes('Daemon') && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].damageString = addToString(weaponStats[chosenWeaponNameDif].rollDamage, weaponStats[chosenWeaponNameDif].damageString, 1);
            woundModifierArr.push(1);
        }else if(greyKnightsDaemonica && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            woundModifierArr.push(1);
        }

        //Imperial Knights

        if(impKnightsLayLow){
            rerollSingleHit = true;
            rerollSingleWound = true;
        }

        if(impKnightsDefenderHonored && impKnightsIndomitable && (weaponStats[chosenWeaponNameDif].fnp > 5 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 5;
            generalFnp = 5;
        }else if(impKnightsIndomitable && (weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 6;
            generalFnp = 6;
        }



        if(impKnightsParagon){
            if(weaponStats[chosenWeaponNameDif].ap > 0){
                weaponStats[chosenWeaponNameDif].ap = weaponStats[chosenWeaponNameDif].ap - 1;
            }
        }

        //League of Votan

        if(leagueAncestorsTwo){
            hitModifierArr.push(1);
            woundModifierArr.push(1);
        }else if(leagueAncestorsOne){
            hitModifierArr.push(1);
        }

        //necrons

        if(necronsCommand){
            hitModifierArr.push(1);
        }
        

        if(necronsAblatorFar/* && leadingUnit*/){
            stealth = true;
            cover = true;
        }else if(necronsAblator){
            stealth = true;
        }

        if(necronsWeave && (weaponStats[chosenWeaponNameDif].fnp > 4 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 4;
            generalFnp = 4;
        }


        //orks

        if(orksWaaaghAttacker && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            weaponStats[chosenWeaponNameDif].strength += 1;
        }

        if(orksWaaaghDefender && (weaponStats[chosenWeaponNameDif].invul == 0 || weaponStats[chosenWeaponNameDif].invul > 5)){
            weaponStats[chosenWeaponNameDif].invul = 5;
        }

        if(orksGetStuckIn && !weaponStats[chosenWeaponNameDif].sustainedHits && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
        }

        if(orksMekaniak && attackerKeywords.includes('Vehicle')){
            hitModifierArr.push(1);
        }

        if(orkStratagemCarnage){
            weaponStats[chosenWeaponNameDif].criticalHit = 5;
        }

        if(orkStratagemArd && (!defenderKeywords.includes('Vehicle') && !defenderKeywords.includes('Gretchin'))){
            woundModifierArr.push(-1);
        }

        // console.log(`orksKillChoppa: ${orksKillChoppa}`)
        // console.log(`charactersWeapon: ${weaponStats[chosenWeaponNameDif].charactersWeapon}`)
        // console.log(`weaponMeleeRanged: ${weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'}`)
        // console.log(`extraAttacks: ${!weaponStats[chosenWeaponNameDif].extraAttacks}`)

        if(orksKillChoppa && weaponStats[chosenWeaponNameDif].charactersWeapon && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee' && !weaponStats[chosenWeaponNameDif].extraAttacks){
            weaponStats[chosenWeaponNameDif].devastatingWounds = true;
        }

        if(orksCybork && (weaponStats[chosenWeaponNameDif].fnp > 4 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 4;
            generalFnp = 4;
        }


        //adeptus astartes


        if(adeptusAstartesOath){
            rerollAllWounds = true;
            rerollAllHits = true;
        }


        if(adeptusAstartesHonourAssault && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 2);
            }
            weaponStats[chosenWeaponNameDif].strength += 2;
        }else if(adeptusAstartesHonour && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            weaponStats[chosenWeaponNameDif].strength += 1;
        }

        if(adeptusAstartesBolterDevastator && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'/* && leadingUnit*/){
            if(!weaponStats[chosenWeaponNameDif].sustainedHits){
                weaponStats[chosenWeaponNameDif].sustainedHits = true;
                weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
            }
            weaponStats[chosenWeaponNameDif].criticalHit = 5;
        }else if(adeptusAstartesBolter && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'/* && leadingUnit*/){
            if(!weaponStats[chosenWeaponNameDif].sustainedHits){
                weaponStats[chosenWeaponNameDif].sustainedHits = true;
                weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
            }
        }

        if(adeptusAstartesArtificer){
            weaponStats[chosenWeaponNameDif].save = 2;
            if((weaponStats[chosenWeaponNameDif].fnp > 5 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
                weaponStats[chosenWeaponNameDif].fnp = 5;
                generalFnp = 5;
            }
        }


        //Space Wolves


        if(spaceWolvesSagaWarrior && !weaponStats[chosenWeaponNameDif].sustainedHits && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
        }

        if(spaceWolvesSagaSlayer && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].lethalHits = true;
        }

        if(spaceWolvesSagaBear && (weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp)) ){
            weaponStats[chosenWeaponNameDif].fnp = 6;
            generalFnp = 6;
        }



        if(spaceWolvesBlack && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].anti = true;
            if(weaponStats[chosenWeaponNameDif].antiType == ''){
                weaponStats[chosenWeaponNameDif].antiType += 'Monster, Vehicle';
                weaponStats[chosenWeaponNameDif].antiValue += '4, 4'
            }else{
                weaponStats[chosenWeaponNameDif].antiType += ', Monster, Vehicle';
                weaponStats[chosenWeaponNameDif].antiValue += ', 4, 4'
            }
        }

        if(spaceWolvesFrost && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            weaponStats[chosenWeaponNameDif].strength += 1;
            weaponStats[chosenWeaponNameDif].ap += 1;
        }

        if(spaceWolvesTalisman){
            weaponStats[chosenWeaponNameDif].damageString = addToString(weaponStats[chosenWeaponNameDif].rollDamage, weaponStats[chosenWeaponNameDif].damageString, -1);
        }


        //tau
        if(tauGuided && weaponStats[chosenWeaponNameDif].hit > 2){
            weaponStats[chosenWeaponNameDif].hit = weaponStats[chosenWeaponNameDif].hit -1 ;
            if(tauObserverMarkerlight){
                weaponStats[chosenWeaponNameDif].ignoresCover = true;
            }
        }

        if(tauKauyon && (!weaponStats[chosenWeaponNameDif].sustainedHits || weaponStats[chosenWeaponNameDif].sustainedHitsCount < 2)){
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            if(tauGuided){
                weaponStats[chosenWeaponNameDif].sustainedHitsCount = 2;
            }else{
                weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
            }
        }


        if(tauPatient){
            hitModifierArr.push(1);
            if(tauKauyon){
                woundModifierArr.push(1);
            }
        }

        //Thousand Sons

        if(thousandSonsWeaver){
            rerollAllSaves = true;
        }

        if(thousandSonsTwist){
            weaponStats[chosenWeaponNameDif].save = 10;
        }

        if(thousandSonsMalevolent && weaponStats[chosenWeaponNameDif].psychic){
            weaponStats[chosenWeaponNameDif].lethalHits = true;
        }

        if(thousandSonsMaelstrom && weaponStats[chosenWeaponNameDif].psychic && !weaponStats[chosenWeaponNameDif].sustainedHits){
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
        }

        if(thousandSonsImmaterium && weaponStats[chosenWeaponNameDif].psychic){
            weaponStats[chosenWeaponNameDif].devastatingWounds = true;
        }


        if(thousandSonsVortex && weaponStats[chosenWeaponNameDif].psychic){
            weaponStats[chosenWeaponNameDif].damageString = addToString(weaponStats[chosenWeaponNameDif].rollDamage, weaponStats[chosenWeaponNameDif].damageString, 1);
            weaponStats[chosenWeaponNameDif].strength += 1;
        }

        //Tyranids


        if( tyranidSwarming && (defenderKeywordsArray.includes('Infantry') || defenderKeywordsArray.includes('Swarm')) && !weaponStats[chosenWeaponNameDif].sustainedHits){
            // console.log('swarming activate')
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
        }

        if( tyranidAggression && (defenderKeywordsArray.includes('Monster') || defenderKeywordsArray.includes('Vehicle'))){
            // console.log('aggression activate')
            weaponStats[chosenWeaponNameDif].lethalHits = true;
        }


        if(tyranidAdaptedAttacker){
            oneRerollAttackChain = true;
        }

        if(tyranidAdaptedDefender){
            rerollSingleSave = true;
        }

        if(tyranidAdaptiveWounded && (weaponStats[chosenWeaponNameDif].fnp > 4 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 4;
            generalFnp = 4;
        }else if(tyranidAdaptive && (weaponStats[chosenWeaponNameDif].fnp > 5 || weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp))){
            weaponStats[chosenWeaponNameDif].fnp = 5;
            generalFnp = 5;
        }


        //World Eaters

        if(worldEatersMartial && !weaponStats[chosenWeaponNameDif].sustainedHits){
            weaponStats[chosenWeaponNameDif].sustainedHits = true;
            weaponStats[chosenWeaponNameDif].sustainedHitsCount = 1;
        }

        if(worldEatersBlades){
            weaponStats[chosenWeaponNameDif].lethalHits = true;
        }

        if(worldEatersDevotion){
            if(weaponStats[chosenWeaponNameDif].fnp == 0 || isNaN(weaponStats[chosenWeaponNameDif].fnp)){
                weaponStats[chosenWeaponNameDif].fnp = 6;
                generalFnp = 6;
            }else{
                weaponStats[chosenWeaponNameDif].fnp = weaponStats[chosenWeaponNameDif].fnp - 1;
                generalFnp = generalFnp - 1;
            }
        }


        if(worldEatersRelentless && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(!weaponStats[chosenWeaponNameDif].extraAttacks){
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
            }
            weaponStats[chosenWeaponNameDif].strength += 1;
        }

        weaponStats[chosenWeaponNameDif].worldEatersGlaiveCharged = false;
        if(worldEatersGlaive && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'melee'){
            if(charged){
                weaponStats[chosenWeaponNameDif].worldEatersGlaiveCharged = true;
            }else{
                weaponStats[chosenWeaponNameDif].attackString = addToString(weaponStats[chosenWeaponNameDif].rollAttacks, weaponStats[chosenWeaponNameDif].attackString, 1);
                weaponStats[chosenWeaponNameDif].damageString = addToString(weaponStats[chosenWeaponNameDif].rollDamage, weaponStats[chosenWeaponNameDif].damageString, 1);
            }
        }

        if(worldEatersHelm){
            weaponStats[chosenWeaponNameDif].halveDamage = true;
        }

        //generic stratagems

        //grenade
        // if(stratagemGrenade && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){

        // }else{
        //     stratagemGrenade = false;
        // }

        //Go to ground
        if(stratagemGround && (weaponStats[chosenWeaponNameDif].invul == 0 || isNaN(weaponStats[chosenWeaponNameDif].invul)) && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            weaponStats[chosenWeaponNameDif].invul = 6;
            cover = true;
        }else if(stratagemGround && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            cover = true;
        }

        //Smokescreen
        if(stratagemSmoke && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            stealth = true;
            cover = true;
        }
        
        //modifiers
        if(stealth && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            hitModifierArr.push(-1);
        }

        //rapid fire
        weaponStats[chosenWeaponNameDif].rollRapidFire = false;
        if(weaponStats[chosenWeaponNameDif].rapidFireCount.toUpperCase().includes('D')){
            weaponStats[chosenWeaponNameDif].rollRapidFire = true;
        }

        //melta
        if(weaponStats[chosenWeaponNameDif].melta && halfRange){
            if(weaponStats[chosenWeaponNameDif].rollDamage){
                let splitDamageString = weaponStats[chosenWeaponNameDif].damageString.split('+');
                if(splitDamageString.length == 2){
                    splitDamageString[1] = parseInt(splitDamageString[1]) + weaponStats[chosenWeaponNameDif].meltaCount;
                    weaponStats[chosenWeaponNameDif].damageString = splitDamageString.join('+');
                }else{
                    weaponStats[chosenWeaponNameDif].damageString = splitDamageString[0] + '+' + weaponStats[chosenWeaponNameDif].meltaCount;
                }
            }else{
                weaponStats[chosenWeaponNameDif].damageString += weaponStats[chosenWeaponNameDif].meltaCount;
            }
        }

        //lance
        if(weaponStats[chosenWeaponNameDif].lance && charged){
            woundModifierArr.push(1);
            // console.log(`lance: ${lance}`)
            // console.log(`charged: ${charged}`)
            // console.log(`woundModifier: ${woundModifier}`)
        }

        //indirect fire
        if(weaponStats[chosenWeaponNameDif].indirectFire && !los){
            hitModifierArr.push(-1);
            cover = true;
        }

        //heavy
        if(weaponStats[chosenWeaponNameDif].heavy && !moved){
            hitModifierArr.push(1);
        }

        // calculating needed wound roll
        weaponStats[chosenWeaponNameDif].wound = woundRollVal(weaponStats[chosenWeaponNameDif].strength,weaponStats[chosenWeaponNameDif].toughness);

        // console.log(`wound: ${wound}`)

        //checking if anti applies and if so adjusting critical wound value
        if(weaponStats[chosenWeaponNameDif].anti){

            let antiArray = weaponStats[chosenWeaponNameDif].antiType.split(', ');
            let antiValuesArray = weaponStats[chosenWeaponNameDif].antiValue.split(', ');

            weaponStats[chosenWeaponNameDif].criticalWound = 6;
            for(let a=0,b=antiArray.length;a<b;a++){
                for(let c=0,d=defenderKeywordsArray.length;c<d;c++){
                    if(antiArray[a] == defenderKeywordsArray[c]){
                        // console.log('these ones matched');
                        // console.log(`anti: ${antiArray[a]}`)
                        // console.log(`defender tag: ${defenderKeywordsArray[c]}`)
                        // console.log(`anti value: ${antiValuesArray[a]}`)
                        if(antiValuesArray[a] < weaponStats[chosenWeaponNameDif].criticalWound){
                            weaponStats[chosenWeaponNameDif].criticalWound = antiValuesArray[a];
                        }
                    }
                }
            }
            // console.log(`critical wound after anti check: ${criticalWound}`);
        }
        
        // calculating the save roll
        // console.log(`save: ${save}`);
        // console.log(`invul: ${invul}`);

        //cover
        //defender has the benefit of cover as long as the attack isnt ap 0 while they have a save of 3+ or better
        if(cover && (weaponStats[chosenWeaponNameDif].save > 3 || weaponStats[chosenWeaponNameDif].ap > 0) && !weaponStats[chosenWeaponNameDif].ignoresCover && weaponStats[chosenWeaponNameDif].weaponMeleeRanged == 'ranged'){
            saveModifierArr.push(1);
        }


        //sort out what the actual modifier amounts are
        // console.log(`hitModifierArr: ${hitModifierArr}`);
        hitModifierArr.forEach(val => {
            let actualVal = val;
            if(ignoreAttackerRollModifiers && actualVal < 0){
                actualVal = 0;
            }
            hitModifier = hitModifier + actualVal;
        });
        // console.log(`hitModifier: ${hitModifier}`)

        // console.log(`woundModifierArr: ${woundModifierArr}`);
        woundModifierArr.forEach(val => {
            let actualVal = val;
            if(ignoreAttackerRollModifiers && actualVal < 0){
                actualVal = 0;
            }
            woundModifier = woundModifier + actualVal;
        });
        // console.log(`woundModifier: ${woundModifier}`)

        // console.log(`saveModifierArr: ${saveModifierArr}`);
        saveModifierArr.forEach(val => {
            let actualVal = val;
            if(ignoreDefenderRollModifiers && actualVal < 0){
                actualVal = 0;
            }
            saveModifier = saveModifier + actualVal;
        });
        // console.log(`saveModifier: ${saveModifier}`)



        //capping hit roll modifiers
        if(hitModifier > 1){
            hitModifier = 1;
        }else if(hitModifier < -1){
            hitModifier = -1;
        }

        weaponStats[chosenWeaponNameDif].hitModifier = hitModifier;

        // console.log(`hitModifier: ${weaponStats[chosenWeaponNameDif].hitModifier}`);

        //capping wound roll modifiers
        if(woundModifier > 1){
            woundModifier = 1;
        }else if(woundModifier < -1){
            woundModifier = -1;
        }

        weaponStats[chosenWeaponNameDif].woundModifier = woundModifier;

        // console.log(`woundModifier: ${weaponStats[chosenWeaponNameDif].woundModifier}`);

        //can never be more than 1;
        if(saveModifier > 1){
            saveModifier = 1;
        }else if(saveModifier < -1){
            saveModifier = -1;
        }

        // console.log(`saveModifier: ${saveModifier}`);
        // console.log(`ap: ${weaponStats[chosenWeaponNameDif].ap}`)
        // console.log(`saveModifier: ${saveModifier}`)

        // console.log(`invul: ${weaponStats[chosenWeaponNameDif].invul}`)

        weaponStats[chosenWeaponNameDif].save = weaponStats[chosenWeaponNameDif].save + weaponStats[chosenWeaponNameDif].ap - saveModifier;

        if(weaponStats[chosenWeaponNameDif].invul != 0 && !isNaN(weaponStats[chosenWeaponNameDif].invul)){
            if(weaponStats[chosenWeaponNameDif].save > weaponStats[chosenWeaponNameDif].invul){
                weaponStats[chosenWeaponNameDif].save = weaponStats[chosenWeaponNameDif].invul;
            }
        }

        // console.log(`save: ${weaponStats[chosenWeaponNameDif].save}`)

        // console.log(`defenders calced save: ${weaponStats[chosenWeaponNameDif].save}`)

        //defender unit damage modifiers go down here so they dont get modified
        if(sororitasMantle){
            weaponStats[chosenWeaponNameDif].rollDamage = false;
            weaponStats[chosenWeaponNameDif].damageString = 1;
        }

        if(halveDamage && !weaponStats[chosenWeaponNameDif].rollDamage){
            weaponStats[chosenWeaponNameDif].damageString = Math.ceil(damageString/2);
        }

        weaponStats[chosenWeaponNameDif].resultsArr = [];
        weaponStats[chosenWeaponNameDif].deadDefenderResultsArr = [];
        weaponStats[chosenWeaponNameDif].defenderWipedArr = [];

        //we need these saved for if the strings are modified during simulation
        weaponStats[chosenWeaponNameDif].originalAttackString = weaponStats[chosenWeaponNameDif].attackString;
        weaponStats[chosenWeaponNameDif].originalDamageString = weaponStats[chosenWeaponNameDif].damageString;

        // console.log(`hitModifier: ${weaponStats[chosenWeaponNameDif].hitModifier}`);
        // console.log(`woundModifier: ${weaponStats[chosenWeaponNameDif].woundModifier}`);
        // console.log(weaponStats[chosenWeaponNameDif])

    });

    let i = 0;
    while (i < simulations) {


        // console.log('NEW SIMULATION')

        let chosenWeaponName;
        let usedSingleReroll = false;

        let tankShockDamage = 0;
        let grenadeDamage = 0;

        let mortalWounds = 0;

        deadDefenders = 0;
        remainingDefenderWounds = wounds;

        let deadDefendersBeforeThisWeapon = 0;

        let rerollSingleHitUsed = false;
        let rerollSingleWoundUsed = false;
        let rerollSingleSaveUsed = false;

        weaponSelectEls.forEach( weaponEl => {

            chosenWeaponName = weaponEl.getAttribute('data-weapon');
            chosenWeaponNameDif = chosenWeaponName + '-' + weaponEl.getAttribute('data-weapon-extra');
            let chosenWeaponStats = weaponStats[chosenWeaponNameDif];

            // if(i == 0){
                // console.log(chosenWeaponName)
                // console.log(JSON.parse(JSON.stringify(chosenWeaponStats)))
            // }

            attackString = chosenWeaponStats.originalAttackString;
            damageString = chosenWeaponStats.originalDamageString;

            // console.log('');
            // console.log('NEW SIMULATION');

            mortalWounds = 0;
                
            let diceResults = [];
            let attacks = 0;
            let lethalHitStorage = [];

            if(chosenWeaponStats.worldEatersGlaiveCharged){
                let tempD3 = parseInt(rollDice3());
                chosenWeaponStats.attackString = addToString(chosenWeaponStats.rollAttacks, chosenWeaponStats.attackString, tempD3);
                chosenWeaponStats.damageString = addToString(chosenWeaponStats.rollDamage, chosenWeaponStats.damageString, tempD3);
            }

            // console.log(`attacks (should be 0): ${attacks}`)

            if(chosenWeaponStats.rollAttacks){
                // console.log('rolling')
                // console.log(`attackerCount: ${attackerCount}`)
                for(let i=0,j=chosenWeaponStats.attackerCount;i<j;i++){
                    let tempAttackRoll = calcDiceRollsInString(chosenWeaponStats.attackString);
                    if(tempAttackRoll < 1){
                        attacks += 1;
                    }else{
                        attacks += tempAttackRoll;
                    }
                    // console.log(`attacks: ${attacks}`)
                }
            }else{
                // console.log('not rolling');
                attacks = parseInt(chosenWeaponStats.attackString) * chosenWeaponStats.attackerCount;
                // console.log(`attacks: ${attacks}`)
            }

            //adding the chaos space marine talisman D3 attacks if needed
            if(chosenWeaponStats.addCSMTalismanAttacks){
                attacks += calcDiceRollsInString('D3');
            }

            // console.log(`attacks without additions: ${attacks}`)

            //add the rapid fire attacks
            if(halfRange && chosenWeaponStats.rapidFire){
                // console.log(`attack string before rapid fire: ${attacks}`);
                if(chosenWeaponStats.rollRapidFire){
                    for(let i=0,j=attackerCount;i<j;i++){
                        attacks += calcDiceRollsInString(chosenWeaponStats.rapidFireCount);
                    }
                }else{
                    attacks += (parseInt(chosenWeaponStats.rapidFireCount) * chosenWeaponStats.attackerCount);
                }
                // console.log(`attack string after rapid fire: ${attacks}`);
            }

            // console.log(`attacks after rapid fire: ${attacks}`)

            //add 1 additional attack for every 5 defender models
            if(chosenWeaponStats.blast){
                attacks += chosenWeaponStats.attackerCount*(Math.floor(defenderCount/5))
            }

                // console.log(`final number of attacks: ${attacks}`);

            //roll to hit
            for(let a=0,b=attacks;a<b;a++){
                diceResults.push(rollDice6());
            }

            if(!chosenWeaponStats.torrent){
                // console.log(`hit rolls: ${diceResults}`);
                // console.log(`hit rolls array length: ${diceResults.length}`);
                if(oneRerollAttackChain && !usedSingleReroll){
                    // console.log(`usedSingleReroll: ${usedSingleReroll}`)
                    // console.log(`hit rolls: ${diceResults}`);
                    diceResults.forEach((roll, index) => {
                        if((roll + chosenWeaponStats.hitModifier) < chosenWeaponStats.hit && !usedSingleReroll){
                            diceResults[index] = rollDice6();
                            usedSingleReroll = true;
                        }
                    })
                    // console.log(`hit rolls: ${diceResults}`);
                }

                // console.log(`hit rolls check 2: ${diceResults.slice()}`);

                // console.log(`rerollSingleHit :${rerollSingleHit}`)
                // console.log(`rerollSingleHitUsed :!${rerollSingleHitUsed}`)

                if(rerollAllHits){
                    //reroll all fails

                    //get any fails's
                    let failedHitRolls = diceResults.filter((result) => (result == 1 || (result + chosenWeaponStats.hitModifier) < chosenWeaponStats.hit));
                    // console.log(`failed hit rolls: ${failedHitRolls}`);
                    // console.log(`failed hit rolls array length: ${failedHitRolls.length}`);

                    //remove fails from the normal pool
                    diceResults = diceResults.filter((result) => (result != 1 && (result + chosenWeaponStats.hitModifier) >= chosenWeaponStats.hit));
                    // console.log(`old roll, fails's removed: ${diceResults}`);
                    // console.log(`old roll, fails's removed array length: ${diceResults.length}`);

                    //reroll the failed hits
                    rollDiceArray(failedHitRolls);
                    // console.log(`rerolled failed hit rolls: ${failedHitRolls}`);
                    // console.log(`rerolled failed hit rolls array length: ${failedHitRolls.length}`);

                    // combine the new success dice into the old array
                    diceResults = diceResults.concat(failedHitRolls);
                    // console.log(`combined old hits and rerolls: ${diceResults}`);
                    // console.log(`combined old hits and rerolls array length: ${diceResults.length}`);

                }else if(reroll1Hits){ 
                    //reroll any 1's

                    //get any 1's
                    let hitRoll1s = diceResults.filter((result) => result == 1);
                    // console.log(`hit rolls 1: ${hitRoll1s}`);
                    // console.log(`hit rolls 1 array length: ${hitRoll1s.length}`);

                    //remove fails from the normal pool
                    diceResults = diceResults.filter((result) => result > 1);
                    // console.log(`old roll, 1's removed: ${diceResults}`);
                    // console.log(`old roll, 1's removed array length: ${diceResults.length}`);

                    //reroll the failed wounds
                    rollDiceArray(hitRoll1s);
                    // console.log(`rerolled 1's hit rolls: ${hitRoll1s}`);
                    // console.log(`rerolled 1's hit rolls array length: ${hitRoll1s.length}`);

                    // combine the new success dice into the old array
                    diceResults = diceResults.concat(hitRoll1s);
                    // console.log(`combined old hit and rerolls: ${diceResults}`);
                    // console.log(`combined old hit and rerolls array length: ${diceResults.length}`);

                }else if(rerollSingleHit && !rerollSingleHitUsed){
                    //reroll a single fails

                    //get any fails's
                    let failedHitRolls = diceResults.filter((result) => (result == 1 || ((result + chosenWeaponStats.hitModifier) < chosenWeaponStats.hit)));
                    // console.log(`failed hit rolls: ${failedHitRolls}`);
                    // console.log(`failed hit rolls array length: ${failedHitRolls.length}`);

                    if(failedHitRolls.length > 0){
                        //remove fails from the normal pool
                        diceResults = diceResults.filter((result) => (result + chosenWeaponStats.hitModifier) >= chosenWeaponStats.hit);
                        // console.log(`old roll, fails's removed: ${diceResults}`);
                        // console.log(`old roll, fails's removed array length: ${diceResults.length}`);

                        let newHitRoll = [];
                        //if there is at least one fail roll a dice and add it back
                        newHitRoll.push(rollDice6());
                        // console.log(`new hit roll: ${newHitRoll}`);
                        // console.log(`new hit roll array length: ${newHitRoll.length}`);

                        // combine the new success dice into the old array
                        diceResults = diceResults.concat(newHitRoll);
                        // console.log(`combined old hits and reroll: ${diceResults}`);
                        // console.log(`combined old hits and reroll array length: ${diceResults.length}`);
                    }

                    rerollSingleHitUsed = true;

                }

                //remove critical fails
                diceResults = diceResults.filter((result) => result > 1);
                // console.log(`after removing critical fails: ${diceResults}`);

                // console.log(`criticalHit: ${chosenWeaponStats.criticalHit}`)

                //create an array of the critical hits and seperate them from the normal dice
                let criticalHitDice = diceResults.filter((result) => result >= chosenWeaponStats.criticalHit);
                diceResults = diceResults.filter((result) => result < chosenWeaponStats.criticalHit);

                //add the crit dice back in
                diceResults = diceResults.concat(criticalHitDice);

                //do any hit roll modifiers
                // diceResults.forEach((result,index) => {
                //     if(diceResults[index] != 1){
                //         diceResults[index] += hitModifier;
                //     }
                // });

                // console.log(`hitModifier: ${chosenWeaponStats.hitModifier}`)
                // console.log(`hit: ${chosenWeaponStats.hit}`)
                // console.log(`first roll in arr: ${diceResults[0]}`)
                // console.log(`dice 1 + modifier ${diceResults[0] + chosenWeaponStats.hitModifier}`)
                // console.log('')

                // console.log(`hitmodifier applied:`)
                // console.log(diceResults.filter((result) => result + chosenWeaponStats.hitModifier >= chosenWeaponStats.hit))
                // console.log(`hitmodifier not applied`)
                // console.log(diceResults.filter((result) => result >= chosenWeaponStats.hit))

                //remove any that failed to hit
                diceResults = diceResults.filter((result) => (result + chosenWeaponStats.hitModifier) >= chosenWeaponStats.hit);
                // console.log(`removed failed hits: ${diceResults}`);
                // console.log(`removed failed hits array length: ${diceResults.length}`);

                //check if we are sustained
                if(chosenWeaponStats.sustainedHits){
                    //add extra dice to the pool for sustained amount
                    for(let a=0,b=criticalHitDice.length;a<b;a++){
                        for(let c=0,d=chosenWeaponStats.sustainedHitsCount;c<d;c++){
                            //adding them in as 1's so they dont effect lethal hits
                            diceResults.push(1);
                        }
                    }

                    // console.log(`added ${criticalHitDice.length * sustainedHitsCount} dice to the pool`);
                    // console.log(`dice results with added dice: ${diceResults}`)
                }

                //check for lethal hits
                lethalHitStorage = [];
                if(chosenWeaponStats.lethalHits){
                    lethalHitStorage = diceResults.filter((result) => result >= chosenWeaponStats.criticalHit);
                    diceResults = diceResults.filter((result) => result < chosenWeaponStats.criticalHit);
                    // console.log(`lethal hit dice: ${lethalHitStorage}`);
                    // console.log(`dice with lethals removed: ${diceResults}`);
                }

                // console.log(`succesfull hits: ${diceResults}`);
                // console.log(`succesfull hits array length: ${diceResults.length}`);
                
            }
            
            //roll to wound
            rollDiceArray(diceResults)

            // console.log(`Critical Wound value: ${criticalWound}`);
            
            // console.log(`wound rolls: ${diceResults} length:${diceResults.length}`);

            if(oneRerollAttackChain && !usedSingleReroll){
                // console.log(`usedSingleReroll: ${usedSingleReroll}`)
                // console.log(`wound rolls: ${diceResults}`);
                diceResults.forEach((roll, index) => {
                    if((roll + chosenWeaponStats.woundModifier) < chosenWeaponStats.wound){
                        diceResults[index] = rollDice6();
                        usedSingleReroll = true;
                    }
                })
                // console.log(`wound rolls: ${diceResults}`);
            }

            //get all critical wounds
            let criticalWoundDice = diceResults.filter((result) => result >= chosenWeaponStats.criticalWound);
            // console.log(`critical wound dice: ${criticalWoundDice.slice()} length:${criticalWoundDice.length}`);

            let criticalWoundDiceAmount = criticalWoundDice.length;

            // console.log(`critical wound: ${chosenWeaponStats.criticalWound}`)

            //remove the criticals from the dice pool
            diceResults = diceResults.filter((result) => result < chosenWeaponStats.criticalWound);
            // console.log(`dice pool after criticals removed rolls: ${diceResults} length:${diceResults.length}`);

            //If we are twinlinked
            if(rerollAllWounds || chosenWeaponStats.twinLinked){
                //reroll all fails

                //get any fails's
                let failedWoundRolls = diceResults.filter((result) => (result == 1 || (result + chosenWeaponStats.woundModifier) < chosenWeaponStats.wound));
                // console.log(`failed wound rolls: ${failedWoundRolls}`);
                // console.log(`failed wound rolls array length: ${failedWoundRolls.length}`);

                //remove fails from the normal pool
                diceResults = diceResults.filter((result) => (result != 1 && (result + chosenWeaponStats.woundModifier) >= chosenWeaponStats.wound));
                // console.log(`old roll, fails's removed: ${diceResults}`);
                // console.log(`old roll, fails's removed array length: ${diceResults.length}`);

                //reroll the failed wounds
                rollDiceArray(failedWoundRolls);
                // console.log(`rerolled failed wound rolls: ${failedWoundRolls}`);
                // console.log(`rerolled failed wound rolls array length: ${failedWoundRolls.length}`);

                // combine the new success dice into the old array
                diceResults = diceResults.concat(failedWoundRolls);
                // console.log(`combined old wounds and rerolls: ${diceResults}`);
                // console.log(`combined old wounds and rerolls array length: ${diceResults.length}`);

            }else if(reroll1Wounds){
                //get any 1's
                let woundRoll1s = diceResults.filter((result) => result == 1);
                // console.log(`wound rolls 1: ${woundRoll1s}`);
                // console.log(`wound rolls 1 array length: ${woundRoll1s.length}`);

                //remove fails from the normal pool
                diceResults = diceResults.filter((result) => result > 1);
                // console.log(`old roll, 1's removed: ${diceResults}`);
                // console.log(`old roll, 1's removed array length: ${diceResults.length}`);

                //reroll the failed wounds
                rollDiceArray(woundRoll1s);
                // console.log(`rerolled 1's wound rolls: ${woundRoll1s}`);
                // console.log(`rerolled 1's wound rolls array length: ${woundRoll1s.length}`);

                // combine the new success dice into the old array
                diceResults = diceResults.concat(woundRoll1s);
                // console.log(`combined old wounds and rerolls: ${diceResults}`);
                // console.log(`combined old wounds and rerolls array length: ${diceResults.length}`);

            }else if(rerollSingleWound && !rerollSingleWoundUsed){
                //reroll a single fails

                //get any fails's
                let failedWoundRolls = diceResults.filter((result) => (result == 1 || (result + chosenWeaponStats.woundModifier) < chosenWeaponStats.wound));
                // console.log(`failed wound rolls: ${failedWoundRolls}`);
                // console.log(`failed wound rolls array length: ${failedWoundRolls.length}`);

                if(failedWoundRolls.length > 0){
                    //remove fails from the normal pool
                    diceResults = diceResults.filter((result) => (result + chosenWeaponStats.woundModifier) >= chosenWeaponStats.wound);
                    // console.log(`old roll, fails's removed: ${diceResults}`);
                    // console.log(`old roll, fails's removed array length: ${diceResults.length}`);

                    let newWoundRoll = [];
                    //if there is at least one fail roll a dice and add it back
                    newWoundRoll.push(rollDice6());
                    // console.log(`new wound roll: ${newWoundRoll}`);
                    // console.log(`new wound roll array length: ${newWoundRoll.length}`);

                    // combine the new success dice into the old array
                    diceResults = diceResults.concat(newWoundRoll);
                    // console.log(`combined old wounds and reroll: ${diceResults}`);
                    // console.log(`combined old wounds and reroll array length: ${diceResults.length}`);
                }

                rerollSingleWoundUsed = true;

            }

            //remove critical fails
            diceResults = diceResults.filter((result) => result > 1);
            // console.log(`after removing critical fails: ${diceResults}`);

            //this section takes any new critical dice that came up in rerolls
            if(rerollAllWounds || chosenWeaponStats.twinLinked || reroll1Wounds || rerollSingleWound){

                // console.log(`dice pool after rerolls: ${diceResults} length:${diceResults.length}`);

                criticalWoundDice = criticalWoundDice.concat(diceResults.filter((result) => result >= chosenWeaponStats.criticalWound));

                // console.log(`critical wound dice after any rerolls: ${criticalWoundDice.slice()} length:${criticalWoundDice.length}`);

                //remove the criticals from the dice pool
                diceResults = diceResults.filter((result) => result < chosenWeaponStats.criticalWound);

                // console.log(`dice pool after rerolls and new criticals removed: ${diceResults} length:${diceResults.length}`);
            }

            //If we have devastating wounds
            if(chosenWeaponStats.devastatingWounds){

                // console.log(`critical wound rolls: ${criticalWoundDice}`);
                // if(i == 0){
                    // console.log('devastatingWounds');
                // }

                //turn the critical wounds into mortal wounds
                if(chosenWeaponStats.rollDamage){
                    for(let a=0,b=criticalWoundDice.length;a<b;a++){
                        let tempDiceRoll = calcDiceRollsInString(chosenWeaponStats.damageString);
                        if(tempDiceRoll < 1){
                            tempDiceRoll = 1;
                        }
                        if(chosenWeaponStats.halveDamage){
                            mortalWounds += (Math.ceil(tempDiceRoll));
                        }else{
                            mortalWounds += tempDiceRoll;
                        }
                    };
                }else{
                    mortalWounds = criticalWoundDice.length * chosenWeaponStats.damageString;
                }
            }

            // console.log(`woundModifier applied:`)
            // console.log(diceResults.filter((result) => (result + chosenWeaponStats.woundModifier) >= chosenWeaponStats.wound))
            // console.log(`woundModifier not applied`)
            // console.log(diceResults.filter((result) => (result) >= chosenWeaponStats.wound))
            
            // console.log(`woundModifier: ${chosenWeaponStats.woundModifier}`)
            // console.log(`roll needed to wound: ${chosenWeaponStats.wound}`)

            //remove any that failed to wound
            diceResults = diceResults.filter((result) => (result + chosenWeaponStats.woundModifier) >= chosenWeaponStats.wound);

            //add the criticals back in unless devastating wounds or critical ap stuff
            if(!chosenWeaponStats.devastatingWounds && weaponStats[chosenWeaponNameDif].criticalWoundAp == 0){
                diceResults = diceResults.concat(criticalWoundDice);
            }

            // console.log(`dice pool after wound maths stuff: ${diceResults} length:${diceResults.length}`);

            //if we have lethal hit dice to add back in do so
            // console.log(`before lethal hit dice added back: ${diceResults}`);
            if(chosenWeaponStats.lethalHits){
                diceResults = diceResults.concat(lethalHitStorage);
                // console.log(`lethal hit dice added back: ${diceResults}`);
            }

            // console.log(`succesfull wounds: ${diceResults}`);

            //roll to save
            rollDiceArray(diceResults);

            //rolling save for the extra ap crit wound dice
            if(weaponStats[chosenWeaponNameDif].criticalWoundAp > 0){
                rollDiceArray(criticalWoundDice);
            }

            // console.log(`save rolls: ${diceResults}`);
            // console.log(`target save: ${chosenWeaponStats.save}`);

            /* THERE IS A MINOR INACURACY WITH AELDARI STRATAGEM THAT ADDS AP ON CRITICAL WOUNDS AS THIS ISNT INCLUDED IN REROLLING AT THE MOMENT */
            if(rerollAllSaves){
                //reroll all fails

                //get any fails's
                let failedSaveRolls = diceResults.filter((result) => (result == 1 || result < chosenWeaponStats.save));

                //remove fails from the normal pool
                diceResults = diceResults.filter((result) => (result != 1 && result >= chosenWeaponStats.save));

                //reroll the failed hits
                rollDiceArray(failedSaveRolls);

                // combine the new success dice into the old array
                diceResults = diceResults.concat(failedSaveRolls);

            }else if(reroll1Saves){
                //get any 1's
                let saveRoll1s = diceResults.filter((result) => result == 1);

                //remove fails from the normal pool
                diceResults = diceResults.filter((result) => result > 1);

                //reroll the failed wounds
                rollDiceArray(saveRoll1s);

                // combine the new success dice into the old array
                diceResults = diceResults.concat(saveRoll1s);

            }else if(rerollSingleSave && !rerollSingleHitUsed){
                //reroll a single fails

                //get any fails's
                let failedSaveRolls = diceResults.filter((result) => (result == 1 || (result < chosenWeaponStats.save)));

                if(failedSaveRolls.length > 0){
                    //remove fails from the normal pool
                    diceResults = diceResults.filter((result) => (result != 1 && result >= chosenWeaponStats.save));

                    let newSaveRoll = [];
                    //if there is at least one fail roll a dice and add it back
                    newSaveRoll.push(rollDice6());

                    // combine the new success dice into the old array
                    diceResults = diceResults.concat(newSaveRoll);
                }

                rerollSingleHitUsed = true;

            }

            weaponStats[chosenWeaponNameDif].criticalWoundAp > 0


            // console.log(`after reroll saves: ${diceResults}`);


            // console.log(`save: ${chosenWeaponStats.save}`)
            //remove any that were saved
            diceResults = diceResults.filter((result) => result < chosenWeaponStats.save);

            //
            if(weaponStats[chosenWeaponNameDif].criticalWoundAp > 0){

                let tempRecalcedSave = chosenWeaponStats.save + weaponStats[chosenWeaponNameDif].criticalWoundAp;

                if(chosenWeaponStats.invul != 0 && (chosenWeaponStats.save + weaponStats[chosenWeaponNameDif].criticalWoundAp > chosenWeaponStats.invul)){
                    tempRecalcedSave = chosenWeaponStats.invul;
                }
                
                criticalWoundDice = criticalWoundDice.filter((result) => result < (tempRecalcedSave));

                diceResults = diceResults.concat(criticalWoundDice);
            }

            //calculate number of wounds
            let numberOfWounds = 0;
            
            for(let a=0,b=diceResults.length;a<b;a++){
                let calcedDamage = 0;
                if(chosenWeaponStats.rollDamage){
                    let tempDiceRoll = calcDiceRollsInString(chosenWeaponStats.damageString);
                    if(tempDiceRoll < 1){
                        tempDiceRoll = 1;
                    }
                    if(chosenWeaponStats.halveDamage){
                        calcedDamage = (Math.ceil(tempDiceRoll));
                    }else{
                        calcedDamage = tempDiceRoll;
                    }
                }else{
                    calcedDamage = chosenWeaponStats.damageString;
                }

                // console.log(calcedDamage);

                //do fnp stuff here for non mortal wounds
                if( (chosenWeaponStats.fnp != 0 && !isNaN(chosenWeaponStats.fnp))){
                    // console.log(`calcedDamage before fnp: ${calcedDamage}`)
                    for(let a=0,b=calcedDamage;a<b;a++){
                        if(rollDice6() >= chosenWeaponStats.fnp){
                            calcedDamage = calcedDamage - 1;
                        }
                    }
                    // console.log(`calcedDamage after fnp: ${calcedDamage}`)
                }

                //add to the total number of wounds for maths
                numberOfWounds += calcedDamage;
                // console.log(`damage roll ${a} current total: ${numberOfWounds}`)

                //deal damage to a defender and see if it dies
                remainingDefenderWounds = remainingDefenderWounds - calcedDamage;
                if(remainingDefenderWounds <= 0){
                    deadDefenders += 1;
                    remainingDefenderWounds = wounds;
                }
            }

            // console.log(`deadDefenders (before MW): ${deadDefenders}`);

            let finalWoundsDealt = numberOfWounds;

            // console.log(`regular wounds: ${numberOfWounds}`)
            // console.log(`mortal wounds: ${mortalWounds}`)

            //mortal wound stuff
            
            for(let a=0,b=mortalWounds;a<b;a++){
                if((chosenWeaponStats.fnp != 0 && !isNaN(chosenWeaponStats.fnp)) || custodesAegis){
                    if(custodesAegis && (chosenWeaponStats.fnp == 0 || chosenWeaponStats.fnp > 4)){
                        if(rollDice6() < 4){
                            finalWoundsDealt += 1;

                            remainingDefenderWounds = remainingDefenderWounds - 1;
                            if(remainingDefenderWounds <= 0){
                                deadDefenders += 1;
                                remainingDefenderWounds = wounds;
                            }
                        }
                    }else{
                        if(rollDice6() < chosenWeaponStats.fnp){
                            finalWoundsDealt += 1;

                            remainingDefenderWounds = remainingDefenderWounds - 1;
                            if(remainingDefenderWounds <= 0){
                                deadDefenders += 1;
                                remainingDefenderWounds = wounds;
                            }
                        }
                    }
                }else{
                    finalWoundsDealt += 1;

                    remainingDefenderWounds = remainingDefenderWounds - 1;
                    if(remainingDefenderWounds <= 0){
                        deadDefenders += 1;
                        remainingDefenderWounds = wounds;
                    }
                }
            }

            // console.log(`finalWoundsDealt: ${finalWoundsDealt}`);
            // console.log(`deadDefenders (after MW): ${deadDefenders}`);

            weaponOverallResultsObj[chosenWeaponNameDif].push(finalWoundsDealt);

            if(overAllResults.combinedWounds[i] === undefined){
                overAllResults.combinedWounds[i] = 0;
            }
            overAllResults.combinedWounds[i] += finalWoundsDealt;

            let defendersKilledByThisWeapon = deadDefenders - deadDefendersBeforeThisWeapon;

            weaponOverallDeadDefenderResultsObj[chosenWeaponNameDif].push(defendersKilledByThisWeapon);

            if(overAllResults.combinedKills[i] === undefined){
                overAllResults.combinedKills[i] = 0;
            }
            overAllResults.combinedKills[i] += defendersKilledByThisWeapon;

            deadDefendersBeforeThisWeapon = deadDefenders;


            // console.log(' ')

            // weaponOverallResultsObj[chosenWeaponNameDif] = resultsArr;
            // weaponOverallDeadDefenderResultsObj[chosenWeaponNameDif] = deadDefenderResultsArr;
            // weaponOverallDefenderWipedObj[chosenWeaponNameDif] = defenderWipedArr;

        })

        let extraMortalWounds = 0;
        if(stratagemTankShock){
            // console.log(`tank shock dice: ${tankShockDiceToRoll}`)
            for(let a=0,b=tankShockDiceToRoll;a<b;a++){
                if(rollDice6() >= 5){
                    extraMortalWounds += 1;
                    tankShockDamage += 1;
                }
            }
            // console.log(`mortal wounds after tank shock: ${extraMortalWounds}`)
            tankShockArr.push(tankShockDamage);
        }

        if(stratagemGrenade){
            for(let a=0,b=6;a<b;a++){
                if(rollDice6() >= 4){
                    extraMortalWounds += 1;
                    grenadeDamage += 1;
                }
            }
            grenadeArr.push(grenadeDamage);
        }

        finalWoundsDealt = 0;
        for(let a=0,b=extraMortalWounds;a<b;a++){
            if((generalFnp != 0 && !isNaN(generalFnp)) || custodesAegis){
                if(custodesAegis && (generalFnp == 0 || generalFnp > 4)){
                    if(rollDice6() < 4){
                        finalWoundsDealt += 1;

                        remainingDefenderWounds = remainingDefenderWounds - 1;
                        if(remainingDefenderWounds <= 0){
                            deadDefenders += 1;
                            remainingDefenderWounds = wounds;
                        }
                    }
                }else{
                    if(rollDice6() < generalFnp){
                        finalWoundsDealt += 1;

                        remainingDefenderWounds = remainingDefenderWounds - 1;
                        if(remainingDefenderWounds <= 0){
                            deadDefenders += 1;
                            remainingDefenderWounds = wounds;
                        }
                    }
                }
            }else{
                finalWoundsDealt += 1;

                remainingDefenderWounds = remainingDefenderWounds - 1;
                if(remainingDefenderWounds <= 0){
                    deadDefenders += 1;
                    remainingDefenderWounds = wounds;
                }
            }
        }

        overAllResults.combinedWounds[i] += finalWoundsDealt;
        overAllResults.combinedKills[i] += deadDefenders - deadDefendersBeforeThisWeapon;

        //if we killed more than the units members just cap it
        if(deadDefenders >= defenderCount){
            deadDefenders = defenderCount;
            overAllResults.combinedWipes.push('wiped')
        }

        // console.log(`deadDefenders: ${deadDefenders}`);
        // console.log(`remainingDefenderWounds: ${remainingDefenderWounds}`);

        // if(necronsReanimation){
            // console.log(`Models that are dead before reanimation: ${deadDefenders}`);
        // }

        // console.log('finalWoundsDealt: '+overAllResults.combinedWounds[i])
        let reanimationDeadDefenders = deadDefenders;
        if(necronsReanimation && reanimationDeadDefenders < defenderCount && overAllResults.combinedWounds[i] > 0){
            reanimationRoll = rollDice3();
            // console.log(`Reanimation Roll: ${reanimationRoll}`);
            if(wounds == 1){
                // console.log(`Reanimating unit has single wound models`);
                reanimationDeadDefenders = reanimationDeadDefenders - reanimationRoll;
                // console.log(`models that are dead after reanimation: ${reanimationDeadDefenders}`);
                if(reanimationDeadDefenders < 0){
                    // console.log(`The unit was back at full strength after partial reanimation`);
                    reanimationWoundsHealed.push(reanimationRoll + reanimationDeadDefenders)
                    reanimationModelsReanimated.push(reanimationRoll + reanimationDeadDefenders)
                    reanimationDeadDefenders = 0;
                }else{
                    // console.log(`Total reanimated models for this sim: ${reanimationRoll}`);
                    reanimationWoundsHealed.push(reanimationRoll);
                    reanimationModelsReanimated.push(reanimationRoll);
                }
            }else{
                // console.log(`Unit had models with ${wounds} wounds`);
                // console.log(`one model had: ${remainingDefenderWounds} left`);

                if(remainingDefenderWounds < wounds){
                    //one model is injured but not dead so we heal it first
                    // console.log(`wounds - remainingDefenderWounds: ${wounds - remainingDefenderWounds}`)
                    // console.log(`reanimationRoll: ${reanimationRoll}`)
                    reanimationWoundsHealed.push(reanimationRoll);
                    if(reanimationRoll > wounds - remainingDefenderWounds){
                        // there will be enough reanimation to heal this model and bring another back
                        // console.log(`reanimation was high enough to heal and bring back a model: ${reanimationRoll}`);
                        reanimationRoll = remainingDefenderWounds - wounds;
                        reanimationDeadDefenders - 1;
                        reanimationModelsReanimated.push(1)
                    }else{
                        //one got healed but none came back to life
                        // console.log('1 healed but none came back')
                        reanimationModelsReanimated.push(0)
                    }
                }else{
                    //none are injured so if any are dead it can all go into resurrection
                    if(reanimationRoll > wounds){
                        //its high enough to bring 2 back (if they have 2 wounds each and we roll a 3 and none are injured is the only time i think (except when we get to unit abilities))
                        // console.log('2 came back')
                        reanimationModelsReanimated.push(2)
                    }else{
                        //the roll only brought 1 back
                        // console.log('1 came back')
                        reanimationModelsReanimated.push(1)
                    }
                }
            }
        }else if(necronsReanimation && reanimationDeadDefenders >= defenderCount){
            // console.log(`reanimation didnt happen because the squad was wiped`);
            // reanimationWoundsHealed.push(0)
            // reanimationModelsReanimated.push(0)
        }else if(necronsReanimation){
            // console.log('reanimation didnt happen because no one was dead or injured');
            // reanimationWoundsHealed.push(0)
            // reanimationModelsReanimated.push(0)
        };

        let hazardousWounds = 0;
        if(hazardous){
            for(let a=0,b=hazardousWeaponCount;a<b;a++){
                if(rollDice6() === 1){
                    if(attackerKeywords.includes('Character') || attackerKeywords.includes('Monster') || attackerKeywords.includes('Vehicle')){
                        hazardousWounds += 3;
                    }else{
                        hazardousWounds += 1;
                    }
                }
            }
            hazardousResults.push(hazardousWounds);
        }

        //end of simulation loop
        i++;
    }

    // });

    // console.log('weaponOverallResultsObj');
    // console.log(weaponOverallResultsObj);
    // console.log('weaponOverallDeadDefenderResultsObj');
    // console.log(weaponOverallDeadDefenderResultsObj);
    // console.log('weaponOverallDefenderWipedObj');
    // console.log(weaponOverallDefenderWipedObj);
    // console.log('');
    // console.log('overAllResults');
    // console.log(overAllResults);
    // console.log('removing where no one was wounded or died')
    // console.log('wounded')
    // console.log(overAllResults.combinedKills.filter((result) => (result > 0)));
    // console.log('killed')
    // console.log(overAllResults.combinedWounds.filter((result) => (result > 0)))
    // console.log(`results array: ${resultsArr}`);

    // console.log(`${inputAttackerCount.value} ${selectedAttackerUnit} using ${selectedAttackerWeapon} against ${selectedDefenderUnit} did:`);

    //get the average per weapom
    for(const result in weaponOverallResultsObj){
        // console.log(weaponOverallResultsObj[result]);
        //calculate average
        let totalSimulationDamage = 0;
        weaponOverallResultsObj[result].forEach((count) => { 
            // console.log(count)
            totalSimulationDamage += parseInt(count);
            // console.log(totalSimulationDamage);
        });
        weaponOverallResultsObj[result].average = totalSimulationDamage/simulations;
    }

    // console.log(`weaponOverallResultsObj:`)
    // console.log(weaponOverallResultsObj);

    for(const result in weaponOverallDeadDefenderResultsObj){
        let totalSimulationKills = 0;
        weaponOverallDeadDefenderResultsObj[result].forEach((count) => { 
            totalSimulationKills += parseInt(count);
        });
        weaponOverallDeadDefenderResultsObj[result].average = totalSimulationKills/simulations;
    }

    // console.log(`weaponOverallDeadDefenderResultsObj:`)
    // console.log(weaponOverallDeadDefenderResultsObj)

    // console.log(weaponOverallResultsObj[result]);
    //calculate average
    let totalSimulationDamage = 0;
    overAllResults.combinedWounds.forEach((count) => { 
        // console.log(count)
        totalSimulationDamage += parseInt(count);
        // console.log(totalSimulationDamage);
    });
    overAllResults.combinedWoundsAverage = totalSimulationDamage/simulations;

    let totalSimulationKills = 0;
    overAllResults.combinedKills.forEach((count) => { 
        totalSimulationKills += parseInt(count);
    });
    overAllResults.combinedKillsAverage = totalSimulationKills/simulations;

    overAllResults.combinedWipesAverage = ((100/simulations)*overAllResults.combinedWipes.length).toFixed(2)*1;

    // console.log('overAllResults');
    // console.log(overAllResults);
    
    let averageReanimations = 0;
    let averageReanimationHeal = 0;
    if(necronsReanimation){
        let totalSimulationReanimations = 0;
        reanimationModelsReanimated.forEach((result) => { 
            totalSimulationReanimations += result;
        });
        averageReanimations = (totalSimulationReanimations/reanimationModelsReanimated.length).toFixed(2)*1;
        // console.log(`on average ${averageReanimations} models reanimated`);
        let totalSimulationReanimationHeal = 0;
        reanimationWoundsHealed.forEach((result) => { 
            totalSimulationReanimationHeal += result;
        });
        averageReanimationHeal = (totalSimulationReanimationHeal/reanimationWoundsHealed.length).toFixed(2)*1;
        // console.log(`averageReanimations: ${averageReanimations}`);
        // console.log(`averageReanimationHeal: ${averageReanimationHeal}`);
    }

    let averageTankShockDamage = 0;
    if(stratagemTankShock){
        let totalTankShockDamage = 0;
        tankShockArr.forEach((result) => { 
            totalTankShockDamage += result;
        });
        averageTankShockDamage = totalTankShockDamage/simulations;
        // console.log(`on average tank shock did ${averageTankShockDamage} damage`);
    }
    let averageGrenadeDamage = 0;
    if(stratagemGrenade){
        let totalgrenadeDamage = 0;
        grenadeArr.forEach((result) => { 
            totalgrenadeDamage += result;
        });
        averageGrenadeDamage = totalgrenadeDamage/simulations;
        // console.log(`on average grenades did ${averageGrenadeDamage} damage`);
    }

    // console.log(`true average kills over ${simulations} simulations: ${averageKills}`);
    // console.log(`rounded average kills over ${simulations} simulations: ${Math.round(averageKills)}`);

    // console.log(`percentage chance to fully wipe the target unit: ${(100/simulations)*defenderWipedArr.length}%`);

    let hazardousAverage = 0;
    if(hazardous){
        let totalHazardousDamage = 0;
        hazardousResults.forEach(result => {
            totalHazardousDamage += result;
        })
        hazardousAverage = totalHazardousDamage/simulations;
    }

    // console.log('');

    let necronReanimationString = '';
    if(necronsReanimation){
        necronReanimationString = `<div>But on average <span class="value">${averageReanimationHeal}</span> wounds were regenerated</div><div> and <span class="value">${averageReanimations}</span> models reanimated in the next command phase</div>`;
    }

    let hazardousString = '';
    if(hazardous){
        if(attackerKeywords.includes('Character') || attackerKeywords.includes('Monster') || attackerKeywords.includes('Vehicle')){
            hazardousString = `<div class="simulation_hazardous">And does <span class="value">${hazardousAverage}</span> damage to itself on average</div>`;
        }else{
            hazardousString = `<div class="simulation_hazardous">And kills <span class="value">${hazardousAverage}</span> of its hazardous models on average</div>`;
        }
    }

    let tankShockString = '';
    if(stratagemTankShock){
        tankShockString = `<div class="simulation_title">Tank Shock</div><div>Average damage: <span class="value">${averageTankShockDamage}</span></div>`
    }

    let grenadeString = '';
    if(stratagemGrenade){
        grenadeString = `<div class="simulation_title">Grenade</div><div>Average damage: <span class="value">${averageGrenadeDamage}</span></div>`
    }

    // console.log(weaponOverallResultsObj);
    // console.log(weaponOverallDeadDefenderResultsObj)

    let weaponsStrings = '';
    let weaponsBarString = '';

    let unitName = '';
    // weaponStats[chosenWeaponNameDif].unitName

    // console.log(weaponStats);

    weaponSelectEls.forEach( weaponEl => {

        chosenWeaponName = weaponEl.getAttribute('data-weapon');
        chosenWeaponNameDif = chosenWeaponName + '-' + weaponEl.getAttribute('data-weapon-extra');

        if(unitName != weaponStats[chosenWeaponNameDif].unitName){
            unitName = weaponStats[chosenWeaponNameDif].unitName
            weaponsStrings += `<div class="simulation_title">${unitName}</div>`;
        }

        weaponsStrings += `<div class="simulation_title">${weaponStats[chosenWeaponNameDif].name}</div><div>Average damage: <span class="value">${weaponOverallResultsObj[chosenWeaponNameDif].average}</span></div><div>Average kills: <span class="value">${weaponOverallDeadDefenderResultsObj[chosenWeaponNameDif].average}</span></div>`;
        // weaponsBarString += `<div class="inner_bar inner_bar-${weaponStats[chosenWeaponName].name}-${weaponStats[chosenWeaponName].weaponMeleeRanged}"></div>`;
    });

    informationHTML = `<div class="simulation_header">Over <span class="value">${simulations}</span> simulations:</div><div class="simulation_title">Total</div><div>Average damage (rounded): <span class="value">${Math.round(overAllResults.combinedWoundsAverage)}</span></div><div>Average kills (rounded): <span class="value">${Math.round(overAllResults.combinedKillsAverage)}</span></div>${weaponsStrings}${grenadeString}${tankShockString}${necronReanimationString}<div class="simulation_kill_perc">percentage chance to fully wipe the target unit: <span class="value">${overAllResults.combinedWipesAverage}%</span></div>${hazardousString}`;

    informationContainer.innerHTML = informationHTML;

    //make the chart
    counter = {};
    for(const count in overAllResults.combinedWounds){
        if (counter[overAllResults.combinedWounds[count]]) {
            counter[overAllResults.combinedWounds[count]] += 1;
        } else {
            counter[overAllResults.combinedWounds[count]] = 1;
        }
    }
    // console.log(counter);



    let barHTML = '';
    let maxMinArr = Object.values(counter);
    // let min = Math.min(...maxMinArr);
    let max = Math.max(...maxMinArr);
    for (const count in counter) {
        // console.log(`${count}: ${counter[count]}`);
        barHTML += `<div class='bar' id='bar_${count}' style='height:${100/(max/counter[count])}%; width:calc(${100/maxMinArr.length}% - 10px); margin: 0px 5px;'><div class='label'>${count}<span class='sublabel'>${counter[count]}</span></div></div>`; 
    }

    document.querySelector('#chart').innerHTML = barHTML;

    let closestBarNum = 0;
    let closestBarNumPos = 0;
    let closestBarNumNeg = 0;
    // if(rollDamage){
    closestBarNum = Math.round(overAllResults.combinedWoundsAverage);
    closestBarNumPos = Math.ceil(overAllResults.combinedWoundsAverage);
    closestBarNumNeg = Math.floor(overAllResults.combinedWoundsAverage);
    if(document.querySelector(`#bar_${closestBarNum}`) === null){
        let searching = true;
        while(searching){
            if(document.querySelector(`#bar_${closestBarNumPos}`) !== null && document.querySelector(`#bar_${closestBarNumNeg}`) !== null){
                if((closestBarNumPos - closestBarNum) < (closestBarNum - closestBarNumNeg)){
                    closestBarNum = closestBarNumPos;
                }else{
                    closestBarNum =  closestBarNumNeg;
                }
                searching = false;
            }else if(document.querySelector(`#bar_${closestBarNumPos}`) !== null){
                closestBarNum = closestBarNumPos;
                searching = false;
            }else if(document.querySelector(`#bar_${closestBarNumNeg}`) !== null){
                closestBarNum = closestBarNumNeg;
                searching = false;
            }else{
                closestBarNumPos = closestBarNumPos + 1;
                closestBarNumNeg = closestBarNumNeg - 1;
            }
        }
    }

    document.querySelector(`#bar_${closestBarNum}`).classList.add('average');

}

function generateFactionSelectHtml(){
    let defenderHTMLOut = '<option value="null">-</option>';
    let attackerHTMLOut = '<option value="null">-</option>';

    Object.keys(data)
        .sort()
        .forEach(function(faction, i) {
            let factionData = data[faction];
            defenderHTMLOut += `<option value="${faction}">${factionData.name}</option>`;
            attackerHTMLOut += `<option value="${faction}">${factionData.name}</option>`;
        });

    return {
        defender: defenderHTMLOut,
        attacker: attackerHTMLOut
    }
}

function generateUnitSelectHtml(selectedFaction){
    let HTMLOut = '<option value="null">-</option>';
    let factionData = data[selectedFaction]

    Object.keys(factionData.units)
        .sort()
        .forEach(function(unit, i) {
            let unitData = factionData.units[unit];
            HTMLOut += `<option value="${unit}">${unitData.name}</option>`;
        });

    return HTMLOut;
}

function generateWeaponSelectHtml(selectedFaction, selectedUnit){
    let HTMLOut = '<option value="null">-</option>';
    let unitData = data[selectedFaction].units[selectedUnit];

    if(Object.keys(unitData.weapons.ranged).length != 0){
        HTMLOut += `<option value="ranged" disabled>-RANGED-</option>`;

        for (const weapon in unitData.weapons.ranged){
            let weaponData = unitData.weapons.ranged[weapon];

            // console.log(weapon)
            // console.log(weaponData)

            if(weaponData.hasOwnProperty('name')){
                HTMLOut += `<option value="${weapon}_ranged">${weaponData.name}</option>`;
            }else{
                HTMLOut += `<option value="${weapon}_ranged">${weaponData.data.name}</option>`;
            }

        }
    }

    if(Object.keys(unitData.weapons.melee).length != 0){
        HTMLOut += `<option value="melee" disabled>-MELEE-</option>`;

        for (const weapon in unitData.weapons.melee){
            let weaponData = unitData.weapons.melee[weapon];

            // console.log(weapon)
            // console.log(weaponData)

            if(weaponData.hasOwnProperty('name')){
                HTMLOut += `<option value="${weapon}_melee">${weaponData.name}</option>`;
            }else{
                HTMLOut += `<option value="${weapon}_melee">${weaponData.data.name}</option>`;
            }

        }
    }

    return HTMLOut;
}

function attackerFactionChange(){

    resetModifiers('attacker');

    //hide the extra attacker select
    document.querySelector('#attackers_extra_select').style.display = 'none';
    document.querySelectorAll('.select_container').forEach(el => el.style.height = 'calc( 25px * 2 )');
    //reet the attacker html bits
    weaponContainer.innerHTML = '';
    extraWeaponContainer.innerHTML = '';

    selectedAttackerFaction = attackerFactionSelectEl.value;
    attackerUnitSelectEl.innerHTML = generateUnitSelectHtml(selectedAttackerFaction);
    document.querySelector('.factionAttacker').querySelectorAll('.faction_modifier_container').forEach((element) => {
        element.style.display = 'none';
        element.querySelectorAll('input[type=checkbox]').forEach((el) => {
            el.checked = false;
        });
    });

    // console.log(selectedAttackerFaction);

    // console.log(document.querySelector(`#attacker_faction-${selectedAttackerFaction}`));

    if(selectedAttackerFaction == 'adeptusAstartes' || selectedAttackerFaction == 'blackTemplars' || selectedAttackerFaction == 'bloodAngels' || selectedAttackerFaction == 'darkAngels' || selectedAttackerFaction == 'deathwatch' || selectedAttackerFaction == 'spaceWolves'){
        if (selectedAttackerFaction == 'adeptusAstartes') {

            let adeptusAstartesArray = [
                'blackTemplars',
                'bloodAngels',
                'darkAngels',
                'deathwatch',
                'spaceWolves'
            ]
            adeptusAstartesArray.forEach((factionName) => {
                document.querySelector(`#attacker_faction-${factionName}`).style.display = 'block';
            });
                
        }else{
            document.querySelector(`#attacker_faction-adeptusAstartes`).style.display = 'block';
        }
    }

    document.querySelector(`#attacker_faction-${selectedAttackerFaction}`).style.display = 'block';

    //hide scenario modifiers
    document.querySelectorAll('.scenario_modifier:not(.scenario_cover)').forEach((element) => {
        element.style.display = 'none';
    });

    //faction abilities should turn on and
    //show some scenario boxes for specific factions
    showSetUpFactionAbilities();
}

function defenderFactionChange(){

    resetModifiers('defender');

    //hide the defender html bits
    document.querySelector('#defenderCont').innerHTML = '';

    selectedDefenderFaction = defenderFactionSelectEl.value;
    defenderUnitSelectEl.innerHTML = generateUnitSelectHtml(selectedDefenderFaction)
    document.querySelector('.factionDefender').querySelectorAll('.faction_modifier_container').forEach((element) => {
        element.style.display = 'none';
        element.querySelectorAll('input[type=checkbox]').forEach((el) => {
            el.checked = false;
        });
    });
    document.querySelector(`#defender_faction-${selectedDefenderFaction}`).style.display = 'block';

    //faction abilities should turn on
    showSetUpFactionAbilities();
}

function showSetUpFactionAbilities(){

    switch (selectedAttackerFaction) {
        case 'adeptaSororitas':
            document.querySelector(`#attackerBelowStartingStrength`).style.display = 'block'
            document.querySelector(`#attackerBelowHalfStrength`).style.display = 'block'
            break;
        case 'adeptusCustodes':
            document.querySelector(`#attackerBelowStartingStrength`).style.display = 'block'
            document.querySelector(`#attackerBelowHalfStrength`).style.display = 'block'
            break;
        case 'aeldari':
            document.querySelector(`#aeldariDetachmentUF`).checked = true;
            break;
        case 'astraMilitarum':
            document.querySelector(`#attackerBattleshocked`).style.display = 'block';
            break;
        case 'chaosKnights':
            document.querySelector(`#attackerBattleshocked`).style.display = 'block';
            document.querySelector(`#defenderBattleshocked`).style.display = 'block';
            break;
        case 'darkAngels':
            document.querySelector(`#attackerBattleshocked`).style.display = 'block';
            document.querySelector(`#attackerBelowStartingStrength`).style.display = 'block';
            break;
        case 'orks':
            document.querySelector(`#orksDetachmentGetStuckIn`).checked = true;
        break;
        case 'tauEmpire':
            break;
    }

    switch (selectedDefenderFaction) {
        case 'adeptusCustodes':
            document.querySelector(`#custodesDetachmentRuleAegis`).checked = true;
            break;
        case 'chaosKnights':
            document.querySelector(`#attackerBattleshocked`).style.display = 'block';
            document.querySelector(`#defenderBattleshocked`).style.display = 'block';
            break;
        case 'imperialKnights':
            document.querySelector(`#imperialKnightsDetachmentIndomitable`).checked = true;
            break;
        case 'necrons':
            document.querySelector(`#necronsArmyRuleReanimation`).checked = true;
            break;
    }
}

function attackerUnitChange(){

    resetModifiers('attacker');

    extraWeaponContainer.innerHTML = '';

    selectedAttackerUnit = attackerUnitSelectEl.value;
    let selectedAttackerData = data[selectedAttackerFaction].units[selectedAttackerUnit].tags;
    // attackerWeaponSelectEl.innerHTML = generateWeaponSelectHtml(selectedAttackerFaction, selectedAttackerUnit);

    populateWeaponContainer(selectedAttackerFaction, selectedAttackerUnit);

    //enhancements
    document.querySelector('.enhancementAttacker').querySelectorAll('.faction_enhancement_container').forEach((element) => {
        element.style.display = 'none';
        element.querySelectorAll('input[type=checkbox]').forEach((el) => {
            el.checked = false;
        });
    });
    let canHaveEnhancement = (selectedAttackerData.includes('Character') && !selectedAttackerData.includes('Epic Hero'));
    if(canHaveEnhancement){
        document.querySelector(`#attacker_enhancement-${selectedAttackerFaction}`).style.display = 'block';
    }

    if(data[selectedAttackerFaction].units[selectedAttackerUnit].hasOwnProperty('leader')){
        if(data[selectedAttackerFaction].units[selectedAttackerUnit].leader){

            let extraAttackerHTML = '<option value="null">-</option>';
            data[selectedAttackerFaction].units[selectedAttackerUnit].leaderUnits.forEach(unit => {
                let extraUnitData = data[selectedAttackerFaction].units[unit];
                extraAttackerHTML += `<option value="${unit}">${extraUnitData.name}</option>`;
            })

            document.querySelectorAll('.select_container').forEach(el => el.style.height = 'calc( 25px * 3 )');

            document.querySelector('#attackers_extra_select').innerHTML = extraAttackerHTML;

            //show a thing to turn on leader mode
            document.querySelector('#attackers_extra_select').style.display = 'block';

            //populate the weaponContainerExtra container with the led unit
            document.querySelector('#attackers_extra_select').addEventListener("change", function(){
                populateExtraWeaponContainer(selectedAttackerFaction, this.value)
            });
            document.querySelector('#weaponContainerExtra').style.display = 'block';
            
            
        }else{
            document.querySelectorAll('.select_container').forEach(el => el.style.height = 'calc( 25px * 2 )');
            document.querySelector('#attackers_extra_select').style.display = 'none';
            document.querySelector('#weaponContainerExtra').style.display = 'block';
        }
    }else{
        document.querySelectorAll('.select_container').forEach(el => el.style.height = 'calc( 25px * 2 )');
        document.querySelector('#attackers_extra_select').style.display = 'none';
        document.querySelector('#weaponContainerExtra').style.display = 'block';
    }

    //generic stratagems
    //hide all stratagems and untick all stratagem boxes
    document.querySelector('.stratagemAttacker').querySelectorAll('.faction_stratagem_sub_container').forEach((element) => {
        element.style.display = 'none';
        element.querySelectorAll('.faction_stratagem_container_element').forEach((el) => {
            el.style.display = 'none';
        });
        element.querySelectorAll('input[type=checkbox]').forEach((el) => {
            el.checked = false;
        });
    });

    //reveal the faction stratagems
    document.querySelector('.stratagemAttacker').querySelectorAll(`.faction_stratagem_sub_container-${selectedAttackerFaction}`).forEach((element) => {
        element.style.display = 'block';
        element.querySelectorAll('.faction_stratagem_container_element').forEach((el) => {
            el.style.display = 'block';
        });
    })

    //reveal relevant generic attacker stratagems
    if(selectedAttackerData.includes('Vehicle')){
        document.querySelector('.stratagemAttacker').querySelector(`.faction_stratagem_sub_container-generic`).style.display = 'block';
        document.querySelector(`#genericStratagemTankShockCont`).style.display = 'block';
    };
    if(selectedAttackerData.includes('Grenades')){
        document.querySelector('.stratagemAttacker').querySelector(`.faction_stratagem_sub_container-generic`).style.display = 'block';
        document.querySelector(`#genericStratagemGrenadeCont`).style.display = 'block';
    }
}

function defenderUnitChange(){

    resetModifiers('defender');

    selectedDefenderUnit = defenderUnitSelectEl.value;
    let selectedDefenderData = data[selectedDefenderFaction].units[selectedDefenderUnit].tags;
    populateDefender(selectedDefenderFaction, selectedDefenderUnit);
    document.querySelector('.enhancementDefender').querySelectorAll('.faction_enhancement_container').forEach((element) => {
        element.style.display = 'none';
        element.querySelectorAll('input[type=checkbox]').forEach((el) => {
            el.checked = false;
        });
    });
    let canHaveEnhancement = (selectedDefenderData.includes('Character') && !selectedDefenderData.includes('Epic Hero'));
    if(canHaveEnhancement){
        document.querySelector(`#defender_enhancement-${selectedDefenderFaction}`).style.display = 'block';
    }
    //hide all stratagems and untick all stratagem boxes
    document.querySelector('.stratagemDefender').querySelectorAll('.faction_stratagem_sub_container').forEach((element) => {
        element.style.display = 'none';
        element.querySelectorAll('.faction_stratagem_container_element').forEach((el) => {
            el.style.display = 'none';
        });
        element.querySelectorAll('input[type=checkbox]').forEach((el) => {
            el.checked = false;
        });
    });

    //reveal the faction stratagems
    document.querySelector('.stratagemDefender').querySelectorAll(`.faction_stratagem_sub_container-${selectedDefenderFaction}`).forEach((element) => {
        element.style.display = 'block';
        element.querySelectorAll('.faction_stratagem_container_element').forEach((el) => {
            el.style.display = 'block';
        });
    })

    if(selectedDefenderData.includes('Infantry')){
        document.querySelector('.stratagemDefender').querySelector(`.faction_stratagem_container`).style.display = 'block';
        document.querySelector(`#genericStratagemGroundCont`).style.display = 'block';
    };
    if(selectedDefenderData.includes('Smoke')){
        document.querySelector('.stratagemDefender').querySelector(`.faction_stratagem_container`).style.display = 'block';
        document.querySelector(`#genericStratagemSmokeCont`).style.display = 'block';
    };
}

function populateWeaponContainer(selectedFaction, selectedUnit){

    //populate the weapon container with options
    // console.log(data[selectedFaction].units[selectedUnit]);
    let weaponContainerHTML = '';
    let selectedUnitRangedWeapons = data[selectedFaction].units[selectedUnit].weapons.ranged;
    let selectedUnitMeleeWeapons = data[selectedFaction].units[selectedUnit].weapons.melee;

    if(Object.keys(selectedUnitRangedWeapons).length > 0){
        weaponContainerHTML += '<div class="bold weapon_type_label">Ranged</div>'
        for(const weapon in selectedUnitRangedWeapons){
            weaponContainerHTML += `<div class="weapon" id="weapon${weapon}-ranged-main"> <input type="checkbox" class="weapon_select" id="weaponSelect${weapon}-ranged" data-weapon-type="ranged" data-faction="${selectedFaction}" data-unit="${selectedUnit}" data-weapon="${weapon}" data-weapon-extra="main" /> <div class="weapon_label">${selectedUnitRangedWeapons[weapon].name}</div><div class="weapon_attribute"> <div class="label">No.</div><input type="text" id="attackerCount${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].maxPerUnit}"/> </div><div class="weapon_attribute"> <div class="label">A</div><input type="text" id="attacks${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].a}"/> </div><div class="weapon_attribute"> <div class="label">BS</div><input type="text" id="wbs${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].wbs}"/> </div><div class="weapon_attribute"> <div class="label">S</div><input type="text" id="strength${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].s}"/> </div><div class="weapon_attribute"> <div class="label">AP</div><input type="text" id="ap${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].ap}"/> </div><div class="weapon_attribute"> <div class="label">D</div><input type="text" id="damage${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].d}"/> </div><div class="label weapon_tags_label">Tags</div><input type="text" class="weapon_tags" id="weaponTags${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].tags.join(', ')}" /></div>`;
        }
    }

    if(Object.keys(selectedUnitMeleeWeapons).length > 0){
        weaponContainerHTML += '<div class="bold weapon_type_label">Melee</div>'
        for(const weapon in selectedUnitMeleeWeapons){
            weaponContainerHTML += `<div class="weapon" id="weapon${weapon}-melee-main"> <input type="checkbox" class="weapon_select" id="weaponSelect${weapon}-melee" data-weapon-type="melee" data-faction="${selectedFaction}" data-unit="${selectedUnit}" data-weapon="${weapon}" data-weapon-extra="main" /> <div class="weapon_label">${selectedUnitMeleeWeapons[weapon].name}</div><div class="weapon_attribute"> <div class="label">No.</div><input type="text" id="attackerCount${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].maxPerUnit}"/> </div><div class="weapon_attribute"> <div class="label">A</div><input type="text" id="attacks${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].a}"/> </div><div class="weapon_attribute"> <div class="label">WS</div><input type="text" id="wbs${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].wbs}"/> </div><div class="weapon_attribute"> <div class="label">S</div><input type="text" id="strength${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].s}"/> </div><div class="weapon_attribute"> <div class="label">AP</div><input type="text" id="ap${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].ap}"/> </div><div class="weapon_attribute"> <div class="label">D</div><input type="text" id="damage${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].d}"/> </div><div class="label weapon_tags_label">Tags</div><input type="text" class="weapon_tags" id="weaponTags${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].tags.join(', ')}" /></div>`;
        }
    }

    //add the atacker unit tags
    weaponContainerHTML += `<div class="attacker_tags_label">Keywords</div><textarea class="attacker_tags" id="attackerTags">${data[selectedFaction].units[selectedUnit].tags.join(', ')}</textarea>`;

    weaponContainer.innerHTML = weaponContainerHTML;

    registerWeaponClicks();
    
}

function populateExtraWeaponContainer(selectedFaction, selectedUnit){

    //populate the weapon container with options
    // console.log(data[selectedFaction].units[selectedUnit]);
    let weaponContainerHTML = '';
    let selectedUnitRangedWeapons = data[selectedFaction].units[selectedUnit].weapons.ranged;
    let selectedUnitMeleeWeapons = data[selectedFaction].units[selectedUnit].weapons.melee;

    if(Object.keys(selectedUnitRangedWeapons).length > 0){
        weaponContainerHTML += '<div class="bold weapon_type_label">Ranged</div>'
        for(const weapon in selectedUnitRangedWeapons){
            weaponContainerHTML += `<div class="weapon" id="weapon${weapon}-ranged-extra"> <input type="checkbox" class="weapon_select" id="weaponSelect${weapon}-ranged" data-weapon-type="ranged" data-faction="${selectedFaction}" data-unit="${selectedUnit}" data-weapon="${weapon}" data-weapon-extra="extra" /> <div class="weapon_label">${selectedUnitRangedWeapons[weapon].name}</div><div class="weapon_attribute"> <div class="label">No.</div><input type="text" id="attackerCount${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].maxPerUnit}"/> </div><div class="weapon_attribute"> <div class="label">A</div><input type="text" id="attacks${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].a}"/> </div><div class="weapon_attribute"> <div class="label">BS</div><input type="text" id="wbs${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].wbs}"/> </div><div class="weapon_attribute"> <div class="label">S</div><input type="text" id="strength${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].s}"/> </div><div class="weapon_attribute"> <div class="label">AP</div><input type="text" id="ap${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].ap}"/> </div><div class="weapon_attribute"> <div class="label">D</div><input type="text" id="damage${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].d}"/> </div><div class="label weapon_tags_label">Tags</div><input type="text" class="weapon_tags" id="weaponTags${weapon}-ranged" value="${selectedUnitRangedWeapons[weapon].tags.join(', ')}" /></div>`;
        }
    }

    if(Object.keys(selectedUnitMeleeWeapons).length > 0){
        weaponContainerHTML += '<div class="bold weapon_type_label">Melee</div>'
        for(const weapon in selectedUnitMeleeWeapons){
            weaponContainerHTML += `<div class="weapon" id="weapon${weapon}-melee-extra"> <input type="checkbox" class="weapon_select" id="weaponSelect${weapon}-melee" data-weapon-type="melee" data-faction="${selectedFaction}" data-unit="${selectedUnit}" data-weapon="${weapon}" data-weapon-extra="extra" /> <div class="weapon_label">${selectedUnitMeleeWeapons[weapon].name}</div><div class="weapon_attribute"> <div class="label">No.</div><input type="text" id="attackerCount${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].maxPerUnit}"/> </div><div class="weapon_attribute"> <div class="label">A</div><input type="text" id="attacks${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].a}"/> </div><div class="weapon_attribute"> <div class="label">WS</div><input type="text" id="wbs${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].wbs}"/> </div><div class="weapon_attribute"> <div class="label">S</div><input type="text" id="strength${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].s}"/> </div><div class="weapon_attribute"> <div class="label">AP</div><input type="text" id="ap${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].ap}"/> </div><div class="weapon_attribute"> <div class="label">D</div><input type="text" id="damage${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].d}"/> </div><div class="label weapon_tags_label">Tags</div><input type="text" class="weapon_tags" id="weaponTags${weapon}-melee" value="${selectedUnitMeleeWeapons[weapon].tags.join(', ')}" /></div>`;
        }
    }

    //add the atacker unit tags
    weaponContainerHTML += `<div class="attacker_tags_label">Keywords</div><textarea class="attacker_tags" id="attackerTags">${data[selectedFaction].units[selectedUnit].tags.join(', ')}</textarea>`;

    extraWeaponContainer.innerHTML = weaponContainerHTML;

    registerWeaponClicks();

}

function registerWeaponClicks(){

    let weaponSelectEls = document.querySelectorAll('.weapon_select');

    weaponSelectEls.forEach(el => {
        el.addEventListener("click", (event) => {
            let showHide = true;
            if(el.checked){
                showHide = true;
            }else{
                showHide = false;
            }
            let weaponTags = document.querySelector('#weaponTags'+el.getAttribute('data-weapon')+'-'+el.getAttribute('data-weapon-type')).value.split(', ');
            weaponTags.forEach( tag => {
                switch(tag.split('-')[0]){
                    case 'rapidFire':
                        showHideHalfRange(showHide)
                        break;
                    case 'lance':
                        showHideCharge(showHide)
                        break;
                    case 'indirectFire':
                        showHideLos(showHide)
                        break;
                    case 'melta':
                        showHideHalfRange(showHide)
                        break;
                    case 'heavy':
                        showHideMoved(showHide)
                        break;
                }
            })
        });
    });

}

function populateDefender(selectedFaction, selectedUnit){

    let selectedData = data[selectedFaction].units[selectedUnit];

    let defenderKeywordString = '';
    selectedData.tags.forEach((tag, index) => {
        defenderKeywordString += `${ (index > 0) ? ', ' : '' }${tag}`;
    });
    // defenderTags.value = defenderKeywordString;

    let defenderHTML = '';
    // if(!data[selectedFaction].units[selectedUnit].hasOwnProperty('extraUnit')){
        defenderHTML = `<div class="defender_stats" data-name="${selectedUnit}"><div class="defender_label">${selectedData.name}</div><div class="defender_attribute"><div class="label">No.</div><input type="text" id="defenderCount-${selectedUnit}" value="${selectedData.size}"/> </div><div class="defender_attribute"> <div class="label">T</div> <input type="text" id="toughness-${selectedUnit}" value="${selectedData.t}" /></div><div class="defender_attribute"> <div class="label">Sv</div> <input type="text" id="save-${selectedUnit}" value="${selectedData.sv}" /></div><div class="defender_attribute"> <div class="label">Invul</div> <input type="text" id="invul-${selectedUnit}" value="${selectedData.invSv}" /></div><div class="defender_attribute"> <div class="label">W</div> <input type="text" id="wounds-${selectedUnit}" value="${selectedData.w}" /></div><div class="defender_attribute"> <div class="label">FnP</div> <input type="text" id="fnp-${selectedUnit}" value="${selectedData.fnp}" /></div><div class="label defender_tags_label">Tags</div><textarea class="defender_tags" id="defenderTags-${selectedUnit}">${defenderKeywordString}</textarea></div>`;
    // }else{
        // let extraUnitData = data[selectedFaction].units[selectedUnit].extraUnit;
        // console.log(extraUnitData);
        // defenderHTML = `<div class="defender_stats" data-name="${selectedUnit}"><div class="defender_label">${extraUnitData.name}</div><div class="defender_attribute"><div class="label">No.</div><input type="text" id="defenderCount-${selectedUnit}" value="${1}"/> </div><div class="defender_attribute"> <div class="label">T</div> <input type="text" id="toughness-${selectedUnit}" value="${extraUnitData.t}" /></div><div class="defender_attribute"> <div class="label">Sv</div> <input type="text" id="save-${selectedUnit}" value="${extraUnitData.sv}" /></div><div class="defender_attribute"> <div class="label">Invul</div> <input type="text" id="invul-${selectedUnit}" value="${selectedData.invSv}" /></div><div class="defender_attribute"> <div class="label">W</div> <input type="text" id="wounds-${selectedUnit}" value="${extraUnitData.w}" /></div><div class="defender_attribute"> <div class="label">FnP</div> <input type="text" id="fnp-${selectedUnit}" value="${selectedData.fnp}" /></div><div class="label weapon_tags_label">Tags</div><input type="text" class="weapon_tags" id="defenderTags-${selectedUnit}" value="${defenderKeywordString}"/></div>`;
        // defenderHTML += `<div class="defender_stats" data-name="${selectedUnit}"><div class="defender_label">${selectedData.name}</div><div class="defender_attribute"><div class="label">No.</div><input type="text" id="defenderCount-${selectedUnit}" value="${selectedData.size}"/> </div><div class="defender_attribute"> <div class="label">T</div> <input type="text" id="toughness-${selectedUnit}" value="${selectedData.t}" /></div><div class="defender_attribute"> <div class="label">Sv</div> <input type="text" id="save-${selectedUnit}" value="${selectedData.sv}" /></div><div class="defender_attribute"> <div class="label">Invul</div> <input type="text" id="invul-${selectedUnit}" value="${selectedData.invSv}" /></div><div class="defender_attribute"> <div class="label">W</div> <input type="text" id="wounds-${selectedUnit}" value="${selectedData.w}" /></div><div class="defender_attribute"> <div class="label">FnP</div> <input type="text" id="fnp-${selectedUnit}" value="${selectedData.fnp}" /></div><div class="label weapon_tags_label">Tags</div><input type="text" class="weapon_tags" id="defenderTags-${selectedUnit}" value="${defenderKeywordString}"/></div>`;
    // }

    document.querySelector('#defenderCont').innerHTML = defenderHTML;

}

function resetModifiers(target){

    let targetEl = modifiersEl.querySelector(`.${target}`);

    //reset checkbox inputs
    targetEl.querySelectorAll('input[type=checkbox]').forEach((el) => {
        el.checked = false;
    });

    //reset text inputs
    targetEl.querySelectorAll('input[type=text]').forEach((el) => {
        el.value = '';
    });

    //set critical inputs to 6
    document.querySelector('#criticalHit').value = '6'
    document.querySelector('#criticalWound').value = '6'

    if(target == 'attacker'){
        //also reset the scenario modifiers
        halfRangeContainer.style.display = 'none';
        halfRangeInput.checked = false;
        chargedContainer.style.display = 'none';
        chargedInput.checked = false;
        losContainer.style.display = 'none';
        losInput.checked = false;
        movedContainer.style.display = 'none';
        movedInput.checked = false;
    }

}

// function toggleScenarioVisible(){
    // console.log(`scenarioContainerExpanded: ${scenarioContainerExpanded}`);
    // console.log(`height: ${document.querySelector('#scenarioModifiers').querySelector('.attacker').scrollHeight+'px'}`);
//     if(!scenarioContainerExpanded){
//         document.querySelector('#scenarioToggle').innerHtml = htmlUpArrow;
//         scenarioContainerExpanded = true;
//         document.getElementById('scenarioModifiers').style.height = document.querySelector('#scenarioModifiers').querySelector('.attacker').scrollHeight+'px';
//     }else{
//         document.querySelector('#scenarioToggle').innerHtml = htmlDownArrow;
//         scenarioContainerExpanded = false;
//         document.getElementById('scenarioModifiers').style.height = '40px';
//     }
// }
// function toggleStratagemVisible(){
    // console.log(`stratagemContainerExpanded: ${stratagemContainerExpanded}`);
    // console.log(`height: ${document.querySelector('#stratagems').querySelector('.attacker').scrollHeight+'px'}`);
//     if(!stratagemContainerExpanded){
//         document.querySelector('#stratagemToggle').innerHtml = htmlUpArrow;
//         stratagemContainerExpanded = true;
//         document.getElementById('stratagems').style.height = document.querySelector('#stratagems').querySelector('.attacker').scrollHeight+'px';
//     }else{
//         document.querySelector('#stratagemToggle').innerHtml = htmlDownArrow;
//         stratagemContainerExpanded = false;
//         document.getElementById('stratagems').style.height = '40px';
//     }
// }
// function toggleEnhancementVisible(){
    // console.log(`enhancementContainerExpanded: ${enhancementContainerExpanded}`);
    // console.log(`height: ${document.querySelector('#enhancement').querySelector('.attacker').scrollHeight+'px'}`);
//     if(!enhancementContainerExpanded){
//         document.querySelector('#enhancementToggle').innerHtml = htmlUpArrow;
//         enhancementContainerExpanded = true;
//         document.getElementById('enhancement').style.height = document.querySelector('#enhancement').querySelector('.attacker').scrollHeight+'px';
//     }else{
//         document.querySelector('#enhancementToggle').innerHtml = htmlDownArrow;
//         enhancementContainerExpanded = false;
//         document.getElementById('enhancement').style.height = '40px';
//     }
// }
// function toggleFactionModifiersVisible(){
    // console.log(`factionModifiersContainerExpanded: ${factionModifiersContainerExpanded}`);
    // console.log(`height: ${document.querySelector('#factionModifiers').querySelector('.attacker').scrollHeight+'px'}`);
//     if(!factionModifiersContainerExpanded){
//         document.querySelector('#factionModifiersToggle').innerHtml = htmlUpArrow;
//         factionModifiersContainerExpanded = true;
//         document.getElementById('factionModifiers').style.height = document.querySelector('#factionModifiers').querySelector('.attacker').scrollHeight+'px';
//     }else{
//         document.querySelector('#factionModifiersToggle').innerHtml = htmlDownArrow;
//         factionModifiersContainerExpanded = false;
//         document.getElementById('factionModifiers').style.height = '40px';
//     }
// }

function toggleModifiersVisible(){
    if(!modifierContainerExpanded){
        document.querySelector('#modifierToggle').innerHTML = htmlUpArrow;
        document.querySelectorAll('.modifier_title').forEach(el => {
            el.style.opacity = '1';
        })
        modifierContainerExpanded = true;
        document.getElementById('modifiers').style.height = document.querySelector('#modifiers').querySelector('.attacker').scrollHeight+'px';
    }else{
        document.querySelector('#modifierToggle').innerHTML = htmlDownArrow;
        document.querySelectorAll('.modifier_title').forEach(el => {
            el.style.opacity = '0';
        })
        modifierContainerExpanded = false;
        document.getElementById('modifiers').style.height = '50px';
    }
}

function showHideHalfRange(show){
    if(show){
        halfRangeContainer.style.display = 'block';
    }else{
        halfRangeContainer.style.display = 'none';
    }
}

function showHideCharge(show){
    if(show){
        chargedContainer.style.display = 'block';
    }else{
        chargedContainer.style.display = 'none';
    }
}

function showHideLos(show){
    if(show){
        losContainer.style.display = 'block';
    }else{
        losContainer.style.display = 'none';
    }
}

function showHideMoved(show){
    if(show){
        movedContainer.style.display = 'block';
    }else{
        movedContainer.style.display = 'none';
    }
}

//hide all faction modifier containers
document.querySelectorAll('.faction_modifier_container').forEach((element, index) => {
    element.style.display = 'none';
})

//hide all stratagems
document.querySelector('.stratagemAttacker').querySelectorAll('.faction_stratagem_sub_container').forEach((element) => {
    element.style.display = 'none';
    element.querySelectorAll('.faction_stratagem_container_element').forEach((el) => {
        el.style.display = 'none';
    });
    element.querySelectorAll('input[type=checkbox]').forEach((el) => {
        el.checked = false;
    });
});

document.querySelector('.stratagemDefender').querySelectorAll('.faction_stratagem_sub_container').forEach((element) => {
    element.style.display = 'none';
    element.querySelectorAll('.faction_stratagem_container_element').forEach((el) => {
        el.style.display = 'none';
    });
    element.querySelectorAll('input[type=checkbox]').forEach((el) => {
        el.checked = false;
    });
});

//hide all faction enhancement containers
document.querySelectorAll('.faction_enhancement_container').forEach((element, index) => {
    element.style.display = 'none';
})

//button to toggle modifier visibility
// document.querySelector('#scenarioToggle').onclick = toggleScenarioVisible;
// document.querySelector('#stratagemToggle').onclick = toggleStratagemVisible;
// document.querySelector('#enhancementToggle').onclick = toggleEnhancementVisible;
// document.querySelector('#factionModifiersToggle').onclick = toggleFactionModifiersVisible;
document.querySelector('#modifierToggle').onclick = toggleModifiersVisible;

//set up the button to run the simulation
document.querySelector('#calculate').onclick = simulateAttackSequence;

//populate the selects with any data i have preprogrammed

let factionSelectHTML = generateFactionSelectHtml();

attackerFactionSelectEl.innerHTML = factionSelectHTML.attacker;
defenderFactionSelectEl.innerHTML = factionSelectHTML.attacker;

attackerFactionSelectEl.addEventListener("change", attackerFactionChange);
defenderFactionSelectEl.addEventListener("change", defenderFactionChange);

attackerUnitSelectEl.addEventListener("change", attackerUnitChange);
defenderUnitSelectEl.addEventListener("change", defenderUnitChange);

//setting up the checkboxes that trigger other modifiers to appear
rapidFireEl.addEventListener("change", showHideHalfRange);
meltaEl.addEventListener("change", showHideHalfRange);
lanceEl.addEventListener("change", showHideCharge);
indirectFireEl.addEventListener("change", showHideLos);
heavyEl.addEventListener("change", showHideMoved);
mechanicusAttackerProtectorEl.addEventListener("change", showHideMoved);

//any triggers for enhancements
document.getElementById("bloodAngelsEnhancementAttackerShard").addEventListener("change", () => {
    if(document.getElementById("bloodAngelsEnhancementAttackerShard").checked){
        chargedContainer.style.display = 'block';
    }else{
        chargedContainer.style.display = 'none';
        chargeInput.checked = false;
    }
});

document.getElementById("worldEatersEnhancementGlaive").addEventListener("change", () => {
    if(document.getElementById("worldEatersEnhancementGlaive").checked){
        chargedContainer.style.display = 'block';
    }else{
        chargedContainer.style.display = 'none';
        chargeInput.checked = false;
    }
});

let modifierAttackerHeight = document.querySelector('#modifiers').querySelector('.attacker').scrollHeight;

console.log(data);

/* CHECK TO CATCH ANY DATA WHERE UNIT SIZE = 0 */
// for(const faction in data){
//     for(const unit in data[faction].units){
//         if(data[faction].units[unit].size == 0){
            // console.log(data[faction].units[unit].name);
            // console.log(data[faction].units[unit].size);
//         }
//     }
// }
// let outHTML = '{';
// for(const faction in data){
//     outHTML += `${faction}: `
//     for(const unit in data[faction].units){
//         // console.log(data[faction].units[unit]);
//     }
//     outHTML += `,`
// }
// document.querySelector('#testOut').innerText = outHTML; 

/* CHECK TO CATCH THE UNITS WHOS SHEETS ARE MESSED UP */

// for(const faction in data){
    // console.log(faction)
    // for(const unit in data[faction].units){
        // if(data[faction].units[unit].size == 0){
            // console.log(data[faction].units[unit].name);
            // console.log(data[faction].units[unit].size);
        // }
        // if(!data[faction].units[unit].tags.includes(data[faction].units[unit].name) && !data[faction].units[unit].tags.includes(data[faction].units[unit].name.replace('World Eaters ',''))){
            // if(!data[faction].units[unit].tags.includes('Shield-Captain') && !data[faction].units[unit].tags.includes('Daemon Prince') && !data[faction].units[unit].tags.includes('Daemon Prince With Wings') && !data[faction].units[unit].tags.includes('Spawn') && !data[faction].units[unit].tags.includes('Berzerkers')){
                // console.log(data[faction].units[unit].name);
                // console.log(data[faction].units[unit].tags)
            // }
        // }
    // }
// }
// let outHTML = '{';
// for(const faction in data){
//     outHTML += `${faction}: `
//     for(const unit in data[faction].units){
//         // console.log(data[faction].units[unit]);
//     }
//     outHTML += `,`
// }
// document.querySelector('#testOut').innerText = outHTML;
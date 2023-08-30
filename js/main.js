const modifiersEl = document.querySelector('#modifiers');

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

const defenderTags = document.querySelector('#defenderTags')

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

let selectedAttackerUnit = '';
let selectedDefenderUnit = '';

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
    }
    // console.log(`string: ${string}`);
    return string;
}

//function that actually does all the bits
function simulateAttackSequence() {

    // console.log('')
    // console.log('NEW RUN')

    let simulations = parseInt(document.querySelector('#simulations').value);


    //do any faction stuff that needs to happen before the simulations start!
    // if(selectedAttackerFaction){

    // }
    // let sustainedHits = document.getElementById("sustainedHits").checked;
    // let sustainedHitsCount = parseInt(document.querySelector('#sustainedHitsCount').value)


    //number of attackers
    let attackerCount = parseInt(document.querySelector('#attackerCount').value);

    //number of defenders
    let defenderCount = parseInt(document.querySelector('#defenderCount').value);

    //attacks
    let attackString = document.querySelector('#attacks').value;
    let rollAttacks = false;
    if(attackString.includes("d") || attackString.includes("D")){
        rollAttacks = true;
    }else{
        attackString = parseInt(attackString);
        rollAttacks = false;    
    }

    //weapon/balistic skill
    let hit = parseInt(document.querySelector('#wbs').value);

    //strength
    let strength = parseInt(document.querySelector('#strength').value);

    //armour piercing
    let ap = parseInt(document.querySelector('#ap').value);
    if(ap < 0){
        ap = ap*-1;
    }
    // console.log(`ap: ${ap}`) 

    //damage
    let damageString =  document.querySelector('#damage').value;
    let rollDamage = false;
    if(damageString.includes("d") || damageString.includes("D")){
        rollDamage = true;
    }else{
        damageString = parseInt(damageString);
        rollDamage = false;    
    }

    //toughness
    let toughness = parseInt(document.querySelector('#toughness').value);

    //save
    let save = parseInt(document.querySelector('#save').value)
    
    //invulnerable save
    let invul = parseInt(document.querySelector('#invul').value);
    
    //wounds
    let wounds = parseInt(document.querySelector('#wounds').value);
    let remainingDefenderWounds = wounds;
    let deadDefenders = 0;
    
    //feel no pain
    let fnp = parseInt(document.querySelector('#fnp').value);


    //attacker modifiers
    let criticalHit = parseInt(document.querySelector('#criticalHit').value);
    if(isNaN(criticalHit)){
        criticalHit = 6;
    }
    let criticalWound = parseInt(document.querySelector('#criticalWound').value);
    if(isNaN(criticalWound)){
        criticalWound = 6;
    }
    let assault = document.getElementById("assault").checked; /* doesnt actually modify the results */
    let rapidFire = rapidFireEl.checked;
    let rapidFireCount = document.getElementById("rapidFireCount").value;
    let ignoresCover = document.getElementById("ignoresCover").checked;
    let twinLinked = document.getElementById("twinLinked").checked;
    // let pistol = document.getElementById("pistol").checked; /* doesnt actually modify the results */
    let torrent = document.getElementById("torrent").checked;
    let lethalHits = document.getElementById("lethalHits").checked;
    let lance = lanceEl.checked;
    let indirectFire = indirectFireEl.checked;
    let precision = document.getElementById("precision").checked; /* doesnt actually modify the results UNTIL I ADD CHARACTERS IN UNITS */
    let psychic = document.getElementById("psychic").checked;
    let blast = document.getElementById("blast").checked;
    let melta = meltaEl.checked;
    let meltaCount = parseInt(document.getElementById("meltaCount").value);
    let heavy = heavyEl.checked;
    let hazardous = document.getElementById("hazardous").checked; /* doesnt actually modify the results unless i add something to see how much damage the attacker does to itself? */
    let devastatingWounds = document.getElementById("devastatingWounds").checked;
    let sustainedHits = document.getElementById("sustainedHits").checked;
    let sustainedHitsCount = parseInt(document.querySelector('#sustainedHitsCount').value)
    let extraAttacks = document.getElementById("extraAttacks").checked;
    let anti = document.getElementById("anti").checked;
    let antiType = document.getElementById("antiType").value;
    let antiValue = document.querySelector('#antiValue').value;
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

    //defender modifiers
    let defenderKeywords = defenderTags.value;
    let cover = document.getElementById("cover").checked;
    let stealth = document.getElementById("stealth").checked;

    //can never be more than 1 or less than -1
    let hitModifier = 0;
    let woundModifier = 0;
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

    if(attackerBelowHalfStrength){
        attackerBelowStartingStrength = true;
    }

    if(defenderBelowHalfStrength){
        defenderBelowStartingStrength = true;
    }

    //Adepta Sororitas
    
    let sororitasBoM = document.getElementById("adeptaSororitasDetachmentBoM").checked;

    if(sororitasBoM && attackerBelowHalfStrength){
        hitModifier += 1;
        woundModifier += 1;
    }else if(sororitasBoM && attackerBelowStartingStrength){
        hitModifier += 1;
    }

    let sororitasBlade = document.getElementById("adeptaSororitasEnhancementBlade").checked;
    let sororitasMantle = document.getElementById("adeptaSororitasEnhancementMantle").checked;

    if(sororitasBlade && attackerBelowStartingStrength && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 2);
        }
        strength += 1;
    }else if(sororitasBlade && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        strength += 1;
    }

    //Adeptus Custodes

    let custodesDacatari = document.getElementById("custodesArmyRuleDacatari").checked;
    let custodesRendax = document.getElementById("custodesArmyRuleRendax").checked;
    let custodesKaptaris = document.getElementById("custodesArmyRuleKaptaris").checked;
    let custodesAegis = document.getElementById("custodesDetachmentRuleAegis").checked;

    if(custodesDacatari && weaponMeleeRanged == 'melee' && !sustainedHits){
        sustainedHits = true;
        sustainedHitsCount = 1;
    }

    if(custodesRendax && weaponMeleeRanged == 'melee'){
        lethalHits = true;
    }

    if(custodesKaptaris && weaponMeleeRanged == 'melee'){
        hitModifier = hitModifier - 1;
    }

    let custodesBlade = document.getElementById("custodesEnhancementBlade").checked;

    if(custodesBlade && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 2);
        }
    }

    //Adeptus Mechanicus
    let mechanicusAttackerProtector = mechanicusAttackerProtectorEl.checked;
    let mechanicusConqueror = document.getElementById("mechanicusArmyRuleConqueror").checked;
    let mechanicusDefenderProtector = document.getElementById("mechanicusArmyRuleDefenderProtector").checked;
    
    if(mechanicusAttackerProtector && weaponMeleeRanged == 'ranged'){
        heavy = true;
    }

    if(mechanicusConqueror && weaponMeleeRanged == 'ranged'){
        assault = true;
        ap += 1;
    }

    if(mechanicusDefenderProtector  && weaponMeleeRanged == 'ranged'){
        if(ap > 0){
            ap = ap - 1;
        }
    }

    let mechanicusOmni = document.getElementById("adeptusMechanicusEnhancementOmni").checked;
    
    if(mechanicusOmni && weaponMeleeRanged == 'ranged'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 3);
        }
        //add anti infantry 2 and anti monster 4
        anti = true;
        if(antiType == ''){
            antiType += 'Infantry, Monster';
            antiValue += '2, 4'
        }else{
            antiType += ', Infantry, Monster';
            antiValue += ', 2, 4'
        }
    }

    //Aeldari
    let aeldariUnparalleledForesight = document.getElementById("aeldariDetachmentUF").checked;
    
    if(aeldariUnparalleledForesight){
        rerollSingleHit = true;
        rerollSingleWound = true;
    }

    let aeldariAttackerMessenger = document.getElementById("aeldariEnhancementAttackerMessenger").checked;
    let aeldariDefenderMessenger = document.getElementById("aeldariEnhancementDefenderMessenger").checked;

    if(aeldariAttackerMessenger){
        oneRerollAttackChain = true;
    }

    if(aeldariDefenderMessenger){
        rerollSingleSave = true;
    }

    //Astra Militarum
    let militarumBayonets = document.getElementById("astraMilitarumArmyRuleAttackerBayonets").checked;
    let militarumAim = document.getElementById("astraMilitarumArmyRuleAttackerAim").checked;
    let militarumFire = document.getElementById("astraMilitarumArmyRuleAttackerFire").checked;
    let militarumBornSoldiers = document.getElementById("astraMilitarumDetachmentBornSoldiers").checked;
    let militarumCover = document.getElementById("astraMilitarumArmyRuleAttackerCover").checked;

    if(militarumBayonets && weaponMeleeRanged == 'melee' && hit > 2){
        hit = hit - 1;
    }

    if(militarumAim && weaponMeleeRanged == 'ranged' && hit > 2){
        hit = hit - 1;
    }

    if(militarumFire && rapidFire){
        // console.log(`attack string before First Rank Fire: ${attackString}`);
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        // console.log(`attack string after First Rank Fire: ${attackString}`);
    }

    if(militarumBornSoldiers && !lethalHits && weaponMeleeRanged == 'ranged'){
        lethalHits = true;
    }

    if(militarumCover && save > 3){
        save = save - 1;
    }

    //black templars
    let templarsUnclean = document.getElementById("blackTemplarsDetachmentTemplarVowsUnclean").checked;
    let templarsHonour = document.getElementById("blackTemplarsDetachmentTemplarVowsHonour").checked;
    let templarsWitchAttacker = document.getElementById("blackTemplarsDetachmentTemplarVowsWitchAttacker").checked;
    let templarsWitchDefender = document.getElementById("blackTemplarsDetachmentTemplarVowsWitchDefender").checked;
    let templarsChallenge = document.getElementById("blackTemplarsDetachmentTemplarVowsUncleanChallenge").checked;

    if(templarsUnclean && weaponMeleeRanged == 'melee'){
        lethalHits = true;
    }

    if(templarsHonour && psychic && (fnp > 5 || fnp == 0 || isNaN(fnp))){
        fnp = 5;
    }


    if(templarsWitchAttacker && defenderKeywordsArray.includes('Psyker') && weaponMeleeRanged == 'melee'){
        anti = true;
        if(antiType == ''){
            antiType += 'Psyker';
            antiValue += '4'
        }else{
            antiType += ', Psyker';
            antiValue += ', 4'
        }
    }

    if(templarsWitchDefender && psychic && (invul == 0 || invul > 4)){
        invul = 4;
    }

    if(templarsChallenge && weaponMeleeRanged == 'melee' && !sustainedHits){
        sustainedHits = true;
        sustainedHitsCount = 1;
    }

    let templarsPerdition = document.getElementById("blackTemplarsEnhancementPerdition").checked;
    let templarsWitchseeker = document.getElementById("blackTemplarsEnhancementWitchseeker").checked;
    let templarsSigismund = document.getElementById("blackTemplarsEnhancementSigismund").checked;
    let templarsTanhauser = document.getElementById("blackTemplarsEnhancementTanhauser").checked;

    if(templarsPerdition && weaponMeleeRanged == 'melee'){
        ap += 1;
        strength += 1;

        if(templarsUnclean && !extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
    }

    if(templarsWitchseeker && weaponMeleeRanged == 'ranged'){
        devastatingWounds = true;
        precision = true;
        anti = true;
        if(antiType == ''){
            antiType += 'Psyker';
            antiValue += '4'
        }else{
            antiType += ', Psyker';
            antiValue += ', 4'
        }

        if(templarsWitchAttacker && defenderKeywordsArray.includes('Psyker')){
            rerollAllHits = true;
            rerollAllWounds = true;
        }
    }

    if(templarsSigismund && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        if(templarsChallenge && criticalHit > 5/* && leadingUnit*/){
            criticalHit = 5;
        }
    }

    if(templarsTanhauser){
        halveDamage = true;
        if(templarsHonour && (fnp > 5 || fnp == 0 || isNaN(fnp))/* && leadingUnit*/){
            fnp = 5;
        }
    }

    
    //Blood Angels
    let bloodAngelsThirst = document.getElementById("bloodAngelsDetachmentThirst").checked;

    if(bloodAngelsThirst){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        strength += 1;
    }

    let bloodAngelsArtisanAttacker = document.getElementById("bloodAngelsEnhancementAttackerArtisan").checked;
    let bloodAngelsShard = document.getElementById("bloodAngelsEnhancementAttackerShard").checked;
    let bloodAngelsArtisanDefender = document.getElementById("bloodAngelsEnhancementDefenderArtisan").checked;

    if(bloodAngelsArtisanAttacker){
        ap += 1;
    }

    if(bloodAngelsShard && weaponMeleeRanged == 'melee'){
        lance = true;
        anti = true;
        if(antiType == ''){
            antiType += 'Chaos';
            antiValue += '5'
        }else{
            antiType += ', Chaos';
            antiValue += ', 5'
        }
    }

    if(bloodAngelsArtisanDefender){
        save = 2;
    }

    //Chaos Daemons
    let chaosDaemonsShadowAttacker = document.getElementById("chaosDaemonsArmyRuleAttackerShadow").checked;
    let chaosDaemonsShadowDefender = document.getElementById("chaosDaemonsArmyRuleDefenderShadow").checked;

    let chaosDaemonsArgath = document.getElementById("chaosDaemonsEnhancementArgath").checked;
    let chaosDaemonsEverstave = document.getElementById("chaosDaemonsEnhancementEverstave").checked;
    let chaosDaemonsGift = document.getElementById("chaosDaemonsEnhancementGift").checked;

    if(chaosDaemonsArgath && chaosDaemonsShadowAttacker && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 2);
        }
        strength += 2;
    }else if(chaosDaemonsArgath && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        strength += 1;
    }

    if(chaosDaemonsEverstave && chaosDaemonsShadowAttacker && weaponMeleeRanged == 'ranged'){
        strength += 2;
    }else if(chaosDaemonsEverstave && weaponMeleeRanged == 'ranged'){
        strength += 1;
    }

    if(chaosDaemonsGift && chaosDaemonsShadowDefender && (fnp > 4 || fnp == 0 || isNaN(fnp))){
        fnp = 4;
    }else if(chaosDaemonsGift && (fnp > 5 || fnp == 0 || isNaN(fnp))){
        fnp = 5;
    }


    //chaos knights
    let chaosKnightsAttackerDoom = document.getElementById("chaosKnightsArmyRuleAttackerDoom").checked;
    let chaosKnightsDefenderDoom = document.getElementById("chaosKnightsArmyRuleDefenderDoom").checked;

    if(chaosKnightsAttackerDoom && defenderBattleshocked){
        woundModifier += 1;
    }

    if(chaosKnightsDefenderDoom && attackerBattleshocked){
        hitModifier = hitModifier - 1;
    }

    let chaosKnightsPanoply = document.getElementById("chaosKnightsEnhancementPanoply").checked;

    if(chaosKnightsPanoply){
        if(ap > 0){
            ap = ap - 1;
        }
    }

    //Chaos Space Marines
    let CSMDarkPactLethal = document.getElementById("CSMArmyRuleDarkPactLethal").checked;
    let CSMDarkPactSustained = document.getElementById("CSMArmyRuleDarkPactSustained").checked;
    let CSMMarkKhorne = document.getElementById("CSMDetachmentMarkKhorne").checked;
    let CSMMarkTzeentch = document.getElementById("CSMDetachmentMarkTzeentch").checked;
    let CSMMarkNurgle = document.getElementById("CSMDetachmentMarkNurgle").checked;
    let CSMMarkSlaanesh = document.getElementById("CSMDetachmentMarkSlaanesh").checked;
    let CSMMarkUndivided = document.getElementById("CSMDetachmentMarkUndivided").checked;

    if(CSMDarkPactLethal){
        lethalHits = true;
    }

    if(CSMDarkPactSustained && !sustainedHits){
        sustainedHits = true;
        sustainedHitsCount = 1;
    }

    if(CSMDarkPactLethal && CSMMarkKhorne && weaponMeleeRanged == 'melee' && criticalHit > 5){
        criticalHit = 5;
    }

    if(CSMDarkPactLethal && CSMMarkTzeentch && weaponMeleeRanged == 'ranged' && criticalHit > 5){
        criticalHit = 5;
    }

    if(CSMDarkPactSustained && CSMMarkNurgle && weaponMeleeRanged == 'ranged' && criticalHit > 5){
        criticalHit = 5;
    }

    if(CSMDarkPactSustained && CSMMarkSlaanesh && weaponMeleeRanged == 'melee' && criticalHit > 5){
        criticalHit = 5;
    }

    if(CSMMarkUndivided){
        reroll1Hits = true;
    }

    let CSMTalisman = document.getElementById("CSMEnhancementTalisman").checked;
    let CSMLiber = document.getElementById("CSMEnhancementLiber").checked;
    let CSMElixir = document.getElementById("CSMEnhancementElixir").checked;
    let addCSMTalismanAttacks = false;

    if(CSMTalisman && (CSMDarkPactLethal || CSMDarkPactSustained) && weaponMeleeRanged == 'melee'){
        addCSMTalismanAttacks = true;
        strength += 2;
    }else if(CSMTalisman && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        strength += 1;
    }

    if(CSMLiber && (CSMDarkPactLethal || CSMDarkPactSustained)){
        lethalHits = true;
        if(!sustainedHits){
            sustainedHits = true;
            sustainedHitsCount = 1;
        }
    }

    if(CSMElixir && (fnp > 5 || fnp == 0 || isNaN(fnp))){
        fnp = 5;
    }


    //Dark Angels
    let darkAngelsStubborn = document.getElementById("darkAngelsEnhancementStubborn").checked;
    let darkAngelsBlade = document.getElementById("darkAngelsEnhancementBlade").checked;
    let darkAngelsRememberance = document.getElementById("darkAngelsEnhancementRememberance").checked;

    if(darkAngelsStubborn/* && leadingUnit*/){
        if(attackerBelowStartingStrength){
            hitModifier += 1;
        }
        if(attackerBattleshocked){
            woundModifier += 1;
        }

    }

    if(darkAngelsBlade){
        if(attackerBattleshocked){
            if(!extraAttacks){
                attackString = addToString(rollAttacks, attackString, 2);
            }
            damageString = addToString(rollAttacks, damageString, 2);
            strength += 2;
        }else{
            if(!extraAttacks){
                attackString = addToString(rollAttacks, attackString, 1);
            }
            damageString = addToString(rollAttacks, damageString, 1);
            strength += 1;
        }
    }

    if(darkAngelsRememberance/* && leadingUnit*/){
        if(attackerBattleshocked && (fnp > 4 || fnp == 0 || isNaN(fnp))){
            fnp = 4;
        }else if(fnp == 0 || isNaN(fnp)){
            fnp = 6;
        }
    }

    
    //Death Guard
    let deathGuardGift = document.getElementById("deathGuardArmyRuleGift").checked;

    if(deathGuardGift){
        toughness = toughness - 1;
    }

    let deathGuardPathogen = document.getElementById("deathGuardEnhancementPathogen").checked;
    let deathGuardPathogenInRange = document.getElementById("deathGuardEnhancementPathogenInRange").checked;

    if(deathGuardPathogenInRange && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 2);
        }
        strength += 2;
    }else if(deathGuardPathogen && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        strength += 1;
    }

    //Death Watch
    let deathwatchFuror = document.getElementById("deathwatchDetachmentFuror").checked;
    let deathwatchMalleus = document.getElementById("deathwatchDetachmentMalleus").checked;

    if(deathwatchFuror && !sustainedHits){
        sustainedHits = true;
        sustainedHitsCount = 1;
    }
    if(deathwatchMalleus){
        lethalHits = true;
    }

    let deathwatchSecrets = document.getElementById("deathwatchEnhancementSecrets").checked;
    let deathwatchSecretsKill = document.getElementById("deathwatchEnhancementSecretsKill").checked;

    if(deathwatchSecretsKill && weaponMeleeRanged == 'melee'){
        strength += 2;
        ap += 2;
        damageString = addToString(rollDamage, damageString, 2);
    }else if(deathwatchSecrets && weaponMeleeRanged == 'melee'){
        strength += 1;
        ap += 1;
        damageString = addToString(rollDamage, damageString, 1);
    }

    //Drukhari
    let drukhariPower = document.getElementById("drukhariArmyRulePower").checked;

    if(drukhariPower){
        rerollAllHits = true;
    }

    let drukhariDancer = document.getElementById("drukhariEnhancementDancer").checked;

    if(drukhariDancer && weaponMeleeRanged == 'melee'){
        if(drukhariPower){
            attackString = addToString(rollAttacks, attackString, 2);
            ap += 2;
        }else{
            attackString = addToString(rollAttacks, attackString, 1);
            ap += 1;
        }
    }

    //Genestealer Cults
    let gscBelow = document.getElementById("GSCDetachmentBelow").checked;

    if(gscBelow){
        if(!sustainedHits){
            sustainedHits = true;
            sustainedHitsCount = 1;
        }
        ignoresCover = true;
    }

    //Grey Knights
    let greyKnightsDaemonica = document.getElementById("greyKnightsEnhancementDaemonica").checked;

    if(greyKnightsDaemonica && defenderKeywordsArray.includes('Daemon') && weaponMeleeRanged == 'melee'){
        damageString = addToString(rollDamage, damageString, 1);
        woundModifier += 1
    }else if(greyKnightsDaemonica && weaponMeleeRanged == 'melee'){
        woundModifier += 1
    }

    //Imperial Knights
    // let impKnightsAttackerHonored = document.getElementById("imperialKnightsArmyRuleAttackerHonored").checked;
    let impKnightsLayLow = document.getElementById("imperialKnightsArmyRuleLayLow").checked;
    let impKnightsDefenderHonored = document.getElementById("imperialKnightsArmyRuleDefenderHonored").checked;
    let impKnightsIndomitable = document.getElementById("imperialKnightsDetachmentIndomitable").checked;

    if(impKnightsLayLow){
        rerollSingleHit = true;
        rerollSingleWound = true;
    }

    if(impKnightsDefenderHonored && impKnightsIndomitable && (fnp > 5 || fnp == 0 || isNaN(fnp))){
        fnp = 5;
    }else if(impKnightsIndomitable && (fnp == 0 || isNaN(fnp))){
        fnp = 6;
    }


    let impKnightsParagon = document.getElementById("imperialKnightsEnhancementParagon").checked;

    if(impKnightsParagon){
        if(ap > 0){
            ap = ap - 1;
        }
    }

    //League of Votan
    let leagueAncestorsOne = document.getElementById("leagueArmyRuleAncestorsOne").checked;
    let leagueAncestorsTwo = document.getElementById("leagueArmyRuleAncestorsTwo").checked;

    if(leagueAncestorsTwo){
        hitModifier += 1;
        woundModifier += 1;
    }else if(leagueAncestorsOne){
        hitModifier += 1;
    }

    //necrons
    let necronsCommand = document.getElementById("necronsDetachmentCommand").checked;
    let necronsReanimation = document.getElementById("necronsArmyRuleReanimation").checked;
    let reanimationRoll = 0;
    let reanimationModelsReanimated = [];
    let reanimationWoundsHealed = [];

    if(necronsCommand){
        hitModifier += 1;
    }
    
    let necronsAblator = document.getElementById("necronsEnhancementAblator").checked;
    let necronsAblatorFar = document.getElementById("necronsEnhancementAblatorFar").checked;
    let necronsWeave = document.getElementById("necronsEnhancementWeave").checked;

    if(necronsAblatorFar/* && leadingUnit*/){
        stealth = true;
        cover = true;
    }else if(necronsAblator){
        stealth = true;
    }

    if(necronsWeave && (fnp > 4 || fnp == 0 || isNaN(fnp))){
        fnp = 4;
    }


    //orks

    let orksWaaaghAttacker = document.getElementById("orksArmyRuleAttacker").checked;
    let orksWaaaghDefender = document.getElementById("orksArmyRuleDefender").checked;
    let orksGetStuckIn = document.getElementById("orksDetachmentGetStuckIn").checked;

    if(orksWaaaghAttacker && !extraAttacks && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        strength += 1;
    }

    if(orksWaaaghDefender && (invul == 0 || invul > 5)){
        invul = 5;
    }

    if(orksGetStuckIn && !sustainedHits && weaponMeleeRanged == 'melee'){
        sustainedHits = true;
        sustainedHitsCount = 1;
    }

    let orksKillChoppa = document.getElementById("orksEnhancementKillchoppa").checked;
    let orksCybork = document.getElementById("orksEnhancementCybork").checked;

    if(orksKillChoppa && weaponMeleeRanged == 'melee' && !extraAttacks){
        devastatingWounds = true;
    }

    if(orksCybork && (fnp > 4 || fnp == 0 || isNaN(fnp))){
        fnp = 4;
    }


    //adeptus astartes

    let adeptusAstartesOath = document.getElementById("adeptusAstartesArmyRuleAttacker").checked;

    if(adeptusAstartesOath){
        rerollAllWounds = true;
        rerollAllHits = true;
    }

    let adeptusAstartesHonour = document.getElementById("adeptusAstartesEnhancementHonour").checked;
    let adeptusAstartesHonourAssault = document.getElementById("adeptusAstartesEnhancementHonourAssault").checked;
    let adeptusAstartesBolter = document.getElementById("adeptusAstartesEnhancementBolter").checked;
    let adeptusAstartesBolterDevastator = document.getElementById("adeptusAstartesEnhancementBolterDevastator").checked;
    let adeptusAstartesArtificer = document.getElementById("adeptusAstartesEnhancementArtificer").checked;

    if(adeptusAstartesHonourAssault && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 2);
        }
        strength += 2;
    }else if(adeptusAstartesHonour && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        strength += 1;
    }

    if(adeptusAstartesBolterDevastator && weaponMeleeRanged == 'ranged'/* && leadingUnit*/){
        if(!sustainedHits){
            sustainedHits = true;
            sustainedHitsCount = 1;
        }
        criticalHit = 5;
    }else if(adeptusAstartesBolter && weaponMeleeRanged == 'ranged'/* && leadingUnit*/){
        if(!sustainedHits){
            sustainedHits = true;
            sustainedHitsCount = 1;
        }
    }

    if(adeptusAstartesArtificer){
        save = 2;
        if((fnp > 5 || fnp == 0 || isNaN(fnp))){
            fnp = 5;
        }
    }


    //Space Wolves

    let spaceWolvesSagaWarrior = document.getElementById("spaceWolvesDetachmentSagaWarrior").checked;
    let spaceWolvesSagaSlayer = document.getElementById("spaceWolvesDetachmentSagaBeastslayer").checked;
    let spaceWolvesSagaBear = document.getElementById("spaceWolvesDetachmentSagaBear").checked;

    if(spaceWolvesSagaWarrior && !sustainedHits && weaponMeleeRanged == 'melee'){
        sustainedHits = true;
        sustainedHitsCount = 1;
    }

    if(spaceWolvesSagaSlayer && weaponMeleeRanged == 'melee'){
        lethalHits = true;
    }

    if(spaceWolvesSagaBear && (fnp == 0 || isNaN(fnp)) ){
        fnp = 6;
    }


    let spaceWolvesBlack = document.getElementById("spaceWolvesEnhancementBlack").checked;
    let spaceWolvesFrost = document.getElementById("spaceWolvesEnhancementFrost").checked;
    let spaceWolvesTalisman = document.getElementById("spaceWolvesEnhancementTalisman").checked;

    if(spaceWolvesBlack && weaponMeleeRanged == 'melee'){
        anti = true;
        if(antiType == ''){
            antiType += 'Monster, Vehicle';
            antiValue += '4, 4'
        }else{
            antiType += ', Monster, Vehicle';
            antiValue += ', 4, 4'
        }
    }

    if(spaceWolvesFrost && weaponMeleeRanged == 'melee'){
        strength += 1;
        ap += 1;
    }

    if(spaceWolvesTalisman){
        damageString = addToString(rollDamage, damageString, -1);
    }


    //tau

    let tauGuided = document.getElementById("tauArmyRuleAttacker").checked;
    let tauObserverMarkerlight = document.getElementById("tauArmyRuleAttackerMarkerlight").checked;
    let tauKauyon = document.getElementById("tauDetachmentKauyon").checked;

    if(tauGuided && hit > 2){
        hit = hit -1 ;
        if(tauObserverMarkerlight){
            ignoresCover = true;
        }
    }

    if(tauKauyon && (!sustainedHits || sustainedHitsCount < 2)){
        sustainedHits = true;
        if(tauGuided){
            sustainedHitsCount = 2;
        }else{
            sustainedHitsCount = 1;
        }
    }

    let tauPatient = document.getElementById("tauEmpireEnhancementPatient").checked;

    if(tauPatient){
        hitModifier += 1;
        if(tauKauyon){
            woundModifier += 1;
        }
    }

    //Thousand Sons
    let thousandSonsWeaver = document.getElementById("thousandSonsArmyRuleCabalWeaver").checked;
    let thousandSonsTwist = document.getElementById("thousandSonsArmyRuleCabalTwist").checked;
    let thousandSonsMalevolent = document.getElementById("thousandSonsDetachmentMalevolent").checked;
    let thousandSonsMaelstrom = document.getElementById("thousandSonsDetachmentMaelstrom").checked;
    let thousandSonsImmaterium = document.getElementById("thousandSonsDetachmentImmaterium").checked;

    if(thousandSonsWeaver){
        rerollAllSaves = true;
    }

    if(thousandSonsTwist){
        save = 10;
    }

    if(thousandSonsMalevolent && psychic){
        lethalHits = true;
    }

    if(thousandSonsMaelstrom && psychic && !sustainedHits){
        sustainedHits = true;
        sustainedHitsCount = 1;
    }

    if(thousandSonsImmaterium && psychic){
        devastatingWounds = true;
    }

    let thousandSonsVortex = document.getElementById("thousandSonsEnhancementVortex").checked;

    if(thousandSonsVortex && psychic){
        damageString = addToString(rollDamage, damageString, 1);
        strength += 1;
    }

    //Tyranids

    let tyranidSwarming = document.getElementById("tyranidDetachmentSwarming").checked;
    let tyranidAggression = document.getElementById("tyranidDetachmentAggression").checked;

    if( tyranidSwarming && (defenderKeywordsArray.includes('Infantry') || defenderKeywordsArray.includes('Swarm')) && !sustainedHits){
        // console.log('swarming activate')
        sustainedHits = true;
        sustainedHitsCount = 1;
    }

    if( tyranidAggression && (defenderKeywordsArray.includes('Monster') || defenderKeywordsArray.includes('Vehicle'))){
        // console.log('aggression activate')
        lethalHits = true;
    }

    let tyranidAdaptedAttacker = document.getElementById("tyranidsEnhancementAdaptedAttacker").checked;
    let tyranidAdaptedDefender = document.getElementById("tyranidsEnhancementAdaptedDefender").checked;
    let tyranidAdaptive = document.getElementById("tyranidsEnhancementAdaptive").checked;
    let tyranidAdaptiveWounded = document.getElementById("tyranidsEnhancementAdaptiveWounded").checked;

    if(tyranidAdaptedAttacker){
        oneRerollAttackChain = true;
    }

    if(tyranidAdaptedDefender){
        rerollSingleSave = true;
    }

    if(tyranidAdaptiveWounded && (fnp > 4 || fnp == 0 || isNaN(fnp))){
        fnp = 4;
    }else if(tyranidAdaptive && (fnp > 5 || fnp == 0 || isNaN(fnp))){
        fnp = 5;
    }


    //World Eaters
    let worldEatersMartial = document.getElementById("worldEatersArmyRuleMartial").checked;
    let worldEatersBlades = document.getElementById("worldEatersArmyRuleBlades").checked;
    let worldEatersDevotion = document.getElementById("worldEatersArmyRuleDevotion").checked;
    let worldEatersRelentless = document.getElementById("worldEatersDetachmentRelentless").checked;

    if(worldEatersMartial && !sustainedHits){
        sustainedHits = true;
        sustainedHitsCount = 1;
    }

    if(worldEatersBlades){
        lethalHits = true;
    }

    if(worldEatersDevotion){
        if(fnp == 0 || isNaN(fnp)){
            fnp = 6;
        }else{
            fnp = fnp - 1;
        }
    }


    if(worldEatersRelentless && weaponMeleeRanged == 'melee'){
        if(!extraAttacks){
            attackString = addToString(rollAttacks, attackString, 1);
        }
        strength += 1;
    }

    let worldEatersGlaive = document.getElementById("worldEatersEnhancementGlaive").checked;
    let worldEatersHelm = document.getElementById("worldEatersEnhancementHelm").checked;
    let worldEatersGlaiveCharged = false;

    if(worldEatersGlaive && weaponMeleeRanged == 'melee'){
        if(charged){
            worldEatersGlaiveCharged = true;
        }else{
            attackString = addToString(rollAttacks, attackString, 1);
            damageString = addToString(rollDamage, damageString, 1);
        }
    }

    if(worldEatersHelm){
        halveDamage = true;
    }

    //generic stratagems

    //tank shock
    let stratagemTankShock = document.getElementById("genericStratagemTankShock").checked;
    let tankShockDiceToRoll = 0;
    if(stratagemTankShock && weaponMeleeRanged == 'melee'){
        //select the strongest melee weapon on the vehicle
        for(const weapon in data[selectedAttackerFaction].units[selectedAttackerUnit].weapons.melee){
            let weaponStrength = parseInt(data[selectedAttackerFaction].units[selectedAttackerUnit].weapons.melee[weapon].s);
            if(weaponStrength > tankShockDiceToRoll){
                tankShockDiceToRoll = weaponStrength;
            }
        }
        if(tankShockDiceToRoll > toughness){
            tankShockDiceToRoll += 2;
        }
    }else{
        stratagemTankShock = false;
    }

    //grenade
    let stratagemGrenade = document.getElementById("genericStratagemGrenade").checked;
    if(stratagemGrenade && weaponMeleeRanged == 'ranged'){

    }else{
        stratagemGrenade = false;
    }

    //Go to ground
    let stratagemGround = document.getElementById("genericStratagemGround").checked;
    if(stratagemGround && (invul == 0 || isNaN(invul)) && weaponMeleeRanged == 'ranged'){
        invul = 6;
        cover = true;
    }else if(stratagemGround && weaponMeleeRanged == 'ranged'){
        cover = true;
    }

    //Smokescreen
    let stratagemSmoke = document.getElementById("genericStratagemSmoke").checked;
    if(stratagemSmoke && weaponMeleeRanged == 'ranged'){
        stealth = true;
        cover = true;
    }
    
    //modifiers
    if(stealth && weaponMeleeRanged == 'ranged'){
        hitModifier = hitModifier - 1;
    }

    //rapid fire
    let halfRange = halfRangeInput.checked;
    let rollRapidFire = false;
    if(rapidFireCount.toUpperCase().includes('D')){
        rollRapidFire = true;
    }

    //melta
    if(melta && halfRange){
        if(rollDamage){
            let splitDamageString = damageString.split('+');
            if(splitDamageString.length == 2){
                splitDamageString[1] = parseInt(splitDamageString[1]) + meltaCount;
                damageString = splitDamageString.join('+');
            }else{
                damageString = splitDamageString[0] + '+' + meltaCount;
            }
        }else{
            damageString += meltaCount;
        }
    }

    //lance
    if(lance && charged){
        woundModifier += 1;
        // console.log(`lance: ${lance}`)
        // console.log(`charged: ${charged}`)
        // console.log(`woundModifier: ${woundModifier}`)
    }

    //indirect fire
    let los = losInput.checked;
    if(indirectFire && !los){
        hitModifier = hitModifier - 1;
        cover = true;
    }

    //heavy
    let moved = movedInput.checked;
    if(heavy && !moved){
        hitModifier += 1;
    }

    // calculating needed wound roll
    let wound = woundRollVal(strength,toughness);

    //checking if anti applies and if so adjusting critical wound value
    if(anti){

        let antiArray = antiType.split(', ');
        let antiValuesArray = antiValue.split(', ');

        criticalWound = 6;
        for(let a=0,b=antiArray.length;a<b;a++){
            for(let c=0,d=defenderKeywordsArray.length;c<d;c++){
                if(antiArray[a] == defenderKeywordsArray[c]){
                    // console.log('these ones matched');
                    // console.log(`anti: ${antiArray[a]}`)
                    // console.log(`defender tag: ${defenderKeywordsArray[c]}`)
                    // console.log(`anti value: ${antiValuesArray[a]}`)
                    if(antiValuesArray[a] < criticalWound){
                        criticalWound = antiValuesArray[a];
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
    if(cover && (save > 3 || ap > 0) && !ignoresCover && weaponMeleeRanged == 'ranged'){
        // console.log('defender has benefits of cover')
        saveModifier += 1;
    }

    //capping hit roll modifiers
    if(hitModifier > 1){
        hitModifier = 1;
    }else if(hitModifier < -1){
        hitModifier = -1;
    }

    // console.log(`hit modifier: ${hitModifier}`)

    //capping wound roll modifiers
    if(woundModifier > 1){
        woundModifier = 1;
    }else if(woundModifier < -1){
        woundModifier = -1;
    }

    // console.log(`wound modifier: ${woundModifier}`)

    //can never be more than 1;
    if(saveModifier > 1){
        saveModifier = 1;
    }else if(saveModifier < -1){
        saveModifier = -1;
    }

    // console.log(`save: ${save}`)
    // console.log(`ap: ${ap}`)
    // console.log(`saveModifier: ${saveModifier}`)
    save = save + ap - saveModifier;
    if(invul != 0 && !isNaN(invul)){
        if(save + ap > invul){
            save = invul;
        }else{
            save = save + ap;
        }
    }

    // console.log(`defenders calced save: ${save}`)

    //defender unit damage modifiers go down here so they dont get modified
    if(sororitasMantle){
        rollDamage = false;
        damageString = 1;
    }

    if(halveDamage && !rollDamage){
        damageString = Math.ceil(damageString/2);
    }

    let resultsArr = [];
    let deadDefenderResultsArr = [];
    let defenderWipedArr = [];
    let tankShockArr = [];
    let grenadeArr = [];

    //we need these saved for if the strings are modified during simulation
    let originalAttackString = attackString;
    let originalDamageString = damageString;

    let i = 0;
    while (i < simulations) {

        attackString = originalAttackString;
        damageString = originalDamageString;

        // console.log('');
        // console.log('NEW SIMULATION');

        let diceResults = [];
        let attacks = 0;
        let mortalWounds = 0;
        let lethalHitStorage = [];
        let tankShockDamage = 0;
        let grenadeDamage = 0;

        if(worldEatersGlaiveCharged){
            let tempD3 = parseInt(rollDice3());
            attackString = addToString(rollAttacks, attackString, tempD3);
            damageString = addToString(rollDamage, damageString, tempD3);
        }

        let usedSingleReroll = false;

        // console.log(`attacks (should be 0): ${attacks}`)

        if(rollAttacks){
            // console.log('rolling')
            // console.log(`attackerCount: ${attackerCount}`)
            for(let i=0,j=attackerCount;i<j;i++){
                attacks += calcDiceRollsInString(attackString);
                // console.log(`attacks: ${attacks}`)
            }
        }else{
            // console.log('not rolling');
            attacks = parseInt(attackString) * attackerCount;
            // console.log(`attacks: ${attacks}`)
        }

        //adding the chaos space marine talisman D3 attacks if needed
        if(addCSMTalismanAttacks){
            attacks += calcDiceRollsInString('D3');
        }

        // console.log(`attacks without additions: ${attacks}`)

        //add the rapid fire attacks
        if(halfRange && rapidFire){
            // console.log(`attack string before rapid fire: ${attacks}`);
            if(rollRapidFire){
                for(let i=0,j=attackerCount;i<j;i++){
                    attacks += calcDiceRollsInString(rapidFireCount);
                }
            }else{
                attacks += (parseInt(rapidFireCount) * attackerCount);
            }
            // console.log(`attack string after rapid fire: ${attacks}`);
        }

        // console.log(`attacks after rapid fire: ${attacks}`)

        //add 1 additional attack for every 5 defender models
        if(blast){
            attacks += attackerCount*(Math.floor(defenderCount/5))
        }

        // console.log(`final number of attacks: ${attacks}`);

        //roll to hit
        for(let a=0,b=attacks;a<b;a++){
            diceResults.push(rollDice6());
        }

        if(!torrent){
            // console.log(`hit rolls: ${diceResults}`);
            // console.log(`hit rolls array length: ${diceResults.length}`);

            if(oneRerollAttackChain && !usedSingleReroll){
                // console.log(`usedSingleReroll: ${usedSingleReroll}`)
                // console.log(`hit rolls: ${diceResults}`);
                diceResults.forEach((roll, index) => {
                    if((roll + hitModifier) < hit && !usedSingleReroll){
                        diceResults[index] = 6;
                        usedSingleReroll = true;
                    }
                })
                // console.log(`hit rolls: ${diceResults}`);
            }

            if(rerollAllHits){
                //reroll all fails

                //get any fails's
                let failedHitRolls = diceResults.filter((result) => (result == 1 || (result + hitModifier) < hit));
                // console.log(`failed hit rolls: ${failedHitRolls}`);
                // console.log(`failed hit rolls array length: ${failedHitRolls.length}`);

                //remove fails from the normal pool
                diceResults = diceResults.filter((result) => (result != 1 && (result + hitModifier) >= hit));
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

            }else if(rerollSingleHit){
                //reroll a single fails

                //get any fails's
                let failedHitRolls = diceResults.filter((result) => (result + hitModifier) < hit);
                // console.log(`failed hit rolls: ${failedHitRolls}`);
                // console.log(`failed hit rolls array length: ${failedHitRolls.length}`);

                if(failedHitRolls.length > 0){
                    //remove fails from the normal pool
                    diceResults = diceResults.filter((result) => (result + hitModifier) >= hit);
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

            }

            //remove critical fails
            diceResults = diceResults.filter((result) => result > 1);
            // console.log(`after removing critical fails: ${diceResults}`);

            //create an array of the critical hits and seperate them from the normal dice
            let criticalHitDice = diceResults.filter((result) => result >= criticalHit);
            diceResults = diceResults.filter((result) => result < criticalHit);

            //add the crit dice back in
            diceResults = diceResults.concat(criticalHitDice);

            //do any hit roll modifiers
            // diceResults.forEach((result,index) => {
            //     if(diceResults[index] != 1){
            //         diceResults[index] += hitModifier;
            //     }
            // });

            //remove any that failed to hit
            diceResults = diceResults.filter((result) => result != 1 && result + hitModifier >= hit);
            // console.log(`removed failed hits: ${diceResults}`);
            // console.log(`removed failed hits array length: ${diceResults.length}`);

            //check if we are sustained
            if(sustainedHits){
                //add extra dice to the pool for sustained amount
                for(let a=0,b=criticalHitDice.length;a<b;a++){
                    for(let c=0,d=sustainedHitsCount;c<d;c++){
                        //adding them in as 1's so they dont effect lethal hits
                        diceResults.push(1);
                    }
                }

                // console.log(`added ${criticalHitDice.length * sustainedHitsCount} dice to the pool`);
                // console.log(`dice results with added dice: ${diceResults}`)
            }

            //check for lethal hits
            lethalHitStorage = [];
            if(lethalHits){
                lethalHitStorage = diceResults.filter((result) => result >= criticalHit);
                diceResults = diceResults.filter((result) => result < criticalHit);
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
                if((roll + woundModifier) < wound){
                    diceResults[index] = 6;
                    usedSingleReroll = true;
                }
            })
            // console.log(`wound rolls: ${diceResults}`);
        }

        //get all critical wounds
        let criticalWoundDice = diceResults.filter((result) => result >= criticalWound);
        // console.log(`critical wound dice: ${criticalWoundDice.slice()} length:${criticalWoundDice.length}`);

        //remove the criticals from the dice pool
        diceResults = diceResults.filter((result) => result < criticalWound);
        // console.log(`dice pool after criticals removed rolls: ${diceResults} length:${diceResults.length}`);

        //If we are twinlinked
        if(rerollAllWounds || twinLinked){
            //reroll all fails

            //get any fails's
            let failedWoundRolls = diceResults.filter((result) => (result == 1 || (result + woundModifier) < wound));
            // console.log(`failed wound rolls: ${failedWoundRolls}`);
            // console.log(`failed wound rolls array length: ${failedWoundRolls.length}`);

            //remove fails from the normal pool
            diceResults = diceResults.filter((result) => (result != 1 && (result + woundModifier) >= wound));
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

        }else if(rerollSingleWound){
            //reroll a single fails

            //get any fails's
            let failedWoundRolls = diceResults.filter((result) => (result + woundModifier) < wound);
            // console.log(`failed wound rolls: ${failedWoundRolls}`);
            // console.log(`failed wound rolls array length: ${failedWoundRolls.length}`);

            if(failedWoundRolls.length > 0){
                //remove fails from the normal pool
                diceResults = diceResults.filter((result) => (result + woundModifier) >= wound);
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

        }

        if(rerollAllWounds || twinLinked || reroll1Wounds || rerollSingleWound){

            // console.log(`dice pool after rerolls: ${diceResults} length:${diceResults.length}`);

            criticalWoundDice = criticalWoundDice.concat(diceResults.filter((result) => result >= criticalWound));

            // console.log(`critical wound dice after any rerolls: ${criticalWoundDice.slice()} length:${criticalWoundDice.length}`);

            //remove the criticals from the dice pool
            diceResults = diceResults.filter((result) => result < criticalWound);

            // console.log(`dice pool after rerolls and new criticals removed: ${diceResults} length:${diceResults.length}`);
        }

        //If we have devastating wounds
        if(devastatingWounds){
            // console.log(`critical wound rolls: ${criticalWoundDice}`);

            //turn the critical wounds into mortal wounds
            if(rollDamage){
                for(let a=0,b=criticalWoundDice.length;a<b;a++){
                    if(halveDamage){
                        mortalWounds += (Math.ceil(calcDiceRollsInString(damageString) / 2));
                    }else{
                        mortalWounds += calcDiceRollsInString(damageString);
                    }
                };
            }else{
                mortalWounds = criticalWoundDice.length * damageString;
            }
        }
        
        //remove any that failed to wound
        diceResults = diceResults.filter((result) => (result + woundModifier) >= wound);

        //add the critical back in unless devastating wounds
        if(!devastatingWounds){
            diceResults = diceResults.concat(criticalWoundDice);
        }

        // console.log(`dice pool after wound maths stuff: ${diceResults} length:${diceResults.length}`);

        //if we have lethal hit dice to add back in do so
        // console.log(`before lethal hit dice added back: ${diceResults}`);
        if(lethalHits){
            diceResults = diceResults.concat(lethalHitStorage);
            // console.log(`lethal hit dice added back: ${diceResults}`);
        }

        // console.log(`succesfull wounds: ${diceResults}`);

        //roll to save
        rollDiceArray(diceResults)

        // console.log(`save rolls: ${diceResults}`);
        // console.log(`target save: ${save}`);

        if(rerollAllSaves){
            //reroll all fails

            //get any fails's
            let failedSaveRolls = diceResults.filter((result) => (result == 1 || result < save));

            //remove fails from the normal pool
            diceResults = diceResults.filter((result) => (result != 1 && result >= save));

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

        }else if(rerollSingleSave){
            //reroll a single fails

            //get any fails's
            let failedSaveRolls = diceResults.filter((result) => result < save);

            if(failedSaveRolls.length > 0){
                //remove fails from the normal pool
                diceResults = diceResults.filter((result) => (result != 1 && result >= save));

                let newSaveRoll = [];
                //if there is at least one fail roll a dice and add it back
                newSaveRoll.push(rollDice6());

                // combine the new success dice into the old array
                diceResults = diceResults.concat(newSaveRoll);
            }

        }


        // console.log(`after reroll saves: ${diceResults}`);

        //remove any that were saved
        diceResults = diceResults.filter((result) => result < save);

        // console.log(`failed saves: ${diceResults}`);

        //calculate number of wounds
        let numberOfWounds = 0;
        deadDefenders = 0;
        remainingDefenderWounds = wounds;
        
        for(let a=0,b=diceResults.length;a<b;a++){
            let calcedDamage = 0;
            if(rollDamage){
                if(halveDamage){
                    calcedDamage = (Math.ceil(calcDiceRollsInString(damageString) / 2));
                }else{
                    calcedDamage = calcDiceRollsInString(damageString);
                }
            }else{
                calcedDamage = damageString;
            }

            //do fnp stuff here for non mortal wounds
            if( (fnp != 0 && !isNaN(fnp))){
                // console.log(`calcedDamage before fnp: ${calcedDamage}`)
                for(let a=0,b=calcedDamage;a<b;a++){
                    if(rollDice6() >= fnp){
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

        if(stratagemTankShock){
            // console.log(`tank shock dice: ${tankShockDiceToRoll}`)
            for(let a=0,b=tankShockDiceToRoll;a<b;a++){
                if(rollDice6() >= 5){
                    mortalWounds += 1;
                    tankShockDamage += 1;
                }
            }
            // console.log(`mortal wounds after tank shock: ${mortalWounds}`)
            tankShockArr.push(tankShockDamage);
        }

        if(stratagemGrenade){
            for(let a=0,b=6;a<b;a++){
                if(rollDice6() >= 4){
                    mortalWounds += 1;
                    grenadeDamage += 1;
                }
            }
            grenadeArr.push(grenadeDamage);
        }
        
        for(let a=0,b=mortalWounds;a<b;a++){
            if((fnp != 0 && !isNaN(fnp)) || custodesAegis){
                if(custodesAegis && (fnp == 0 || fnp > 4)){
                    if(rollDice6() < 4){
                        finalWoundsDealt += 1;

                        remainingDefenderWounds = remainingDefenderWounds - 1;
                        if(remainingDefenderWounds <= 0){
                            deadDefenders += 1;
                            remainingDefenderWounds = wounds;
                        }
                    }
                }else{
                    if(rollDice6() < fnp){
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

        // console.log(`deadDefenders: ${deadDefenders}`);
        // console.log(`remainingDefenderWounds: ${remainingDefenderWounds}`);

        if(necronsReanimation){
            // console.log(`Models that are dead before reanimation: ${deadDefenders}`);
        }

        let reanimationDeadDefenders = deadDefenders;
        if(necronsReanimation && reanimationDeadDefenders < defenderCount){
            reanimationRoll = rollDice3();
            // console.log(`Reanimation Roll: ${reanimationRoll}`);
            if(wounds == 1){
                // console.log(`Reanimating unit has single wound models`);
                reanimationDeadDefenders = reanimationDeadDefenders - reanimationRoll;
                // console.log(`models that are dead after reanimation: ${deadDefenders}`);
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
                    if(wounds - remainingDefenderWounds > reanimationRoll){
                        // there will be enough reanimation to heal this model and bring another back
                        // console.log(`reanimation was high enough to heal and bring back a model: ${reanimationRoll}`);
                        reanimationRoll = remainingDefenderWounds - wounds;
                        reanimationDeadDefenders - 1;
                        reanimationWoundsHealed.push(reanimationRoll);
                        reanimationModelsReanimated.push(1)
                    }else{
                        //one got healed but none came back to life
                        // console.log('1 healed but none came back')
                        reanimationWoundsHealed.push(reanimationRoll)
                        reanimationModelsReanimated.push(0)
                    }
                }else{
                    //none are injured so if any are dead it can all go into resurrection
                    if(reanimationRoll > wounds){
                        //its high enough to bring 2 back (if they have 2 wounds each and we roll a 3 and none are injured is the only time i think (except when we get to unit abilities))
                        // console.log('2 came back')
                        reanimationWoundsHealed.push(reanimationRoll)
                        reanimationModelsReanimated.push(2)
                    }else{
                        //the roll only brought 1 back
                        // console.log('1 came back')
                        reanimationWoundsHealed.push(reanimationRoll)
                        reanimationModelsReanimated.push(1)
                    }
                }
            }
        }else if(necronsReanimation && reanimationDeadDefenders >= defenderCount){
            // console.log(`reanimation didnt happen because the squad was wiped`);
            reanimationWoundsHealed.push(0)
            reanimationModelsReanimated.push(0)
        }else{
            //console.log('reanimation didnt happen because no one was dead or injured);
            reanimationWoundsHealed.push(0)
            reanimationModelsReanimated.push(0)
        };
        

        // console.log(`finalWoundsDealt: ${finalWoundsDealt}`);
        // console.log(`deadDefenders (after MW): ${deadDefenders}`);

        resultsArr.push(finalWoundsDealt);

        //if we killed more than the units members just cap it
        if(deadDefenders >= defenderCount){
            deadDefenders = defenderCount;
            defenderWipedArr.push('wiped');
        }
        deadDefenderResultsArr.push(deadDefenders);

        // console.log(' ')

        i++;
    }

    // console.log(`results array: ${resultsArr}`);

    // console.log(`${inputAttackerCount.value} ${selectedAttackerUnit} using ${selectedAttackerWeapon} against ${selectedDefenderUnit} did:`);

    //calculate average
    let totalSimulationDamage = 0;
    resultsArr.forEach((result) => { 
        totalSimulationDamage += result;
    });
    let average = totalSimulationDamage/simulations;
    // console.log(`true average damage over ${simulations} simulations: ${average}`);
    // console.log(`rounded average damage over ${simulations} simulations: ${Math.round(average)}`);

    let totalSimulationKills = 0;
    deadDefenderResultsArr.forEach((result) => { 
        totalSimulationKills += result;
    });
    let averageKills = totalSimulationKills/simulations;
    let averageReanimations = 0;
    let averageReanimationHeal = 0;
    if(necronsReanimation){
        let totalSimulationReanimations = 0;
        reanimationModelsReanimated.forEach((result) => { 
            totalSimulationReanimations += result;
        });
        averageReanimations = totalSimulationReanimations/simulations;
        // console.log(`on average ${averageReanimations} models reanimated`);
        let totalSimulationReanimationHeal = 0;
        reanimationWoundsHealed.forEach((result) => { 
            totalSimulationReanimationHeal += result;
        });
        averageReanimationHeal = totalSimulationReanimationHeal/simulations;
    }
    let averageTankShockDamage = 0;
    if(stratagemTankShock){
        let totalTankShockDamage = 0;
        tankShockArr.forEach((result) => { 
            totalTankShockDamage += result;
        });
        averageTankShockDamage = totalTankShockDamage/simulations;
        // console.log(`on average ${averageReanimations} models reanimated`);
    }
    let averageGrenadeDamage = 0;
    if(stratagemGrenade){
        let totalgrenadeDamage = 0;
        grenadeArr.forEach((result) => { 
            totalgrenadeDamage += result;
        });
        averageGrenadeDamage = totalgrenadeDamage/simulations;
        // console.log(`on average ${averageReanimations} models reanimated`);
    }
    // console.log(`true average kills over ${simulations} simulations: ${averageKills}`);
    // console.log(`rounded average kills over ${simulations} simulations: ${Math.round(averageKills)}`);

    // console.log(`percentage chance to fully wipe the target unit: ${(100/simulations)*defenderWipedArr.length}%`);

    // if(hazardous){
        // console.log('And has a 16.6% of killing itself or causing itself harm');
    // }

    // console.log('');

    let necronReanimationString = '';
    if(necronsReanimation){
        necronReanimationString = `<div>But on average <span class="value">${averageReanimationHeal}</span> wounds were regenerated</div><div> and <span class="value">${averageReanimations}</span> models reanimated in the next command phase</div>`;
    }

    let hazardousString = '';
    if(hazardous){
        hazardousString = `<div>And has a <span class="value">16.6%</span> of killing itself or causing itself harm</div>`;
    }

    let tankShockString = '';
    if(stratagemTankShock){
        tankShockString = `<div>on average, tank shock did <span class="value">${averageTankShockDamage}</span> mortal wounds</div>`
    }

    let grenadeString = '';
    if(stratagemGrenade){
        grenadeString = `<div>on average, grenade did <span class="value">${averageGrenadeDamage}</span> mortal wounds</div>`
    }

    informationHTML = `<div>true average damage over ${simulations} simulations: <span class="value">${average}</span></div><div>rounded average damage over ${simulations} simulations: <span class="value">${Math.round(average)}</span></div>${grenadeString}${tankShockString}<div>true average kills over ${simulations} simulations: <span class="value">${averageKills}</span></div><div>rounded average kills over ${simulations} simulations: <span class="value">${Math.round(averageKills)}</span></div>${necronReanimationString}<div>percentage chance to fully wipe the target unit: <span class="value">${((100/simulations)*defenderWipedArr.length).toFixed(2)*1}%</span></div>${hazardousString}`;

    informationContainer.innerHTML = informationHTML;

    //make the chart
    counter = {};
    resultsArr.forEach(ele => {
        if (counter[ele]) {
            counter[ele] += 1;
        } else {
            counter[ele] = 1;
        }
    });
    // console.log(`counter:`, counter);

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
    if(rollDamage){
        closestBarNum = Math.round(average);
    }else{
        if( (damageString - (average % damageString)) < (damageString/2) ){
            closestBarNum = Math.round((average + damageString) - (average % damageString));
        }else{
            closestBarNum =  average - average % damageString;
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
    document.querySelectorAll('.scenario_modifier').forEach((element) => {
        element.style.display = 'none';
    });

    //faction abilities should turn on and
    //show some scenario boxes for specific factions
    switch (selectedAttackerFaction) {
        case 'adeptaSororitas':
            document.querySelector(`#attackerBelowStartingStrength`).style.display = 'block'
            document.querySelector(`#attackerBelowHalfStrength`).style.display = 'block'
        case 'aeldari':
            document.querySelector(`#aeldariDetachmentUF`).checked = true;
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

    // attackerBattleshocked
    // defenderBattleshocked

    
    if(document.getElementById("bloodAngelsEnhancementAttackerShard").checked){
        chargedContainer.style.display = 'block';
    }else{
        chargedContainer.style.display = 'none';
        chargeInput.checked = false;
    }
}

function defenderFactionChange(){

    resetModifiers('defender');

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
    switch (selectedDefenderFaction) {
        case 'adeptusCustodes':
            document.querySelector(`#custodesDetachmentRuleAegis`).checked = true;
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

    selectedAttackerUnit = attackerUnitSelectEl.value;
    let selectedAttackerData = data[selectedAttackerFaction].units[selectedAttackerUnit].tags;
    attackerWeaponSelectEl.innerHTML = generateWeaponSelectHtml(selectedAttackerFaction, selectedAttackerUnit);
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
    //stratagems
    document.querySelector('.stratagemAttacker').querySelectorAll('.faction_stratagem_container').forEach((element) => {
        element.querySelectorAll('.faction_stratagem_container_element').forEach((el) => {
            el.style.display = 'none';
        });
        element.querySelectorAll('input[type=checkbox]').forEach((el) => {
            el.checked = false;
        });
    });
    if(selectedAttackerData.includes('Vehicle')){
        document.querySelector('.stratagemAttacker').querySelector(`.faction_stratagem_container`).style.display = 'block';
        document.querySelector(`#genericStratagemTankShockCont`).style.display = 'block';
    };
    if(selectedAttackerData.includes('Grenades')){
        document.querySelector('.stratagemAttacker').querySelector(`.faction_stratagem_container`).style.display = 'block';
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
    //stratagems
    document.querySelector('.stratagemDefender').querySelectorAll('.faction_stratagem_container').forEach((element) => {
        element.style.display = 'none';
        element.querySelectorAll('.faction_stratagem_container_element').forEach((el) => {
            el.style.display = 'none';
        });
        element.querySelectorAll('input[type=checkbox]').forEach((el) => {
            el.checked = false;
        });
    });
    if(selectedDefenderData.includes('Infantry')){
        document.querySelector('.stratagemDefender').querySelector(`.faction_stratagem_container`).style.display = 'block';
        document.querySelector(`#genericStratagemGroundCont`).style.display = 'block';
    };
    if(selectedDefenderData.includes('Smoke')){
        document.querySelector('.stratagemDefender').querySelector(`.faction_stratagem_container`).style.display = 'block';
        document.querySelector(`#genericStratagemSmokeCont`).style.display = 'block';
    };
}

function attackerWeaponChange(){

    resetModifiers('attacker');

    selectedAttackerWeapon = attackerWeaponSelectEl.value.split('_');
    weaponMeleeRanged = selectedAttackerWeapon[1];
    populateAttacker(selectedAttackerFaction, selectedAttackerUnit, selectedAttackerWeapon[0], selectedAttackerWeapon[1]);
}

function populateAttacker(selectedFaction, selectedUnit, selectedWeapon, selectedWeaponType){

    let selectedData = data[selectedFaction].units[selectedUnit].weapons[selectedWeaponType][selectedWeapon];
    let maxPerUnit = data[selectedFaction].units[selectedUnit].weapons[selectedWeaponType][selectedWeapon].maxPerUnit;

    if(!selectedData.hasOwnProperty('name')){
        selectedData = selectedData.data;
    }

    // console.log(selectedData)

    inputAttackerCount.value = maxPerUnit;
    inputAttacks.value = selectedData.a;
    inputWbs.value = selectedData.wbs;
    inputStrength.value = selectedData.s;
    inputAp.value = selectedData.ap;
    inputDamage.value = selectedData.d;

    // console.log(selectedData.tags)

    //we need to see how many anti tags there are as anti can be different values on different tags!
    let hasAnti = false;
    let antiValue = '';
    let antiTypesString = '';
    selectedData.tags.map(element => {
        if(element.includes('anti')){
            
            hasAnti = true;
            let antiSplit = element.split('-');

            if(antiValue == ''){
                antiValue += `${antiSplit[2]}`;
            }else{
                antiValue += `, ${antiSplit[2]}`;
            }

            if(antiTypesString == ''){
                antiTypesString += `${antiSplit[1]}`;
            }else{
                antiTypesString += `, ${antiSplit[1]}`;
            }
        }
    });

    if(hasAnti){
        document.querySelector(`#anti`).checked = true;
        document.querySelector(`#antiValue`).value = antiValue;
        document.querySelector(`#antiType`).value = antiTypesString;
    }


    selectedData.tags.forEach((tag, index) => {
        let splitTag = tag.split('-'); 
        // console.log(splitTag);

        document.querySelector(`#${splitTag[0]}`).checked = true;

        // console.log(splitTag);

        switch(splitTag.length){
            case 2:
                document.querySelector(`#${splitTag[0]}Count`).value = splitTag[1];
                break;
            case 3:
                // antiTypesString += `${ (index > 0) ? ', ' : '' }${splitTag[1]}`;
                // document.querySelector(`#antiValue`).value = splitTag[2];
                break;
        }

        switch(splitTag[0]){
            case 'rapidFire':
                halfRangeContainer.style.display = 'block';
                break;
            case 'melta':
                halfRangeContainer.style.display = 'block';
                break;
            case 'lance':
                chargedContainer.style.display = 'block';
                break;
            case 'indirectFire':
                losContainer.style.display = 'block';
                break;
            case 'heavy':
                movedContainer.style.display = 'block';
                break;
        }

        if(mechanicusAttackerProtectorEl.checked){
            movedContainer.style.display = 'block';
        }

    });

    // console.log(antiTypesString);
}

function populateDefender(selectedFaction, selectedUnit){

    let selectedData = data[selectedFaction].units[selectedUnit];

    inputDefenderCount.value = selectedData.size;
    inputToughness.value = selectedData.t;
    inputSave.value = selectedData.sv;
    inputInvul.value = selectedData.invSv;
    inputWounds.value = selectedData.w;
    inputFnp.value = selectedData.fnp;

    let defenderKeywordString = '';
    selectedData.tags.forEach((tag, index) => {
        defenderKeywordString += `${ (index > 0) ? ', ' : '' }${tag}`;
    });
    defenderTags.value = defenderKeywordString;

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
//     console.log(`scenarioContainerExpanded: ${scenarioContainerExpanded}`);
//     console.log(`height: ${document.querySelector('#scenarioModifiers').querySelector('.attacker').scrollHeight+'px'}`);
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
//     console.log(`stratagemContainerExpanded: ${stratagemContainerExpanded}`);
//     console.log(`height: ${document.querySelector('#stratagems').querySelector('.attacker').scrollHeight+'px'}`);
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
//     console.log(`enhancementContainerExpanded: ${enhancementContainerExpanded}`);
//     console.log(`height: ${document.querySelector('#enhancement').querySelector('.attacker').scrollHeight+'px'}`);
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
//     console.log(`factionModifiersContainerExpanded: ${factionModifiersContainerExpanded}`);
//     console.log(`height: ${document.querySelector('#factionModifiers').querySelector('.attacker').scrollHeight+'px'}`);
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

function showHideHalfRange(){
    if(rapidFireEl.checked || meltaEl.checked){
        halfRangeContainer.style.display = 'block';
    }else{
        halfRangeContainer.style.display = 'none';
    }
}

function showHideCharge(){
    if(lanceEl.checked){
        chargedContainer.style.display = 'block';
    }else{
        chargedContainer.style.display = 'none';
    }
}

function showHideLos(){
    if(indirectFireEl.checked){
        losContainer.style.display = 'block';
    }else{
        losContainer.style.display = 'none';
    }
}

function showHideMoved(){
    if(heavyEl.checked || mechanicusAttackerProtectorEl.checked){
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
document.querySelectorAll('.faction_stratagem_container').forEach((element) => {
    element.style.display = 'none';
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

attackerWeaponSelectEl.addEventListener("change", attackerWeaponChange);

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

console.log(data);
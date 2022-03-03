const diceTypes = ["d100","d20","d12","d10","d8","d6","d4","d2"];
const dataNames = ["alias","flavor","advantageMode","nDice","faces","total","results"];
const abilities = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];
const skills = ["Acrobatics","Animal Handling","Arcana","Athletics","Deception","History","Insight","Intimidation","Investigation","Medicine","Nature","Perception","Performance","Persuasion","Religion","Sleight of Hand","Stealth","Survival"];

class StatsProfile {
  constructor () {
    this.attackData = {
      total: [],
      name: [],
      alias: []
    };

    this.damageData = {
      results: [],
      total: [],
      name: [],
      alias: []
    };

    //skillData includes ability checks, skill checks, and saving throws
    this.skillData = {
      total: [],
      name: [],
      alias: []
    };

    this.d20Data = {
      results: [], //values of d20 rolls before modifiers
      advantage: [] //list of advantageModes, 1 = advantage, -1 = disadvantage
    };

    this.meta = {
      nd20Array: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //each index stands for number of times a value was rolled, used for histogram
      nAbilityArray: [0,0,0,0,0,0], //number of times each ability was used, in order of abilities constant
      nSaveArray: [0,0,0,0,0,0], //number of times each saving throw was used, in order of abilities constant
      nSkillArray: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //number of times each skill was used, in alphabetical order as in skills constant
      avgd20: 0, //average d20 roll before modifiers
      avgAttack: 0, //average attack roll total (including modifiers)
      avgAttackArray: [], //average roll per attack type, should be in format [[average,times used, name],[average,times used, name]...]
      avgAbility: 0, //average ability, skill or saving throw roll total (including modifiers)
      avgAbilityArray: [], //average roll per skill,ability,save type, should be in format [[average,times used, name],[average,times used, name]...]
      favAttack: "", //most used attack based off of how many times damage is rolled or how many times an attack was rolled, whichever is higher
      favAbility: "", //most used ability or skill for checks
      damageSum: 0, //sum of damage dealt
      damageArray: [], //list of each weapon and how much total damage was done with each in format [[sum, times used, name]...]
      damageMax: [0,""], //max damage dealt in one roll, format [Max damage, name of attack used]
      nAdv: 0, //number of times with advantage
      nNorm: 0, //number of times with no advantage or disadvantage
      nDis: 0 //number of times with disadvantage
    }
  }

  analyzeData() {
    let count = 0;
    let sum = 0.0;
    let namesUnique;
    let nNamesUsed; //for keeping track of how many times a unique name is used.
    let namesSum;


    //first analyze d20 data
    for (let i = 0; i < this.d20Data.results.length; i++) {
      if (this.d20Data.advantage[i] == 1) {
        this.meta.nAdv++;
      } else if (this.d20Data.advantage[i] == -1) {
        this.meta.nDis++;
      } else {
        this.meta.nNorm++;
      }

      for (let j = 0; j < this.d20Data.results[i].length; j++) {
        this.meta.nd20Array[this.d20Data.results[i][j] - 1]++; //add one in location of value
        count++;
        sum = sum + this.d20Data.results[i][j];
      }
    }
    this.meta.avgd20 = sum/count;

    //reset count and sum
    count = 0;
    sum = 0.0;

    //ANALYZE
    //ATTACK
    //DATA
    namesUnique = Array.from(new Set(this.attackData.name)); //unique list of names used
    nNamesUsed = new Array(namesUnique.length); //number of times each unique name is rolled
    nNamesUsed.fill(0);
    namesSum = new Array(namesUnique.length); //sum of results of each unique attack so that the average can be found.
    namesSum.fill(0);

    for (let i = 0; i < this.attackData.name.length; i++) {
      nNamesUsed[namesUnique.indexOf(this.attackData.name[i])]++; //increase the associated nNamesUsed of namesUnique by one each time it appears.
      namesSum[namesUnique.indexOf(this.attackData.name[i])] += this.attackData.total[i]; //temporarily sum associated rolls
      count++;
      sum = sum + this.attackData.total[i];
    }
    this.meta.avgAttack = sum/count;

    let maxTimesUsed = 0;
    for (let i = 0; i < namesUnique.length; i++) {
      this.meta.avgAttackArray.push([namesSum[i]/nNamesUsed[i],nNamesUsed[i],namesUnique[i]]); // create table where a row is [average,times used, name]

      //Check if the number of times this damage was used is more than the current max
      if (maxTimesUsed < nNamesUsed[i]) {
        this.meta.favAttack = namesUnique[i];
        maxTimesUsed = nNamesUsed[i];
      }
    }

    //reset count and sum
    count = 0;
    sum = 0.0;

    //ANALYZE
    //DAMAGE
    //DATA

    //reset arrays
    namesUnique = Array.from(new Set(this.damageData.name)); //unique list of names used
    nNamesUsed = new Array(namesUnique.length); //number of times each unique name is rolled
    nNamesUsed.fill(0);
    namesSum = new Array(namesUnique.length); //sum of results of each unique damage so that total damage of each weapon can be found.
    namesSum.fill(0);

    let maximumDamage = 0;
    let maximumDamageName = "";
    for (let i = 0; i < this.damageData.name.length; i++) {
      nNamesUsed[namesUnique.indexOf(this.damageData.name[i])]++; //increase the associated nNamesUsed of namesUnique by one each time it appears.
      namesSum[namesUnique.indexOf(this.damageData.name[i])] += this.damageData.total[i]; //sum associated rolls

      sum = sum + this.damageData.total[i];
      if (this.damageData.total[i] > maximumDamage) {
        maximumDamage = this.damageData.total[i];
        maximumDamageName = this.damageData.name[i];
      }
    }
    this.meta.damageSum = sum;
    this.meta.damageMax = [maximumDamage,maximumDamageName];

    for (let i = 0; i < namesUnique.length; i++) {
      this.meta.damageArray.push([namesSum[i],nNamesUsed[i],namesUnique[i]]); //create table where a row is [damage sum, times used, name]

      //Check if the number of times this damage was used is more than the current max
      if (maxTimesUsed < nNamesUsed[i]) {
        this.meta.favAttack = namesUnique[i];
        maxTimesUsed = nNamesUsed[i];
      }
    }

    //ANALYZE
    //ABILITY,
    //SKILL,
    //AND SAVING THROW
    //DATA

    //reset arrays
    namesUnique = Array.from(new Set(this.skillData.name)); //unique list of names used
    nNamesUsed = new Array(namesUnique.length); //number of times each unique name is rolled
    nNamesUsed.fill(0);
    namesSum = new Array(namesUnique.length); //sum of results of each unique damage so that total damage of each weapon can be found.
    namesSum.fill(0);

    //reset count and sum
    count = 0;
    sum = 0.0;

    //reset maxTimesUsed now that it is no longer needed for attack and damage
    maxTimesUsed = 0;

    for (let i = 0; i < this.skillData.name.length; i++) {
      nNamesUsed[namesUnique.indexOf(this.skillData.name[i])]++; //increase the associated nNamesUsed of namesUnique by one each time it appears.
      namesSum[namesUnique.indexOf(this.skillData.name[i])] += this.skillData.total[i]; //temporarily sum associated rolls
      count++;
      sum = sum + this.skillData.total[i];

      //find out which skill, ability, or saving throw this is and increase the appropriate array index
      if (this.skillData.name[i].includes("Saving")) {
        //cycle through names of abilities to see if the name of the skill has the ability that matches it
        for (let j = 0; j < abilities.length; j++) {
          if (this.skillData.name[i].includes(abilities[j])) {
            this.meta.nSaveArray[j]++;
            break;
          }
        }
      } else if (this.skillData.name[i].includes("Ability")) {
        //cycle through names of abilities to see if the name of the skill has the ability that matches it
        for (let j = 0; j < abilities.length; j++) {
          if (this.skillData.name[i].includes(abilities[j])) {
            this.meta.nAbilityArray[j]++;
            break;
          }
        }
      } else if (this.skillData.name[i].includes("Skill")) {
        //cycle through names of skills to see if the name of the skill has the ability that matches it
        for (let j = 0; j < skills.length; j++) {
          if (this.skillData.name[i].includes(skills[j])) {
            this.meta.nSkillArray[j]++;
            break;
          }
        }
      }
    }
    this.meta.avgAbility = sum/count;

    for (let i = 0; i < namesUnique.length; i++) {
      this.meta.avgAbilityArray.push([namesSum[i]/nNamesUsed[i],nNamesUsed[i],namesUnique[i]]); // create table where a row is [average,times used, name]

      //Check if the number of times this damage was used is more than the current max
      if (maxTimesUsed < nNamesUsed[i]) {
        this.meta.favAbility = namesUnique[i];
        maxTimesUsed = nNamesUsed[i];
      }
    }
  }

}

export default StatsProfile;

import StatsProfile from "./StatsProfile.js"

export function makeProfiles(pcArrayInput,dataTable) {
  /*
  Given an array of pc names (pcArrayInput) and a table of data, this function makes profiles for each pc and the dm where the dm is the rest of the aliases.
  Returns an array of profiles.
  */
  let pcArray = pcArrayInput.filter(n => n != ""); //create new array that filters out the indexes with empty strings

  let pcData = new Array(pcArray.length);
  let dmData = [[]];
  let pcStats = new Array(pcArray.length);
  let dmStats = new StatsProfile();
  for (let i = 0; i < pcData.length; i++) {pcData[i] = []; pcStats[i] = new StatsProfile();} //fill array with empty arrays

  function assignData() {
    /*
    This function takes the initial table of data (dataTable) that is created from reading the file and assigns the data according to the pcArray
    */
    for (let i = 0; i < dataTable.length; i++) {
      for (let j = 0; j < pcArray.length; j++) {
        //match rows with the same alias
        if (dataTable[i][0].toLowerCase().includes(pcArray[j].toLowerCase())) {
          pcData[j].push(dataTable[i]);
          break; //break the for loop since there is only be one alias per row of data.
        } else if (dataTable[i][0] != "" && j == pcArray.length - 1){
          dmData[0].push(dataTable[i]); //if alias exists but is not part of names array, assume it is DM controlled character
        }
      }
    }

    return true;
  }

  function makeProfile(aliasData,profile) {
    /*
    this function takes a single set of pcData (or dmData) and synthesizes the data into a profile for a given profile of the variable pcStats
    WARNING: profile and aliasData are linked to variables. This function alters the given profile.
    aliasData = [0 "alias",1 "flavor",2 "advantageMode",3 "nDice",4 "faces",5 "total",6 "results"];
    */

    for (let i = 0; i < aliasData.length; i++) {
      //Check the flavor for keywords and then assign data appropriately
      let tempName;

      //if the number of faces is equal to 20, assign d20 data
      if (aliasData[i][4] == 20) {
        profile.d20Data.results.push(aliasData[i][6]);
        profile.d20Data.advantage.push(aliasData[i][2]);
      }

      //assign data depending on what is in "flavor"
      if (aliasData[i][1].includes("Damage")) {
        tempName = aliasData[i][1].split(" - ")[0]; //split up flavor and assign first half which is the name of the roll

        profile.damageData.total.push(aliasData[i][5]);
        profile.damageData.results.push(aliasData[i][6]);
        profile.damageData.name.push(tempName);
        profile.damageData.alias.push(aliasData[i][0]);
      } else if (aliasData[i][1].includes("Attack")) {
        //check for Attack 2nd because otherwise "Sneak Attack - Damage, gets added to attack rolls"
        tempName = aliasData[i][1].split(" - ")[0]; //split up flavor and assign first half which is the name of the attack used

        profile.attackData.total.push(aliasData[i][5]);
        profile.attackData.name.push(tempName);
        profile.attackData.alias.push(aliasData[i][0]);
      } else if (aliasData[i][1].includes("Check") || aliasData[i][1].includes("Saving")) {
        tempName = aliasData[i][1].split(":")[0]; //split up flavor and assign first half which is the name of the roll

        profile.skillData.total.push(aliasData[i][5]);
        profile.skillData.name.push(tempName);
        profile.skillData.alias.push(aliasData[i][0]);
      }
    }
  }

  assignData();
  for (let i = 0; i < pcData.length; i++) {
    makeProfile(pcData[i],pcStats[i]);
  }
  makeProfile(dmData[0],dmStats);
  for (let i = 0; i < pcData.length; i++) {
    pcStats[i].analyzeData();
  }

  //let pcStats2 = JSON.parse(JSON.stringify(pcStats));
  //let dmStats2 = JSON.parse(JSON.stringify(dmStats));

  return [pcStats,dmStats];
}

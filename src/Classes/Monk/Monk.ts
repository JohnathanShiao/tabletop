import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ResourceTrait } from "../../Base/Interfaces";
import * as Languages from "../../../Assets/Languages.json";
import * as MonkClassTraits from "./Monk.json";
import { MonkSubclass } from "./Subclasses/MonkSubclass";

export class Monk extends PlayerClass {
  constructor(
    multiclass: boolean,
    levelingParams: LevelingParams,
    skillProficiencies?: string[],
    weapons?: string[],
    toolKitProficiency?: string[],
    equipmentPack?: string
  ) {
    super(
      "Monk",
      [],
      [],
      ["Simple", "Shortsword"],
      [],
      [],
      [],
      [],
      [],
      [],
      levelingParams,
      "d8",
      8,
      []
    );

    this.characterStart(multiclass, skillProficiencies, weapons, toolKitProficiency, equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], toolKitProficiency: string[], equipmentPack: string){
    if(!multiclass){
      this.skillProficiencies = skillProficiencies;
      this.weapons.push(...weapons, "DART", "DART", "DART", "DART", "DART", "DART", "DART", "DART", "DART", "DART");
      this.toolProficiencies = toolKitProficiency;
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["strength", "dexterity"];
    }
  }


  abilitiesAtLevels = {
    "1": this.level1,
    "2": this.level2,
    "3": this.level3,
    "4": this.level4,
    "5": this.level5,
    "6": this.level6,
    "7": this.level7,
    "8": this.level8,
    "9": this.level9,
    "10": this.level10,
    "11": this.level11,
    "12": this.level12,
    "13": this.level13,
    "14": this.level14,
    "15": this.level15,
    "16": this.level16,
    "17": this.level17,
    "18": this.level18,
    "19": this.level19,
    "20": this.level20,
  };

  private pushMonkFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, MonkClassTraits);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    
    if(PlayerClass.multiClassCheck(pc, "Unarmored Defense")){
      pc.armorClasses.push({
        name: "Unarmored Defense",
        base: 10,
        modifier: [
          pc.abilityScores.dexterity.modifier,
          pc.abilityScores.wisdom.modifier,
        ],
        bonus: { value: 0 },
      });
    }
    
    pc.pcHelper.addScalingTraits({
      title: "Martial Arts",
      description: "Damage die used for Unarmed Strikes.",
      dice: "1d4",
    });

    this.pushMonkFeatures(pc, 1);

  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 2);
    pc.speeds.push({
      name: "Unarmored Movement",
      base: pc.speed,
      bonus: { value: 10 },
    });
    pc.traits.resources.push({
      title: "Ki Points",
      description: "Number of times you can use Ki Abilities",
      resourceMax: { value: 2 },
    });
  }

  level3(pc: PlayerCharacter, params: MonkLevelingParams): void {
    this.subclass = new MonkSubclass(params.subclassSelection.subclass);
    this.pushMonkFeatures(pc, 3);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;

    this.subclassDriver(pc, "3", params);    
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 4);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level5(pc: PlayerCharacter, params: MonkLevelingParams): void {
    this.pushMonkFeatures(pc, 5);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    pc.pcHelper.findScalingTraitByName("Martial Arts").dice = "1d6";
    this.subclassDriver(pc, "5", params);
  }

  level6(pc: PlayerCharacter, params: MonkLevelingParams): void {
    this.pushMonkFeatures(pc, 6);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    this.subclassDriver(pc, "6", params);    
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 7);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 8);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level9(pc: PlayerCharacter, params: MonkLevelingParams): void {
    this.pushMonkFeatures(pc, 9);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    this.subclassDriver(pc, "9", params);
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 10);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
  }

  level11(pc: PlayerCharacter, params: MonkLevelingParams): void {
    this.pushMonkFeatures(pc, 11);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    pc.pcHelper.findScalingTraitByName("Martial Arts").dice = "1d8";

    this.subclassDriver(pc, "11", params);    
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 12);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level13(pc: PlayerCharacter, params: MonkLevelingParams): void {
    this.pushMonkFeatures(pc, 13);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    this.subclassDriver(pc, "13", params);
    // TONGUE OF SUN AND MOON
    for (const language of Object.keys(Languages)) {
      pc.traits.languages.push(Languages[language]);
    }
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 14);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;

    // Diamond Soul
    for (const ability of Object.keys(pc.abilityScores)) {
      pc.abilityScores[ability].savingThrowProficiency = true;
    }
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 15);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level17(pc: PlayerCharacter, params: MonkLevelingParams): void {
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    this.subclassDriver(pc, "17", params);    
    pc.pcHelper.findScalingTraitByName("Martial Arts").dice = "1d10";
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 18);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushMonkFeatures(pc, 20);
    pc.pcHelper.findResourceTraitByName("Ki Points").resourceMax.value++;
  }
}

export interface MonkLevelingParams extends LevelingParams {
  disciplines?: {
    add: string[],
    remove?: string
  };
}

export class DSMonk extends Monk {
  constructor(){
    super(true, {isNoInput: true});
  }
}


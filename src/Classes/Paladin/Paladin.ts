import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as FightingStyle from "../../../Assets/FightingStyles.json";
import { PaladinSubclass } from "./Subclasses/PaladinSubclass";
import { SpellSlotFactory } from "../SpellSlotFactory";

export class Paladin extends PlayerClass {
  constructor(
    multiclass: boolean,
    params: LevelingParams,
    skillProficiencies?: string[],    
    weapons?: string[],
    armor?: string[],
    equipmentPack?: string
  ) {
    super(
      "Paladin",
      [],
      [],
      ["Simple", "Martial"],
      ["Light", "Medium", "Shield"],
      [],
      [],
      [],
      [],
      [],
      params,
      "d10",
      10,
      []
    );

    this.characterStart(multiclass, skillProficiencies, weapons, armor, equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], armor: string[], equipmentPack: string){
    if(!multiclass){
      this.skillProficiencies = skillProficiencies;
      this.armorProficiencies.push("Heavy");
      this.weapons = weapons;
      this.armor = armor;
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["wisdom", "charisma"];
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

  private pushPaladinFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, "PALADIN");
  }

  private upgradeLayOnHands(pc: PlayerCharacter): void {
    pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
  }

  private handlePaladinSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ) {
    this.handleSpellSelections(pc, params, SpellcastingAbility["PALADIN"]);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 1);
    pc.addResourceTraits({
      title: "Lay on Hands",
      description: "Number of hit points you can restore with Lay on Hands",
      resourceMax: { value: 5 },
    });
    let paladinPreparedSpells = {
      title: "Paladin",
      level: this.level,
      modifier: pc.abilityScores.charisma.modifier,
    };
    pc.preparedSpells
      ? pc.preparedSpells.push(paladinPreparedSpells)
      : (pc.preparedSpells = [paladinPreparedSpells]);
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 2);
    pc.addFeatures(FightingStyle[params.fightingStyle[0]]);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclass = params.archetypeSelection[0].archetype;
    this.upgradeLayOnHands(pc);
    PaladinSubclass.subclassDictionary[this.subclass][3](pc, params);
    this.pushPaladinFeatures(pc, 3);
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 4);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 5);
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 6);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    PaladinSubclass.subclassDictionary[this.subclass][7](pc, params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    this.upgradeLayOnHands(pc);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 10);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 11);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    this.upgradeLayOnHands(pc);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 15);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    PaladinSubclass.subclassDictionary[this.subclass][15](pc, params);
    this.upgradeLayOnHands(pc);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    this.upgradeLayOnHands(pc);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    PaladinSubclass.subclassDictionary[this.subclass][20](pc, params);
  }
}

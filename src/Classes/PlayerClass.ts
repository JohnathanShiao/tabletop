import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Spell, Trait, ResourceTrait } from "../Base/Interfaces";
import * as ClassTraits from "../../Assets/ClassTraits.json";
import * as Languages from "../../Assets/Languages.json";
import * as Gear from "../../Assets/Gear.json";
import * as ToolKits from "../../Assets/Tools.json";
import * as FightingStyle from "../../Assets/FightingStyles.json";
import * as Armor from "../../Assets/Armor.json";
import * as Weapons from "../../Assets/Weapons.json";
import { Inventory } from "../Base/Inventory";

export abstract class PlayerClass {
  constructor(
    name: string,
    languages: string[],
    skillProficiencies: string[],
    weaponProficiencies: string[],
    armorProficiencies: string[],
    toolProficiencies: string[],
    weapons: string[],
    armor: string[],
    equipment: string[],
    toolKits: string[],
    lvlOneParams: LevelingParams,
    hitDie: string,
    hpBase: number,
    savingThrowProficiencies: string[]
  ) {
    this.name = name;
    this.languages = languages;
    this.skillProficiencies = skillProficiencies;
    this.weaponProficiencies = weaponProficiencies;
    this.armorProficiencies = armorProficiencies;
    this.toolProficiencies = toolProficiencies;
    this.weapons = weapons;
    this.armor = armor;
    this.equipment = equipment;
    this.toolKits = toolKits;
    this.lvlOneParams = lvlOneParams;
    this.hitDie = hitDie;
    this.savingThrowProficiencies = savingThrowProficiencies;
    this.features = [];
    this.hpBase = hpBase;
  }


  name: string;
  subclass: string;
  languages: string[];
  skillProficiencies: string[];
  weaponProficiencies: string[];
  armorProficiencies: string[];
  toolProficiencies: string[];
  weapons: string[];
  armor: string[];
  equipment: string[];
  equipmentPack: string;
  toolKits: string[];
  lvlOneParams: LevelingParams;
  hitDie: string;
  hpBase: number;
  savingThrowProficiencies: string[];
  features: Trait[];
  level: { value: number } = { value: 1 };
  

  //TODO: wtf is a Path
  //path: Path;

  abstract abilitiesAtLevels: {
    [key: string]: (pc: PlayerCharacter, params: LevelingParams) => void;
  };

  protected addLanguages(pc: PlayerCharacter): void {
    for (let language of this.languages) {
      pc.traits.languages.push(Languages[language]);
    }
  }

  protected addSkillProficiencies(pc: PlayerCharacter): void {
    for (let skill of this.skillProficiencies) {
      pc.skills[skill].proficient = true;
    }
  }

  protected addWeaponProficiencies(pc: PlayerCharacter): void {
    for (let weapon of this.weaponProficiencies) {
      pc.traits.weaponProficiencies.push(weapon);
    }
  }

  protected addArmorProficiencies(pc: PlayerCharacter): void {
    for (let armor of this.armorProficiencies) {
      pc.traits.armorProficiencies.push(armor);
    }
  }

  protected addToolProficiencies(pc: PlayerCharacter): void {
    for (let tool of this.toolProficiencies) {
      pc.traits.toolProficiencies.push(tool);
    }
  }

  protected addFeatures(pc: PlayerCharacter): void {
    for (let trait of this.features) {
      pc.traits.features.push(trait);
    }
  }

  protected addWeapons(pc: PlayerCharacter): void {
    for (const weapon of this.weapons) {
      pc.inventory.weapons.push(Weapons[weapon]);
      if (
        pc.attacks.filter((attack) => attack.name == Weapons[weapon].name)
          .length == 0
      ) {
        pc.attacks.push(Inventory.buildAttack(pc, Weapons[weapon]));
      }
    }
  }

  protected addArmor(pc: PlayerCharacter): void {
    for (const armor of this.armor) {
      pc.inventory.armor.push(Armor[armor]);
      pc.armorClasses.push(
        Inventory.acFromArmorType[Armor[armor].armorType](pc, Armor[armor])
      );
    }
  }

  protected addEquipment(pc: PlayerCharacter): void {
    if(this.equipmentPack){
      for (const item of Inventory.equipmentPacks[this.equipmentPack]()) {
        pc.inventory.items.push(item);
      }

      for (const item of this.equipment) {
        pc.inventory.items.push(Gear[item]);
      }
    }
  }

  protected addToolkits(pc: PlayerCharacter): void {
    for (const tool of this.toolKits) {
      pc.inventory.toolKits.push(ToolKits[tool]);
    }
  }

  protected addSavingThrowProficiencies(pc: PlayerCharacter): void {
    for (const savingThrowProficiency of this.savingThrowProficiencies) {
      pc.abilityScores[savingThrowProficiency].savingThrowProficiency = true;
    }
  }

  public apply(pc: PlayerCharacter): void {
    this.addLanguages(pc);
    this.addSkillProficiencies(pc);
    this.addWeaponProficiencies(pc);
    this.addArmorProficiencies(pc);
    this.addToolProficiencies(pc);
    this.addWeapons(pc);
    this.addArmor(pc);
    this.addEquipment(pc);
    this.addToolkits(pc);
    this.addSavingThrowProficiencies(pc);
    this.abilitiesAtLevels["1"](pc, this.lvlOneParams);

    pc.hitDie = this.hitDie;

    pc.baseStats.hpMax.base = this.hpBase;
  }

  protected pushClassFeatures(
    pc: PlayerCharacter,
    level: number,
    className: string
  ) {
    for (let key in ClassTraits[className][level]) {
      pc.addFeatures(ClassTraits[className][level][key]);
    }
  }

  protected handleSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams,
    ability: string
  ) {
    if (params.spellSelection) {
      pc.addSpells(params.spellSelection, ability);
    }
    if (params.spellReplacement) {
      pc.replaceSpells(params.spellReplacement, ability);
    }
  }

  public static pushCustomizedClassFeature(
    pc: PlayerCharacter,
    level: number,
    className: string,
    feature: string,
    choices: string[]
  ) {
    const customFeature: Trait = {
      ...ClassTraits[className][level][feature],
      choices: choices,
    };
    pc.addFeatures(customFeature);
  }

  public static quickClassLevelUp(
    pc: PlayerCharacter,
    pclass: PlayerClass,
    argsAry: LevelingParams[],
    level: number
  ): void {
    for (let i = 2; i <= level; i++) {
      pclass.abilitiesAtLevels[i](pc, argsAry[i - 1]);
    }
  }
  public static addFightingStyle(
      pc: PlayerCharacter,
      fightingStyle: string
    ): void {
        pc.addFeatures(FightingStyle[fightingStyle]);
        /* FIGHTING STYLE TAGS / EFFECTS: SHOULD BE DONE, PROBABLY IN OWN FILE FOR EXTENSIBILITY / HOMEBREW.
        switch(fightingStyle){
            case 'ARCHERY':
            case 'DEFENSE':
            case 'DUELING':
            case 'GREAT WEAPON FIGHTING':
            case 'PROTECTION':
            case 'TWO-WEAPON FIGHTING':
        }
        */
  }
}



export interface LevelingParams {
  isNoInput: boolean;
  abilityScoreImprovement?: {
    ability: string;
    improvement: number;
  }[];
  spellSelection?: string[];
  spellReplacement?: {
    [key: string]: string;
  };
  proficiencySelection?: string[];
  fightingStyle?: string[];
  archetypeSelection?: {
    archetype: string; //school/oath/patron/etc
    options?: string[]; //totems/maneuvers/elements/beast companions/etc
  }[];
}
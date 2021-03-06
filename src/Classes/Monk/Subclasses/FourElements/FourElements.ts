import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import * as FourElementsDict from "./WayOfTheFourElements.json"
import * as ElementalDisciplines from "./ElementalDisciplines.json"
import { MonkLevelingParams } from "Classes/Monk/Monk";
import { ISpell, Spell, Trait } from "Base/Interfaces";

export class FourElements {

    static getFeature(level: string, featureName: string) {
        return FourElementsDict["features"][level][featureName];
    }
    
    static fourElements3(pc: PlayerCharacter, params: MonkLevelingParams) {
        // New elemental discipline learned, plus Elemental Attunement discipline.
    

        pc.pcHelper.addFeatures(
            FourElements.getFeature("3", "DISCIPLE OF THE ELEMENTS"),
            ElementalDisciplines["ELEMENTAL ATTUNEMENT"]
        );

        FourElements.handleDisciplineSelections(pc, params);
    
        
        pc.pcHelper.addScalingTraits({
            title: "Elemental Discipline Max Level",
            description: "Maximum number of Max Level you can spend to cast a spell with the Way of the Four Elements.",
            points: 2
        });
    }
  
    static fourElements5(pc: PlayerCharacter, params: MonkLevelingParams) {
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Max Level").points++;
    }

    static fourElements6(pc: PlayerCharacter, params: MonkLevelingParams) {
        FourElements.handleDisciplineSelections(pc, params);
    }

    static fourElements9(pc: PlayerCharacter, params: MonkLevelingParams) {
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Max Level").points++;
    }
  
    static fourElements11(pc: PlayerCharacter, params: MonkLevelingParams) {
        FourElements.handleDisciplineSelections(pc, params);
    }

    static fourElements13(pc: PlayerCharacter, params: MonkLevelingParams) {
        FourElements.handleDisciplineSelections(pc, params);        
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Max Level").points++;
    }
  
    static fourElements17(pc: PlayerCharacter, params: MonkLevelingParams) {
        FourElements.handleDisciplineSelections(pc, params);
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Max Level").points++;
    }

    static handleDisciplineSelections(
    pc: PlayerCharacter,
    params: MonkLevelingParams
    ) {
        this.processDisciplines(params.disciplines.add, pc);
        if (params.disciplines.remove) {
            this.removeDiscipline(params.disciplines.remove, pc);
        }
    }

    private static processDisciplines(disciplines: string[], pc: PlayerCharacter): void {
        const disps: Trait[] = disciplines.map(
            (d) => ElementalDisciplines[d]
        );
        const spells: Spell[] = [];
        disps.forEach((disp) => {
            this.addDisciplineSpell(disp, pc);
        });
        pc.pcHelper.addFeatures(...disps);
    }

    private static removeDiscipline(discipline: string, pc: PlayerCharacter): void {
        const oldDisp: Trait = pc.pcHelper.findFeatureTraitByName(discipline);
        if (oldDisp.spellAdded) {
            pc.pcHelper.removeSpells(oldDisp.spellAdded);
          }
        pc.pcHelper.removeFeatures(discipline);
    }

    private static addDisciplineSpell(disp: Trait, pc: PlayerCharacter): void {
        if(disp.spellAdded) {
            pc.pcHelper.addSpells([disp.spellAdded], "charisma", disp);
        }
    }
}
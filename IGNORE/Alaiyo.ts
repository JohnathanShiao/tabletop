import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { Tiefling } from "../src/Races/Tiefling";
import { Charlatan } from "../src/Backgrounds/Background";
import { Bard } from "../src/Classes/Bard/Bard";
import { CharacterSheet } from "../src/Base/CharacterSheet";

import { Jsonify } from "./Jsonify";
import { Ranger } from "../src/Classes/Ranger/Ranger";

let pc: CharacterSheet = new CharacterSheet(
  new PlayerCharacter(14, 17, 10, 11, 15, 18),
  new Tiefling(),
  new Bard(
    false,
    ["persuasion", "insight", "history"],
    ["Drum", "Lyre", "Flute"],
    {
      isNoInput: false,
      spellSelection: [
        "MESSAGE",
        "VICIOUS MOCKERY",
        "HEALING WORD",
        "THUNDERWAVE",
        "ILLUSORY SCRIPT",
        "DISSONANT WHISPERS",
      ],
    },
    ["RAPIER"],
    "DRUM",
    "SCHOLAR",
  ),
  new Charlatan()
);


pc.levelUp(
  "Bard",
  {
  isNoInput: false,
  spellSelection: ["UNSEEN SERVANT"],
});

pc.levelUp(
  "Bard",
  {
  isNoInput: false,
  spellSelection: ["DETECT THOUGHTS"],
  proficiencySelection: ["history", "insight"],
  archetypeSelection: [{ archetype: "VALOR" }],
});

pc.multiClass(new Ranger(true, ["perception"], {isNoInput: false, favoredEnemy: "White People", favoredTerrain: "Cities"}));

pc.levelUp("Ranger", {isNoInput: false, fightingStyle: ["ARCHERY"], spellSelection: ["HAIL OF THORNS", "HUNTER'S MARK"]});

Jsonify.dumpToJSON(pc.character, "Alaiyo");
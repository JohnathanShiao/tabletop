import { PlayerClass, LevelingParams } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import {ISpell, Spell} from '../Base/Interfaces';
import * as ClassTraits from '../../Assets/ClassTraits.json';
import * as Spells from '../../Assets/Spells.json';

export class Ranger extends PlayerClass {


	abilitiesAtLevels = {};
	features = [];
}

interface rangerParams extends LevelingParams {
	favoredEnemy?: string,
	naturalExplorer?: string
}
import Character from "../models/Character";
import { Relations } from "../models/Character";

const Relate = {
    changeRelationsCoins: (relationsCoins: number, relations: Relations, isIncrease: boolean, isCancel: boolean = false) => {
        //it's awful i know
        if (!isIncrease && !isCancel) {
            if (relations === 0) {
                relationsCoins -= 1;
            } else if (relations === 1) {
                relationsCoins -= 0.75;
            } else if (relations === 2) {
                relationsCoins -= 0.5;
            } else if (relations === 3) {
                relationsCoins -= 0.25;
            } else if (relations === 4) {
                relationsCoins -= 0.1;
            } else if (relations === 5) {
                relationsCoins -= 0.05;
            }
        } else if (!isIncrease && isCancel) {
            if (relations === 0) {
                relationsCoins -= 0.05;
            } else if (relations === 1) {
                relationsCoins -= 0.1;
            } else if (relations === 2) {
                relationsCoins -= 0.25;
            } else if (relations === 3) {
                relationsCoins -= 0.5;
            } else if (relations === 4) {
                relationsCoins -= 0.75;
            } else if (relations === 5) {
                relationsCoins -= 1;
            }
        } else if (isIncrease && !isCancel){
            if (relations === 0) {
                relationsCoins += 0.05;
            } else if (relations === 1) {
                relationsCoins += 0.1;
            } else if (relations === 2) {
                relationsCoins += 0.25;
            } else if (relations === 3) {
                relationsCoins += 0.5;
            } else if (relations === 4) {
                relationsCoins += 0.75;
            } else if (relations === 5) {
                relationsCoins += 1;
            }
        } else {
            if (relations === 0) {
                relationsCoins += 1;
            } else if (relations === 1) {
                relationsCoins += 0.75;
            } else if (relations === 2) {
                relationsCoins += 0.5;
            } else if (relations === 3) {
                relationsCoins += 0.25;
            } else if (relations === 4) {
                relationsCoins += 0.1;
            } else if (relations === 5) {
                relationsCoins += 0.5;
            }
        }
        if (relationsCoins > 100) {
            relationsCoins = 100;
        }
        if (relationsCoins < 0) {
            relationsCoins = 0;
        }
        return relationsCoins;
    },
    changeRelationsStatus: (relationsCoins: number) => {
        let relations: Relations;
        if (relationsCoins >= 90) {
            relations = 5;
        } else if (relationsCoins >= 70) {
            relations = 4;
        } else if (relationsCoins >= 50) {
            relations = 3;
        } else if (relationsCoins >= 30) {
            relations = 2;
        } else if (relationsCoins >= 10) {
            relations = 1;
        } else {
            relations = 0;
        }
        return relations;
    },
    setRelationsCoins: (relations: Relations) => {
        let relationsCoins;
        if (relations === 5) {
            relationsCoins = 100;
        } else if (relations === 4) {
            relationsCoins = 80;
        } else if (relations === 3) {
            relationsCoins = 60;
        } else if (relations === 2) {
            relationsCoins = 40;
        } else if (relations === 1) {
            relationsCoins = 20;
        } else {
            relationsCoins = 0;
        }
        return relationsCoins;
    }
}

export default Relate;
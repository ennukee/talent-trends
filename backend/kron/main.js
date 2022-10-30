const { getData } = require("./getData");

const specMap = {
    DeathKnight: ['Blood', 'Frost', 'Unholy'],
    DemonHunter: ['Havoc', 'Vengeance'],
    Druid: ['Balance', 'Feral', 'Restoration', 'Guardian'],
    Hunter: ['BeastMastery', 'Marksmanship', 'Survival'],
    Mage: ['Fire', 'Frost', 'Arcane'],
    Monk: ['Brewmaster', 'Mistweaver', 'Windwalker'],
    Paladin: ['Holy', 'Retribution', 'Protection'],
    Priest: ['Holy', 'Discipline', 'Shadow'],
    Rogue: ['Assassination', 'Outlaw', 'Subtlety'],
    Shaman: ['Enhancement', 'Elemental', 'Restoration'],
    Warlock: ['Demonology', 'Destruction', 'Affliction'],
    Warrior: ['Protection', 'Fury', 'Arms'],
};

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function main() {
    const classList = Object.keys(specMap);
    // Using a manual for-loop in order to properly utilize async delay functions to rate limit myself
    for (let index = 0; index < classList.length; index++) {
        const className = classList[index];
        const specList = specMap[className];
        for (let specIndex = 0; specIndex < specList.length; specIndex++) {
            const specName = specMap[className][specIndex];
            
            getData(className, specName)
            await delay(2000);
        }
    }
}

main();
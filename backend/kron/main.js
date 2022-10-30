const { getData } = require("./getData");

const specMap = {
    // DeathKnight: ['Blood', 'Frost', 'Unholy'],
    // DemonHunter: ['Havoc', 'Vengeance'],
    // Druid: ['Balance', 'Feral', 'Restoration', 'Guardian'],
    // Hunter: ['BeastMastery', 'Marksmanship', 'Survival'],
    // Mage: ['Fire', 'Frost', 'Arcane'],
    // Monk: ['Brewmaster', 'Mistweaver', 'Windwalker'],
    // Paladin: ['Holy', 'Retribution', 'Protection'],
    // Priest: ['Holy', 'Discipline', 'Shadow'],
    // Rogue: ['Assassination', 'Outlaw', 'Subtlety'],
    // Shaman: ['Enhancement', 'Elemental', 'Restoration'],
    Warlock: ['Demonology', 'Destruction', 'Affliction'],
    Warrior: ['Protection', 'Fury', 'Arms'],
};

const encounterList = [
    // Castle Nathria
    2398, // Shriekwing
    2418, // Huntsman
    2383, // Hungering
    2402, // Sun King
    2405, // Xymox1
    2406, // Inerva
    2412, // Council
    2399, // Sludge
    2417, // SLG
    2407, // Sire

    // Sanctum of Domination
    2423, // Tarragrue
    2433, // Eye
    2429, // Nine
    2432, // Remnant
    2434, // Soulrender
    2430, // Painsmith
    2436, // Guardian
    2431, // Fatescribve
    2422, // KT
    2435, // Sylvanas

    // Sepulcher of the First Ones
    2512, // Vigilant
    2542, // Skolex
    2553, // Xymox2
    2540, // Dausegne
    2544, // Pantheon
    2539, // Lihuvim
    2529, // Halondrus
    2546, // Anduin
    2543, // Lords
    2549, // Rygelon
    2537, // Jailer
]

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
            
            for (let encounterIndex = 0; encounterIndex < encounterList.length; encounterIndex++) {
                getData(className, specName, encounterList[encounterIndex])
                await delay(3000);
            }
        }
    }
}

main();
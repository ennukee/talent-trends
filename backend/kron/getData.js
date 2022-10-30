const axios = require('axios');

const { token } = require('./token');
const { outputGQLErrors } = require('./util/outputGQLErrors');
const { outputRateLimitData } = require('./util/outputRateLimitData');
const { writeToFile } = require('./util/writeToFile');

const base_url = 'https://www.warcraftlogs.com/api/v2/client';

async function main(className, specName) {
    const access_token = await token();
    
    const headers = {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        }
    }

    // 2435
    const gqlQuery = `query fetchData {
        rateLimitData {
            limitPerHour
            pointsSpentThisHour
            pointsResetIn
        }
        worldData {
            encounter(id: 2435) {
                name,
                characterRankings(includeCombatantInfo: true, className: "${className}", specName: "${specName}")
            }
        }
    }`

    // console.log(gqlQuery)

    try {
        axios.post(base_url, {
            operationName: 'fetchData',
            query: gqlQuery,
            variables: {},
        }, headers).then(resp => {
            if (!outputGQLErrors(resp.data)) {
                outputRateLimitData(resp.data)
                writeToFile(resp.data)
                handleCharacterRankings(resp.data.data.worldData.encounter.characterRankings.rankings, className, specName)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

function handleCharacterRankings(rankingsArray, className, specName) {
    const talentData = {}
    rankingsArray.forEach(rank => {
        rank.talents.forEach(talent => {
            if (!talentData[talent.id]) {
                talentData[talent.id] = {
                    spellName: talent.name,
                    commonality: 0,
                    icon: talent.icon,
                };
            }
            talentData[talent.id].commonality++;
        })
    })

    const classData = {
        parses: rankingsArray.length,
        talentData,
    }
    writeToFile(classData, `./data/${className}_${specName}.json`)
}

module.exports = {
    getData: main,
}

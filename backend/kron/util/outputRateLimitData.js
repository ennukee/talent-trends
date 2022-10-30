function outputRateLimitData(respData) {
    const { limitPerHour, pointsSpentThisHour, pointsResetIn } = respData.data.rateLimitData
    console.log(`Remaining points this hour: ${limitPerHour - pointsSpentThisHour}`)
    console.log(`Points reset in: ${Math.floor(pointsResetIn / 60)}m${pointsResetIn % 60}s`)
}

module.exports = {
    outputRateLimitData,
}
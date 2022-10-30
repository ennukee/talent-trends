const axios= require('axios');
const qs = require('qs');

require('dotenv').config();

// Used in development to prevent the token API from being called excessively
const OVERRIDE_CALL = true;
const manual_token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NzlmNGE0Zi02MTgwLTQ3ZmYtYWE4ZC05M2U4OGYxM2QzOGYiLCJqdGkiOiI2NWYxYTlkOGIzYTRhNTUyNjFkN2I2YjFiNTc3ODMxMjQ2ODQ1OWEyOTk5NzRkYTYwMDI1YWNlZTRhZWFkYjFjYzRhOGE3Mjc5Y2FmOWQwYyIsImlhdCI6MTY2NzEwNzQ4NS4yOTA4MjUsIm5iZiI6MTY2NzEwNzQ4NS4yOTA4MjgsImV4cCI6MTY5ODIxMTQ4NS4yNTAzOTQsInN1YiI6IiIsInNjb3BlcyI6WyJ2aWV3LXVzZXItcHJvZmlsZSIsInZpZXctcHJpdmF0ZS1yZXBvcnRzIl19.Q43wfOzR7EhTFCEbO8YsN8pV7zFVzR0Utyyt3FZ9SygbwpDWUnIQBKaEx1ogpDd83dTwor8x80JaJYZBj2tnzpGG2KZ7UgD8iE8UySnuGvLIQSJAZuRFjT1G7xoj6Br8rMEFfM3ALlUOBdIIn1OkdsBb-kos02WTPc-VMM6hvE7yI1J_MyYBFDhVApm1zaMcfL3M4PKNi_DZIn1hNzG-puDwLVmVkmEc9GYapamUGkXt3r8roWDMmNMFHazPJL33RDTF4SYWP-OlxB9VyE32YHwLnrMQxK4obudMYd0sCOXReIFf09d0orTMlTIf2bna3LNkRQqt1fM_gGYWNeVovtXGKGrhADkneX3YH6o1oajGGnEQQLPWwOkEf86CTUddR5CqmueybIaP4u2kWxArlPAVQAn4SFL0-IViYavhra6Nstwt9bRhk4SytxKYtTW-NG_FTR5Ew5TJP89wvV4v2qPt37CbGDV9eF8CtEKT7o7ptcJu5SOJy7SlNubCsZ_0As5Gvpbf0P3zKw3Ow0seMqI9sO8Xk5LIpTz4ZQ8Ipl4PyiKzel4x9lXMmtoAg-NjYsla0sTfu4DqVyQ44ma2Of-6Go4xu2hrzYRtrxXoML5JgoOYs2xi5jedFUS1PcqoF2Tus2MzOr8zgWmbRZyknah3x2V4uMR9Jx644LYU4eg`;

const auth_token = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, 'utf-8').toString('base64');
async function token() {
    if (OVERRIDE_CALL) return manual_token
    try {
        const options = {
            url: 'https://www.warcraftlogs.com/oauth/token',
            data: qs.stringify({ grant_type: 'client_credentials' }),
            method: 'POST',
            headers: {
                Authorization: `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        const resp = await axios(options)
        const access_token = resp.data.access_token
        return access_token
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    token,
}
const outputGQLErrors = (data) => {
    if (data && data.errors) {
        console.log(data.errors)
        // console.log(data.errors[0].locations)
        // console.log(data.errors[0].extensions)
        return true
    }
}

module.exports = {
    outputGQLErrors,
}
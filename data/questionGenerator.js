const questionGenerator = {
    multiDigitNumbers: function generateMultiDigitNumbers(){
        const min = 10
        const max = 100000000
        const randomNumber= Math.floor(Math.random() * (max - min + 1)) + min

        const numLength = JSON.stringify(randomNumber).length
        console.log('number length:', numlength)
    }
}
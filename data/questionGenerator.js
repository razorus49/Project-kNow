

const questionGenerator = {
    multiDigitNumbers: function generateMultiDigitNumbers(){
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
  
        const min = 10
        const max = 100000000
        const randomNumber= getRandomInt(min, max)
  
        const numLength = String(randomNumber).length
        const digit = getRandomInt(1,numLength)
        const question = "what does the " + String(digit) + "th digit (from left to right) represent in the number " + String(randomNumber) + "?" 
        const randomOption = getRandomInt(0,3) //select random index of option array to put correct ans
        let options=[0,0,0,0]  
        
        for(let i=0;i<4;++i){
          let num = Number(String(randomNumber).charAt(digit-1)) * (10** getRandomInt(numLength))
  
          //check if random answer is actually the correct answer, and if so, regenerate random options
          while(num === Number(String(randomNumber).charAt(digit-1)) * (10** (numLength-digit))){
            num = Number(String(randomNumber).charAt(digit-1)) * (10** getRandomInt(numLength))
          }
          options[i] = Number(String(randomNumber).charAt(digit-1)) * (10** getRandomInt(0,numLength))
        }
  
        options[randomOption] = Number(String(randomNumber).charAt(digit-1)) * (10** (numLength-digit))
        const answer = randomOption+1
        return {question:question, options:options, answer:answer}
    }
  }


  export default questionGenerator
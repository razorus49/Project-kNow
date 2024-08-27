

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

    ,wordsPerMinute: function generateWordsPerMinute() {
      let names = ['John', 'Bob', 'Ryan', 'Josh', 'James', 'Mary', 'Elizabeth', 'David', 'Ian', 'Jessica', 'Maria'];
      let randomNameNum = Math.round((Math.random()*(names.length-1)+0));
      num1 = Number(randomNameNum);

      // just some code to randomly generate names for the word problem
      function select2Names(firstChar) {
          flag = false;
          do {
              num2 = Math.round((Math.random()*(names.length-1)+0));
              if (num2 != firstChar) {
                  return num2;
                  flag = true;
              }
          } while (!flag)
      }
      num2 = Number(select2Names(num1));

      characterOne = names[num1];
      characterTwo = names[num2];

      function getRandomInt(min,max) {
          return Math.floor((Math.random() * (max-min)) + min);
      }

      // range of wpm values will go from 20 - 100 for this question
      const wpmMin = 20;
      const wpmMax = 100;
      // range of minute values will go from 2 - 10 for this question
      const minsMin = 2;
      const minsMax = 10;

      let minsValue = getRandomInt(minsMin, minsMax);
      let minsValue2 = getRandomInt(minsMin, minsMax);

      // function to make sure that the answers will be whole numbers
      function divisibleWPM(theMinuteValue, wpmMin, wpmMax) {
          do{
              flag = false;
              let randomWpmValue = getRandomInt(wpmMin, wpmMax);
              if (randomWpmValue%theMinuteValue == 0) {
                  return randomWpmValue;
                  flag = true;
              }
          }while(!flag)
      }
      let wpmValue = divisibleWPM(minsValue,wpmMin,wpmMax);
      let wpmValue2 = divisibleWPM(minsValue2,wpmMin,wpmMax);


      let q1 = (`${characterOne} can type ${wpmValue} words in ${minsValue} minutes. `);
      let q2 = (`${characterTwo} can type ${wpmValue2} words in ${minsValue2} minutes. `);
      let q3 = (`What is the difference between the words per minute that ${characterOne} and ${characterTwo} can type? `);
      question = q1+q2+q3

      let ans = Math.abs((wpmValue/minsValue) - (wpmValue2/minsValue2));

      const randomOption = getRandomInt(0,3);
      let options = [0,0,0,0];

      // the smallest possible answer is 0, and the largest possible answer is 48 (for the values i used above)
      let ansMin = 0;
      let ansMax = (wpmMax/minsMin) - (wpmMin/minsMax);

      // assigning random values to options array
      // and making sure no answers are repeated in the options array 
      do{
          flag = false;
          for (let i=0;i<4;++i) {
              options[i] = Math.floor((Math.random() * (ansMax-ansMin)) + ansMin);
          }
          if (options[0] != options[1] && options[0] != options[2] && options[0] != options[3] && options[0] != ans) {
              if (options[1] != options[0] && options[1] != options[2] && options[1] != options[3] && options[1] != ans) {
                  if (options[2] != options[0] && options[2] != options[1] && options[2] != options[3] && options[2] != ans) {
                      if (options[3] != options[0] && options[3] != options[1] && options[3] != options[2] && options[3] != ans) {
                          flag = true;
                      }
                  }
              }
          }
      }while(!flag)

      let randomPos = getRandomInt(0,3);
      options[randomPos] = ans;

      return {question:question, options:options, answer:ans}
    }

    ,factorsOfEquation: function generateFactorsOfEquation () {
        function getRandomInt(min,max) {
            return Math.floor((Math.random() * (max-min)) + min);
        }
        
        let result = getRandomInt(40,100);
        
        function divisibleResult(result) {
            let half = result/2;
            let flag = false;
            do {
                let divisor1 = getRandomInt(2,half);
                if (result%divisor1 == 0 && divisor1 != 2) {
                    return divisor1;
                    flag = true;
                }
            }while(!flag)
        }
        
        let divisor1 = divisibleResult(result);
        let ans = (result/divisor1);
        let question = `What factors enable the following equation to be established: ${divisor1} x __ = ${result}`
        let options = [0,0,0,0]
        
        let half2 = ans/2;
        let ansMin = (ans-half2);
        let ansMax = (ans+half2);
        
        do{
            flag = false;
            for (let i=0;i<4;++i) {
                options[i] = Math.floor((Math.random() * (ansMax-ansMin)) + ansMin);
            }
            if (options[0] != options[1] && options[0] != options[2] && options[0] != options[3] && options[0] != ans) {
                if (options[1] != options[0] && options[1] != options[2] && options[1] != options[3] && options[1] != ans) {
                    if (options[2] != options[0] && options[2] != options[1] && options[2] != options[3] && options[2] != ans) {
                        if (options[3] != options[0] && options[3] != options[1] && options[3] != options[2] && options[3] != ans) {
                            flag = true;
                        }
                    }
                }
            }
        }while(!flag)
        
        let randomPos = getRandomInt(0,3);
        options[randomPos] = ans;
        
        return {question: question, options: options, answer: ans}
    }

    ,variableSubstitution: function generateVariableSubstitution() {
        function getRandomInt(min,max) {
            return Math.floor((Math.random() * (max-min)) + min);
        }
        
        let variables = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'm', 'n', 'p', 'q', 'r', 's', 't', 'x', 'y', 'z'];
        let randomVar = Math.round((Math.random()*(variables.length-1)+0));
        
        let varOne = variables[randomVar];
        
        let result1 = getRandomInt(15, 50);
        let multiplier = getRandomInt(3,9);
        
        function divisibleResult(result) {
            let half = result/2;
            let flag = false;
            do {
                let divisor1 = getRandomInt(2,half);
                if (result%divisor1 == 0) {
                    return divisor1;
                    flag = true;
                }
            }while(!flag)
        }
        
        let divisor1 = divisibleResult(result1);
        let question = `If ${divisor1}${varOne} = ${result1}, then ${multiplier}${varOne} = ?`
        
        let options = [0,0,0,0];
        let actualVar = result1/divisor1;
        let ans = multiplier*actualVar;
        
        let half = ans/2;
        let ansMin = (ans-half);
        let ansMax = (ans+half)
        
        do{
            flag = false;
            for (let i=0;i<4;++i) {
                options[i] = Math.floor((Math.random() * (ansMax-ansMin)) + ansMin);
            }
            if (options[0] != options[1] && options[0] != options[2] && options[0] != options[3] && options[0] != ans) {
                if (options[1] != options[0] && options[1] != options[2] && options[1] != options[3] && options[1] != ans) {
                    if (options[2] != options[0] && options[2] != options[1] && options[2] != options[3] && options[2] != ans) {
                        if (options[3] != options[0] && options[3] != options[1] && options[3] != options[2] && options[3] != ans) {
                            flag = true;
                        }
                    }
                }
            }
        }while(!flag)
        
        let randomPos = getRandomInt(0,3);
        options[randomPos] = ans;
        
        return {question: question, options: options, answer: ans}
    }

    ,differentDenominatorFraction: function generateDifferentDenominatorFraction() {
        let foods = ["apples", "oranges", "bananas", "pears", "peaches", "carrots", "watermelons", "pizzas", "strawberries", "blueberries"];
        let chosenFood = foods[(Math.floor((Math.random() * (foods.length-1))+0))];

        function getRandomInt(min,max) {
            return Math.floor((Math.random() * (max-min)) + min);
        }

        let numOfBoxes = getRandomInt(150,30);

        function findFactors(number) {
            let highestFactor = number/2;
            let arrayOfFactors = [];
            for(let i=1;i<highestFactor+1;++i) {
                if (number%i == 0) {
                    arrayOfFactors.push(i);
                }
            }
            return arrayOfFactors;
        }
        let arrayOfFactors = findFactors(numOfBoxes);
        let numOfFactors = arrayOfFactors.length;

        let flag = false;
        function generateNum1() {
            do{
                let num1 = getRandomInt(0,numOfFactors-1);
                if (num1 != 1 && num1 > 1) {
                    return num1;
                    flag = true;
                }
            }while(!flag)
        }

        let num1 = generateNum1();

        function select2Numbers(firstChar) {
            let flag = false;
            do {
                let num2 = Math.round((Math.random()*(numOfFactors-1)+0));
                if (num2 != firstChar && num2 > 1) {
                    return num2;
                    flag = true;
                }
            } while (!flag)
        }
        let num2 = Number(select2Numbers(num1));

        let denominator1 = arrayOfFactors[num1];
        let denominator2 = arrayOfFactors[num2];
        let numerator1 = getRandomInt(1,(denominator1*(1/2)));
        let numerator2 = getRandomInt(1,(denominator2*(1/2)));

        let fraction1 = `${numerator1}/${denominator1}`;
        let fraction2 = `${numerator2}/${denominator2}`;

        let q1 = `A truck is transporting ${numOfBoxes} boxes of ${chosenFood}. `;
        let q2 = `${fraction1} of them are transported in the first trip and ${fraction2} of them are transported in the second trip. `;
        let q3 = `How many boxes of ${chosenFood} are left?`;
        let question = q1+q2+q3;

        let ans = numOfBoxes - (((eval(fraction1))*numOfBoxes) + ((eval(fraction2))*numOfBoxes));
        let halfAns = ans/2;

        let options = [0,0,0,0];

        let ansMin = ans-halfAns;
        let ansMax = ans+halfAns;

        do{
            flag = false;
            for (let i=0;i<4;++i) {
                options[i] = Math.floor((Math.random() * (ansMax-ansMin)) + ansMin);
            }
            if (options[0] != options[1] && options[0] != options[2] && options[0] != options[3] && options[0] != ans) {
                if (options[1] != options[0] && options[1] != options[2] && options[1] != options[3] && options[1] != ans) {
                    if (options[2] != options[0] && options[2] != options[1] && options[2] != options[3] && options[2] != ans) {
                        if (options[3] != options[0] && options[3] != options[1] && options[3] != options[2] && options[3] != ans) {
                            flag = true;
                        }
                    }
                }
            }
        }while(!flag)

        let randomPos = getRandomInt(0,3);
        options[randomPos] = ans;

        return {question: question, options: options, answer: ans}
    }
  }

  export default questionGenerator
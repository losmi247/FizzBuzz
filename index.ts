const readline = require('node:readline');

type Check = {
    divisor: number,
    symbol: string
}
var orderedInitialChecks: Check[] = [
    {divisor: 3, symbol: "Fizz"}, {divisor: 5, symbol: "Buzz"}, 
    {divisor: 7, symbol: "Bang"}
];
/// Fizz, Buzz, Bang
function initialChecks(num: number, out: string[]) : void {
     for(let i = 0; i < orderedInitialChecks.length; i++){
        if(num%orderedInitialChecks[i].divisor == 0){
            out.push(orderedInitialChecks[i].symbol);
        }
    }
}

/// Fezz
function fezzCheck(num: number, out: string[]) : void {
    /// add a B so if no element starts with a B, we put Fezz at the end
    out.push('B');
    let index = out.findIndex((value: string, index: number, obj: string[]) => {
        return value.charAt(0) == 'B'
    });
    out.pop();

    if(num%13 == 0){
        out.splice(index, 0, 'Fezz');
    }
}

// Bong
function bongCheck(num: number, out: string[]) : void {
    if(num%11 == 0){
        /// clear the array
        out.splice(0, out.length);
        out.push('Bong');
    }
}

/// reverse
function reverseCheck(num: number, out: string[]) : void {
    if(num%17 == 0){
        out.reverse();
    }
}


function fizzBuzz(maxNum: number, ruleList: string[]) : void {
    for(let num = 1; num <= maxNum; num++){
        let out: string[] = [];

        initialChecks(num, out);
        fezzCheck(num, out);
        bongCheck(num, out);
        reverseCheck(num, out);
        /// if no rule fired, print the number
        if(!out.length) out.push(num.toString());
        
        console.log(out.join(''));
    }
}

function main(){
    const {stdin: input, stdout: output} = require('node:process');
    const rl = readline.createInterface({input, output});
    /// pick rules
    rl.question('Type in names of the rules you want to use: ', (ruleNames: string) => {
        let ruleList = ruleNames.split(', ');
        /// max number
        rl.question('Enter the maximum number: ', (maxNum: number) => {
            fizzBuzz(maxNum, ruleList);
            rl.close();
        });
    });
}

main();
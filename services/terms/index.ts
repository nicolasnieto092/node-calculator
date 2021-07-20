
import { DivisionByZeroError, BadInputError, UnbalancedParenthesisError } from '../../errors/index.js';

const VALID_CHARS = '+-*/(). ';
const OPERATORS = '+-*/';

/**
 * Parses and calculates a Mathematical Term
 * @param {string} term 
 * @returns {number} Mathematical Term result
 */
export function termParser(term: string): number{
    
    //remove white spaces from math term and replace -- for +
    term = term.split('').filter((char: string) => char != ' ').join('').split('--').join('+');

    try {

        //Check for invalid characters and incorrect operators
        for(let i=0;i<term.length;i++){
            let character = term[i];
            let nextCharacter = term[i+1];
            if(!character) continue;
            if(!characterIsValid(character) && !characterIsNumber(character)){
                throw new BadInputError(`Unexpected token '${character}'`);
            }
            //incorrect operator order (e.g 2+*4, 10/*2)
            if((('+-/').indexOf(character) != -1 && nextCharacter == '*') || (('+-*').indexOf(character) != -1 && nextCharacter == '/')){
                throw new BadInputError(`Unexpected token '${nextCharacter}'`);
            }
            //incorrect subsequent operators (e.g 2++3, 1+++)
            if(characterIsValid(character) && character == nextCharacter && '() '.indexOf(character) == -1){
                throw new BadInputError(`Unexpected token '${nextCharacter}'`);
            }
            //term ending with operator (e.g 10*)
            if(characterIsOperator(term[term.length-1])){
                throw new BadInputError(`Unexpected token '${term[term.length-1]}'`);
            }
            //term starting with an invalid operator (e.g. /4+1, *1+2)
            if(('*/').indexOf(term[0]) != -1){
                throw new BadInputError(`Unexpected token '${term[0]}'`);
            }
        }

        //Check for unbalanced parentheses
        if(balancedParentheses(term) == false){
            throw new UnbalancedParenthesisError('Unbalanced Parenthesis Error');
        }
        
        //If term has parentheses, call parenthesesParser()
        //otherwhise parse and calculate result
        if(term.indexOf('(') != -1 || term.indexOf(')') != -1){
            return Number(parenthesesParser(term).toFixed(2));
        } else {
            let result = parseAdditionTerm(term);
            if(typeof(result) != 'number' && !characterIsNumber(result)){
                throw new BadInputError('Invalid expression');
            } else {
                result = Number(result);
            }
            return Number(result.toFixed(2));
        }

    } catch (err){
        throw err;
    }

}

/**
 * Parses Mathematical term and calculates addition
 * @param {string} term 
 * @returns {number} Addition result
 */
function parseAdditionTerm(term: any){
    return term.split('+').map((a: any)=>parseSubstractionTerm(a)).reduce((a: any,b: any)=>Number(a)+Number(b));
}

/**
 * Parses Mathematical term and calculates substraction
 * @param {string} term 
 * @returns {number} Substraction result
 */
function parseSubstractionTerm(term: any){
    //Dont split '*-' and '/-' (e.g. -1*-2)
    term = term.split('*-').join('*#');
    term = term.split('/-').join('/#');
    return term.split('-').map((a: any)=>parseMultiplicationTerm(a)).reduce((a: any,b: any)=>Number(a)-Number(b));
}

/**
 * Parses Mathematical term and calculates multiplication
 * @param {string} term 
 * @returns {number} Multiplication result
 */
function parseMultiplicationTerm(term: any){
    return term.split('#').join('-').split('*').map((a: any)=>parseDivisionTerm(a)).reduce((a: any,b: any)=>Number(a)*Number(b));
}

/**
 * Parses Mathematical term and calculates division
 * @param {string} term 
 * @returns {number} Division result
 */
function parseDivisionTerm(term: any){

    return term.split('/').reduce(function(a: number,b: number){
        if(Number(b) === 0){
            throw new DivisionByZeroError(`Division by zero error`);
        } else {
            return Number(a)/Number(b)
        }
    });

}

/**
 * Calculates a Mathematical Term between parentheses
 * @param {string} term 
 * @returns {string} Result of the term between parentheses
 */
function parenthesesParser(term: string): number{

    let stack: any[] = [];
    let termToProcess: any[] = [];
    let currentCharacter;
    let nextCharacter;
    let currentTermNumber: string[];

    //Use a stack for checking closing parentheses
    //Once a parenthesis closes, call termParser() for parsing and calculating
    //the expression without parenthesis (termToProcess), stringify its result and pushing it into the stack.
    //When no more parentheses left, call termParser() for calculating the result.
    for(let i=0;i<term.length;i++){
        currentCharacter = term[i];
        nextCharacter = term[i+1];
        //if current character is nonnumerical
        if(characterIsValid(currentCharacter) && !('-+'.indexOf(currentCharacter) != -1 && characterIsNumber(nextCharacter))){
            if(currentCharacter == ')'){
                //If current character is a closing parentheses
                //pop the stack and push to the array to process
                //until i find the opening parenthesis
                while(stack[stack.length-1] != '('){
                    termToProcess.unshift(stack.pop());
                }
                //pop opening parentheses
                stack.pop();
                //push to the stack the processed and stringified term between parentheses
                stack.push(String(termParser(termToProcess.join(''))));
                termToProcess = [];
            } else {
                //push nonnumerical characters like operators and opening parentheses
                stack.push(currentCharacter);
            }
        } else {
            //If current and next character are number, concat them until find a nonnumerical character.
            //When find a nonnumerical character, push number to the stack. (e.g. '10')
            currentTermNumber = [];
            currentTermNumber.push(term[i]);
            while(nextCharacter && !characterIsValid(nextCharacter)){
                i++;
                currentCharacter = term[i];
                nextCharacter = term[i+1];
                currentTermNumber.push(currentCharacter);
            }
            //push to the stack the stringified number
            stack.push(currentTermNumber.join(''));
        }
    }

    return termParser(stack.join(''));

}


/**
 * Checks if a parentheses expression is balanced
 * @param {string} term 
 * @returns {boolean} If a parentheses expression is balanced or not
 */
function balancedParentheses(term: string): boolean{

    let stack: any[] = [];

    for(let i=0;i<term.length;i++){
        if(term[i] == '('){
            stack.push(term[i]);
        } else if(term[i] == ')'){
            if(stack[stack.length-1] == '('){
                stack.pop();
            } else {
                stack.push(term[i]);
            }
        } 
    }

    return stack.length == 0;

}

/**
 * Check if string character is a number
 * @param {string} character 
 * @returns {boolean} If string character is a number or not
 */
function characterIsNumber(character:string): boolean{
    return (String(character) >= '0' && String(character) <= '9');
}

/**
 * Check if string is a valid character (operator, parenthesies, whitespace, decimal separator)
 * @param {string} character 
 * @returns {boolean} If string character is a valid character
 */
function characterIsValid(character:string): boolean{
    return VALID_CHARS.indexOf(character) != -1;
}

/**
 * Check if character is a valid operator
 * @param {string} character 
 * @returns {boolean} If character is a valid operator
 */
function characterIsOperator(character:string): boolean{
    return OPERATORS.indexOf(character) != -1;
}
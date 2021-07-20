import { v4 as uuidv4 } from 'uuid';
import { TermNotFoundError } from '../../errors/index.js';

//initialize an empty array for storing history in memory
let termsHistory : any = [];

/**
 * Class representing a Mathematical Term Model
 */
export class TermModel {
    term: string
    result: number
    termId: string
    date: Date

    /**
     * Create a Mathematical Term Model
     * @param {string} term 
     * @param {number} result 
     */
    constructor(term: string='', result: number=0){
        this.term = term;
        this.result = result;
        this.termId = uuidv4();
        this.date = new Date();
    }

    /**
     * Save the Mathematical Term in memory and return it
     * @returns {object} Saved Mathematical term
     */
    save(){
        termsHistory.unshift(this);
        return this;
    }

    /**
     * Get from memory a Mathematical Term given a term id and return it
     * @returns {Array} Mathematical Terms history
     */
    get(termId: string){
        let termIndex = termsHistory.map((term: { termId: any; })=>term.termId).indexOf(termId);
        if(termIndex == -1){
            throw new TermNotFoundError(`Term with id ${termId} not found`);
        } else {
            return termsHistory[termIndex];
        }
    }

    /**
     * Get all Mathematical Terms from memory and return them
     * @returns {Array} Mathematical Terms history
     */
    getAll(){
        return termsHistory;
    }

    /**
     * Delete a Mathematical Term given a term id
     * @param {string} termId 
     * @returns {object} Deleted Mathematical Term
     */
    delete(termId: string){
        let termIndex = termsHistory.map((term: { termId: any; })=>term.termId).indexOf(termId);
        if(termIndex == -1){
            throw new TermNotFoundError(`Term with id ${termId} not found`);
        } else {
            let term = termsHistory[termIndex];
            termsHistory.splice(termIndex,1);
            return term;
        }
    }

}
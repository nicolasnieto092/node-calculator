import { Request, Response } from 'express';
import { termParser } from '../../services/terms';
import { TermModel } from '../../models/terms';
 
/**
 * GET term controller
 * @param req Request object
 * @param res Response object
 */
export async function getTermsController(req: Request, res: Response) {
    let termModel = new TermModel();
    try{
        //get term given a term id
        if(req.params.term_id){
            return res.send(termModel.get(req.params.term_id));
        }
    } catch (err){
        if(err.name == 'TermNotFoundError'){
            return res.status(404).send({ error: { name: err.name, detail: err.message }});
        }
    }
    //get all saved math terms
    return res.send(termModel.getAll());
}

/**
 * DELETE term controller
 * @param req Request object
 * @param res Response object
 */
export async function deleteTermsController(req: Request, res: Response) {

    //get math term id from req.params
    let termId = req.params.term_id;
    let termModel = new TermModel();

    try{
        //delete math term
        let deletedTerm = termModel.delete(termId);
        return res.send(deletedTerm);
    } catch(err){
        if(err.name == 'TermNotFoundError'){
            return res.status(404).send({ error: { name: err.name, detail: err.message }});
        }
        return res.status(400).send({ error: { name: err.name, detail: err.message }});
    }

}

/**
 * POST term controller
 * @param req Request object
 * @param res Response object
 */
export async function processTermsController(req: Request, res: Response) {
    let result: number;
    let term;

    try {

        if(!('term' in req.body)){
            return res.status(400).send({ error: { name: "BadInputError", detail: "Missing 'term' key in POST request body" }});
        }
        
        //remove white spaces from math term
        term = req.body.term;

        //parse and process math term
        result = termParser(term);

        //save it
        let termModel = new TermModel(term, result);
        let processedTerm = termModel.save();

        return res.send(processedTerm);
    } catch (err) {
        return res.status(400).send({ error: { name: err.name, detail: err.message }, term: term });
    }

}
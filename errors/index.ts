export class DivisionByZeroError extends Error {
    constructor(message: string | undefined){
        super(message)
        this.name = 'DivisionByZeroError';
    }
}

export class BadInputError extends Error {
    constructor(message: string | undefined){
        super(message)
        this.name = 'BadInputError';
    }
}

export class TermNotFoundError extends Error {
    constructor(message: string | undefined){
        super(message)
        this.name = 'TermNotFoundError';
    }
}

export class UnbalancedParenthesisError extends Error {
    constructor(message: string | undefined){
        super(message)
        this.name = 'UnbalancedParenthesisError';
    }
}

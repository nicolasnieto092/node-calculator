# Calculator API
Simple Node.js/Typescript API that parses and calculates a Mathematical expression


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [API Docs](#api-docs)

## General info
This is a simple Node.js API that parses and calculates a Mathematical expression.  

It keeps a history of all processed calculations, and provides an interface for
listing and deleting stored calculations.

    	
## Technologies
Project is created with:
* **typescript**: 4.3.5
* **express**: 4.17.1
* **jest**: 27.0.6
* **uuid**: 8.3.2
	
## Setup
To run app locally using npm:

```
$ npm install
$ npm run build
$ npm start
```

## Testing    
For testing simply run:

```
$ npm test
``` 

<br />

## API Docs
  
* **URL**

    */calculator/terms/:term_id*

* **Method:**
  
  `GET`    

*  **URL Params**

   **Optional:**
 
   `term_id=[alphanumeric]`

<br />

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `[{
                    "term: "2+2",
                    "result": 4,
                    "termId": "9c005cf0-78f4-491c-8003-44d18c267411",
                    "date": "2021-07-20T19:12:57.274Z"
                   }]`  

<br />

* **Error Response:**

  * **Code:** 404 NOT_FOUND <br />
    **Content:** `{
                    "error": {
                        "name": "TermNotFoundError",
                        "detail": "Term with id foo not found"
                    }
                   }`

<br />
<br />

* **URL**

    */calculator/terms*

* **Method:**
  
  `POST`    

*  **POST BODY**

   **Required**
 
   `{"term": "2+2"}`

 <br /> 
  
* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{
                    "term: "2+2",
                    "result": 4,
                    "termId": "9c005cf0-78f4-491c-8003-44d18c267411",
                    "date": "2021-07-20T19:12:57.274Z"
                   }`  
 
 <br />

* **Error Response:**

  * **Code:** 400 BAD_REQUEST <br />
    **Content:** `{
                    "error": {
                        "name": "DivisionByZeroError",
                        "detail": "Division by zero error"
                    },
                    "term": "0/0"
                    }`

  * **Code:** 400 BAD_REQUEST <br />
    **Content:** `{
                    "error": {
                        "name": "BadInputError",
                        "detail": "Unexpected token '?'"
                    },
                    "term": "2+?"
                }`
  * **Code:** 400 BAD_REQUEST <br />
    **Content:** `{
                    "error": {
                        "name": "BadInputError",
                        "detail": "Missing 'term' key in POST request body"
                    }
                  }`

<br />
<br />

* **URL**

    */calculator/terms/:term_id*

* **Method:**
  
  `DELETE`

*  **URL Params**

   **Required:**
 
   `term_id=[alphanumeric]`

<br />

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{
                    "term: "2+2",
                    "result": 4,
                    "termId": "9c005cf0-78f4-491c-8003-44d18c267411",
                    "date": "2021-07-20T19:12:57.274Z"
                   }`  
 
<br />

* **Error Response:**

  * **Code:** 404 NOT_FOUND <br />
    **Content:** `{
                    "error": {
                        "name": "TermNotFoundError",
                        "detail": "Term with id foo not found"
                    }
                  }`
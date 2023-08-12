sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document (HTTP status code 200 OK)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file (HTTP status code 200 OK)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file (HTTP status code 200 OK)
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ] (HTTP status code 200 OK)
    deactivate server

    Note right of browser: The browser executes the callback function that re-renders the notes. 
    Note right of browser: The page was initialized without any notes, since the default state is an empty array. 
    Note right of browser: Since we received the data.json, the js code parsed it to an array of js objects and then called a function called redrawNotes, which recreates the list of notes based on the array we just fetched, and then updates the contents of the list in the DOM.
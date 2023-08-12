sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (payload: {note: 'note content'})
    activate server
    Note left of server: The server is saving the new note sent into the db
    server-->>browser: HTTP status code 302 Found
    deactivate server
    Note right of browser: HTTP code 302 is often used when you want to give a response to a POST/PUT method that is not the uploaded resource but a confirmation message such as: 'you successfully uploaded your note'.

    Note right of browser: The browser fetches all the page again after successfully uploading the note
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document (HTTP status code 200 OK)
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file (HTTP status code 200 OK)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file (HTTP status code 200 OK)
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ] (HTTP status code 200 OK)
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
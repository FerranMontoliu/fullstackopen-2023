sequenceDiagram
    participant browser
    participant server

    Note right of browser: [Previous state] In our js code, we have the 'notes' array, which was initialized empty, and then filled with the content of the 'data.js'. 
    Note right of browser: After the user presses the submit button, the browser updates the 'notes' array (appending the new note to it), and then it executes the callback function that re-renders the notes. 
    Note right of browser: To do so, it calls a function named redrawNotes, which recreates the list of notes based on the array we just updated, and then updates the contents of the list in the DOM.
    Note right of browser: After that, we send the new note to the server, like this:
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (payload: {content: 'note content', date: '2023-08-12T14:08:02.823Z'})
    activate server
    server-->>browser: { message: 'note created' } (HTTP status code 201 Created)
    deactivate server

    Note right of browser: This approach has several concurrency problems and does not account for errors when submitting the POST.
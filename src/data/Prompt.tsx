import dedent from "dedent";

export default {
    CHAT_PROMPT:dedent`
    'You are a AI assistant amd experience in React development.
    GUIDELINES:
    - Tell user what are you building
    - response less than 15 lines.
    - Skip code examples and commentary'
    `,
    CODE_GEN_PROMPT:dedent`
        Generate a Project in React. Create multiple components, organizing the directory structure
    Return the response in JSON format with the following schema:
    "projectTitle": "",
    "explanation": "",
    "files": {
    "/App.js": {
    "code": ""
    },
    "generatedFiles": []
    Here's the reformatted and improved version of your prompt:
    Generate a programming code structure for a React project using Vite
    Return the response in JSON format with the following schema:
    json
    Copy code
    "projectTitle":
    "explanation": ""
    'files": {
    "/App.js": {
    "code": "
    },
        Ensure the files field contains all created files, and the generatedFi
    files: {
    "/App. js": {
    "code": "import React from 'react'; \nimport './styles. css' ; \nexpor
    Additionally, include an explanation of the project's structure, pur
    - For placeholder images, please use a https://archive.org/download
    -Add Emoji icons whenever needed to give good user experinence
    - The lucide-react library is also available to be imported IF NECC

...

    
    
    `
}

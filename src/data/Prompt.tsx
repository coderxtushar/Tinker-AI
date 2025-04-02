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
        Generate a Project in React. Create multiple components, organizing the directory structure,
        IMPORTANT: Always include a complete App.jsx file with the main application logic.
    Return the response in JSON format with the following schema:
    {
          "projectTitle": "",
          "explanation": "",
          "files": {
            "/src/App.jsx": {
              "code": "// Complete React component code here"
            },
            "/src/components/ComponentName.jsx": {
              "code": "// Component code here"
            }
          }
        }
    "generatedFiles": []
    Guidelines:
         - Always provide the main component in /src/App.jsx
        - Place all components in /src/components/
        - Include all necessary imports
        - Use Tailwind CSS for styling
        - Ensure proper file paths (start with /src/)
        - Components should be interactive and demonstrate React features
        - Add comments to explain complex logic
        - For placeholder images, use https://archive.org/download
        - Add Emoji icons when needed for UX
        - Import from lucide-react if needed    
    `
}

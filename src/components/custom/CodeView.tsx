"use client"
import Lookup from "@/data/Lookup";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";

function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { messages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();
  const [loading, setLoading] = useState(false); 
  
  useEffect(() => {
    id && GetFiles();
  }, [id]);
  
  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id as Id<"workspace">
    });
    if (result?.fileData) {
      const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result.fileData };
      setFiles(mergedFiles);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === 'user') {
        GenAiCode();
      }
    }
  }, [messages]);

  const GenAiCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    try {
      const result = await axios.post('/api/gen-ai-code', {
        prompt: PROMPT
      });
      const aiResp = result.data;
  
      if (aiResp?.files) {
        // First, normalize all paths and move everything to /src
        const newFiles = Object.entries(aiResp.files).reduce<Record<string, { code: string }>>((acc, [path, content]) => {
          // Skip files in root that should be in src
          if (['/App.jsx', '/App.js', '/App.css', '/index.js'].includes(path)) {
            return acc;
          }

          let normalizedPath = path.startsWith('/') ? path : `/${path}`;
          
          // Move components to src/components
          if (normalizedPath.includes('components/')) {
            normalizedPath = normalizedPath.replace('components/', 'src/components/');
          } 
          // Move App and related files to src
          else if (normalizedPath.endsWith('App.jsx') || 
                   normalizedPath.endsWith('App.js') || 
                   normalizedPath.endsWith('App.css')) {
            normalizedPath = `/src${normalizedPath}`;
          }
          // Move other files to src if not already there
          else if (!normalizedPath.startsWith('/src/')) {
            normalizedPath = `/src${normalizedPath}`;
          }

          acc[normalizedPath] = {
            code: typeof content === 'string' ? content : (content as { code: string }).code
          };
          return acc;
        }, {});

        // Update App.jsx to include component imports
        if (Object.keys(newFiles).some(path => path.includes('/src/components/'))) {
          const componentImports = Object.keys(newFiles)
            .filter(path => path.includes('/src/components/'))
            .map(path => {
              const componentName = path.split('/').pop()?.replace('.jsx', '');
              return `import ${componentName} from './components/${componentName}';`;
            })
            .join('\n');

          const appJsxPath = '/src/App.jsx';
          const existingAppCode = newFiles[appJsxPath]?.code || '';
          
          // Insert imports at the beginning of the file
          newFiles[appJsxPath] = {
            code: `import React from 'react';\nimport './App.css';\n${componentImports}\n\n${existingAppCode}`
          };
        }

        const mergedFiles = {
          ...Lookup.DEFAULT_FILE,
          ...Lookup.VITE_CONFIG,
          ...newFiles,
          '/src/App.jsx': newFiles['/src/App.jsx'] || Lookup.DEFAULT_APP['/src/App.jsx']
        };

        setFiles(mergedFiles);
        await UpdateFiles({
          workspace: id as Id<"workspace">,
          files: newFiles
        });
      }
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2 onClick={() => setActiveTab('code')}
            className={`text-sm cursor-pointer ${activeTab === 'code' && 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'}`}>Code</h2>
          <h2 onClick={() => setActiveTab('preview')}
            className={`text-sm cursor-pointer ${activeTab === 'preview' && 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'}`}>Preview</h2>
        </div>
      </div>
      <SandpackProvider template="react" theme={'dark'}
        files={files}
        customSetup={{
          entry: "/src/main.jsx",
          environment: "node",
          dependencies: {
            ...Lookup.DEPENDENCY
          }
        }}
        options={{
          externalResources: ['https://cdn.tailwindcss.com']
        }}>
        <SandpackLayout>
          {activeTab === 'code' ? <>
            <SandpackFileExplorer style={{ height: '80vh' }} />
            <SandpackCodeEditor style={{ height: '80vh' }} />
          </> :
            <>
              <SandpackPreview style={{ height: '80vh' }} showNavigator={true} />
            </>}
        </SandpackLayout>
      </SandpackProvider>
      {loading && <div className="p-10 bg-gray-900 opacity-90 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white"/>
          <h2 className="text-white">Generating your Files...</h2>
      </div>}
    </div>
  )
}

export default CodeView;
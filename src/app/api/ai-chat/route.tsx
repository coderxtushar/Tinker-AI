import { NextResponse } from "next/server";
import { chatSession } from "../../../../configs/AiModel";

export async function POST(req: { json: () => PromiseLike<{ prompt: any; }> | { prompt: any; }; }){
    const {prompt} =await req.json();

    try{
        const result = await chatSession.sendMessage(prompt);
        const AIResp = result.response.text();
        return NextResponse.json({result:AIResp})
    }catch(e){
        return NextResponse.json({error:e})
    }
}
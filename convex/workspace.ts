import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkspace = mutation({
    args:{
        messages: v.any(),
        user:v.id('users')
    },
    handler :async(ctx,args)=>{
        const workspaceId = await ctx.db.insert('workspace', {
            message:args.messages,
            user:args.user
        });
        return workspaceId; 
    },
});

export const GetWorkspace = query({
    args:{
        workspaceId: v.id('workspace')
    },
    handler:async(ctx, args)=>{
        const result = await ctx.db.get(args.workspaceId);
        return result;
    },
});

export const UpdateMesssages=mutation({
    args:{
        workspace:v.id('workspace'),
        messages:v.any()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.workspace, { message: args.messages });
        return result;
    },
})

export const UpdateFiles=mutation({
    args:{
        workspace:v.id('workspace'),
        files:v.any()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.workspace, { fileData: args.files });
        return result;
    },
})

export const GetAllWorkspace = query({
    args:{
        userId : v.id('users')
    },
    handler : async(ctx, args)=>{
        const result = await ctx.db.query('workspace')
        .filter(q=>q.eq(q.field('user'),args.userId))
        .collect();

        return result;
    }
})
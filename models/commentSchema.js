const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:
    {
        type:String,
    },
    //comments belongs to the post
    post:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
     //comments belongs to the user
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        autopopulate:true
    },
    likes:[
        {   
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"
        }
    ],
    update:
    {
        type:Boolean,
        required:true
    },
    edited:
    {
        type:Boolean,
        required:true,
    },
    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CommentReply"
        }
    ]
    

},{
    timestamps:true
});
commentSchema.plugin(require('mongoose-autopopulate'));
const Comment=mongoose.model("Comment",commentSchema);
module.exports=Comment;
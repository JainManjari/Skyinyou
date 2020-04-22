// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: '/comments/create-comment',
                data: $(self).serialize(),
                success: function(data){
                    //console.log("creating comment ",data.data);
                    let commentData=data.data.comment;
                    if(!data.data.comment.user.avatar)
                    {
                        if(data.data.comment.user.gender=="male")
                        {
                            //console.log("m");
                            commentData.imageURL="https://i.stack.imgur.com/HQwHI.jpg";
                        }
                        else
                        {
                            commentData.imageURL="/images/femaleProfile.png";
                        }
                    }
                    else
                    {
                        commentData.imageURL=data.data.comment.user.avatar;
                    }
                    //console.log(data.data.comment.user._id,data.data.post.user._id);
                    if(data.data.comment.user._id==data.data.post.user._id)
                    {
                        //console.log("match");
                        commentData.authorTag="author-tag";
                        commentData.author="Author"
                    }
                    else
                    {
                        //console.log("unmatch");
                        commentData.authorTag="";
                        commentData.author="";
                    }
                 
                    let newComment = pSelf.newCommentDom(commentData);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    let commentsCount=parseInt($(`#post-${postId}-comment-number`).attr("data-comments"));
                    commentsCount+=1;
                    $(`#post-${postId}-comment-number`).attr("data-comments",commentsCount);
                    $(`#post-${postId}-comment-number`).html(`${commentsCount} <i class="fas fa-comments"></i>`);
                  
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    new ToggleLike($(" .toggle-like-button", newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment._id }" class="comment-list">

                    <div class="like-box">
                        <a href="/likes/toggle/?id=${comment._id }&type=Comment" data-likes="0" class="toggle-like-button">0 <i class="fas fa-thumbs-up like-thumbs"></i></a>
                    </div>

                    <div class="comment-view-likes"   data-target="#comment-${comment._id }-likes" data-toggle="collapse" style="right:17%;"
                    >
                        View Likes
                    </div>
                    
                        <ul id="comment-${ comment._id }-likes" class="comment-like-username-list collapse" >
                                
                        </ul>

                    <small class="comment-deletion">
                        <a class="delete-comment-button" href="/comments/destroy-comment/${comment._id}">
                            <i class="fas fa-times"></i>
                        </a>
                    </small>
                        
                    <div class="content">    
                           
                        <p>    
                            ${comment.content}
                            <br>
                            <small class="author-comment-name">
                                <img src="${comment.imageURL}">
                                ${comment.user.name}<span class="${comment.authorTag}"> ${comment.author}</span>
                            </small>
                        </p> 
                    </div>   

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log("inside delte button ");
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                
                    console.log("remove comment: ",data);
                    $(`#comment-${data.data.comment_id}`).remove();
                    let commentsCount=parseInt($(`#post-${data.data.postID}-comment-number`).attr("data-comments"));
                    console.log(commentsCount);
                    commentsCount-=1;
                    $(`#post-${data.data.postID}-comment-number`).attr("data-comments",commentsCount);
                    $(`#post-${data.data.postID}-comment-number`).html(`${commentsCount} <i class="fas fa-comments"></i>`);
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}
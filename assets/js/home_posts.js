{
    //console.log("hello");

    //method to submit the form data for new post using ajax
    let creatPost=function()
    {
        let newPostForm=$("#new-post-form");
        newPostForm.submit(function(e)
        {
            e.preventDefault();

            $.ajax({
                type:"post",
                url:"/posts/create-post",
                data:newPostForm.serialize(),
                success:function(data)
                {
                    console.log(data.data.post);
                    let newPost=newDomPost(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                    deletePost($(" .delete-post-button",newPost));
                    updatePost($(" .update-post-button",newPost));
                    //call the create comment class
                    new PostComments(data.data.post._id);
                    new ToggleLike($(" .toggle-like-button", newPost));
                    new SharePost($(" .toggle-share-button", newPost));
                    new Noty({
                        theme:"relax",
                        text:"Post published!",
                        type:"success",
                        layput:"topRight",
                        timeout:1500
                    }).show();

                },
                error:function(err)
                {
                    console.log(err.responseText);
                }
            })
        })
    }
    

    //method to create post in DOM
    let newDomPost=function(i)
    {
        return $(`

        <li class="post-list animated-box in" id="post-${ i._id}">
           
        <div class="post-like-box">
            <div class="post-likes-number" id="post-${ i._id }-likes-number">
                <span data-target="#post-${i._id }-likes" data-toggle="modal">0</span>
                <a class="toggle-like-button" href="/likes/toggle/?id=${i._id}&type=Post" data-likes="0">
                    <i class="fas fa-thumbs-up like-thumbs"></i>
                </a>
            </div>
            <div class="modal fade" id="post-${ i._id }-likes" role="dialog">
                <div class="modal-dialog">
                
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title" id="#post-${i._id}-title">Post Reactions  
                        <br></i></h4>
                    </div>
                    <div class="modal-body">
                        <ul  class="post-like-username-list" id="post-${ i._id }-likes-list">
                            
                    
                        </ul>
                    </div>
                
                </div>
                
                </div>
          </div>
   
    
        </div>
        
        <small> 
        <a href="/posts/destroy-post/${ i._id }" class="delete-post-button">
            <i class="fas fa-trash-alt"></i>
        </a>
        </small>
        <small> 
            <a href="/posts/update-post/${i._id }" class="update-post-button">
                <i class="fas fa-pen-fancy"></i>
            </a>
        </small>
        <small class="author-post-name">
            <a href="/users/profile/${i.user._id}">
                <img src="${ i.user.avatar}"> 
                <span>${i.user.name }</span>
            </a>
        </small>

        <div class="post-content" id="post-${i._id}-content">
         
            <div class="post-text">
               <span> ${ i.content}</span>
            </div>
            <div class="post-comments">
                <form action="/comments/create-comment" method="post" id="post-${ i._id }-comments-form">
                    <input type="text" name="content" placeholder="Type here to add comment...." required>
                    <input type="hidden" name="post" value="${ i._id }">
                    <button type="submit">Add comment</button>
                </form>
                <div class="post-comment-number" id="post-${ i._id}-comment-number" data-comments="0" data-target="#post-comments-${i._id}-list" data-toggle="collapse" >
                <span >
                    0
                </span>
                <i class="fas fa-comments"></i>
            </div>
            </div>
            <div class="post-comments-list collapse" id="post-comments-${i._id }-list">
                <ul id="post-comments-${i._id}">
                   
                </ul>
        
            </div>
        </div>
        <div class="post-timestamps">
            ${ i.createdAt.toLocaleString() }
        </div>
        <div class="post-share-box">
      
        <div class="post-shares-number" id="post- ${i._id }-shares-number">
            <span class="post-shares-no-display" data-target="#post-${i.id}-shares" data-toggle="modal" >0</span>
            <span data-toggle="modal" data-target="#post-${i._id}-share-modal">
                <i class="fas fa-share"></i>
            </span>
        </div>
        
        <div class="modal fade" id="post-${i._id}-shares" role="dialog">
            <div class="modal-dialog">
            
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="#post-${i._id}-title">Post Shares 
                      <br></h4>
                </div>
                <div class="modal-body">
                    <ul  class="post-share-username-list" id="post-${i._id}-shares-list">
                       
                
                    </ul>
                </div>
               
              </div>
              
            </div>
          </div>

        <div class="modal post-share-modal fade" id="post-${i._id}-share-modal" role="dialog" >
            <div class="modal-dialog">
            
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="#post-${i._id}-title">Share this Post?
                      <br></h4>
                </div>
                <div class=" modal-body"  >
                <form action="/posts/share-post/" method="post" class="toggle-share-button" data-shares="0" id="post-${i._id }-share-form">
                <input type="text" name="content" required value="Add some thoughts to it!!!">
                <input type="hidden" name="post" value="${i._id}">
                
            
                <div class="shared-post-form">
                    <p>
                        <a href="/users/profile/${i.user._id}">
                            
                                <img src="${ i.user.avatar}"> 
                                <span>${i.user.name}</span>
                        </a>
                    </p>
                    <p class="share-content">
                        ${i.content}
                    </p>
                </div>
                <div class="modal-footer">
                    <button onclick="submitForm(this)" class="btn btn-secondary" data-dismiss="modal" name="${ i._id}">Submit</button>
                </div>
            </form>
            
                    
                </div>
              
            </div>
          </div>
   
    
        </div>
        </li>`);
    }

    let deletePost=function(deletelink)
    {
        $(deletelink).click(function(e)
        {
            e.preventDefault();
            $.ajax({
                type:"get",
                url:$(deletelink).prop("href"),
                success:function(data)
                {
                    console.log(data);
                    $(`#post-${data.data.postID}`).remove();
                    if(data.data.shareID)
                    {
                        let shareCounts=parseInt($(`#post-${data.data.originalPostID}-share-form`).attr("data-shares"));
                        shareCounts-=1;
                        $(`#post-${data.data.originalPostID}-share-form`).attr("data-shares",shareCounts);
                        $(`#post-${data.data.originalPostID}-shares-number .post-shares-no-display`).html(`${shareCounts}`);
                        $(`#share-${data.data.shareID}`).remove();

                    }
                    new Noty({
                        theme:"relax",
                        text:"Post and associated comments are deleted!",
                        type:"success",
                        layput:"topRight",
                        timeout:1500
                    }).show();
                },
                error:function(err)
                {
                    console.log(err.responseText);
                }
            })
        })
    }

    
    let updatePost=function(updateLink)
    {
        $(updateLink).click(function(e)
        {
            e.preventDefault();
            $.ajax({
                type:"post",
                url:$(updateLink).prop("href"),
                success:function(data)
                {
                    console.log(data.data);
                   // $(`#post-${data.data.postId}-content .post-text`).html(`hhh`);
                   $(`#post-${data.data.postID}-content .post-text > span`).remove();
                   
                        if(!data.data.shared)
                        {
                                $(`#post-${data.data.postID}-content .post-text`).prepend(`<form action="/posts/update-post-p2" method="post" class="post-update-form">
                                <textarea required  name="content" >${data.data.content}</textarea>
                                <input type="hidden" name="post" value="${data.data.postID}">
                                <button type="submit">Update</button>
                                </form>`);
                        }
                        else
                        {
                                $(`#post-${data.data.postID}-content .post-text`).prepend(`<form action="/posts/update-post-p2" method="post" class="post-update-form">
                                <textarea required  name="content" >${data.data.content.newContent}</textarea>
                                <input type="hidden" name="post" value="${data.data.postID}">
                                <button type="submit">Update</button>
                                </form>`);
                               

                        }
                    
                    upadePostContent();

                },
                error:function(err)
                {
                    console.log(err.responseText);
                }
            })
        })
    }

    let upadePostContent=function()
    {
        $(".post-update-form").submit(function(e)
        {
            e.preventDefault();
            $.ajax({
                type:"post",
                url:"/posts/update-post-p2",
                data:$(".post-update-form").serialize(),
                success:function(data)
                {
                    console.log(data.data);
                    $(`#post-${data.data.postID}`).prepend(`<small class="post-editedTag">
                    Edited
                    </small>`);
                    $(`#post-${data.data.postID}-content .post-text form`).remove();
                    $(`#post-${data.data.postID}-content .post-text`).prepend(`<span>${data.data.content}</span>`);
                    new Noty({
                        theme:"relax",
                        text:"Post updated successfully!",
                        type:"success",
                        layput:"topRight",
                        timeout:1500
                    }).show();
                },
                error:function(err)
                {
                    console.log(err.responseText);
                    return;
                }
            })
        })
    }
   

    //convert posts to ajax
    let postsToAjax=function()
    {
        console.log("converting posts to ajax ");
        $("#posts-list-container>ul>li").each(function()
        {
            let self=$(this);
            let deleteButton=$(" .delete-post-button",self);
            let updateButton=$(" .update-post-button",self);
            updatePost(updateButton);
            deletePost(deleteButton);

            let postId=self.prop("id").split("-")[1];
            new PostComments(postId);
        })
    }
    creatPost();
    postsToAjax();

}
import CommentWidget from "../widgets/CommentWidget";

const CommentsWidget = (commentIds) => {       
    return (
        <>
      {commentIds?.postId.map(
        ({
          _id,
          userId,
          name,
          userAvatar,          
          content,          
          commentAvatar,          
          likes,
          postId          
        }) => (
          
          <CommentWidget
            key={_id}
            commentId={_id}
            commentUserId={userId}         
            name={name}
            userAvatar={userAvatar}            
            content={content}            
            commentAvatar={commentAvatar}            
            likes={likes}
            postId={postId}            
          />          
        )
      )}      
    </>
    )
};

export default CommentsWidget;
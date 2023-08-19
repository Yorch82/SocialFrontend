import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../../state/index";
import CommentWidget from "../widgets/CommentWidget";

const CommentsWidget = () => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const token = useSelector((state) => state.token);
    const getComments = async () => {
        const response = await fetch("http://localhost:8080/comments/getAll", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        
        dispatch(setComments({ comments: data }));
      };
      
      useEffect(() => {
        getComments();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
      
    return (
        <>
      {comments.map(
        ({
          _id,
          userId,
          name,
          userAvatar,          
          content,          
          commentAvatar,          
          likes,          
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
          />          
        )
      )}      
    </>
    )
};

export default CommentsWidget;
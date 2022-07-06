/* eslint-disable prettier/prettier */

import { useDispatch , useSelector } from "react-redux";

export const useActions = () => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const deleteComment = async (newsId , id) => {
        await dispatch.comments.deleteCommentAsync({ newsId:newsId, commentId: id });
      };

      const tryAgain = async (pageNumber) => {
        await dispatch.news.getAllNewsAsync(pageNumber);
      };

      const deleteNews = (id) => {
        
        dispatch.news.deleteNewsAsync(id);
      };

    return {
        dispatch,
        state  ,
        deleteComment,
        tryAgain,
        deleteNews
    }
}

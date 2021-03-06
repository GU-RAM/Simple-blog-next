import React, { createContext, useEffect, useState } from 'react';
import { getPosts, getUsers, getComments, postNewComment } from '../api/index';
import { createDataFetcher } from '../utilities/helpers';

const AppContext = createContext(undefined);

const AppContextComponent = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postsLoadingStatus, setPostsLoadingStatus] = useState(true);
  const [users, setUsers] = useState([]);
  const [userLoadingStatus, setUserLoadingStatus] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentsLoadingStatus, setCommentsLoadingStatus] = useState(true);

  useEffect(() => {
    createDataFetcher(getPosts, setPosts, setPostsLoadingStatus);
    createDataFetcher(getUsers, setUsers, setUserLoadingStatus);
    createDataFetcher(getComments, setComments, setCommentsLoadingStatus);
  }, []);

  function addNewComment(dat) {
    return postNewComment(dat, comments, setComments);
  }

  const randomImage = id => {
    return `https://picsum.photos/id/${id}/200`;
  };
  return (
    <AppContext.Provider
      value={{
        posts,
        users,
        comments,
        postsLoadingStatus,
        userLoadingStatus,
        commentsLoadingStatus,
        randomImage,
        addNewComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextComponent };

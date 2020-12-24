import React, { createContext, useEffect, useState } from 'react';
import { getPosts, getUsers, getComments } from '../api/index';

const AppContext = createContext();

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
  return (
    <AppContext.Provider value={(posts, users, comments)}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextComponent;

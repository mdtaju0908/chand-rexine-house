import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchContent } from '../api';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data } = await fetchContent();
      setContent(data);
    } catch (error) {
      console.error('Failed to load website content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContentByKey = (key, fallback = '') => {
    const item = content.find(c => c.key === key);
    return item ? item.value : fallback;
  };

  const refreshContent = () => {
    loadContent();
  };

  return (
    <ContentContext.Provider value={{ content, loading, getContentByKey, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
};

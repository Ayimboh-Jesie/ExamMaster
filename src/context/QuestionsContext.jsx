import React, { createContext, useState, useContext, useMemo } from 'react';
import axiosInstance from '../config/axios';

const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axiosInstance.get("/questions/");
      setQuestions(res.data.questions);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch questions");
      console.error("Error fetching questions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return question[key].includes(value);
      });
    });
  }, [questions, filters]);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        isLoading,
        error,
        getQuestions,
        filteredQuestions,
        setFilters
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};
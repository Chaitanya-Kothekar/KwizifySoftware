// Another Routing for Exam Menu component  , & this is imported in index.js

import DashBoard from 'Components/DashBoard';
import ExamMenu from 'Components/ExamMenu';
import List from 'Components/List';
import Questions from 'Components/Questions';
import MainLayout from 'layout/MainLayout';

const MainRExamCreationRoutesoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/createBtn',
      element: (
        <>
          <ExamMenu />
          <DashBoard />
        </>
      )
    },
    {
      path: '/listBtn',
      element: (
        <>
          <ExamMenu />
          <List />
        </>
      )
    },
    {
      path: '/questionsBtn',
      element: (
        <>
          <ExamMenu />
          <Questions />
        </>
      )
    }
  ]
};

export default MainRExamCreationRoutesoutes;

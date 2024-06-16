import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MarksSection from 'Components/MarksSection';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const QuizDefault = Loadable(lazy(() => import('views/examReport/index')));
const ClassCreate = Loadable(lazy(() => import('../Components/ClassCreate')));
const SubjectCreation = Loadable(lazy(() => import('../Components/SubjectCreation')));
const ClassSubMapping = Loadable(lazy(() => import('../Components/Class&SubMap')));
const StudentCreation = Loadable(lazy(() => import('../Components/StudentCreate')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/kwizify',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'class-create',
      children: [
        {
          path: '/class-create',
          element: <ClassCreate />
        }
      ]
    },
    {
      path: 'subject-create',
      children: [
        {
          path: '/subject-create',
          element: <SubjectCreation />
        }
      ]
    },
    {
      path: 'class-sub-mapping',
      children: [
        {
          path: '/class-sub-mapping',
          element: <ClassSubMapping />
        }
      ]
    },
    {
      path: 'student-creation',
      children: [
        {
          path: '/student-creation',
          element: <StudentCreation />
        }
      ]
    },

    {
      path: 'quiz',
      children: [
        {
          path: 'Marks-Section',
          element: <MarksSection />
        },
        {
          path: 'exam-report',
          element: <QuizDefault />
        }
      ]
    }
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-typography',
    //       element: <UtilsTypography />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-color',
    //       element: <UtilsColor />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-shadow',
    //       element: <UtilsShadow />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'sample-page',
    //   element: <SamplePage />
    // }
  ]
};

export default MainRoutes;

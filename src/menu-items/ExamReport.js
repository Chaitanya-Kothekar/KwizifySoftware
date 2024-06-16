// assets
import DescriptionIcon from '@mui/icons-material/Description';

// constant
const icons = { IconClipboardData: DescriptionIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const ExamReport = {
  id: 'quiz',
  title: 'Report',
  type: 'group',
  children: [
    {
      id: 'MarksSection',
      title: 'Marks Section',
      type: 'item',
      url: '/quiz/Marks-Section',
      icon: icons.IconClipboardData,
      breadcrumbs: false
    },
    {
      id: 'ExamReport',
      title: 'ExamReport',
      type: 'item',
      url: '/quiz/exam-report',
      icon: icons.IconClipboardData,
      breadcrumbs: false
    }
  ]
};

export default ExamReport;

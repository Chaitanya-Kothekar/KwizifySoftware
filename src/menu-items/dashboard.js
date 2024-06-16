// assets
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/MenuBook';
import JoinIcon from '@mui/icons-material/CompareArrows';
import UserIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';

// constant
const icons = {
  ClassCreation: SchoolIcon,
  SubjectCreation: SubjectIcon,
  ClassSubjectMapping: JoinIcon,
  StudentCreation: UserIcon,
  ExamCreation: BookIcon
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Creation',
  type: 'group',
  children: [
    {
      id: 'ClassCreation',
      title: 'Class Creation',
      type: 'item',
      url: '/class-create',
      icon: icons.ClassCreation,
      breadcrumbs: false,
    },
    {
      id: 'SubjectCreation',
      title: 'Subject Creation',
      type: 'item',
      url: '/subject-create',
      icon: icons.SubjectCreation,
      breadcrumbs: false
    },
    {
      id: 'Class&SubjectMapping',
      title: 'Class & Sub Mapping',
      type: 'item',
      url: '/class-sub-mapping',
      icon: icons.ClassSubjectMapping,
      breadcrumbs: false
    },
    {
      id: 'StudentCreation',
      title: 'Student Creation',
      type: 'item',
      url: '/student-creation',
      icon: icons.StudentCreation,
      breadcrumbs: false
    },
    {
      id: 'ExamCreation',
      title: 'Exam Creation',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.ExamCreation,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

import { useEffect, useState } from 'react';
import ExamReport from '../../Components/ExamReport';
// import { createBrowserRouter } from 'react-router-dom';

// material-ui
// import { Grid } from '@mui/material';

// project imports
// import Temp from './chart-data/Temp';
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
// import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Quiz = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return <ExamReport isLoading={isLoading} />;
};

export default Quiz;

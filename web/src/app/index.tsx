import { Fragment } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { withErrorHandler } from 'app/components/error-handling';
import AppErrorBoundaryFallback from 'app/components/error-handling/fallbacks/App';
import { Helmet } from 'react-helmet-async';
import { Box, GlobalStyles } from '@mui/material';
import NotificationSnackbar from 'app/components/NotificationSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnackbarNotification } from 'store/state/selectors';
import { appActions } from 'store/state';
import { Homepage } from './pages/Homepage';
import { CertifiedInstructors } from '././pages/CertifiedInstructors/Loadable';
import { CertifiedRiggers } from './pages/CertifiedRiggers/Loadable';
import { CertifiedGears } from './pages/CertifiedGears/Loadable';
import { EquipmentWarnings } from './pages/EquipmentWarnings/Loadable';
import { Verify } from './pages/Verify';
import { Verify as VerifyAsync } from './pages/Verify/Loadable';
import { ISALogoBackground } from './components/ISALogoBackground';

function ISADocs() {
  const snackbarNotification = useSelector(selectSnackbarNotification);
  const dispatch = useDispatch();

  const onSnackbarClose = () => {
    dispatch(appActions.updateSnackbarNotification(null));
  };

  const isVerifyWebsite = window.location.host?.split('.')[0] === 'verify';

  return isVerifyWebsite ? (
    <Verify />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/certified-instructors" element={<CertifiedInstructors />} />
        <Route path="/certified-riggers" element={<CertifiedRiggers />} />
        <Route path="/certified-gears" element={<CertifiedGears />} />
        <Route path="/equipment-warnings" element={<EquipmentWarnings />} />
        <Route path="/verify" element={<VerifyAsync />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      <NotificationSnackbar snackbarNotification={snackbarNotification} onClose={onSnackbarClose} />
    </BrowserRouter>
  );
}

export function App() {
  return (
    <Fragment>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            fontFamily: 'Lato, sans-serif',
            height: '100%',
            width: '100%',
          },
        }}
      />
      <Box
        component="main"
        sx={{
          width: '100%',
          height: '100vh',
          p: 2,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <ISALogoBackground />
        <ISADocs />
      </Box>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);

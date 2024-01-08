import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { withErrorHandler } from 'app/components/error-handling';
import AppErrorBoundaryFallback from 'app/components/error-handling/fallbacks/App';
import { Helmet } from 'react-helmet-async';
import { Box, GlobalStyles } from '@mui/material';
import NotificationSnackbar from 'app/components/NotificationSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnackbarNotification } from 'store/state/selectors';
import { appActions } from 'store/state';
import { HomepageLayout } from './components/HomepageLayout';
import { Homepage } from './pages/Homepage';
import { CertifiedInstructors } from '././pages/CertifiedInstructors/Loadable';
import { CertifiedRiggers } from './pages/CertifiedRiggers/Loadable';
import { CertifiedGears } from './pages/CertifiedGears/Loadable';
import { EquipmentWarnings } from './pages/EquipmentWarnings/Loadable';
import { Verify } from './pages/Verify/Loadable';

function ISADocs() {
  const snackbarNotification = useSelector(selectSnackbarNotification);
  const dispatch = useDispatch();

  const onSnackbarClose = () => {
    dispatch(appActions.updateSnackbarNotification(null));
  };

  return (
    <BrowserRouter>
      <HomepageLayout>
        <Routes>
          <Route path="*" element={<Homepage />} />
          <Route path="/certified-instructors" element={<CertifiedInstructors />} />
          <Route path="/certified-riggers" element={<CertifiedRiggers />} />
          <Route path="/certified-gears" element={<CertifiedGears />} />
          <Route path="/equipment-warnings" element={<EquipmentWarnings />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </HomepageLayout>
      <NotificationSnackbar snackbarNotification={snackbarNotification} onClose={onSnackbarClose} />
    </BrowserRouter>
  );
}

export function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Helmet>
        <meta name="description" content="ISA Docs" />
      </Helmet>
      <GlobalStyles
        styles={{
          body: {
            fontFamily: 'Lato',
            height: '100%',
            width: '100%',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          objectFit: 'contain',
          backgroundImage: 'url(/images/isa-logo.svg)',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          p: 1,
          zIndex: -1,
          filter: 'opacity(0.04) grayscale(100%)',
        }}
      />

      <ISADocs />
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);

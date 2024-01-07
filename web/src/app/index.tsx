import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { withErrorHandler } from 'app/components/error-handling';
import AppErrorBoundaryFallback from 'app/components/error-handling/fallbacks/App';
import { Helmet } from 'react-helmet-async';
import { GlobalStyles } from '@mui/material';
import NotificationSnackbar from 'app/components/NotificationSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnackbarNotification } from 'store/state/selectors';
import { appActions } from 'store/state';
import { HomepageLayout } from './components/HomepageLayout';
import { Homepage } from './pages/Homepage';
import { CertifiedInstructors } from '././pages/CertifiedInstructors/Loadable';

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
      <ISADocs />
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);

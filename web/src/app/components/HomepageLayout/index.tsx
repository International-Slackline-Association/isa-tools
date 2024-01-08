import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { Breadcrumbs, Divider, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation, useSearchParams } from 'react-router-dom';
import { homepageItems } from 'app/pages/Homepage';

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

const LinkRouter = (props: any) => <Link {...props} component={RouterLink} />;

const breadcrumbNameMap = homepageItems.reduce((acc, item) => {
  acc[item.route] = item.title;
  return acc;
}, {});

export const HomepageLayout = (props: Props) => {
  const { children } = props;

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isEmbeddedlayout = searchParams.get('layout') === 'embed';

  const pathnames = location.pathname.split('/').filter((x) => x);

  const MainContent = () => (
    <Box
      component="main"
      sx={{
        width: '100%',
        p: isEmbeddedlayout ? 2 : 0,
        height: isEmbeddedlayout ? '100vh' : '100%',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  );

  return isEmbeddedlayout ? (
    <MainContent />
  ) : (
    <Stack
      direction={'column'}
      spacing={2}
      sx={{
        px: { xs: 4, lg: 24 },
        py: { xs: 1, lg: 4 },
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
      }}
    >
      <img
        style={{ maxWidth: '100%', height: '80px' }}
        src={'/images/isa-logo-wide.svg'}
        alt="ISA Logo"
      />
      <Typography variant="h4">Slackline International Docs</Typography>
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        The <b>official</b> lists, sheets, and digital documents from the ISA
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Breadcrumbs separator=">" sx={{ alignSelf: 'flex-start', fontStyle: 'italic' }}>
          <LinkRouter underline="hover" color="inherit" to="/">
            Home
          </LinkRouter>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return last ? (
              <Typography variant="body2Bold" color="text.primary" key={to}>
                {breadcrumbNameMap[to]}
              </Typography>
            ) : (
              <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                {breadcrumbNameMap[to]}
              </LinkRouter>
            );
          })}
        </Breadcrumbs>
        <Link
          color="text.primary"
          href={`mailto:${'info@slacklineinternational.org'}?subject=${encodeURIComponent(
            'ISA Docs Contact',
          )}`}
        >
          <Typography variant={'body2'}>Contact</Typography>
        </Link>
      </Box>

      <Divider flexItem />
      <MainContent />
    </Stack>
  );
};

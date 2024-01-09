import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  Typography,
  colors,
  Stack,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Button,
  Link,
  Divider,
} from '@mui/material';
import { signApi } from 'app/api/sign-api';
import { ISALogoBackground } from 'app/components/ISALogoBackground';
import { Helmet } from 'react-helmet-async';

export function Verify() {
  const sp = new URLSearchParams(window.location.search);
  const token = sp.get('token') || '';

  const { data, isFetching } = signApi.useVerifyQuery(token, { skip: !token });

  return (
    <>
      <Helmet>
        <title>ISA Verify</title>
        <meta name="description" content="Verify ISA Codes" />
      </Helmet>
      <Stack
        spacing={4}
        component={Paper}
        elevation={5}
        sx={{
          mx: { xs: 2, lg: 4 },
          px: 8,
          py: 2,
          height: '100%',
          position: 'relative',
        }}
      >
        <ISALogoBackground zIndex={1} width="80%" height="80%" />
        <Divider flexItem>
          <img style={{ width: '100%' }} src={'/images/isa-logo-wide.svg'} alt="ISA Logo" />{' '}
        </Divider>

        {data?.isVerified && (
          <Typography
            variant="body2"
            sx={{
              fontStyle: 'italic',
              color: 'text.secondary',
            }}
          >
            This document was digitally signed for <b>{data?.subject}</b> on <b>{data?.issuedAt}</b>{' '}
            and is valid until <b> {data?.expiresAt}</b>
          </Typography>
        )}

        {isFetching && <CircularProgress sx={{ alignSelf: 'center' }} />}

        <Typography
          variant="h5"
          sx={{
            fontStyle: 'bold',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          {!token && 'There is no code to verify in the URL'}
          {data?.content}
        </Typography>

        <Typography variant="body2" color={'text.secondary'} sx={{ fontStyle: 'italic' }}>
          <b>verify.slacklineinternational.org</b> page confirms that the document was issued by the
          International Slackline Association. It uses standard cryptography to prevent forgery.
        </Typography>
      </Stack>
    </>
  );
}

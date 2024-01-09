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
} from '@mui/material';
import { listingsApi } from 'app/api/listings-api';
import { AlternatingTableRow } from '../CertifiedInstructors';

export function CertifiedRiggers() {
  const { data, isFetching } = listingsApi.useGetRiggerListQuery();

  return (
    <Stack spacing={2}>
      <Typography textAlign={'left'} variant="body2Bold">
        List of riggers certified by ISA
      </Typography>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Expiration Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <AlternatingTableRow key={row.certId}>
                  <TableCell>
                    <a href={`mailto:${row.email}`}>Contact</a>
                  </TableCell>
                  <TableCell>{row.name?.substring(0, 50)}</TableCell>
                  <TableCell>{row.country?.substring(0, 20)}</TableCell>
                  <TableCell>{row.expirationDate}</TableCell>
                </AlternatingTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

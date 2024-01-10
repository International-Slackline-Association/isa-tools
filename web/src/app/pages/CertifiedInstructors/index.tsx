import {
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  colors,
  styled,
} from '@mui/material';

import { listingsApi } from 'app/api/listings-api';

export const AlternatingTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: ${() => colors.grey[200]};
  }
`;

export function CertifiedInstructors() {
  const { data, isFetching } = listingsApi.useGetInstructorsListQuery();

  return (
    <Stack spacing={2}>
      <Typography textAlign={'left'} variant="body2Bold">
        List of instructors certified by ISA
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
                <TableCell>Level</TableCell>
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
                  <TableCell>{row.level}</TableCell>
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

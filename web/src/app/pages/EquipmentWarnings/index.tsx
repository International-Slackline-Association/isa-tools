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
} from '@mui/material';

import { listingsApi } from 'app/api/listings-api';

import { AlternatingTableRow } from '../CertifiedInstructors';

export function EquipmentWarnings() {
  const { data, isFetching } = listingsApi.useGetEquipmentWarningsQuery();

  return (
    <Stack spacing={2}>
      <Typography textAlign={'left'} variant="body2Bold">
        Warnings and recalls for slackline equipment
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
                <TableCell>Status</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Product Type</TableCell>
                <TableCell>In Production</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <AlternatingTableRow key={index}>
                  <TableCell>
                    {row.status === 'Warning' ? (
                      <Typography color={'orange'}>Warning</Typography>
                    ) : row.status === 'Recall' ? (
                      <Typography color={'red'}>Recall</Typography>
                    ) : (
                      <Typography>{row.status}</Typography>
                    )}
                  </TableCell>
                  <TableCell>{row.manufacturer}</TableCell>
                  <TableCell>{row.model}</TableCell>
                  <TableCell>{row.productType}</TableCell>
                  <TableCell>{row.inProduction}</TableCell>
                </AlternatingTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

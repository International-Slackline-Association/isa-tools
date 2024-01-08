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
} from '@mui/material';
import { listingsApi } from 'app/api/listings-api';
import { AlternatingTableRow } from '../CertifiedInstructors';

export function CertifiedGears() {
  const { data, isFetching } = listingsApi.useGetCertifiedGearsQuery();

  return (
    <Stack spacing={2}>
      <Typography textAlign={'left'} variant="body2Bold">
        List of gears certified by ISA
      </Typography>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Standard</TableCell>
                <TableCell>Product Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <AlternatingTableRow key={row.certId}>
                  <TableCell>
                    <a href={`mailto:${row.email}`}>Contact</a>
                  </TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>{row.modelName}</TableCell>
                  <TableCell>{row.standard}</TableCell>
                  <TableCell>
                    <Link href={row.productLink}>Product Link</Link>
                  </TableCell>
                </AlternatingTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

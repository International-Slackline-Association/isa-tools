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
} from '@mui/material';

import { listingsApi } from 'app/api/listings-api';
import { intersectAll, useDropdownFilter } from 'app/components/DropdownFilter/useDropdownFilter';

import { AlternatingTableRow } from '../CertifiedInstructors';

export function WorldRecords() {
  const { data, isFetching } = listingsApi.useGetWorldRecordsQuery();

  const genderFilter = useDropdownFilter({
    label: 'Gender',
    list: data?.map((row) => row.category),
    filterer: [data, 'category'],
  });

  const countryFilter = useDropdownFilter({
    label: 'Country',
    list: data?.map((row) => row.country),
    filterer: [data, 'country'],
  });

  const typeOfRecordFilter = useDropdownFilter({
    label: 'Type of Record',
    list: data?.map((row) => row.typeOfRecord),
    filterer: [data, 'typeOfRecord'],
  });

  const typeOfLineFilter = useDropdownFilter({
    label: 'Type of Line',
    list: data?.map((row) => row.typeOfLine),
    filterer: [data, 'typeOfLine'],
  });

  const filteredItems = intersectAll(
    genderFilter.filteredItems,
    countryFilter.filteredItems,
    typeOfRecordFilter.filteredItems,
    typeOfLineFilter.filteredItems,
  );

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignSelf={'flex-end'}>
        <genderFilter.DropdownFilter />
        <countryFilter.DropdownFilter />
        <typeOfRecordFilter.DropdownFilter />
        <typeOfLineFilter.DropdownFilter />
      </Stack>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Record</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Specs</TableCell>
                <TableCell>Record Type</TableCell>
                <TableCell>Line Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems?.map((row) => (
                <AlternatingTableRow key={row.certId}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell width={'30%'}>{row.recordType}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.specs}</TableCell>
                  <TableCell>{row.typeOfRecord}</TableCell>
                  <TableCell>{row.typeOfLine}</TableCell>
                </AlternatingTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

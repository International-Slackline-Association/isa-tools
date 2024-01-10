import { useMemo, useState } from 'react';

import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
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

export function CertifiedRiggers() {
  const { data, isFetching } = listingsApi.useGetRiggerListQuery();
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const countryList = useMemo(
    () =>
      [
        ...new Set(
          data
            ?.map((row) => row.country)
            .filter((c) => c)
            .sort((a, b) => a?.localeCompare(b || '') || 0) || [],
        ),
      ] as string[],
    [data],
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value as string);
  };

  const riggers = useMemo(
    () => data?.filter((row) => row.country === selectedCountry || selectedCountry === ''),
    [data, selectedCountry],
  );

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography textAlign={'left'} variant="body2Bold">
          List of Certified Riggers
        </Typography>
        <FormControl size="medium" sx={{ minWidth: 120 }}>
          <InputLabel id="country-select">Country</InputLabel>
          <Select
            labelId="country-select"
            id="country-select"
            value={selectedCountry}
            label="Country"
            variant="outlined"
            onChange={handleChange}
          >
            {countryList.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
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
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Expiration Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {riggers?.map((row) => (
                <AlternatingTableRow key={row.certId}>
                  <TableCell>
                    <a href={`mailto:${row.email}`}>{row.name?.substring(0, 50)}</a>
                  </TableCell>
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

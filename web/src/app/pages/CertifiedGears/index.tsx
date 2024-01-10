import { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Link,
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

export function CertifiedGears() {
  const { data, isFetching } = listingsApi.useGetCertifiedGearsQuery();
  const [openIndex, setOpenIndex] = useState<number>();

  const openRow = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(undefined);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography textAlign={'left'} variant="body2Bold">
        List of Certified Gears
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
                <TableCell />
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Standard</TableCell>
                <TableCell>Product Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <>
                  <AlternatingTableRow key={row.certId}>
                    <TableCell>
                      <IconButton size="small" onClick={() => openRow(index)}>
                        {openIndex === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <a href={`mailto:${row.email}`}>{row.brand}</a>
                    </TableCell>
                    <TableCell>{row.modelName}</TableCell>
                    <TableCell>{row.standard}</TableCell>
                    <TableCell>
                      <Link href={row.productLink}>Product Link</Link>
                    </TableCell>
                  </AlternatingTableRow>
                  <TableCell style={{ padding: 0 }} colSpan={6}>
                    <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                      <Stack direction={'row'} spacing={4} sx={{ p: 2, flexWrap: 'wrap' }}>
                        <Typography variant="body2">
                          <b>Product Type</b>: {row.productType}
                        </Typography>
                        <Typography variant="body2">
                          <b>Model Version</b>: {row.modelVersion}
                        </Typography>
                        <Typography variant="body2">
                          <b>Release Year</b>: {row.releaseYear}
                        </Typography>
                        <Typography variant="body2">
                          <b>Manual Link</b>: <Link href={row.manualLink}>Link</Link>
                        </Typography>
                        <Typography variant="body2">
                          <b>Testing Laboratory</b>: {row.testingLaboratory}
                        </Typography>
                        <Typography variant="body2">
                          <b>Test Date</b>: {row.testDate}
                        </Typography>
                        <Typography variant="body2">
                          <b>Standard Version</b>: {row.standardVersion}
                        </Typography>
                      </Stack>
                    </Collapse>
                  </TableCell>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

import { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
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

export function EquipmentWarnings() {
  const { data, isFetching } = listingsApi.useGetEquipmentWarningsQuery();
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
                <TableCell />
                <TableCell>Status</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Product Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <>
                  <AlternatingTableRow key={index}>
                    <TableCell>
                      <IconButton size="small" onClick={() => openRow(index)}>
                        {openIndex === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
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
                  </AlternatingTableRow>
                  <TableCell style={{ padding: 0 }} colSpan={6}>
                    <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                      <Stack direction={'row'} spacing={4} sx={{ p: 2, flexWrap: 'wrap' }}>
                        <Typography variant="body2">
                          <b>Date</b>: {row.date}
                        </Typography>
                        <Typography variant="body2">
                          <b>Manufacturer</b>: {row.manufacturer}
                        </Typography>
                        <Typography variant="body2">
                          <b>In Production</b>: {row.inProduction}
                        </Typography>
                        <Typography variant="body2">
                          <b>Description</b>: {row.description}
                        </Typography>
                        <Typography variant="body2">
                          <b>Solution</b>: {row.solution}
                        </Typography>
                        <Typography variant="body2">
                          <b>Link 1</b>: <Link href={row.link1}>Link</Link>
                        </Typography>
                        <Typography variant="body2">
                          <b>Link 2</b>: <Link href={row.link2}>Link</Link>
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

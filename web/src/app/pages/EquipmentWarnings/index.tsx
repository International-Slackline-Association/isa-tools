import { ReactNode } from 'react';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import {
  CircularProgress,
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
import { useDetailDialog } from 'app/components/Dialogs/useDetailDialog';

import { AlternatingTableRow } from '../CertifiedInstructors';

export function EquipmentWarnings() {
  const { data, isFetching } = listingsApi.useGetEquipmentWarningsQuery();
  const { InfoDialog, showInfoDialog } = useDetailDialog();

  const showDetails = (index: number) => {
    const row = data?.[index];
    if (row) {
      showInfoDialog({
        title: `${row.manufacturer} - ${row.model}`,
        content: <Details row={row} />,
      });
    }
  };
  return (
    <Stack spacing={2}>
      <Typography textAlign={'left'} variant="body2Bold">
        Warnings and recalls for slackline equipment
      </Typography>
      <InfoDialog />
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
                      <IconButton size="small" onClick={() => showDetails(index)}>
                        <ZoomInIcon />
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
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

const Details = ({ row }: { row: any }) => (
  <Stack spacing={2} sx={{}}>
    <DetailLabel label="Date" value={row.date} />
    <DetailLabel label="In Production" value={row.inProduction} />
    <DetailLabel label="Description" value={row.description} />
    <DetailLabel label="Solution" value={row.solution} />
    <DetailLabel label="Link 1" value={<Link href={row.link1}>Link</Link>} />
    <DetailLabel label="Link 2" value={<Link href={row.link2}>Link</Link>} />
  </Stack>
);

const DetailLabel = ({ label, value }: { label: string; value: string | ReactNode }) => (
  <Typography variant="body2">
    <b>{label}</b>: {value}
  </Typography>
);

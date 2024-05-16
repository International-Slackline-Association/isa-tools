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

export function CertifiedGears() {
  const { data, isFetching } = listingsApi.useGetCertifiedGearsQuery();
  const { InfoDialog, showInfoDialog } = useDetailDialog();

  const showDetails = (index: number) => {
    const row = data?.[index];
    if (row) {
      showInfoDialog({
        title: `${row.brand} - ${row.modelName}`,
        content: <GearDetails row={row} />,
      });
    }
  };

  return (
    <Stack spacing={2}>
      <Typography textAlign={'left'} variant="body2Bold">
        List of Certified Gear
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
                      <IconButton size="small" onClick={() => showDetails(index)}>
                        <ZoomInIcon />
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
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

const GearDetails = ({ row }: { row: any }) => (
  <Stack spacing={2} sx={{}}>
    <DetailLabel label="Product Type" value={row.productType} />
    <DetailLabel label="Model Version" value={row.modelVersion} />
    <DetailLabel label="Release Year" value={row.releaseYear} />
    <DetailLabel label="Manual Link" value={<Link href={row.manualLink}>Link</Link>} />
    <DetailLabel label="Testing Laboratory" value={row.testingLaboratory} />
    <DetailLabel label="Test Date" value={row.testDate} />
    <DetailLabel label="Standard Version" value={row.standardVersion} />
  </Stack>
);

const DetailLabel = ({ label, value }: { label: string; value: string | ReactNode }) => (
  <Typography variant="body2">
    <b>{label}</b>: {value}
  </Typography>
);

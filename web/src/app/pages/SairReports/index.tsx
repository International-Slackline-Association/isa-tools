import { ReactNode } from 'react';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
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
import { intersectAll, useDropdownFilter } from 'app/components/DropdownFilter/useDropdownFilter';
import { convertGoogleDriveImageToUrl } from 'utils';

import { AlternatingTableRow } from '../CertifiedInstructors';

export function SairReports() {
  const { data, isFetching } = listingsApi.useGetSairReportsQuery();
  const { InfoDialog, showInfoDialog } = useDetailDialog();

  const incidentTypeFilter = useDropdownFilter({
    label: 'Incident Type',
    list: data?.map((row) => row.incidentType?.split(',')).flat(),
    filterer: [data, 'incidentType'],
  });

  const slacklineTypeFilter = useDropdownFilter({
    label: 'Slackline Type',
    list: data?.map((row) => row.slacklineType),
    filterer: [data, 'slacklineType'],
  });

  const moreFilter = useDropdownFilter({
    label: 'Extra Filters',
    list: data?.map((row) => row.filters?.split(',')).flat(),
    filterer: [data, 'filters'],
  });

  const showDetails = (timestamp?: string) => {
    const row = data?.find((row) => row.timestamp === timestamp);
    if (row) {
      showInfoDialog({
        title: `Incident Report Details`,
        content: <Details row={row} />,
      });
    }
  };

  const filteredItems = intersectAll(
    incidentTypeFilter.filteredItems,
    slacklineTypeFilter.filteredItems,
    moreFilter.filteredItems,
  );

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography textAlign={'left'} variant="body2Bold">
          Sair Reports
        </Typography>
        <Stack direction="row" spacing={1}>
          <incidentTypeFilter.DropdownFilter />
          <slacklineTypeFilter.DropdownFilter />
          <moreFilter.DropdownFilter />
        </Stack>
      </Box>
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
                <TableCell>Language</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Type Of Incident</TableCell>
                <TableCell>Type of Slackline</TableCell>
                <TableCell>Type of Injury</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems?.map((row) => (
                <>
                  <AlternatingTableRow key={row.timestamp}>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems={'center'}>
                        <IconButton size="small" onClick={() => showDetails(row.timestamp)}>
                          <ZoomInIcon />
                        </IconButton>
                        <Images images={row.images} isThumbnail={true} />
                      </Stack>
                    </TableCell>
                    <TableCell>{row.language}</TableCell>
                    <TableCell>{row.incidentDate}</TableCell>
                    <TableCell>{row.countryName}</TableCell>
                    <TableCell>{row.incidentType}</TableCell>
                    <TableCell>{row.slacklineType}</TableCell>
                    <TableCell>{row.injuryType}</TableCell>
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
    <Image url={row.coverImage} isThumbnail={false} />
    <DetailLabel label="Narrative" value={row.narrative} />
    <DetailLabel label="Analysis" value={row.analysis} />
    <DetailLabel label="Type of Incident" value={row.incidentType} />
    <DetailLabel label="Type of Slackline" value={row.slacklineType} />
    <DetailLabel label="Type of Injury" value={row.injuryType} />
    <DetailLabel label="Country" value={row.countryName} />
    <DetailLabel label="Severity" value={row.severity} />
    <DetailLabel label="Injury Location" value={row.injuryLocation} />
    <DetailLabel label="Filters" value={row.filters} />
    <Typography variant="body2Bold" sx={{}}>
      Images
    </Typography>
    <Images images={row.images} isThumbnail={false} />
  </Stack>
);

const Images = (props: { images: string[]; isThumbnail: boolean }) => {
  const { images, isThumbnail } = props;
  const cols = isThumbnail ? 2 : 1;
  const gap = isThumbnail ? 4 : 12;
  const width = isThumbnail ? '10px' : '100%';
  const height = isThumbnail ? '10px' : 'auto';
  return (
    <ImageList variant="standard" cols={cols} gap={gap}>
      {images.map((image, index) => (
        <ImageListItem key={index}>
          <Image url={image} isThumbnail={isThumbnail} width={width} height={height} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
const Image = (props: { url: string; isThumbnail: boolean; width?: string; height?: string }) => {
  const { url, width, height } = props;
  const imageUrl = convertGoogleDriveImageToUrl(url);
  return props.isThumbnail ? (
    <Avatar src={imageUrl} sx={{ width, height }}>
      <div />
    </Avatar>
  ) : (
    <img src={imageUrl} alt="" style={{ width: '100%' }} />
  );
};

const DetailLabel = ({ label, value }: { label: string; value: string | ReactNode }) => (
  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
    <b>{label}</b>: {value}
  </Typography>
);

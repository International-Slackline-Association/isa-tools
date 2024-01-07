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
} from '@mui/material';

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: ${() => colors.grey[200]};
  }
`;

export function CertifiedInstructors() {
  const handleChange = () => {};

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography textAlign={'left'} variant="body2Bold">
          List of instructors certified by ISA
        </Typography>
        <FormControl size="medium" sx={{ minWidth: 120 }}>
          <InputLabel id="country-select">Country</InputLabel>
          <Select
            labelId="country-select"
            id="country-select"
            value={''}
            label="Country"
            variant="outlined"
            onChange={handleChange}
          >
            <MenuItem value={'1'}>1</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Certificate</TableCell>
              <TableCell>Expiration Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
              <TableCell>Cell 3</TableCell>
              <TableCell>Cell 4</TableCell>
              <TableCell>Cell 5</TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded(props) {
  return (
    <Stack spacing={props.spacing}>
      <Pagination count={props.count} variant="outlined" shape="rounded" onChange={props.handleChange} />
    </Stack>
  );
}
import { Box } from '@mui/system';

export function ISALogoBackground(props: {
    zIndex?: number;
    width?: string;
    height?: string;
}) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: props.height || '100%',
        width: props.width || '100%',
        objectFit: 'contain',
        backgroundImage: 'url(/images/isa-logo.svg)',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        zIndex: props.zIndex || -1,
        filter: 'opacity(0.04) grayscale(100%)',
      }}
    />
  );
}

import { CircularProgress, Backdrop } from '@mui/material';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay = ({
  isLoading,
}: LoadingOverlayProps): JSX.Element | null =>
  isLoading ? (
    <Backdrop open={isLoading}>
      <CircularProgress color="primary" size={100} />
    </Backdrop>
  ) : null;

export default LoadingOverlay;

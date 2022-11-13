import { Typography, Stack, Container } from '@mui/material';
import type { ReactNode } from 'react';
import { Component } from 'react';

import { isDevMode } from 'utils';

interface ErrorComponentProps {
  name: string;
  error: Error;
}

interface Props {
  name: string;
  children?: ReactNode;
}
interface State {
  error?: Error;
}

const cleanupStackTrace = (stack: string | undefined): string | undefined => {
  if (!stack) {
    return stack;
  }
  return stack.replace(/[(][^)]*[)]/g, '');
};

const Error = ({ error, name }: ErrorComponentProps): JSX.Element => {
  return (
    <Container>
      <Stack>
        <Typography>Error</Typography>
        <Typography>{name}</Typography>
        {isDevMode() && (
          <>
            <Typography>{error.message}</Typography>
            <Typography>{cleanupStackTrace(error.stack)}</Typography>
          </>
        )}
      </Stack>
    </Container>
  );
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: undefined,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public render(): ReactNode {
    const { error } = this.state as State;
    const { name = 'UnknownComponent', children } = this.props;
    if (error) {
      return <Error name={name} error={error} />;
    }
    return children;
  }
}

export default ErrorBoundary;

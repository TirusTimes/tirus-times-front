import { Box, Button, ButtonGroup, TextField } from '@mui/material';

import type { ChangeEvent } from 'react';
import { useEffect, useCallback, useState } from 'react';

import styles from './styles';

interface SearchBarProps {
  onSearch: (textSearch: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

const SearchBar = ({
  onSearch,
  onClear,
  placeholder,
  ...props
}: SearchBarProps): JSX.Element => {
  const [text, setText] = useState('');
  useEffect(() => {
    if (text.length < 1 && onClear) onClear();
  }, [text.length, onClear]);

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    [],
  );

  const handleSearch = useCallback((): void => {
    onSearch(text);
  }, [text, onSearch]);

  const handleClear = useCallback(() => {
    setText('');
  }, [setText]);

  return (
    <Box style={styles.container}>
      <TextField
        size="small"
        fullWidth
        type="text"
        name="name"
        onChange={handleTextChange}
        margin="normal"
        value={text}
        label="Procurar"
        placeholder={placeholder}
        {...props}
      />
      <ButtonGroup size="small" variant="outlined">
        <Button disabled={text.length < 1} onClick={handleSearch}>
          Procurar
        </Button>
        <Button onClick={handleClear} disabled={text.length < 1}>
          Limpar
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default SearchBar;

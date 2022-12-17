import type { SxProps, Theme } from '@mui/system';

export default <T extends Record<string, SxProps<Theme>>>(map: T): T => map;

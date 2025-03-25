export type City = 'naha' | 'chatan' | 'ginowan' | 'urasoe' | 'okinawa' | 'uruma' | 'yomitan' | 'kitanakagusuku' | 'nakagusuku' | 'nishihara' | 'onna' | 'kadena';

export type Base = 'kadena air base' | 'camp foster' | 'camp kinser' | 'camp hansen' | 'camp schwab' | 'white beach' | 'mcas futenma' | 'torii station';

export type Location = City | Base;

export type LocationType = 'city' | 'base';

export interface LocationOption {
  value: Location;
  label: string;
  type: LocationType;
  description: string;
}

export type Section = {
  id: string;
  title: string;
  description: string;
  addLabel: string;
  placeholder: string;
  secondaryPlaceholder?: string;
  ctaLabel: string;
  items: Array<{
    title: string;
    detail: string;
    actionLabel: string;
    links?: Array<{ label: string; href: string }>;
  }>;
};

export type ColorTheme = 'green' | 'gold' | 'colorful' | 'colorful-light';

export type ViewMode = 'list' | 'widget';

export type WidgetSize = 'small' | 'medium' | 'large';

export type Episode = {
  id: string;
  title: string;
  date: string;
  time: string;
  sections: Section[];
};

export type Program = {
  id: string;
  name: string;
  genre: string;
  episodes: Episode[];
};

export type TVStation = {
  id: string;
  name: string;
  programs: Program[];
};

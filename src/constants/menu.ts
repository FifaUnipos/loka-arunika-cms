import {
  type Icon,
  SquaresFourIcon, // dashboard
  PackageIcon, // product
  NotebookIcon, // order
  ChartBarIcon, // report
  GearIcon, // setting
} from '@phosphor-icons/react';

export interface SubItemMenu {
  title: string;
  url: string;
}

export interface MenuData extends SubItemMenu {
  icon: Icon;
  items: SubItemMenu[] | [];
}

const menus: MenuData[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: SquaresFourIcon,
    items: [],
  },
  {
    title: 'Product',
    url: '/product',
    icon: PackageIcon,
    items: [
      {
        title: 'Create',
        url: '/product/create',
      },
      {
        title: 'List',
        url: '/product',
      },
    ],
  },
  {
    title: 'Order',
    url: '/order',
    icon: NotebookIcon,
    items: [],
  },
  {
    title: 'Report',
    url: '/report',
    icon: ChartBarIcon,
    items: [],
  },
  {
    title: 'Setting',
    url: '/setting',
    icon: GearIcon,
    items: [],
  },
];

export default menus;

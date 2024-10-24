import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Vendor Catalog',
    path: '/vendor-product',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Inventory Requests',
    icon: <IoIcons.IoIosPaper />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Requests List',
        path: '/request-list',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Invoice',
    path: '/invoice',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Reports',
    icon: <IoIcons.IoIosPaper />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Sales Report',
        path: '/sales-reports',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  // {
  //   title: 'My Profile',
  //   path: '/profile',
  //   icon: <IoIcons.IoMdHelpCircle />
  // }
];

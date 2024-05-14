import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Products',
    path: '/stock',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Request Products',
    path: '/request-products',
    icon: <FaIcons.FaEnvelopeOpenText />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Product Reports',
    path: '/stock/report',
    icon: <IoIcons.IoIosPaper />,
  },
  // {
  //   title: 'Inventory Requests',
  //   icon: <IoIcons.IoIosPaper />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: 'Requests List',
  //       path: '/request-list',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Track Delivery',
  //       path: '/track-inventory',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //   ]
  // },
  // {
  //   title: 'Invoice',
  //   path: '/invoice',
  //   icon: <FaIcons.FaCartPlus />
  // },
  // {
  //   title: 'My Profile',
  //   path: '/profile',
  //   icon: <IoIcons.IoMdHelpCircle />
  // }
];

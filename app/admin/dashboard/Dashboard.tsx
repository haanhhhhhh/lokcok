'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import Link from 'next/link';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import useSWR from 'swr';

import { formatNumber } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const Dashboard = () => {
  const { data: summary, error } = useSWR(`/api/admin/summary`);

  console.log(summary);

  if (error) return error.message;
  if (!summary) return 'Loading...';

  const salesData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales,
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const ordersData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: 'Orders',
        data: summary.salesData.map(
          (x: { totalOrders: number }) => x.totalOrders,
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const productsData = {
    labels: summary.productsData.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Category',
        data: summary.productsData.map(
          (x: { totalProducts: number }) => x.totalProducts,
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };
  const usersData = {
    labels: summary.usersData.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Users',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(75, 136, 177, 0.5)',
        data: summary.usersData.map(
          (x: { totalUsers: number }) => x.totalUsers,
        ),
      },
    ],
  };

  return (
    <div>
      <div className='stats stats-vertical my-4 inline-grid shadow md:stats-horizontal md:flex'>
        <div className='stat'>
          <div className='stat-title'>Doanh Thu</div>
          <div className='stat-value text-primary'>
            ${formatNumber(summary.ordersPrice)}
          </div>
          <div className='stat-desc'>
            <Link href='/admin/orders'>Xem doanh thu</Link>
          </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Đơn Hàng</div>
          <div className='stat-value text-primary'>{summary.ordersCount}</div>
          <div className='stat-desc'>
            <Link href='/admin/orders'>Xem đơn hàng</Link>
          </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Sản Phẩm</div>
          <div className='stat-value text-primary'>{summary.productsCount}</div>
          <div className='stat-desc'>
            <Link href='/admin/products'>Xem sản phẩm</Link>
          </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Người Dùng</div>
          <div className='stat-value text-primary'>{summary.usersCount}</div>
          <div className='stat-desc'>
            <Link href='/admin/users'>Xem người dùng</Link>
          </div>
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        <div>
          <h2 className='py-2 text-xl'>Sales Report</h2>
          <Line data={salesData} />
        </div>
        <div>
          <h2 className='py-2 text-xl'>Orders Report</h2>
          <Line data={ordersData} />
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        <div>
          <h2 className='py-2 text-xl'>Products Report</h2>
          <div className='flex h-80 w-96 items-center justify-center '>
            <Doughnut data={productsData} />
          </div>
        </div>
        <div>
          <h2 className='py-2 text-xl'>Users Report</h2>
          <Bar data={usersData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

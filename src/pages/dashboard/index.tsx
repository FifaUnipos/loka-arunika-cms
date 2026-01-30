import { CardSellerInfomation } from '@/components/organism/feature/dashboard/CardQuickInformation';
import { ChartAreaInteractive } from '@/components/organism/feature/dashboard/ChartAreaInteractive';
import { ProductMostSold } from '@/components/organism/feature/dashboard/ProductMostSold';
import { RecentTransaction } from '@/components/organism/feature/dashboard/RecentTransactionDataTable';
import {
  MoneyWavyIcon,
  ShoppingCartSimpleIcon,
  UsersIcon,
  InvoiceIcon,
} from '@phosphor-icons/react';

function Index() {
  const quickInformationData = [
    {
      title: 'Total Revenue',
      shortTitle: 'Revenue',
      icon: MoneyWavyIcon,
      value: 199999999,
    },
    {
      title: 'Total Orders',
      shortTitle: 'Order',
      icon: ShoppingCartSimpleIcon,
      value: 199999999,
    },
    {
      title: 'Total Customers',
      shortTitle: 'Customer',
      icon: UsersIcon,
      value: 199999999,
    },
    {
      title: 'Avg Order Value',
      shortTitle: 'Avg Val',
      icon: InvoiceIcon,
      value: 199999999,
    },
  ];

  return (
    <div className="size-full flex flex-1 flex-col gap-4 p-4 bg-accent">
      <div>
        <CardSellerInfomation data={quickInformationData} />
      </div>
      <div>
        <ChartAreaInteractive />
      </div>
      <div className="grid auto-rows-min gap-1.5 grid-cols-1 lg:grid-cols-2">
        <RecentTransaction />
        <ProductMostSold />
      </div>
    </div>
  );
}

export default Index;

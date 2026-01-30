import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { formatRupiah, formatTimestamp } from '@/lib/utils';

type StatusTransaction =
  | 'FAILED'
  | 'DRAFT'
  | 'PENDING'
  | 'PAYMENT_EXPIRED'
  | 'PAID';

const transactionStatusBgMap: Record<StatusTransaction, string> = {
  FAILED: 'bg-red-500 text-white',
  DRAFT: 'bg-gray-400 text-white',
  PENDING: 'bg-yellow-400 text-black',
  PAYMENT_EXPIRED: 'bg-orange-500 text-white',
  PAID: 'bg-green-500 text-white',
};

type StatusPayment =
  | 'FAILED'
  | 'INIT'
  | 'PROCESSING'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REFUND_REQUESTED'
  | 'REFUND_APPROVED'
  | 'REFUNDED'
  | 'ON_HOLD';

const paymentStatusBgMap: Record<StatusPayment, string> = {
  FAILED: 'text-red-500',
  INIT: 'text-gray-400',
  PROCESSING: 'text-blue-500',
  DELIVERED: 'text-indigo-500',
  COMPLETED: 'text-green-500',
  CANCELLED: 'text-gray-500',
  REFUND_REQUESTED: 'text-yellow-500',
  REFUND_APPROVED: 'text-orange-500',
  REFUNDED: 'text-purple-500',
  ON_HOLD: 'text-amber-400',
};

interface RecentTransactionInterface {
  order_id: string;
  customer_name: string;
  status_transaction: StatusTransaction;
  status_payment: StatusPayment;
  total_amount: number;
  created_at: string;
}

const recentTransactions: RecentTransactionInterface[] = [
  {
    order_id: 'ORD-20260129-0001',
    customer_name: 'Andi Pratama',
    status_transaction: 'PAID',
    status_payment: 'COMPLETED',
    total_amount: 125000,
    created_at: '2026-01-29T08:15:00Z',
  },
  {
    order_id: 'ORD-20260129-0002',
    customer_name: 'Siti Nurhaliza',
    status_transaction: 'PENDING',
    status_payment: 'PROCESSING',
    total_amount: 342500,
    created_at: '2026-01-29T07:58:12Z',
  },
  {
    order_id: 'ORD-20260128-0003',
    customer_name: 'Budi Santoso',
    status_transaction: 'FAILED',
    status_payment: 'FAILED',
    total_amount: 98000,
    created_at: '2026-01-28T16:42:30Z',
  },
  {
    order_id: 'ORD-20260128-0004',
    customer_name: 'Dewi Lestari',
    status_transaction: 'PAYMENT_EXPIRED',
    status_payment: 'CANCELLED',
    total_amount: 210000,
    created_at: '2026-01-28T14:10:05Z',
  },
  {
    order_id: 'ORD-20260127-0005',
    customer_name: 'Rizky Maulana',
    status_transaction: 'PAID',
    status_payment: 'DELIVERED',
    total_amount: 560000,
    created_at: '2026-01-27T11:23:44Z',
  },
  {
    order_id: 'ORD-20260127-0006',
    customer_name: 'Nina Kurnia',
    status_transaction: 'PAID',
    status_payment: 'REFUND_REQUESTED',
    total_amount: 175000,
    created_at: '2026-01-27T09:05:18Z',
  },
  {
    order_id: 'ORD-20260126-0007',
    customer_name: 'Fajar Hidayat',
    status_transaction: 'PAID',
    status_payment: 'REFUNDED',
    total_amount: 89000,
    created_at: '2026-01-26T18:47:59Z',
  },
  {
    order_id: 'ORD-20260126-0008',
    customer_name: 'Maya Putri',
    status_transaction: 'DRAFT',
    status_payment: 'INIT',
    total_amount: 0,
    created_at: '2026-01-26T10:01:00Z',
  },
  {
    order_id: 'ORD-20260125-0009',
    customer_name: 'Agus Salim',
    status_transaction: 'PENDING',
    status_payment: 'ON_HOLD',
    total_amount: 430000,
    created_at: '2026-01-25T15:33:21Z',
  },
];

function formatStatusLabel(status: string): string {
  return status.replace(/_/g, ' ');
}

function getTransactionStatusBg(status: StatusTransaction): string {
  return transactionStatusBgMap[status] ?? 'bg-gray-300 text-black';
}

function getPaymentStatusBg(status: StatusPayment): string {
  return paymentStatusBgMap[status] ?? 'text-gray-300';
}

export function RecentTransaction() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold">Recent Transaction</h2>
        <Button
          variant="outline"
          size="sm"
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          See All
        </Button>
      </div>

      <Separator />

      <ScrollArea
        className="h-72 md:h-96 w-full rounded-md"
        role="region"
        aria-label="Recent transactions"
      >
        <div className="flex flex-col gap-2 pr-4">
          {recentTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.order_id}
              transaction={transaction}
            />
          ))}
        </div>
      </ScrollArea>

      <Separator className="mt-4" />
    </div>
  );
}

function TransactionCard({
  transaction,
}: {
  transaction: RecentTransactionInterface;
}) {
  return (
    <div className="min-w-100 border border-gray-200 border-l-4 border-l-primary px-3 py-2 rounded-lg">
      <div className="flex items-start justify-between text-xs gap-6">
        <div className="space-y-0.5 min-w-45">
          <p className="font-semibold text-gray-900 whitespace-nowrap">
            {transaction.order_id}
          </p>
          <p className="text-gray-600 whitespace-nowrap">
            {transaction.customer_name}
          </p>
          <p className="whitespace-nowrap">
            Payment Status:
            <span
              className={`${getPaymentStatusBg(transaction.status_payment)}`}
            >
              {transaction.status_payment}
            </span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-0.5 shrink-0 min-w-35">
          <p className="font-bold text-gray-900 whitespace-nowrap">
            {formatRupiah(transaction.total_amount)}
          </p>
          <div
            className={`py-0.5 px-1 rounded-lg w-max font-medium whitespace-nowrap ${getTransactionStatusBg(transaction.status_transaction)}`}
          >
            {formatStatusLabel(transaction.status_transaction)}
          </div>
          <p className="text-gray-500 text-[10px] whitespace-nowrap">
            {formatTimestamp(transaction.created_at, 'HH:mm:ss•dd-MM-yyyy')}
          </p>
        </div>
      </div>
    </div>
  );
}

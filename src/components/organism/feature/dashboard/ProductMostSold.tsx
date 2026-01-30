import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { formatRupiah, formatTimestamp } from '@/lib/utils';

interface ProductMostSoldInterface {
  rank: number;
  product_name: string;
  total_sold: number;
  total_revenue: number;
  last_sold: string;
}

const topProducts: ProductMostSoldInterface[] = [
  {
    rank: 1,
    product_name: 'Ultra Wireless Headphones',
    total_sold: 1250,
    total_revenue: 187500,
    last_sold: '2026-01-30T14:20:00Z',
  },
  {
    rank: 2,
    product_name: 'Mechanical Keyboard RGB',
    total_sold: 980,
    total_revenue: 117600,
    last_sold: '2026-01-30T13:45:10Z',
  },
  {
    rank: 3,
    product_name: 'Ergonomic Office Chair',
    total_sold: 850,
    total_revenue: 255000,
    last_sold: '2026-01-30T12:15:00Z',
  },
  {
    rank: 4,
    product_name: '4K Monitor 27-inch',
    total_sold: 720,
    total_revenue: 216000,
    last_sold: '2026-01-30T11:30:45Z',
  },
  {
    rank: 5,
    product_name: 'USB-C Hub Multiport',
    total_sold: 650,
    total_revenue: 32500,
    last_sold: '2026-01-29T23:10:00Z',
  },
  {
    rank: 6,
    product_name: 'Webcam 1080p Pro',
    total_sold: 540,
    total_revenue: 43200,
    last_sold: '2026-01-29T21:05:00Z',
  },
  {
    rank: 7,
    product_name: 'Laptop Stand Aluminum',
    total_sold: 490,
    total_revenue: 19600,
    last_sold: '2026-01-29T19:50:22Z',
  },
  {
    rank: 8,
    product_name: 'Gaming Mouse Wireless',
    total_sold: 430,
    total_revenue: 34400,
    last_sold: '2026-01-29T18:20:15Z',
  },
  {
    rank: 9,
    product_name: 'Smart LED Desk Lamp',
    total_sold: 380,
    total_revenue: 22800,
    last_sold: '2026-01-29T15:10:00Z',
  },
  {
    rank: 10,
    product_name: 'Bluetooth Speaker Portable',
    total_sold: 310,
    total_revenue: 15500,
    last_sold: '2026-01-29T14:00:00Z',
  },
  {
    rank: 11,
    product_name: 'External SSD 1TB',
    total_sold: 290,
    total_revenue: 43500,
    last_sold: '2026-01-29T12:45:00Z',
  },
  {
    rank: 12,
    product_name: 'Noise Cancelling Earbuds',
    total_sold: 275,
    total_revenue: 41250,
    last_sold: '2026-01-29T10:30:00Z',
  },
  {
    rank: 13,
    product_name: 'Vertical Mouse',
    total_sold: 210,
    total_revenue: 10500,
    last_sold: '2026-01-29T09:15:00Z',
  },
  {
    rank: 14,
    product_name: 'Power Bank 20000mAh',
    total_sold: 195,
    total_revenue: 9750,
    last_sold: '2026-01-29T08:00:00Z',
  },
  {
    rank: 15,
    product_name: 'Desk Mat Extended',
    total_sold: 150,
    total_revenue: 4500,
    last_sold: '2026-01-28T22:45:00Z',
  },
];

export function ProductMostSold() {
  return (
    <div className="bg-white p-4 rounded-lg size-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold">Top Sold Products</h2>
        <Button
          variant="outline"
          size="sm"
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          See All
        </Button>
      </div>

      <Separator />

      <div className="h-72 md:h-96 overflow-y-auto">
        <div className="overflow-x-auto">
          <Table className="min-w-max">
            <TableHeader className="sticky top-0 z-10 bg-white">
              <TableRow>
                <TableHead className="whitespace-nowrap">Rank</TableHead>
                <TableHead className="whitespace-nowrap">
                  Product Name
                </TableHead>
                <TableHead className="whitespace-nowrap">Total Sold</TableHead>
                <TableHead className="whitespace-nowrap">
                  Total Revenue
                </TableHead>
                <TableHead className="whitespace-nowrap">Last Sold</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {topProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    {product.rank}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {product.product_name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {product.total_sold}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatRupiah(product.total_revenue)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatTimestamp(product.last_sold)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Separator className="mt-4" />
    </div>
  );
}

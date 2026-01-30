import { formatRupiah } from '@/lib/utils';
import type { Icon } from '@phosphor-icons/react';

interface quickInformation {
  title: string;
  shortTitle: string;
  icon: Icon;
  value: number;
}

export function CardSellerInfomation({ data }: { data: quickInformation[] }) {
  return (
    <div className="grid auto-rows-min gap-1.5 grid-cols-2 lg:grid-cols-4">
      {data.map((value) => CardQuickInformation(value))}
    </div>
  );
}

export function CardQuickInformation({
  title,
  shortTitle,
  icon: IconComponent,
  value,
}: quickInformation) {
  return (
    <div
      key={shortTitle}
      className="bg-card rounded-md flex flex-row items-center gap-2 px-3 py-2"
    >
      <div className="rounded-full p-1 bg-primary text-white hidden md:block">
        <IconComponent />
      </div>
      <div>
        <p className="text-xs text-black/50 hidden md:inline">{title}</p>
        <p className="text-xs text-black/50 md:hidden">{shortTitle}</p>
        <p className="text-xs font-semibold">{formatRupiah(value)}</p>
      </div>
    </div>
  );
}

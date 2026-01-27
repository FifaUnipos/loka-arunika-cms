import { useLocation } from 'react-router';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const HIDDEN_ACTIONS = new Set(['create', 'update']);

export const PageTitle = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const lastSegment = segments[segments.length - 1];
  const resourceName = segments[0];
  const isHidden = HIDDEN_ACTIONS.has(lastSegment) || isMobile;

  return (
    <div className={`items-center gap-2 px-4 ${isHidden ? 'hidden' : 'flex'}`}>
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-8"
      />
      <p>{resourceName}</p>
    </div>
  );
};

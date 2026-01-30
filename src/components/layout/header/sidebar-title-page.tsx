import { useLocation } from 'react-router';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
// import { useIsMobile } from '@/hooks/use-mobile';
import { ucwords } from '@/lib/utils';

// const HIDDEN_ACTIONS = new Set(['create', 'update']);

export const PageTitle = () => {
  const { pathname } = useLocation();
  // const isMobile = useIsMobile();

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  // const lastSegment = segments[segments.length - 1];
  const resourceName = ucwords(segments[0].replace(/-/g, ' '));
  // const isHidden = HIDDEN_ACTIONS.has(lastSegment) || isMobile;

  return (
    <div className={`items-center gap-2 px-4 flex`}>
      {' '}
      {/* ${isHidden ? 'hidden' : 'flex'} */}
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-8 bg-primary"
      />
      <p>{resourceName}</p>
    </div>
  );
};

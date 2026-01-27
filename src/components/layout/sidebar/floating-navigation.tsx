import { useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { GridFour, type Icon } from '@phosphor-icons/react';
import menus from '@/constants/menu';

const EXCEPT_MENU = ['/dashboard'];

function FloatingNavigation() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ButtonFloatingNavigation handlingOpen={setOpen} />
      <DrawerFloatingMenu isOpen={open} handlingOpen={setOpen} />
    </>
  );
}

function ButtonFloatingNavigation({
  handlingOpen,
}: {
  handlingOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="fixed bottom-6 right-2 z-50 text-white bg-primary px-4 py-3 rounded-lg flex flex-row items-center gap-4 md:hidden"
      onClick={() => handlingOpen((prev) => !prev)}
    >
      <GridFour weight="fill" size={24} />
      Menu
    </div>
  );
}

function DrawerFloatingMenu({
  isOpen,
  handlingOpen,
}: {
  isOpen: boolean;
  handlingOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Drawer open={isOpen} onOpenChange={() => handlingOpen((prev) => !prev)}>
      <DrawerContent className="border-0 pb-4">
        <DrawerHeader>
          <DrawerTitle className="sr-only">just type it</DrawerTitle>
          <DrawerDescription className="sr-only">
            just type it
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-3">
          <div className="grid grid-cols-4 gap-y-4">
            {menus.map((item, index) => {
              if (!EXCEPT_MENU.includes(item.url)) {
                return (
                  <MenuItem
                    key={index}
                    data={{ title: item.title, icon: item.icon, url: item.url }}
                    handlingClick={() => handlingOpen(false)}
                  />
                );
              }
            })}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose className="w-full bg-primary rounded-lg py-2 text-white">
            Tutup
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function MenuItem({
  data,
  handlingClick,
}: {
  data: { title: string; icon: Icon; url: string };
  handlingClick: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center heading-3-500"
      onClick={() => {
        navigate(data.url, { replace: true });
        handlingClick();
      }}
    >
      <data.icon size={18} color="oklch(0.67 0.22 40)" weight="fill" />
      <p className="text-center body-3-600">{data.title}</p>
    </div>
  );
}

export default FloatingNavigation;

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { type ReactNode } from 'react';

interface LogoutConfirmDialogProps {
  trigger: ReactNode;
  onConfirm: () => void;
}

export function LogoutConfirmDialog({
  trigger,
  onConfirm,
}: LogoutConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin ingin logout?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan keluar dari sesi saat ini. Pastikan telah menyimpan
            pekerjaan Anda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer text-primary">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive cursor-pointer hover:bg-destructive/90"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

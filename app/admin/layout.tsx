import { AdminChrome } from "@/components/admin/admin-chrome";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AdminChrome>{children}</AdminChrome>;
}


import Link from 'next/link'
import React from 'react'
import { doc } from 'firebase/firestore'
import { db } from '@/firebase'
import {  useDocumentData } from 'react-firebase-hooks/firestore'
import { usePathname } from 'next/navigation'

const SidebarOptions = ({ href, id }: { href: string, id: string }) => {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const pathname = usePathname();
    const isActive = href.includes(pathname) && pathname !== "/";

  return (
    <Link
      className={`truncate w-full block p-1 px-2  rounded hover:bg-amber-200 ${isActive ? "bg-amber-200" : "bg-gray-200"}`}
      href={href}
    >
      {data?.title}
    </Link>
  );
}

export default SidebarOptions
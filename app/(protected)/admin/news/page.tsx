import React from 'react'
import NewsTable from '../components/news/newsTable';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { paths } from '@/lib/paths'
import Link from "next/link";
import { Button } from '@/components/ui/button'

export default function NewsInsight() {
  return (
    <div>
        <Breadcrumb >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>News & Insight</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">News And Insight</h1>
        <div className="flex justify-end">
          <Link href={paths.admin.addNews} className="self-end">
            <Button className="m-4">Add News </Button>
            </Link>
        </div>
      </div>
      <NewsTable />
    </div>
  )
}

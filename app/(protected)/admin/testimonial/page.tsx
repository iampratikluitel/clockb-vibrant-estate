import React from 'react'
import TestimonialTable from '../components/testimonial/testimonial-table'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { paths } from '@/lib/paths'
import Link from "next/link";
import { Button } from '@/components/ui/button'

export default function Testimonial() {
  return (
    <div className="p-4 bg-white">
        <Breadcrumb >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Testimonials</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">Testimonials</h1>
        <div className="flex justify-end">
          <Link href={paths.admin.addTestimonial} className="self-end">
            <Button className="m-4">Add Testimonial</Button>
          </Link>
        </div>
      </div>
      
      <TestimonialTable />
    </div>
  )
}

import PageLoader from '@/components/PageLoader';
import { useGetAdminProjectByIdQuery } from '@/store/api/Admin/adminUpcommingProject'
import React from 'react'
import AddProjectForm from './projectForm';

interface props {
    type: "Add" | "Edit",
}

export default function BeforeUpcommingForm({type}: props) {
    const {data: UpcommingProject, isLoading: UpcommingProjectLoading} = useGetAdminProjectByIdQuery('id');
  return (
    <div>
        {UpcommingProjectLoading ? (
            <div>
                <PageLoader />
            </div>
        ) : (
            <AddProjectForm type={type} ExistingDetail={UpcommingProject} />
        )}

    </div>
  )
}

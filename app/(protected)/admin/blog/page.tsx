"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PenLine, Trash2, Plus } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  author: string
  category: string
  tags: string[]
  content: string
  status: 'draft' | 'published'
  date: string
}

const categories = [
  'Web App Development',
  'WordPress',
  'Academy',
  'Technology',
  'Careers'
]

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const savedBlogs = localStorage.getItem('blogPosts')
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs))
    }
  }, [])

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: string) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(updatedBlogs)
    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs))
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Blog
          </Link>
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Filter blog title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Posted Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBlogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell>{blog.category}</TableCell>
              <TableCell>{blog.date}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  blog.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {blog.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/blog/edit/${blog.id}`}>
                      <PenLine className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No blogs found matching your criteria
        </div>
      )}
    </div>
  )
}

export default BlogListPage
"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { Plus, Tag, X, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'

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

const BlogFormPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [blog, setBlog] = useState<BlogPost>({
    id: '',
    title: '',
    author: '',
    category: '',
    tags: [],
    content: '',
    status: 'draft',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  })
  const [newTag, setNewTag] = useState('')

  const [post, setPost] = useState<BlogPost | null>(null)

  // Load data when the page loads or the ID changes
  useEffect(() => {
    if (params.id !== 'new') {
      const savedPosts = localStorage.getItem('blogPosts') || '[]'
      const existingPost = JSON.parse(savedPosts).find(
        (b: BlogPost) => b.id === params.id
      )
      if (existingPost) setPost(existingPost)
    }
  }, [params.id])

  useEffect(() => {
    if (params.id !== 'new' && post) {
      setBlog(post)
    }
  }, [post, params.id])

  const handleSave = () => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    const updatedBlogs = params.id === 'new'
      ? [...savedBlogs, { ...blog, id: Date.now().toString() }]
      : savedBlogs.map((b: BlogPost) => b.id === blog.id ? blog : b)

    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs))
    router.push('/admin/blog')
  }

  const handleAddTag = () => {
    if (newTag.trim()) {
      setBlog({ ...blog, tags: [...blog.tags, newTag.trim()] })
      setNewTag('')
    }
  }

  // Display page when viewing the blog post
  if (post) {
    return (
      <div className="min-h-screen bg-estates-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2" /> Back to Blog
            </Link>
          </Button>

          <article className="bg-white rounded-xl shadow-md p-8">
            <header className="mb-8">
              <span className="text-estates-primary font-medium">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{post.title}</h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-estates-primary/10 flex items-center justify-center">
                  <span className="text-estates-primary font-medium">
                    {post.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-estates-gray-500 text-sm">{post.category}</p>
                </div>
              </div>
            </header>


            <div className="prose max-w-none mb-8">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-estates-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="border-t pt-8">
              <Button asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2" /> Back to All Posts
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    )
  }

  // Show blog form if editing or creating a new blog
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {params.id === 'new' ? 'Add New Blog' : 'Edit Blog'}
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Blog Title</label>
          <Input
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Author Name</label>
          <Input
            value={blog.author}
            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>
          <Select
            value={blog.category}
            onValueChange={(value) => setBlog({ ...blog, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web App Development">Web App Development</SelectItem>
              <SelectItem value="WordPress">WordPress</SelectItem>
              <SelectItem value="Academy">Academy</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Careers">Careers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Tags</label>
          <div className="flex gap-2 mb-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
              >
                <Tag className="h-4 w-4" />
                {tag}
                <button
                  onClick={() => setBlog({
                    ...blog,
                    tags: blog.tags.filter(t => t !== tag)
                  })}
                  className="ml-1 text-gray-500 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add new tag"
              className="max-w-xs"
            />
            <Button variant="outline" onClick={handleAddTag}>
              <Plus className="h-4 w-4 mr-2" /> Add Tag
            </Button>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Status</label>
          <Select
            value={blog.status}
            onValueChange={(value) => setBlog({ ...blog, status: value as 'draft' | 'published' })}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Content</label>
          <Textarea
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            className="h-64"
            placeholder="Write your blog content here..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push('/admin/blog')}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Blog Post
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlogFormPage
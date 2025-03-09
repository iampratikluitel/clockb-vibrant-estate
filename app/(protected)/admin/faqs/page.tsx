"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { HelpCircle, Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FaqItem {
  id: string
  category: string
  question: string
  answer: string
}

const categories = [
  { value: 'investment', label: 'Investment & Returns' },
  { value: 'land', label: 'Land & Location' },
  { value: 'exit', label: 'Exit Options & Taxation' },
  { value: 'project', label: 'Project Development' },
  { value: 'getting-started', label: 'Getting Started' }
]

const FAQsConfigPage = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [hasChanges, setHasChanges] = useState(false)

  // Load saved FAQs
  useEffect(() => {
    const savedFAQs = localStorage.getItem('faqsContent')
    if (savedFAQs) {
      try {
        setFaqs(JSON.parse(savedFAQs))
      } catch (e) {
        console.error('Error loading FAQs:', e)
      }
    }
  }, [])

  const handleAddFAQ = () => {
    setFaqs([...faqs, {
      id: `new-${Date.now()}`,
      category: 'investment',
      question: '',
      answer: ''
    }])
    setHasChanges(true)
  }

  const handleDeleteFAQ = (index: number) => {
    const newFaqs = faqs.filter((_, i) => i !== index)
    setFaqs(newFaqs)
    setHasChanges(true)
  }

  const handleFieldChange = (index: number, field: keyof FaqItem, value: string) => {
    const newFaqs = [...faqs]
    newFaqs[index][field] = value
    setFaqs(newFaqs)
    setHasChanges(true)
  }

  const handleSave = () => {
    try {
      localStorage.setItem('faqsContent', JSON.stringify(faqs))
      window.dispatchEvent(new CustomEvent('faqs-localstorage-update'))
      setHasChanges(false)
      alert('FAQs updated successfully!')
    } catch (error) {
      alert('Error saving FAQs!')
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-8 h-8 text-estates-primary" />
        <h1 className="text-2xl font-bold">FAQs Management</h1>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button onClick={handleAddFAQ}>
            <Plus className="mr-2 h-4 w-4" /> Add FAQ
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            Save Changes
          </Button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">FAQ #{index + 1}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDeleteFAQ(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Unique ID (e.g., item-1)"
                  value={faq.id}
                  onChange={(e) => handleFieldChange(index, 'id', e.target.value)}
                />

                <Select
                  value={faq.category}
                  onValueChange={(value) => handleFieldChange(index, 'category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => handleFieldChange(index, 'question', e.target.value)}
                />

                <Input
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => handleFieldChange(index, 'answer', e.target.value)}
                  className="h-20"
                />
              </div>
            </div>
          ))}
        </div>

        {faqs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No FAQs created yet. Click "Add FAQ" to get started.
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQsConfigPage
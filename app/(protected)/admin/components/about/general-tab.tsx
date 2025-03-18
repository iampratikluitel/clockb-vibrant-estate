import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function GeneralTab() {
  const [aboutContent, setAboutContent] = useState({
    title: "About Our Company",
    subtitle: "We're on a mission to transform the industry with innovative solutions.",
    description:
      "Founded in 2020, our company has been at the forefront of innovation, delivering exceptional products and services to our clients worldwide.",
  })

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAboutContent((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Page Content</CardTitle>
        <CardDescription>Edit the main content of your about page.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Page Title</Label>
          <Input id="title" name="title" value={aboutContent.title} onChange={handleContentChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input id="subtitle" name="subtitle" value={aboutContent.subtitle} onChange={handleContentChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            value={aboutContent.description}
            onChange={handleContentChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

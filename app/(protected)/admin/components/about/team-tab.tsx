import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useForm, Controller } from "react-hook-form"

export default function TeamTab() {
  const { toast } = useToast()
  interface TeamMemberFormData {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
  }

  const { control, handleSubmit, setValue, reset } = useForm<TeamMemberFormData>()

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Jane Smith", role: "CEO & Founder", bio: "10+ years of industry experience", imageUrl: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "John Doe", role: "CTO", bio: "Expert in technology solutions", imageUrl: "/placeholder.svg?height=200&width=200" },
  ])

  const addTeamMember = async (data: { name: string, role: string, bio: string, imageUrl: string }) => {
    if (!data.name || !data.role) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the name and role fields.",
        variant: "destructive",
      })
      return
    }

    // Call the API to save the new team member
    const response = await fetch("/api/admin/about/teamMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const newTeamMember = await response.json()
      setTeamMembers((prev) => [...prev, newTeamMember])
      reset()
      toast({
        title: "Team member added",
        description: `${data.name} has been added to the team.`,
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to add the team member.",
        variant: "destructive",
      })
    }
  }

  const removeTeamMember = (id: number) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id))
    toast({
      title: "Team member removed",
      description: "The team member has been removed.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Team Members</CardTitle>
          <CardDescription>Manage your team members that appear on the about page.</CardDescription>
        </CardHeader>
        <CardContent>
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-start gap-4 p-4 border rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarImage src={member.imageUrl} alt={member.name} />
                <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
                <p className="text-sm mt-1">{member.bio}</p>
              </div>
              <Button variant="destructive" size="icon" onClick={() => removeTeamMember(member.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Team Member</CardTitle>
          <CardDescription>Add a new member to your team.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(addTeamMember)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="memberName">Name</Label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input id="memberName" {...field} />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="memberRole">Role</Label>
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input id="memberRole" {...field} />
                  )}
                />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="memberBio">Bio</Label>
              <Controller
                name="bio"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Textarea id="memberBio" {...field} rows={4} />
                )}
              />
            </div>
            <CardFooter>
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

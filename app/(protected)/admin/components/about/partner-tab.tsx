import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Trash2, PlusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PartnersTab() {
  const { toast } = useToast()
  const [partners, setPartners] = useState([
    { id: 1, name: "Partner One", logoUrl: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Partner Two", logoUrl: "/placeholder.svg?height=100&width=100" },
  ])

  const [newPartner, setNewPartner] = useState({
    name: "",
    logoUrl: "/placeholder.svg?height=100&width=100",
  })

  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPartner((prev) => ({ ...prev, [name]: value }))
  }

  const addPartner = () => {
    if (!newPartner.name) {
      toast({
        title: "Missing information",
        description: "Please fill in the partner name.",
        variant: "destructive",
      })
      return
    }

    setPartners((prev) => [...prev, { id: Date.now(), ...newPartner }])

    setNewPartner({ name: "", logoUrl: "/placeholder.svg?height=100&width=100" })

    toast({
      title: "Partner added",
      description: `${newPartner.name} has been added as a partner.`,
    })
  }

  const removePartner = (id: number) => {
    setPartners((prev) => prev.filter((partner) => partner.id !== id))
    toast({
      title: "Partner removed",
      description: "The partner has been removed.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Partners</CardTitle>
          <CardDescription>Manage your company partners.</CardDescription>
        </CardHeader>
        <CardContent>
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarImage src={partner.logoUrl} alt={partner.name} />
                <AvatarFallback>{partner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{partner.name}</div>
              </div>
              <Button variant="destructive" size="icon" onClick={() => removePartner(partner.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Partner</CardTitle>
          <CardDescription>Add a new partner to your company.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="partnerName">Partner Name</Label>
            <Input
              id="partnerName"
              name="name"
              value={newPartner.name}
              onChange={handlePartnerChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={addPartner}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Partner
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Calendar, MessageSquare, Settings, Users } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState({
    name: "Alice Johnson",
    subjects: ["Mathematics", "Physics"],
    studyStyle: "Visual",
    availability: "Evenings",
  })
  const [partners] = useState([
    { id: 1, name: "Bob Smith", compatibility: 95, subject: "Mathematics" },
    { id: 2, name: "Carol Davis", compatibility: 88, subject: "Physics" },
    { id: 3, name: "David Wilson", compatibility: 82, subject: "Mathematics" },
  ])
  const [sessions] = useState([
    { id: 1, partner: "Bob Smith", subject: "Mathematics", date: "2023-05-20", time: "18:00" },
    { id: 2, partner: "Carol Davis", subject: "Physics", date: "2023-05-22", time: "19:00" },
  ])

  const handleProfileUpdate = (event: React.FormEvent) => {
    event.preventDefault()
    // Simulating profile update
    console.log("Profile updated")
  }

  const handleFeedback = (partnerId: number, rating: string) => {
    // Simulating feedback submission
    console.log(`Feedback submitted for partner ${partnerId}: ${rating}`)
    // In a real app, this would trigger the ML model to update recommendations
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-64 bg-card p-6 shadow-md border-r border-border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Study Network</h2>
          <ThemeToggle />
        </div>
        <nav className="space-y-2">
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <Settings className="mr-2 h-4 w-4" /> Profile
          </Button>
          <Button
            variant={activeTab === "partners" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("partners")}
          >
            <Users className="mr-2 h-4 w-4" /> Study Partners
          </Button>
          <Button
            variant={activeTab === "sessions" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("sessions")}
          >
            <Calendar className="mr-2 h-4 w-4" /> Sessions
          </Button>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "profile" && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Your Study Profile</CardTitle>
              <CardDescription>Update your preferences to find better study partners</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="subjects">Subjects</Label>
                    <Select value={profile.subjects[0]} onValueChange={(value) => setProfile({ ...profile, subjects: [value] })}>
                      <SelectTrigger id="subjects">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="studyStyle">Study Style</Label>
                    <Select value={profile.studyStyle} onValueChange={(value) => setProfile({ ...profile, studyStyle: value })}>
                      <SelectTrigger id="studyStyle">
                        <SelectValue placeholder="Select your study style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Visual">Visual</SelectItem>
                        <SelectItem value="Auditory">Auditory</SelectItem>
                        <SelectItem value="Kinesthetic">Kinesthetic</SelectItem>
                        <SelectItem value="Reading/Writing">Reading/Writing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="availability">Availability</Label>
                    <Select value={profile.availability} onValueChange={(value) => setProfile({ ...profile, availability: value })}>
                      <SelectTrigger id="availability">
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mornings">Mornings</SelectItem>
                        <SelectItem value="Afternoons">Afternoons</SelectItem>
                        <SelectItem value="Evenings">Evenings</SelectItem>
                        <SelectItem value="Weekends">Weekends</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" onClick={handleProfileUpdate}>Save Changes</Button>
            </CardFooter>
          </Card>
        )}
        {activeTab === "partners" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <Card key={partner.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${partner.name}`} alt={partner.name} />
                      <AvatarFallback>{partner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {partner.name}
                  </CardTitle>
                  <CardDescription>{partner.subject}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">Compatibility: {partner.compatibility}%</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Request Study Session</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        {activeTab === "sessions" && (
          <div className="space-y-6">
            {sessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Study Session with {session.partner}
                  </CardTitle>
                  <CardDescription>{session.subject} - {session.date} at {session.time}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Prepare materials for {session.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Don&apos;t forget to submit feedback after the session</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col w-full gap-2">
                    <Button variant="outline" className="w-full">Join Session</Button>
                    <div className="flex justify-between">
                      <Button variant="ghost" onClick={() => handleFeedback(session.id, "positive")}>👍 Helpful</Button>
                      <Button variant="ghost" onClick={() => handleFeedback(session.id, "negative")}>👎 Not Helpful</Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
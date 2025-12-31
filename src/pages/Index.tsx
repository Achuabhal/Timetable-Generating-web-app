import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Calendar, Edit, Eye, BookOpen, Users, Clock, GraduationCap, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header with Profile Menu */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">Timetable Manager</h2>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-primary/10">
                <Avatar>
                  <AvatarFallback className="bg-gradient-primary">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Account</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Manage your timetables
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  localStorage.removeItem("timetableConfig");
                  navigate("/data-entry");
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Configure Structure</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/teachers")}>
                <Users className="mr-2 h-4 w-4" />
                <span>Manage Teachers</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/subjects")}>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Manage Subjects</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/timetable")}>
                <Eye className="mr-2 h-4 w-4" />
                <span>View Timetables</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center p-4 mb-6 rounded-2xl bg-gradient-primary shadow-elevated">
            <GraduationCap className="h-16 w-16 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight">
            Smart Timetable<br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Management</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Create optimized academic schedules in 4 simple steps
          </p>
          <Button 
            size="lg" 
            className="text-lg px-10 py-7 h-auto rounded-xl shadow-elevated hover:shadow-card transition-all hover:scale-105 bg-gradient-primary"
            onClick={() => {
              localStorage.removeItem("timetableConfig");
              navigate("/data-entry");
            }}
          >
            <Calendar className="mr-3 h-6 w-6" />
            Start Creating Timetable
          </Button>
        </div>

        {/* What We Solve Section */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="shadow-elevated border-primary/10 overflow-hidden">
            <CardContent className="p-12 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-5 rounded-full blur-3xl"></div>
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                  What We Solve
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  In colleges and schools, creating timetables manually for multiple classes is a time-consuming and complex task. 
                  Teachers and administrators spend hours arranging schedules while avoiding teacher conflicts, meeting subject 
                  requirements, and maintaining workload balance.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-6 mt-6">
                    <p className="text-base sm:text-lg text-foreground leading-relaxed text-center font-medium">
                      ✨ Our platform <strong className="text-primary">automates this entire process</strong> — allowing institutions to generate 
                      optimized weekly timetables within minutes. With just a few inputs, it ensures zero conflicts, all constraints 
                      satisfied, and teachers get a balanced schedule.
                    </p>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Step 1 - Configure */}
            <Card
              className="group shadow-card hover:shadow-elevated transition-all cursor-pointer animate-fade-in border-primary/20 overflow-hidden hover:scale-[1.03] duration-300"
              onClick={() => {
                localStorage.removeItem("timetableConfig");
                navigate("/data-entry");
              }}
            >
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-bl-full"></div>
                <div className="flex items-start gap-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-card">
                      1
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Settings className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Configure Structure</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Set up periods per day and working days for your timetables
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 - Teachers */}
            <Card
              className="group shadow-card hover:shadow-elevated transition-all cursor-pointer animate-fade-in border-primary/20 overflow-hidden hover:scale-[1.03] duration-300"
              onClick={() => navigate("/teachers")}
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-bl-full"></div>
                <div className="flex items-start gap-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-card">
                      2
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Add Teachers</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Manage teachers and set period limits for balanced workload
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 - Create Timetable */}
            <Card
              className="group shadow-card hover:shadow-elevated transition-all cursor-pointer animate-fade-in border-primary/20 overflow-hidden hover:scale-[1.03] duration-300"
              onClick={() => navigate("/data-entry")}
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-bl-full"></div>
                <div className="flex items-start gap-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-card">
                      3
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Edit className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Create Timetable</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Define classes, subjects, assign teachers and set periods per week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 - Generate */}
            <Card
              className="group shadow-card hover:shadow-elevated transition-all cursor-pointer animate-fade-in border-accent/30 overflow-hidden hover:scale-[1.03] duration-300"
              onClick={() => navigate("/timetable")}
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full"></div>
                <div className="flex items-start gap-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center text-3xl font-bold shadow-card">
                      4
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                        <Calendar className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Generate Schedule</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      View and generate complete weekly timetables automatically
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <Card className="shadow-elevated animate-fade-in border-primary/10" style={{ animationDelay: "0.4s" }}>
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</CardTitle>
            <CardDescription className="text-lg">
              Powerful features for efficient academic scheduling
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center space-y-4 group">
                <div className="mx-auto w-16 h-16 bg-lab/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-lab" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Multiple Timetables</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create unlimited timetables for different classes with flexible scheduling
                </p>
              </div>

              <div className="text-center space-y-4 group">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Smart Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track teacher assignments and limits to ensure balanced workload
                </p>
              </div>

              <div className="text-center space-y-4 group">
                <div className="mx-auto w-16 h-16 bg-etc/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-etc" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Flexible Scheduling</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Auto-schedule or manually place subjects on specific days and periods
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

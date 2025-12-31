import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubjectCard } from "@/components/SubjectCard";
import { TimetableData, Subject } from "@/types/timetable";
import { ArrowLeft, Edit, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Timetable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const timetables = (location.state?.timetables as TimetableData) || [];
  const timetableNames = (location.state?.timetableNames as string[]) || timetables.map((_, i) => `Timetable ${i + 1}`);

  if (timetables.length === 0 || timetables.every((subjects) => subjects.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="max-w-md shadow-elevated">
          <CardHeader>
            <CardTitle>No Timetable Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please create and add timetable data first.
            </p>
            <Button onClick={() => navigate("/data-entry")} className="w-full">
              <Edit className="h-4 w-4" />
              Create Timetable
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTotalPeriods = (subjects: Subject[]) => {
    return subjects.reduce((total, subject) => total + subject.repeat, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")} size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">All Timetables</h1>
                <p className="text-muted-foreground mt-1">View all your timetable schedules and subjects</p>
              </div>
            </div>
          </div>
          <Button onClick={() => navigate("/data-entry")} variant="outline" size="lg">
            <Edit className="h-5 w-5" />
            Edit Timetables
          </Button>
        </div>

        <Tabs defaultValue="0" className="space-y-6">
          <TabsList className="bg-card shadow-card flex-wrap h-auto">
            {timetables.map((_, index) => (
              <TabsTrigger 
                key={index} 
                value={index.toString()}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {timetableNames[index]}
              </TabsTrigger>
            ))}
          </TabsList>

          {timetables.map((subjects, index) => (
            <TabsContent key={index} value={index.toString()} className="animate-fade-in">
              <Card className="shadow-elevated">
                <CardHeader className="bg-gradient-primary text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{timetableNames[index]}</CardTitle>
                    <div className="text-sm font-medium bg-primary-foreground/20 px-4 py-2 rounded-lg">
                      Total: {getTotalPeriods(subjects)} periods/week
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {subjects.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No subjects added for this timetable yet.</p>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/data-entry")}
                        className="mt-4"
                      >
                        Add Subjects
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {subjects.map((subject, subIndex) => (
                        <SubjectCard key={subIndex} subject={subject} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Timetable;

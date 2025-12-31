import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SubjectManagement } from "@/components/SubjectManagement";
import { PredefinedSubject } from "@/types/timetable";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";

interface SubjectsProps {
  subjects: PredefinedSubject[];
  onUpdate: (subjects: PredefinedSubject[]) => void;
}

const Subjects = ({ subjects, onUpdate }: SubjectsProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")} size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Subject Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage all predefined subjects for timetables
                </p>
              </div>
            </div>
          </div>
          <Button onClick={() => navigate("/data-entry")} variant="outline" size="lg">
            <Calendar className="h-5 w-5" />
            Manage Timetables
          </Button>
        </div>

        <div className="animate-fade-in">
          <SubjectManagement subjects={subjects} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  );
};

export default Subjects;

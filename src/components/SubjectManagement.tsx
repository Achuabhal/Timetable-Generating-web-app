import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PredefinedSubject } from "@/types/timetable";
import { Plus, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface SubjectManagementProps {
  subjects: PredefinedSubject[];
  onUpdate: (subjects: PredefinedSubject[]) => void;
}

export const SubjectManagement = ({ subjects, onUpdate }: SubjectManagementProps) => {
  const [newSubjectName, setNewSubjectName] = useState("");

  const addSubject = () => {
    if (!newSubjectName.trim()) {
      toast.error("Please enter a subject name");
      return;
    }

    if (subjects.some(s => s.name.toLowerCase() === newSubjectName.toLowerCase())) {
      toast.error("Subject already exists");
      return;
    }

    const newSubject: PredefinedSubject = {
      name: newSubjectName.trim()
    };

    onUpdate([...subjects, newSubject]);
    setNewSubjectName("");
    toast.success("Subject added successfully!");
  };

  const removeSubject = (index: number) => {
    const updated = subjects.filter((_, i) => i !== index);
    onUpdate(updated);
    toast.success("Subject removed");
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="bg-gradient-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6" />
          <div>
            <CardTitle>Manage Subjects</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Define subjects that can be used across all timetables
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Add New Subject */}
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subject-name">Subject Name *</Label>
              <Input
                id="subject-name"
                placeholder="e.g., Machine Learning"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSubject()}
              />
            </div>
          </div>
          <Button type="button" onClick={addSubject} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </div>

        {/* Subject List */}
        {subjects.length > 0 ? (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Saved Subjects ({subjects.length})</h3>
            <div className="space-y-2">
              {subjects.map((subject, index) => (
                <Card key={index} className="p-4 bg-muted/30 border-muted">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{subject.name}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSubject(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No subjects added yet. Add your first subject above!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

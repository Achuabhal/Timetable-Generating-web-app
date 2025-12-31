import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Teacher } from "@/types/timetable";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";

interface TeacherManagementProps {
  teachers: Teacher[];
  onUpdate: (teachers: Teacher[]) => void;
}

export const TeacherManagement = ({ teachers, onUpdate }: TeacherManagementProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTeacher, setNewTeacher] = useState<Teacher>({ name: "", periodLimit: 20 });
  const [editTeacher, setEditTeacher] = useState<Teacher>({ name: "", periodLimit: 20 });

  const addTeacher = () => {
    if (!newTeacher.name.trim() || newTeacher.periodLimit < 1) {
      toast.error("Please enter valid teacher name and period limit");
      return;
    }

    if (teachers.some(t => t.name.toLowerCase() === newTeacher.name.trim().toLowerCase())) {
      toast.error("Teacher with this name already exists");
      return;
    }

    onUpdate([...teachers, { ...newTeacher, name: newTeacher.name.trim() }]);
    setNewTeacher({ name: "", periodLimit: 20 });
    toast.success("Teacher added successfully");
  };

  const removeTeacher = (index: number) => {
    onUpdate(teachers.filter((_, i) => i !== index));
    toast.success("Teacher removed");
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditTeacher({ ...teachers[index] });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditTeacher({ name: "", periodLimit: 20 });
  };

  const saveEdit = () => {
    if (!editTeacher.name.trim() || editTeacher.periodLimit < 1) {
      toast.error("Please enter valid teacher name and period limit");
      return;
    }

    const updated = [...teachers];
    updated[editingIndex!] = { ...editTeacher, name: editTeacher.name.trim() };
    onUpdate(updated);
    setEditingIndex(null);
    toast.success("Teacher updated successfully");
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="bg-gradient-primary text-primary-foreground">
        <CardTitle>Teacher Management</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Add teachers and set their weekly period limits
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Add New Teacher */}
        <Card className="p-4 bg-muted/30 border-muted">
          <h4 className="font-semibold text-foreground mb-4">Add New Teacher</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="new-teacher-name">Teacher Name *</Label>
              <Input
                id="new-teacher-name"
                placeholder="e.g., Dr. Smith"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-teacher-limit">Period Limit per Week *</Label>
              <Input
                id="new-teacher-limit"
                type="number"
                min="1"
                max="40"
                placeholder="e.g., 20"
                value={newTeacher.periodLimit}
                onChange={(e) => setNewTeacher({ ...newTeacher, periodLimit: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={addTeacher}
            className="w-full mt-4"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Add Teacher
          </Button>
        </Card>

        {/* Teachers List */}
        {teachers.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Teachers List ({teachers.length})</h4>
            {teachers.map((teacher, index) => (
              <Card key={index} className="p-4 bg-muted/20 border-muted">
                {editingIndex === index ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`edit-teacher-name-${index}`}>Teacher Name</Label>
                        <Input
                          id={`edit-teacher-name-${index}`}
                          value={editTeacher.name}
                          onChange={(e) => setEditTeacher({ ...editTeacher, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-teacher-limit-${index}`}>Period Limit</Label>
                        <Input
                          id={`edit-teacher-limit-${index}`}
                          type="number"
                          min="1"
                          max="40"
                          value={editTeacher.periodLimit}
                          onChange={(e) => setEditTeacher({ ...editTeacher, periodLimit: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" onClick={saveEdit}>
                        <Check className="h-4 w-4" />
                        Save
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{teacher.name}</p>
                      <p className="text-sm text-muted-foreground">
                        📚 Max {teacher.periodLimit} periods per week
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => startEdit(index)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTeacher(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {teachers.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No teachers added yet. Add teachers to enable quick selection.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

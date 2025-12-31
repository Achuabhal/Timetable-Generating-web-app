import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Subject, Teacher, PredefinedSubject } from "@/types/timetable";
import { Plus, Trash2, ExternalLink, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

interface TimetableFormProps {
  onSubmit: (subjects: Subject[]) => void;
  initialData?: Subject[];
  timetableName: string;
  teachers?: Teacher[];
  predefinedSubjects?: PredefinedSubject[];
  onSubjectsUpdate?: (subjects: PredefinedSubject[]) => void;
  isConfigured?: boolean;
  setIsConfigured?: (value: boolean) => void;
  numPeriods?: number;
  setNumPeriods?: (value: number) => void;
  selectedDays?: string[];
  setSelectedDays?: (value: string[]) => void;
  showConfigOnly?: boolean;
  onConfigSave?: () => void;
}

export const TimetableForm = ({ 
  onSubmit, 
  initialData = [], 
  timetableName, 
  teachers = [],
  predefinedSubjects = [],
  onSubjectsUpdate,
  isConfigured: externalIsConfigured,
  setIsConfigured: externalSetIsConfigured,
  numPeriods: externalNumPeriods = 8,
  setNumPeriods: externalSetNumPeriods,
  selectedDays: externalSelectedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  setSelectedDays: externalSetSelectedDays,
  showConfigOnly = false,
  onConfigSave
}: TimetableFormProps) => {
  const navigate = useNavigate();
  const [localIsConfigured, setLocalIsConfigured] = useState(false);
  const [localNumPeriods, setLocalNumPeriods] = useState(8);
  const [localSelectedDays, setLocalSelectedDays] = useState<string[]>(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
  
  const isConfigured = externalIsConfigured ?? localIsConfigured;
  const setIsConfigured = externalSetIsConfigured ?? setLocalIsConfigured;
  const numPeriods = externalNumPeriods;
  const setNumPeriods = externalSetNumPeriods ?? setLocalNumPeriods;
  const selectedDays = externalSelectedDays;
  const setSelectedDays = externalSetSelectedDays ?? setLocalSelectedDays;
  
  const [subjects, setSubjects] = useState<Subject[]>(
    initialData.length > 0
      ? initialData
      : [{ name: "", teacher: "", repeat: 4, isLab: false, isEtc: false, isLang: false }]
  );
  const [subjectSearchOpen, setSubjectSearchOpen] = useState<boolean[]>([]);
  const [customSubjectMode, setCustomSubjectMode] = useState<boolean[]>([]);
  const [customSubjectInput, setCustomSubjectInput] = useState<string[]>([]);
  const [teacherSearchOpen, setTeacherSearchOpen] = useState<boolean[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const DAYS = selectedDays;
  const PERIODS = Array.from({ length: numPeriods }, (_, i) => i + 1);

  // Calculate period usage per teacher
  const teacherUsage = useMemo(() => {
    const usage: { [key: string]: number } = {};
    subjects.forEach(subject => {
      if (subject.teacher) {
        const count = subject.repeat || 0;
        usage[subject.teacher] = (usage[subject.teacher] || 0) + count;
      }
    });
    return usage;
  }, [subjects]);

  // Track unique teacher names for suggestions
  const uniqueTeachers = Array.from(new Set([
    ...teachers.map(t => t.name),
    ...subjects.map(s => s.teacher).filter(Boolean)
  ]));

  const addSubject = () => {
    setSubjects([...subjects, { name: "", teacher: "", repeat: 4, isLab: false, isEtc: false, isLang: false }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, field: keyof Subject, value: string | number | boolean) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };
    setSubjects(updated);
  };

  const handleSaveCustomSubject = (index: number) => {
    const customName = customSubjectInput[index]?.trim();
    
    if (!customName) {
      toast.error("Please enter a subject name");
      return;
    }

    const existingSubject = predefinedSubjects.find(
      s => s.name.toLowerCase() === customName.toLowerCase()
    );

    if (existingSubject) {
      updateSubject(index, "name", existingSubject.name);
      toast.info("Using existing subject from predefined list");
    } else {
      const newSubject: PredefinedSubject = {
        id: Date.now().toString(),
        name: customName,
        type: "other"
      };
      
      if (onSubjectsUpdate) {
        const updatedSubjects = [...predefinedSubjects, newSubject];
        onSubjectsUpdate(updatedSubjects);
        toast.success(`"${customName}" saved to subjects list`);
      }

      updateSubject(index, "name", customName);
    }

    const newCustomMode = [...customSubjectMode];
    newCustomMode[index] = false;
    setCustomSubjectMode(newCustomMode);

    const newCustomInput = [...customSubjectInput];
    newCustomInput[index] = "";
    setCustomSubjectInput(newCustomInput);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
    }
    
    const hasEmpty = subjects.some(s => !s.name || !s.teacher);
    if (hasEmpty) {
      toast.error("Please fill all fields with valid values");
      return;
    }

    // Validate scheduling: must have repeat > 0 OR both day and period set
    const hasInvalidSchedule = subjects.some(s => {
      const hasAutoSchedule = s.repeat > 0;
      const hasManualSchedule = s.day !== undefined && s.period !== undefined;
      return !hasAutoSchedule && !hasManualSchedule;
    });

    if (hasInvalidSchedule) {
      toast.error("Each subject must have auto schedule (repeat > 0) or manual schedule (day & period)");
      return;
    }

    setIsSubmitting(true);
    onSubmit(subjects);
    toast.success(`${timetableName} data saved successfully!`);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleConfigure = () => {
    if (selectedDays.length === 0) {
      toast.error("Please select at least one day");
      return;
    }
    if (numPeriods < 1) {
      toast.error("Please enter a valid number of periods");
      return;
    }
    setIsConfigured(true);
    if (onConfigSave) {
      onConfigSave();
    }
    toast.success("Timetable configuration saved!");
  };

  if (!isConfigured || showConfigOnly) {
    return (
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle>Configure Timetable Structure</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Set up the basic structure for all timetables
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="num-periods">Number of Periods per Day *</Label>
              <Input
                id="num-periods"
                type="number"
                min="1"
                max="12"
                value={numPeriods}
                onChange={(e) => setNumPeriods(parseInt(e.target.value) || 1)}
                className="text-lg font-semibold"
              />
              <p className="text-sm text-muted-foreground">
                Total periods each day will have
              </p>
            </div>

            <div className="space-y-2">
              <Label>Select Working Days *</Label>
              <div className="grid grid-cols-2 gap-3">
                {ALL_DAYS.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Switch
                      id={`day-${day}`}
                      checked={selectedDays.includes(day)}
                      onCheckedChange={() => toggleDay(day)}
                    />
                    <Label htmlFor={`day-${day}`} className="cursor-pointer">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Selected: {selectedDays.length} day{selectedDays.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-md space-y-2">
              <h4 className="font-semibold">Summary</h4>
              <p className="text-sm">
                📅 <span className="font-bold text-primary">{selectedDays.length}</span> working days per week
              </p>
              <p className="text-sm">
                🕐 <span className="font-bold text-primary">{numPeriods}</span> periods per day
              </p>
              <p className="text-sm">
                📊 Total: <span className="font-bold text-primary">{selectedDays.length * numPeriods}</span> periods per week
              </p>
            </div>
          </div>

          <Button type="button" onClick={handleConfigure} className="w-full" size="lg">
            Continue to Subject Entry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle>{timetableName}</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Add all subjects, teachers, and schedule details for this timetable
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {subjects.map((subject, index) => (
            <Card key={index} className="p-4 bg-muted/30 border-muted">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Subject {index + 1}</h4>
                  {subjects.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSubject(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`name-${index}`}>Subject Name *</Label>
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={() => navigate("/subjects")}
                        className="h-auto p-0 text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Manage Subjects
                      </Button>
                    </div>
                    
                    <Popover 
                      open={subjectSearchOpen[index]} 
                      onOpenChange={(open) => {
                        const newOpen = [...subjectSearchOpen];
                        newOpen[index] = open;
                        setSubjectSearchOpen(newOpen);
                      }}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {subject.name ? (
                            <div className="flex items-center gap-2">
                              <span>{subject.name}</span>
                              {predefinedSubjects.find(s => s.name === subject.name) && (
                                <Badge variant="secondary" className="text-xs">Predefined</Badge>
                              )}
                              {subject.name && !predefinedSubjects.find(s => s.name === subject.name) && (
                                <Badge variant="outline" className="text-xs">Custom</Badge>
                              )}
                            </div>
                          ) : (
                            "Select subject..."
                          )}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search subjects..." />
                          <CommandList>
                            <CommandEmpty>No subject found.</CommandEmpty>
                            {predefinedSubjects.length > 0 && (
                              <CommandGroup heading="Predefined Subjects">
                                {predefinedSubjects.map((subj, i) => (
                                  <CommandItem
                                    key={i}
                                    value={subj.name}
                                    onSelect={() => {
                                      updateSubject(index, "name", subj.name);
                                      const newCustomMode = [...customSubjectMode];
                                      newCustomMode[index] = false;
                                      setCustomSubjectMode(newCustomMode);
                                      const newOpen = [...subjectSearchOpen];
                                      newOpen[index] = false;
                                      setSubjectSearchOpen(newOpen);
                                    }}
                                  >
                                    {subj.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            )}
                            <CommandSeparator />
                            <CommandGroup heading="Custom Subject">
                              <CommandItem
                                onSelect={() => {
                                  const newCustomMode = [...customSubjectMode];
                                  newCustomMode[index] = true;
                                  setCustomSubjectMode(newCustomMode);
                                  const newOpen = [...subjectSearchOpen];
                                  newOpen[index] = false;
                                  setSubjectSearchOpen(newOpen);
                                }}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Subject
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {customSubjectMode[index] && (
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Enter custom subject name"
                          value={customSubjectInput[index] || ""}
                          onChange={(e) => {
                            const newCustomInput = [...customSubjectInput];
                            newCustomInput[index] = e.target.value;
                            setCustomSubjectInput(newCustomInput);
                          }}
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handleSaveCustomSubject(index)}
                        >
                          Save
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`teacher-${index}`}>Teacher *</Label>
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={() => navigate("/teachers")}
                        className="h-auto p-0 text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Manage Teachers
                      </Button>
                    </div>
                    
                    {teachers.length > 0 ? (
                      <Popover 
                        open={teacherSearchOpen[index]} 
                        onOpenChange={(open) => {
                          const newOpen = [...teacherSearchOpen];
                          newOpen[index] = open;
                          setTeacherSearchOpen(newOpen);
                        }}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            <span className={subject.teacher ? "" : "text-muted-foreground"}>
                              {subject.teacher || "Select teacher..."}
                            </span>
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search teachers..." />
                            <CommandList>
                              <CommandEmpty>No teacher found.</CommandEmpty>
                              <CommandGroup>
                                {uniqueTeachers.map((teacherName, i) => {
                                  const usage = teacherUsage[teacherName] || 0;
                                  return (
                                    <CommandItem
                                      key={i}
                                      value={teacherName}
                                      onSelect={() => {
                                        updateSubject(index, "teacher", teacherName);
                                        const newOpen = [...teacherSearchOpen];
                                        newOpen[index] = false;
                                        setTeacherSearchOpen(newOpen);
                                      }}
                                    >
                                      <span className="flex-1">{teacherName}</span>
                                      <Badge variant={usage >= 20 ? "destructive" : usage >= 15 ? "secondary" : "outline"}>
                                        {usage} periods
                                      </Badge>
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Input
                        id={`teacher-${index}`}
                        placeholder="Enter teacher name"
                        value={subject.teacher}
                        onChange={(e) => updateSubject(index, "teacher", e.target.value)}
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Schedule Options</Label>
                    
                    {/* Auto Schedule */}
                    <div className="space-y-2">
                      <Label htmlFor={`repeat-${index}`}>Periods per Week (Auto)</Label>
                      <Input
                        id={`repeat-${index}`}
                        type="number"
                        min="0"
                        max="10"
                        placeholder="e.g., 4"
                        value={subject.repeat}
                        onChange={(e) => updateSubject(index, "repeat", parseInt(e.target.value) || 0)}
                        disabled={subject.day !== undefined && subject.period !== undefined}
                      />
                      {subject.repeat > 0 && (
                        <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
                          📅 Auto-scheduled for <span className="font-bold text-primary">{subject.repeat} period{subject.repeat !== 1 ? 's' : ''}</span> per week
                        </p>
                      )}
                    </div>

                    {/* Manual Schedule */}
                    <div className="space-y-2">
                      <Label>Fixed Day & Period (Manual)</Label>
                      <div className="flex gap-2">
                        <Select
                          value={subject.day?.toString() || ""}
                          onValueChange={(value) => {
                            if (value === "clear") {
                              updateSubject(index, "day", undefined as any);
                              updateSubject(index, "period", undefined as any);
                            } else {
                              const dayIndex = DAYS.indexOf(value) + 1;
                              updateSubject(index, "day", dayIndex);
                              if (subject.repeat > 0) {
                                updateSubject(index, "repeat", 0);
                              }
                            }
                          }}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clear">Clear</SelectItem>
                            {DAYS.map((day, idx) => (
                              <SelectItem key={day} value={day}>{day}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={subject.period?.toString() || ""}
                          onValueChange={(value) => {
                            if (value === "clear") {
                              updateSubject(index, "period", undefined as any);
                              updateSubject(index, "day", undefined as any);
                            } else {
                              updateSubject(index, "period", parseInt(value));
                              if (subject.repeat > 0) {
                                updateSubject(index, "repeat", 0);
                              }
                            }
                          }}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clear">Clear</SelectItem>
                            {PERIODS.map((period) => (
                              <SelectItem key={period} value={period.toString()}>
                                Period {period}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {subject.day !== undefined && subject.period !== undefined && (
                        <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
                          📌 Fixed: <span className="font-bold text-primary">{DAYS[subject.day - 1]}, Period {subject.period}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`isLab-${index}`} className="text-sm font-medium">
                        Laboratory Subject
                      </Label>
                      <Switch
                        id={`isLab-${index}`}
                        checked={subject.isLab || false}
                        onCheckedChange={(checked) => updateSubject(index, "isLab", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`isEtc-${index}`} className="text-sm font-medium">
                        Activity/Other (Sports, Library)
                      </Label>
                      <Switch
                        id={`isEtc-${index}`}
                        checked={subject.isEtc || false}
                        onCheckedChange={(checked) => updateSubject(index, "isEtc", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`isLang-${index}`} className="text-sm font-medium">
                        Language Subject
                      </Label>
                      <Switch
                        id={`isLang-${index}`}
                        checked={subject.isLang || false}
                        onCheckedChange={(checked) => updateSubject(index, "isLang", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addSubject}
            className="w-full"
          >
            <Plus className="h-4 w-4" />
            Add Another Subject
          </Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : `Save ${timetableName} Data`}
      </Button>
    </form>
  );
};

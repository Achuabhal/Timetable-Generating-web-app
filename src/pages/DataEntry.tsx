import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TimetableForm } from "@/components/TimetableForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimetableData, Subject, Teacher, PredefinedSubject, TimetableConfig } from "@/types/timetable";
import { ArrowLeft, Eye, Plus, Trash2, AlertTriangle, Settings } from "lucide-react";
import { toast } from "sonner";

interface DataEntryProps {
  initialData?: TimetableData;
  teachers: Teacher[];
  predefinedSubjects: PredefinedSubject[];
  onSubjectsUpdate: (subjects: PredefinedSubject[]) => void;
  onDataUpdate?: (data: TimetableData) => void;
  timetableConfig: TimetableConfig | null;
  onConfigUpdate: (config: TimetableConfig) => void;
}

const scheduleLabels = [
  'Year 15.a', 'Year 1.b',
  'Year 2.a', 'Year 2.b',
  'Year 3.a', 'Year 3.b',
  '1st MCA', '2nd MCA'
];

const DataEntry = ({ 
  initialData = [], 
  teachers, 
  predefinedSubjects, 
  onSubjectsUpdate, 
  onDataUpdate,
  timetableConfig,
  onConfigUpdate
}: DataEntryProps) => {
  const navigate = useNavigate();
  const [timetables, setTimetables] = useState<TimetableData>(
    initialData.length > 0 ? initialData : [[]]
  );
  
  // Initialize timetable names from localStorage or use predefined labels
  const [timetableNames, setTimetableNames] = useState<string[]>(() => {
    const savedNames = localStorage.getItem("timetableNames");
    if (savedNames) {
      try {
        return JSON.parse(savedNames);
      } catch (e) {
        console.error("Error loading timetable names:", e);
      }
    }
    return initialData.length > 0 
      ? initialData.map((_, i) => scheduleLabels[i] || `Timetable ${i + 1}`)
      : [scheduleLabels[0]];
  });
  const [activeTab, setActiveTab] = useState("0");
  const [isConfigured, setIsConfigured] = useState(false);
  const [numPeriods, setNumPeriods] = useState(8);
  const [selectedDays, setSelectedDays] = useState<string[]>(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);

  useEffect(() => {
    if (timetableConfig) {
      setIsConfigured(true);
      setNumPeriods(timetableConfig.numPeriods);
      setSelectedDays(timetableConfig.selectedDays);
    }
  }, [timetableConfig]);

  const handleTimetableSubmit = (index: number, subjects: Subject[]) => {
    const updated = [...timetables];
    updated[index] = subjects;
    setTimetables(updated);
    if (onDataUpdate) {
      onDataUpdate(updated);
    }
  };

  const addTimetable = () => {
    const newIndex = timetables.length;
    const newName = scheduleLabels[newIndex] || `Timetable ${newIndex + 1}`;
    const updatedTimetables = [...timetables, []];
    const updatedNames = [...timetableNames, newName];
    
    setTimetables(updatedTimetables);
    setTimetableNames(updatedNames);
    localStorage.setItem("timetableNames", JSON.stringify(updatedNames));
    setActiveTab(newIndex.toString());
    toast.success("New timetable added!");
  };

  const removeTimetable = (index: number) => {
    if (timetables.length === 1) {
      toast.error("You must have at least one timetable");
      return;
    }
    const updated = timetables.filter((_, i) => i !== index);
    const updatedNames = timetableNames.filter((_, i) => i !== index);
    setTimetables(updated);
    setTimetableNames(updatedNames);
    localStorage.setItem("timetableNames", JSON.stringify(updatedNames));
    if (activeTab === index.toString()) {
      setActiveTab("0");
    }
    if (onDataUpdate) {
      onDataUpdate(updated);
    }
    toast.success("Timetable removed");
  };

  const updateTimetableName = (index: number, name: string) => {
    const updated = [...timetableNames];
    updated[index] = name;
    setTimetableNames(updated);
    localStorage.setItem("timetableNames", JSON.stringify(updated));
  };

  const handleViewTimetable = () => {
    if (onDataUpdate) {
      onDataUpdate(timetables);
    }
    navigate("/timetable", { state: { timetables, timetableNames } });
  };

  const hasAnyData = timetables.some((tt) => tt.length > 0);

  const handleConfigSave = () => {
    const config: TimetableConfig = {
      numPeriods,
      selectedDays
    };
    onConfigUpdate(config);
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center mb-8 animate-fade-in">
            <Button variant="ghost" onClick={() => navigate("/")} size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-foreground">Configure Timetable Structure</h1>
              <p className="text-muted-foreground mt-1">
                Set up the basic structure for all timetables
              </p>
            </div>
          </div>

          <TimetableForm
            timetableName="All Timetables"
            initialData={[]}
            onSubmit={() => {}}
            teachers={teachers}
            predefinedSubjects={predefinedSubjects}
            onSubjectsUpdate={onSubjectsUpdate}
            isConfigured={isConfigured}
            setIsConfigured={setIsConfigured}
            numPeriods={numPeriods}
            setNumPeriods={setNumPeriods}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            showConfigOnly={true}
            onConfigSave={handleConfigSave}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")} size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Manage Timetables</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage multiple timetables with subjects and teachers
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setIsConfigured(false)} variant="outline" size="lg">
              <Settings className="h-5 w-5" />
              Configure Structure
            </Button>
            <Button onClick={() => navigate("/subjects")} variant="outline" size="lg">
              Manage Subjects
            </Button>
            <Button onClick={() => navigate("/teachers")} variant="outline" size="lg">
              Manage Teachers
            </Button>
            {hasAnyData && (
              <Button onClick={handleViewTimetable} size="lg" className="shadow-elevated">
                <Eye className="h-5 w-5" />
                View Timetables
              </Button>
            )}
          </div>
        </div>

        {/* Teacher Warning */}
        <div>
        </div>

        {teachers.length === 0 && (
          <div className="mb-6 p-6 bg-destructive/10 border border-destructive/20 rounded-lg animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-destructive/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">No Teachers Added Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Please add teachers first before creating timetables. Teachers are required to assign subjects.
                </p>
                <Button onClick={() => navigate("/teachers")} variant="default">
                  Add Teachers Now
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <Button onClick={addTimetable} variant="outline" size="lg">
            <Plus className="h-5 w-5" />
            Add New Timetable
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card shadow-card flex-wrap h-auto">
            {timetables.map((_, index) => (
              <div key={index} className="flex items-center gap-2 group">
                <TabsTrigger 
                  value={index.toString()} 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {timetableNames[index]}
                </TabsTrigger>
                {timetables.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTimetable(index);
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </TabsList>

          {timetables.map((subjects, index) => (
            <TabsContent key={index} value={index.toString()} className="animate-fade-in">
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Timetable Name
                </label>
                <Input
                  value={timetableNames[index]}
                  onChange={(e) => updateTimetableName(index, e.target.value)}
                  placeholder="Enter timetable name"
                  className="max-w-md"
                />
              </div>
              <TimetableForm
                timetableName={timetableNames[index]}
                initialData={subjects}
                onSubmit={(subjects) => handleTimetableSubmit(index, subjects)}
                teachers={teachers}
                predefinedSubjects={predefinedSubjects}
                onSubjectsUpdate={onSubjectsUpdate}
                isConfigured={isConfigured}
                setIsConfigured={setIsConfigured}
                numPeriods={numPeriods}
                setNumPeriods={setNumPeriods}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default DataEntry;

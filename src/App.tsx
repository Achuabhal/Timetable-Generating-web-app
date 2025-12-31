import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DataEntry from "./pages/DataEntry";
import Teachers from "./pages/Teachers";
import Subjects from "./pages/Subjects";
import Timetable from "./pages/Timetable";
import NotFound from "./pages/NotFound";
import { TimetableData, Teacher, PredefinedSubject, TimetableConfig } from "./types/timetable";
import Algorithm from "./pages/Algorithm"

const queryClient = new QueryClient();

function App() {
  const [timetablesData, setTimetablesData] = useState<TimetableData>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [predefinedSubjects, setPredefinedSubjects] = useState<PredefinedSubject[]>([]);
  const [timetableConfig, setTimetableConfig] = useState<TimetableConfig | null>(null);

  useEffect(() => {
    const savedTeachers = localStorage.getItem("teachers");
    if (savedTeachers) {
      try {
        setTeachers(JSON.parse(savedTeachers));
      } catch (e) {
        console.error("Error loading teachers:", e);
      }
    }

    const savedSubjects = localStorage.getItem("predefinedSubjects");
    if (savedSubjects) {
      try {
        setPredefinedSubjects(JSON.parse(savedSubjects));
      } catch (e) {
        console.error("Error loading subjects:", e);
      }
    }

    const savedTimetables = localStorage.getItem("timetablesData");
    if (savedTimetables) {
      try {
        setTimetablesData(JSON.parse(savedTimetables));
      } catch (e) {
        console.error("Error loading timetables:", e);
      }
    }

    const savedConfig = localStorage.getItem("timetableConfig");
    if (savedConfig) {
      try {
        setTimetableConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Error loading timetable config:", e);
      }
    }
  }, []);

  const handleTeachersUpdate = (updatedTeachers: Teacher[]) => {
    setTeachers(updatedTeachers);
    localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
  };

  const handleSubjectsUpdate = (updatedSubjects: PredefinedSubject[]) => {
    setPredefinedSubjects(updatedSubjects);
    localStorage.setItem("predefinedSubjects", JSON.stringify(updatedSubjects));
  };

  const handleTimetablesUpdate = (updatedTimetables: TimetableData) => {
    setTimetablesData(updatedTimetables);
    localStorage.setItem("timetablesData", JSON.stringify(updatedTimetables));
  };

  const handleConfigUpdate = (config: TimetableConfig) => {
    setTimetableConfig(config);
    localStorage.setItem("timetableConfig", JSON.stringify(config));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/teachers"
              element={<Teachers teachers={teachers} onUpdate={handleTeachersUpdate} />}
            />
            <Route
              path="/subjects"
              element={<Subjects subjects={predefinedSubjects} onUpdate={handleSubjectsUpdate} />}
            />
            <Route
              path="/algo"
              element={<Algorithm />}
            />
            <Route
              path="/data-entry"
              element={
                <DataEntry 
                  initialData={timetablesData} 
                  teachers={teachers} 
                  predefinedSubjects={predefinedSubjects}
                  onSubjectsUpdate={handleSubjectsUpdate}
                  onDataUpdate={handleTimetablesUpdate}
                  timetableConfig={timetableConfig}
                  onConfigUpdate={handleConfigUpdate}
                />
              }
            />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

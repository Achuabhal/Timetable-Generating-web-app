import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Subject } from "@/types/timetable";
import { FlaskConical, Activity } from "lucide-react";

interface SubjectCardProps {
  subject: Subject;
}

export const SubjectCard = ({ subject }: SubjectCardProps) => {
  const getBadgeStyle = () => {
    if (subject.isLab) return "bg-lab text-lab-foreground hover:bg-lab/90";
    if (subject.isEtc) return "bg-etc text-etc-foreground hover:bg-etc/90";
    return "bg-primary text-primary-foreground hover:bg-primary/90";
  };

  const getCardStyle = () => {
    if (subject.isLab) return "border-lab/30 bg-lab/5";
    if (subject.isEtc) return "border-etc/30 bg-etc/5";
    return "border-primary/20 bg-card";
  };

  return (
    <Card className={`p-4 shadow-card hover:shadow-elevated transition-all animate-fade-in ${getCardStyle()}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {subject.isLab && <FlaskConical className="h-4 w-4 text-lab" />}
            {subject.isEtc && <Activity className="h-4 w-4 text-etc" />}
            <h3 className="font-semibold text-foreground">{subject.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Teacher:</span> {subject.teacher}
          </p>
          <div className="flex items-center gap-2">
            <Badge className={getBadgeStyle()}>
              {subject.repeat} {subject.repeat === 1 ? "period" : "periods"}/week
            </Badge>
            {subject.isLab && <Badge variant="outline" className="border-lab text-lab">Lab</Badge>}
            {subject.isEtc && <Badge variant="outline" className="border-etc text-etc">Activity</Badge>}
          </div>
        </div>
      </div>
    </Card>
  );
};

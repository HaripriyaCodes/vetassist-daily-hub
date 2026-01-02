import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/data/mockData";
import { Clock, User, PawPrint, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  appointment: Appointment;
  compact?: boolean;
  onClick?: () => void;
}

const typeConfig = {
  checkup: { label: "Checkup", variant: "secondary" as const },
  vaccination: { label: "Vaccination", variant: "default" as const },
  surgery: { label: "Surgery", variant: "warning" as const },
  "follow-up": { label: "Follow-up", variant: "muted" as const },
  emergency: { label: "Emergency", variant: "emergency" as const },
};

const statusConfig = {
  scheduled: { label: "Scheduled", variant: "secondary" as const },
  "in-progress": { label: "In Progress", variant: "success" as const },
  completed: { label: "Completed", variant: "muted" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
};

export function AppointmentCard({ appointment, compact = false, onClick }: AppointmentCardProps) {
  const isEmergency = appointment.type === "emergency";
  
  if (compact) {
    return (
      <div
        onClick={onClick}
        className={cn(
          "flex items-center gap-4 p-4 rounded-lg border bg-card cursor-pointer transition-all hover:shadow-md",
          isEmergency && "border-emergency/30 bg-emergency-light"
        )}
      >
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-secondary">
          {isEmergency ? (
            <AlertTriangle className="h-6 w-6 text-emergency" />
          ) : (
            <PawPrint className="h-6 w-6 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{appointment.petName}</span>
            <Badge variant={typeConfig[appointment.type].variant} className="text-[10px]">
              {typeConfig[appointment.type].label}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{appointment.time}</span>
            <span className="text-border">•</span>
            <span>{appointment.ownerName}</span>
          </div>
        </div>
        <Badge variant={statusConfig[appointment.status].variant}>
          {statusConfig[appointment.status].label}
        </Badge>
      </div>
    );
  }

  return (
    <Card 
      variant={isEmergency ? "emergency" : "interactive"} 
      onClick={onClick}
      className="cursor-pointer"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center w-12 h-12 rounded-lg",
              isEmergency ? "bg-emergency/20" : "bg-secondary"
            )}>
              {isEmergency ? (
                <AlertTriangle className="h-6 w-6 text-emergency" />
              ) : (
                <PawPrint className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{appointment.petName}</CardTitle>
              <p className="text-sm text-muted-foreground">{appointment.species}</p>
            </div>
          </div>
          <Badge variant={typeConfig[appointment.type].variant}>
            {typeConfig[appointment.type].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{appointment.ownerName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{appointment.time} - {appointment.date}</span>
        </div>
        {appointment.notes && (
          <p className="text-sm text-muted-foreground border-t pt-3">
            {appointment.notes}
          </p>
        )}
        <div className="flex items-center justify-between pt-2">
          <Badge variant={statusConfig[appointment.status].variant}>
            {statusConfig[appointment.status].label}
          </Badge>
          <Button size="sm" variant={isEmergency ? "emergency" : "default"}>
            Start Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

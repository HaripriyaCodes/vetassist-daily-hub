import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAppointments, mockPets } from "@/data/mockData";
import {
  Calendar,
  AlertTriangle,
  Clock,
  PawPrint,
  Users,
  TrendingUp,
  ArrowRight,
  Syringe,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const todayAppointments = mockAppointments.filter(apt => apt.date === "2026-01-02");
  const emergencyAppointments = todayAppointments.filter(apt => apt.type === "emergency");
  const upcomingAppointments = todayAppointments.filter(apt => apt.status === "scheduled");

  const followUpReminders = [
    { id: 1, petName: "Charlie", reason: "Post-surgery check", dueDate: "Tomorrow" },
    { id: 2, petName: "Bella", reason: "Blood test results", dueDate: "Jan 4" },
    { id: 3, petName: "Rocky", reason: "Medication review", dueDate: "Jan 5" },
  ];

  const vaccinationsDue = [
    { id: 1, petName: "Max", vaccine: "Rabies", dueDate: "Jan 15" },
    { id: 2, petName: "Luna", vaccine: "FVRCP", dueDate: "Jan 18" },
  ];

  return (
    <DashboardLayout title="Good morning, Dr. Foster" subtitle="Thursday, January 2, 2026">
      <div className="space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <StatCard
            title="Today's Appointments"
            value={todayAppointments.length}
            icon={Calendar}
            variant="primary"
            trend={{ value: "2 more than yesterday", positive: true }}
          />
          <StatCard
            title="Emergency Cases"
            value={emergencyAppointments.length}
            icon={AlertTriangle}
            variant="emergency"
          />
          <StatCard
            title="Pending Follow-ups"
            value={3}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Total Patients"
            value={mockPets.length}
            icon={PawPrint}
            trend={{ value: "12% this month", positive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-semibold">Today's Schedule</h2>
              <Link to="/appointments">
                <Button variant="ghost" size="sm" className="gap-1">
                  View all <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Emergency Alert */}
            {emergencyAppointments.length > 0 && (
              <Card variant="emergency" className="animate-pulse-soft">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emergency/20">
                    <AlertTriangle className="h-6 w-6 text-emergency" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-emergency">Emergency Case Waiting</p>
                    <p className="text-sm text-muted-foreground">
                      {emergencyAppointments[0].petName} - {emergencyAppointments[0].notes}
                    </p>
                  </div>
                  <Button variant="emergency">
                    Handle Now
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Appointment list */}
            <div className="space-y-3">
              {upcomingAppointments.slice(0, 4).map((apt, index) => (
                <div 
                  key={apt.id}
                  className="animate-slide-in-left"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <AppointmentCard appointment={apt} compact />
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {/* Follow-up Reminders */}
            <Card variant="elevated">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" />
                    Follow-up Reminders
                  </CardTitle>
                  <Badge variant="muted">{followUpReminders.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {followUpReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium">{reminder.petName}</p>
                      <p className="text-xs text-muted-foreground">{reminder.reason}</p>
                    </div>
                    <Badge variant="secondary">{reminder.dueDate}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Vaccinations Due */}
            <Card variant="elevated">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Syringe className="h-4 w-4 text-primary" />
                    Vaccinations Due
                  </CardTitle>
                  <Badge variant="warning">{vaccinationsDue.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {vaccinationsDue.map((vac) => (
                  <div
                    key={vac.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-warning/10 hover:bg-warning/20 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium">{vac.petName}</p>
                      <p className="text-xs text-muted-foreground">{vac.vaccine}</p>
                    </div>
                    <Badge variant="warning">{vac.dueDate}</Badge>
                  </div>
                ))}
                <Link to="/vaccinations">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All Vaccinations
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Link to="/pets">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <PawPrint className="h-4 w-4" />
                    Find Pet
                  </Button>
                </Link>
                <Link to="/prescriptions">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <TrendingUp className="h-4 w-4" />
                    New Rx
                  </Button>
                </Link>
                <Link to="/appointments">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </Button>
                </Link>
                <Link to="/telehealth">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Users className="h-4 w-4" />
                    TeleHealth
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

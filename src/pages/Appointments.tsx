import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAppointments, timeSlots } from "@/data/mockData";
import { ChevronLeft, ChevronRight, Plus, Clock, Filter } from "lucide-react";

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState("2026-01-02");
  const todayAppointments = mockAppointments.filter(apt => apt.date === selectedDate);

  const getAppointmentForSlot = (slot: string) => {
    return todayAppointments.find(apt => apt.time === slot);
  };

  return (
    <DashboardLayout title="Appointments" subtitle="Manage your schedule">
      <div className="space-y-6">
        {/* Header controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-4 py-2 bg-secondary rounded-lg">
              <span className="font-medium">Thursday, January 2, 2026</span>
            </div>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList>
            <TabsTrigger value="schedule">Schedule View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Time Slots
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      <span className="text-muted-foreground">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Scheduled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emergency" />
                      <span className="text-muted-foreground">Emergency</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {timeSlots.map((slot) => {
                    const appointment = getAppointmentForSlot(slot);
                    const isEmergency = appointment?.type === "emergency";
                    
                    return (
                      <div
                        key={slot}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                          appointment
                            ? isEmergency
                              ? "bg-emergency-light border-emergency/30"
                              : "bg-primary/5 border-primary/20"
                            : "bg-secondary/30 border-transparent hover:border-border cursor-pointer"
                        }`}
                      >
                        <div className="w-16 text-sm font-medium text-muted-foreground">
                          {slot}
                        </div>
                        {appointment ? (
                          <div className="flex-1 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${isEmergency ? "bg-emergency" : "bg-primary"}`} />
                              <div>
                                <p className="font-medium">{appointment.petName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.ownerName} • {appointment.notes}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={isEmergency ? "emergency" : "default"}>
                                {appointment.type}
                              </Badge>
                              <Button size="sm" variant={isEmergency ? "emergency" : "default"}>
                                Start
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Available</span>
                            <Button variant="ghost" size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Book
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayAppointments.map((apt, index) => (
                <div
                  key={apt.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <AppointmentCard appointment={apt} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

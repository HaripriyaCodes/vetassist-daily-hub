import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockPets, mockPrescriptions } from "@/data/mockData";
import {
  Plus,
  Pill,
  Search,
  Printer,
  Send,
  Trash2,
  PawPrint,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Prescriptions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "", duration: "" },
  ]);

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", frequency: "", duration: "" }]);
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  return (
    <DashboardLayout title="Prescriptions" subtitle="Create and manage digital prescriptions">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search prescriptions..." className="pl-10" />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
                <DialogDescription>
                  Create a digital prescription for a patient. This will be linked to the pet's medical record.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                {/* Pet Selection */}
                <div className="space-y-2">
                  <Label>Select Patient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Search and select a pet..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPets.map((pet) => (
                        <SelectItem key={pet.id} value={pet.id}>
                          <div className="flex items-center gap-2">
                            <PawPrint className="h-4 w-4" />
                            <span>{pet.name}</span>
                            <span className="text-muted-foreground">({pet.id})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Medicines */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Medicines</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addMedicine} className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Medicine
                    </Button>
                  </div>
                  {medicines.map((med, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label>Medicine Name</Label>
                          <Input placeholder="e.g., Amoxicillin" />
                        </div>
                        <div>
                          <Label>Dosage</Label>
                          <Input placeholder="e.g., 250mg" />
                        </div>
                        <div>
                          <Label>Frequency</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="once">Once daily</SelectItem>
                              <SelectItem value="twice">Twice daily</SelectItem>
                              <SelectItem value="three">Three times daily</SelectItem>
                              <SelectItem value="asneeded">As needed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input placeholder="e.g., 7 days" />
                        </div>
                        <div className="flex items-end">
                          {medicines.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMedicine(index)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea placeholder="Any special instructions for the pet owner..." />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    Create Prescription
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Prescriptions List */}
        <div className="grid gap-4">
          {mockPrescriptions.map((rx) => (
            <Card key={rx.id} variant="interactive">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                      <Pill className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>Prescription #{rx.id}</CardTitle>
                        <Badge variant={rx.status === "active" ? "success" : "muted"}>
                          {rx.status}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <PawPrint className="h-3 w-3" />
                        {rx.petName} • {rx.date} • {rx.veterinarian}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Printer className="h-4 w-4" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Send className="h-4 w-4" />
                      Send to Pharmacy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {rx.medicines.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-secondary/50 rounded-lg space-y-1"
                    >
                      <p className="font-medium text-sm">{med.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {med.dosage} • {med.frequency}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {med.duration}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

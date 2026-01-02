import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPets, mockMedicalRecords, mockVaccinations, mockPrescriptions } from "@/data/mockData";
import {
  Search,
  PawPrint,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Syringe,
  Pill,
  Plus,
  Upload,
  CheckCircle,
  AlertCircle,
  Weight,
  Clock,
} from "lucide-react";

export default function PetRecords() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPet, setSelectedPet] = useState(mockPets[0]);

  const filteredPets = mockPets.filter(
    (pet) =>
      pet.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const petRecords = mockMedicalRecords.filter((r) => r.petId === selectedPet.id);
  const petVaccinations = mockVaccinations.filter((v) => v.petId === selectedPet.id);
  const petPrescriptions = mockPrescriptions.filter((p) => p.petId === selectedPet.id);

  return (
    <DashboardLayout title="Pet Records" subtitle="Search and manage pet medical records">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pet Search */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="h-4 w-4" />
                Find Pet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Search by Pet ID or owner name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredPets.map((pet) => (
                  <div
                    key={pet.id}
                    onClick={() => setSelectedPet(pet)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedPet.id === pet.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <PawPrint className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{pet.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {pet.id} • {pet.ownerName}
                        </p>
                      </div>
                      <Badge variant="secondary">{pet.species}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pet Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Pet Profile Card */}
          <Card variant="gradient">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10">
                  <PawPrint className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-display font-bold">{selectedPet.name}</h2>
                    <Badge>{selectedPet.species}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{selectedPet.breed}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPet.age}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Weight className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPet.weight}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPet.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPet.ownerPhone}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Pet ID</p>
                  <Badge variant="outline" className="font-mono">
                    {selectedPet.id}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Records Tabs */}
          <Tabs defaultValue="records" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="records" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Records
                </TabsTrigger>
                <TabsTrigger value="vaccinations" className="gap-2">
                  <Syringe className="h-4 w-4" />
                  Vaccinations
                </TabsTrigger>
                <TabsTrigger value="prescriptions" className="gap-2">
                  <Pill className="h-4 w-4" />
                  Prescriptions
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload External Record
                </Button>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Record
                </Button>
              </div>
            </div>

            <TabsContent value="records" className="space-y-3">
              {petRecords.map((record) => (
                <Card
                  key={record.id}
                  variant={record.isExternal ? "default" : "interactive"}
                  className={record.isExternal ? "border-l-4 border-l-warning" : ""}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{record.visitType}</CardTitle>
                          {record.isExternal && (
                            <Badge variant="warning" className="text-xs">
                              External
                            </Badge>
                          )}
                          {record.isExternal && record.verified && (
                            <Badge variant="success" className="text-xs gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          {record.date} • {record.veterinarian}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Symptoms: </span>
                      <span>{record.symptoms}</span>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Diagnosis: </span>
                      <span>{record.diagnosis}</span>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Treatment: </span>
                      <span>{record.treatment}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="vaccinations" className="space-y-3">
              {petVaccinations.map((vac) => (
                <Card key={vac.id} variant="interactive">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                          <Syringe className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium">{vac.vaccineName}</p>
                          <p className="text-sm text-muted-foreground">
                            Administered: {vac.dateAdministered}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Next due</p>
                        <Badge variant="success">{vac.nextDueDate}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-3">
              {petPrescriptions.map((rx) => (
                <Card key={rx.id} variant="interactive">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          Prescription #{rx.id}
                          <Badge variant={rx.status === "active" ? "success" : "muted"}>
                            {rx.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{rx.date} • {rx.veterinarian}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        Print Rx
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {rx.medicines.map((med, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{med.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {med.dosage} • {med.frequency}
                            </p>
                          </div>
                          <Badge variant="outline">{med.duration}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}

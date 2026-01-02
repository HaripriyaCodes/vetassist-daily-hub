// Mock data for VetAssist demonstration

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  avatarUrl?: string;
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  ownerName: string;
  time: string;
  date: string;
  type: 'checkup' | 'vaccination' | 'surgery' | 'follow-up' | 'emergency';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  species: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  date: string;
  visitType: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  veterinarian: string;
  notes?: string;
  isExternal?: boolean;
  verified?: boolean;
}

export interface Prescription {
  id: string;
  petId: string;
  petName: string;
  date: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  veterinarian: string;
  status: 'active' | 'completed';
}

export interface Vaccination {
  id: string;
  petId: string;
  vaccineName: string;
  dateAdministered: string;
  nextDueDate: string;
  veterinarian: string;
}

export const mockPets: Pet[] = [
  {
    id: 'PET-001',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '5 years',
    weight: '32 kg',
    ownerName: 'Sarah Johnson',
    ownerPhone: '+1 (555) 123-4567',
    ownerEmail: 'sarah.j@email.com',
  },
  {
    id: 'PET-002',
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: '3 years',
    weight: '4.5 kg',
    ownerName: 'Michael Chen',
    ownerPhone: '+1 (555) 234-5678',
    ownerEmail: 'mchen@email.com',
  },
  {
    id: 'PET-003',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Beagle',
    age: '7 years',
    weight: '12 kg',
    ownerName: 'Emily Davis',
    ownerPhone: '+1 (555) 345-6789',
    ownerEmail: 'emily.d@email.com',
  },
  {
    id: 'PET-004',
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Siamese',
    age: '2 years',
    weight: '3.8 kg',
    ownerName: 'James Wilson',
    ownerPhone: '+1 (555) 456-7890',
    ownerEmail: 'jwilson@email.com',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'APT-001',
    petId: 'PET-001',
    petName: 'Max',
    ownerName: 'Sarah Johnson',
    time: '09:00',
    date: '2026-01-02',
    type: 'checkup',
    status: 'scheduled',
    species: 'Dog',
    notes: 'Annual wellness check',
  },
  {
    id: 'APT-002',
    petId: 'PET-002',
    petName: 'Luna',
    ownerName: 'Michael Chen',
    time: '09:30',
    date: '2026-01-02',
    type: 'vaccination',
    status: 'scheduled',
    species: 'Cat',
    notes: 'Rabies booster due',
  },
  {
    id: 'APT-003',
    petId: 'PET-003',
    petName: 'Buddy',
    ownerName: 'Emily Davis',
    time: '10:00',
    date: '2026-01-02',
    type: 'emergency',
    status: 'in-progress',
    species: 'Dog',
    notes: 'Limping on right front leg - urgent',
  },
  {
    id: 'APT-004',
    petId: 'PET-004',
    petName: 'Whiskers',
    ownerName: 'James Wilson',
    time: '11:00',
    date: '2026-01-02',
    type: 'follow-up',
    status: 'scheduled',
    species: 'Cat',
    notes: 'Post-surgery check',
  },
  {
    id: 'APT-005',
    petId: 'PET-001',
    petName: 'Max',
    ownerName: 'Sarah Johnson',
    time: '14:00',
    date: '2026-01-02',
    type: 'surgery',
    status: 'scheduled',
    species: 'Dog',
    notes: 'Dental cleaning procedure',
  },
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'REC-001',
    petId: 'PET-001',
    date: '2025-12-15',
    visitType: 'Checkup',
    symptoms: 'Slight lethargy, decreased appetite',
    diagnosis: 'Mild gastritis',
    treatment: 'Prescribed antacids and bland diet for 5 days',
    veterinarian: 'Dr. Amanda Foster',
    notes: 'Follow-up in 1 week if symptoms persist',
  },
  {
    id: 'REC-002',
    petId: 'PET-001',
    date: '2025-11-01',
    visitType: 'Vaccination',
    symptoms: 'None - routine visit',
    diagnosis: 'Healthy',
    treatment: 'DHPP booster administered',
    veterinarian: 'Dr. Amanda Foster',
  },
  {
    id: 'REC-003',
    petId: 'PET-001',
    date: '2025-09-20',
    visitType: 'External Record',
    symptoms: 'Eye irritation',
    diagnosis: 'Conjunctivitis',
    treatment: 'Eye drops prescribed',
    veterinarian: 'Dr. Robert Kim (City Pet Clinic)',
    isExternal: true,
    verified: true,
  },
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'RX-001',
    petId: 'PET-001',
    petName: 'Max',
    date: '2025-12-15',
    medicines: [
      {
        name: 'Omeprazole',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '5 days',
      },
      {
        name: 'Probiotics',
        dosage: '1 capsule',
        frequency: 'Twice daily',
        duration: '7 days',
      },
    ],
    veterinarian: 'Dr. Amanda Foster',
    status: 'active',
  },
];

export const mockVaccinations: Vaccination[] = [
  {
    id: 'VAC-001',
    petId: 'PET-001',
    vaccineName: 'Rabies',
    dateAdministered: '2025-06-15',
    nextDueDate: '2026-06-15',
    veterinarian: 'Dr. Amanda Foster',
  },
  {
    id: 'VAC-002',
    petId: 'PET-001',
    vaccineName: 'DHPP',
    dateAdministered: '2025-11-01',
    nextDueDate: '2026-11-01',
    veterinarian: 'Dr. Amanda Foster',
  },
];

export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00',
];

import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnosis } from "../../types";
import { useState, useEffect } from "react";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";

// styling
import { Box } from "@mui/system";
import { Button } from "@mui/material";

// components
import EntryItem from "./EntryDetail";

// icons
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

// form
import AddEntryModal from "../AddEntryModal/EntryModal";

interface PatientHeaderProps {
  name: string;
  gender: Gender;
}

const PatientHeader = ({ name, gender }: PatientHeaderProps) => {
  let iconComponent;

  switch (gender) {
    case "male":
      iconComponent = <MaleIcon />;
      break;
    case "female":
      iconComponent = <FemaleIcon />;
      break;
    default:
      iconComponent = <TransgenderIcon />;
  }

  return (
    <h1>
      {name} {iconComponent}
    </h1>
  );
};

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // fetch diagnosis
  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const allDiagnoses = await diagnosisService.getAllDiagnosis();
        setDiagnoses(allDiagnoses); // Correctly set the diagnoses
      } catch (error) {
        console.error("Failed to fetch diagnoses", error);
      }
    };
    void fetchDiagnosis();
  }, []);

  // fetch patients
  useEffect(() => {
    const fetchPatient = async () => {
      if (id === undefined) {
        setPatient(undefined);
        return;
      }
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    void fetchPatient();
    setLoading(false);
  }, [id]);
  if (loading) {
    return <h1>Loading Patient Data</h1>;
  }
  if (patient === undefined || diagnoses === undefined) {
    return <h1>404: Patient not found</h1>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <PatientHeader name={patient.name} gender={patient.gender} />
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <h2>Entries</h2>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={() => {}}
          error={error}
          onClose={closeModal}
        />
        <Button
          sx={{ maxHeight: "40px" }}
          variant="contained"
          color="primary"
          onClick={() => openModal()}
        >
          Add Entry
        </Button>
      </Box>
      {patient.entries.map((entry) => (
        // <EntryItem key={entry.id} entry={entry} diagnosis={diagnoses} />
        <EntryItem key={entry.id} entry={entry} />
      ))}
    </Box>
  );
};

export default PatientDetail;

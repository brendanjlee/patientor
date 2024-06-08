import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnosis } from "../../types";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";

// styling
import { Box } from "@mui/system";

// components
import EntryItem from "./EntryDetail";

// icons
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

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
  console.log(patient);
  console.log(diagnoses);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <PatientHeader name={patient.name} gender={patient.gender} />
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        // <EntryItem key={entry.id} entry={entry} diagnosis={diagnoses} />
        <EntryItem key={entry.id} entry={entry} />
      ))}
    </Box>
  );
};

export default PatientDetail;

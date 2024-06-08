import { useParams } from "react-router-dom";
import { Patient, Gender, Entry, Diagnosis } from "../../types";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";

// icons
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

interface PatientHeaderProps {
  name: string;
  gender: Gender;
}

interface EntryItemProps {
  entry: Entry;
  diagnosis: Diagnosis[];
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

const EntryItem = ({ entry, diagnosis }: EntryItemProps) => {
  return (
    <>
      <p>
        {entry.date} <em>{entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code, index) => {
          const diagItem = diagnosis.find((d) => d.code === code);
          return (
            <li key={index}>
              {code} {diagItem?.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
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
  }, [id]);

  if (patient === undefined || diagnoses === undefined) {
    return <h1>404: Patient not found</h1>;
  }
  console.log(patient);
  console.log(diagnoses);
  return (
    <div>
      <PatientHeader name={patient.name} gender={patient.gender} />
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <EntryItem key={entry.id} entry={entry} diagnosis={diagnoses} />
      ))}
    </div>
  );
};

export default PatientDetail;

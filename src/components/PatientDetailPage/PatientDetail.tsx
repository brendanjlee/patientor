import { useParams } from "react-router-dom";
import { Patient, Gender } from "../../types";
import { useState, useEffect } from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

interface PatientDetailProps {
  patients: Patient[];
}

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

const PatientDetail = ({ patients }: PatientDetailProps) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    const currPatient = patients.find((patientEntry) => patientEntry.id === id);
    setPatient(currPatient);
  }, [id, patient, patients]);

  if (patient === undefined) {
    return <h1>404 Patient not found</h1>;
  }
  return (
    <div>
      <PatientHeader name={patient.name} gender={patient.gender} />
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientDetail;

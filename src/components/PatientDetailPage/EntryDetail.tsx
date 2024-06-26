import { Entry, HealthCheckRating } from "../../types";
import { Box } from "@mui/system";
import {
  LocalHospital,
  MedicalServices,
  Work,
  Favorite,
} from "@mui/icons-material";

interface Props {
  entry: Entry;
}

const HealthIcon = ({ entry }: Props) => {
  if (entry.type != "HealthCheck") return null;
  switch (entry.healthCheckRating) {
    case 0:
      return <Favorite style={{ color: "green" }} />;
    case 1:
      return <Favorite style={{ color: "yellow" }} />;
    case 2:
      return <Favorite style={{ color: "orange" }} />;
    case 3:
      return <Favorite style={{ color: "red" }} />;
    default:
      return null;
  }
};

const EntryIcon = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return <LocalHospital />;
    case "HealthCheck":
      return (
        <>
          <MedicalServices />
          {/* <HealthIcon healthCheckRating={entry.healthCheckRating} /> */}
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Work /> {entry.employerName}
        </>
      );
    default:
      return <></>;
  }
};

const ByType = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <>
          <p>- Discharge Date: {entry.discharge.date}</p>
          <p>- Discharge Condition: {entry.discharge.criteria}</p>
        </>
      );
    case "OccupationalHealthcare":
      return <p>- Employer: {entry.employerName}</p>;
    case "HealthCheck":
      return (
        <p>
          - Health Check Rating: {HealthCheckRating[entry.healthCheckRating]}
        </p>
      );
  }
};

// share items: desc, date, specialist,
const EntryItem = ({ entry }: Props) => {
  return (
    <Box sx={{ border: 1, borderRadius: "5px" }}>
      <p>
        {entry.date} <EntryIcon entry={entry} />{" "}
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <HealthIcon entry={entry} />
      <p>Diagnose by {entry.specialist}</p>
      <p>
        <b>Specific Notes:</b>
      </p>
      <ByType entry={entry} />
    </Box>
  );
};

export default EntryItem;

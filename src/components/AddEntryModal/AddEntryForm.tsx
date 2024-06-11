import { TextField, Button } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues } from "../../types";

interface Props {
  // onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  // const [diagnosisCodes, setDiagnosisCode] = useState("");
  // const [entryType, setEntryType] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <h2>New Entry</h2>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        {/* <TextField
          label="Diagnosis Codes (comma separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCode(e.target.value)}
        /> */}
        {/* <TextField
          label="Diagnosis Type"
          fullWidth
          value={entryType}
          onChange={(e) => setEntryType(e.target.value)}
        /> */}
      </form>
      <Button
        style={{
          float: "right",
        }}
        type="submit"
        variant="contained"
      >
        Add
      </Button>
    </div>
  );
};

export default AddEntryForm;

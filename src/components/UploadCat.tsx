import { Button, CircularProgress } from "@material-ui/core";
import { useRef } from "react";

interface UploadCatProps {
  loading: boolean;
  uploadHandler: (file: File) => void;
}

const UploadCat: React.FC<UploadCatProps> = ({ loading, uploadHandler }) => {
  const buttonRef = useRef<HTMLInputElement>(null);
  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      uploadHandler(event.currentTarget.files[0]);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        component="label"
        color="primary"
        startIcon={loading && <CircularProgress size="1rem" />}
        disabled={loading}
      >
        Upload
        <input
          ref={buttonRef}
          accept="image/*"
          type="file"
          hidden
          onChange={changeHandler}
        />
      </Button>
    </>
  );
};

export default UploadCat;

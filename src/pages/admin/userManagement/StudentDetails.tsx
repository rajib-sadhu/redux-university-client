import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();

  return <div>{studentId}</div>;
};

export default StudentDetails;

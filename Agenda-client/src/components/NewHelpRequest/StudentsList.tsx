type StudentsListProps = {
  students: string[];
  onSelectStudent: (student: string) => void;
};

const StudentsList: React.FC<StudentsListProps> = ({
  students,
  onSelectStudent,
}) => {
  return (
    <div
      data-testid="student-list"
      className="bg-white/30 backdrop-blur-25 w-[283px] h-[157px]
     overflow-y-auto absolute z-50 rounded-md shadow"
    >
      {students.map((student, index) => (
        <div
          key={index}
          className="p-1 border-b  border-white text-cp-blue hover:bg-cp-light-blue cursor-pointer"
          onClick={() => onSelectStudent(student)}
        >
          {student}
        </div>
      ))}
    </div>
  );
};

export default StudentsList;

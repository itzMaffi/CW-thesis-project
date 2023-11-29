interface StudentsListProps {
  students: string[];
  onSelectStudent: (student: string) => void;
}

const StudentsList: React.FC<StudentsListProps> = ({
  students,
  onSelectStudent,
}) => {
  return (
    <div
      className="bg-white w-[283px] h-[157px]
     overflow-y-auto absolute z-50 rounded-md shadow"
    >
      {students.map((student, index) => (
        <div
          key={index}
          className="p-1 border-b  border-white text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectStudent(student)}
        >
          {student}
        </div>
      ))}
    </div>
  );
};

export default StudentsList;

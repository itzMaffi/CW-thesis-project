import React, { useEffect, useState } from 'react';
import StudentsList from './StudentsList';

const NewHelpRequest: React.FC = () => {
  const studentsList: string[] = [
    'David Burch Jr.',
    'Brittney Moore',
    'David Molina',
    'Stacy Cuevas',
    'Jasmine Jacobson',
    'Troy Brooks',
    'Jennifer Montes',
    'Barry Wallace',
    'Denise Webb',
    'Elizabeth Fuller',
    'Bill Cameron',
    'Adrienne Smith',
    'Isaiah Hahn',
    'Benjamin Hansen',
    'Karen Howell',
    'Debra Gibbs',
    'Traci Rodriguez',
    'Jeffrey Ramos',
    'David Ayala',
    'Daisy Davis',
    'Diane Wilson',
    'Nicholas Pena',
    'Stephanie Wilson',
    'Sabrina Gonzales',
    'Cheryl Rice',
    'Nicholas Stevens',
    'Robert Johnson',
    'Glenda Figueroa',
    'Michael Fernandez',
    'Olivia Boone',
    'Tony Brown',
    'Amanda Lewis',
    'Kenneth Williamson',
    'Robert Davis',
    'Diane Walker',
    'Shane Johnson',
    'Julia Mcgee',
    'Terry Morse',
    'Michael Martinez',
    'Tyler Brown',
    'Angela Hubbard',
    'Karen Perez',
    'Philip Young',
    'Timothy Davis',
    'Nicholas Perez',
    'Kristina Richards',
    'Danielle Howard',
    'Tammy Graham',
    'Paul Jackson',
    'Tina Lawson',
  ];

  const [showList, setShowList] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<string[]>([]);

  // TODO: to do it later
  // const [submitting, setSubmitting] = useState(false);
  // const [formError, setFormError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [showError, setShowError] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');

  const showListHandler = function () {
    if (showList) setShowList(false);
    if (!showList) setShowList(true);
  };

  const selectStudentHandler = (studentName: string) => {
    setSelectedStudent(studentName);
    setShowList(false);
    setIsSelected(true);
    setShowError(false);
  };

  useEffect(() => {
    setSelectedStudent(inputValue);
    if (inputValue) {
      const matchedStudents = studentsList.filter((student) =>
        student.toLowerCase().includes(inputValue.toLowerCase())
      );

      if (matchedStudents.length > 0) {
        setShowError(false);
        setFilteredStudents(matchedStudents);
        setShowList(true);
      } else {
        setShowList(false);
        setShowError(true);
        console.log('something wrong');
      }
    } else {
      setFilteredStudents([]);
      setShowList(false);
    }
  }, [inputValue]);

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const inputValue = event.target.value;
    setInputValue(event.target.value);
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      // setFormError('');
      // setSubmitting(true);
      setInputValue('');
      setIsSelected(false);
      setTextAreaValue('');
      ////// await logic to send the question to the backend
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        // Now you can safely access Error properties like 'message'
        // setFormError(err.message);
      } else {
        // Handle the case where err is not an Error object
        console.log('An unknown error occurred');
        // setFormError('An unknown error occurred');
      }
    }
  };

  const deleteSelectedStudent = () => {
    setShowList(false);
  };
  useEffect(() => {
    const handleGlobalClick = (event: any) => {
      // if (isSelected && !event.target.closest('.input-area')) {
      //   setShowList(false);
      // }
      if (!isSelected && !event.target.closest('.input-area')) {
        setShowList(false);
      }

      if (!event.target.closest('.question-area')) {
        setTextAreaValue('');
      }
      if (showError && !event.target.closest('.input-area')) {
        deleteSelectedStudent();
        setInputValue('');
        setShowError(false);
      }

      if (showError && event.target.closest('.no-match')) {
        deleteSelectedStudent();
        setInputValue('');
        setShowError(false);
      }
    };

    const handleEscapeKeyPress = (event: { key: string }) => {
      if (event.key === 'Escape') {
        deleteSelectedStudent();
        setInputValue('');
        setShowError(false);
      }
    };

    document.addEventListener('mousedown', handleGlobalClick);
    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [isSelected, showError]);

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col justify-center items-center"
    >
      <div className="">
        {/* ////TODO: use the orange color from dinara */}
        <div className="bg-orange-500 min-w-full text-center p-2 text-lg font-bold font-sans text-white rounded-tr-md rounded-tl-md">
          New help request
        </div>
        <div className=" flex flex-col gap-2">
          <div className="flex flex-col justify-center items-center gap-2 min-w-full p-2 mt-1">
            <div className="text-sm text-gray-300 cursor-default">
              Are you coding with other students?
            </div>

            {/* ////TODO: check here */}
            <div onClick={showListHandler} className="min-w-full input-area">
              {isSelected ? (
                <div className="flex justify-center items-center  gap-2  fixed z-10 mt-1 ml-2 pl-2 pt-0.5 shadow-md rounded-2xl  bg-slate-200 ">
                  <div className="cursor-default">{selectedStudent}</div>
                  <button
                    // onClick={deleteSelectedStudent}
                    className="text-md  bg-white pl-2 pr-2 rounded-xl shadow active:scale-90"
                  >
                    x
                  </button>
                </div>
              ) : (
                <></>
              )}
              <input
                type="text"
                value={isSelected ? '' : inputValue}
                onChange={valueChangeHandler}
                placeholder={isSelected ? '' : 'Add students here'}
                className="p-2 shadow-sm min-w-full placeholder-[#aab8c2] rounded-md border border-slate-200"
              />
              {!showError && showList ? (
                <StudentsList
                  onSelectStudent={selectStudentHandler}
                  students={
                    filteredStudents.length > 0
                      ? filteredStudents
                      : studentsList
                  }
                />
              ) : (
                <></>
              )}

              {/* /////TODO: showError */}
              {showError ? (
                <div className="no-match text-cw-orange w-[281px] h-12 overflow-y-auto absolute z-50 shadow text-center pt-3  bg-cw-light-orange ">
                  no matched Students
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center  gap-2 p-2">
            <div className="text-sm text-gray-300 cursor-default">
              Anything else you want us to know?
            </div>
            <textarea
              className="question-area resize-none rounded-md shadow-sm p-1 min-w-full pl-2 placeholder-[#aab8c2]rounded-md border border-slate-200"
              name="help-question"
              id="help-question"
              cols={30}
              rows={2}
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              maxLength={50}
              placeholder="Optional (max 50 char)"
            ></textarea>
            <button
              className="w-24 bg-orange-500 font-bold font-sans text-white p-1 rounded-md  mt-1  hover:bg-cw-orange active:scale-90 shadow-lg active:shadow-inner"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewHelpRequest;

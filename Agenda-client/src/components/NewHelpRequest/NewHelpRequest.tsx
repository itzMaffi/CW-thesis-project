import React, { useEffect, useState } from 'react';
import StudentsList from './StudentsList';

import dummyStudents from './data/dummystudentslist.json';
import { Widget } from '../widget/Widget';
import WidgetHeader from '../widgetHeader/WidgetHeader';

const NewHelpRequest: React.FC<{ widget: Widget }> = ({
  widget,
}: {
  widget: Widget;
}) => {
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
    if (inputValue) {
      const matchedStudents = dummyStudents.studentsList.filter(
        (student: string) =>
          student.toLowerCase().includes(inputValue.toLowerCase())
      );

      if (matchedStudents.length > 0) {
        setShowError(false);
        setFilteredStudents(matchedStudents);
        setShowList(true);
      } else {
        setShowList(false);
        setShowError(true);
      }
    } else {
      setFilteredStudents([]);
      setShowList(false);
    }

    setSelectedStudent(inputValue);
  }, [inputValue]);

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  //TODO: maybe need the comment wenn the backend added
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

        // setFormError(err.message);
      } else {
        console.log('An unknown error occurred');
        // setFormError('An unknown error occurred');
      }
    }
  };

  const deleteSelectedStudent = () => {
    setShowList(false);
  };

  ////handle the global events like enter button or esc button to empty the input elements
  useEffect(() => {
    const handleGlobalClick = (event: KeyboardEvent | MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element === null || undefined) return;

      if (!isSelected && !element.closest('.input-area')) {
        setShowList(false);
      }

      if (!element.closest('.question-area')) {
        setTextAreaValue('');
      }
      if (showError && !element.closest('.input-area')) {
        deleteSelectedStudent();
        setInputValue('');
        setShowError(false);
      }

      if (showError && element.closest('.no-match')) {
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
      className="flex flex-col justify-center items-center min-w-full "
    >
      <WidgetHeader widget={widget}>Ask for a help</WidgetHeader>
      <div className=" flex flex-col gap-2 min-w-full max-w-full">
        <div className="flex flex-col justify-center items-start gap-2 min-w-full p-2 mt-1">
          <div className="text-sm text-cp-blue cursor-default">
            Are you coding with other students?
          </div>

          <div onClick={showListHandler} className="min-w-full input-area ">
            {isSelected ? (
              <div className="flex justify-center items-center  gap-2  fixed z-10 mt-1 ml-2 pl-2 pt-0.5 shadow-md rounded-2xl  bg-slate-200 ">
                <div className="cursor-default">{selectedStudent}</div>
                <button className="text-md  bg-white pl-2 pr-2 rounded-xl shadow active:scale-90">
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
              className="p-2 shadow-sm min-w-full max-w-full placeholder-gray-400 rounded-md border border-slate-200 bg-white/50"
            />
            {!showError && showList ? (
              <StudentsList
                onSelectStudent={selectStudentHandler}
                students={
                  filteredStudents.length > 0
                    ? filteredStudents
                    : dummyStudents.studentsList
                }
              />
            ) : (
              <></>
            )}

            {showError ? (
              <div className="no-match text-cp-blue w-[281px] h-12 overflow-y-auto absolute z-50 shadow text-center pt-3  bg-cp-light-blue ">
                No matched students
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  gap-2 p-2">
          <div className="text-sm  cursor-default self-start text-cp-blue">
            Anything else you want us to know?
          </div>
          <textarea
            className="question-area resize-none shadow-sm p-1 min-w-full max-w-full pl-2 placeholder-gray-400 rounded-md border border-slate-200 bg-white/50"
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
            className="w-24 bg-cp-blue font-bold font-sans text-white p-1 rounded-md  mt-1  hover:bg-cp-middle-blue active:scale-90 shadow-md active:shadow-inner"
            type="submit"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewHelpRequest;

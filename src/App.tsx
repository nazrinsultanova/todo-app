import * as React from "react";
import { ITask, ToDo } from "./models";
import "./index.css";
import { getLocal, useLocalStorage } from "./hooks/useLocalStorage";

const todo = new ToDo(getLocal());
export default function App() {
  const [localData, setLocalData] = useLocalStorage();
  const [allTasks, setAllTasks] = React.useState<ITask[]>(localData);
  const [selectedTask, setSelectedTask] = React.useState<ITask | null>();
  const [currentStatus, setCurrentStatus] = React.useState<
    ITask["status"] | null
  >();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function handleClick() {
    todo.addItem.call(todo, inputRef.current?.value!);
    setAllTasks([...todo.allTasks]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleDelete(id: string) {
    todo.deleteItem(id);
    setAllTasks([...todo.allTasks]);
  }

  function handleChangeStatus(id: string) {
    todo.changeStatus(id);
    setAllTasks([...todo.allTasks]);
    console.log("click works", allTasks);
  }

  function handleEditTask(item: ITask) {
    if (inputRef.current) {
      inputRef.current.value = item.title;
      setSelectedTask(item);
    }
  }

  function handleEdit() {
    todo.editTask(selectedTask?.id!, inputRef.current?.value!);
    setAllTasks([...todo.allTasks]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSelectedTask(null);
    console.log({ selectedTask, ref: inputRef.current?.value });
  }

  React.useEffect(() => {
    setLocalData(allTasks);
  }, [allTasks]);

  const renderList = () => {
    return allTasks
      ?.filter((item) => (currentStatus ? item.status === currentStatus : true))
      .map((item) => {
        return (
          <li
            className="flex items-center border-b border-gray-300 last:border-b-0 px-[16px] py-[10px]"
            key={item.id}
          >
            <button
              className="mr-[8px] text-green-500"
              onClick={() => handleChangeStatus(item.id)}
            >
              {item.status === "done" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <span className="rounded-full border border-gray-300 block w-[16px] h-[16px]"></span>
              )}
            </button>
            <p className="text-[16px] text-gray-500"> {item?.title}</p>
            <div className="flex gap-[4px] ml-auto">
              <button
                className="text-crimson"
                onClick={() => handleDelete(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              <button
                className="text-honey"
                onClick={() => handleEditTask(item)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </div>
          </li>
        );
      });
  };

  return (
    <div className="w-full h-[100vh] bg-neon-blue flex items-center justify-center flex-col">
      <h1 className="text-white text-[32px] font-bold mb-[12px]">Todo</h1>
      <div className="border border-gray-300 rounded-[4px] bg-white max-w-[100%] min-w-[500px] h-auto">
        <div className="border-b-2 border-gray-300 p-4 flex items-center h-50">
          <input
            placeholder="Create some tasks..."
            className="border-none focus:outline-none w-full block"
            name="nazrin"
            ref={inputRef}
          />
          {selectedTask ? (
            <button
              className="text-white p-2 bg-green-500 rounded-full"
              onClick={handleEdit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          ) : (
            <button
              className="text-lg p-2 bg-neon-blue rounded-full"
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="#fff"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="px-[16px] py-[8px] w-200 flex gap-1 border-b border-gray-300">
          <button
            onClick={() => setCurrentStatus(null)}
            className="block text-white px-[6px] py-[2px] rounded-[3px] bg-blue-500 font-bold text-[10px]"
          >
            All tasks : {allTasks?.length}
          </button>
          <button
            onClick={() => setCurrentStatus("progress")}
            className="block text-white px-[6px] py-[2px] rounded-[3px] bg-red-500 font-bold text-[10px]"
          >
            Incomplete tasks :{" "}
            {allTasks?.filter((item) => item.status === "progress")?.length}
          </button>
          <button
            onClick={() => setCurrentStatus("done")}
            className="block text-white px-[6px] py-[2px] rounded-[3px] bg-green-500 font-bold text-[10px]"
          >
            Completed :{" "}
            {allTasks?.filter((item) => item.status === "done")?.length}
          </button>
        </div>
        <ul>{renderList()}</ul>
      </div>
    </div>
  );
}

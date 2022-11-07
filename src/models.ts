export interface ITask {
    status: 'done' | 'progress';
    createdAt: Date;
    title: string;
    id: string;
  }
  
  export class ToDo {
    allTasks: ITask[] = [];
    task: ITask | null =null;
    constructor(allTask:ITask[]) {
      this.allTasks = allTask
    }
  
    addItem(item: string) {
      if (item) {
        this.task = {
          status: 'progress',
          createdAt: new Date(),
          title: item,
          id: Date.now().toString(),
        };
        this.allTasks.push(this.task);
      }
    }
  
    deleteItem(id: string) {
      this.allTasks = this.allTasks.filter((item) => item.id !== id);
    }
  
    changeStatus(id: string) {
      const selectedItem = this.allTasks.find((item) => item.id === id)!;
      selectedItem.status === 'done'
        ? (selectedItem.status = 'progress')
        : (selectedItem.status = 'done');
    }
    
    editTask(id: string, title: string) {
      const selectedItem = this.allTasks.find((item) => item.id === id)!;
      console.log({selectedItem,id,allTask:this.allTasks});
      
      selectedItem.title = title;
    }
  
    sortByDate(item: Date) {}
  }
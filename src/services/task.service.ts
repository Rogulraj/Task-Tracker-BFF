import { CommonResponse, ResponseWithId } from "@/interfaces/index";
import { TaskInterface } from "@/interfaces/task.interface";
import { TasksModel } from "@/models/task.model";

export class TaskService {
  async getAllTasks(): Promise<CommonResponse<TaskInterface[]>> {
    const taksList = await TasksModel.find();

    const response: CommonResponse<TaskInterface[]> = {
      statusCode: 200,
      message: "Tasks fetch successfully",
      data: taksList,
    };
    return response;
  }

  async addTask(task: TaskInterface): Promise<CommonResponse<ResponseWithId>> {
    const newTaks = await TasksModel.create(task);

    const response: CommonResponse<ResponseWithId> = {
      data: { _id: newTaks._id },
      statusCode: 201,
      message: "Task created successfully",
    };
    return response;
  }

  async removeTaskById(
    taskId: string
  ): Promise<CommonResponse<ResponseWithId>> {
    const deletedTask = await TasksModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return {
        statusCode: 404,
        message: "Task not found",
        data: { _id: taskId },
      };
    }

    return {
      statusCode: 200,
      message: "Task deleted successfully",
      data: { _id: deletedTask._id },
    };
  }

  async updateTaskById(
    taskId: string,
    updatedTaskData: TaskInterface
  ): Promise<CommonResponse<ResponseWithId>> {
    const updatedTask = await TasksModel.findByIdAndUpdate(
      taskId,
      updatedTaskData,
      { new: true }
    );

    if (!updatedTask) {
      return {
        statusCode: 404,
        message: "Task not found",
        data: { _id: taskId },
      };
    }

    return {
      statusCode: 200,
      message: "Task updated successfully",
      data: updatedTask._id,
    };
  }
}

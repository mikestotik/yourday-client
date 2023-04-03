import * as ExcelJS from 'exceljs';
import * as fs from 'file-saver';
import { ExcelSheetColumns } from '../config/download.config';
import { Task } from '../interfaces/task.interface';
import { priorityName } from './task.utils';


export function downloadTasksAsExcel(title: string, creator: string, tasks: Task[]): void {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = creator;

  const worksheet = workbook.addWorksheet(title);

  worksheet.columns = [
    { header: ExcelSheetColumns.id.title, key: ExcelSheetColumns.id.field },
    { header: ExcelSheetColumns.task.title, key: ExcelSheetColumns.task.field },
    { header: ExcelSheetColumns.priority.title, key: ExcelSheetColumns.priority.field },
    { header: ExcelSheetColumns.tag.title, key: ExcelSheetColumns.tag.field },
    { header: ExcelSheetColumns.storypoint.title, key: ExcelSheetColumns.storypoint.field },
    { header: ExcelSheetColumns.estimate.title, key: ExcelSheetColumns.estimate.field },
    { header: ExcelSheetColumns.note.title, key: ExcelSheetColumns.note.field }
  ];
  worksheet.getColumn(2).width = ExcelSheetColumns.task.width;

  tasks.forEach((task, index) => {
    const taskIndex = index + 1;
    worksheet.addRow({
      [ExcelSheetColumns.id.field]: `${ taskIndex }`,
      [ExcelSheetColumns.task.field]: task.title,
      [ExcelSheetColumns.priority.field]: priorityName(task.priority),
      [ExcelSheetColumns.tag.field]: task.tag?.title,
      [ExcelSheetColumns.storypoint.field]: task.estStp,
      [ExcelSheetColumns.estimate.field]: task.estTime,
      [ExcelSheetColumns.note.field]: task.note
    });

    if (task.checkList.length) {
      task.checkList.forEach((subTask, index) => {
        const subTaskIndex = index + 1;
        worksheet.addRow({
          id: `${ taskIndex }.${ subTaskIndex }`,
          [ExcelSheetColumns.task.field]: subTask.title
        });
      });
    }
  });

  workbook.xlsx.writeBuffer().then((data: any) => {
    const blob = new Blob([ data ], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, `Tasks - ${ title }.xlsx`);
  });
}

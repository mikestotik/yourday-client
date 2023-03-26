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
    { header: ExcelSheetColumns.task.title, key: ExcelSheetColumns.task.field },
    { header: ExcelSheetColumns.priority.title, key: ExcelSheetColumns.priority.field },
    { header: ExcelSheetColumns.tag.title, key: ExcelSheetColumns.tag.field },
    { header: ExcelSheetColumns.storypoint.title, key: ExcelSheetColumns.storypoint.field },
    { header: ExcelSheetColumns.estimate.title, key: ExcelSheetColumns.estimate.field },
    { header: ExcelSheetColumns.note.title, key: ExcelSheetColumns.note.field }
  ];
  worksheet.getColumn(1).width = ExcelSheetColumns.task.width;

  tasks.forEach(task => worksheet.addRow({
    [ExcelSheetColumns.task.field]: task.title,
    [ExcelSheetColumns.priority.field]: priorityName(task.priority),
    [ExcelSheetColumns.tag.field]: task.tag?.title,
    [ExcelSheetColumns.storypoint.field]: task.estStp,
    [ExcelSheetColumns.estimate.field]: task.estTime,
    [ExcelSheetColumns.note.field]: task.note
  }));

  workbook.xlsx.writeBuffer().then((data: any) => {
    const blob = new Blob([ data ], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, `Tasks - ${ title }.xlsx`);
  });
}

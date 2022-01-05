import * as XLSX from "xlsx";

export const convertToJson = (csv) => {
  let lines = csv.split("\n");

  let result = [];

  let headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  return JSON.stringify(result); //JSON
};

export const getJsonOutOfExcel = (excel) => {
  const bstr = excel;
  const wb = XLSX.read(bstr, { type: "binary" });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
  return convertToJson(data);
};

export const getDataTypes = (data) => {
  let map = {};

  Object.entries(data).forEach((el) => {
    const [key, value] = el;
    if (!isNaN(value)) {
      map[key] = "number";
    } else {
      map[key] = typeof value;
    }
  });
  return map;
};

export const formatData = (data) => {
  let map = {};
  data.forEach((row) => {
    Object.entries(row).forEach((arr) => {
      if (map[arr[0]] && arr[1]) {
        map[arr[0]].push(arr[1]);
      } else {
        if (arr[1]) map[arr[0]] = [arr[1]];
      }
    });
  });
  return map;
};

let color,
  letters = "0123456789ABCDEF".split("");
const AddDigitToColor = (limit) => {
  color += letters[Math.round(Math.random() * limit)];
};
export const GetRandomColor = () => {
  color = "#";
  AddDigitToColor(5);
  for (var i = 0; i < 5; i++) {
    AddDigitToColor(15);
  }
  return color;
};

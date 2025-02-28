export interface Video {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: string[];
}

export type DBType = {
  // типизация базы данных (что мы будем в ней хранить)
  videos: any[]; // VideoDBType[]
  // some: any[]
};

let nextId = 1;
export const getNextId = () => nextId++;

export const db: DBType = {
  videos: [
    {
      id: 0,
      title: "string",
      author: "string",
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: "2025-02-25T21:57:06.185Z",
      publicationDate: "2025-02-25T21:57:06.185Z",
      availableResolutions: ["P144"],
    },
    {
      id: 1,
      title: "string",
      author: "string",
      canBeDownloaded: true,
      minAgeRestriction: 18,
      createdAt: "2025-02-25T21:57:06.185Z",
      publicationDate: "2025-02-25T21:57:06.185Z",
      availableResolutions: ["P144"],
    },
  ],
};

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    // если в функцию ничего не передано - то очищаем базу данных
    db.videos = [];
    // db.some = []
    return;
  }

  // если что-то передано - то заменяем старые значения новыми
  db.videos = dataset.videos || db.videos;
  // db.some = dataset.some || db.some
};

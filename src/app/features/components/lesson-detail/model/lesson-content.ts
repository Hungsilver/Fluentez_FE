// models/lesson-content.model.ts
export interface LessonContent {
  order: number;
  type: ContentType;
  data: any; // Will be typed based on ContentType
}

export enum ContentType {
  Heading = 'heading',
  RichText = 'richText',
  Instruction = 'instruction',
  Image = 'image',
  Audio = 'audio',
  Video = 'video',
  Table = 'table',
  FillInBlank = 'fillInBlankExercise',
  MultipleChoice = 'multipleChoiceExercise',
  DragAndDrop = 'dragAndDropExercise',
  Listening = 'listeningExercise'
}

export interface FillInBlankExercise {
  questions: FillInBlankQuestion[];
  settings: any;
}

export interface FillInBlankQuestion {
  id: number;
  text: string;
  blanks: Blank[];
  explanation?: string;
  userAnswer?: string[];
  isCorrect?: boolean;
}

export interface Blank {
  position: number;
  correctAnswer: string;
  alternatives?: string[];
  hint?: string;
}

export interface ImageContent {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface AudioContent {
  url: string;
  duration: number;
  transcript?: string;
}

export enum QuestionType {
  FillInBlank = 1,
  MultipleChoice = 2,
  DragAndDrop = 3,
  Listening = 4,
}

export enum LessonType {
  LyThuyet = 1,
  ThucHanh = 2,
}
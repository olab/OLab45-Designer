import { SCOPED_OBJECTS } from '../config';

import Files from './Files';
import Counters from './Counters';
import Constants from './Constants';
import Questions from './Questions';
import QuestionResponses from './QuestionResponses';

export const EDITORS_FIELDS = {
  COPYRIGHT: 'Copyright',
  COUNTER_STATUS: 'Counter Status',
  DEFAULTVALUE: 'Default Value',
  DESCRIPTION: 'Description',
  FEEDBACK: 'Feedback',
  FILE_SIZE: 'File Size',
  FILE_TYPE: 'File Type',
  FILE_NAME: 'File Name',
  HEIGHT: 'Height',
  ID: 'Id',
  IS_CORRECT: 'Is Correct',
  IS_PRIVATE: 'Is Private',
  LAYOUT_TYPE: 'Layout Type',
  MAXVALUE: 'Max Value',
  MINVALUE: 'Min Value',
  MIMETYPE: 'Mime Type',
  NAME: 'Name',
  ORDER: 'Order',
  ORIGIN_URL: 'Origin URL',
  PARENT_OBJECT_NAME: 'Object Name',
  PARENT: 'Parent Object',
  PLACEHOLDER: 'Placeholder',
  PROMPTTEXT: 'Prompt Text',
  QUESTION_TYPES: 'Question Type',
  RESOURCE_URL: 'Resource Url',
  RESPONSE: 'Response',
  ROOM_NAME: 'Room Name',
  RESPONSES: 'Responses',
  SCOPE_LEVEL: 'Scope Level',
  SCOPED_OBJECT_STATUS: 'Status',
  SCORE: 'Score',
  SHOW_ANSWER: 'Show Answer',
  SHOW_SUBMIT: 'Show Submit',
  STARTING_VALUE: 'Starting Value (optional)',
  STEM: 'Stem',
  STEPVALUE: 'Step Value',
  TEXT: 'Text',
  TYPE: 'Type',
  VISIBLE: 'Visible',
  WIDTH: 'Width',
  WIKI: 'Wiki',
};

export const CORRECTNESS_TYPES = {
  '-1': 'Incorrect',
  1: 'Correct',
  0: 'Neutral',
};

// NOTE: as more types come online, the relative in-array
// indexes will change and code has to be modified to accomodate
export const QUESTION_TYPES = {
  0: '--Select--',
  1: 'Single Line Text',
  2: 'Multi-Line Text',
  3: 'Multiple Choice',
  4: 'Single Choice',
  5: 'Slider',
  6: 'Drag and Drop',
  7: 'SCT',
  8: 'Situational Judgement Testing',
  // 9: 'Cumulative',
  // 10: 'Rich Text',
  11: 'Turk Talk Moderator',
  12: 'Drop Down',
  // 13: 'Multiple-choice grid',
  // 14: 'Pick-choice grid',
  15: 'Turk Talk Participant',
};

export const CHOICE_QUESTION_TYPES = {
  3: 'Multiple Choice',
  4: 'Single Choice',
  6: 'Drag and Drop',
  7: 'SCT',
  8: 'Situational Judgement Testing',
  12: 'Drop Down',
};

export const TEXTENTRY_QUESTION_TYPES = {
  1: 'Single Line Text',
  2: 'Multi-Line Text',
};

export const TTALK_QUESTION_TYPES = {
  11: 'Turk Talk Moderator',
  15: 'Turk Talk Participant',
};

export const SCOPED_OBJECTS_MAPPING = {
  [SCOPED_OBJECTS.FILE.name.toLowerCase()]: Files,
  [SCOPED_OBJECTS.COUNTER.name.toLowerCase()]: Counters,
  [SCOPED_OBJECTS.CONSTANT.name.toLowerCase()]: Constants,
  [SCOPED_OBJECTS.QUESTION.name.toLowerCase()]: Questions,
  [SCOPED_OBJECTS.QUESTIONRESPONSES.name.toLowerCase()]: QuestionResponses,
};

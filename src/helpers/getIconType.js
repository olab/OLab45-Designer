// @flow
import {
  Archive as ArchiveIcon,
  ArrowDropDown as DropDownQuestionIcon,
  Audiotrack as AudiotrackIcon,
  ContactSupport as UnknownQuestionIcon,
  DeveloperBoard as SCTQuestionIcon,
  ErrorOutline as ErrorOutlineIcon,
  Image as ImageIcon,
  InsertDriveFile as InsertDriveFileIcon,
  ListAlt as MultiSelectQuestionIcon,
  OndemandVideo as OndemandVideoIcon,
  RadioButtonChecked as SingleSelectQuestionIcon,
  ShortText as SingleLineTextQuestionIcon,
  TextFields as RichTextQuestionIcon,
  Tune as SliderQuestionIcon,
  ViewHeadline as MultiLineTextQuestionIcon,
  TextFieldsRounded as TextFieldsRoundedIcon,
  Chat as ChatIcon
} from '@material-ui/icons';

export const getQuestionIconTooltip = (questionTypeId: Number) => {
  switch (questionTypeId) {
    case 1: return `${questionTypeId}: Single Line Text`;
    case 2: return `${questionTypeId}: Multi Line Text`;
    case 3: return `${questionTypeId}: Multiple Choice`;
    case 4: return `${questionTypeId}: Radio Button`;
    case 5: return `${questionTypeId}: Slider`;
    case 6: return `${questionTypeId}: Dropdown`;
    case 7: return `${questionTypeId}: SCT`;
    case 8: return `Unknown Question Type`;
    case 9: return `Unknown Question Type`;
    case 10: return `${questionTypeId}: Rich Text`;
    case 11: return `${questionTypeId}: Turk Talk Participant`;
    case 12: return `${questionTypeId}: Drop Down`;
    // case 13: `Multiple-choice grid`,
    // case 14: `Pick-choice grid`,
    case 15: return `${questionTypeId}: Turk Talk Moderator`;
    default:
      return `Unknown Question Type '${questionTypeId}'`;
  }
};

export const getQuestionIconType = (questionTypeId: Number) => {
  switch (questionTypeId) {
    case 1: return SingleLineTextQuestionIcon;
    case 2: return MultiLineTextQuestionIcon;
    case 3: return MultiSelectQuestionIcon;
    case 4: return SingleSelectQuestionIcon;
    case 5: return SliderQuestionIcon;
    case 6: return DropDownQuestionIcon;
    case 7: return SCTQuestionIcon;
    case 8: UnknownQuestionIcon;
    case 9: UnknownQuestionIcon;
    case 10: return RichTextQuestionIcon;
    case 11: return ChatIcon;
    case 12: return DropDownQuestionIcon;
    // case 13: 'Multiple-choice grid',
    // case 14: 'Pick-choice grid',
    case 15: return ChatIcon;
    default:
      return UnknownQuestionIcon;
  }
};

export const getIconType = (iconType: string): any => {
  switch (iconType) {
    case 'png':
    case 'gif':
    case 'jpg':
      return ImageIcon;
    case 'mp3':
    case 'wav':
    case 'aac':
    case 'm4a':
      return AudiotrackIcon;
    case 'mov':
    case 'wmv':
    case 'mp4':
      return OndemandVideoIcon;
    case 'rtf':
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
    case 'ppt':
    case 'pptx':
    case 'pdf':
      return InsertDriveFileIcon;
    case 'zip':
      return ArchiveIcon;
    case 'md':
      return TextFieldsRoundedIcon;
    default:
      return ErrorOutlineIcon;
  }
};

// export default getIconType;

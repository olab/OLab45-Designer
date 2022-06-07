// @flow
import React from 'react';
import { Grid } from '@material-ui/core';

// import CircularSpinnerWithText from '../../../shared/components/CircularSpinnerWithText';
import { FieldLabel } from '../styles';
import {
  Title, Outlined, ContainerTitle,
} from './styles';
import { getKeyByValue } from './utils';
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  LAYOUT_TYPES,
} from './config';
import {
  QUESTION_TYPES,
  TEXTENTRY_QUESTION_TYPES,
  CHOICE_QUESTION_TYPES,
  EDITORS_FIELDS,
} from '../config';
import { SCOPE_LEVELS, SCOPED_OBJECTS } from '../../config';
import EditorWrapper from '../../../shared/components/EditorWrapper';
import OutlinedInput from '../../../shared/components/OutlinedInput';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import ScopedObjectService, { withSORedux } from '../index.service';
import SearchModal from '../../../shared/components/SearchModal';
import ChoiceQuestionLayout from './ChoiceQuestionLayout';
import TextQuestionLayout from './TextQuestionLayout';
import SliderQuestionLayout from './SliderQuestionLayout';
import type { IScopedObjectProps } from '../types';

class Questions extends ScopedObjectService {
  constructor(props: IScopedObjectProps) {
    super(props, SCOPED_OBJECTS.QUESTION.name);
    this.state = {
      description: '',
      feedback: '',
      height: DEFAULT_HEIGHT.MIN,
      id: 0,
      isFieldsDisabled: false,
      showAnswer: false,
      isPrivate: false,
      isShowModal: false,
      showSubmit: false,
      layoutType: 0,
      name: '',
      placeholder: '',
      questionId: 0,
      questionType: Number(Object.keys(QUESTION_TYPES)[0]),
      responses: [],
      scopeLevel: SCOPE_LEVELS[0],
      settings: '{}',
      stem: '',
      width: DEFAULT_WIDTH.MIN,
    };
  }

  onClickedSave = (e: Event): void => {
    var self = this;
    self.onClickUpdate();
  };

  onSettingsChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);

    const settingsObject = JSON.parse(this.state.settings);
    settingsObject[name] = value;
    const settingsName = 'settings';
    const settings = JSON.stringify(settingsObject);
    this.setState({ [settingsName]: settings });
  };

  onLayoutTypeChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    const index = LAYOUT_TYPES.findIndex(type => type === value);
    this.setState({ [name]: index });
  };

  onQuestionTypeChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    const key = Number(getKeyByValue(QUESTION_TYPES, value));
    this.setState({ [name]: key });
  };

  render() {
    const {
      id,
      isFieldsDisabled,
      isShowModal,
      questionType,
      scopeLevel,
      scopeLevelObj,
    } = this.state;

    const { classes, scopeLevels, match: { params: { scopedObjectId } } } = this.props;
    const isAdding = scopedObjectId === 'add';

    const { iconEven: IconEven, iconOdd: IconOdd } = this.icons;

    const isChoiceQuestion = (questionType in CHOICE_QUESTION_TYPES);
    const isSliderQuestion = QUESTION_TYPES[questionType] === QUESTION_TYPES[5];
    const isTextQuestion = (questionType in TEXTENTRY_QUESTION_TYPES);

    const idInfo = ` (Id: ${id})`;

    return (
      <EditorWrapper
        isEditMode={this.isEditMode}
        isDisabled={isFieldsDisabled}
        scopedObject={this.scopedObjectType}
        onSubmit={this.onClickedSave}
      >
        {(id >= 0) && (
          <small>{idInfo}</small>
        )}

        {(!this.isEditMode) && (questionType === 0) && (
          <>
            <FieldLabel>
              {EDITORS_FIELDS.QUESTION_TYPES}
            </FieldLabel>
            <OutlinedSelect
              name="questionType"
              value={QUESTION_TYPES[questionType]}
              values={Object.values(QUESTION_TYPES)}
              onChange={this.onQuestionTypeChange}
              disabled={isFieldsDisabled}
            />
          </>
        )}

        {(isChoiceQuestion) && (
          <ChoiceQuestionLayout
            isEditMode={this.isEditMode}
            onInputChange={this.onInputChange}
            onLayoutTypeChange={this.onLayoutTypeChange}
            onQuestionTypeChange={this.onQuestionTypeChange}
            onSwitchChange={this.onSliderOrSwitchChange}
            props={this.props}
            state={this.state}
          />
        )}

        {(isTextQuestion) && (
          <TextQuestionLayout
            onInputChange={this.onInputChange}
            onQuestionTypeChange={this.onQuestionTypeChange}
            onSelectChange={this.onSelectChange}
            onSwitchChange={this.onSliderOrSwitchChange}
            props={this.props}
            state={this.state}
          />
        )}


        {(isSliderQuestion) && (
          <SliderQuestionLayout
            onInputChange={this.onInputChange}
            onQuestionTypeChange={this.onQuestionTypeChange}
            onSettingsChange={this.onSettingsChange}
            onSwitchChange={this.onSliderOrSwitchChange}
            props={this.props}
            state={this.state}
          />
        )}

        <ContainerTitle>
          <Title>
            {EDITORS_FIELDS.PARENT}
          </Title>
        </ContainerTitle>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Outlined>
              <OutlinedSelect
                name="scopeLevel"
                label={EDITORS_FIELDS.SCOPE_LEVEL}
                value={scopeLevel}
                values={SCOPE_LEVELS}
                onChange={this.onInputChange}
                disabled={isFieldsDisabled}
                labelWidth={90}
                height={20}
                fullWidth
              />
            </Outlined>
          </Grid>
          <Grid item xs={6}>
            <Outlined>
              <OutlinedInput
                name="parentId"
                value={scopeLevelObj ? scopeLevelObj.name : ' '}
                label={EDITORS_FIELDS.PARENT_OBJECT_NAME}
                disabled={isFieldsDisabled}
                onFocus={this.showModal}
                setRef={this.setParentRef}
                readOnly
                fullWidth
              />
            </Outlined>
          </Grid>
        </Grid>

        {(isShowModal) && (
          <SearchModal
            label="Parent record"
            searchLabel="Search for parent record"
            items={scopeLevels[scopeLevel.toLowerCase()]}
            text={`Please choose appropriate parent from ${scopeLevel}:`}
            onClose={this.hideModal}
            onItemChoose={this.handleLevelObjChoose}
            isItemsFetching={scopeLevels.isFetching}
            iconEven={IconEven}
            iconOdd={IconOdd}
          />
        )}
      </EditorWrapper>
    );
  }
}

export default withSORedux(Questions, SCOPED_OBJECTS.QUESTION.name);

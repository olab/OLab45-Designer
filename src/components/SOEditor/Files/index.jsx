// @flow
import React from 'react';
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  withStyles,
} from '@material-ui/core';

import SearchModal from '../../../shared/components/SearchModal';
import OutlinedInput from '../../../shared/components/OutlinedInput';
import EditorWrapper from '../../../shared/components/EditorWrapper';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import CopyToClipboard from '../../../shared/components/CopyToClipboard';

import convertSize from '../../../helpers/convertSize';
import { getIconType } from '../../../helpers/getIconType';
import ScopedObjectService, { withSORedux } from '../index.service';

import { EDITORS_FIELDS } from '../config';
import { TYPES, IMAGE_TYPES } from './config';
import { SCOPE_LEVELS, SCOPED_OBJECTS } from '../../../config';

import type { IScopedObjectProps as IProps } from '../types';

import styles, { FieldLabel } from '../styles';
import {
  Title,
  Field,
  Outlined,
  ContainerTitle,
  Preview,
  FieldFileType,
} from './styles';
import axios from 'axios';
import { RestaurantRounded } from '@material-ui/icons';

class File extends ScopedObjectService {
  constructor(props: IProps) {
    super(props, SCOPED_OBJECTS.FILE.name);
    this.state = {
      copyright: '',
      description: '',
      fileSize: 0,
      height: 0,
      heightType: '',
      id: 0,
      isFieldsDisabled: false,
      isMediaResource: true,
      isShowModal: false,
      mime: 'auto-detect',
      name: '',
      originUrl: '',
      path: '',
      resourceUrl: '',
      scopeLevel: SCOPE_LEVELS[0],
      selectedFile: '',
      selectedFileName: null,
      type: 0,
      width: 0,
      widthType: '',
      wiki: '',
    };
  }

  handleSelectChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    const index = TYPES.findIndex((type) => type === value);

    this.setState({ [name]: index });
  };

  onClickSelectFile = (event: Event): void => {
    // test for Cancel in file chooser dialog
    if (event.target.files.length == 0) {
      return;
    }

    console.log(
      `files selected: ${JSON.stringify(event.target.files, null, 2)}`,
    );
    let files = event.target.files;

    this.setState({
      selectedFile: files[0],
      selectedFileName: event.target.files[0].name,
      fileSize: event.target.files[0].size,
    });
  };

  getIcon = (showIcons, scopedObject) => {
    if (showIcons) {
      if (Object.prototype.hasOwnProperty.call(scopedObject, 'resourceUrl')) {
        const iconType =
          scopedObject.resourceUrl && scopedObject.resourceUrl.split('.').pop();
        const MediaIconContent = getIconType(iconType);
        return <MediaIconContent />;
      }
    }

    return '';
  };

  render() {
    const {
      id,
      name,
      originUrl,
      scopeLevel,
      resourceUrl,
      widthType,
      copyright,
      description,
      isShowModal,
      isFieldsDisabled,
      isMediaResource,
      heightType,
      fileSize,
      height,
      width,
      type,
      wiki,
      mime,
      path,
      scopeLevelObj,
      contents,
      selectedFile,
      selectedFileName,
    } = this.state;
    const { classes, scopeLevels } = this.props;
    const { iconEven: IconEven, iconOdd: IconOdd } = this.icons;
    const iconType = path && path.split('.').pop();
    const isPreviewShow = IMAGE_TYPES.includes(iconType);
    const MediaIconContent = getIconType(iconType);
    const idInfo = `Id: ${id}`;

    return (
      <EditorWrapper
        isEditMode={this.isEditMode}
        isDisabled={isFieldsDisabled}
        scopedObject={this.scopedObjectType}
        onSubmit={this.onClickUpdate}
      >
        {id !== 0 && <small>{idInfo}</small>}

        {isPreviewShow && <Preview src={resourceUrl} alt={name} />}
        <Field>
          <Outlined>
            <OutlinedInput
              label={EDITORS_FIELDS.ID}
              value={id}
              fullWidth
              disabled
            />
          </Outlined>
          <CopyToClipboard text={id} medium />
        </Field>
        <Field>
          <Outlined>
            <OutlinedInput
              label={EDITORS_FIELDS.WIKI}
              value={wiki}
              fullWidth
              disabled
            />
          </Outlined>
          <CopyToClipboard text={wiki} medium />
        </Field>
        <Field>
          <Outlined>
            <OutlinedInput
              name="originUrl"
              label={EDITORS_FIELDS.ORIGIN_URL}
              value={originUrl}
              onChange={this.onInputChange}
              fullWidth
            />
          </Outlined>
          <CopyToClipboard text={originUrl} medium />
        </Field>
        <Field>
          <Outlined>
            <ContainerTitle>
              <Title>{EDITORS_FIELDS.RESOURCE_URL}:</Title>
              <a href={resourceUrl} target="_blank" rel="noopener noreferrer">
                {resourceUrl}
              </a>
            </ContainerTitle>
          </Outlined>
          <CopyToClipboard text={resourceUrl} medium />
        </Field>
        <Outlined>
          <OutlinedSelect
            name="type"
            label={EDITORS_FIELDS.TYPE}
            value={TYPES[type || 0]}
            values={TYPES}
            onChange={this.handleSelectChange}
            labelWidth={90}
            fullWidth
          />
        </Outlined>
        <Outlined>
          <OutlinedInput
            name="name"
            label={EDITORS_FIELDS.NAME}
            value={name}
            onChange={this.onInputChange}
            fullWidth
          />
        </Outlined>
        <Outlined>
          <TextField
            multiline
            rows="3"
            name="description"
            label={EDITORS_FIELDS.DESCRIPTION}
            variant="outlined"
            value={description}
            onChange={this.onInputChange}
            fullWidth
          />
        </Outlined>
        <Outlined>
          <OutlinedInput
            name="copyright"
            label={EDITORS_FIELDS.COPYRIGHT}
            value={copyright}
            onChange={this.onInputChange}
            fullWidth
          />
        </Outlined>
        {!path && (
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Outlined>
                <OutlinedInput
                  name="path"
                  label={EDITORS_FIELDS.FILE_NAME}
                  value={selectedFileName}
                  fullWidth
                  readOnly
                />
              </Outlined>
            </Grid>
            <Grid item xs={1}>
              <Outlined>
                <OutlinedInput
                  name="mime"
                  label={EDITORS_FIELDS.FILE_SIZE}
                  value={convertSize(fileSize)}
                  readOnly
                />
              </Outlined>
            </Grid>
            <Grid item xs={1}>
              <Outlined>
                <OutlinedInput
                  name="mime"
                  label={EDITORS_FIELDS.MIMETYPE}
                  value={mime}
                  onChange={this.onInputChange}
                />
              </Outlined>
            </Grid>
            <Grid item xs={2}>
              <Outlined>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isMediaResource}
                      name="isMediaResource"
                    />
                  }
                  label="Is Media Resource"
                />
              </Outlined>
            </Grid>
            <Grid item xs={3}>
              &nbsp;
            </Grid>
            <Grid item xs={1}>
              <Outlined>
                <label htmlFor="uploadFile">
                  <input
                    style={{ display: 'none' }}
                    id="uploadFile"
                    name="uploadFile"
                    type="file"
                    onChange={this.onClickSelectFile}
                  />
                  <Button color="primary" variant="contained" component="span">
                    Select File
                  </Button>
                </label>
              </Outlined>
            </Grid>
          </Grid>
        )}

        <ContainerTitle>
          <Title>{EDITORS_FIELDS.PARENT}</Title>
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

        {path && (
          <>
            <Field>
              <ContainerTitle>
                <Title>{EDITORS_FIELDS.FILE_NAME}:</Title>
                {path}
              </ContainerTitle>
            </Field>
            <ContainerTitle>
              <Title>{EDITORS_FIELDS.FILE_TYPE}:</Title>
              <MediaIconContent />
            </ContainerTitle>
            <Field>
              <ContainerTitle>
                <Title>{EDITORS_FIELDS.FILE_SIZE}:</Title>
                {convertSize(fileSize)}
              </ContainerTitle>
            </Field>
          </>
        )}

        {isShowModal && (
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

export default withSORedux(withStyles(styles)(File), SCOPED_OBJECTS.FILE.name);

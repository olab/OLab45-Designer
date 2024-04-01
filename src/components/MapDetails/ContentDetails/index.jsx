// @flow
import React from 'react';

import Switch from '../../../shared/components/Switch';
import TextEditor from '../../../shared/components/TextEditor';

import { CONTENT_DETAILS_CHECKBOXES } from './config';

import type { ContentDetailsProps as IProps } from './types';
import type { Node as NodeType } from '../Constructor/Graph/Node/types';

import { ContainerTab, ContentTitle, Title } from '../styles';
import { ContainerCheckBox, CheckBox } from './styles';
import { ListWithSearchWrapper } from '../../SOEditor/styles';
import ListWithSearch from '../../../shared/components/ListWithSearch';
import { DARK_BLUE } from '../../../shared/colors';
import { RadioButtonChecked, RadioButtonUnchecked } from '@material-ui/icons';

const ContentDetails = ({
  details,
  text,
  handleEditorChange,
  handleCheckBoxChange,
  nodes,
}: IProps): React$Element<any> => {
  const [nodeSearch, setNodeSearch] = React.useState<string>('');
  const [reportNode, setReportNode] = React.useState<number>(
    details.reportNodeId,
  );

  const isNodeMatch = (node: NodeType) => {
    return nodeSearch.trim().length > 0
      ? node.title
          .concat(' ', node.text)
          .toLowerCase()
          .includes(nodeSearch.toLowerCase())
      : true;
  };

  React.useEffect(() => {
    details.reportNodeId = reportNode || null;
  }, [reportNode]);

  return (
    <ContainerTab>
      <ContentTitle>Authoring notes</ContentTitle>
      <TextEditor
        editorId="devNotes"
        width={800}
        height={300}
        text={text}
        handleEditorChange={handleEditorChange}
      />
      <ContainerCheckBox>
        {CONTENT_DETAILS_CHECKBOXES.map(({ label, name }, index) => {
          const key = label + index;

          return (
            <CheckBox key={key}>
              <Switch
                labelPlacement="start"
                name={name}
                label={label}
                checked={details[name]}
                onChange={handleCheckBoxChange}
              />
            </CheckBox>
          );
        })}
      </ContainerCheckBox>

      <ContentTitle>Report Node Location</ContentTitle>
      <ListWithSearchWrapper style={{ padding: 0 }}>
        <ListWithSearch
          getIcon={(_, node: NodeType) => (
            <span style={{ color: DARK_BLUE, marginRight: 7, display: 'flex' }}>
              {node.id == reportNode ? (
                <RadioButtonChecked style={{ fill: 'currentColor' }} />
              ) : (
                <RadioButtonUnchecked style={{ fill: 'currentColor' }} />
              )}
            </span>
          )}
          isHideSearch={false}
          isItemsFetching={false}
          isMedia={false}
          isWithSpinner={false}
          label={'Filter nodes by keyword'}
          list={nodes.filter(isNodeMatch)}
          onClear={() => setNodeSearch('')}
          onSearch={(query) => setNodeSearch(query)}
          onItemClick={(node) =>
            setReportNode(reportNode == node.id ? undefined : node.id)
          }
          primarytext={(node: NodeType) =>
            node.id == reportNode ? (
              <strong
                style={{
                  color: DARK_BLUE,
                }}
              >
                {node.title}
              </strong>
            ) : (
              node.title
            )
          }
          secondarytext={(node: NodeType) => node.text}
        />
      </ListWithSearchWrapper>
      <p>&nbsp;</p>
    </ContainerTab>
  );
};

export default ContentDetails;
